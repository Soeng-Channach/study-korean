import { levelOf } from './levels';
import { getVocabularyExample } from './vocabularyExamples';

// Metadata for each searchable content type. `label` is shown as the result
// chip; the icon is mapped to a lucide component in the GlobalSearch UI.
export const SEARCH_TYPES = {
  vocab: { label: 'Vocab', icon: 'Languages' },
  grammar: { label: 'Grammar', icon: 'BookOpen' },
  reading: { label: 'Reading', icon: 'Newspaper' },
  listening: { label: 'Listening', icon: 'Headphones' },
  test: { label: 'Test', icon: 'ClipboardCheck' },
  writing: { label: 'Writing', icon: 'PenLine' },
  plan: { label: '30-Day Plan', icon: 'CalendarCheck' }
};

function norm(value) {
  return (value == null ? '' : String(value)).toLowerCase();
}

function joinHaystack(parts) {
  return norm(parts.filter(Boolean).join(' '));
}

// The index spans every dataset (~4 MB), so it is built on demand rather than
// at module load — otherwise the app shell, which always renders the search box,
// would pull all content into the entry chunk. Call loadSearchIndex() before
// searchAll(); until it resolves, searchAll() returns no results.
let index = null;
let indexPromise = null;

async function buildIndex() {
  const [{ grammarLessons }, { listeningTests }, { mockTests }, { readings }, { vocabulary }, { writingSets }, { planDays }] =
    await Promise.all([
      import('../data/grammar'),
      import('../data/listening'),
      import('../data/mockTests'),
      import('../data/reading'),
      import('../data/vocabulary'),
      import('../data/writing'),
      import('../data/thirtyDayPlan')
    ]);

  const items = [];

  vocabulary.forEach((word) => {
    const level = levelOf(word);
    const example = getVocabularyExample(word);
    items.push({
      id: word.id,
      type: 'vocab',
      level,
      title: word.word,
      subtitle: word.meaningKm ? `${word.meaning} · ${word.meaningKm}` : word.meaning,
      tag: word.partOfSpeech,
      // No per-word detail page exists, so deep-link into the Vocab list with
      // the word pre-filled. VocabularyPage reads the `q` and `level` params.
      to: `/vocabulary?q=${encodeURIComponent(word.word)}&level=${encodeURIComponent(level)}`,
      haystack: joinHaystack([
        word.word,
        word.hanja,
        word.meaning,
        word.meaningKm,
        example.example,
        example.exampleMeaning,
        (word.tags || []).join(' ')
      ])
    });
  });

  grammarLessons.forEach((lesson) => {
    items.push({
      id: lesson.id,
      type: 'grammar',
      level: levelOf(lesson),
      title: lesson.pattern,
      subtitle: lesson.coreMeaning || lesson.meaning,
      tag: lesson.category,
      to: `/grammar/${lesson.id}`,
      haystack: joinHaystack([
        lesson.pattern,
        lesson.meaning,
        lesson.coreMeaning,
        lesson.category,
        lesson.explanation,
        (lesson.tags || []).join(' ')
      ])
    });
  });

  readings.forEach((reading) => {
    items.push({
      id: reading.id,
      type: 'reading',
      level: levelOf(reading),
      title: reading.title,
      subtitle: reading.topic,
      to: `/reading/${reading.id}`,
      haystack: joinHaystack([reading.title, reading.topic, reading.source, reading.passage])
    });
  });

  listeningTests.forEach((test) => {
    items.push({
      id: test.id,
      type: 'listening',
      level: levelOf(test),
      title: test.title,
      subtitle: test.topic,
      to: `/listening/${test.id}`,
      haystack: joinHaystack([test.title, test.topic, test.source])
    });
  });

  mockTests.forEach((test) => {
    items.push({
      id: test.id,
      type: 'test',
      level: levelOf(test),
      title: test.title,
      subtitle: test.description,
      to: `/mock-tests/${test.id}`,
      haystack: joinHaystack([test.title, test.description, test.type])
    });
  });

  writingSets.forEach((set) => {
    const chart = set.questions.find((question) => question.type === 'chart');
    const essay = set.questions.find((question) => question.type === 'essay');
    items.push({
      id: set.id,
      type: 'writing',
      level: 'TOPIK II',
      title: set.title,
      subtitle: [chart?.chart.title, essay?.topic].filter(Boolean).join(' · '),
      to: `/writing/${set.id}`,
      haystack: joinHaystack([
        set.title,
        `${set.round}회`,
        ...set.questions.flatMap((question) => [question.title, question.passage, question.prompt, question.topic, question.intro])
      ])
    });
  });

  planDays.forEach((day) => {
    day.words.forEach((word) => {
      items.push({
        id: word.id,
        type: 'plan',
        level: 'TOPIK II',
        title: word.word,
        subtitle: word.meaningKm ? `${word.meaning} · ${word.meaningKm}` : word.meaning,
        tag: `Day ${day.day}`,
        to: `/plan/${day.day}`,
        // The same word is usually in the word list too; rank that one first.
        penalty: 5,
        haystack: joinHaystack([word.word, word.meaning, word.meaningKm, word.example, word.exampleMeaning])
      });
    });
  });

  return items;
}

// Idempotent: concurrent callers share one build, later calls resolve instantly.
export function loadSearchIndex() {
  if (!indexPromise) {
    indexPromise = buildIndex().then((items) => {
      index = items;
      return items;
    });
  }
  return indexPromise;
}

export function isSearchIndexReady() {
  return index !== null;
}

// Rank matches so the most relevant rows surface first: exact title, then title
// prefix, then title substring, then a subtitle/keyword match.
function scoreItem(item, query, terms) {
  if (!terms.every((term) => item.haystack.includes(term))) return 0;

  const title = norm(item.title);
  let score = 1; // base score for matching the haystack at all
  if (title === query) score += 100;
  else if (title.startsWith(query)) score += 60;
  else if (title.includes(query)) score += 35;
  if (norm(item.subtitle).includes(query)) score += 15;
  // Shorter titles are usually the more specific/relevant match.
  score += Math.max(0, 12 - title.length) * 0.1;
  return Math.max(score - (item.penalty || 0), 0.5);
}

export function searchAll(rawQuery, limit = 12) {
  const query = norm(rawQuery).trim();
  if (!query || !index) return [];

  const terms = query.split(/\s+/).filter(Boolean);
  const matches = [];

  for (const item of index) {
    const score = scoreItem(item, query, terms);
    if (score > 0) matches.push({ item, score });
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, limit).map((match) => match.item);
}
