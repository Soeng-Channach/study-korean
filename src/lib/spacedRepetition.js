const DAY = 24 * 60 * 60 * 1000;

export const VOCAB_REVIEW_STAGES = {
  new: { label: 'New', tone: 'slate' },
  learning: { label: 'Learning', tone: 'rose' },
  review: { label: 'Review', tone: 'blue' },
  strong: { label: 'Strong', tone: 'green' },
  mastered: { label: 'Mastered', tone: 'green' }
};

const CORRECT_INTERVALS = [0, DAY, 3 * DAY, 7 * DAY, 14 * DAY];

export function nextVocabReview(previous, correct, now = Date.now()) {
  const current = previous || {};
  const attempts = (current.attempts || 0) + 1;
  const correctAnswers = (current.correctAnswers || 0) + (correct ? 1 : 0);
  const wrongAnswers = (current.wrongAnswers || 0) + (correct ? 0 : 1);
  const streak = correct ? (current.streak || 0) + 1 : 0;
  const interval = correct ? CORRECT_INTERVALS[Math.min(streak, CORRECT_INTERVALS.length - 1)] : 0;
  const stage = correct
    ? streak >= 4
      ? 'mastered'
      : streak >= 3
        ? 'strong'
        : 'review'
    : 'learning';

  return {
    attempts,
    correctAnswers,
    wrongAnswers,
    streak,
    stage,
    lastAnsweredAt: now,
    dueAt: now + interval
  };
}

export function getVocabReview(word, stats = {}, now = Date.now()) {
  const review = stats.wordReview?.[word.id];
  const legacyMastered = (stats.masteredWordIds || []).includes(word.id);

  if (review) {
    return {
      ...review,
      stage: review.stage || 'learning',
      due: (review.dueAt || 0) <= now,
      legacy: false
    };
  }

  if (legacyMastered) {
    return {
      attempts: 1,
      correctAnswers: 1,
      wrongAnswers: 0,
      streak: 1,
      stage: 'mastered',
      dueAt: Number.POSITIVE_INFINITY,
      due: false,
      legacy: true
    };
  }

  return {
    attempts: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    streak: 0,
    stage: 'new',
    dueAt: 0,
    due: true,
    legacy: false
  };
}

export function summarizeVocabReviews(words, stats = {}, now = Date.now()) {
  return words.reduce(
    (summary, word) => {
      const review = getVocabReview(word, stats, now);
      summary[review.stage] += 1;
      if (review.due && review.stage !== 'new') summary.due += 1;
      if (review.wrongAnswers > 0 && review.stage !== 'mastered') summary.weak += 1;
      return summary;
    },
    { new: 0, learning: 0, review: 0, strong: 0, mastered: 0, due: 0, weak: 0 }
  );
}

export function reviewPriority(word, stats = {}, now = Date.now()) {
  const review = getVocabReview(word, stats, now);
  if (review.due && review.wrongAnswers > 0) return 0;
  if (review.stage === 'learning') return 1;
  if (review.due) return 2;
  if (review.stage === 'new') return 3;
  if (review.stage === 'review') return 4;
  if (review.stage === 'strong') return 5;
  return 6;
}

