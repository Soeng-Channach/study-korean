import { BookOpen, Headphones, Lock, Newspaper } from 'lucide-react';
import CompletionCertificate from '../../components/learning/CompletionCertificate';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import { useLearning } from '../../context/LearningContext';
import { grammarLessons } from '../../data/grammar';
import { listeningTests } from '../../data/listening';
import { readings } from '../../data/reading';
import { usePageMeta } from '../../hooks/usePageMeta';

const pct = (done, total) => (total ? Math.round((done / total) * 100) : 0);

export default function ProgressPage() {
  usePageMeta('Progress', 'Track offline TOPIK study progress and earn your certificate.');
  const { state, grammarProgress, vocabProgress, dispatch } = useLearning();

  const grammarDone = state.completedGrammarIds.length;
  const readingDone = state.completedReadingIds.length;
  const listeningDone = (state.completedListeningIds || []).length;
  const grammarTotal = grammarLessons.length;
  const readingTotal = readings.length;
  const listeningTotal = listeningTests.length;

  const readingProgress = pct(readingDone, readingTotal);
  const listeningProgress = pct(listeningDone, listeningTotal);

  // Certificate is earned once every grammar, reading, and listening lesson is complete.
  const requirements = [
    { label: 'Grammar', icon: BookOpen, done: grammarDone, total: grammarTotal, progress: grammarProgress },
    { label: 'Reading', icon: Newspaper, done: readingDone, total: readingTotal, progress: readingProgress },
    { label: 'Listening', icon: Headphones, done: listeningDone, total: listeningTotal, progress: listeningProgress }
  ];
  const totalDone = grammarDone + readingDone + listeningDone;
  const totalItems = grammarTotal + readingTotal + listeningTotal;
  const certificateProgress = pct(totalDone, totalItems);
  const certificateEarned = totalItems > 0 && totalDone === totalItems;

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
            <ProgressBar value={listeningProgress} label="Listening" />
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

      {certificateEarned ? (
        <CompletionCertificate
          subtitle="Korean TOPIK Course"
          certificateId={`TOPIK-ALL-G${grammarTotal}-R${readingTotal}-L${listeningTotal}`}
          stats={[
            { label: 'Grammar lessons', value: grammarTotal, icon: BookOpen },
            { label: 'Reading tests', value: readingTotal, icon: Newspaper },
            { label: 'Listening tests', value: listeningTotal, icon: Headphones }
          ]}
        />
      ) : (
        <Card>
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
              <Lock size={20} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Certificate of Completion</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Complete every grammar, reading, and listening lesson to unlock your certificate.
              </p>
              <div className="mt-4">
                <ProgressBar value={certificateProgress} label={`${totalDone} of ${totalItems} lessons complete`} />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {requirements.map((req) => {
                  const Icon = req.icon;
                  const complete = req.total > 0 && req.done === req.total;
                  return (
                    <div
                      key={req.label}
                      className={
                        complete
                          ? 'flex items-center gap-2 rounded-lg border border-mint-300 bg-mint-50 px-3 py-2 dark:border-mint-500/40 dark:bg-mint-500/10'
                          : 'flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/60'
                      }
                    >
                      <Icon
                        size={16}
                        className={complete ? 'text-mint-600 dark:text-mint-300' : 'text-slate-400 dark:text-slate-500'}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{req.label}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {req.done}/{req.total}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      )}

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
