import clsx from 'clsx';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500',
  vocab: 'bg-gradient-to-r from-coral-500 to-pink-500 text-white shadow-md shadow-coral-500/30 hover:from-coral-600 hover:to-pink-600 focus-visible:ring-coral-500',
  secondary:
    'bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-800',
  ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
  danger: 'bg-coral-500 text-white hover:bg-coral-700 focus-visible:ring-coral-500'
};

export default function Button({
  children,
  className,
  variant = 'primary',
  type = 'button',
  icon: Icon,
  ...props
}) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950',
        variants[variant],
        className
      )}
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      {children}
    </button>
  );
}
