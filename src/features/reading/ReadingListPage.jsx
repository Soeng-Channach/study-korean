import { useEffect, useMemo } from 'react';
import { FileText } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import PaperTestCard from '../../components/learning/PaperTestCard';
import Card from '../../components/ui/Card';
import LevelTabs from '../../components/ui/LevelTabs';
import StickyHeader from '../../components/ui/StickyHeader';
import { countByLevel, levelOf } from '../../lib/levels';
import { useLearning } from '../../context/LearningContext';
import { readingIndex as readings } from '../../data/testIndex';
import { usePageMeta } from '../../hooks/usePageMeta';

function examRound(reading) {
  const match = (reading.id || reading.title || '').match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function isOfficial(reading) {
  return reading.topic === 'Official Reading Paper';
}

export default function ReadingListPage() {
  usePageMeta('Reading', 'Practice TOPIK reading passages and comprehension questions.');
  const { isReadingCompleted, dispatch } = useLearning();
  // Keep the selected level in the URL so it survives opening a reading and
  // coming back (both the in-app "Back" link and the browser back button).
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get('level') === 'TOPIK II' ? 'TOPIK II' : 'TOPIK I';
  const setLevel = (next) => setSearchParams({ level: next }, { replace: true });

  // When returning from a reading, scroll its card back into view rather than
  // landing at the top, then drop the marker so it doesn't linger in the URL.
  const lastReadingId = searchParams.get('reading');
  useEffect(() => {
    if (!lastReadingId) return;
    document.getElementById(`reading-${lastReadingId}`)?.scrollIntoView({ block: 'start' });
    const next = new URLSearchParams(searchParams);
    next.delete('reading');
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastReadingId]);

  const levelCounts = useMemo(() => countByLevel(readings), []);
  const levelReadings = useMemo(() => readings.filter((r) => levelOf(r) === level), [level]);

  const orderedReadings = [...levelReadings].sort((a, b) => {
    // Official papers first, then short themed practice passages.
    if (isOfficial(a) !== isOfficial(b)) return isOfficial(a) ? -1 : 1;
    // Official papers newest-first; themed passages in natural order.
    if (isOfficial(a)) {
      if (examRound(a) !== examRound(b)) return examRound(b) - examRound(a);
      // Same exam round: show TOPIK II before TOPIK I.
      return (a.level === 'TOPIK II' ? 0 : 1) - (b.level === 'TOPIK II' ? 0 : 1);
    }
    return examRound(a) - examRound(b);
  });

  return (
    <div className="space-y-5">
      <StickyHeader>
        <div>
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Reading practice</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Short passages with immediate answer review.</p>
        </div>
        <LevelTabs value={level} onChange={setLevel} counts={levelCounts} />
      </StickyHeader>

      {orderedReadings.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No {level} reading tests yet.</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Add passages with level: &#39;{level}&#39; to src/data/reading.js and they will appear here.
          </p>
        </Card>
      ) : (
      <div className="grid gap-3 md:grid-cols-2 sm:gap-4">
        {orderedReadings.map((reading) => {
          const done = isReadingCompleted(reading.id);
          return (
          <PaperTestCard
            key={reading.id}
            id={`reading-${reading.id}`}
            to={`/reading/${reading.id}?level=${encodeURIComponent(level)}`}
            test={reading}
            icon={FileText}
            kindLabel="Reading"
            done={done}
            onToggleDone={() => dispatch({ type: done ? 'uncomplete-reading' : 'complete-reading', id: reading.id })}
          />
          );
        })}
      </div>
      )}
    </div>
  );
}
