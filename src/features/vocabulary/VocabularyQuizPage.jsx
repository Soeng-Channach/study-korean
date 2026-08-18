import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Flame, RotateCcw, Sparkles } from 'lucide-react';
import QuizOption from '../../components/learning/QuizOption';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import SpeakButton from '../../components/ui/SpeakButton';
import { useLearning } from '../../context/LearningContext';
import { vocabulary } from '../../data/vocabulary';
import { usePageMeta } from '../../hooks/usePageMeta';
import { levelOf } from '../../lib/levels';
import { getVocabReview, reviewPriority } from '../../lib/spacedRepetition';

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(word, pool) {
  const distractors = Array.from(
    new Set(
      pool
        .filter((item) => item.id !== word.id && item.meaning !== word.meaning)
        .map((item) => item.meaning)
    )
  );
  return shuffle([word.meaning, ...shuffle(distractors).slice(0, 3)]);
}

function labelize(value) {
  if (!value) return '';
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default function VocabularyQuizPage() {
  const [searchParams] = useSearchParams();
  const level = searchParams.get('level');
  const pos = searchParams.get('pos');
  const tag = searchParams.get('tag');
  const mode = searchParams.get('mode');
  const rawLimit = Number(searchParams.get('limit'));
  const quizLimit = Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : null;
  const scopeParts = [level || 'TOPIK', mode === 'review' ? 'Review due' : null, labelize(tag), labelize(pos)].filter(Boolean);
  const scopeLabel = scopeParts.join(' / ');

  usePageMeta(
    scopeLabel ? `${scopeLabel} Vocabulary Quiz` : 'Vocabulary Quiz',
    `Offline ${scopeLabel || 'TOPIK'} vocabulary quiz.`
  );
  const { state, dispatch } = useLearning();
  const poolWords = useMemo(() => {
    const baseWords = vocabulary.filter((word) => {
      if (level && levelOf(word) !== level) return false;
      if (pos && word.partOfSpeech !== pos) return false;
      if (tag && !(word.tags || []).includes(tag)) return false;
      return true;
    });

    if (mode !== 'review') return baseWords;

    const reviewWords = baseWords.filter((word) => {
      const review = getVocabReview(word, state.vocabularyStats);
      return review.stage === 'learning' || review.wrongAnswers > 0 || (review.due && review.stage !== 'new');
    });
    const fallbackWords = reviewWords.length
      ? reviewWords
      : baseWords.filter((word) => getVocabReview(word, state.vocabularyStats).stage !== 'mastered');

    return fallbackWords
      .slice()
      .sort((a, b) => reviewPriority(a, state.vocabularyStats) - reviewPriority(b, state.vocabularyStats));
  }, [level, pos, tag, mode, state.vocabularyStats]);
  const quizSize = quizLimit ? Math.min(quizLimit, poolWords.length) : poolWords.length;
  const [order, setOrder] = useState(() => shuffle(poolWords.map((_, i) => i)).slice(0, quizSize));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const finished = index >= order.length;
  const word = finished ? null : poolWords[order[index]];
  const options = useMemo(() => (word ? buildOptions(word, poolWords) : []), [word, poolWords]);
  const correctIndex = word ? options.indexOf(word.meaning) : -1;
  const isLast = index + 1 === order.length;
  const answeredCount = index + (revealed ? 1 : 0);
  const progressPct = order.length ? (answeredCount / order.length) * 100 : 0;
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
  const deckLabel = mode === 'review' ? 'Review due' : tag ? labelize(tag) : pos ? labelize(pos) : level || 'All vocabulary';

  const submit = useCallback(() => {
    if (selected === null || revealed || !word) return;
    const isCorrect = selected === correctIndex;
    setRevealed(true);
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setStreak((s) => {
        const nextStreak = s + 1;
        setBestStreak((b) => Math.max(b, nextStreak));
        return nextStreak;
      });
    } else {
      setStreak(0);
    }
    dispatch({ type: 'record-vocab-answer', wordId: word.id, correct: isCorrect, answeredAt: Date.now() });
  }, [selected, revealed, word, correctIndex, dispatch]);

  const next = useCallback(() => {
    setSelected(null);
    setRevealed(false);
    setIndex((i) => i + 1);
  }, []);

  const restart = useCallback(() => {
    setOrder(shuffle(poolWords.map((_, i) => i)).slice(0, quizSize));
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setStreak(0);
    setBestStreak(0);
  }, [poolWords, quizSize]);

  useEffect(() => {
    restart();
  }, [restart]);

  useEffect(() => {
    function onKey(e) {
      if (e.key >= '1' && e.key <= '4') {
        const idx = Number(e.key) - 1;
        if (!revealed && idx < options.length) setSelected(idx);
      } else if (e.key === 'Enter') {
        if (revealed) next();
        else if (selected !== null) submit();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [options.length, revealed, selected, submit, next]);

  if (poolWords.length === 0) {
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <Link to="/vocabulary" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-100">
          <ArrowLeft size={16} /> Back to vocabulary
        </Link>
        <Card className="text-center">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">No words in this set</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try another level, topic, or part of speech to start a vocabulary quiz.
          </p>
        </Card>
      </div>
    );
  }

  if (finished) {
    const total = order.length;
    const finalAccuracy = total ? Math.round((correctCount / total) * 100) : 0;
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <Link to="/vocabulary" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-100">
          <ArrowLeft size={16} /> Back to vocabulary
        </Link>
        <Card className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-mint-500 to-brand-500 text-white shadow-lg shadow-brand-600/30">
            <Sparkles size={28} />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">Quiz complete!</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">You answered all {total} questions.</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-2xl font-bold text-slate-950 dark:text-white">{correctCount}/{total}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Correct</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-2xl font-bold text-mint-700 dark:text-mint-100">{finalAccuracy}%</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Accuracy</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-2xl font-bold text-coral-700 dark:text-coral-100">{bestStreak}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Best streak</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <Button onClick={restart} icon={RotateCcw}>Restart quiz</Button>
            <Link to="/vocabulary" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full">Back to vocabulary</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="sticky -top-5 z-30 -mx-4 -mt-5 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:mx-0 sm:mt-0 sm:rounded-lg sm:border sm:px-5 sm:py-3 sm:shadow-soft">
        <Link to="/vocabulary" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-100">
          <ArrowLeft size={16} /> Back to vocabulary
        </Link>
        <button
          type="button"
          onClick={restart}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-coral-600 dark:text-slate-400 dark:hover:text-coral-100"
        >
          <RotateCcw size={14} /> Restart
        </button>
      </div>

      <Card className="space-y-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-brand-100 px-2.5 py-1 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
                {index + 1} / {order.length}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {deckLabel}
              </span>
              {streak >= 2 ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-coral-100 px-2.5 py-1 text-coral-700 dark:bg-coral-500/15 dark:text-coral-100">
                  <Flame size={12} /> {streak} streak
                </span>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-2 text-right text-xs font-semibold sm:min-w-40">
              <div className="rounded-lg bg-mint-50 px-2.5 py-1 text-mint-700 dark:bg-mint-500/15 dark:text-mint-100">
                {correctCount} correct
              </div>
              <div className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {accuracy}%
              </div>
            </div>
          </div>
          <ProgressBar value={progressPct} />
        </div>

        <div className="rounded-xl border border-coral-200 bg-coral-50/60 px-4 py-5 text-center shadow-[0_12px_30px_-24px_rgba(244,63,94,0.9)] dark:border-coral-500/30 dark:bg-coral-500/10 sm:px-6">
          <div className="mx-auto inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-coral-700 shadow-sm dark:bg-slate-900 dark:text-coral-100">
            Choose the English meaning
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <h2 className="min-w-0 text-5xl font-bold leading-none text-slate-950 dark:text-white sm:text-6xl">{word.word}</h2>
            <SpeakButton
              text={word.word}
              size={22}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white p-2.5 text-coral-700 shadow-sm ring-1 ring-coral-100 transition hover:bg-coral-50 hover:text-coral-800 active:scale-95 dark:bg-slate-900 dark:text-coral-100 dark:ring-coral-500/20 dark:hover:bg-slate-800"
              label={`Play pronunciation of ${word.word}`}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-wide">
            <span className="rounded-full bg-white px-2.5 py-1 text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-700">
              {word.partOfSpeech}
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 text-coral-700 ring-1 ring-coral-100 dark:bg-slate-900 dark:text-coral-100 dark:ring-coral-500/20">
              {levelOf(word)}
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {options.map((option, optionIndex) => (
            <QuizOption
              key={`${option}-${optionIndex}`}
              option={option}
              index={optionIndex}
              selected={selected === optionIndex}
              correct={correctIndex === optionIndex}
              revealed={revealed}
              onClick={() => {
                if (!revealed) setSelected(optionIndex);
              }}
            />
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button className="w-full" disabled={selected === null || revealed} onClick={submit}>
            Check answer
          </Button>
          <Button className="w-full" variant="secondary" disabled={!revealed} onClick={next}>
            {isLast ? 'Finish' : 'Next'}
            {!isLast ? <ArrowRight size={16} /> : null}
          </Button>
        </div>
        <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
          Tip: press 1-4 to select, Enter to {revealed ? 'continue' : 'check'}.
        </p>
      </Card>
    </div>
  );
}
