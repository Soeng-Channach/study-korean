import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Download, FileText } from 'lucide-react';
import PdfViewer from '../../components/library/PdfViewer';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useConfirm } from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { readings } from '../../data/reading';
import { usePageMeta } from '../../hooks/usePageMeta';

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const remainingSeconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function ReadingQuestionCard({ question, fallbackPassage, fallbackNumber, revealed, selected, onSelect }) {
  const questionNumber = question.questionNumber || fallbackNumber;
  const points = question.points || 2;
  const instruction =
    question.instruction || `※ [${questionNumber}]( )에 들어갈 말로 가장 알맞은 것을 고르십시오. (각 ${points}점)`;
  const passage = question.passage || fallbackPassage;

  return (
    <Card className="scroll-mt-24 p-4 shadow-md sm:p-6">
      <div className="rounded-md bg-slate-200 px-4 py-4 text-base font-black leading-7 text-slate-950 dark:bg-slate-700 dark:text-white sm:px-5 sm:text-lg">
        {instruction}
      </div>

      <div className="mt-5 flex items-start gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-100 text-2xl font-black text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-100">
          {questionNumber}
        </div>
        <h3 className="min-w-0 flex-1 text-xl font-black leading-8 text-slate-950 dark:text-white sm:text-2xl">
          {question.question}
        </h3>
        <div className="inline-flex shrink-0 items-center gap-0.5 rounded-md bg-coral-100 px-2 py-1 text-sm font-black leading-none text-coral-700 dark:bg-coral-500/20 dark:text-coral-100">
          <span>{points}</span>
          <span>점</span>
        </div>
      </div>

      {question.image ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
          <img
            src={question.image}
            alt={`Question ${questionNumber} stimulus`}
            className="mx-auto max-h-[32rem] w-auto max-w-full rounded-md object-contain"
          />
        </div>
      ) : null}

      {passage ? (
        <div className="mt-4 rounded-md bg-slate-100 px-4 py-4 text-lg leading-8 text-slate-950 dark:bg-slate-800 dark:text-slate-100 sm:px-5">
          <p className="whitespace-pre-line">{passage}</p>
        </div>
      ) : null}

      <div className="mt-4 space-y-2.5">
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = question.answer === index;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (!revealed) onSelect(index);
              }}
              className={[
                'flex min-h-16 w-full items-center gap-4 rounded-md border px-4 py-3 text-left text-lg font-semibold leading-7 transition [overflow-wrap:anywhere] sm:px-5',
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
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {revealed ? (
        <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {question.explanation}
        </p>
      ) : null}
    </Card>
  );
}

