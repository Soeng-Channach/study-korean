import { LEVELS } from '../../lib/levels';

// Accent colors for the active tab + inactive hover. brand = blue (grammar/default),
// coral = pink-red (vocabulary). Full class names are spelled out so Tailwind keeps them.
const ACCENTS = {
  brand: {
    active: 'bg-gradient-to-r from-brand-600 to-brand-500 shadow-sm shadow-brand-600/20',
    hover: 'hover:text-brand-700 dark:hover:text-brand-100'
  },
  coral: {
    active: 'bg-gradient-to-r from-coral-500 to-pink-500 shadow-sm shadow-coral-500/20',
    hover: 'hover:text-coral-700 dark:hover:text-coral-100'
  }
};

// `size="sm"` (the default) is the 40px strip (32px tabs) used on every list page; "md" is the taller original.
export default function LevelTabs({ value, onChange, counts, accent = 'brand', size = 'sm' }) {
  const tone = ACCENTS[accent] ?? ACCENTS.brand;
  const pad = size === 'sm' ? 'h-8 px-4 text-[13px]' : 'px-4 py-2 text-sm';
  return (
    <div
      className={`grid w-full grid-cols-2 gap-1 border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 ${
        size === 'sm' ? 'rounded-xl p-1 sm:w-72' : 'rounded-xl p-1 sm:w-72'
      }`}
    >
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
                ? `flex items-center justify-center gap-2 rounded-lg ${pad} font-semibold text-white transition ${tone.active}`
                : `flex items-center justify-center gap-2 rounded-lg ${pad} font-semibold text-slate-600 transition hover:bg-white hover:shadow-sm dark:text-slate-300 dark:hover:bg-slate-800 ${tone.hover}`
            }
          >
            <span>{lvl}</span>
            {counts ? (
              <span
                className={
                  active
                    ? 'inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-white/25 px-1.5 py-px text-[11px] font-bold text-white'
                    : 'inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-slate-200 px-1.5 py-px text-[11px] font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300'
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
