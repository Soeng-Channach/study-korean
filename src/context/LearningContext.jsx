import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { STORAGE_KEYS } from '../lib/constants';
import { readLearningState, writeLearningState } from '../lib/db';
import { countMasteredWords, getVocabReview, nextVocabReview } from '../lib/spacedRepetition';

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
  mockTestAttempts: []
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

function learningReducer(state, action) {
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
    case 'reset-progress':
      return initialState;
    default:
      return state;
  }
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
      getVocabReviewStatus: (word) => getVocabReview(word, state.vocabularyStats)
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
