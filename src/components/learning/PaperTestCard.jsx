import clsx from 'clsx';
import { Check, Clock3, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';

// Card for one past-paper test (reading or listening) on the list pages.
const ACCENTS = {
  brand: {
    tile: 'from-brand-500 to-indigo-600 shadow-brand-500/30',
    hover: 'hover:ring-brand-200 dark:hover:ring-brand-500/40'
  },
  emerald: {
    tile: 'from-emerald-500 to-teal-600 shadow-emerald-500/30',
    hover: 'hover:ring-emerald-200 dark:hover:ring-emerald-500/40'
  },
  violet: {
    tile: 'from-violet-500 to-fuchsia-500 shadow-violet-500/30',
    hover: 'hover:ring-violet-200 dark:hover:ring-violet-500/40'
  }
};

function roundOf(test) {
  const match = (test.title || test.id || '').match(/(\d+)/);
  return match ? match[1] : '—';
}

// `note` is an optional short tag such as "Draft saved".
export default function PaperTestCard({ test, to, id, accent = 'brand', done, onToggleDone, note }) {
  const colors = ACCENTS[accent];
  return (
    <Link
      to={to}
      id={id}
      className={clsx(
        'group relative flex scroll-mt-44 items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-card ring-1 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft dark:bg-slate-900',
        done ? 'ring-mint-300 dark:ring-mint-500/40' : `ring-slate-200 dark:ring-slate-800 ${colors.hover}`
      )}
    >
      {/* Exam round tile */}
      <div
        className={clsx(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm',
          colors.tile
        )}
      >
        <span className="flex items-baseline gap-px">
          <span className="text-base font-black leading-none">{roundOf(test)}</span>
          <span className="text-[10px] font-bold leading-none text-white/90">회</span>
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-bold leading-5 text-slate-950 dark:text-white">{test.title}</h3>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
          {test.questionCount ? (
            <span className="inline-flex items-center gap-1">
              <ListChecks size={13} aria-hidden="true" /> {test.questionCount} questions
            </span>
          ) : null}
          {test.durationMinutes ? (
            <span className="inline-flex items-center gap-1">
              <Clock3 size={13} aria-hidden="true" /> {test.durationMinutes} min
            </span>
          ) : null}
          {note ? (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-100">
              {note}
            </span>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={done ? `Unmark ${test.title} as done` : `Mark ${test.title} as done`}
        title={done ? 'Completed' : 'Mark as done'}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onToggleDone();
        }}
        className={clsx(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition duration-200',
          done
            ? 'bg-gradient-to-br from-emerald-500 to-mint-500 text-white shadow-md shadow-emerald-500/30'
            : 'border-[1.5px] border-slate-300 text-transparent hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-500 dark:border-slate-700 dark:hover:bg-emerald-500/10'
        )}
      >
        <Check size={11} strokeWidth={3} aria-hidden="true" />
      </button>
    </Link>
  );
}
