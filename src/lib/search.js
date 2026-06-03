import { grammarLessons } from '../data/grammar';
import { listeningTests } from '../data/listening';
import { mockTests } from '../data/mockTests';
import { readings } from '../data/reading';
import { vocabulary } from '../data/vocabulary';
import { levelOf } from './levels';

// Metadata for each searchable content type. `label` is shown as the result
// chip; the icon is mapped to a lucide component in the GlobalSearch UI.
export const SEARCH_TYPES = {
  vocab: { label: 'Vocab', icon: 'Languages' },
  grammar: { label: 'Grammar', icon: 'BookOpen' },
  reading: { label: 'Reading', icon: 'Newspaper' },
  listening: { label: 'Listening', icon: 'Headphones' },
  test: { label: 'Test', icon: 'ClipboardCheck' }
};

function norm(value) {
  return (value == null ? '' : String(value)).toLowerCase();
}

function joinHaystack(parts) {
  return norm(parts.filter(Boolean).join(' '));
}

// Build a flat, searchable index once at module load. The dataset is static, so
// there is no need to rebuild it on every keystroke or render.
const index = [];

vocabulary.forEach((word) => {
  const level = levelOf(word);
  index.push({
    id: word.id,
    type: 'vocab',
    level,
    title: word.word,
    subtitle: word.meaning,
    tag: word.partOfSpeech,
    // No per-word detail page exists, so deep-link into the Vocab list with the
    // word pre-filled. VocabularyPage reads the `q` and `level` params.
    to: `/vocabulary?q=${encodeURIComponent(word.word)}&level=${encodeURIComponent(level)}`,
    haystack: joinHaystack([
      word.word,
      word.hanja,
      word.meaning,
      word.example,
      word.exampleMeaning,
      (word.tags || []).join(' ')
    ])
  });
});

grammarLessons.forEach((lesson) => {
  index.push({
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
  index.push({
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
  index.push({
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
  index.push({
    id: test.id,
    type: 'test',
    level: levelOf(test),
    title: test.title,
    subtitle: test.description,
    to: `/mock-tests/${test.id}`,
    haystack: joinHaystack([test.title, test.description, test.type])
  });
});

export const searchIndexSize = index.length;

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
  return score;
}

export function searchAll(rawQuery, limit = 12) {
  const query = norm(rawQuery).trim();
  if (!query) return [];

  const terms = query.split(/\s+/).filter(Boolean);
  const matches = [];

  for (const item of index) {
    const score = scoreItem(item, query, terms);
    if (score > 0) matches.push({ item, score });
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, limit).map((match) => match.item);
}
