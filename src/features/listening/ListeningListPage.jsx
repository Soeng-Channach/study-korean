import { useMemo, useState } from 'react';
import { Headphones } from 'lucide-react';
import PaperTestCard from '../../components/learning/PaperTestCard';
import EmptyState from '../../components/ui/EmptyState';
import LevelTabs from '../../components/ui/LevelTabs';
import StickyHeader from '../../components/ui/StickyHeader';
import { countByLevel, levelOf } from '../../lib/levels';
import { useLearning } from '../../context/LearningContext';
import { listeningIndex as listeningTests } from '../../data/testIndex';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function ListeningListPage() {
  usePageMeta('Listening', 'Practice TOPIK listening tests with audio and answer review.');
  const { isListeningCompleted, dispatch } = useLearning();
  const [level, setLevel] = useState('TOPIK I');

  const levelCounts = useMemo(() => countByLevel(listeningTests), []);
  const levelTests = useMemo(() => listeningTests.filter((t) => levelOf(t) === level), [level]);

  return (
    <div className="space-y-5">
      <StickyHeader>
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
        <LevelTabs value={level} onChange={setLevel} counts={levelCounts} />
      </StickyHeader>

      {levelTests.length ? (
        <div className="grid gap-3 md:grid-cols-2 sm:gap-4">
          {(() => {
            const examRound = (t) => parseInt(t.id.replace('listening-', ''), 10) || 0;
            return [...levelTests].sort((a, b) => examRound(b) - examRound(a));
          })().map((test) => {
            const done = isListeningCompleted(test.id);
            return (
              <PaperTestCard
                key={test.id}
                to={`/listening/${test.id}`}
                test={test}
                icon={Headphones}
                accent="violet"
                kindLabel="Listening"
                done={done}
                onToggleDone={() => dispatch({ type: done ? 'uncomplete-listening' : 'complete-listening', id: test.id })}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={`No ${level} listening tests yet`}
          message={`Add ${level} listening tests to src/data/listening.local.js with matching audio files in public/listening/.`}
        />
      )}
    </div>
  );
}
