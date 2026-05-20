import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { grammarLessons } from '../data/grammar';
import { vocabulary } from '../data/vocabulary';
import { STORAGE_KEYS } from '../lib/constants';
import { readLearningState, writeLearningState } from '../lib/db';

const initialState = {
  completedGrammarIds: [],
  bookmarkedGrammarIds: [],
  completedReadingIds: [],
  vocabularyStats: {
    totalAnswered: 0,
    correctAnswers: 0,
    masteredWordIds: []
  },
  mockTestAttempts: []
};

function learningReducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...action.payload };
    case 'toggle-bookmark': {
      const exists = state.bookmarkedGrammarIds.includes(action.id);
      return {
        ...state,
        bookmarkedGrammarIds: exists
          ? state.bookmarkedGrammarIds.filter((id) => id !== action.id)
          : [...state.bookmarkedGrammarIds, action.id]
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
    case 'record-vocab-answer': {
      const masteredWordIds =
        action.correct && !state.vocabularyStats.masteredWordIds.includes(action.wordId)
          ? [...state.vocabularyStats.masteredWordIds, action.wordId]
          : state.vocabularyStats.masteredWordIds;

      return {
        ...state,
        vocabularyStats: {
          totalAnswered: state.vocabularyStats.totalAnswered + 1,
          correctAnswers: state.vocabularyStats.correctAnswers + (action.correct ? 1 : 0),
          masteredWordIds
        }
      };
    }
    case 'record-test-attempt':
      return {
        ...state,
        mockTestAttempts: [action.attempt, ...state.mockTestAttempts].slice(0, 20)
      };
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
    const grammarProgress = Math.round((state.completedGrammarIds.length / grammarLessons.length) * 100);
    const vocabProgress = Math.round(
      (state.vocabularyStats.masteredWordIds.length / vocabulary.length) * 100
    );

    return {
      state,
      isHydrated,
      grammarProgress,
      vocabProgress,
      dispatch,
      isGrammarBookmarked: (id) => state.bookmarkedGrammarIds.includes(id),
      isGrammarCompleted: (id) => state.completedGrammarIds.includes(id),
      isReadingCompleted: (id) => state.completedReadingIds.includes(id)
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
