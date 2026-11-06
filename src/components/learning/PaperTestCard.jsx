import clsx from 'clsx';
import { ArrowRight, Check, Clock3, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';

// Card for one past-paper test (reading or listening) on the list pages.
const ACCENTS = {
  brand: {
    tile: 'from-brand-500 to-indigo-600 shadow-brand-500/30',
    hover: 'hover:ring-brand-200 dark:hover:ring-brand-500/40',
    start: 'text-brand-700 dark:text-brand-100'
  },
  violet: {
    tile: 'from-violet-500 to-fuchsia-500 shadow-violet-500/30',
    hover: 'hover:ring-violet-200 dark:hover:ring-violet-500/40',
    start: 'text-violet-700 dark:text-violet-200'
  }
};

function roundOf(test) {
  const match = (test.title || test.id || '').match(/(\d+)/);
  return match ? match[1] : '—';
}

export default function PaperTestCard({ test, to, id, icon: Icon, accent = 'brand', done, onToggleDone, kindLabel }) {
  const colors = ACCENTS[accent];
  return (
    <Link
      to={to}
      id={id}
      className={clsx(
        'group relative flex scroll-mt-44 items-center gap-3.5 rounded-2xl bg-white p-3.5 shadow-card ring-1 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft dark:bg-slate-900 sm:gap-4 sm:p-4',
        done ? 'ring-mint-300 dark:ring-mint-500/40' : `ring-slate-200 dark:ring-slate-800 ${colors.hover}`
      )}
    >
      {/* Exam round tile */}
      <div
        className={clsx(
          'flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md',
          colors.tile
        )}
      >
        <span className="text-2xl font-black leading-none">{roundOf(test)}</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">회 · round</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {Icon ? <Icon size={12} aria-hidden="true" /> : null}
          {test.level} · {kindLabel}
        </div>
        <h3 className="mt-0.5 truncate text-base font-bold text-slate-950 dark:text-white sm:text-lg">{test.title}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
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
          <span className={clsx('hidden items-center gap-0.5 font-semibold sm:inline-flex', colors.start)}>
            Start <ArrowRight size={13} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
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
          'flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-full transition duration-200',
          done
            ? 'bg-gradient-to-br from-emerald-500 to-mint-500 text-white shadow-md shadow-emerald-500/30'
            : 'border-2 border-slate-200 text-transparent hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-500 dark:border-slate-700 dark:hover:bg-emerald-500/10'
        )}
      >
        <Check size={15} strokeWidth={3} aria-hidden="true" />
      </button>
    </Link>
  );
}
