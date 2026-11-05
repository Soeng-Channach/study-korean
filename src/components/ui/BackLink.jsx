import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// One back-navigation pill for every detail/result page. `sticky` pins it to the
// top of the scrolling <main> (whose pt-5 the -top-5 cancels) so it stays
// reachable on long pages.
const base =
  'group inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:from-brand-700 hover:to-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900';

export default function BackLink({ to, onClick, children = 'Back', sticky = true, className }) {
  const classes = clsx(base, sticky && 'sticky -top-4 z-40 sm:-top-5', className);
  const content = (
    <>
      <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
