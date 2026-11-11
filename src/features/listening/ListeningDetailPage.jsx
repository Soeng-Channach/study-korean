import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Download, Headphones, ImageOff, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
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
import { listeningTests } from '../../data/listening';
import { usePageMeta } from '../../hooks/usePageMeta';

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  const minutes = Math.floor(safe / 60);
  const remainingSeconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function OptionImage({ src, index }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="flex h-28 w-full flex-col items-center justify-center gap-1 rounded-md bg-slate-100 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <ImageOff size={20} aria-hidden="true" />
        Picture {index + 1} could not load (offline?)
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={`Option ${index + 1}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="max-h-48 w-full rounded-md object-contain"
    />
  );
}

function ListeningQuestionCard({ question, selected, revealed, onSelect, showInstruction }) {
  return (
    <Card id={`q-${question.questionNumber}`} className={`${questionCardClass} scroll-mt-32`}>
      {showInstruction ? <GroupInstruction>{question.instruction}</GroupInstruction> : null}
      <QuestionHeader number={question.questionNumber} points={question.points}>
        {question.question}
      </QuestionHeader>

      {question.context ? (
        <PassageBox>
          <p className="whitespace-pre-line">{question.context}</p>
        </PassageBox>
      ) : null}

      <div className={question.questionType === 'image_choice' ? 'mt-3.5 grid grid-cols-2 gap-2.5 sm:gap-3' : 'mt-3.5 space-y-2.5'}>
        {question.options.map((option, index) => {
          const isImage = question.questionType === 'image_choice';
          return (
            <OptionButton
              key={option}
              index={index}
              selected={selected === index}
              correct={question.answer === index}
              revealed={revealed}
              onSelect={onSelect}
              image={isImage}
            >
              {isImage ? <OptionImage src={option} index={index} /> : option}
            </OptionButton>
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
  const [showGrid, setShowGrid] = useState(false);
  const [audio, setAudio] = useState({ playing: false, current: 0, duration: 0 });
  const confirm = useConfirm();
  const { dispatch, isListeningCompleted } = useLearning();

  const questions = test?.questions || [];
  const totalSeconds = (test?.durationMinutes || 60) * 60;
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const autoCheckedRef = useRef(false);
  // The countdown starts with the first press of play, like the real exam.
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  usePageMeta(test?.title || 'Listening test', 'TOPIK listening test with audio practice.');

  useEffect(() => {
    setSelectedAnswers({});
    setRevealed(false);
    setRemainingSeconds(totalSeconds);
    setStarted(false);
    autoCheckedRef.current = false;
  }, [test?.id, totalSeconds]);

  useEffect(() => {
    if (!started || revealed || remainingSeconds <= 0) return undefined;
    const interval = window.setInterval(() => {
      setRemainingSeconds((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [started, revealed, remainingSeconds]);

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

  if (test.paperSrc) {
    return (
      <article className="mx-auto flex h-[calc(100vh-12rem)] max-w-5xl flex-col gap-3 lg:h-[calc(100vh-7rem)]">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/listening"
            className="group inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200 dark:bg-slate-900 dark:text-brand-100 dark:ring-slate-700 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            Listening
          </Link>
          <h2 className="min-w-0 flex-1 truncate text-sm font-bold text-slate-950 dark:text-white sm:text-base">
            {test.title}
          </h2>
          {test.answerSheetSrc ? (
            <a
              href={test.answerSheetSrc}
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
                type: isListeningCompleted(test.id) ? 'uncomplete-listening' : 'complete-listening',
                id: test.id
              })
            }
            className={
              isListeningCompleted(test.id)
                ? 'inline-flex items-center gap-1.5 rounded-full bg-mint-100 px-3 py-1.5 text-xs font-semibold text-mint-700 transition hover:bg-mint-200 dark:bg-mint-500/15 dark:text-mint-100 dark:hover:bg-mint-500/25'
                : 'inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800'
            }
          >
            <Check size={14} /> {isListeningCompleted(test.id) ? 'Done' : 'Mark done'}
          </button>
        </div>

        <Card className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{test.level}</Badge>
            <Badge>{test.topic}</Badge>
            <Badge tone="slate">{test.questionCount || 30} questions</Badge>
            <Badge tone="slate">{test.durationMinutes} minutes</Badge>
          </div>
          <div className="mt-3 flex items-start gap-3">
            <div className="rounded-lg bg-brand-50 p-3 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
              <Headphones size={22} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white">{test.title}</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Official audio with the paper PDF for timed listening practice.
              </p>
              <audio ref={audioRef} className="mt-3 w-full" src={test.audioSrc} controls preload="metadata" />
            </div>
          </div>
        </Card>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <PdfViewer src={test.paperSrc} />
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
  const syncAudio = () => {
    const el = audioRef.current;
    if (el) setAudio({ playing: !el.paused, current: el.currentTime, duration: Number.isFinite(el.duration) ? el.duration : 0 });
  };
  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el) return;
    setStarted(true);
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };
  const toggleMuted = () => {
    const el = audioRef.current;
    if (el) el.muted = !el.muted;
    setMuted((value) => !value);
  };

  function resetAnswers() {
    setSelectedAnswers({});
    setRevealed(false);
    setRemainingSeconds(totalSeconds);
    setStarted(false);
    autoCheckedRef.current = false;
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }

  return (
    <article className="mx-auto max-w-4xl space-y-4 pb-[calc(5rem+max(env(safe-area-inset-bottom),0.5rem))] sm:space-y-5 lg:pb-0">
      {/* Sticky player card: title, answered count (jump grid), timer, then the audio player */}
      <div className="sticky -top-4 z-40 -mx-3 -mt-4 border-b border-slate-200 bg-white/95 px-3 pt-2.5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:-top-5 sm:-mx-6 sm:-mt-5 sm:px-6 lg:mx-0 lg:mt-0 lg:overflow-hidden lg:rounded-2xl lg:border lg:px-4 lg:shadow-card">
        <div className="flex items-center gap-2">
          <Link
            to="/listening"
            aria-label="Back to listening"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </Link>
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500 ring-4 ring-brand-100 dark:ring-brand-500/25" aria-hidden="true" />
          <p className="min-w-0 flex-1 truncate pl-1 text-sm font-bold text-slate-950 dark:text-white">{shortTitle(test.title)}</p>
          <DoneToggle
            done={isListeningCompleted(test.id)}
            title={test.title}
            onToggle={() =>
              dispatch({ type: isListeningCompleted(test.id) ? 'uncomplete-listening' : 'complete-listening', id: test.id })
            }
          />
          <AnsweredCount
            answered={answeredCount}
            correct={correctCount}
            total={questions.length}
            revealed={revealed}
            onClick={() => setShowGrid((value) => !value)}
            aria-expanded={showGrid}
            aria-controls="listening-jump-grid"
          />
          <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            <Clock aria-hidden="true" size={14} />
            <span className="text-sm font-black tabular-nums leading-none">{formatTime(remainingSeconds)}</span>
            {!started && !revealed ? (
              <span className="hidden text-[11px] font-medium leading-none text-slate-500 dark:text-slate-400 sm:inline">press play to start</span>
            ) : null}
          </div>
        </div>
        <audio
          ref={audioRef}
          src={test.audioSrc}
          preload="metadata"
          onPlay={() => {
            setStarted(true);
            syncAudio();
          }}
          onPause={syncAudio}
          onTimeUpdate={syncAudio}
          onLoadedMetadata={syncAudio}
          onEnded={syncAudio}
        />
        <div className="mt-2.5 flex items-center gap-1.5 rounded-full bg-slate-100 py-1 pl-1 pr-2 dark:bg-slate-800 sm:gap-2">
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={audio.playing ? 'Pause audio' : 'Play audio'}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm transition hover:bg-brand-700"
          >
            {audio.playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} className="translate-x-px" aria-hidden="true" />}
          </button>
          <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-700 dark:text-slate-200">
            {formatTime(audio.current)} / {formatTime(audio.duration)}
          </span>
          <input
            type="range"
            min={0}
            max={audio.duration || 0}
            step={1}
            value={Math.min(audio.current, audio.duration || 0)}
            onChange={(event) => {
              if (audioRef.current) audioRef.current.currentTime = Number(event.target.value);
            }}
            aria-label="Audio position"
            className="h-1.5 min-w-0 flex-1 cursor-pointer accent-brand-600"
          />
          <button
            type="button"
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
            }}
            aria-label="Back 10 seconds"
            title="Back 10 seconds"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <RotateCcw size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={toggleMuted}
            aria-label={muted ? 'Unmute audio' : 'Mute audio'}
            aria-pressed={muted}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
          </button>
        </div>
        {showGrid ? (
          <div id="listening-jump-grid" className="grid max-h-56 grid-cols-8 gap-1.5 overflow-y-auto py-2.5 sm:grid-cols-10">
            {questions.map((question) => {
              const answered = selectedAnswers[question.id] !== undefined;
              const tone = revealed
                ? selectedAnswers[question.id] === question.answer
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
                    document.getElementById(`q-${question.questionNumber}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setShowGrid(false);
                  }}
                  className={`h-8 rounded-md text-xs font-bold transition hover:ring-2 hover:ring-brand-300 ${tone}`}
                >
                  {question.questionNumber}
                </button>
              );
            })}
          </div>
        ) : null}
        <div className="-mx-3 mt-2.5 h-1 overflow-hidden bg-slate-100 dark:bg-slate-800 sm:-mx-6 lg:-mx-4">
          <div className="h-full bg-brand-600 transition-all duration-500" style={{ width: `${timePercent}%` }} />
        </div>
      </div>

      {test.reviewNote ? (
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-sm leading-6 text-amber-900 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-100">
          <strong>Under review:</strong> {test.reviewNote}
        </p>
      ) : null}

      {questions.map((question, index) => (
        <ListeningQuestionCard
          key={question.id}
          question={question}
          showInstruction={index === 0 || question.instruction !== questions[index - 1].instruction}
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

      <div className="fixed inset-x-0 bottom-[calc(3.5rem+max(env(safe-area-inset-bottom),0.5rem))] z-30 border-t border-slate-200 bg-white/95 px-3 py-2 shadow-[0_-8px_20px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 lg:sticky lg:-bottom-10 lg:rounded-lg lg:border lg:p-5 lg:shadow-soft">
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
