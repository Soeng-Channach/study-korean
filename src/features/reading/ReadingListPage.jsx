import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { useLearning } from '../../context/LearningContext';
import { readings } from '../../data/reading';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function ReadingListPage() {
  usePageMeta('Reading', 'Practice TOPIK II reading passages and comprehension questions.');
  const { isReadingCompleted } = useLearning();

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Reading practice</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Short passages with immediate answer review.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {readings.map((reading) => (
          <Link key={reading.id} to={`/reading/${reading.id}`}>
            <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="flex flex-wrap gap-2">
                <Badge tone="blue">{reading.level}</Badge>
                <Badge>{reading.topic}</Badge>
                {isReadingCompleted(reading.id) ? <Badge tone="green">Completed</Badge> : null}
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{reading.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{reading.passage}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
