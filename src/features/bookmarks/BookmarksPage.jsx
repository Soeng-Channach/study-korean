import { Star } from 'lucide-react';
import GrammarCard from '../../components/learning/GrammarCard';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { grammarLessons } from '../../data/grammar';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function BookmarksPage() {
  usePageMeta('Saved', 'Review saved TOPIK II grammar points offline.');
  const { state } = useLearning();
  const bookmarkedLessons = grammarLessons.filter((lesson) => state.bookmarkedGrammarIds.includes(lesson.id));

  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-100">
          <Star size={18} fill="currentColor" aria-hidden="true" />
          <p className="text-sm font-semibold">Your saved grammar</p>
        </div>
        <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Saved lessons</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {bookmarkedLessons.length > 0
            ? `${bookmarkedLessons.length} lesson${bookmarkedLessons.length === 1 ? '' : 's'} starred for quick review.`
            : 'Tap the star on any grammar card to save it for quick review.'}
        </p>
      </div>
      {bookmarkedLessons.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {bookmarkedLessons.map((lesson) => <GrammarCard key={lesson.id} lesson={lesson} />)}
        </div>
      ) : (
        <EmptyState title="No saved lessons yet" message="Tap the star icon on any grammar card to save it here for quick review." />
      )}
    </div>
  );
}
