import { BookOpen, CalendarCheck, Headphones, Languages, Lock, Newspaper, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CompletionCertificate from '../../components/learning/CompletionCertificate';
import BackLink from '../../components/ui/BackLink';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useConfirm } from '../../components/ui/ConfirmDialog';
import ProgressBar from '../../components/ui/ProgressBar';
import { useLearning } from '../../context/LearningContext';
import { catalog } from '../../data/catalog';
import { usePageMeta } from '../../hooks/usePageMeta';

const pct = (done, total) => (total ? Math.round((done / total) * 100) : 0);

export default function ProgressPage() {
  usePageMeta('Progress', 'Track offline TOPIK study progress and earn your certificate.');
  const navigate = useNavigate();
  const { state, masteredWordCount, dispatch } = useLearning();
  const confirm = useConfirm();

  const handleReset = async () => {
    const ok = await confirm({
      title: 'Reset all progress?',
      message:
        'This will clear all completions, saved items, vocabulary stats, and mock test attempts on this device. This cannot be undone.',
      confirmText: 'Reset progress',
      cancelText: 'Keep my progress',
      tone: 'danger'
    });
    if (ok) dispatch({ type: 'reset-progress' });
  };
  const grammarProgress = Math.round((state.completedGrammarIds.length / catalog.grammar.total) * 100);

  // Return to the previous screen (e.g. the test result page), falling back to the
  // dashboard when there is no in-app history — Progress isn't on the mobile nav bar.
  const handleBack = () => {
    const historyIndex = window.history.state?.idx;
    if (typeof historyIndex === 'number' && historyIndex > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const grammarDone = state.completedGrammarIds.length;
  const readingDone = state.completedReadingIds.length;
  const listeningDone = (state.completedListeningIds || []).length;
  const grammarTotal = catalog.grammar.total;
  const readingTotal = catalog.reading.total;
  const listeningTotal = catalog.listening.total;

  const readingProgress = pct(readingDone, readingTotal);
  const listeningProgress = pct(listeningDone, listeningTotal);

  // Certificate is earned once every grammar, reading, and listening lesson is complete.
  const requirements = [
    { label: 'Grammar', icon: BookOpen, done: grammarDone, total: grammarTotal, progress: grammarProgress },
    { label: 'Reading', icon: Newspaper, done: readingDone, total: readingTotal, progress: readingProgress },
    { label: 'Listening', icon: Headphones, done: listeningDone, total: listeningTotal, progress: listeningProgress }
  ];
  // Skill tiles (the 30-Day Plan has 1,000 words; its data file is not loaded here).
  const skills = [
    { label: 'Grammar', icon: BookOpen, done: grammarDone, total: grammarTotal, tone: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100', bar: 'bg-brand-600' },
    { label: 'Vocabulary', icon: Languages, done: masteredWordCount, total: catalog.vocabulary.total, tone: 'bg-coral-100 text-coral-700 dark:bg-coral-500/15 dark:text-coral-100', bar: 'bg-coral-500' },
    { label: 'Reading', icon: Newspaper, done: readingDone, total: readingTotal, tone: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-200', bar: 'bg-sky-500' },
    { label: 'Listening', icon: Headphones, done: listeningDone, total: listeningTotal, tone: 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200', bar: 'bg-violet-500' },
    { label: '30-Day Plan', icon: CalendarCheck, done: (state.knownPlanWordIds || []).length, total: 1000, tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200', bar: 'bg-emerald-500' },
    { label: 'Plan days', icon: Trophy, done: (state.completedPlanDays || []).length, total: 30, tone: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200', bar: 'bg-amber-500' }
  ];
  const totalDone = grammarDone + readingDone + listeningDone;
  const totalItems = grammarTotal + readingTotal + listeningTotal;
  const certificateProgress = pct(totalDone, totalItems);
  const certificateEarned = totalItems > 0 && totalDone === totalItems;

  return (
    <div className="space-y-5">
      <BackLink onClick={handleBack}>Back</BackLink>
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Progress tracking</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Your progress is stored offline on this device.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">Skills</h3>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {skills.map(({ label, icon: Icon, done, total, tone, bar }) => {
              const value = pct(done, total);
              return (
                <div key={label} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}>
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
                  </div>
                  <p className="mt-2.5 text-2xl font-black text-slate-950 dark:text-white">
                    {value}
                    <span className="text-sm font-bold text-slate-400">%</span>
                  </p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={`h-full rounded-full ${bar}`} style={{ width: `${value}%` }} />
                  </div>
                  <p className="mt-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {done.toLocaleString()} / {total.toLocaleString()}
                  </p>
                </div>
              );
            })}
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
          <Button variant="danger" onClick={handleReset}>Reset progress</Button>
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
