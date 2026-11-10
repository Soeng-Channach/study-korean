import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import { ALL_GRAMMAR_GROUP, grammarGroupOf } from '../../lib/grammarGroups';
import Badge from '../ui/Badge';
import Bilingual from '../ui/Bilingual';
import Card from '../ui/Card';
import { UsageGuideCompact } from './UsageGuide';

function titleCase(value = '') {
  return value
    .split(' ')
    .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : word))
    .join(' ');
}

export default function GrammarCard({ lesson, level, group = ALL_GRAMMAR_GROUP.id }) {
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
    <Card id={`grammar-${lesson.id}`} className="scroll-mt-44 transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap gap-2">
          <Badge tone="blue" className="px-3">{lesson.level}</Badge>
          <Badge tone="green" className="px-3">{grammarGroup.label}</Badge>
          <Badge className="px-3">{categoryLabel}</Badge>
          {completed ? <Badge tone="green" className="px-3">Done</Badge> : null}
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'toggle-bookmark', id: lesson.id })}
          className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark grammar'}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark grammar'}
        >
          <Star size={18} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="mt-3 rounded-xl bg-gradient-to-br from-brand-50 via-white to-indigo-50/80 p-3 ring-1 ring-brand-100 dark:from-brand-500/10 dark:via-slate-900 dark:to-indigo-500/10 dark:ring-brand-500/20 sm:p-4">
        <Link to={detailPath} className="text-2xl font-black tracking-tight text-slate-950 transition hover:text-brand-700 dark:text-white dark:hover:text-brand-100">
          {lesson.pattern}
        </Link>
        <div className="mt-2.5 rounded-lg border-l-4 border-brand-500 bg-white px-3 py-2 shadow-sm dark:bg-slate-800/70">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-100">
            Core meaning
          </p>
          <Bilingual
            en={coreMeaning}
            km={lesson.coreMeaningKm}
            className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-100"
            kmClassName="text-sm font-medium leading-6 text-violet-700 dark:text-violet-300"
          />
        </div>
        <div className="mt-2.5">
          <Bilingual
            en={lesson.explanation}
            km={lesson.explanationKm}
            className="line-clamp-2 text-sm leading-snug text-slate-600 dark:text-slate-400"
            kmClassName="mt-1 line-clamp-2 text-sm leading-6 text-violet-700 dark:text-violet-300"
          />
        </div>
        <UsageGuideCompact usage={lesson.usage} pattern={lesson.pattern} />
      </div>
      <div className="mt-3.5 flex items-center justify-end">
        <Link
          to={detailPath}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition hover:shadow-md hover:shadow-brand-600/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          Study lesson
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Card>
  );
}
