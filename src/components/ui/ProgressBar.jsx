import clsx from 'clsx';

export default function ProgressBar({ value, label, ariaLabel, barClassName = 'bg-brand-600', size = 'md' }) {
  const safeValue = Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));

  return (
    <div>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
          <span>{label}</span>
          <span className="tabular-nums">{safeValue}%</span>
        </div>
      ) : null}
      <div
        className={clsx(
          'overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800',
          size === 'sm' ? 'h-1.5' : 'h-2.5'
        )}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
        aria-label={label || ariaLabel || 'Progress'}
      >
        <div
          className={clsx('h-full rounded-full transition-all duration-500', barClassName)}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
