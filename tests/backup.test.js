import { describe, expect, it } from 'vitest';
import { backupFileName, createBackup, parseBackup, summarizeBackup } from '../src/lib/backup.js';

const state = {
  completedGrammarIds: ['g1', 'g2'],
  knownPlanWordIds: ['plan-01-01'],
  completedPlanDays: [1],
  writingDrafts: { 'writing-107:53': '초안' },
  vocabularyStats: { totalAnswered: 3, correctAnswers: 2, masteredWordIds: [], wordReview: {} },
  somethingElse: 'ignored'
};

describe('progress backup', () => {
  it('round-trips the saved fields and drops unknown ones', () => {
    const backup = createBackup(state, new Date('2026-11-11T08:00:00Z'));
    expect(backup.exportedAt).toBe('2026-11-11T08:00:00.000Z');
    const restored = parseBackup(JSON.stringify(backup));
    expect(restored.completedGrammarIds).toEqual(['g1', 'g2']);
    expect(restored.writingDrafts).toEqual({ 'writing-107:53': '초안' });
    expect(restored.somethingElse).toBeUndefined();
  });

  it('names the file by date', () => {
    expect(backupFileName(new Date('2026-11-11T08:00:00Z'))).toBe('topik-study-backup-2026-11-11.json');
  });

  it('rejects files that are not backups', () => {
    expect(() => parseBackup('not json')).toThrow(/JSON/);
    expect(() => parseBackup('{"hello":1}')).toThrow(/not a TOPIK Study backup/);
    expect(() => parseBackup(JSON.stringify({ app: 'topik-study', version: 99, state: {} }))).toThrow(/newer version/);
    expect(() => parseBackup(JSON.stringify({ app: 'topik-study', version: 1, state: {} }))).toThrow(/no progress/);
  });

  it('ignores fields of the wrong kind', () => {
    const text = JSON.stringify({ app: 'topik-study', version: 1, state: { completedGrammarIds: 'oops', completedPlanDays: [2] } });
    expect(parseBackup(text)).toEqual({ completedPlanDays: [2] });
  });

  it('summarizes what a backup holds', () => {
    expect(summarizeBackup(state)).toMatchObject({ grammar: 2, planWords: 1, planDays: 1, writing: 0 });
  });
});
