import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpenCheck, Clock3, Layers3, Search, SlidersHorizontal, Sparkles, Star, X } from 'lucide-react';
import VocabExampleBlock from '../../components/learning/VocabExampleBlock';
import VocabMeaningRow from '../../components/learning/VocabMeaningRow';
import VocabSectionTabs from '../../components/learning/VocabSectionTabs';
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
import { getVocabularyExample } from '../../lib/vocabularyExamples';
import { summarizeVocabReviews, VOCAB_REVIEW_STAGES } from '../../lib/spacedRepetition';

// There are thousands of vocabulary words; rendering every card at once freezes
// the page. Render a page at a time and grow the window as the user scrolls.
const PAGE_SIZE = 48;
const TOPIK_I_QUIZ_SIZE = 30;
const NON_TOPIC_TAGS = new Set(['topik-i', 'noun', 'verb', 'adjective', 'adverb']);

export default function VocabularyPage() {
  usePageMeta('Vocabulary', 'Review TOPIK I and TOPIK II vocabulary and start offline quizzes.');
  const { state, isVocabBookmarked, dispatch, getVocabMeaning, getVocabReviewStatus } = useLearning();
  const [searchParams] = useSearchParams();
  const paramLevel = searchParams.get('level');
  const [level, setLevel] = useState(() =>
    paramLevel === 'TOPIK I' || paramLevel === 'TOPIK II' ? paramLevel : 'TOPIK I'
  );
  const [query, setQuery] = useState(() => searchParams.get('q') || '');
  const [posFilter, setPosFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [reviewFilter, setReviewFilter] = useState('all');

  // Sync with the global search when it deep-links here (e.g. /vocabulary?q=환경).
  useEffect(() => {
    const q = searchParams.get('q');
    const l = searchParams.get('level');
    if (q !== null) setQuery(q);
    if (l === 'TOPIK I' || l === 'TOPIK II') setLevel(l);
  }, [searchParams]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  // Review-stage and topic panels are collapsed by default so the sticky header
  // stays short enough to leave room for the word list on every screen size.
  const [showFilters, setShowFilters] = useState(false);
  const activeFilterCount =
    (posFilter !== 'all' ? 1 : 0) + (showSavedOnly ? 1 : 0) + (tagFilter !== 'all' ? 1 : 0) + (reviewFilter !== 'all' ? 1 : 0);
  const savedCount = (state.bookmarkedVocabIds || []).length;

  const levelCounts = useMemo(() => countByLevel(vocabulary), []);

  const levelWords = useMemo(() => vocabulary.filter((w) => levelOf(w) === level), [level]);

  const partsOfSpeech = useMemo(() => {
    const set = new Set(levelWords.map((w) => w.partOfSpeech).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [levelWords]);

  const topicTags = useMemo(() => {
    const counts = new Map();
    levelWords.forEach((word) => {
      (word.tags || []).forEach((tag) => {
        if (!tag || NON_TOPIC_TAGS.has(tag)) return;
        counts.set(tag, (counts.get(tag) || 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, level === 'TOPIK I' ? 12 : 8);
  }, [level, levelWords]);

  const selectLevel = (next) => {
    setLevel(next);
    setPosFilter('all');
    setTagFilter('all');
    setReviewFilter('all');
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const savedIds = state.bookmarkedVocabIds || [];
    return levelWords.filter((word) => {
      if (showSavedOnly && !savedIds.includes(word.id)) return false;
      if (posFilter !== 'all' && word.partOfSpeech !== posFilter) return false;
      if (tagFilter !== 'all' && !(word.tags || []).includes(tagFilter)) return false;
      if (reviewFilter !== 'all') {
        const review = getVocabReviewStatus(word);
        if (reviewFilter === 'due' && !(review.due && review.stage !== 'new')) return false;
        else if (reviewFilter === 'weak' && !(review.wrongAnswers > 0 && review.stage !== 'mastered')) return false;
        else if (reviewFilter !== 'due' && reviewFilter !== 'weak' && review.stage !== reviewFilter) return false;
      }
      if (!q) return true;
      const meaning = getVocabMeaning(word);
      const example = getVocabularyExample(word);
      return (
        word.word.toLowerCase().includes(q) ||
        word.meaning.toLowerCase().includes(q) ||
        (word.meaningKm && word.meaningKm.includes(q)) ||
        (meaning && meaning.toLowerCase().includes(q)) ||
        (!example.placeholder && example.example && example.example.toLowerCase().includes(q)) ||
        (example.exampleMeaning && example.exampleMeaning.toLowerCase().includes(q)) ||
        (example.exampleMeaningKm && example.exampleMeaningKm.includes(q))
      );
    });
  }, [
    levelWords,
    query,
    posFilter,
    tagFilter,
    reviewFilter,
    showSavedOnly,
    state.bookmarkedVocabIds,
    getVocabMeaning,
    getVocabReviewStatus
  ]);

  // Only render a growing window of the filtered list so the page stays responsive.
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Start over from the top whenever the filters change the result set.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [level, query, posFilter, tagFilter, reviewFilter, showSavedOnly]);

  const levelReviewSummary = useMemo(
    () => summarizeVocabReviews(levelWords, state.vocabularyStats),
    [levelWords, state.vocabularyStats]
  );

  const quizParams = useMemo(() => {
    const params = new URLSearchParams({ level });
    if (posFilter !== 'all') params.set('pos', posFilter);
    if (tagFilter !== 'all') params.set('tag', tagFilter);
    if (level === 'TOPIK I') params.set('limit', String(TOPIK_I_QUIZ_SIZE));
    return params.toString();
  }, [level, posFilter, tagFilter]);

  const reviewQuizParams = useMemo(() => {
    const params = new URLSearchParams({ level, mode: 'review' });
    if (posFilter !== 'all') params.set('pos', posFilter);
    if (tagFilter !== 'all') params.set('tag', tagFilter);
    if (level === 'TOPIK I') params.set('limit', String(TOPIK_I_QUIZ_SIZE));
    return params.toString();
  }, [level, posFilter, tagFilter]);

  // Auto-load the next page as the sentinel scrolls into view.
  const sentinelRef = useRef(null);
  useEffect(() => {
    if (!hasMore) return undefined;
    const el = sentinelRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: '600px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, visibleCount, filtered.length]);

  return (
    <div className="space-y-5">
      <StickyHeader>
        <VocabSectionTabs className="mb-3" />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Vocabulary</h2>
            <p className="mt-2 hidden text-sm text-slate-600 dark:text-slate-300 sm:block">
              Review key words and test recognition with a randomized quiz.
            </p>
          </div>
          <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-2 sm:flex sm:flex-wrap">
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
            <Link to={`/vocabulary/quiz?${reviewQuizParams}`} className="min-w-0">
              <Button className="w-full whitespace-nowrap px-3 sm:w-auto" variant="secondary" icon={Clock3} disabled={levelReviewSummary.due === 0 && levelReviewSummary.weak === 0}>
                Review due
              </Button>
            </Link>
            <Link to={`/vocabulary/quiz?${quizParams}`} className="min-w-0">
              <Button className="w-full whitespace-nowrap px-3 sm:w-auto" icon={Sparkles} disabled={levelWords.length === 0}>Start quiz</Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="shrink-0">
            <LevelTabs value={level} onChange={selectLevel} counts={levelCounts} />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Korean, English, Khmer, or example..."
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
            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              aria-expanded={showFilters}
              aria-controls="vocab-filter-panels"
              className={
                showFilters || activeFilterCount > 0
                  ? 'inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm dark:bg-white dark:text-slate-950'
                  : 'inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:text-brand-100'
              }
            >
              <SlidersHorizontal size={14} aria-hidden="true" />
              Filters
              {activeFilterCount > 0 ? (
                <span className="rounded-full bg-white/25 px-1.5 text-xs dark:bg-slate-950/15">{activeFilterCount}</span>
              ) : null}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {/* The level tab already shows the total, so the count appears only when the list is narrowed. */}
          {query.trim() || activeFilterCount > 0 ? (
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {filtered.length} of {levelWords.length} words
              {activeFilterCount > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setPosFilter('all');
                    setTagFilter('all');
                    setShowSavedOnly(false);
                    setReviewFilter('all');
                  }}
                  className="ml-2 font-semibold text-brand-600 underline-offset-2 hover:underline dark:text-brand-100"
                >
                  Clear filters
                </button>
              ) : null}
            </p>
          ) : null}

          {showFilters ? (
            <div id="vocab-filter-panels" className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <Layers3 size={14} /> Word type
                </p>
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
                    Saved only
                  </button>
                  {partsOfSpeech.map((pos) => {
                    const active = posFilter === pos;
                    return (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => setPosFilter(pos)}
                        aria-pressed={active}
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
                </div>
              </div>
              {level === 'TOPIK I' ? (
                <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      <Clock3 size={14} /> Review focus
                    </p>
                    <Link
                      to={`/vocabulary/quiz?${reviewQuizParams}`}
                      className="text-xs font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-100 dark:hover:text-brand-50"
                    >
                      Review due
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      ['all', 'All', levelWords.length],
                      ['due', 'Due', levelReviewSummary.due],
                      ['weak', 'Weak', levelReviewSummary.weak],
                      ['new', 'New', levelReviewSummary.new],
                      ['learning', 'Learning', levelReviewSummary.learning],
                      ['review', 'Review', levelReviewSummary.review],
                      ['strong', 'Strong', levelReviewSummary.strong],
                      ['mastered', 'Mastered', levelReviewSummary.mastered]
                    ].map(([key, label, count]) => {
                      const active = reviewFilter === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setReviewFilter(key)}
                          className={
                            active
                              ? 'rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-sm'
                              : 'rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 transition hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100 dark:hover:bg-brand-500/20'
                          }
                        >
                          {label} <span className="opacity-75">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {topicTags.length > 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      <BookOpenCheck size={14} /> Topic sets
                    </p>
                    <Link
                      to={`/vocabulary/quiz?${quizParams}`}
                      className="text-xs font-semibold text-coral-600 transition hover:text-coral-700 dark:text-coral-100 dark:hover:text-coral-50"
                    >
                      Quiz this set
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setTagFilter('all')}
                      className={
                        tagFilter === 'all'
                          ? 'rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-sm dark:bg-white dark:text-slate-950'
                          : 'rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                      }
                    >
                      All topics
                    </button>
                    {topicTags.map(([tag, count]) => {
                      const active = tagFilter === tag;
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setTagFilter(tag)}
                          className={
                            active
                              ? 'rounded-full bg-coral-500 px-3 py-1 text-xs font-semibold capitalize text-white shadow-sm'
                              : 'rounded-full border border-coral-200 bg-coral-50 px-3 py-1 text-xs font-semibold capitalize text-coral-700 transition hover:bg-coral-100 dark:border-coral-500/30 dark:bg-coral-500/10 dark:text-coral-100 dark:hover:bg-coral-500/20'
                          }
                        >
                          {tag} <span className="opacity-75">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
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
        <>
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((word) => {
            const review = getVocabReviewStatus(word);
            const reviewStage = VOCAB_REVIEW_STAGES[review.stage] || VOCAB_REVIEW_STAGES.new;
            const bookmarked = isVocabBookmarked(word.id);
            return (
              <Card key={word.id} className="transition hover:-translate-y-0.5 hover:shadow-soft">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="blue">{word.level}</Badge>
                    <Badge>{word.partOfSpeech}</Badge>
                    {review.stage && review.stage !== 'new' ? <Badge tone={reviewStage.tone}>{reviewStage.label}</Badge> : null}
                    {review.due && review.stage !== 'new' ? <Badge tone="rose">Due</Badge> : null}
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
                <div className="mt-3 rounded-xl bg-gradient-to-br from-brand-50 via-white to-indigo-50/80 p-3 ring-1 ring-brand-100 dark:from-brand-500/10 dark:via-slate-900 dark:to-indigo-500/10 dark:ring-brand-500/20 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">{word.word}</h3>
                    <SpeakButton
                      text={word.word}
                      size={16}
                      className="inline-flex items-center justify-center rounded-full bg-white p-1.5 text-brand-600 shadow-sm ring-1 ring-brand-100 transition hover:bg-brand-600 hover:text-white active:scale-95 dark:bg-slate-800 dark:text-brand-100 dark:ring-brand-500/30"
                      label={`Play pronunciation of ${word.word}`}
                    />
                    <VocabMeaningRow word={word} />
                  </div>
                </div>
                <VocabExampleBlock word={word} compact />
              </Card>
            );
          })}
        </div>
        {hasMore ? (
          <div ref={sentinelRef} className="flex justify-center pt-1">
            <Button
              variant="secondary"
              onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length))}
            >
              Load more ({filtered.length - visibleCount} remaining)
            </Button>
          </div>
        ) : null}
        </>
      )}
    </div>
  );
}
