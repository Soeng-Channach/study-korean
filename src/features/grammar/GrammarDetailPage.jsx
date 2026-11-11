import { ArrowLeft, Check, RotateCcw, Star } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import UsageGuide from '../../components/learning/UsageGuide';
import Badge from '../../components/ui/Badge';
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
    <article className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
      {/* Slim sticky bar: back, save and mark-complete */}
      <div className="sticky -top-4 z-40 -mx-3 -mt-4 flex items-center gap-2 border-b border-slate-200 bg-white/95 px-3 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:-top-5 sm:-mx-6 sm:-mt-5 sm:px-6 lg:mx-0 lg:mt-0 lg:rounded-2xl lg:border lg:px-4 lg:shadow-card">
        <Link
          to={backToGrammar}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full py-1 pl-1.5 pr-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back
        </Link>
        <span className="flex-1" />
        <button
          type="button"
          onClick={() => dispatch({ type: 'toggle-bookmark', id: lesson.id })}
          aria-label={bookmarked ? 'Remove bookmark' : 'Save grammar lesson'}
          title={bookmarked ? 'Remove bookmark' : 'Save grammar lesson'}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition hover:bg-slate-100 dark:hover:bg-slate-800 ${bookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200'}`}
        >
          <Star size={17} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
        <button
          type="button"
          disabled={completed}
          onClick={() => dispatch({ type: 'complete-grammar', id: lesson.id })}
          className={
            completed
              ? 'inline-flex shrink-0 items-center gap-1.5 rounded-full bg-mint-100 px-3 py-1.5 text-xs font-semibold text-mint-700 dark:bg-mint-500/15 dark:text-mint-100'
              : 'inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-700'
          }
        >
          <Check size={14} strokeWidth={3} aria-hidden="true" /> {completed ? 'Completed' : 'Mark complete'}
        </button>
      </div>
      <Card>
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{grammarGroup.label}</Badge>
          <Badge>{lesson.category}</Badge>
          <Badge>{lesson.level}</Badge>
        </div>
        <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">{lesson.pattern}</h2>
        <div className="mt-3 rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Core meaning {edited ? <span className="text-coral-600 dark:text-coral-100">(edited)</span> : null}
          </p>
          <Bilingual
            en={currentCoreMeaning}
            km={lesson.coreMeaningKm}
            className="mt-1 text-lg font-semibold text-slate-900 dark:text-white"
            kmClassName="mt-0.5 text-base font-medium leading-7 text-violet-700 dark:text-violet-300"
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
            kmClassName="leading-7 text-violet-700 dark:text-violet-300"
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
                  kmClassName="text-sm leading-6 text-violet-700 dark:text-violet-300"
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

    </article>
  );
}
