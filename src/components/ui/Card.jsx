import clsx from 'clsx';

export default function Card({ children, className, as: Component = 'div' }) {
  return (
    <Component
      className={clsx(
        'rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900',
        className
      )}
    >
      {children}
    </Component>
  );
}
