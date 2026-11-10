import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// Friendly placeholder for empty lists and "not found" pages. Pass `icon` to
// swap the picture and `action={{ to, label }}` to add a button.
export default function EmptyState({ title, message, icon: Icon = BookOpen, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900/60">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-100 text-brand-600 ring-1 ring-brand-100 dark:from-brand-500/15 dark:to-indigo-500/15 dark:text-brand-100 dark:ring-brand-500/20">
        <Icon size={26} aria-hidden="true" />
      </span>
      <h2 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h2>
      <p className="mt-1.5 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">{message}</p>
      {action ? (
        <Link
          to={action.to}
          className="group mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition hover:bg-brand-700"
        >
          {action.label}
          <ArrowRight size={15} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
