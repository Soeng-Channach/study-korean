import { useEffect, useMemo } from 'react';
import { Star } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import GrammarCard from '../../components/learning/GrammarCard';
import Card from '../../components/ui/Card';
import LevelTabs from '../../components/ui/LevelTabs';
import StickyHeader from '../../components/ui/StickyHeader';
import {
  ALL_GRAMMAR_GROUP,
  findGrammarGroup,
  grammarGroupOf,
  grammarGroupsForLessons
} from '../../lib/grammarGroups';
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
  const level = searchParams.get('level') === 'TOPIK I' ? 'TOPIK I' : 'TOPIK II';
  const setLevel = (next) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('level', next);
    nextParams.delete('lesson');
    setSearchParams(nextParams, { replace: true });
  };

  const levelCounts = useMemo(() => countByLevel(grammarLessons), []);
  const levelLessons = useMemo(() => grammarLessons.filter((l) => levelOf(l) === level), [level]);
  const availableGroups = useMemo(() => grammarGroupsForLessons(levelLessons), [levelLessons]);
  const requestedGroup = searchParams.get('group') || ALL_GRAMMAR_GROUP.id;
  const requestedGrammarGroup = findGrammarGroup(requestedGroup);
  const activeGroup =
    requestedGroup === ALL_GRAMMAR_GROUP.id ||
    !requestedGrammarGroup ||
    !availableGroups.some((group) => group.id === requestedGrammarGroup.id)
      ? ALL_GRAMMAR_GROUP
      : requestedGrammarGroup;
  const lessons = useMemo(
    () =>
      activeGroup.id === ALL_GRAMMAR_GROUP.id
        ? levelLessons
        : levelLessons.filter((lesson) => grammarGroupOf(lesson).id === activeGroup.id),
    [activeGroup.id, levelLessons]
  );

  const setGroup = (groupId) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('level', level);
    nextParams.delete('lesson');
    if (groupId === ALL_GRAMMAR_GROUP.id) {
      nextParams.delete('group');
    } else {
      nextParams.set('group', groupId);
    }
    setSearchParams(nextParams, { replace: true });
  };

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
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[ALL_GRAMMAR_GROUP, ...availableGroups].map((group) => {
            const active = activeGroup.id === group.id;
            const count =
              group.id === ALL_GRAMMAR_GROUP.id
                ? levelLessons.length
                : levelLessons.filter((lesson) => grammarGroupOf(lesson).id === group.id).length;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setGroup(group.id)}
                aria-pressed={active}
                title={group.description}
                className={
                  active
                    ? 'inline-flex shrink-0 items-center gap-1.5 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-bold text-white shadow-sm dark:bg-white dark:text-slate-950'
                    : 'inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:text-brand-700 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700 dark:hover:text-brand-100'
                }
              >
                {group.label}
                <span
                  className={
                    active
                      ? 'rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] text-white dark:bg-slate-950/10 dark:text-slate-950'
                      : 'rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-300'
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
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
            <GrammarCard key={lesson.id} lesson={lesson} level={level} group={activeGroup.id} />
          ))}
        </div>
      )}
    </div>
  );
}
