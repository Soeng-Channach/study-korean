// Pins a page's header block (title + description + level tabs) to the top of
// the scrolling <main> area. Negative margins cancel main's padding (horizontal
// and the pt-5 top) so the frosted band spans edge-to-edge and pins flush to the
// top with no see-through strip above it.
export default function StickyHeader({ children }) {
  return (
    <div className="sticky -top-5 z-20 -mx-4 -mt-5 space-y-3 border-b border-slate-200/70 bg-paper px-4 py-3 dark:border-slate-800/70 dark:bg-slate-950 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {children}
    </div>
  );
}
