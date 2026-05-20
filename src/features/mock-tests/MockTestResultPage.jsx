import { Award, CalendarDays, CheckCircle2, Printer, Trophy } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
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
  usePageMeta('Mock Test Result', 'Review your TOPIK II mock test score.');
  const { id } = useParams();
  const location = useLocation();
  const { state } = useLearning();
  const attempt = location.state || state.mockTestAttempts.find((item) => item.testId === id);

  if (!attempt) {
    return <EmptyState title="No result yet" message="Take the mock test first to see a result." />;
  }

  const completedDate = formatCompletedDate(attempt.completedAt);
  const performanceLabel =
    attempt.score >= 90 ? 'Outstanding Achievement' : attempt.score >= 75 ? 'Strong Completion' : 'Course Completion';

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-100">Test completed</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Your certificate is ready</h2>
        </div>
        <Button icon={Printer} onClick={() => window.print()}>
          Print certificate
        </Button>
      </div>

      <section className="certificate-print overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
        <div className="relative border-[10px] border-double border-amber-300 bg-[radial-gradient(circle_at_top_left,#fef3c7,transparent_28%),linear-gradient(135deg,#ffffff_0%,#f8fafc_56%,#eef2ff_100%)] p-6 text-slate-950 dark:border-amber-200 dark:bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_100%)] sm:p-10">
          <div className="absolute left-6 top-6 h-16 w-16 border-l-4 border-t-4 border-brand-600" aria-hidden="true" />
          <div className="absolute right-6 top-6 h-16 w-16 border-r-4 border-t-4 border-coral-500" aria-hidden="true" />
          <div className="absolute bottom-6 left-6 h-16 w-16 border-b-4 border-l-4 border-coral-500" aria-hidden="true" />
          <div className="absolute bottom-6 right-6 h-16 w-16 border-b-4 border-r-4 border-brand-600" aria-hidden="true" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-950 text-amber-200 ring-8 ring-amber-100">
              <Trophy aria-hidden="true" size={38} />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.35em] text-brand-700">TOPIK II Practice</p>
            <h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-5xl">Certificate of Completion</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
              Awarded for completing a Korean TOPIK II mock test and showing steady commitment to study.
            </p>

            <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Completed Test</p>
            <h2 className="mt-3 text-3xl font-extrabold text-brand-700">{attempt.title}</h2>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-white/80 p-4">
                <Award className="mx-auto text-brand-600" aria-hidden="true" size={24} />
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Score</p>
                <p className="mt-1 text-3xl font-black text-slate-950">{attempt.score}%</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white/80 p-4">
                <CheckCircle2 className="mx-auto text-emerald-600" aria-hidden="true" size={24} />
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Accuracy</p>
                <p className="mt-1 text-3xl font-black text-slate-950">{attempt.correct}/{attempt.total}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white/80 p-4">
                <CalendarDays className="mx-auto text-coral-500" aria-hidden="true" size={24} />
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Date</p>
                <p className="mt-2 text-sm font-bold text-slate-950">{completedDate}</p>
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">
              <Award aria-hidden="true" size={18} />
              {performanceLabel}
            </div>

            <div className="mt-10 flex flex-col gap-6 border-t border-slate-200 pt-6 text-left sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Certificate ID</p>
                <p className="mt-2 font-mono text-sm font-bold text-slate-800">
                  {attempt.testId.toUpperCase()}-{attempt.completedAt ? new Date(attempt.completedAt).getTime() : 'COMPLETE'}
                </p>
              </div>
              <div className="min-w-48 border-t-2 border-slate-950 pt-2 text-center">
                <p className="text-sm font-bold text-slate-950">Korean TOPIK II</p>
                <p className="text-xs text-slate-500">Practice Certificate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Card className="print:hidden">
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
