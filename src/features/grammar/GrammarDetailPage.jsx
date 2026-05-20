import { Bookmark, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import UsageGuide from '../../components/learning/UsageGuide';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { grammarLessons } from '../../data/grammar';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function GrammarDetailPage() {
  const { id } = useParams();
  const lesson = grammarLessons.find((item) => item.id === id);
  const { dispatch, isGrammarBookmarked, isGrammarCompleted } = useLearning();

  usePageMeta(lesson?.pattern || 'Grammar lesson', lesson?.explanation || 'TOPIK II grammar lesson.');

  if (!lesson) {
    return <EmptyState title="Lesson not found" message="This grammar point is not available in the offline library." />;
  }

  const bookmarked = isGrammarBookmarked(lesson.id);
  const completed = isGrammarCompleted(lesson.id);

  return (
    <article className="mx-auto max-w-3xl space-y-5">
      <Link to="/grammar" className="text-sm font-semibold text-brand-600 dark:text-brand-100">
        Back to grammar
      </Link>
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="blue">{lesson.category}</Badge>
              <Badge>{lesson.level}</Badge>
              {completed ? <Badge tone="green">Completed</Badge> : null}
            </div>
            <h2 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">{lesson.pattern}</h2>
            <div className="mt-3 rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Core meaning
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                {lesson.coreMeaning}
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            icon={Bookmark}
            onClick={() => dispatch({ type: 'toggle-bookmark', id: lesson.id })}
          >
            {bookmarked ? 'Saved' : 'Save'}
          </Button>
        </div>
        <p className="mt-6 leading-7 text-slate-700 dark:text-slate-300">{lesson.explanation}</p>
      </Card>

      <UsageGuide usage={lesson.usage} />

      <Card>
        <h3 className="text-lg font-bold text-slate-950 dark:text-white">Examples</h3>
        <div className="mt-4 space-y-4">
          {lesson.examples.map((example) => (
            <div key={example.korean} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-lg font-bold text-slate-950 dark:text-white">{example.korean}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{example.english}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-slate-950 dark:text-white">Similar patterns</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {lesson.similarPatterns.map((pattern) => (
            <Badge key={pattern} tone="slate">{pattern}</Badge>
          ))}
        </div>
      </Card>

      <Button
        className="w-full"
        icon={CheckCircle2}
        disabled={completed}
        onClick={() => dispatch({ type: 'complete-grammar', id: lesson.id })}
      >
        {completed ? 'Lesson completed' : 'Mark as complete'}
      </Button>
    </article>
  );
}
