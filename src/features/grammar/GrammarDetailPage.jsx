import { CheckCircle2, RotateCcw, Star } from 'lucide-react';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import UsageGuide from '../../components/learning/UsageGuide';
import BackLink from '../../components/ui/BackLink';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Bilingual from '../../components/ui/Bilingual';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import SpeakButton from '../../components/ui/SpeakButton';
import { useLearning } from '../../context/LearningContext';
import { grammarLessons } from '../../data/grammar';
import { usePageMeta } from '../../hooks/usePageMeta';
import { grammarGroupOf } from '../../lib/grammarGroups';

export default function GrammarDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const backLevel = searchParams.get('level');
  const backGroup = searchParams.get('group');
  // Carry the lesson id back so the list can scroll this card into view instead
  // of resetting to the top.
  const backParams = new URLSearchParams();
  if (backLevel) backParams.set('level', backLevel);
  if (backGroup) backParams.set('group', backGroup);
  backParams.set('lesson', id);
  const backToGrammar = `/grammar?${backParams.toString()}`;
  const lesson = grammarLessons.find((item) => item.id === id);
  const {
    dispatch,
    isGrammarBookmarked,
    isGrammarCompleted,
    getGrammarCoreMeaning,
    isGrammarMeaningEdited
  } = useLearning();
  const currentCoreMeaning = lesson ? getGrammarCoreMeaning(lesson) : '';
  const edited = lesson ? isGrammarMeaningEdited(lesson.id) : false;

  // Open each lesson from the top of the scroll area (the shared <main> keeps its
  // previous offset, which would otherwise drop you partway down the lesson).
  useEffect(() => {
    document.querySelector('main')?.scrollTo({ top: 0 });
  }, [id]);

  usePageMeta(lesson?.pattern || 'Grammar lesson', lesson?.explanation || 'TOPIK II grammar lesson.');

  if (!lesson) {
    return <EmptyState title="Lesson not found" message="This grammar point is not available in the offline library." />;
  }

  const bookmarked = isGrammarBookmarked(lesson.id);
  const completed = isGrammarCompleted(lesson.id);
  const grammarGroup = grammarGroupOf(lesson);

  function resetToDefault() {
    dispatch({ type: 'reset-grammar-meaning', id: lesson.id });
  }

  return (
    <article className="mx-auto max-w-3xl space-y-5 pb-[calc(7rem+max(env(safe-area-inset-bottom),0.5rem))] lg:pb-0">
      <BackLink to={backToGrammar}>Back to grammar</BackLink>
      <Card>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge tone="blue">{grammarGroup.label}</Badge>
            <Badge>{lesson.category}</Badge>
            <Badge>{lesson.level}</Badge>
            {completed ? <Badge tone="green">Completed</Badge> : null}
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: 'toggle-bookmark', id: lesson.id })}
            aria-label={bookmarked ? 'Remove bookmark' : 'Save grammar lesson'}
            title={bookmarked ? 'Remove bookmark' : 'Save grammar lesson'}
            className={
              bookmarked
                ? 'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm ring-1 ring-brand-600 transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900'
                : 'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900'
            }
          >
            <Star size={16} fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
        <h2 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">{lesson.pattern}</h2>
        <div className="mt-3 rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Core meaning {edited ? <span className="text-coral-600 dark:text-coral-100">(edited)</span> : null}
          </p>
          <Bilingual
            en={currentCoreMeaning}
            km={lesson.coreMeaningKm}
            className="mt-1 text-lg font-semibold text-slate-900 dark:text-white"
            kmClassName="mt-0.5 text-base font-medium leading-7 text-slate-600 dark:text-slate-300"
          />
          {edited ? (
            <button
              type="button"
              onClick={resetToDefault}
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-coral-600 dark:text-slate-400 dark:hover:text-coral-100"
            >
              <RotateCcw size={12} /> Reset to original ({lesson.coreMeaning})
            </button>
          ) : null}
        </div>
        <div className="mt-6 space-y-2">
          <Bilingual
            en={lesson.explanation}
            km={lesson.explanationKm}
            className="leading-7 text-slate-700 dark:text-slate-300"
            kmClassName="leading-7 text-slate-600 dark:text-slate-400"
          />
        </div>
      </Card>

      <UsageGuide usage={lesson.usage} pattern={lesson.pattern} />

      <Card>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">Examples</h3>
          <Badge tone="blue">{lesson.examples.length} examples</Badge>
        </div>
        <div className="mt-4 space-y-4">
          {lesson.examples.map((example, exampleIndex) => (
            <div key={example.korean} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
              <div className="mb-3 flex items-center gap-2">
                <Badge tone={example.type === 'practice' ? 'slate' : 'green'}>
                  Example {exampleIndex + 1}
                </Badge>
                {example.type === 'practice' ? <Badge>Pattern practice</Badge> : null}
              </div>
              <div className="flex items-start gap-2">
                <p className="flex-1 text-lg font-bold leading-7 text-slate-950 dark:text-white">{example.korean}</p>
                <SpeakButton text={example.korean} size={16} label={`Play example ${exampleIndex + 1}`} />
              </div>
              <div className="mt-2 space-y-1">
                <Bilingual
                  en={example.english}
                  km={example.khmer}
                  className="text-sm text-slate-600 dark:text-slate-300"
                  kmClassName="text-sm leading-6 text-slate-600 dark:text-slate-400"
                />
              </div>
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

      <div className="fixed inset-x-0 bottom-[calc(3.5rem+max(env(safe-area-inset-bottom),0.5rem))] z-30 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-12px_28px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:-bottom-10 lg:mx-0 lg:rounded-lg lg:border lg:bg-white lg:p-4 lg:shadow-soft lg:dark:bg-slate-900">
        <div className="mx-auto max-w-3xl">
          <Button
            className="w-full"
            icon={CheckCircle2}
            disabled={completed}
            onClick={() => dispatch({ type: 'complete-grammar', id: lesson.id })}
          >
            {completed ? 'Lesson completed' : 'Mark as complete'}
          </Button>
        </div>
      </div>
    </article>
  );
}
