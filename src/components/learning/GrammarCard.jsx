import { ArrowRight, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import { ALL_GRAMMAR_GROUP, grammarGroupOf } from '../../lib/grammarGroups';
import Bilingual from '../ui/Bilingual';
import Card from '../ui/Card';
import { UsageGuideCompact } from './UsageGuide';

// `showLevel` adds the TOPIK level tag; lists that are already split by level leave it off.
export default function GrammarCard({ lesson, level, group = ALL_GRAMMAR_GROUP.id, showLevel = false }) {
  const { isGrammarBookmarked, isGrammarCompleted, dispatch, getGrammarCoreMeaning } = useLearning();
  const bookmarked = isGrammarBookmarked(lesson.id);
  const completed = isGrammarCompleted(lesson.id);
  const coreMeaning = getGrammarCoreMeaning(lesson);
  const grammarGroup = grammarGroupOf(lesson);
  // Carry the originating level so the detail page can return to the same tab.
  const detailParams = new URLSearchParams();
  if (level) detailParams.set('level', level);
  if (group && group !== ALL_GRAMMAR_GROUP.id) detailParams.set('group', group);
  const detailQuery = detailParams.toString();
  const detailPath = detailQuery ? `/grammar/${lesson.id}?${detailQuery}` : `/grammar/${lesson.id}`;

  return (
    // id + scroll-margin let the list scroll this card back into view (clear of
    // the sticky header) when you return from studying the lesson.
    // The pattern link is stretched over the card, so a click anywhere opens the lesson.
    <Card
      id={`grammar-${lesson.id}`}
      className="relative flex scroll-mt-44 flex-col overflow-hidden !p-0 transition hover:shadow-soft"
    >
      {/* Header band: pattern and save */}
      <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-brand-50 to-brand-50/30 px-5 py-3 dark:from-brand-500/15 dark:to-brand-500/5">
        <Link
          to={detailPath}
          className="min-w-0 text-lg font-bold leading-7 text-slate-950 transition after:absolute after:inset-0 after:rounded-2xl hover:text-brand-700 focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-400 dark:text-white dark:hover:text-brand-100"
        >
          {lesson.pattern}
        </Link>
        <button
          type="button"
          onClick={() => dispatch({ type: 'toggle-bookmark', id: lesson.id })}
          className={`relative z-10 -mr-1.5 shrink-0 rounded-full p-1.5 transition hover:bg-white dark:hover:bg-slate-800 ${
            bookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark grammar'}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark grammar'}
        >
          <Star size={17} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-5 pt-3.5">
        <Bilingual
          en={coreMeaning}
          km={lesson.coreMeaningKm}
          className="text-[15px] font-semibold leading-6 text-slate-900 dark:text-slate-100"
          kmClassName="mt-0.5 text-[15px] leading-7 text-violet-700 dark:text-violet-300"
        />
        <UsageGuideCompact usage={lesson.usage} pattern={lesson.pattern} usedOnly />
        <div className="mt-auto pt-3.5">
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 py-2.5 text-xs dark:border-slate-800">
            <span className="flex min-w-0 items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="truncate">
                {showLevel ? `${lesson.level} · ` : ''}
                {grammarGroup.label}
              </span>
            </span>
            {completed ? (
              <span className="inline-flex shrink-0 items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                <Check size={13} strokeWidth={3} aria-hidden="true" /> Done
              </span>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand-700 dark:text-brand-100">
                Study <ArrowRight size={13} aria-hidden="true" />
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
