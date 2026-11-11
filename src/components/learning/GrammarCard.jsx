import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import { ALL_GRAMMAR_GROUP, grammarGroupOf } from '../../lib/grammarGroups';
import Bilingual from '../ui/Bilingual';
import Card from '../ui/Card';
import { UsageGuideCompact } from './UsageGuide';

function titleCase(value = '') {
  return value
    .split(' ')
    .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : word))
    .join(' ');
}

// `showLevel` adds the TOPIK level tag; lists that are already split by level leave it off.
export default function GrammarCard({ lesson, level, group = ALL_GRAMMAR_GROUP.id, showLevel = false }) {
  const { isGrammarBookmarked, isGrammarCompleted, dispatch, getGrammarCoreMeaning } = useLearning();
  const bookmarked = isGrammarBookmarked(lesson.id);
  const completed = isGrammarCompleted(lesson.id);
  const coreMeaning = getGrammarCoreMeaning(lesson);
  const grammarGroup = grammarGroupOf(lesson);
  const categoryLabel =
    lesson.level === 'TOPIK I' && lesson.category === 'Particles'
      ? titleCase(lesson.meaning)
      : lesson.category;
  // Carry the originating level so the detail page can return to the same tab.
  const detailParams = new URLSearchParams();
  if (level) detailParams.set('level', level);
  if (group && group !== ALL_GRAMMAR_GROUP.id) detailParams.set('group', group);
  const detailQuery = detailParams.toString();
  const detailPath = detailQuery ? `/grammar/${lesson.id}?${detailQuery}` : `/grammar/${lesson.id}`;

  return (
    // id + scroll-margin let the list scroll this card back into view (clear of
    // the sticky header) when you return from studying the lesson.
    // The pattern link is stretched over the whole card, so a click anywhere opens the lesson.
    <Card
      id={`grammar-${lesson.id}`}
      className={`group relative scroll-mt-44 p-4 transition sm:p-4 hover:shadow-soft ${completed ? 'ring-1 ring-mint-200 dark:ring-mint-500/30' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <Link
          to={detailPath}
          className="min-w-0 text-lg font-bold leading-7 text-slate-950 transition after:absolute after:inset-0 after:rounded-[inherit] group-hover:text-brand-700 focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-400 dark:text-white dark:group-hover:text-brand-100"
        >
          {lesson.pattern}
        </Link>
        <button
          type="button"
          onClick={() => dispatch({ type: 'toggle-bookmark', id: lesson.id })}
          className={`relative z-10 -mr-1 -mt-1 shrink-0 rounded-lg p-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800 ${bookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200'}`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark grammar'}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark grammar'}
        >
          <Star size={17} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
      <Bilingual
        en={coreMeaning}
        km={lesson.coreMeaningKm}
        className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200"
        kmClassName="text-sm leading-6 text-violet-700 dark:text-violet-300"
      />
      <UsageGuideCompact usage={lesson.usage} pattern={lesson.pattern} />
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        {showLevel ? <span className="font-semibold text-brand-700 dark:text-brand-100">{lesson.level}</span> : null}
        {showLevel ? <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span> : null}
        <span>{grammarGroup.label}</span>
        {categoryLabel && categoryLabel !== grammarGroup.label ? (
          <>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span>{categoryLabel}</span>
          </>
        ) : null}
        {completed ? (
          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
            <Check size={13} strokeWidth={3} aria-hidden="true" /> Done
          </span>
        ) : null}
      </div>
    </Card>
  );
}
