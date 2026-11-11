import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { BookOpenText, Check, ChevronLeft, ChevronRight, EyeOff, ListChecks, RotateCcw, Sparkles } from 'lucide-react';
import QuizOption from '../../components/learning/QuizOption';
import BackLink from '../../components/ui/BackLink';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import SpeakButton from '../../components/ui/SpeakButton';
import { useLearning } from '../../context/LearningContext';
import { usePreferences } from '../../context/PreferencesContext';
import { planDays } from '../../data/thirtyDayPlan';
import { usePageMeta } from '../../hooks/usePageMeta';
import { primaryMeaning, secondaryMeaning } from '../../lib/meaningLanguage';
import { sharesSense } from '../../lib/meaningOverlap';

const pad = (n) => String(n).padStart(2, '0');

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Three wrong meanings, taken from the same day first, never sharing a sense
// with the answer (so only one option is right).
function buildOptions(word, dayWords, nearbyWords) {
  const chosen = [word];
  for (const candidate of [...shuffle(dayWords), ...shuffle(nearbyWords)]) {
    if (chosen.length === 4) break;
    if (chosen.some((item) => item.word === candidate.word || sharesSense(item.meaning, candidate.meaning))) continue;
    chosen.push(candidate);
  }
  return shuffle(chosen);
}

function MeaningText({ word, language, className = '', inline = false }) {
  const main = primaryMeaning(word, language);
  const second = secondaryMeaning(word, language);
  return (
    <span className={className}>
      <span lang={language === 'km' ? 'km' : 'en'} className={language === 'km' ? 'text-violet-700 dark:text-violet-300' : undefined}>{main}</span>
      {second ? (
        <span lang="km" className={`${inline ? 'ml-2' : 'block'} text-sm font-normal text-violet-700 dark:text-violet-300`}>
          {inline ? <span className="mr-2 text-slate-300 dark:text-slate-600">·</span> : null}
          {second}
        </span>
      ) : null}
    </span>
  );
}

