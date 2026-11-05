import clsx from 'clsx';

export default function Card({ children, className, as: Component = 'div', id }) {
  return (
    <Component
      id={id}
      className={clsx(
        'rounded-2xl border border-slate-200 bg-white p-3.5 shadow-card dark:border-slate-800 dark:bg-slate-900 sm:p-5',
        className
      )}
    >
      {children}
    </Component>
  );
}
