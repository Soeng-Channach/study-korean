import { useState } from 'react';
import { Pencil, RotateCcw } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import SpeakButton from '../ui/SpeakButton';

export default function VocabMeaningRow({ word }) {
  const { getVocabMeaning, isVocabMeaningEdited, dispatch } = useLearning();
  const currentMeaning = getVocabMeaning(word);
  const edited = isVocabMeaningEdited(word.id);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(currentMeaning);

  function startEdit() {
    setDraft(currentMeaning);
    setEditing(true);
  }
  function save() {
    const next = draft.trim();
    if (!next) {
      setEditing(false);
      return;
    }
    dispatch({ type: 'update-vocab-meaning', id: word.id, meaning: next });
    setEditing(false);
  }
  function resetToOriginal() {
    dispatch({ type: 'reset-vocab-meaning', id: word.id });
    setEditing(false);
  }

  if (editing) {
    return (
      <span className="inline-flex items-center gap-1">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save();
            else if (e.key === 'Escape') setEditing(false);
          }}
          autoFocus
          className="min-w-0 rounded border border-coral-300 bg-white px-1.5 py-0.5 text-sm font-semibold text-coral-700 focus:border-coral-500 focus:outline-none focus:ring-1 focus:ring-coral-500/40 dark:border-coral-500/40 dark:bg-slate-900 dark:text-coral-100"
        />
        <button
          type="button"
          onClick={save}
          className="rounded-full bg-coral-500 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-coral-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 font-semibold text-coral-700 dark:text-coral-100">
      — {currentMeaning}
      <SpeakButton
        text={currentMeaning}
        lang="en-US"
        size={16}
        className="inline-flex items-center justify-center rounded-full p-1 text-coral-600 transition hover:bg-coral-100 hover:text-slate-900 active:scale-95 active:text-slate-900 dark:text-coral-100 dark:hover:bg-coral-500/15 dark:hover:text-white dark:active:text-white"
        label={`Play English meaning ${currentMeaning}`}
      />
      <button
        type="button"
        onClick={startEdit}
        className="inline-flex items-center justify-center rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        aria-label="Edit meaning"
        title="Edit meaning"
      >
        <Pencil size={12} />
      </button>
      {edited ? (
        <button
          type="button"
          onClick={resetToOriginal}
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
