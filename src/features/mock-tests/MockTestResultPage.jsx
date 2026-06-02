import { ArrowLeft, CalendarDays, CheckCircle2, Target, Trophy, XCircle } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import QuizOption from '../../components/learning/QuizOption';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { mockTests } from '../../data/mockTests';
import { usePageMeta } from '../../hooks/usePageMeta';

function formatCompletedDate(value) {
  if (!value) return 'Completed';

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(value));
}

export default function MockTestResultPage() {
  usePageMeta('Mock Test Result', 'Review your answers and see which were right or wrong.');
  const { id } = useParams();
  const location = useLocation();
  const { state } = useLearning();
  const attempt = location.state || state.mockTestAttempts.find((item) => item.testId === id);

  if (!attempt) {
    return <EmptyState title="No result yet" message="Take the mock test first to see a result." />;
  }

  const test = mockTests.find((item) => item.id === attempt.testId);
  const questions = test ? test.sections.flatMap((section) => section.questions) : [];
  const answers = attempt.answers || {};
  const hasAnswers = Object.keys(answers).length > 0;
  const completedDate = formatCompletedDate(attempt.completedAt);
  const passed = attempt.score >= 60;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link to="/mock-tests" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-100">
        <ArrowLeft size={16} /> Back to tests
      </Link>

      <Card className="text-center">
        <div
          className={
            passed
              ? 'mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-mint-500 to-brand-500 text-white shadow-lg shadow-brand-600/30'
              : 'mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-coral-500 to-pink-500 text-white shadow-lg shadow-coral-500/30'
          }
        >
          <Trophy size={28} />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">{attempt.title}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {attempt.timeExpired ? 'Time expired — submitted automatically.' : 'Test completed.'}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-2xl font-bold text-brand-700 dark:text-brand-100">{attempt.score}%</p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Score</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <p className="inline-flex items-center gap-1 text-2xl font-bold text-mint-700 dark:text-mint-100">
              <Target size={18} /> {attempt.correct}/{attempt.total}
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Correct</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <p className="inline-flex items-center gap-1 text-sm font-bold text-slate-950 dark:text-white">
              <CalendarDays size={16} /> {completedDate}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Date</p>
          </div>
        </div>
      </Card>

      {questions.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            This test is no longer available, so the per-question review can&#39;t be shown.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Answer review</h3>
            {!hasAnswers ? (
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Showing correct answers (your choices weren&#39;t saved for this attempt)
              </span>
            ) : null}
          </div>

          {questions.map((question, index) => {
            const userAnswer = hasAnswers ? answers[question.id] : undefined;
            const answered = userAnswer !== undefined && userAnswer !== null;
            const isCorrect = answered && userAnswer === question.answer;
            return (
              <Card key={question.id} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-bold leading-6 text-slate-950 [overflow-wrap:anywhere] dark:text-white sm:text-base">
                    {index + 1}. {question.prompt}
                  </h4>
                  {hasAnswers ? (
                    isCorrect ? (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-mint-100 px-2.5 py-1 text-[11px] font-bold text-mint-700 dark:bg-mint-500/15 dark:text-mint-100">
                        <CheckCircle2 size={13} /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-coral-100 px-2.5 py-1 text-[11px] font-bold text-coral-700 dark:bg-coral-500/15 dark:text-coral-100">
                        <XCircle size={13} /> {answered ? 'Wrong' : 'Skipped'}
                      </span>
                    )
                  ) : null}
                </div>
                <div className="mt-3 space-y-2.5">
                  {question.options.map((option, optionIndex) => (
                    <QuizOption
                      key={option}
                      option={option}
                      selected={userAnswer === optionIndex}
                      correct={question.answer === optionIndex}
                      revealed
                      onClick={() => {}}
                    />
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Card>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/mock-tests" className="flex-1">
            <Button variant="secondary" className="w-full">Back to tests</Button>
          </Link>
          <Link to="/progress" className="flex-1">
            <Button className="w-full">View progress</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
