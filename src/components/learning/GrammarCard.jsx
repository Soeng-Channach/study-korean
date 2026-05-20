import { ArrowRight, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { UsageGuideCompact } from './UsageGuide';

export default function GrammarCard({ lesson }) {
  const { isGrammarBookmarked, isGrammarCompleted, dispatch } = useLearning();
  const bookmarked = isGrammarBookmarked(lesson.id);
  const completed = isGrammarCompleted(lesson.id);

  return (
    <Card className="transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <Badge tone="blue">{lesson.level}</Badge>
          <Badge>{lesson.category}</Badge>
          {completed ? <Badge tone="green">Done</Badge> : null}
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'toggle-bookmark', id: lesson.id })}
          className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark grammar'}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark grammar'}
        >
          <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="mt-3 rounded-xl border-2 border-coral-500/80 bg-gradient-to-br from-coral-100/60 via-white to-white p-3 shadow-[0_4px_18px_-8px_rgba(244,63,94,0.4)] dark:from-coral-500/10 dark:via-slate-900 dark:to-slate-900 sm:p-4">
        <Link to={`/grammar/${lesson.id}`} className="text-xl font-bold text-slate-950 hover:text-coral-700 dark:text-white dark:hover:text-coral-100">
          {lesson.pattern}
        </Link>
        <div className="mt-2.5 rounded-lg border border-coral-200 bg-white/80 px-3 py-2 dark:border-coral-500/30 dark:bg-slate-800/60">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-coral-700 dark:text-coral-100">
            Core meaning
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-100">
            {lesson.coreMeaning}
          </p>
        </div>
        <p className="mt-2.5 line-clamp-2 text-sm leading-snug text-slate-600 dark:text-slate-400">{lesson.explanation}</p>
        <UsageGuideCompact usage={lesson.usage} />
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Link
          to={`/grammar/${lesson.id}`}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-600/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 sm:px-6 sm:py-2.5"
        >
          Study lesson
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Card>
  );
}
