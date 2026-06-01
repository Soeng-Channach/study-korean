import { LEVELS } from '../../lib/levels';

export default function LevelTabs({ value, onChange, counts }) {
  return (
    <div className="inline-flex w-full rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900 sm:w-auto">
      {LEVELS.map((lvl) => {
        const active = value === lvl;
        return (
          <button
            key={lvl}
            type="button"
            onClick={() => onChange(lvl)}
            aria-pressed={active}
            className={
              active
                ? 'flex-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm dark:bg-slate-800 dark:text-brand-100 sm:flex-none'
                : 'flex-1 rounded-lg px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 sm:flex-none'
            }
          >
            {lvl}
            {counts ? <span className="ml-1.5 text-xs font-normal opacity-70">{counts[lvl] ?? 0}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
