import { ArrowRight, BookOpenCheck, FileText, Headphones, Languages, PenLine, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import { mockTests } from '../../data/mockTests';
import { usePageMeta } from '../../hooks/usePageMeta';
import { levelOf } from '../../lib/levels';

const testTypes = [
  {
    type: 'grammar',
    title: 'Grammar Test',
    description: 'Core meanings of TOPIK grammar patterns in quick 10-question sets.',
    icon: BookOpenCheck,
    path: '/mock-tests/grammar',
    tone: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100'
  },
  {
    type: 'vocabulary',
    title: 'Vocabulary Test',
    description: 'Word meanings and recognition in focused 20-question sets.',
    icon: Languages,
    path: '/mock-tests/vocabulary',
    tone: 'bg-coral-100 text-coral-700 dark:bg-coral-500/15 dark:text-coral-100'
  }
];

const paperLinks = [
  { title: 'Reading papers', description: 'Past TOPIK reading tests', icon: FileText, path: '/reading', tone: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100' },
  { title: 'Listening papers', description: 'Past TOPIK listening tests with audio', icon: Headphones, path: '/listening', tone: 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200' },
  { title: 'Writing practice', description: 'TOPIK II questions 51–54 with model answers', icon: PenLine, path: '/writing', tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200' }
];

export default function MockTestListPage() {
  usePageMeta('Tests', 'Choose separate offline TOPIK II grammar or vocabulary tests.');
  const { state } = useLearning();
  const attempts = state.mockTestAttempts || [];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Tests</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Pick a test type, then choose a set for your level.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testTypes.map((item) => {
          const Icon = item.icon;
          const tests = mockTests.filter((test) => test.type === item.type);
          const ids = new Set(tests.map((test) => test.id));
          const mine = attempts.filter((attempt) => ids.has(attempt.testId));
          const best = mine.length ? Math.max(...mine.map((attempt) => attempt.score)) : null;
          const byLevel = (level) => tests.filter((test) => levelOf(test) === level).length;

          return (
            <Link
              key={item.type}
              to={item.path}
              className="group flex items-start gap-3.5 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-200 transition hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:bg-slate-900 dark:ring-slate-800 sm:p-5"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.tone}`}>
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-lg font-bold text-slate-950 dark:text-white">{item.title}</span>
                  <ArrowRight size={16} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden="true" />
                </span>
                <span className="mt-0.5 block text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</span>
                <span className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span>TOPIK I · {byLevel('TOPIK I')}</span>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                  <span>TOPIK II · {byLevel('TOPIK II')}</span>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                  <span>{mine.length} taken</span>
                  {best !== null ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-100">
                      <Trophy size={11} aria-hidden="true" /> Best {best}%
                    </span>
                  ) : null}
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Past papers and writing</h3>
        <div className="mt-2 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {paperLinks.map(({ title, description, icon: Icon, path, tone }) => (
            <Link
              key={path}
              to={path}
              className="group flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-card ring-1 ring-slate-200 transition hover:shadow-soft dark:bg-slate-900 dark:ring-slate-800"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-slate-950 dark:text-white">{title}</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">{description}</span>
              </span>
              <ArrowRight size={16} className="text-slate-400 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
