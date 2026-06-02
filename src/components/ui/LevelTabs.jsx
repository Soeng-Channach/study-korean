import { LEVELS } from '../../lib/levels';

// Accent colors for the active tab + inactive hover. brand = blue (grammar/default),
// coral = pink-red (vocabulary). Full class names are spelled out so Tailwind keeps them.
const ACCENTS = {
  brand: {
    active: 'bg-gradient-to-r from-brand-600 to-brand-500 shadow-md shadow-brand-600/30',
    hover: 'hover:text-brand-700 dark:hover:text-brand-100'
  },
  coral: {
    active: 'bg-gradient-to-r from-coral-500 to-pink-500 shadow-md shadow-coral-500/30',
    hover: 'hover:text-coral-700 dark:hover:text-coral-100'
  }
};

export default function LevelTabs({ value, onChange, counts, accent = 'brand' }) {
  const tone = ACCENTS[accent] ?? ACCENTS.brand;
  return (
    <div className="grid w-full grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900 sm:w-72">
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
                ? `flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${tone.active}`
                : `flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:shadow-sm dark:text-slate-300 dark:hover:bg-slate-800 ${tone.hover}`
            }
          >
            <span>{lvl}</span>
            {counts ? (
              <span
                className={
                  active
                    ? 'inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-white/25 px-1.5 py-0.5 text-[11px] font-bold text-white'
                    : 'inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-slate-200 px-1.5 py-0.5 text-[11px] font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                }
              >
                {counts[lvl] ?? 0}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
