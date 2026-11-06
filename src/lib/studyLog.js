// Daily study activity, kept as { 'YYYY-MM-DD': points } in learning state.
// Points reward any real study: a quiz answer, finishing a lesson, a test.

export const DAILY_GOAL = 20;
const KEEP_DAYS = 400;

export const ACTIVITY_POINTS = {
  'record-vocab-answer': 1,
  'complete-grammar': 5,
  'complete-reading': 10,
  'complete-listening': 10,
  'record-test-attempt': 10,
  'complete-plan-day': 10,
  'record-plan-quiz': 5
};

// Local calendar day, so a late-night session counts for the learner's today.
export function dayKey(time = Date.now()) {
  const d = new Date(time);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function previousDay(key) {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d - 1).getTime());
}

export function addActivity(log = {}, points, time = Date.now()) {
  if (!points) return log;
  const key = dayKey(time);
  const next = { ...log, [key]: (log[key] || 0) + points };
  const keys = Object.keys(next).sort();
  if (keys.length > KEEP_DAYS) keys.slice(0, keys.length - KEEP_DAYS).forEach((k) => delete next[k]);
  return next;
}

export function pointsOn(log = {}, time = Date.now()) {
  return log[dayKey(time)] || 0;
}

// Consecutive days with any activity, ending today. If today has nothing yet
// the streak from yesterday still counts, so it doesn't look broken at 8 am.
export function currentStreak(log = {}, time = Date.now()) {
  let key = dayKey(time);
  if (!log[key]) key = previousDay(key);
  let streak = 0;
  while (log[key]) {
    streak += 1;
    key = previousDay(key);
  }
  return streak;
}

export function longestStreak(log = {}) {
  let best = 0;
  let run = 0;
  let prev = null;
  for (const key of Object.keys(log).filter((k) => log[k] > 0).sort()) {
    run = prev && previousDay(key) === prev ? run + 1 : 1;
    best = Math.max(best, run);
    prev = key;
  }
  return best;
}