export default function ReadingDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const backLevel = searchParams.get('level');
  const backToReading = backLevel ? `/reading?level=${encodeURIComponent(backLevel)}` : '/reading';
  const reading = readings.find((item) => item.id === id);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealed, setRevealed] = useState(false);
  const { dispatch, isReadingCompleted } = useLearning();

  const confirm = useConfirm();
  const questions = reading?.questions || [];
  const totalSeconds =
    (reading?.durationMinutes || Math.max(3, Math.ceil(questions.length * 1.5))) * 60;

  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const autoCheckedRef = useRef(false);

  usePageMeta(reading?.title || 'Reading practice', 'TOPIK reading comprehension practice.');

  // Reset timer when the reading changes
  useEffect(() => {
    setRemainingSeconds(totalSeconds);
    autoCheckedRef.current = false;
  }, [reading?.id, totalSeconds]);

  // Tick the countdown while the test is in progress
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
      setRevealed(true);
      if (reading && questions.length > 0) {
        dispatch({ type: 'complete-reading', id: reading.id });
      }
    },
    [confirm, dispatch, questions.length, reading, revealed, selectedAnswers]
  );

  // Auto-check when the timer runs out
  useEffect(() => {
    if (!reading || revealed || remainingSeconds > 0 || autoCheckedRef.current) return;
    autoCheckedRef.current = true;
    checkAnswers('timeout');
  }, [reading, revealed, remainingSeconds, checkAnswers]);

  if (!reading) {
    return <EmptyState title="Reading not found" message="This passage is not available in the offline library." />;
  }

  if (reading.paperSrc) {
    return (
      <article className="mx-auto flex h-[calc(100vh-12rem)] max-w-5xl flex-col gap-3 lg:h-[calc(100vh-7rem)]">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={backToReading}
            className="group inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200 dark:bg-slate-900 dark:text-brand-100 dark:ring-slate-700 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            Reading
          </Link>
          <h2 className="min-w-0 flex-1 truncate text-sm font-bold text-slate-950 dark:text-white sm:text-base">
            {reading.title}
          </h2>
          {reading.answerSheetSrc ? (
            <a
              href={reading.answerSheetSrc}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800"
            >
              <Download size={14} /> Answer sheet
            </a>
          ) : null}
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: isReadingCompleted(reading.id) ? 'uncomplete-reading' : 'complete-reading',
                id: reading.id
              })
            }
            className={
              isReadingCompleted(reading.id)
                ? 'inline-flex items-center gap-1.5 rounded-full bg-mint-100 px-3 py-1.5 text-xs font-semibold text-mint-700 transition hover:bg-mint-200 dark:bg-mint-500/15 dark:text-mint-100 dark:hover:bg-mint-500/25'
                : 'inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800'
            }
          >
            <Check size={14} /> {isReadingCompleted(reading.id) ? 'Done' : 'Mark done'}
          </button>
        </div>

        <Card className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{reading.level}</Badge>
            <Badge>{reading.topic}</Badge>
            <Badge tone="slate">{reading.questionCount || 40} questions</Badge>
            <Badge tone="slate">{reading.durationMinutes} minutes</Badge>
          </div>
          <div className="mt-3 flex items-start gap-3">
            <div className="rounded-lg bg-brand-50 p-3 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
              <FileText size={22} aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white">{reading.title}</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Official paper PDF for timed reading practice.
              </p>
            </div>
          </div>
        </Card>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <PdfViewer src={reading.paperSrc} />
        </div>
      </article>
    );
  }

  const answeredCount = questions.filter((question) => selectedAnswers[question.id] !== undefined).length;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;
  const correctCount = revealed
    ? questions.filter((question) => selectedAnswers[question.id] === question.answer).length
    : 0;

  const timePercent = totalSeconds > 0 ? Math.round((remainingSeconds / totalSeconds) * 100) : 0;
  const isUrgent = !revealed && remainingSeconds <= 60;
  const isWarning = !revealed && remainingSeconds <= 180;
  const timerTone = revealed
    ? 'border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
    : isUrgent
      ? 'border-coral-500 bg-coral-50 text-coral-700 dark:border-coral-400 dark:bg-coral-500/25 dark:text-white'
      : isWarning
        ? 'border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-300 dark:bg-amber-400/25 dark:text-amber-50'
        : 'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/25 dark:text-white';
  const progressTone = revealed
    ? 'bg-slate-400'
    : isUrgent
      ? 'bg-coral-500'
      : isWarning
        ? 'bg-amber-500'
        : 'bg-brand-600';

  function resetAnswers() {
    setSelectedAnswers({});
    setRevealed(false);
    setRemainingSeconds(totalSeconds);
    autoCheckedRef.current = false;
  }

  return (
    <article className="mx-auto max-w-4xl space-y-5 pb-[calc(7rem+max(env(safe-area-inset-bottom),0.5rem))] lg:pb-0">
      <Link
        to={backToReading}
        className="group sticky -top-5 z-40 inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:from-brand-700 hover:to-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        Back to reading
      </Link>
      <div className="sticky top-2.5 z-30 -mx-4 border-b border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:mx-0 sm:rounded-lg sm:border sm:px-5 sm:py-3 sm:shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-100 sm:text-[11px]">Reading progress</p>
            <p className="mt-0.5 text-xs font-semibold text-slate-500 dark:text-slate-400 sm:mt-1">
              {answeredCount} of {questions.length} answered
            </p>
            {revealed ? (
              <p className="mt-0.5 text-[11px] font-semibold text-brand-700 dark:text-brand-100 sm:mt-1 sm:text-xs">
                Answers checked · {correctCount} / {questions.length} correct
              </p>
            ) : isUrgent ? (
              <p className="mt-0.5 text-[11px] font-semibold leading-4 text-coral-600 dark:text-coral-100 sm:mt-1 sm:text-xs">
                Answers will be checked automatically.
              </p>
            ) : null}
          </div>
          <div
            className={`flex shrink-0 items-center gap-1.5 rounded-full border-2 px-3 py-1.5 shadow-sm sm:px-3.5 ${timerTone} ${isUrgent ? 'animate-pulse' : ''}`}
          >
            <Clock aria-hidden="true" size={18} />
            <span className="font-mono text-xl font-black tabular-nums leading-none sm:text-lg">
              {formatTime(remainingSeconds)}
            </span>
          </div>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 sm:mt-2.5 sm:h-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressTone}`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
      </div>

      <Card className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge tone="blue">{reading.level}</Badge>
            <Badge>{reading.topic}</Badge>
            {reading.source ? <Badge tone="slate">Imported</Badge> : null}
            {isReadingCompleted(reading.id) ? <Badge tone="green">Done</Badge> : null}
          </div>
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: isReadingCompleted(reading.id) ? 'uncomplete-reading' : 'complete-reading',
                id: reading.id
              })
            }
            className={
              isReadingCompleted(reading.id)
                ? 'inline-flex items-center gap-1 rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold text-mint-700 transition hover:bg-mint-200 dark:bg-mint-500/15 dark:text-mint-100 dark:hover:bg-mint-500/25'
                : 'inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-mint-300 hover:text-mint-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-mint-500 dark:hover:text-mint-100'
            }
          >
            <Check size={12} />
            {isReadingCompleted(reading.id) ? 'Marked done' : 'Mark done'}
          </button>
        </div>
        <h2 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">{reading.title}</h2>
        {revealed ? (
          <p className="mt-3 rounded-lg bg-brand-50 p-3 text-sm font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
            Score: {correctCount} / {questions.length}
          </p>
        ) : null}
      </Card>

      {questions.map((question, index) => (
        <ReadingQuestionCard
          key={question.id}
          question={question}
          fallbackPassage={reading.passage}
          fallbackNumber={index + 1}
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

      <div className="fixed inset-x-0 bottom-[calc(3.5rem+max(env(safe-area-inset-bottom),0.5rem))] z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-12px_28px_rgba(15,23,42,0.10)] backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/80 lg:sticky lg:-bottom-10 lg:mx-0 lg:rounded-lg lg:border lg:bg-white lg:p-5 lg:shadow-soft lg:backdrop-blur-none lg:dark:bg-slate-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
              {revealed
                ? `Score: ${correctCount} / ${questions.length}`
                : allAnswered
                  ? 'Ready to check'
                  : `${questions.length - answeredCount} left`}
            </p>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              {revealed
                ? 'Review the explanations or try again.'
                : 'Answers reveal automatically when the timer ends.'}
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
