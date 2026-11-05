import { describe, expect, it } from 'vitest';
import {
  countMasteredWords,
  getVocabReview,
  nextVocabReview,
  reviewPriority,
  summarizeVocabReviews
} from '../src/lib/spacedRepetition.js';

const DAY = 24 * 60 * 60 * 1000;
const NOW = 1_700_000_000_000;

function answerSequence(results) {
  return results.reduce((review, correct) => nextVocabReview(review, correct, NOW), undefined);
}

describe('nextVocabReview', () => {
  it('moves through stages on consecutive correct answers', () => {
    expect(answerSequence([true]).stage).toBe('review');
    expect(answerSequence([true, true, true]).stage).toBe('strong');
    expect(answerSequence([true, true, true, true]).stage).toBe('mastered');
  });

  it('grows the interval with the streak and caps it at 14 days', () => {
    expect(answerSequence([true]).dueAt - NOW).toBe(DAY);
    expect(answerSequence([true, true]).dueAt - NOW).toBe(3 * DAY);
    expect(answerSequence([true, true, true]).dueAt - NOW).toBe(7 * DAY);
    expect(answerSequence(Array(8).fill(true)).dueAt - NOW).toBe(14 * DAY);
  });

  it('resets the streak and makes the word due now after a wrong answer', () => {
    const review = answerSequence([true, true, true, false]);
    expect(review).toMatchObject({ stage: 'learning', streak: 0, dueAt: NOW, wrongAnswers: 1, correctAnswers: 3, attempts: 4 });
  });
});

describe('getVocabReview', () => {
  const word = { id: 'vocab-001' };

  it('treats unseen words as new and due', () => {
    expect(getVocabReview(word, {}, NOW)).toMatchObject({ stage: 'new', due: true });
  });

  it('honours legacy mastered ids', () => {
    expect(getVocabReview(word, { masteredWordIds: ['vocab-001'] }, NOW)).toMatchObject({ stage: 'mastered', due: false, legacy: true });
  });

  it('uses dueAt to decide whether a word is due', () => {
    const stats = { wordReview: { 'vocab-001': { stage: 'review', dueAt: NOW + DAY } } };
    expect(getVocabReview(word, stats, NOW).due).toBe(false);
    expect(getVocabReview(word, stats, NOW + DAY).due).toBe(true);
  });
});

describe('summaries', () => {
  const words = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
  const stats = {
    masteredWordIds: ['d'],
    wordReview: {
      a: { stage: 'learning', dueAt: NOW - 1, wrongAnswers: 1 },
      b: { stage: 'mastered', dueAt: NOW + 14 * DAY, wrongAnswers: 0 }
    }
  };

  it('counts stages, due and weak words', () => {
    expect(summarizeVocabReviews(words, stats, NOW)).toEqual({
      new: 1, learning: 1, review: 0, strong: 0, mastered: 2, due: 1, weak: 1
    });
  });

  it('counts mastered words without the word list', () => {
    expect(countMasteredWords(stats)).toBe(2);
  });

  it('puts due words with mistakes first', () => {
    const sorted = [...words].sort((x, y) => reviewPriority(x, stats, NOW) - reviewPriority(y, stats, NOW));
    expect(sorted[0].id).toBe('a');
    expect(sorted.at(-1).id).toMatch(/[bd]/);
  });
});
