import clsx from 'clsx';
import { Check } from 'lucide-react';

// Shared pieces for one question on the reading and listening test pages:
// a numbered header with the points, a tinted passage box, and answer rows.

export const questionCardClass = 'scroll-mt-24 rounded-2xl p-4 shadow-card sm:p-6';

// The exam's group line ("※ [1~3] ..."), shown small above the first question of a group.
export function GroupInstruction({ children }) {
  return (
    <p className="mb-3 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400 sm:mb-4 sm:text-sm">{children}</p>
  );
}

export function QuestionHeader({ number, points, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-sm shadow-brand-600/30">
        {number}
      </span>
      <h3 className="min-w-0 flex-1 pt-0.5 text-base font-bold leading-7 text-slate-950 dark:text-white sm:text-[17px]">
        {children}
      </h3>
      {points ? (
        <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-100 dark:ring-brand-500/30">
          {points}점
        </span>
      ) : null}
    </div>
  );
}

export function PassageBox({ children, className }) {
  return (
    <div
      className={clsx(
        'mt-3.5 rounded-xl bg-brand-50/60 px-4 py-3.5 text-[17px] leading-8 text-slate-900 ring-1 ring-brand-100 dark:bg-slate-800/70 dark:text-slate-100 dark:ring-slate-700 sm:px-5 sm:py-4',
        className
      )}
    >
      {children}
    </div>
  );
}

// One answer row. `image` lays the content out under the number for picture choices.
export function OptionButton({ index, selected, correct, revealed, onSelect, image = false, children }) {
  const right = revealed && correct;
  const wrong = revealed && selected && !correct;
  const picked = selected && !revealed;
  return (
    <button
      type="button"
      onClick={() => {
        if (!revealed) onSelect(index);
      }}
      aria-pressed={selected}
      className={clsx(
        'flex w-full items-center gap-3 rounded-xl border text-left text-[17px] font-medium leading-7 transition [overflow-wrap:anywhere]',
        image ? 'flex-col items-stretch p-2.5 sm:p-3' : 'min-h-[52px] px-3.5 py-2.5 sm:px-4',
        right && 'border-mint-500 bg-mint-50 text-mint-700 dark:bg-mint-500/15 dark:text-mint-100',
        wrong && 'border-coral-500 bg-coral-50 text-coral-700 dark:bg-coral-500/15 dark:text-coral-100',
        picked && 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm dark:bg-brand-500/15 dark:text-brand-100',
        !right && !wrong && !picked &&
          'border-slate-200 bg-white text-slate-900 hover:border-brand-200 hover:bg-brand-50/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800'
      )}
    >
      <span
        className={clsx(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
          right && 'border-mint-500 bg-mint-500 text-white',
          wrong && 'border-coral-500 bg-coral-500 text-white',
          picked && 'border-brand-600 bg-brand-600 text-white',
          !right && !wrong && !picked && 'border-slate-300 bg-white text-slate-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-300'
        )}
      >
        {right ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : index + 1}
      </span>
      {image ? children : <span className="min-w-0 flex-1">{children}</span>}
    </button>
  );
}

// "0 / 40 answered" button in the sticky bar; opens the jump grid.
export function AnsweredCount({ answered, correct, total, revealed, ...props }) {
  return (
    <button
      type="button"
      className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      {...props}
    >
      {revealed ? (
        <>
          <span className="font-bold text-slate-950 dark:text-white">{correct} / {total}</span>
          <span className="hidden sm:inline">correct</span>
        </>
      ) : (
        <>
          <span className="font-bold text-slate-950 dark:text-white">{answered} / {total}</span>
          <span className="hidden sm:inline">answered</span>
        </>
      )}
    </button>
  );
}

// Small round toggle in the sticky bar that marks the whole test as done.
export function DoneToggle({ done, onToggle, title }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={done}
      aria-label={done ? `Unmark ${title} as done` : `Mark ${title} as done`}
      title={done ? 'Marked done' : 'Mark done'}
      onClick={onToggle}
      className={clsx(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition',
        done
          ? 'bg-gradient-to-br from-emerald-500 to-mint-500 text-white shadow-sm'
          : 'border border-slate-300 text-slate-400 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-600'
      )}
    >
      <Check size={11} strokeWidth={3} aria-hidden="true" />
    </button>
  );
}

// "83rd TOPIK I Listening Test" -> "83rd TOPIK I Listening" for the sticky bar.
export function shortTitle(title) {
  return String(title || '').replace(/\s+Test$/i, '');
}
