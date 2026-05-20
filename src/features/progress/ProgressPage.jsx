import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import { useLearning } from '../../context/LearningContext';
import { readings } from '../../data/reading';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function ProgressPage() {
  usePageMeta('Progress', 'Track offline TOPIK II study progress.');
  const { state, grammarProgress, vocabProgress, dispatch } = useLearning();
  const readingProgress = Math.round((state.completedReadingIds.length / readings.length) * 100);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Progress tracking</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Your progress is stored offline on this device.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">Skills</h3>
          <div className="mt-5 space-y-5">
            <ProgressBar value={grammarProgress} label="Grammar" />
            <ProgressBar value={vocabProgress} label="Vocabulary" />
            <ProgressBar value={readingProgress} label="Reading" />
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">Quiz accuracy</h3>
          <p className="mt-4 text-4xl font-bold text-brand-600 dark:text-brand-100">
            {state.vocabularyStats.totalAnswered
              ? Math.round((state.vocabularyStats.correctAnswers / state.vocabularyStats.totalAnswered) * 100)
              : 0}
            %
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {state.vocabularyStats.correctAnswers} / {state.vocabularyStats.totalAnswered} vocabulary answers
          </p>
        </Card>
      </div>
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Recent mock tests</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Latest attempts are saved locally.</p>
          </div>
          <Button variant="danger" onClick={() => dispatch({ type: 'reset-progress' })}>Reset progress</Button>
        </div>
        <div className="mt-5 space-y-3">
          {state.mockTestAttempts.length ? (
            state.mockTestAttempts.map((attempt) => (
              <div key={`${attempt.testId}-${attempt.completedAt}`} className="flex items-center justify-between rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">{attempt.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(attempt.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-xl font-bold text-brand-600 dark:text-brand-100">{attempt.score}%</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No test attempts yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
