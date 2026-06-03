import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Sparkles, Star, X } from 'lucide-react';
import VocabMeaningRow from '../../components/learning/VocabMeaningRow';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import SpeakButton from '../../components/ui/SpeakButton';
import { useLearning } from '../../context/LearningContext';
import { vocabulary } from '../../data/vocabulary';
import { usePageMeta } from '../../hooks/usePageMeta';
import LevelTabs from '../../components/ui/LevelTabs';
import StickyHeader from '../../components/ui/StickyHeader';
import { countByLevel, levelOf } from '../../lib/levels';

export default function VocabularyPage() {
  usePageMeta('Vocabulary', 'Review TOPIK I and TOPIK II vocabulary and start offline quizzes.');
  const { state, isVocabBookmarked, dispatch, getVocabMeaning } = useLearning();
  const [searchParams] = useSearchParams();
  const paramLevel = searchParams.get('level');
  const [level, setLevel] = useState(() =>
    paramLevel === 'TOPIK I' || paramLevel === 'TOPIK II' ? paramLevel : 'TOPIK I'
  );
  const [query, setQuery] = useState(() => searchParams.get('q') || '');
  const [posFilter, setPosFilter] = useState('all');

  // Sync with the global search when it deep-links here (e.g. /vocabulary?q=환경).
  useEffect(() => {
    const q = searchParams.get('q');
    const l = searchParams.get('level');
    if (q !== null) setQuery(q);
    if (l === 'TOPIK I' || l === 'TOPIK II') setLevel(l);
  }, [searchParams]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const savedCount = (state.bookmarkedVocabIds || []).length;

  const levelCounts = useMemo(() => countByLevel(vocabulary), []);

  const levelWords = useMemo(() => vocabulary.filter((w) => levelOf(w) === level), [level]);

  const partsOfSpeech = useMemo(() => {
    const set = new Set(levelWords.map((w) => w.partOfSpeech).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [levelWords]);

  const selectLevel = (next) => {
    setLevel(next);
    setPosFilter('all');
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const savedIds = state.bookmarkedVocabIds || [];
    return levelWords.filter((word) => {
      if (showSavedOnly && !savedIds.includes(word.id)) return false;
      if (posFilter !== 'all' && word.partOfSpeech !== posFilter) return false;
      if (!q) return true;
      const meaning = getVocabMeaning(word);
      return (
        word.word.toLowerCase().includes(q) ||
        word.meaning.toLowerCase().includes(q) ||
        (meaning && meaning.toLowerCase().includes(q)) ||
        (word.example && word.example.toLowerCase().includes(q))
      );
    });
  }, [levelWords, query, posFilter, showSavedOnly, state.bookmarkedVocabIds, getVocabMeaning]);

  return (
    <div className="space-y-5">
      <StickyHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Vocabulary</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Review key words and test recognition with a randomized quiz.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/bookmarks"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700 ring-1 ring-amber-200 transition hover:bg-amber-200 dark:bg-amber-500/15 dark:text-amber-100 dark:ring-amber-500/30 dark:hover:bg-amber-500/25"
            >
              <Star size={14} fill="currentColor" />
              Saved
              <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-100">
                {savedCount}
              </span>
            </Link>
            <Link to={`/vocabulary/quiz?level=${encodeURIComponent(level)}`}>
              <Button icon={Sparkles} disabled={levelWords.length === 0}>Start quiz</Button>
            </Link>
          </div>
        </div>
        <LevelTabs value={level} onChange={selectLevel} counts={levelCounts} />

        <div className="space-y-3">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Korean, meaning, or example..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowSavedOnly((v) => !v)}
              className={
                showSavedOnly
                  ? 'inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm'
                  : 'inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100 dark:hover:bg-amber-500/20'
              }
              aria-pressed={showSavedOnly}
            >
              <Star size={12} fill="currentColor" />
              Saved
            </button>
            {partsOfSpeech.map((pos) => {
              const active = posFilter === pos;
              return (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setPosFilter(pos)}
                  className={
                    active
                      ? 'rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold capitalize text-white shadow-sm'
                      : 'rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold capitalize text-slate-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:text-brand-100'
                  }
                >
                  {pos}
                </button>
              );
            })}
            <span className="ml-auto self-center text-xs font-semibold text-slate-500 dark:text-slate-400">
              {filtered.length} of {levelWords.length}
            </span>
          </div>
        </div>
      </StickyHeader>

      {filtered.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {levelWords.length === 0
              ? `No ${level} words yet.`
              : showSavedOnly && savedCount === 0
                ? 'No saved words yet.'
                : 'No words match your filter.'}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {levelWords.length === 0
              ? `Add words with level: '${level}' to src/data/vocabulary.js and they will appear here.`
              : showSavedOnly && savedCount === 0
                ? 'Tap the star on any word to save it for quick review.'
                : 'Try clearing the search or selecting another category.'}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((word) => {
            const mastered = state.vocabularyStats.masteredWordIds.includes(word.id);
            const bookmarked = isVocabBookmarked(word.id);
            return (
              <Card key={word.id} className="transition hover:-translate-y-0.5 hover:shadow-soft">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="blue">{word.level}</Badge>
                    <Badge>{word.partOfSpeech}</Badge>
                    {mastered ? <Badge tone="green">Mastered</Badge> : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'toggle-vocab-bookmark', id: word.id })}
                    className={
                      bookmarked
                        ? 'shrink-0 rounded-lg p-1.5 text-amber-500 transition hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10'
                        : 'shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-amber-500 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-amber-300'
                    }
                    aria-label={bookmarked ? 'Remove saved word' : 'Save word'}
                    title={bookmarked ? 'Remove saved word' : 'Save word'}
                  >
                    <Star size={18} fill={bookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="mt-3 rounded-xl border-2 border-coral-500/80 bg-gradient-to-br from-coral-100/60 via-white to-white p-4 shadow-[0_4px_18px_-8px_rgba(244,63,94,0.4)] dark:from-coral-500/10 dark:via-slate-900 dark:to-slate-900">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white">{word.word}</h3>
                    <SpeakButton
                      text={word.word}
                      size={16}
                      className="inline-flex items-center justify-center rounded-full p-1.5 text-coral-600 transition hover:bg-coral-100 hover:text-coral-700 active:scale-95 dark:text-coral-100 dark:hover:bg-coral-500/15"
                      label={`Play pronunciation of ${word.word}`}
                    />
                    <VocabMeaningRow word={word} />
                  </div>
                </div>
                <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/60">
                  <div className="flex items-start gap-2">
                    <p className="flex-1 text-sm text-slate-800 dark:text-slate-100">{word.example}</p>
                    <SpeakButton text={word.example} size={14} label="Play example sentence" />
                  </div>
                  <div className="mt-1 flex items-start gap-2">
                    <p className="flex-1 text-xs text-slate-500 dark:text-slate-400">{word.exampleMeaning}</p>
                    <SpeakButton text={word.exampleMeaning} lang="en-US" size={12} label="Play English translation" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
