import { Link } from 'react-router-dom';
import { Headphones } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { listeningTests } from '../../data/listening';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function ListeningListPage() {
  usePageMeta('Listening', 'Practice TOPIK listening tests with audio and answer review.');

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
          {listeningTests.map((test) => (
            <Link key={test.id} to={`/listening/${test.id}`}>
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-soft">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="blue">{test.level}</Badge>
                  <Badge>{test.topic}</Badge>
                  <Badge tone="slate">{test.questions.length} questions</Badge>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{test.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {test.durationMinutes} minutes with local audio and instant answer review.
                </p>
              </Card>
            </Link>
          ))}
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
