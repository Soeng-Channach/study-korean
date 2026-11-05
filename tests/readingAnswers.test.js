import { describe, expect, it } from 'vitest';
import { isAnswerCorrect, isAnswered, isOrderingQuestion } from '../src/lib/readingAnswers.js';

describe('readingAnswers', () => {
  const choice = { answer: 2, options: ['a', 'b', 'c', 'd'] };
  const ordering = { clauses: [{ label: '가' }, { label: '나' }, { label: '다' }], correctOrder: ['나', '가', '다'] };

  it('detects ordering questions', () => {
    expect(isOrderingQuestion(choice)).toBe(false);
    expect(isOrderingQuestion(ordering)).toBe(true);
  });

  it('checks multiple choice answers', () => {
    expect(isAnswered(choice, undefined)).toBe(false);
    expect(isAnswered(choice, 0)).toBe(true);
    expect(isAnswerCorrect(choice, 2)).toBe(true);
    expect(isAnswerCorrect(choice, 1)).toBe(false);
  });

  it('checks ordering answers only when complete and in order', () => {
    expect(isAnswered(ordering, ['나', '가'])).toBe(false);
    expect(isAnswerCorrect(ordering, ['나', '가', '다'])).toBe(true);
    expect(isAnswerCorrect(ordering, ['가', '나', '다'])).toBe(false);
  });
});
