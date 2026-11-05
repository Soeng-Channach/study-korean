import { RotateCcw } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { usePreferences } from '../../context/PreferencesContext';
import { primaryMeaning, secondaryMeaning } from '../../lib/meaningLanguage';
import SpeakButton from '../ui/SpeakButton';

// Meaning shown next to the Korean word: English, Khmer, or both on one line.
export default function VocabMeaningRow({ word }) {
  const { getVocabMeaning, isVocabMeaningEdited, dispatch } = useLearning();
  const { meaningLanguage } = usePreferences();
  const currentMeaning = getVocabMeaning(word);
  const shownMeaning = primaryMeaning(word, meaningLanguage, currentMeaning);
  const khmerLine = secondaryMeaning(word, meaningLanguage);
  const showingKhmer = shownMeaning !== currentMeaning;
  // Meanings can no longer be edited, but keep a way to undo older edits.
  const edited = isVocabMeaningEdited(word.id);

  if (showingKhmer) {
    return (
      <span lang="km" className="font-semibold leading-7 text-coral-700 dark:text-coral-100">
        — {shownMeaning}
      </span>
    );
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-x-1 font-semibold text-coral-700 dark:text-coral-100">
      <span>— {currentMeaning}</span>
      <SpeakButton
        text={currentMeaning}
        lang="en-US"
        size={16}
        className="inline-flex items-center justify-center rounded-full p-1 text-coral-600 transition hover:bg-coral-100 hover:text-slate-900 active:scale-95 active:text-slate-900 dark:text-coral-100 dark:hover:bg-coral-500/15 dark:hover:text-white dark:active:text-white"
        label={`Play English meaning ${currentMeaning}`}
      />
      {khmerLine ? (
        <span lang="km" className="font-medium text-slate-600 dark:text-slate-300">
          · {khmerLine}
        </span>
      ) : null}
      {edited ? (
        <button
          type="button"
          onClick={() => dispatch({ type: 'reset-vocab-meaning', id: word.id })}
          className="inline-flex items-center justify-center rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Reset to original meaning"
          title={`Reset to original (${word.meaning})`}
        >
          <RotateCcw size={12} />
        </button>
      ) : null}
    </span>
  );
}
