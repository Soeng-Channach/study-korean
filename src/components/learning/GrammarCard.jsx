import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { UsageGuideCompact } from './UsageGuide';

function titleCase(value = '') {
  return value
    .split(' ')
    .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : word))
    .join(' ');
}

export default function GrammarCard({ lesson, level }) {
  const { isGrammarBookmarked, isGrammarCompleted, dispatch, getGrammarCoreMeaning } = useLearning();
  const bookmarked = isGrammarBookmarked(lesson.id);
  const completed = isGrammarCompleted(lesson.id);
  const coreMeaning = getGrammarCoreMeaning(lesson);
  const categoryLabel =
    lesson.level === 'TOPIK I' && lesson.category === 'Particles'
      ? titleCase(lesson.meaning)
      : lesson.category;
  // Carry the originating level so the detail page can return to the same tab.
  const detailPath = level ? `/grammar/${lesson.id}?level=${encodeURIComponent(level)}` : `/grammar/${lesson.id}`;

  return (
    // id + scroll-margin let the list scroll this card back into view (clear of
    // the sticky header) when you return from studying the lesson.
    <Card id={`grammar-${lesson.id}`} className="scroll-mt-44 transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap gap-2">
          <Badge tone="blue" className="px-3">{lesson.level}</Badge>
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
      <div className="mt-3 rounded-xl border-2 border-coral-500/80 bg-gradient-to-br from-coral-100/60 via-white to-white p-3 shadow-[0_4px_18px_-8px_rgba(244,63,94,0.4)] dark:from-coral-500/10 dark:via-slate-900 dark:to-slate-900 sm:p-4">
        <Link to={detailPath} className="text-xl font-bold text-slate-950 hover:text-coral-700 dark:text-white dark:hover:text-coral-100">
          {lesson.pattern}
        </Link>
        <div className="mt-2.5 rounded-lg border border-coral-200 bg-white/80 px-3 py-2 dark:border-coral-500/30 dark:bg-slate-800/60">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-coral-700 dark:text-coral-100">
            Core meaning
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-100">
            {coreMeaning}
          </p>
        </div>
        <p className="mt-2.5 line-clamp-2 text-sm leading-snug text-slate-600 dark:text-slate-400">{lesson.explanation}</p>
        <UsageGuideCompact usage={lesson.usage} />
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Link
          to={detailPath}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-600/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 sm:px-6 sm:py-2.5"
        >
          Study lesson
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Card>
  );
}
