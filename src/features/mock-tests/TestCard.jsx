import clsx from 'clsx';
import { ArrowRight, Clock3, ListChecks, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';

// One compact row per test: number tile, short title, what it covers, and the
// best score once the test has been taken.
export default function TestCard({ test }) {
  const { state } = useLearning();
  const questionCount = test.sections.reduce((sum, section) => sum + section.questions.length, 0);
  const isGrammar = test.type === 'grammar';
  const number = test.title.match(/(\d+)\s*$/)?.[1] || '—';
  // The page already says the level and the test type, so drop them from the title.
  const shortTitle = test.title.replace(/^TOPIK I{1,2}\s+(Grammar|Vocabulary)\s+/i, '');
  const scores = (state.mockTestAttempts || []).filter((attempt) => attempt.testId === test.id).map((attempt) => attempt.score);
  const best = scores.length ? Math.max(...scores) : null;

  return (
    // id + scroll-margin let the category list scroll this card back into view
    // (clear of the sticky header) when you return from taking the test.
    <Link
      id={`test-${test.id}`}
      to={`/mock-tests/${test.id}`}
      className={clsx(
        'group flex scroll-mt-56 items-center gap-3.5 rounded-2xl bg-white p-3.5 shadow-card ring-1 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft dark:bg-slate-900',
        best !== null
          ? 'ring-mint-300 dark:ring-mint-500/40'
          : isGrammar
            ? 'ring-slate-200 hover:ring-brand-200 dark:ring-slate-800 dark:hover:ring-brand-500/40'
            : 'ring-slate-200 hover:ring-coral-200 dark:ring-slate-800 dark:hover:ring-coral-500/40'
      )}
    >
      <span
        className={clsx(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-black text-white shadow-md',
          isGrammar ? 'from-brand-500 to-indigo-600 shadow-brand-500/30' : 'from-coral-500 to-pink-500 shadow-coral-500/30'
        )}
      >
        {number}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-bold text-slate-950 dark:text-white">{shortTitle}</span>
        <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{test.description}</span>
        <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <ListChecks size={13} aria-hidden="true" /> {questionCount} questions
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 size={13} aria-hidden="true" /> {test.durationMinutes} min
          </span>
          {best !== null ? (
            <span className="inline-flex items-center gap-1 font-semibold text-mint-700 dark:text-mint-100">
              <Trophy size={13} aria-hidden="true" /> Best {best}%
            </span>
          ) : null}
        </span>
      </span>
      <ArrowRight
        size={16}
        className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-700 dark:group-hover:text-slate-200"
        aria-hidden="true"
      />
    </Link>
  );
}
