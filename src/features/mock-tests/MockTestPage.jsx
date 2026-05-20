import { Clock } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizOption from '../../components/learning/QuizOption';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
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
    ? 'border-coral-500 bg-coral-50 text-coral-700 dark:bg-coral-950/40 dark:text-coral-100'
    : isWarning
      ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-100'
      : 'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-100';
  const progressTone = isUrgent ? 'bg-coral-500' : isWarning ? 'bg-amber-500' : 'bg-brand-600';

  return (
    <div className="mx-auto max-w-3xl space-y-5 pb-44 lg:pb-0">
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold capitalize text-slate-500 dark:text-slate-400">
              {test.type} test &middot; {test.durationMinutes} minute mini test
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{test.title}</h2>
          </div>
          <div className={`min-w-40 rounded-lg border px-4 py-3 text-center ${timerTone}`}>
            <div className="flex items-center justify-center gap-2 text-sm font-semibold">
              <Clock aria-hidden="true" size={18} />
              Time left
            </div>
            <p className="mt-1 font-mono text-3xl font-black tabular-nums">{formatTime(remainingSeconds)}</p>
          </div>
        </div>
        {test.description ? (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{test.description}</p>
        ) : null}
      </Card>

      <Card className="sticky top-4 z-10">
        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <span>{answeredCount} of {questions.length} answered</span>
          <span className="font-mono tabular-nums">{formatTime(remainingSeconds)}</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressTone}`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
        {isUrgent ? (
          <p className="mt-3 text-sm font-semibold text-coral-600 dark:text-coral-100">
            Less than one minute left. The test will submit automatically.
          </p>
        ) : null}
      </Card>

      {questions.map((question, questionIndex) => (
        <Card key={question.id}>
          <h3 className="font-bold text-slate-950 dark:text-white">
            {questionIndex + 1}. {question.prompt}
          </h3>
          <div className="mt-4 space-y-3">
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
      <div className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-20 bg-paper/95 px-4 py-3 shadow-[0_-12px_28px_rgba(15,23,42,0.10)] backdrop-blur dark:bg-slate-950/95 lg:static lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none lg:dark:bg-transparent">
        <Button className="w-full shadow-lg shadow-brand-600/20 lg:shadow-none" disabled={!allAnswered} onClick={() => submit()}>
          Submit test
        </Button>
      </div>
    </div>
  );
}
