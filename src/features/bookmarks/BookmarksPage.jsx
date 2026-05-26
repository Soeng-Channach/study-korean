import { Star } from 'lucide-react';
import GrammarCard from '../../components/learning/GrammarCard';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import SpeakButton from '../../components/ui/SpeakButton';
import { useLearning } from '../../context/LearningContext';
import { grammarLessons } from '../../data/grammar';
import { vocabulary } from '../../data/vocabulary';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function BookmarksPage() {
  usePageMeta('Saved', 'Review saved TOPIK II grammar and vocabulary offline.');
  const { state, dispatch } = useLearning();
  const bookmarkedLessons = grammarLessons.filter((lesson) => state.bookmarkedGrammarIds.includes(lesson.id));
  const savedVocabIds = state.bookmarkedVocabIds || [];
  const bookmarkedWords = vocabulary.filter((word) => savedVocabIds.includes(word.id));
  const totalSaved = bookmarkedLessons.length + bookmarkedWords.length;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-100">
          <Star size={18} fill="currentColor" aria-hidden="true" />
          <p className="text-sm font-semibold">Your saved items</p>
        </div>
        <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Saved</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {totalSaved > 0
            ? `${bookmarkedLessons.length} grammar · ${bookmarkedWords.length} vocab starred for quick review.`
            : 'Tap the star on any grammar card or vocab word to save it here for quick review.'}
        </p>
      </div>

      <section>
        <h3 className="mb-3 text-lg font-bold text-slate-950 dark:text-white">
          Grammar <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">· {bookmarkedLessons.length}</span>
        </h3>
        {bookmarkedLessons.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {bookmarkedLessons.map((lesson) => <GrammarCard key={lesson.id} lesson={lesson} />)}
          </div>
        ) : (
          <EmptyState title="No saved lessons yet" message="Tap the star icon on any grammar card to save it here." />
        )}
      </section>

      <section>
        <h3 className="mb-3 text-lg font-bold text-slate-950 dark:text-white">
          Vocabulary <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">· {bookmarkedWords.length}</span>
        </h3>
        {bookmarkedWords.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {bookmarkedWords.map((word) => (
              <Card key={word.id} className="transition hover:-translate-y-0.5 hover:shadow-soft">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="blue">{word.level}</Badge>
                    <Badge>{word.partOfSpeech}</Badge>
                  </div>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'toggle-vocab-bookmark', id: word.id })}
                    className="shrink-0 rounded-lg p-1.5 text-amber-500 transition hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10"
                    aria-label="Remove saved word"
                    title="Remove saved word"
                  >
                    <Star size={18} fill="currentColor" />
                  </button>
                </div>
                <div className="mt-3 rounded-xl border-2 border-coral-500/80 bg-gradient-to-br from-coral-100/60 via-white to-white p-4 shadow-[0_4px_18px_-8px_rgba(244,63,94,0.4)] dark:from-coral-500/10 dark:via-slate-900 dark:to-slate-900">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="text-2xl font-bold text-slate-950 dark:text-white">{word.word}</h4>
                    <SpeakButton
                      text={word.word}
                      size={16}
                      className="inline-flex items-center justify-center rounded-full p-1.5 text-coral-600 transition hover:bg-coral-100 hover:text-coral-700 active:scale-95 dark:text-coral-100 dark:hover:bg-coral-500/15"
                      label={`Play pronunciation of ${word.word}`}
                    />
                    {word.hanja ? (
                      <span className="text-sm text-slate-400 dark:text-slate-500">{word.hanja}</span>
                    ) : null}
                    <span className="text-sm font-semibold text-coral-700 dark:text-coral-100">
                      — {word.meaning}
                    </span>
                  </div>
                </div>
                <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/60">
                  <div className="flex items-start gap-2">
                    <p className="flex-1 text-sm text-slate-800 dark:text-slate-100">{word.example}</p>
                    <SpeakButton text={word.example} size={14} label="Play example sentence" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{word.exampleMeaning}</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState title="No saved words yet" message="Tap the star on any vocab card to save it here." />
        )}
      </section>
    </div>
  );
}
