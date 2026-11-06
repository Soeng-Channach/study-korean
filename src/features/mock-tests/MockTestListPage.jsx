import { ArrowRight, BookOpenCheck, FileText, Headphones, Languages, Trophy } from 'lucide-react';
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
    gradient: 'from-brand-600 via-brand-500 to-indigo-600',
    shadow: 'shadow-brand-600/30'
  },
  {
    type: 'vocabulary',
    title: 'Vocabulary Test',
    description: 'Word meanings and recognition in focused 20-question sets.',
    icon: Languages,
    path: '/mock-tests/vocabulary',
    gradient: 'from-coral-500 via-pink-500 to-rose-500',
    shadow: 'shadow-coral-500/30'
  }
];

const paperLinks = [
  { title: 'Reading papers', description: 'Past TOPIK reading tests', icon: FileText, path: '/reading', tone: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100' },
  { title: 'Listening papers', description: 'Past TOPIK listening tests with audio', icon: Headphones, path: '/listening', tone: 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200' }
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
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} p-5 text-white shadow-lg ${item.shadow} transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2`}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-16 right-12 h-32 w-32 rounded-full bg-white/10" aria-hidden="true" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/30 backdrop-blur">
                  <Icon size={24} aria-hidden="true" />
                </div>
                {best !== null ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-bold ring-1 ring-white/30">
                    <Trophy size={12} aria-hidden="true" /> Best {best}%
                  </span>
                ) : null}
              </div>
              <h3 className="relative mt-4 text-xl font-bold">{item.title}</h3>
              <p className="relative mt-1 text-sm leading-6 text-white/85">{item.description}</p>
              <div className="relative mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-white/15 px-2.5 py-1 ring-1 ring-white/25">TOPIK I · {byLevel('TOPIK I')}</span>
                <span className="rounded-full bg-white/15 px-2.5 py-1 ring-1 ring-white/25">TOPIK II · {byLevel('TOPIK II')}</span>
                <span className="text-white/80">{mine.length} taken</span>
              </div>
              <span className="relative mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm">
                Choose a set <ArrowRight size={15} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Past papers</h3>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {paperLinks.map(({ title, description, icon: Icon, path, tone }) => (
            <Link
              key={path}
              to={path}
              className="group flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-card ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-soft dark:bg-slate-900 dark:ring-slate-800"
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
