import { BookOpenText } from 'lucide-react';
import { getVocabularyExample } from '../../lib/vocabularyExamples';
import SpeakButton from '../ui/SpeakButton';

export default function VocabExampleBlock({ word, compact = false }) {
  const example = getVocabularyExample(word);

  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/60">
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <BookOpenText size={13} aria-hidden="true" /> Example
      </div>
      <div className="flex items-start gap-2">
        <p className={`flex-1 font-semibold leading-6 text-slate-900 dark:text-white ${compact ? 'text-sm' : 'text-base'}`}>
          {example.example}
        </p>
        <SpeakButton text={example.example} size={14} label="Play example sentence" />
      </div>
      <div className="mt-1 flex items-start gap-2 border-t border-slate-200 pt-2 dark:border-slate-700/70">
        <p className="flex-1 text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">{example.exampleMeaning}</p>
        <SpeakButton text={example.exampleMeaning} lang="en-US" size={12} label="Play English translation" />
      </div>
    </div>
  );
}

