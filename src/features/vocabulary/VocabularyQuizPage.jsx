import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Flame, RotateCcw, Sparkles, Target } from 'lucide-react';
import QuizOption from '../../components/learning/QuizOption';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import SpeakButton from '../../components/ui/SpeakButton';
import { useLearning } from '../../context/LearningContext';
import { vocabulary } from '../../data/vocabulary';
import { usePageMeta } from '../../hooks/usePageMeta';

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(word, pool) {
  const distractorPool = pool.filter((item) => item.id !== word.id && item.meaning !== word.meaning);
  const distractors = shuffle(distractorPool).slice(0, 3).map((item) => item.meaning);
  return shuffle([word.meaning, ...distractors]);
}

export default function VocabularyQuizPage() {
  const [searchParams] = useSearchParams();
  const level = searchParams.get('level');
  usePageMeta(
    level ? `${level} Vocabulary Quiz` : 'Vocabulary Quiz',
    `Offline ${level || 'TOPIK'} vocabulary quiz.`
  );
  const { dispatch } = useLearning();
  const levelWords = useMemo(
    () => (level ? vocabulary.filter((w) => w.level === level) : vocabulary),
    [level]
  );
  const [order, setOrder] = useState(() => shuffle(levelWords.map((_, i) => i)));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const finished = index >= order.length;
  const word = finished ? null : levelWords[order[index]];
  const options = useMemo(() => (word ? buildOptions(word, levelWords) : []), [word, levelWords]);
  const correctIndex = word ? options.indexOf(word.meaning) : -1;
  const isLast = index + 1 === order.length;

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
    dispatch({ type: 'record-vocab-answer', wordId: word.id, correct: isCorrect });
  }, [selected, revealed, word, correctIndex, dispatch]);

  const next = useCallback(() => {
    setSelected(null);
    setRevealed(false);
    setIndex((i) => i + 1);
  }, []);

  const restart = useCallback(() => {
    setOrder(shuffle(levelWords.map((_, i) => i)));
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setStreak(0);
    setBestStreak(0);
  }, [levelWords]);

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

  if (levelWords.length === 0) {
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <Link to="/vocabulary" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-100">
          <ArrowLeft size={16} /> Back to vocabulary
        </Link>
        <Card className="text-center">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">No {level} words yet</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add {level} vocabulary to start a quiz for this level.
          </p>
        </Card>
      </div>
    );
  }

  if (finished) {
    const total = order.length;
    const accuracy = total ? Math.round((correctCount / total) * 100) : 0;
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
              <p className="text-2xl font-bold text-mint-700 dark:text-mint-100">{accuracy}%</p>
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

  const progressPct = ((index + (revealed ? 1 : 0)) / order.length) * 100;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center justify-between gap-3">
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

      <Card>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-brand-100 px-2.5 py-1 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
            {index + 1} / {order.length}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-mint-100 px-2.5 py-1 text-mint-700 dark:bg-mint-500/15 dark:text-mint-100">
            <Target size={12} /> {correctCount} correct
          </span>
          {streak >= 2 ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-coral-100 px-2.5 py-1 text-coral-700 dark:bg-coral-500/15 dark:text-coral-100">
              <Flame size={12} /> {streak} streak
            </span>
          ) : null}
        </div>
        <ProgressBar value={progressPct} />

        <div className="mt-6 rounded-2xl border-2 border-coral-500/70 bg-gradient-to-br from-coral-100/60 via-white to-white p-6 text-center shadow-[0_4px_18px_-8px_rgba(244,63,94,0.4)] dark:from-coral-500/10 dark:via-slate-900 dark:to-slate-900">
          <p className="text-[11px] font-bold uppercase tracking-wider text-coral-700 dark:text-coral-100">
            What does this word mean?
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <h2 className="text-4xl font-bold text-slate-950 dark:text-white sm:text-5xl">{word.word}</h2>
            <SpeakButton
              text={word.word}
              size={22}
              className="inline-flex items-center justify-center rounded-full bg-white/80 p-2.5 text-coral-700 shadow-sm transition hover:bg-white hover:text-coral-800 active:scale-95 dark:bg-slate-800/70 dark:text-coral-100 dark:hover:bg-slate-800"
              label={`Play pronunciation of ${word.word}`}
            />
          </div>
          <p className="mt-3 inline-block rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
            {word.partOfSpeech}
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {options.map((option, optionIndex) => (
            <div key={option} className="flex items-stretch gap-2">
              <span className="hidden w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:flex">
                {optionIndex + 1}
              </span>
              <div className="flex-1">
                <QuizOption
                  option={option}
                  selected={selected === optionIndex}
                  correct={correctIndex === optionIndex}
                  revealed={revealed}
                  onClick={() => {
                    if (!revealed) setSelected(optionIndex);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {revealed ? (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Example</p>
            <div className="mt-1 flex items-start gap-2">
              <p className="flex-1 text-base font-semibold text-slate-900 dark:text-white">{word.example}</p>
              <SpeakButton text={word.example} size={14} label="Play example sentence" />
            </div>
            <div className="mt-1 flex items-start gap-2">
              <p className="flex-1 text-sm text-slate-600 dark:text-slate-300">{word.exampleMeaning}</p>
              <SpeakButton text={word.exampleMeaning} lang="en-US" size={12} label="Play English translation" />
            </div>
          </div>
        ) : null}

        <div className="mt-5 flex gap-3">
          <Button className="flex-1" disabled={selected === null || revealed} onClick={submit}>
            Check answer
          </Button>
          <Button className="flex-1" variant="secondary" disabled={!revealed} onClick={next}>
            {isLast ? 'Finish' : 'Next'}
            {!isLast ? <ArrowRight size={16} /> : null}
          </Button>
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
          Tip: press 1–4 to select, Enter to {revealed ? 'continue' : 'check'}.
        </p>
      </Card>
    </div>
  );
}
