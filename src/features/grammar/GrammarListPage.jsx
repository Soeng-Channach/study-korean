import GrammarCard from '../../components/learning/GrammarCard';
import { grammarLessons } from '../../data/grammar';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function GrammarListPage() {
  usePageMeta('Grammar', 'Learn essential TOPIK II grammar patterns with examples and bookmarks.');

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Grammar learning</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Study patterns by category, bookmark the tricky ones, and mark lessons complete.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {grammarLessons.map((lesson) => (
          <GrammarCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
