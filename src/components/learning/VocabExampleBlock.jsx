import { BookOpenText } from 'lucide-react';
import { getVocabularyExample } from '../../lib/vocabularyExamples';
import SpeakButton from '../ui/SpeakButton';
import { usePreferences } from '../../context/PreferencesContext';

export default function VocabExampleBlock({ word, compact = false }) {
  const example = getVocabularyExample(word);
  const { meaningLanguage } = usePreferences();
  const khmer = example.exampleMeaningKm;
  const showEnglish = meaningLanguage !== 'km' || !khmer;
  const showKhmer = meaningLanguage !== 'en' && khmer;

  return (
    <div className="mt-3 rounded-xl bg-slate-50 px-3.5 py-3 dark:bg-slate-800/60">
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <BookOpenText size={13} aria-hidden="true" /> Example
      </div>
      <div className="flex items-start gap-2">
        <p className={`flex-1 font-semibold leading-6 text-slate-900 dark:text-white ${compact ? 'text-sm' : 'text-base'}`}>
          {example.example}
        </p>
        <SpeakButton text={example.example} size={14} label="Play example sentence" />
      </div>
      <div className="mt-1 border-t border-slate-200 pt-2 dark:border-slate-700/70">
        {showEnglish ? (
          <div className="flex items-start gap-2">
            <p className="flex-1 text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">{example.exampleMeaning}</p>
            <SpeakButton text={example.exampleMeaning} lang="en-US" size={12} label="Play English translation" />
          </div>
        ) : null}
        {showKhmer ? (
          <p lang="km" className={`text-xs leading-6 text-violet-700 dark:text-violet-300 sm:text-sm ${showEnglish ? 'mt-1' : ''}`}>
            {khmer}
          </p>
        ) : null}
      </div>
    </div>
  );
}

