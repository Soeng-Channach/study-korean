import { BookMarked, ClipboardCheck, Headphones, Languages, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import { useLearning } from '../../context/LearningContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { grammarLessons } from '../../data/grammar';
import { listeningTests } from '../../data/listening';
import { mockTests } from '../../data/mockTests';
import { readings } from '../../data/reading';
import { vocabulary } from '../../data/vocabulary';

export default function DashboardPage() {
  usePageMeta('Dashboard', 'Track TOPIK II grammar, reading, vocabulary, and mock test progress.');
  const { state, grammarProgress, vocabProgress } = useLearning();
  const quickLinks = [
    { label: 'Grammar', path: '/grammar', icon: BookMarked, count: `${grammarLessons.length} lessons` },
    { label: 'Reading', path: '/reading', icon: Newspaper, count: `${readings.length} passages` },
    { label: 'Listening', path: '/listening', icon: Headphones, count: `${listeningTests.length} test` },
    { label: 'Vocabulary', path: '/vocabulary', icon: Languages, count: `${vocabulary.length} words` },
    { label: 'Mock Tests', path: '/mock-tests', icon: ClipboardCheck, count: `${mockTests.length} tests` }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-slate-950 px-4 py-5 text-white shadow-soft sm:px-8 sm:py-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-mint-100 sm:text-sm">Offline-ready Korean learning</p>
          <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl xl:text-4xl">
            Build steady TOPIK II skill, one focused session at a time.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Study grammar patterns, practice reading, review vocabulary, save favorites, and keep your progress on this device.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-5">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path}>
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-soft">
                <Icon className="text-brand-600 dark:text-brand-100" size={22} aria-hidden="true" />
                <h3 className="mt-3 text-base font-bold text-slate-950 dark:text-white sm:mt-4 sm:text-lg">{item.label}</h3>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-sm">{item.count}</p>
              </Card>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">Study progress</h3>
          <div className="mt-5 space-y-5">
            <ProgressBar value={grammarProgress} label="Grammar completed" />
            <ProgressBar value={vocabProgress} label="Vocabulary mastered" />
            <ProgressBar value={Math.round((state.completedReadingIds.length / readings.length) * 100)} label="Reading completed" />
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">Library</h3>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Grammar</dt>
              <dd className="font-bold">{grammarLessons.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Vocabulary</dt>
              <dd className="font-bold">{vocabulary.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Reading</dt>
              <dd className="font-bold">{readings.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Listening</dt>
              <dd className="font-bold">{listeningTests.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Mock tests</dt>
              <dd className="font-bold">{mockTests.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Saved</dt>
              <dd className="font-bold">{state.bookmarkedGrammarIds.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Test attempts</dt>
              <dd className="font-bold">{state.mockTestAttempts.length}</dd>
            </div>
          </dl>
        </Card>
      </section>
    </div>
  );
}
