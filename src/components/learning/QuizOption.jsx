import clsx from 'clsx';

export default function QuizOption({ option, selected, correct, revealed, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'min-h-12 w-full rounded-lg border px-3 py-3 text-left text-sm font-semibold leading-5 transition [overflow-wrap:anywhere] sm:px-4',
        selected && !revealed && 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100',
        revealed && correct && 'border-mint-500 bg-mint-100 text-mint-700 dark:bg-mint-500/15 dark:text-mint-100',
        revealed && selected && !correct && 'border-coral-500 bg-coral-100 text-coral-700 dark:bg-coral-500/15 dark:text-coral-100',
        !selected &&
          !correct &&
          'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
      )}
    >
      {option}
    </button>
  );
}
