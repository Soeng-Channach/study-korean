import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { STORAGE_KEYS } from '../lib/constants';
import { readLearningState, writeLearningState } from '../lib/db';
import { countMasteredWords, getVocabReview, nextVocabReview } from '../lib/spacedRepetition';
import { ACTIVITY_POINTS, addActivity } from '../lib/studyLog';

const initialState = {
  completedGrammarIds: [],
  bookmarkedGrammarIds: [],
  bookmarkedVocabIds: [],
  completedReadingIds: [],
  completedListeningIds: [],
  grammarCoreOverrides: {},
  vocabMeaningOverrides: {},
  vocabularyStats: {
    totalAnswered: 0,
    correctAnswers: 0,
    masteredWordIds: [],
    wordReview: {}
  },
  mockTestAttempts: [],
  studyLog: {},
  // 30-Day vocabulary plan
  knownPlanWordIds: [],
  completedPlanDays: [],
  planQuizBest: {},
  // TOPIK II writing practice: drafts keyed by `${setId}:${field}`
  writingDrafts: {},
  completedWritingIds: []
};

function normalizeLearningState(state, payload = {}) {
  return {
    ...state,
    ...payload,
    vocabularyStats: {
      ...state.vocabularyStats,
      ...(payload.vocabularyStats || {}),
      wordReview: payload.vocabularyStats?.wordReview || state.vocabularyStats.wordReview
    }
  };
}

function baseReducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return normalizeLearningState(state, action.payload);
    case 'toggle-bookmark': {
      const exists = state.bookmarkedGrammarIds.includes(action.id);
      return {
        ...state,
        bookmarkedGrammarIds: exists
          ? state.bookmarkedGrammarIds.filter((id) => id !== action.id)
          : [...state.bookmarkedGrammarIds, action.id]
      };
    }
    case 'toggle-vocab-bookmark': {
      const list = state.bookmarkedVocabIds || [];
      const exists = list.includes(action.id);
      return {
        ...state,
        bookmarkedVocabIds: exists ? list.filter((id) => id !== action.id) : [...list, action.id]
      };
    }
    case 'complete-grammar':
      return {
        ...state,
        completedGrammarIds: state.completedGrammarIds.includes(action.id)
          ? state.completedGrammarIds
          : [...state.completedGrammarIds, action.id]
      };
    case 'complete-reading':
      return {
        ...state,
        completedReadingIds: state.completedReadingIds.includes(action.id)
          ? state.completedReadingIds
          : [...state.completedReadingIds, action.id]
      };
    case 'uncomplete-reading':
      return {
        ...state,
        completedReadingIds: state.completedReadingIds.filter((id) => id !== action.id)
      };
    case 'complete-listening': {
      const list = state.completedListeningIds || [];
      return {
        ...state,
        completedListeningIds: list.includes(action.id) ? list : [...list, action.id]
      };
    }
    case 'uncomplete-listening': {
      const list = state.completedListeningIds || [];
      return {
        ...state,
        completedListeningIds: list.filter((id) => id !== action.id)
      };
    }
    case 'record-vocab-answer': {
      const stats = state.vocabularyStats || initialState.vocabularyStats;
      const wordReview = stats.wordReview || {};
      const nextReview = nextVocabReview(wordReview[action.wordId], action.correct, action.answeredAt);
      const masteredSet = new Set(stats.masteredWordIds || []);
      if (nextReview.stage === 'mastered') masteredSet.add(action.wordId);
      else masteredSet.delete(action.wordId);

      return {
        ...state,
        vocabularyStats: {
          ...stats,
          totalAnswered: (stats.totalAnswered || 0) + 1,
          correctAnswers: (stats.correctAnswers || 0) + (action.correct ? 1 : 0),
          masteredWordIds: Array.from(masteredSet),
          wordReview: {
            ...wordReview,
            [action.wordId]: nextReview
          }
        }
      };
    }
    case 'record-test-attempt':
      return {
        ...state,
        mockTestAttempts: [action.attempt, ...state.mockTestAttempts].slice(0, 20)
      };
    case 'update-grammar-meaning': {
      const trimmed = (action.coreMeaning || '').trim();
      if (!trimmed) return state;
      return {
        ...state,
        grammarCoreOverrides: {
          ...state.grammarCoreOverrides,
          [action.id]: trimmed
        }
      };
    }
    case 'reset-grammar-meaning': {
      if (!state.grammarCoreOverrides[action.id]) return state;
      const rest = { ...state.grammarCoreOverrides };
      delete rest[action.id];
      return { ...state, grammarCoreOverrides: rest };
    }
    case 'update-vocab-meaning': {
      const trimmed = (action.meaning || '').trim();
      if (!trimmed) return state;
      return {
        ...state,
        vocabMeaningOverrides: {
          ...(state.vocabMeaningOverrides || {}),
          [action.id]: trimmed
        }
      };
    }
    case 'reset-vocab-meaning': {
      const overrides = state.vocabMeaningOverrides || {};
      if (!overrides[action.id]) return state;
      const rest = { ...overrides };
      delete rest[action.id];
      return { ...state, vocabMeaningOverrides: rest };
    }
    case 'toggle-plan-word': {
      const known = state.knownPlanWordIds || [];
      return {
        ...state,
        knownPlanWordIds: known.includes(action.id) ? known.filter((id) => id !== action.id) : [...known, action.id]
      };
    }
    case 'complete-plan-day': {
      const days = state.completedPlanDays || [];
      return days.includes(action.id) ? state : { ...state, completedPlanDays: [...days, action.id] };
    }
    case 'uncomplete-plan-day':
      return { ...state, completedPlanDays: (state.completedPlanDays || []).filter((day) => day !== action.id) };
    case 'record-plan-quiz': {
      const best = state.planQuizBest || {};
      const previous = best[action.day];
      if (previous && previous.correct >= action.correct) return state;
      return { ...state, planQuizBest: { ...best, [action.day]: { correct: action.correct, total: action.total } } };
    }
    case 'save-writing-draft': {
      const drafts = { ...(state.writingDrafts || {}) };
      if (action.text) drafts[action.key] = action.text;
      else delete drafts[action.key];
      return { ...state, writingDrafts: drafts };
    }
    case 'clear-writing-drafts': {
      const drafts = Object.fromEntries(
        Object.entries(state.writingDrafts || {}).filter(([key]) => !key.startsWith(`${action.id}:`))
      );
      return { ...state, writingDrafts: drafts };
    }
    case 'complete-writing': {
      const ids = state.completedWritingIds || [];
      return ids.includes(action.id) ? state : { ...state, completedWritingIds: [...ids, action.id] };
    }
    case 'uncomplete-writing':
      return { ...state, completedWritingIds: (state.completedWritingIds || []).filter((id) => id !== action.id) };
    case 'reset-progress':
      return initialState;
    default:
      return state;
  }
}

