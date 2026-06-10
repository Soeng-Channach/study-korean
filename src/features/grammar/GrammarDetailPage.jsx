import { ArrowLeft, Check, CheckCircle2, Pencil, RotateCcw, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import UsageGuide from '../../components/learning/UsageGuide';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
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

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(currentCoreMeaning);

  useEffect(() => {
    setEditing(false);
    setDraft(currentCoreMeaning);
  }, [lesson?.id, currentCoreMeaning]);

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

  function startEdit() {
    setDraft(currentCoreMeaning);
    setEditing(true);
  }

  function cancelEdit() {
    setDraft(currentCoreMeaning);
    setEditing(false);
  }

  function saveEdit() {
    const trimmed = draft.trim();
    if (!trimmed) {
      cancelEdit();
      return;
    }
    if (trimmed === lesson.coreMeaning) {
      dispatch({ type: 'reset-grammar-meaning', id: lesson.id });
    } else {
      dispatch({ type: 'update-grammar-meaning', id: lesson.id, coreMeaning: trimmed });
    }
    setEditing(false);
  }

  function resetToDefault() {
    dispatch({ type: 'reset-grammar-meaning', id: lesson.id });
    setDraft(lesson.coreMeaning);
  }

  return (
    <article className="mx-auto max-w-3xl space-y-5 pb-[calc(7rem+max(env(safe-area-inset-bottom),0.5rem))] lg:pb-0">
      <div className="sticky -top-5 z-30 -mx-4 -mt-5 border-b border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:mx-0 sm:mt-0 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:dark:bg-transparent">
        <Link
          to={backToGrammar}
          className="group inline-flex items-center gap-1.5 self-start rounded-full bg-brand-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 ring-1 ring-brand-500 transition hover:bg-brand-700 hover:ring-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:bg-brand-500 dark:text-white dark:ring-brand-400 dark:hover:bg-brand-400 dark:focus-visible:ring-offset-slate-900"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Back to grammar
        </Link>
      </div>
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
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Core meaning {edited ? <span className="text-coral-600 dark:text-coral-100">(edited)</span> : null}
            </p>
            {!editing ? (
              <button
                type="button"
                onClick={startEdit}
                aria-label="Edit core meaning"
                title="Edit core meaning"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-brand-100"
              >
                <Pencil size={14} />
              </button>
            ) : null}
          </div>
          {editing ? (
            <div className="mt-2 space-y-2">
              <input
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') saveEdit();
                  if (event.key === 'Escape') cancelEdit();
                }}
                autoFocus
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-semibold text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                {edited ? (
                  <button
                    type="button"
                    onClick={resetToDefault}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-coral-600 dark:text-slate-400 dark:hover:text-coral-100"
                  >
                    <RotateCcw size={12} /> Reset to original
                  </button>
                ) : <span />}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-100 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800"
                  >
                    <X size={12} /> Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveEdit}
                    disabled={!draft.trim()}
                    className="inline-flex items-center gap-1 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Check size={12} /> Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                {currentCoreMeaning}
              </p>
              {edited ? (
                <button
                  type="button"
                  onClick={resetToDefault}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-coral-600 dark:text-slate-400 dark:hover:text-coral-100"
                >
                  <RotateCcw size={12} /> Reset to original ({lesson.coreMeaning})
                </button>
              ) : null}
            </>
          )}
        </div>
        <p className="mt-6 leading-7 text-slate-700 dark:text-slate-300">{lesson.explanation}</p>
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
              <p className="text-lg font-bold leading-7 text-slate-950 dark:text-white">{example.korean}</p>
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
