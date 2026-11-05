import clsx from 'clsx';

// App glyph: the first syllable of 한국어 on a brand gradient tile.
export default function BrandMark({ className, size = 'md' }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'flex shrink-0 select-none items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 font-black leading-none text-white shadow-md shadow-brand-600/30 ring-1 ring-white/20',
        size === 'lg' ? 'h-12 w-12 text-xl' : 'h-9 w-9 text-[15px]',
        className
      )}
    >
      한
    </span>
  );
}
