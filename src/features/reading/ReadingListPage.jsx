import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { useLearning } from '../../context/LearningContext';
import { readings } from '../../data/reading';
import { usePageMeta } from '../../hooks/usePageMeta';

function testNumber(reading) {
  const match = (reading.id || reading.title || '').match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function ReadingListPage() {
  usePageMeta('Reading', 'Practice TOPIK reading passages and comprehension questions.');
  const { isReadingCompleted, dispatch } = useLearning();

  const orderedReadings = [...readings].sort((a, b) => testNumber(a) - testNumber(b));

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Reading practice</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Short passages with immediate answer review.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {orderedReadings.map((reading) => {
          const preview = reading.passage || `${reading.questions.length} questions on one page`;
          const done = isReadingCompleted(reading.id);
          return (
          <Link key={reading.id} to={`/reading/${reading.id}`}>
            <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="blue">{reading.level}</Badge>
                  {reading.topic && reading.topic !== 'Official Reading Paper' ? <Badge>{reading.topic}</Badge> : null}
                  {reading.questions.length > 1 ? <Badge tone="slate">{reading.questions.length} questions</Badge> : null}
                  {done ? <Badge tone="green">Completed</Badge> : null}
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    dispatch({
                      type: done ? 'uncomplete-reading' : 'complete-reading',
                      id: reading.id
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
              <h3 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{reading.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{preview}</p>
            </Card>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
