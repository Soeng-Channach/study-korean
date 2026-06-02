import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Headphones } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useConfirm } from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { listeningTests } from '../../data/listening';
import { usePageMeta } from '../../hooks/usePageMeta';

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const remainingSeconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function ListeningQuestionCard({ question, selected, revealed, onSelect }) {
  return (
    <Card className="scroll-mt-40 p-4 shadow-md sm:p-6">
      <div className="rounded-md bg-slate-200 px-4 py-4 text-base font-black leading-7 text-slate-950 dark:bg-slate-700 dark:text-white sm:px-5 sm:text-lg">
        {question.instruction}
      </div>

      <div className="mt-5 flex items-start gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-100 text-2xl font-black text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-100">
          {question.questionNumber}
        </div>
        <h3 className="min-w-0 flex-1 text-xl font-black leading-8 text-slate-950 dark:text-white sm:text-2xl">
          {question.question}
        </h3>
        <div className="inline-flex shrink-0 items-center gap-0.5 rounded-md bg-coral-100 px-2 py-1 text-sm font-black leading-none text-coral-700 dark:bg-coral-500/20 dark:text-coral-100">
          <span>{question.points}</span>
          <span>점</span>
        </div>
      </div>

      {question.context ? (
        <div className="mt-4 rounded-md bg-slate-100 px-4 py-4 text-lg leading-8 text-slate-950 dark:bg-slate-800 dark:text-slate-100 sm:px-5">
          <p className="whitespace-pre-line">{question.context}</p>
        </div>
      ) : null}

      <div className={question.questionType === 'image_choice' ? 'mt-4 grid gap-3 sm:grid-cols-2' : 'mt-4 space-y-2.5'}>
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = question.answer === index;
          const isImage = question.questionType === 'image_choice';

          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (!revealed) onSelect(index);
              }}
              className={[
                'flex min-h-16 w-full items-center gap-4 rounded-md border px-4 py-3 text-left text-lg font-semibold leading-7 transition [overflow-wrap:anywhere]',
                isImage ? 'flex-col items-stretch sm:px-4' : 'sm:px-5',
                isSelected && !revealed
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100'
                  : '',
                revealed && isCorrect
                  ? 'border-mint-500 bg-mint-100 text-mint-700 dark:bg-mint-500/15 dark:text-mint-100'
                  : '',
                revealed && isSelected && !isCorrect
                  ? 'border-coral-500 bg-coral-100 text-coral-700 dark:bg-coral-500/15 dark:text-coral-100'
                  : '',
                !isSelected && (!revealed || !isCorrect)
                  ? 'border-slate-200 bg-white text-slate-950 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                  : ''
              ].join(' ')}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-base font-black text-slate-700 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100">
                {index + 1}
              </span>
              {isImage ? (
                <img src={option} alt={`Option ${index + 1}`} className="max-h-48 w-full rounded-md object-contain" />
              ) : (
                <span>{option}</span>
              )}
            </button>
          );
        })}
      </div>

      {revealed ? (
        <div className="mt-4 space-y-3">
          <p className="rounded-lg bg-slate-50 p-4 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {question.explanation}
          </p>
          {question.transcript ? (
            <details className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <summary className="cursor-pointer font-bold text-slate-950 dark:text-white">Transcript</summary>
              <p className="mt-3 whitespace-pre-line leading-6">{question.transcript}</p>
            </details>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}

export default function ListeningDetailPage() {
  const { id } = useParams();
  const test = listeningTests.find((item) => item.id === id);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealed, setRevealed] = useState(false);
  const audioRef = useRef(null);
  const confirm = useConfirm();
  const { dispatch, isListeningCompleted } = useLearning();

  const questions = test?.questions || [];
  const totalSeconds = (test?.durationMinutes || 60) * 60;
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const autoCheckedRef = useRef(false);

  usePageMeta(test?.title || 'Listening test', 'TOPIK listening test with audio practice.');

  useEffect(() => {
    setSelectedAnswers({});
    setRevealed(false);
    setRemainingSeconds(totalSeconds);
    autoCheckedRef.current = false;
  }, [test?.id, totalSeconds]);

  useEffect(() => {
    if (revealed || remainingSeconds <= 0) return undefined;
    const interval = window.setInterval(() => {
      setRemainingSeconds((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [revealed, remainingSeconds]);

  const checkAnswers = useCallback(
    async (reason = 'manual') => {
      if (revealed) return;
      if (reason === 'manual') {
        const remaining = questions.length - Object.keys(selectedAnswers).length;
        if (remaining > 0) {
          const ok = await confirm({
            title: 'Check with blanks?',
            message: `You still have ${remaining} unanswered question${remaining === 1 ? '' : 's'}. Checking now will count ${remaining === 1 ? 'it' : 'them'} as wrong.`,
            confirmText: 'Check anyway',
            cancelText: 'Keep going',
            tone: 'warning'
          });
          if (!ok) return;
        }
      }
      audioRef.current?.pause();
      setRevealed(true);
      if (test && questions.length > 0) {
        dispatch({ type: 'complete-listening', id: test.id });
      }
    },
    [confirm, dispatch, questions.length, revealed, selectedAnswers, test]
  );

  useEffect(() => {
    if (!test || revealed || remainingSeconds > 0 || autoCheckedRef.current) return;
    autoCheckedRef.current = true;
    checkAnswers('timeout');
  }, [test, revealed, remainingSeconds, checkAnswers]);

  if (!test) {
    return <EmptyState title="Listening test not found" message="This listening test is not available." />;
  }

  const answeredCount = questions.filter((question) => selectedAnswers[question.id] !== undefined).length;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;
  const correctCount = revealed
    ? questions.filter((question) => selectedAnswers[question.id] === question.answer).length
    : 0;
  const timePercent = totalSeconds > 0 ? Math.round((remainingSeconds / totalSeconds) * 100) : 0;

  function resetAnswers() {
    setSelectedAnswers({});
    setRevealed(false);
    setRemainingSeconds(totalSeconds);
    autoCheckedRef.current = false;
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }

  return (
    <article className="mx-auto max-w-4xl space-y-5 pb-[calc(7rem+max(env(safe-area-inset-bottom),0.5rem))] lg:pb-0">
      <div className="sticky -top-5 z-30 -mx-4 -mt-5 border-b border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:static sm:mx-0 sm:mt-0 sm:rounded-lg sm:border sm:px-5 sm:py-3 sm:shadow-soft">
        <Link
          to="/listening"
          className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-md shadow-brand-600/30 transition hover:from-brand-700 hover:to-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Back to listening
        </Link>
      </div>
      <div className="sticky top-[32px] z-20 -mx-4 border-b border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:static sm:mx-0 sm:rounded-lg sm:border sm:px-5 sm:py-3 sm:shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-100 sm:text-[11px]">Listening progress</p>
            <p className="mt-0.5 text-xs font-semibold text-slate-500 dark:text-slate-400 sm:mt-1">
              {answeredCount} of {questions.length} answered
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full border-2 border-brand-200 bg-brand-50 px-3 py-1.5 text-brand-700 shadow-sm dark:border-brand-400 dark:bg-brand-500/25 dark:text-white sm:px-3.5">
            <Clock aria-hidden="true" size={18} />
            <span className="font-mono text-xl font-black tabular-nums leading-none sm:text-lg">{formatTime(remainingSeconds)}</span>
          </div>
        </div>
        <audio ref={audioRef} className="mt-3 w-full" src={test.audioSrc} controls preload="metadata" />
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-full rounded-full bg-brand-600 transition-all duration-500" style={{ width: `${timePercent}%` }} />
        </div>
      </div>

      <Card className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge tone="blue">{test.level}</Badge>
            <Badge>{test.topic}</Badge>
            <Badge tone="slate">Audio</Badge>
            {isListeningCompleted(test.id) ? <Badge tone="green">Done</Badge> : null}
          </div>
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: isListeningCompleted(test.id) ? 'uncomplete-listening' : 'complete-listening',
                id: test.id
              })
            }
            className={
              isListeningCompleted(test.id)
                ? 'inline-flex items-center gap-1 rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold text-mint-700 transition hover:bg-mint-200 dark:bg-mint-500/15 dark:text-mint-100 dark:hover:bg-mint-500/25'
                : 'inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-mint-300 hover:text-mint-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-mint-500 dark:hover:text-mint-100'
            }
          >
            <Check size={12} />
            {isListeningCompleted(test.id) ? 'Marked done' : 'Mark done'}
          </button>
        </div>
        <div className="mt-4 flex items-start gap-3">
          <div className="rounded-lg bg-brand-50 p-3 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
            <Headphones size={22} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-950 dark:text-white">{test.title}</h2>
            {revealed ? (
              <p className="mt-3 rounded-lg bg-brand-50 p-3 text-sm font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
                Score: {correctCount} / {questions.length}
              </p>
            ) : null}
          </div>
        </div>
      </Card>

      {questions.map((question) => (
        <ListeningQuestionCard
          key={question.id}
          question={question}
          selected={selectedAnswers[question.id]}
          revealed={revealed}
          onSelect={(optionIndex) =>
            setSelectedAnswers((current) => ({
              ...current,
              [question.id]: optionIndex
            }))
          }
        />
      ))}

      <div className="fixed inset-x-0 bottom-[calc(3.5rem+max(env(safe-area-inset-bottom),0.5rem))] z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-12px_28px_rgba(15,23,42,0.10)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 lg:sticky lg:-bottom-10 lg:rounded-lg lg:border lg:p-5 lg:shadow-soft">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
              {revealed ? `Score: ${correctCount} / ${questions.length}` : allAnswered ? 'Ready to check' : `${questions.length - answeredCount} left`}
            </p>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              {revealed ? 'Review answers and transcripts.' : 'Play the audio once, then check your answers.'}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            {revealed ? (
              <Button variant="secondary" onClick={resetAnswers}>
                Try again
              </Button>
            ) : null}
            <Button
              disabled={revealed}
              onClick={() => checkAnswers('manual')}
              className="rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-base font-bold shadow-lg shadow-brand-600/30 transition hover:from-brand-700 hover:to-brand-600 lg:rounded-lg lg:py-2.5 lg:text-sm"
            >
              {revealed ? 'Checked' : 'Check answers'}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
