import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Download, FileText, ImageOff } from 'lucide-react';
import PdfViewer from '../../components/library/PdfViewer';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import {
  shortTitle,
  AnsweredCount,
  DoneToggle,
  GroupInstruction,
  OptionButton,
  PassageBox,
  questionCardClass,
  QuestionHeader
} from '../../components/learning/PaperQuestion';
import { useConfirm } from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { readings } from '../../data/reading';
import ClauseOrderAnswer from '../../components/learning/ClauseOrderAnswer';
import { isAnswerCorrect, isAnswered, isOrderingQuestion } from '../../lib/readingAnswers';
import { usePageMeta } from '../../hooks/usePageMeta';

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const remainingSeconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function renderPassageContent(value) {
  const source = String(value || "");
  const nodes = [];
  const tokenPattern = /<br\s*\/?>|<span\s+class=(["'])underline\1>|<\/span>/gi;
  let cursor = 0;
  let underline = false;

  source.replace(tokenPattern, (match, _quote, offset) => {
    const text = source.slice(cursor, offset);
    if (text) {
      nodes.push(
        underline ? (
          <span key={nodes.length} className="underline decoration-2 underline-offset-4">
            {text}
          </span>
        ) : (
          text
        )
      );
    }

    if (/^<br/i.test(match)) {
      nodes.push(<br key={nodes.length} />);
    } else {
      underline = !match.startsWith("</");
    }

    cursor = offset + match.length;
    return match;
  });

  const remainingText = source.slice(cursor);
  if (remainingText) {
    nodes.push(
      underline ? (
        <span key={nodes.length} className="underline decoration-2 underline-offset-4">
          {remainingText}
        </span>
      ) : (
        remainingText
      )
    );
  }

  return nodes;
}

const NOTICE_PATTERN = /^\s*NOTICE:[^\n]*\n?/;
const stripUnderline = (value) => String(value || '').replace(/<\/?span[^>]*>/g, '');

function Passage({ value }) {
  const notice = value.match(NOTICE_PATTERN);
  const body = notice ? value.slice(notice[0].length) : value;
  return (
    <PassageBox>
      {notice ? (
        <p className="mb-2 rounded border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs leading-5 text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
          Model text: this passage was not released officially, so the source site wrote a sample text for the scenario.
        </p>
      ) : null}
      <p className="whitespace-pre-line">{renderPassageContent(body)}</p>
    </PassageBox>
  );
}

function StimulusImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <p className="flex h-32 flex-col items-center justify-center gap-1 text-sm text-slate-500 dark:text-slate-400">
        <ImageOff size={22} aria-hidden="true" />
        The picture could not load. Check your connection and reopen this test.
      </p>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="mx-auto max-h-[32rem] w-auto max-w-full rounded-md object-contain"
    />
  );
}

// The points already show in the pill, so drop a trailing "(2점)" from the question line.
function stripPoints(text) {
  return String(text || '').replace(/\s*\(\s*\d+\s*점\s*\)\s*$/, '');
}

