import clsx from 'clsx';
import { CheckCircle2, Circle, XCircle } from 'lucide-react';

export default function QuizOption({ option, index, selected, correct, revealed, onClick }) {
  const showCorrect = revealed && correct;
  const showWrong = revealed && selected && !correct;
  const optionNumber = Number.isInteger(index) ? index + 1 : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'group flex min-h-14 w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-semibold leading-5 transition [overflow-wrap:anywhere] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 sm:px-4',
        selected && !revealed && 'border-brand-500 bg-brand-50 text-brand-800 shadow-sm shadow-brand-600/10 dark:bg-brand-500/15 dark:text-brand-100',
        showCorrect && 'border-mint-500 bg-mint-50 text-mint-800 shadow-sm shadow-mint-600/10 dark:bg-mint-500/15 dark:text-mint-100',
        showWrong && 'border-coral-500 bg-coral-50 text-coral-800 shadow-sm shadow-coral-600/10 dark:bg-coral-500/15 dark:text-coral-100',
        !selected &&
          !correct &&
          'border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:bg-brand-50/60 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/10',
        revealed && !selected && !correct && 'opacity-70'
      )}
    >
      <span
        className={clsx(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition',
          selected && !revealed && 'border-brand-200 bg-white text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100',
          showCorrect && 'border-mint-200 bg-white text-mint-700 dark:border-mint-500/30 dark:bg-mint-500/10 dark:text-mint-100',
          showWrong && 'border-coral-200 bg-white text-coral-700 dark:border-coral-500/30 dark:bg-coral-500/10 dark:text-coral-100',
          !selected && !correct && 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
        )}
      >
        {optionNumber}
      </span>
      <span className="min-w-0 flex-1">{option}</span>
      {showCorrect ? <CheckCircle2 className="shrink-0 text-mint-600 dark:text-mint-100" size={18} /> : null}
      {showWrong ? <XCircle className="shrink-0 text-coral-600 dark:text-coral-100" size={18} /> : null}
      {!revealed && !selected ? <Circle className="shrink-0 text-slate-300 transition group-hover:text-brand-300 dark:text-slate-600" size={16} /> : null}
    </button>
  );
}
