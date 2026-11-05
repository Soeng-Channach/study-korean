// Content integrity checks. These catch broken questions (bad answer index,
// duplicate ids, empty options) before they reach learners.
import { describe, expect, it } from 'vitest';
import { grammarLessons } from '../src/data/grammar.js';
import { vocabulary } from '../src/data/vocabulary.js';
import { readings } from '../src/data/reading.js';
import { listeningTests } from '../src/data/listening.js';
import { mockTests } from '../src/data/mockTests.js';
import { catalog } from '../src/data/catalog.js';
import { listeningIndex, readingIndex } from '../src/data/testIndex.js';
import { LEVELS } from '../src/lib/levels.js';
import { getVocabularyExample } from '../src/lib/vocabularyExamples.js';

function duplicates(ids) {
  const seen = new Set();
  return ids.filter((id) => (seen.has(id) ? true : (seen.add(id), false)));
}

function questionProblems(question) {
  const problems = [];
  if (Array.isArray(question.clauses)) {
    const labels = question.clauses.map((c) => c.label ?? c);
    const order = question.correctOrder || [];
    if (order.length !== labels.length || !order.every((l) => labels.includes(l))) problems.push('bad correctOrder');
    return problems;
  }
  const options = question.options || [];
  if (options.length < 2) problems.push(`only ${options.length} options`);
  if (options.some((o) => o === '' || o == null)) problems.push('empty option');
  if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= options.length) {
    problems.push(`answer ${question.answer} out of range`);
  }
  return problems;
}

function collectProblems(tests, getQuestions) {
  return tests.flatMap((test) =>
    getQuestions(test).flatMap((q) => questionProblems(q).map((p) => `${q.id}: ${p}`))
  );
}

describe('grammar', () => {
  it('has unique ids and required fields', () => {
    expect(duplicates(grammarLessons.map((l) => l.id))).toEqual([]);
    const missing = grammarLessons.filter((l) => !l.pattern || !l.meaning || !l.examples?.length).map((l) => l.id);
    expect(missing).toEqual([]);
  });

  it('has Khmer translations and distinct examples for every lesson', () => {
    const km = /[\u1780-\u17FF]/;
    const problems = grammarLessons
      .filter(
        (l) =>
          !km.test(l.coreMeaningKm || '') ||
          !km.test(l.explanationKm || '') ||
          l.examples.some((e) => !km.test(e.khmer || '')) ||
          new Set(l.examples.map((e) => e.korean)).size !== l.examples.length
      )
      .map((l) => l.id);
    expect(problems).toEqual([]);
  });
});

describe('vocabulary', () => {
  it('has unique ids and required fields', () => {
    expect(duplicates(vocabulary.map((w) => w.id))).toEqual([]);
    const missing = vocabulary.filter((w) => !w.word || !w.meaning).map((w) => w.id);
    expect(missing).toEqual([]);
  });

  it('has a Khmer example translation for every word', () => {
    const missing = vocabulary
      .map((w) => ({ id: w.id, km: getVocabularyExample(w).exampleMeaningKm }))
      .filter(({ km }) => !km || !/[\u1780-\u17FF]/.test(km))
      .map(({ id }) => id);
    expect(missing).toEqual([]);
  });

  it('has a Khmer meaning for every word', () => {
    const missingKm = vocabulary.filter((w) => !w.meaningKm || !/[\u1780-\u17FF]/.test(w.meaningKm)).map((w) => w.id);
    expect(missingKm).toEqual([]);
  });
});

describe.each([
  ['reading', readings],
  ['listening', listeningTests]
])('%s tests', (_name, tests) => {
  it('have unique test and question ids', () => {
    expect(duplicates(tests.map((t) => t.id))).toEqual([]);
    expect(duplicates(tests.flatMap((t) => t.questions.map((q) => q.id)))).toEqual([]);
  });

  it('have valid answers', () => {
    expect(collectProblems(tests, (t) => t.questions)).toEqual([]);
  });
});

describe('mock tests', () => {
  const questionsOf = (t) => t.sections.flatMap((s) => s.questions);

  it('have unique ids and valid answers', () => {
    expect(duplicates(mockTests.map((t) => t.id))).toEqual([]);
    expect(collectProblems(mockTests, questionsOf)).toEqual([]);
  });

  it('never repeat an option within a question', () => {
    const repeated = mockTests.flatMap(questionsOf).filter((q) => new Set(q.options).size !== q.options.length).map((q) => q.id);
    expect(repeated).toEqual([]);
  });
});

describe('catalog', () => {
  it('matches the bundled data (run `npm run catalog` if this fails)', () => {
    const count = (items) => ({
      total: items.length,
      byLevel: Object.fromEntries(LEVELS.map((lvl) => [lvl, items.filter((i) => (i.level || 'TOPIK II') === lvl).length]))
    });
    expect(catalog).toEqual({
      grammar: count(grammarLessons),
      vocabulary: count(vocabulary),
      reading: count(readings),
      listening: count(listeningTests),
      mockTests: count(mockTests)
    });
  });
});

describe('test index', () => {
  it.each([
    ['reading', readingIndex, readings],
    ['listening', listeningIndex, listeningTests]
  ])('%s index matches the data (run `npm run catalog` if this fails)', (_name, index, tests) => {
    expect(index.map((t) => [t.id, t.level, t.questionCount])).toEqual(
      tests.map((t) => [t.id, t.level, t.questionCount || t.questions.length])
    );
  });
});
