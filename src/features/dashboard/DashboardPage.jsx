import { BookMarked, ClipboardCheck, Headphones, Languages, Newspaper, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { useConfirm } from '../../components/ui/ConfirmDialog';
import ProgressBar from '../../components/ui/ProgressBar';
import { useLearning } from '../../context/LearningContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { catalog } from '../../data/catalog';

export default function DashboardPage() {
  usePageMeta('Dashboard', 'Track TOPIK I and TOPIK II grammar, reading, vocabulary, and mock test progress.');
  const { state, masteredWordCount, dispatch } = useLearning();
  const grammarProgress = Math.round((state.completedGrammarIds.length / catalog.grammar.total) * 100);
  const vocabProgress = Math.round((masteredWordCount / catalog.vocabulary.total) * 100);
  const confirm = useConfirm();

  async function handleReset() {
    const ok = await confirm({
      title: 'Reset all progress?',
      message: 'This will clear all completions, saved items, vocabulary stats, and mock test attempts on this device. This cannot be undone.',
      confirmText: 'Reset progress',
      cancelText: 'Keep my progress',
      tone: 'danger'
    });
    if (ok) dispatch({ type: 'reset-progress' });
  }
  const quickLinks = [
    { label: 'Grammar', path: '/grammar?level=TOPIK II', icon: BookMarked, count: `${catalog.grammar.total} lessons` },
    { label: 'Reading', path: '/reading', icon: Newspaper, count: `${catalog.reading.total} passages` },
    { label: 'Listening', path: '/listening', icon: Headphones, count: `${catalog.listening.total} tests` },
    { label: 'Vocabulary', path: '/vocabulary', icon: Languages, count: `${catalog.vocabulary.total} words` },
    { label: 'Mock Tests', path: '/mock-tests', icon: ClipboardCheck, count: `${catalog.mockTests.total} tests` }
  ];

  const libraryRows = [
    { label: 'Grammar', counts: catalog.grammar.byLevel },
    { label: 'Vocabulary', counts: catalog.vocabulary.byLevel },
    { label: 'Reading', counts: catalog.reading.byLevel },
    { label: 'Listening', counts: catalog.listening.byLevel },
    { label: 'Mock tests', counts: catalog.mockTests.byLevel }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-slate-950 px-4 py-5 text-white shadow-soft sm:px-8 sm:py-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-mint-100 sm:text-sm">Offline-ready Korean learning</p>
          <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl xl:text-4xl">
            Build steady TOPIK I &amp; II skill, one focused session at a time.
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
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Study progress</h3>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-coral-500 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-coral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
          <div className="mt-5 space-y-5">
            <ProgressBar value={grammarProgress} label="Grammar completed" />
            <ProgressBar value={vocabProgress} label="Vocabulary mastered" />
            <ProgressBar value={Math.round((state.completedReadingIds.length / catalog.reading.total) * 100)} label="Reading completed" />
            <ProgressBar
              value={catalog.listening.total > 0
                ? Math.round(((state.completedListeningIds?.length || 0) / catalog.listening.total) * 100)
                : 0}
              label="Listening completed"
            />
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">Library</h3>
          <dl className="mt-5 text-sm">
            <div className="grid grid-cols-[1fr_3.25rem_3.25rem] gap-x-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              <span />
              <span className="text-right">TOPIK I</span>
              <span className="text-right">TOPIK II</span>
            </div>
            {libraryRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1fr_3.25rem_3.25rem] gap-x-3 border-t border-slate-100 py-2 dark:border-slate-800">
                <dt className="text-slate-500 dark:text-slate-400">{row.label}</dt>
                <dd className={`text-right font-bold ${row.counts['TOPIK I'] ? '' : 'text-slate-300 dark:text-slate-600'}`}>
                  {row.counts['TOPIK I']}
                </dd>
                <dd className="text-right font-bold">{row.counts['TOPIK II']}</dd>
              </div>
            ))}
            <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <dt className="text-slate-500 dark:text-slate-400">Saved</dt>
              <dd className="font-bold">{state.bookmarkedGrammarIds.length}</dd>
            </div>
            <div className="mt-3 flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Test attempts</dt>
              <dd className="font-bold">{state.mockTestAttempts.length}</dd>
            </div>
          </dl>
        </Card>
      </section>
    </div>
  );
}