function ReadingQuestionCard({ question, fallbackPassage, fallbackNumber, sharedWith, sameGroup, revealed, selected, onSelect }) {
  const questionNumber = question.questionNumber || fallbackNumber;
  const points = question.points || 2;
  const instruction =
    question.instruction || `※ [${questionNumber}]( )에 들어갈 말로 가장 알맞은 것을 고르십시오. (각 ${points}점)`;
  const passage = isOrderingQuestion(question) ? null : question.passage || fallbackPassage;
  // The second question of a pair repeats the passage it shares with the one above.
  // The group line is shown once, on the first question of its group.
  const showGroupInstruction = !sharedWith && !sameGroup;

  return (
    <Card id={`q-${questionNumber}`} className={questionCardClass}>
      {showGroupInstruction ? <GroupInstruction>{instruction}</GroupInstruction> : null}
      <QuestionHeader number={questionNumber} points={points}>
        {stripPoints(question.question)}
      </QuestionHeader>

      {question.image ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
          <StimulusImage src={question.image} alt={`Question ${questionNumber} stimulus`} />
        </div>
      ) : null}

      {passage && sharedWith && !passage.includes('underline') ? (
        <details className="group mt-3 rounded-md border border-slate-200 dark:border-slate-700">
          <summary className="cursor-pointer select-none px-3.5 py-2 text-sm font-semibold text-brand-700 dark:text-brand-100">
            Same passage as Q{sharedWith} <span className="font-normal text-slate-500 group-open:hidden dark:text-slate-400">· tap to show</span>
          </summary>
          <div className="px-1 pb-1">
            <Passage value={passage} />
          </div>
        </details>
      ) : passage ? (
        <Passage value={passage} />
      ) : null}

      {isOrderingQuestion(question) ? (
        <ClauseOrderAnswer question={question} placed={selected} revealed={revealed} onChange={onSelect} />
      ) : (
        <div className="mt-3.5 space-y-2.5">
          {question.options.map((option, index) => (
            <OptionButton
              key={option}
              index={index}
              selected={selected === index}
              correct={question.answer === index}
              revealed={revealed}
              onSelect={onSelect}
            >
              {option}
            </OptionButton>
          ))}
        </div>
      )}

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
  // Carry the reading id back so the list can scroll this card into view instead
  // of resetting to the top.
  const backParams = new URLSearchParams();
  if (backLevel) backParams.set('level', backLevel);
  backParams.set('reading', id);
  const backToReading = `/reading?${backParams.toString()}`;
  const reading = readings.find((item) => item.id === id);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const { dispatch, isReadingCompleted } = useLearning();

  const confirm = useConfirm();
  // Stable identity so checkAnswers' dependency list does not change every render.
  const questions = useMemo(() => reading?.questions || [], [reading]);
  // Number of the first question whose passage a later question repeats (pairs like 19-20).
  const sharedWith = useMemo(() => {
    const map = {};
    questions.forEach((question, index) => {
      const previous = questions[index - 1];
      if (!previous || !question.passage) return;
      if (stripUnderline(question.passage) === stripUnderline(previous.passage)) {
        map[question.id] = map[previous.id] || previous.questionNumber || index;
      }
    });
    return map;
  }, [questions]);
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

  // Open each reading from the top of the scroll area (the shared <main> keeps
  // its previous offset, which would otherwise drop you partway down).
  useEffect(() => {
    document.querySelector('main')?.scrollTo({ top: 0 });
  }, [id]);

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
        const remaining = questions.filter(
          (question) => !isAnswered(question, selectedAnswers[question.id])
        ).length;
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
    [confirm, dispatch, questions, reading, revealed, selectedAnswers]
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
          <PdfViewer src={reading.paperSrc} pageRange={reading.paperPageRange} />
        </div>
      </article>
    );
  }

  const answeredCount = questions.filter((question) => isAnswered(question, selectedAnswers[question.id])).length;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;
  const correctCount = revealed
    ? questions.filter((question) => isAnswerCorrect(question, selectedAnswers[question.id])).length
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
    <article className="mx-auto max-w-4xl space-y-4 pb-[calc(5rem+max(env(safe-area-inset-bottom),0.5rem))] sm:space-y-5 lg:pb-0">
      {/* One compact sticky bar: back, title, answered count (opens the jump grid) and timer */}
      <div className="sticky -top-4 z-40 -mx-3 -mt-4 border-b border-slate-200 bg-white/95 px-3 pt-2.5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:-top-5 sm:-mx-6 sm:-mt-5 sm:px-6 lg:mx-0 lg:mt-0 lg:overflow-hidden lg:rounded-2xl lg:border lg:px-4 lg:shadow-card">
        <div className="flex items-center gap-2">
          <Link
            to={backToReading}
            aria-label="Back to reading"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </Link>
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500 ring-4 ring-brand-100 dark:ring-brand-500/25" aria-hidden="true" />
          <p className="min-w-0 flex-1 truncate pl-1 text-sm font-bold text-slate-950 dark:text-white">{shortTitle(reading.title)}</p>
          <DoneToggle
            done={isReadingCompleted(reading.id)}
            title={reading.title}
            onToggle={() =>
              dispatch({ type: isReadingCompleted(reading.id) ? 'uncomplete-reading' : 'complete-reading', id: reading.id })
            }
          />
          <AnsweredCount
            answered={answeredCount}
            correct={correctCount}
            total={questions.length}
            revealed={revealed}
            onClick={() => setShowGrid((value) => !value)}
            aria-expanded={showGrid}
            aria-controls="reading-jump-grid"
          />
          <div
            className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-2.5 py-1.5 ${timerTone} ${isUrgent ? 'animate-pulse' : ''}`}
            title={isUrgent ? 'Answers will be checked automatically.' : 'Time left'}
          >
            <Clock aria-hidden="true" size={14} />
            <span className="text-sm font-black tabular-nums leading-none">{formatTime(remainingSeconds)}</span>
          </div>
        </div>
        {showGrid ? (
          <div id="reading-jump-grid" className="grid max-h-56 grid-cols-8 gap-1.5 overflow-y-auto py-2.5 sm:grid-cols-10">
            {questions.map((question, index) => {
              const number = question.questionNumber || index + 1;
              const answered = isAnswered(question, selectedAnswers[question.id]);
              const tone = revealed
                ? isAnswerCorrect(question, selectedAnswers[question.id])
                  ? 'bg-mint-100 text-mint-700 dark:bg-mint-500/20 dark:text-mint-100'
                  : 'bg-coral-100 text-coral-700 dark:bg-coral-500/20 dark:text-coral-100'
                : answered
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => {
                    document.getElementById(`q-${number}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setShowGrid(false);
                  }}
                  className={`h-8 rounded-md text-xs font-bold transition hover:ring-2 hover:ring-brand-300 ${tone}`}
                >
                  {number}
                </button>
              );
            })}
          </div>
        ) : null}
        <div className="-mx-3 mt-2.5 h-1 overflow-hidden bg-slate-100 dark:bg-slate-800 sm:-mx-6 lg:-mx-4">
          <div className={`h-full transition-all duration-500 ${progressTone}`} style={{ width: `${timePercent}%` }} />
        </div>
      </div>

      {questions.map((question, index) => (
        <ReadingQuestionCard
          key={question.id}
          question={question}
          fallbackPassage={reading.passage}
          fallbackNumber={index + 1}
          sharedWith={sharedWith[question.id]}
          sameGroup={Boolean(question.instruction) && questions[index - 1]?.instruction === question.instruction}
          selected={selectedAnswers[question.id]}
          revealed={revealed}
          onSelect={(answer) =>
            setSelectedAnswers((current) => ({
              ...current,
              [question.id]: answer
            }))
          }
        />
      ))}

      <div className="fixed inset-x-0 bottom-[calc(3.5rem+max(env(safe-area-inset-bottom),0.5rem))] z-30 border-t border-slate-200 bg-white/95 px-3 py-2 shadow-[0_-8px_20px_rgba(15,23,42,0.08)] backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/80 lg:sticky lg:-bottom-10 lg:mx-0 lg:rounded-lg lg:border lg:bg-white lg:p-5 lg:shadow-soft lg:backdrop-blur-none lg:dark:bg-slate-900">
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
              className="rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2 text-sm font-bold shadow-lg shadow-brand-600/30 transition hover:from-brand-700 hover:to-brand-600 lg:rounded-lg lg:py-2.5 lg:text-sm"
            >
              {revealed ? 'Checked' : 'Check answers'}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
