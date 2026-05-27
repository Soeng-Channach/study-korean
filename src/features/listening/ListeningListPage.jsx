import { Link } from 'react-router-dom';
import { Check, Headphones } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { listeningTests } from '../../data/listening';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function ListeningListPage() {
  usePageMeta('Listening', 'Practice TOPIK listening tests with audio and answer review.');
  const { isListeningCompleted, dispatch } = useLearning();

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-100">
          <Headphones size={18} aria-hidden="true" />
          <p className="text-sm font-semibold">Listening test</p>
        </div>
        <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Listening library</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Play the official audio, answer on one page, then review with transcripts.
        </p>
      </div>

      {listeningTests.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {(() => {
            const pinned = listeningTests.filter((t) => t.id === 'listening-052');
            const rest = [...listeningTests].reverse().filter((t) => t.id !== 'listening-052');
            return [...pinned, ...rest];
          })().map((test) => {
            const done = isListeningCompleted(test.id);
            return (
              <Link key={test.id} to={`/listening/${test.id}`}>
                <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-soft">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge tone="blue">{test.level}</Badge>
                      {test.topic && test.topic !== 'Official Listening Paper' ? <Badge>{test.topic}</Badge> : null}
                      <Badge tone="slate">{test.questions.length} questions</Badge>
                      {done ? <Badge tone="green">Completed</Badge> : null}
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        dispatch({
                          type: done ? 'uncomplete-listening' : 'complete-listening',
                          id: test.id
                        });
                      }}
                      className={
                        done
                          ? 'inline-flex shrink-0 items-center gap-1 rounded-full bg-mint-100 px-2.5 py-1 text-[11px] font-semibold text-mint-700 transition hover:bg-mint-200 dark:bg-mint-500/15 dark:text-mint-100 dark:hover:bg-mint-500/25'
                          : 'inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition hover:border-mint-300 hover:text-mint-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-mint-500 dark:hover:text-mint-100'
                      }
                      aria-label={done ? 'Unmark done' : 'Mark done'}
                    >
                      <Check size={12} />
                      {done ? 'Done' : 'Mark'}
                    </button>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{test.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {test.durationMinutes} minutes with local audio and instant answer review.
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No listening tests available"
          message="Add your own listening tests to src/data/listening.local.js with matching audio files in public/listening/."
        />
      )}
    </div>
  );
}
