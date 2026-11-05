import { describe, expect, it } from 'vitest';
import { addActivity, currentStreak, dayKey, longestStreak, pointsOn } from '../src/lib/studyLog.js';

const day = (y, m, d, h = 12) => new Date(y, m - 1, d, h).getTime();

describe('studyLog', () => {
  it('adds points to the local day', () => {
    let log = addActivity({}, 1, day(2026, 11, 5, 23));
    log = addActivity(log, 5, day(2026, 11, 5, 8));
    expect(log).toEqual({ '2026-11-05': 6 });
    expect(pointsOn(log, day(2026, 11, 5))).toBe(6);
    expect(dayKey(day(2026, 1, 9))).toBe('2026-01-09');
  });

  it('counts a streak ending today or yesterday', () => {
    const log = { '2026-10-31': 3, '2026-11-01': 1, '2026-11-02': 2, '2026-11-04': 1 };
    expect(currentStreak(log, day(2026, 11, 4))).toBe(1);
    expect(currentStreak(log, day(2026, 11, 3))).toBe(3); // nothing today yet
    expect(currentStreak(log, day(2026, 11, 6))).toBe(0);
    expect(longestStreak(log)).toBe(3);
  });

  it('handles month and year boundaries', () => {
    const log = { '2025-12-31': 1, '2026-01-01': 1 };
    expect(currentStreak(log, day(2026, 1, 1))).toBe(2);
  });
});
