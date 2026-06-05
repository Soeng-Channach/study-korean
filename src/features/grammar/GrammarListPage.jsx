import { useEffect, useMemo } from 'react';
import { Star } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import GrammarCard from '../../components/learning/GrammarCard';
import Card from '../../components/ui/Card';
import LevelTabs from '../../components/ui/LevelTabs';
import StickyHeader from '../../components/ui/StickyHeader';
import { countByLevel, levelOf } from '../../lib/levels';
import { useLearning } from '../../context/LearningContext';
import { grammarLessons } from '../../data/grammar';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function GrammarListPage() {
  usePageMeta('Grammar', 'Learn essential TOPIK I and TOPIK II grammar patterns with examples and bookmarks.');
  const { state } = useLearning();
  const savedCount = state.bookmarkedGrammarIds.length;
  // Keep the selected level in the URL so it survives navigating into a lesson
  // and back (both the in-app "Back" link and the browser back button).
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get('level') === 'TOPIK II' ? 'TOPIK II' : 'TOPIK I';
  const setLevel = (next) => setSearchParams({ level: next }, { replace: true });

  const levelCounts = useMemo(() => countByLevel(grammarLessons), []);
  const lessons = useMemo(() => grammarLessons.filter((l) => levelOf(l) === level), [level]);

  // When returning from a lesson, scroll its card back into view rather than
  // landing at the top, then drop the marker so it doesn't linger in the URL.
  const lastLessonId = searchParams.get('lesson');
  useEffect(() => {
    if (!lastLessonId) return;
    document.getElementById(`grammar-${lastLessonId}`)?.scrollIntoView({ block: 'start' });
    const next = new URLSearchParams(searchParams);
    next.delete('lesson');
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastLessonId]);

  return (
    <div className="space-y-5">
      <StickyHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
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
        <LevelTabs value={level} onChange={setLevel} counts={levelCounts} />
      </StickyHeader>

      {lessons.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No {level} lessons yet.</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Add lessons with level: &#39;{level}&#39; to src/data/grammar.js and they will appear here.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {lessons.map((lesson) => (
            <GrammarCard key={lesson.id} lesson={lesson} level={level} />
          ))}
        </div>
      )}
    </div>
  );
}
