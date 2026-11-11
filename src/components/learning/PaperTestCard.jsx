import clsx from 'clsx';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Card for one past-paper test (reading, listening or writing) on the list pages.
// The round tile is a soft tint that fills with colour on hover.
const ACCENTS = {
  brand: {
    tile: 'bg-brand-50 text-brand-700 ring-brand-100 group-hover:bg-brand-600 dark:bg-brand-500/15 dark:text-brand-100 dark:ring-brand-500/25',
    hover: 'hover:border-brand-200 dark:hover:border-brand-500/40'
  },
  emerald: {
    tile: 'bg-emerald-50 text-emerald-700 ring-emerald-100 group-hover:bg-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-100 dark:ring-emerald-500/25',
    hover: 'hover:border-emerald-200 dark:hover:border-emerald-500/40'
  },
  violet: {
    tile: 'bg-violet-50 text-violet-700 ring-violet-100 group-hover:bg-violet-600 dark:bg-violet-500/15 dark:text-violet-100 dark:ring-violet-500/25',
    hover: 'hover:border-violet-200 dark:hover:border-violet-500/40'
  }
};

function roundOf(test) {
  const match = (test.title || test.id || '').match(/(\d+)/);
  return match ? match[1] : '—';
}

// The tile already shows the round, so the trailing "Test" is dropped from the title.
function displayTitle(title) {
  return String(title || '').replace(/\s+Test$/i, '');
}

// `note` is an optional short tag such as "Draft saved".
export default function PaperTestCard({ test, to, id, accent = 'brand', done, onToggleDone, note }) {
  const colors = ACCENTS[accent];
  const meta = [
    test.questionCount ? `${test.questionCount} questions` : null,
    test.durationMinutes ? `${test.durationMinutes} min` : null
  ].filter(Boolean);
  return (
    <Link
      to={to}
      id={id}
      className={clsx(
        'group relative flex scroll-mt-44 items-center gap-3 rounded-2xl border bg-white p-3 transition duration-200 hover:shadow-card dark:bg-slate-900',
        done
          ? 'border-mint-200 bg-mint-50/40 dark:border-mint-500/30 dark:bg-mint-500/5'
          : `border-slate-200/80 dark:border-slate-800 ${colors.hover}`
      )}
    >
      {/* Exam round tile */}
      <div
        className={clsx(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition duration-200 group-hover:text-white group-hover:ring-transparent',
          colors.tile
        )}
      >
        <span className="flex items-baseline gap-px">
          <span className="text-[15px] font-extrabold leading-none tabular-nums">{roundOf(test)}</span>
          <span className="text-[10px] font-semibold leading-none opacity-80">회</span>
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold leading-5 text-slate-900 dark:text-white">{displayTitle(test.title)}</h3>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-slate-500 dark:text-slate-400">
          {meta.map((item, index) => (
            <span key={item} className="inline-flex items-center gap-x-1.5">
              {index > 0 ? <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">·</span> : null}
              {item}
            </span>
          ))}
          {note ? (
            <span className="rounded-full bg-amber-100 px-1.5 py-px text-[11px] font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-100">
              {note}
            </span>
          ) : null}
        </p>
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
            ? 'bg-emerald-500 text-white'
            : 'border-[1.5px] border-slate-300 text-transparent hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-500 dark:border-slate-700 dark:hover:bg-emerald-500/10'
        )}
      >
        <Check size={11} strokeWidth={3} aria-hidden="true" />
      </button>
    </Link>
  );
}