const COMPLETION_LISTS = {
  'complete-grammar': 'completedGrammarIds',
  'complete-reading': 'completedReadingIds',
  'complete-listening': 'completedListeningIds',
  'complete-plan-day': 'completedPlanDays',
  'complete-writing': 'completedWritingIds'
};

// Wraps the base reducer to log study points per day for streaks and the
// daily goal. Re-completing an already finished lesson earns nothing.
function learningReducer(state, action) {
  const next = baseReducer(state, action);
  const points = ACTIVITY_POINTS[action.type];
  if (!points) return next;
  const list = COMPLETION_LISTS[action.type];
  if (list && (state[list] || []).includes(action.id)) return next;
  return { ...next, studyLog: addActivity(state.studyLog, points, action.answeredAt) };
}

const LearningContext = createContext(null);

export function LearningProvider({ children }) {
  const [state, dispatch] = useReducer(learningReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    readLearningState(STORAGE_KEYS.learningState, initialState).then((storedState) => {
      dispatch({ type: 'hydrate', payload: storedState });
      setIsHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (isHydrated) {
      writeLearningState(STORAGE_KEYS.learningState, state);
    }
  }, [isHydrated, state]);

  const value = useMemo(() => {
    return {
      state,
      isHydrated,
      masteredWordCount: countMasteredWords(state.vocabularyStats),
      dispatch,
      isGrammarBookmarked: (id) => state.bookmarkedGrammarIds.includes(id),
      isVocabBookmarked: (id) => (state.bookmarkedVocabIds || []).includes(id),
      isGrammarCompleted: (id) => state.completedGrammarIds.includes(id),
      isReadingCompleted: (id) => state.completedReadingIds.includes(id),
      isListeningCompleted: (id) => (state.completedListeningIds || []).includes(id),
      getGrammarCoreMeaning: (lesson) =>
        (lesson && state.grammarCoreOverrides[lesson.id]) || lesson?.coreMeaning,
      isGrammarMeaningEdited: (id) => Boolean(state.grammarCoreOverrides[id]),
      getVocabMeaning: (word) =>
        (word && (state.vocabMeaningOverrides || {})[word.id]) || word?.meaning,
      isVocabMeaningEdited: (id) => Boolean((state.vocabMeaningOverrides || {})[id]),
      getVocabReviewStatus: (word) => getVocabReview(word, state.vocabularyStats),
      isPlanWordKnown: (id) => (state.knownPlanWordIds || []).includes(id),
      isPlanDayCompleted: (day) => (state.completedPlanDays || []).includes(day),
      isWritingCompleted: (id) => (state.completedWritingIds || []).includes(id)
    };
  }, [isHydrated, state]);

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used inside LearningProvider');
  }
  return context;
}
