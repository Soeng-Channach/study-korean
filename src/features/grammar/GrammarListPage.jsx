import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import GrammarCard from '../../components/learning/GrammarCard';
import { useLearning } from '../../context/LearningContext';
import { grammarLessons } from '../../data/grammar';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function GrammarListPage() {
  usePageMeta('Grammar', 'Learn essential TOPIK II grammar patterns with examples and bookmarks.');
  const { state } = useLearning();
  const savedCount = state.bookmarkedGrammarIds.length;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Grammar learning</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Study patterns by category, star the tricky ones, and mark lessons complete.
          </p>
        </div>
        <Link
          to="/bookmarks"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700 ring-1 ring-amber-200 transition hover:bg-amber-200 dark:bg-amber-500/15 dark:text-amber-100 dark:ring-amber-500/30 dark:hover:bg-amber-500/25"
        >
          <Star size={14} fill="currentColor" />
          Saved
          <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-100">
            {savedCount}
          </span>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {grammarLessons.map((lesson) => (
          <GrammarCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
