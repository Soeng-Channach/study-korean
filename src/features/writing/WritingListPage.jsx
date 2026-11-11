import { ArrowRight, BookOpenText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PaperTestCard from '../../components/learning/PaperTestCard';
import { useLearning } from '../../context/LearningContext';
import { WRITING_MINUTES, writingSets } from '../../data/writing';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function WritingListPage() {
  usePageMeta('Writing', 'TOPIK II writing practice: questions 51 to 54 with model answers.');
  const { state, dispatch, isWritingCompleted } = useLearning();
  const drafts = state.writingDrafts || {};
  const completed = (state.completedWritingIds || []).length;

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Writing</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          TOPIK II 쓰기 · questions 51–54 · {WRITING_MINUTES} minutes · {completed} of {writingSets.length} sets done
        </p>
      </div>

      <Link
        to="/writing/guide"
        className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-4 text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:shadow-xl sm:p-5"
      >
        <span className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10" aria-hidden="true" />
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/30">
          <BookOpenText size={24} aria-hidden="true" />
        </span>
        <span className="relative min-w-0 flex-1">
          <span className="block text-lg font-bold">Writing guide and templates</span>
          <span className="block text-sm text-white/85">
            How each question is scored, a structure to follow, and useful expressions in English and Khmer.
          </span>
        </span>
        <ArrowRight size={18} className="relative shrink-0 transition group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>

      <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
        {writingSets.map((set) => {
          const done = isWritingCompleted(set.id);
          const hasDraft = Object.keys(drafts).some((key) => key.startsWith(`${set.id}:`));
          return (
            <PaperTestCard
              key={set.id}
              to={`/writing/${set.id}`}
              test={{
                title: set.title,
                level: 'TOPIK II',
                questionCount: set.questions.length,
                durationMinutes: WRITING_MINUTES
              }}
              accent="emerald"
              note={hasDraft && !done ? 'Draft saved' : undefined}
              done={done}
              onToggleDone={() => dispatch({ type: done ? 'uncomplete-writing' : 'complete-writing', id: set.id })}
            />
          );
        })}
      </div>

      <p className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-xs leading-5 text-slate-500 dark:border-slate-700 dark:text-slate-400">
        Each set follows a real TOPIK II round: the same topics, blanks, chart data and essay questions. The passages were
        re-worded and the model answers were written for this app, so check the official paper when exact wording matters. Rounds 100, 101, 103, 104 and 105 were not released, so
        those sets follow what test-takers remembered.
      </p>
    </div>
  );
}
