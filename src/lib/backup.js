// Export and import of the learner's progress as a JSON file, so it can be
// kept safe or moved to another browser or computer.

const APP_ID = 'topik-study';
const VERSION = 1;

// Every saved field and the kind of value it must hold.
const SHAPE = {
  completedGrammarIds: 'array',
  bookmarkedGrammarIds: 'array',
  bookmarkedVocabIds: 'array',
  completedReadingIds: 'array',
  completedListeningIds: 'array',
  grammarCoreOverrides: 'object',
  vocabMeaningOverrides: 'object',
  vocabularyStats: 'object',
  mockTestAttempts: 'array',
  studyLog: 'object',
  knownPlanWordIds: 'array',
  completedPlanDays: 'array',
  planQuizBest: 'object',
  writingDrafts: 'object',
  completedWritingIds: 'array'
};

function kindOf(value) {
  if (Array.isArray(value)) return 'array';
  if (value && typeof value === 'object') return 'object';
  return typeof value;
}

export function createBackup(state, now = new Date()) {
  const saved = {};
  for (const key of Object.keys(SHAPE)) {
    if (kindOf(state?.[key]) === SHAPE[key]) saved[key] = state[key];
  }
  return { app: APP_ID, version: VERSION, exportedAt: now.toISOString(), state: saved };
}

export function backupFileName(now = new Date()) {
  return `topik-study-backup-${now.toISOString().slice(0, 10)}.json`;
}

// Returns the progress held in a backup file. Throws an Error with a message
// for the user when the text is not a backup made by this app.
export function parseBackup(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('This file is not a valid backup (it could not be read as JSON).');
  }
  if (kindOf(data) !== 'object' || data.app !== APP_ID || kindOf(data.state) !== 'object') {
    throw new Error('This file is not a TOPIK Study backup.');
  }
  if (typeof data.version !== 'number' || data.version > VERSION) {
    throw new Error('This backup was made by a newer version of the app.');
  }
  const restored = {};
  for (const key of Object.keys(SHAPE)) {
    if (kindOf(data.state[key]) === SHAPE[key]) restored[key] = data.state[key];
  }
  if (Object.keys(restored).length === 0) throw new Error('This backup has no progress in it.');
  return restored;
}

// Short counts shown before the user confirms an import.
export function summarizeBackup(state) {
  const count = (key) => (Array.isArray(state[key]) ? state[key].length : 0);
  return {
    grammar: count('completedGrammarIds'),
    planWords: count('knownPlanWordIds'),
    planDays: count('completedPlanDays'),
    reading: count('completedReadingIds'),
    listening: count('completedListeningIds'),
    writing: count('completedWritingIds'),
    savedWords: count('bookmarkedVocabIds'),
    tests: count('mockTestAttempts')
  };
}
