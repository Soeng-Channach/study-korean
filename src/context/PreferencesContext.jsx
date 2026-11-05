import { createContext, useContext, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../lib/constants';
import { MEANING_LANGUAGES } from '../lib/meaningLanguage';

const PreferencesContext = createContext(null);

function readMeaningLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.meaningLanguage);
    if (MEANING_LANGUAGES.some((option) => option.value === stored)) return stored;
  } catch {
    // Storage unavailable; fall back to the default.
  }
  return 'both';
}

// Device-level preferences. Kept apart from learning progress so that
// "Reset progress" never clears them.
export function PreferencesProvider({ children }) {
  const [meaningLanguage, setMeaningLanguageState] = useState(readMeaningLanguage);

  const value = useMemo(
    () => ({
      meaningLanguage,
      setMeaningLanguage: (next) => {
        setMeaningLanguageState(next);
        try {
          localStorage.setItem(STORAGE_KEYS.meaningLanguage, next);
        } catch {
          // Storage unavailable; the choice still applies for this session.
        }
      }
    }),
    [meaningLanguage]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used inside PreferencesProvider');
  }
  return context;
}
