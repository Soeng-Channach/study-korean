import { Clock } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizOption from '../../components/learning/QuizOption';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useConfirm } from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { mockTests } from '../../data/mockTests';
import { usePageMeta } from '../../hooks/usePageMeta';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default function MockTestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = mockTests.find((item) => item.id === id);
  const { dispatch } = useLearning();
  const confirm = useConfirm();
  const questions = useMemo(() => test?.sections.flatMap((section) => section.questions) || [], [test]);
  const totalSeconds = (test?.durationMinutes || 0) * 60;
  const [answers, setAnswers] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const submittedRef = useRef(false);

  usePageMeta(test?.title || 'Mock test', 'Offline TOPIK II mock test.');

  const submit = useCallback((reason = 'manual') => {
    if (!test || submittedRef.current) return;

    submittedRef.current = true;
    const correct = questions.filter((question) => answers[question.id] === question.answer).length;
    const attempt = {
      testId: test.id,
      title: test.title,
      score: Math.round((correct / questions.length) * 100),
      correct,
      total: questions.length,
      completedAt: new Date().toISOString(),
      timeExpired: reason === 'timeout'
    };
    dispatch({ type: 'record-test-attempt', attempt });
    navigate(`/mock-tests/${test.id}/result`, { state: attempt });
  }, [answers, dispatch, navigate, questions, test]);

  useEffect(() => {
    setRemainingSeconds(totalSeconds);
    submittedRef.current = false;
  }, [test?.id, totalSeconds]);

  useEffect(() => {
    if (!test || remainingSeconds <= 0) return undefined;

    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [remainingSeconds, test]);

  useEffect(() => {
    if (test && remainingSeconds === 0) {
      submit('timeout');
    }
  }, [remainingSeconds, submit, test]);

  if (!test) {
    return <EmptyState title="Test not found" message="This mock test is not available in the offline library." />;
  }

  const allAnswered = questions.every((question) => answers[question.id] !== undefined);
  const answeredCount = Object.keys(answers).length;
  const timePercent = totalSeconds > 0 ? Math.round((remainingSeconds / totalSeconds) * 100) : 0;
  const isUrgent = remainingSeconds <= 60;
  const isWarning = remainingSeconds <= 180;
  const timerTone = isUrgent
    ? 'border-coral-500 bg-coral-50 text-coral-700 dark:border-coral-400 dark:bg-coral-500/25 dark:text-white'
    : isWarning
      ? 'border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-300 dark:bg-amber-400/25 dark:text-amber-50'
      : 'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/25 dark:text-white';
  const progressTone = isUrgent ? 'bg-coral-500' : isWarning ? 'bg-amber-500' : 'bg-brand-600';

  return (
    <div className="mx-auto max-w-3xl space-y-4 pb-[calc(7.5rem+env(safe-area-inset-bottom))] sm:space-y-5 lg:pb-0">
      <div className="sticky -top-5 z-30 -mx-4 -mt-5 border-b border-slate-200 bg-white/95 px-4 py-2.5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/80 sm:static sm:mx-0 sm:mt-0 sm:rounded-lg sm:border sm:bg-white sm:px-5 sm:py-3 sm:shadow-soft sm:backdrop-blur-none sm:dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-100 sm:text-[11px]">Test progress</p>
            <p className="mt-0.5 text-xs font-semibold text-slate-500 dark:text-slate-400 sm:mt-1">
              {answeredCount} of {questions.length} answered
            </p>
            {isUrgent ? (
              <p className="mt-0.5 text-[11px] font-semibold leading-4 text-coral-600 dark:text-coral-100 sm:mt-1 sm:text-xs">
                The test will submit automatically.
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
        <p className="text-sm font-semibold capitalize text-slate-500 dark:text-slate-400">
          {test.type} test &middot; {test.durationMinutes} minute mini test
        </p>
        <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-950 dark:text-white sm:text-3xl">{test.title}</h2>
        {test.description ? (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{test.description}</p>
        ) : null}
      </Card>

      {questions.map((question, questionIndex) => (
        <Card key={question.id} className="scroll-mt-24 p-4 sm:p-5">
          <h3 className="text-sm font-bold leading-6 text-slate-950 [overflow-wrap:anywhere] dark:text-white sm:text-base">
            {questionIndex + 1}. {question.prompt}
          </h3>
          <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
            {question.options.map((option, optionIndex) => (
              <QuizOption
                key={option}
                option={option}
                selected={answers[question.id] === optionIndex}
                correct={false}
                revealed={false}
                onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
              />
            ))}
          </div>
        </Card>
      ))}
      <div className="fixed inset-x-0 bottom-[calc(3.5rem+max(env(safe-area-inset-bottom),0.5rem))] z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-12px_28px_rgba(15,23,42,0.10)] backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/80 lg:static lg:mx-0 lg:rounded-lg lg:border lg:bg-white lg:p-5 lg:shadow-soft lg:backdrop-blur-none lg:dark:bg-slate-900">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
              {allAnswered ? 'Ready to submit' : `${questions.length - answeredCount} left`}
            </p>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              Review your answers before finishing the test.
            </p>
          </div>
          <Button
            className="shrink-0 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-base font-bold shadow-lg shadow-brand-600/30 transition hover:from-brand-700 hover:to-brand-600 lg:rounded-lg lg:py-2.5 lg:text-sm"
            onClick={async () => {
              const remaining = questions.length - answeredCount;
              if (remaining > 0) {
                const ok = await confirm({
                  title: 'Submit with blanks?',
                  message: `You still have ${remaining} unanswered question${remaining === 1 ? '' : 's'}. Submitting now will count ${remaining === 1 ? 'it' : 'them'} as wrong.`,
                  confirmText: 'Submit anyway',
                  cancelText: 'Keep going',
                  tone: 'warning'
                });
                if (!ok) return;
              }
              submit();
            }}
          >
            Submit test
          </Button>
        </div>
      </div>
    </div>
  );
}
