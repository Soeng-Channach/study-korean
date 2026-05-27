import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { useLearning } from '../../context/LearningContext';
import { readings } from '../../data/reading';
import { usePageMeta } from '../../hooks/usePageMeta';

const PINNED_TITLES = ['온라인 수업의 장단점', '환경 보호의 중요성'];

export default function ReadingListPage() {
  usePageMeta('Reading', 'Practice TOPIK reading passages and comprehension questions.');
  const { isReadingCompleted } = useLearning();

  const orderedReadings = (() => {
    const pinned = PINNED_TITLES.map((title) => readings.find((r) => r.title === title)).filter(Boolean);
    const rest = [...readings].reverse().filter((r) => !PINNED_TITLES.includes(r.title));
    return [...pinned, ...rest];
  })();

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Reading practice</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Short passages with immediate answer review.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {orderedReadings.map((reading) => {
          const preview = reading.passage || `${reading.questions.length} questions on one page`;
          return (
          <Link key={reading.id} to={`/reading/${reading.id}`}>
            <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="flex flex-wrap gap-2">
                <Badge tone="blue">{reading.level}</Badge>
                <Badge>{reading.topic}</Badge>
                {reading.questions.length > 1 ? <Badge tone="slate">{reading.questions.length} questions</Badge> : null}
                {isReadingCompleted(reading.id) ? <Badge tone="green">Completed</Badge> : null}
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
