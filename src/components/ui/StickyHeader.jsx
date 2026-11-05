// On large screens, pins a page's header block (title + description + level tabs) to the top of
// the scrolling <main> area. Negative margins cancel main's padding (horizontal
// and the pt-5 top) so the frosted band spans edge-to-edge and pins flush to the
// top with no see-through strip above it. On phones it scrolls with the page,
// because a tall pinned header would leave little room for the content.
export default function StickyHeader({ children }) {
  return (
    <div className="relative z-20 lg:sticky lg:-top-5 -mx-3 -mt-4 space-y-3 border-b border-slate-200/70 bg-paper px-3 py-3 dark:border-slate-800/70 dark:bg-slate-950 sm:-mx-6 sm:-mt-5 sm:px-6 lg:-mx-8 lg:px-8">
      {children}
    </div>
  );
}
