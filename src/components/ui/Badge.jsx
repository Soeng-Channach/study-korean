import clsx from 'clsx';

const tones = {
  blue: 'bg-brand-50 text-brand-700 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-100 dark:ring-brand-500/25',
  green: 'bg-mint-100 text-mint-700 ring-mint-500/20 dark:bg-mint-500/15 dark:text-mint-100',
  rose: 'bg-coral-100 text-coral-700 ring-coral-500/20 dark:bg-coral-500/15 dark:text-coral-100',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700'
};

export default function Badge({ children, tone = 'slate', className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
