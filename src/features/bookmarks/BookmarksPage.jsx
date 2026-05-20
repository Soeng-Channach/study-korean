import GrammarCard from '../../components/learning/GrammarCard';
import EmptyState from '../../components/ui/EmptyState';
import { useLearning } from '../../context/LearningContext';
import { grammarLessons } from '../../data/grammar';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function BookmarksPage() {
  usePageMeta('Bookmarks', 'Review saved TOPIK II grammar points offline.');
  const { state } = useLearning();
  const bookmarkedLessons = grammarLessons.filter((lesson) => state.bookmarkedGrammarIds.includes(lesson.id));

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Bookmarked grammar</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Keep your hardest grammar points within reach.</p>
      </div>
      {bookmarkedLessons.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {bookmarkedLessons.map((lesson) => <GrammarCard key={lesson.id} lesson={lesson} />)}
        </div>
      ) : (
        <EmptyState title="No bookmarks yet" message="Save grammar lessons you want to revisit from the grammar page." />
      )}
    </div>
  );
}
