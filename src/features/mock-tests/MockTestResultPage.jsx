import { Link, useLocation, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function MockTestResultPage() {
  usePageMeta('Mock Test Result', 'Review your TOPIK II mock test score.');
  const { id } = useParams();
  const location = useLocation();
  const { state } = useLearning();
  const attempt = location.state || state.mockTestAttempts.find((item) => item.testId === id);

  if (!attempt) {
    return <EmptyState title="No result yet" message="Take the mock test first to see a result." />;
  }

  return (
    <div className="mx-auto max-w-xl">
      <Card className="text-center">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{attempt.title}</p>
        <h2 className="mt-4 text-6xl font-bold text-brand-600 dark:text-brand-100">{attempt.score}%</h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          {attempt.correct} correct from {attempt.total} questions
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