function WordRow({ word, index, known, onToggle, language, showExamples }) {
  const [toggled, setToggled] = useState(false);
  // "Show examples" opens every row; tapping a row flips it from that default.
  const open = showExamples ? !toggled : toggled;
  const setOpen = () => setToggled((value) => !value);
  return (
    <li
      className={`rounded-xl border px-3 py-2 transition sm:px-4 ${
        known
          ? 'border-mint-200 bg-mint-50/70 dark:border-mint-500/30 dark:bg-mint-500/10'
          : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <span className="mt-1.5 w-6 shrink-0 text-right text-xs font-bold tabular-nums text-slate-400">{pad(index + 1)}</span>
        <div className="min-w-0 flex-1">
          {/* Korean, English and Khmer on one line (wraps only when it must) */}
          <p className="flex flex-wrap items-center gap-x-1.5 leading-7">
            <span className="text-lg font-bold text-slate-950 dark:text-white">{word.word}</span>
            <SpeakButton text={word.word} size={14} label={`Play ${word.word}`} />
            <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">—</span>
            {language !== 'km' ? (
              <span lang="en" className="text-sm font-semibold text-slate-700 dark:text-slate-200">{word.meaning}</span>
            ) : null}
            {language === 'both' ? <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">·</span> : null}
            {language !== 'en' ? (
              <span lang="km" className="text-sm font-medium text-violet-700 dark:text-violet-300">{word.meaningKm}</span>
            ) : null}
          </p>
          {word.example ? (
            <button
              type="button"
              onClick={setOpen}
              aria-expanded={open}
              className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline dark:text-brand-100"
            >
              <BookOpenText size={12} aria-hidden="true" /> {open ? 'Hide example' : 'Example'}
            </button>
          ) : null}
          {open && word.example ? (
            <div className="mt-1.5 rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800/60">
              <div className="flex items-start gap-2">
                <p className="flex-1 font-semibold text-slate-900 dark:text-white">{word.example}</p>
                <SpeakButton text={word.example} size={13} label="Play example sentence" />
              </div>
              {language !== 'km' ? <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{word.exampleMeaning}</p> : null}
              {language !== 'en' ? (
                <p lang="km" className="mt-0.5 text-xs leading-6 text-violet-700 dark:text-violet-300">
                  {word.exampleMeaningKm}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={known}
          aria-label={known ? `Mark ${word.word} as not known` : `Mark ${word.word} as known`}
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
            known
              ? 'border-mint-500 bg-mint-500 text-white'
              : 'border-slate-300 text-slate-400 hover:border-mint-500 hover:text-mint-600 dark:border-slate-600'
          }`}
        >
          <Check size={11} strokeWidth={3} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

function DayQuiz({ day, words, nearbyWords, language, onFinish }) {
  const [round, setRound] = useState(() => shuffle(words));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState([]);
  const [done, setDone] = useState(false);

  const current = round[index];
  const options = useMemo(
    () => (current ? buildOptions(current, words, nearbyWords) : []),
    [current, words, nearbyWords]
  );
  const revealed = selected !== null;

  function choose(optionIndex) {
    if (revealed) return;
    setSelected(optionIndex);
    if (options[optionIndex].id !== current.id) setWrong((list) => [...list, current]);
  }

  function next() {
    if (index + 1 < round.length) {
      setIndex(index + 1);
      setSelected(null);
      return;
    }
    setDone(true);
    onFinish(round.length - wrong.length, round.length);
  }

  function restart(list) {
    setRound(shuffle(list));
    setIndex(0);
    setSelected(null);
    setWrong([]);
    setDone(false);
  }

  if (done) {
    const correct = round.length - wrong.length;
    return (
      <Card className="text-center">
        <Sparkles className="mx-auto text-amber-500" size={28} aria-hidden="true" />
        <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">Day {pad(day)} quiz</p>
        <p className="text-3xl font-black text-slate-950 dark:text-white">
          {correct} / {round.length}
        </p>
        {wrong.length ? (
          <div className="mx-auto mt-4 max-w-md text-left">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Review these words</p>
            <ul className="mt-2 space-y-1.5">
              {wrong.map((word) => (
                <li key={word.id} className="flex items-start justify-between gap-3 rounded-lg bg-coral-50 px-3 py-2 text-sm dark:bg-coral-500/10">
                  <span className="font-bold text-slate-950 dark:text-white">{word.word}</span>
                  <MeaningText word={word} language={language} className="text-right text-slate-700 dark:text-slate-200" />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-2 text-sm text-mint-700 dark:text-mint-100">Perfect score. Great work!</p>
        )}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {wrong.length ? <Button onClick={() => restart(wrong)}>Retry {wrong.length} wrong</Button> : null}
          <Button variant="secondary" onClick={() => restart(words)}>
            <RotateCcw size={15} aria-hidden="true" /> Restart quiz
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>
          Question {index + 1} / {round.length}
        </span>
        <span>{wrong.length} wrong</span>
      </div>
      <div className="mt-2">
        <ProgressBar value={Math.round((index / round.length) * 100)} size="sm" ariaLabel="Quiz progress" />
      </div>
      <div className="my-5 flex items-center justify-center gap-2">
        <p className="text-4xl font-black text-slate-950 dark:text-white">{current.word}</p>
        <SpeakButton text={current.word} size={18} label={`Play ${current.word}`} />
      </div>
      <p className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Choose the meaning</p>
      <div className="space-y-2">
        {options.map((option, optionIndex) => (
          <QuizOption
            key={option.id}
            index={optionIndex}
            option={<MeaningText word={option} language={language} inline />}
            selected={selected === optionIndex}
            correct={option.id === current.id}
            revealed={revealed}
            onClick={() => choose(optionIndex)}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Button disabled={!revealed} onClick={next}>
          {index + 1 < round.length ? 'Next' : 'See result'} <ChevronRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </Card>
  );
}

export default function PlanDayPage() {
  const { day: dayParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dayNumber = Number(dayParam);
  const day = planDays.find((item) => item.day === dayNumber);
  const { state, dispatch, isPlanDayCompleted, isPlanWordKnown } = useLearning();
  const { meaningLanguage } = usePreferences();
  const [hideKnown, setHideKnown] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const mode = searchParams.get('mode') === 'quiz' ? 'quiz' : 'words';

  usePageMeta(`Day ${pad(dayNumber)} · 30-Day Plan`, 'TOPIK II 30-day vocabulary plan.');

  useEffect(() => {
    document.querySelector('main')?.scrollTo({ top: 0 });
  }, [dayNumber, mode]);

  const nearbyWords = useMemo(
    () =>
      planDays
        .filter((item) => Math.abs(item.day - dayNumber) <= 2 && item.day !== dayNumber)
        .flatMap((item) => item.words),
    [dayNumber]
  );

  if (!day) return <Navigate to="/plan" replace />;

  const knownCount = day.words.filter((w) => isPlanWordKnown(w.id)).length;
  const completed = isPlanDayCompleted(day.day);
  const best = (state.planQuizBest || {})[day.day];
  const visibleWords = hideKnown ? day.words.filter((w) => !isPlanWordKnown(w.id)) : day.words;
  const setMode = (next) => setSearchParams(next === 'quiz' ? { mode: 'quiz' } : {});

  return (
    <article className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center justify-between gap-2">
        <BackLink to="/plan">30-Day Plan</BackLink>
      </div>

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-100">TOPIK II · 30-Day Plan</p>
            <h1 className="mt-0.5 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">
              Day {pad(day.day)} <span className="text-base font-semibold text-slate-500">· {day.words.length} words</span>
            </h1>
          </div>
          {/* Tick to mark the whole day complete */}
          <button
            type="button"
            role="checkbox"
            aria-checked={completed}
            onClick={() => dispatch({ type: completed ? 'uncomplete-plan-day' : 'complete-plan-day', id: day.day })}
            className={`group inline-flex shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
              completed
                ? 'bg-gradient-to-r from-emerald-500 to-mint-500 text-white shadow-md shadow-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/40'
                : 'bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:-translate-y-0.5 hover:text-emerald-700 hover:shadow-md hover:ring-emerald-300 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:text-emerald-200 dark:hover:ring-emerald-500/50'
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
                completed
                  ? 'bg-white/25 text-white'
                  : 'border-2 border-slate-300 text-transparent group-hover:border-emerald-500 group-hover:bg-emerald-50 group-hover:text-emerald-500 dark:border-slate-600 dark:group-hover:bg-emerald-500/10'
              }`}
            >
              <Check size={14} strokeWidth={3} aria-hidden="true" />
            </span>
            {completed ? 'Completed' : 'Mark complete'}
          </button>
        </div>
        <div className="mt-3">
          <ProgressBar
            value={Math.round((knownCount / day.words.length) * 100)}
            size="sm"
            ariaLabel={`${knownCount} of ${day.words.length} words known`}
            barClassName="bg-mint-500"
          />
          <p className="mt-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {knownCount}/{day.words.length} known
            {best ? ` · best quiz ${best.correct}/${best.total}` : ''}
          </p>
        </div>
        <div className="mt-3 inline-flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800" role="tablist" aria-label="Day view">
          {[
            ['words', 'Words', ListChecks],
            ['quiz', 'Quiz', Sparkles]
          ].map(([key, label, Icon]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={mode === key}
              onClick={() => setMode(key)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm font-semibold transition ${
                mode === key
                  ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-950 dark:text-brand-100'
                  : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              <Icon size={15} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>
      </Card>

      {mode === 'quiz' ? (
        <DayQuiz
          key={day.day}
          day={day.day}
          words={day.words}
          nearbyWords={nearbyWords}
          language={meaningLanguage}
          onFinish={(correct, total) => dispatch({ type: 'record-plan-quiz', day: day.day, correct, total })}
        />
      ) : (
        <>
          <div className="flex items-center justify-between gap-2">
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">Tap ✓ when you know a word.</p>
            <div className="ml-auto flex gap-1.5">
              <button
                type="button"
                onClick={() => setShowExamples((value) => !value)}
                aria-pressed={showExamples}
                className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
                  showExamples
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100'
                    : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                <BookOpenText size={13} aria-hidden="true" /> {showExamples ? 'Hide examples' : 'Show examples'}
              </button>
              <button
                type="button"
                onClick={() => setHideKnown((value) => !value)}
                aria-pressed={hideKnown}
                className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
                  hideKnown
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100'
                    : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                <EyeOff size={13} aria-hidden="true" /> Hide known
              </button>
            </div>
          </div>
          <ol className="space-y-1.5">
            {visibleWords.map((word) => (
              <WordRow
                key={word.id}
                word={word}
                index={day.words.indexOf(word)}
                known={isPlanWordKnown(word.id)}
                onToggle={() => dispatch({ type: 'toggle-plan-word', id: word.id })}
                language={meaningLanguage}
                showExamples={showExamples}
              />
            ))}
          </ol>
          {visibleWords.length === 0 ? (
            <p className="rounded-xl border border-dashed border-mint-300 p-6 text-center text-sm text-mint-700 dark:text-mint-100">
              You know every word of Day {pad(day.day)}. Take the quiz to check!
            </p>
          ) : null}
        </>
      )}

      {/* Day navigation at the bottom of the list */}
      <nav aria-label="Day navigation" className="flex items-center justify-between gap-2 pt-1">
        {day.day > 1 ? (
          <Link
            to={`/plan/${day.day - 1}`}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ChevronLeft size={16} aria-hidden="true" /> Day {pad(day.day - 1)}
          </Link>
        ) : (
          <span />
        )}
        {day.day < planDays.length ? (
          <Link
            to={`/plan/${day.day + 1}`}
            className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700"
          >
            Next: Day {pad(day.day + 1)} <ChevronRight size={16} aria-hidden="true" />
          </Link>
        ) : (
          <Link
            to="/plan"
            className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700"
          >
            Back to the plan <ChevronRight size={16} aria-hidden="true" />
          </Link>
        )}
      </nav>
    </article>
  );
}
