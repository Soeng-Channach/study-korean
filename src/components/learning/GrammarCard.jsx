import { Bookmark, CheckCircle2 } from 'lucide-react';
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
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge tone="blue">{lesson.level}</Badge>
            <Badge>{lesson.category}</Badge>
            {completed ? <Badge tone="green">Completed</Badge> : null}
          </div>
          <Link to={`/grammar/${lesson.id}`} className="text-xl font-bold text-slate-950 hover:text-brand-600 dark:text-white">
            {lesson.pattern}
          </Link>
          <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Core meaning
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
              {lesson.coreMeaning}
            </p>
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{lesson.explanation}</p>
          <UsageGuideCompact usage={lesson.usage} />
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'toggle-bookmark', id: lesson.id })}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark grammar'}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark grammar'}
        >
          <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Link to={`/grammar/${lesson.id}`} className="text-sm font-semibold text-brand-600 dark:text-brand-100">
          Study lesson
        </Link>
        {completed ? <CheckCircle2 size={18} className="text-mint-500" aria-hidden="true" /> : null}
      </div>
    </Card>
  );
}
