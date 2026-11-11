import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardPaste,
  Clock,
  Eye,
  EyeOff,
  ListOrdered,
  Pause,
  Play,
  RotateCcw,
  Trash2
} from 'lucide-react';
import Bilingual from '../../components/ui/Bilingual';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useConfirm } from '../../components/ui/ConfirmDialog';
import { useLearning } from '../../context/LearningContext';
import { countCharacters, politeEndings, WRITING_MINUTES, writingSets } from '../../data/writing';
import WritingChart from './WritingChart';
import { q53Form, q54Form } from '../../data/writingGuide';
import { usePageMeta } from '../../hooks/usePageMeta';

const KM = 'text-violet-700 dark:text-violet-300';
const TOTAL_SECONDS = WRITING_MINUTES * 60;

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}

function fieldsOf(question) {
  return question.type === 'blank' ? question.blanks.map((blank) => `${question.number}-${blank.key}`) : [String(question.number)];
}

function PassageWithBlanks({ text }) {
  return (
    <p className="whitespace-pre-line">
      {text.split(/(\( [㉠㉡] \))/).map((part, index) =>
        /^\( [㉠㉡] \)$/.test(part) ? (
          <span
            key={index}
            className="mx-0.5 inline-block rounded-md bg-emerald-100 px-2 font-bold text-emerald-800 ring-1 ring-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-100 dark:ring-emerald-500/40"
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </p>
  );
}

// Shows the topic inside single quotes in bold colour so it stands out.
function QuotedTopic({ text }) {
  return text.split(/('[^']+')/).map((part, index) =>
    part.startsWith("'") && part.endsWith("'") && part.length > 2 ? (
      <strong key={index} className="font-bold text-red-600 dark:text-red-400">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function ChartPanel({ chart }) {
  // An original exam image replaces the drawn charts; if it fails to load, the drawn ones show.
  const [imageFailed, setImageFailed] = useState(false);
  if (chart.image && !imageFailed) {
    return (
      <figure className="mt-3 overflow-hidden rounded-xl bg-white p-2 ring-1 ring-slate-200 dark:ring-slate-700 sm:p-3">
        <img
          src={chart.image}
          alt={`${chart.title} (${chart.blocks.flatMap((block) => block.rows.map((row) => row.join(' '))).join(', ')})`}
          className="mx-auto block w-full max-w-2xl"
          onError={() => setImageFailed(true)}
        />
      </figure>
    );
  }
  return (
    <div className="mt-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:ring-slate-700 sm:p-4">
      <p className="text-center text-base font-bold text-slate-950 dark:text-white">{chart.title}</p>
      {chart.source ? (
        <p className="mt-0.5 text-center text-xs text-slate-500 dark:text-slate-400">조사 기관: {chart.source}</p>
      ) : null}
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {chart.blocks.map((block) => (
          <div key={block.heading} className={`${block.wide ? 'sm:col-span-2 ' : ''}overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700`}>
            <p className="bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-100">
              {block.heading}
            </p>
            {block.figure ? (
              <WritingChart figure={block.figure} heading={block.heading} />
            ) : (
              <dl className="divide-y divide-slate-100 dark:divide-slate-800">
                {block.rows.map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-3 px-3 py-1.5 text-sm">
                    <dt className="shrink-0 text-slate-500 dark:text-slate-400">{label}</dt>
                    <dd className="text-right font-bold text-slate-950 dark:text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        ))}
      </div>
      {chart.causes?.length ? (
        <div className="mt-2.5 rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">원인</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-slate-800 dark:text-slate-100">
            {chart.causes.map((cause) => (
              <li key={cause}>{cause}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {chart.outlook ? (
        <div className="mt-2.5 rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">전망</p>
          <p className="mt-0.5 text-slate-800 dark:text-slate-100">{chart.outlook}</p>
        </div>
      ) : null}
    </div>
  );
}

// A collapsible writing form: numbered steps, each with a sentence frame to
// fill in, plus a button that copies the frames into the answer box.
function WritingForm({ title, steps, hasAnswer, onUse, hint }) {
  return (
    <details open className="group mt-3 rounded-xl bg-emerald-50/60 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:ring-emerald-500/30">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3.5 py-2.5 text-sm font-bold text-emerald-900 dark:text-emerald-100 [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2">
          <ListOrdered size={16} aria-hidden="true" /> {title}
        </span>
        <ChevronRight size={16} className="transition group-open:rotate-90" aria-hidden="true" />
      </summary>
      <div className="px-3.5 pb-3.5">
        <ol className="space-y-2.5">
          {steps.map((step, index) => (
            <li key={step.id} className="rounded-lg bg-white px-3 py-2.5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] text-white">
                  {index + 1}
                </span>
                {step.label}
              </p>
              {step.asks ? (
                <p lang="ko" className="mt-1 text-sm font-semibold leading-6 text-red-600 dark:text-red-400">
                  {step.asks}
                </p>
              ) : null}
              <p lang="ko" className="mt-1.5 rounded-md bg-slate-50 px-2.5 py-1.5 text-[15px] leading-7 text-slate-900 dark:bg-slate-800/70 dark:text-slate-100">
                {step.frame}
              </p>
              <div className="mt-1.5">
                <Bilingual
                  en={step.en}
                  km={step.km}
                  className="text-xs leading-5 text-slate-600 dark:text-slate-300"
                  kmClassName="text-xs leading-6 text-violet-700 dark:text-violet-300"
                />
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onUse(steps.map((step) => step.frame).join('\n'))}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            <ClipboardPaste size={15} aria-hidden="true" />
            {hasAnswer ? 'Add the form below my answer' : 'Put the form in my answer'}
          </button>
          <span className="text-xs text-slate-600 dark:text-slate-300">{hint}</span>
        </div>
      </div>
    </details>
  );
}

// The sentence-by-sentence form for question 53, fitted to what this chart has.
function Q53Form({ chart, hasAnswer, onUse }) {
  const steps = q53Form
    .filter((step) => {
      if (step.when === 'detail') return chart.blocks.length > 1;
      if (step.when === 'causes') return chart.causes?.length > 0;
      if (step.when === 'outlook') return Boolean(chart.outlook);
      return true;
    })
    .map((step) => (step.id === 'intro' && !chart.source ? { ...step, frame: step.frameNoSource } : step));

  return (
    <WritingForm
      title="Writing form · 글의 구조"
      steps={steps}
      hasAnswer={hasAnswer}
      onUse={onUse}
      hint="Fill every ___ and delete the choice you do not use. About 50자 a sentence reaches 200–300자."
    />
  );
}

// The paragraph-by-paragraph form for question 54, with each guiding question
// shown on the paragraph that must answer it.
function Q54Form({ question, hasAnswer, onUse }) {
  const steps = q54Form.map((step) =>
    step.question === undefined ? step : { ...step, asks: question.questions[step.question] }
  );

  return (
    <WritingForm
      title="Writing form · 글의 구조"
      steps={steps}
      hasAnswer={hasAnswer}
      onUse={onUse}
      hint="One paragraph per step. The frames are only openers: add your own sentences to reach 600–700자."
    />
  );
}

function LengthMeter({ count, min, max }) {
  const tone = count > max ? 'bg-coral-500' : count >= min ? 'bg-emerald-500' : 'bg-amber-400';
  const label = count > max ? `${count - max} over the limit` : count >= min ? 'Length is good' : `${min - count} more to reach ${min}`;
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className={count > max ? 'text-coral-600 dark:text-coral-100' : count >= min ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-500 dark:text-slate-400'}>
          {label}
        </span>
        <span className="tabular-nums text-slate-700 dark:text-slate-200">
          <span className="text-base font-black">{count}</span> / {min}–{max}자
        </span>
      </div>
      <div className="relative mt-1 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className={`h-full rounded-full transition-all ${tone}`} style={{ width: `${Math.min(100, (count / max) * 100)}%` }} />
        <span className="absolute inset-y-0 w-0.5 bg-slate-400/70" style={{ left: `${(min / max) * 100}%` }} aria-hidden="true" />
      </div>
    </div>
  );
}

function CheckRow({ ok, children }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          ok ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-200'
        }`}
      >
        {ok ? <Check size={12} strokeWidth={3} aria-hidden="true" /> : <AlertTriangle size={11} aria-hidden="true" />}
      </span>
      <span className="text-slate-700 dark:text-slate-200">{children}</span>
    </li>
  );
}

function ManualCheck({ id, checked, onChange, children }) {
  return (
    <li>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-emerald-600"
        />
        <span>{children}</span>
      </label>
    </li>
  );
}

function LongAnswer({ question, value, onChange, revealed, manual, setManual }) {
  const count = countCharacters(value);
  const polite = politeEndings(value).slice(0, 6);
  const manualItems =
    question.type === 'chart'
      ? ['I used every number and year from the chart.', 'I wrote the causes (and the forecast, if there is one).', 'I did not write a title or my own opinion.']
      : [...question.questions.map((item, index) => `I answered question ${index + 1}: ${item}`), 'My last sentence closes the essay.'];

  return (
    <>
      <label htmlFor={`answer-${question.number}`} className="mt-4 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Your answer
      </label>
      <textarea
        id={`answer-${question.number}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={question.type === 'chart' ? 8 : 16}
        lang="ko"
        spellCheck={false}
        placeholder="여기에 답을 쓰십시오. (-다 로 끝나는 문어체)"
        className="mt-1.5 w-full resize-y rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-base leading-8 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      />
      <LengthMeter count={count} min={question.min} max={question.max} />

      {revealed ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:ring-slate-700 sm:p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Self-check</p>
            <ul className="mt-2 space-y-1.5">
              <CheckRow ok={count >= question.min && count <= question.max}>
                Length: {count}자 (target {question.min}–{question.max})
              </CheckRow>
              <CheckRow ok={polite.length === 0}>
                {polite.length === 0
                  ? 'Written style: no -요 or -습니다 endings found.'
                  : `Written style: change these endings to -다: ${polite.join(', ')}`}
              </CheckRow>
              {manualItems.map((item, index) => (
                <ManualCheck
                  key={item}
                  id={`manual-${question.number}-${index}`}
                  checked={Boolean(manual[`${question.number}-${index}`])}
                  onChange={(checked) => setManual((current) => ({ ...current, [`${question.number}-${index}`]: checked }))}
                >
                  {item}
                </ManualCheck>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:ring-emerald-500/30 sm:p-4">
            <p className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
              Model answer <span className="normal-case tracking-normal">{countCharacters(question.model)}자</span>
            </p>
            <p className="mt-2 whitespace-pre-line text-base leading-8 text-slate-900 dark:text-slate-100">{question.model}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

function BlankAnswer({ question, values, onChange, revealed }) {
  return (
    <div className="mt-4 space-y-3">
      {question.blanks.map((blank) => {
        const field = `${question.number}-${blank.key}`;
        return (
          <div key={blank.key}>
            <label htmlFor={`answer-${field}`} className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100">
                {blank.key}
              </span>
              Your answer
            </label>
            <input
              id={`answer-${field}`}
              type="text"
              value={values[field] || ''}
              onChange={(event) => onChange(field, event.target.value)}
              lang="ko"
              spellCheck={false}
              autoComplete="off"
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-950 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            {revealed ? (
              <div className="mt-2 rounded-xl bg-emerald-50 px-3 py-2.5 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:ring-emerald-500/30">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">Model answer</p>
                <p className="mt-0.5 text-base font-bold text-slate-950 dark:text-white">{blank.answers.join('  /  ')}</p>
                <div className="mt-1.5 border-t border-emerald-200 pt-1.5 dark:border-emerald-500/30">
                  <Bilingual
                    en={blank.tip}
                    km={blank.tipKm}
                    className="text-sm leading-6 text-slate-700 dark:text-slate-200"
                    kmClassName={`text-sm leading-7 ${KM}`}
                  />
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function WritingPracticePage() {
  const { id } = useParams();
  const set = writingSets.find((item) => item.id === id);
  const { state, dispatch, isHydrated, isWritingCompleted } = useLearning();
  const confirm = useConfirm();

  const [active, setActive] = useState(0);
  const [values, setValues] = useState({});
  const [revealed, setRevealed] = useState({});
  const [manual, setManual] = useState({});
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [running, setRunning] = useState(false);
  const loadedFor = useRef(null);
  const saveTimers = useRef({});

  usePageMeta(set?.title || 'Writing practice', 'TOPIK II writing practice with model answers.');

  // Load saved drafts once the stored state is ready (and when the set changes).
  useEffect(() => {
    if (!set || !isHydrated || loadedFor.current === set.id) return;
    loadedFor.current = set.id;
    const prefix = `${set.id}:`;
    const stored = {};
    for (const [key, text] of Object.entries(state.writingDrafts || {})) {
      if (key.startsWith(prefix)) stored[key.slice(prefix.length)] = text;
    }
    setValues(stored);
    setRevealed({});
    setManual({});
    setActive(0);
    setSeconds(TOTAL_SECONDS);
    setRunning(false);
  }, [set, isHydrated, state.writingDrafts]);

  useEffect(() => {
    if (!running || seconds <= 0) return undefined;
    const interval = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [running, seconds]);

  // Show each question from its top when switching tabs.
  useEffect(() => {
    document.querySelector('main')?.scrollTo({ top: 0 });
  }, [active]);

  // Save pending drafts when leaving the page.
  useEffect(() => {
    const timers = saveTimers.current;
    return () => Object.values(timers).forEach((timer) => timer.flush());
  }, []);

  const answered = useMemo(
    () => (set ? set.questions.map((question) => fieldsOf(question).some((field) => (values[field] || '').trim())) : []),
    [set, values]
  );

  if (!set) return <Navigate to="/writing" replace />;

  const question = set.questions[active];
  const completed = isWritingCompleted(set.id);
  const timeUp = seconds === 0;

  function change(field, text) {
    setValues((current) => ({ ...current, [field]: text }));
    const key = `${set.id}:${field}`;
    const existing = saveTimers.current[field];
    if (existing) window.clearTimeout(existing.handle);
    const flush = () => {
      window.clearTimeout(saveTimers.current[field]?.handle);
      delete saveTimers.current[field];
      dispatch({ type: 'save-writing-draft', key, text });
    };
    saveTimers.current[field] = { handle: window.setTimeout(flush, 700), flush };
  }

  async function clearAll() {
    const ok = await confirm({
      title: 'Clear your answers?',
      message: 'This deletes everything you wrote for this set. It cannot be undone.',
      confirmText: 'Clear answers',
      cancelText: 'Keep them',
      tone: 'danger'
    });
    if (!ok) return;
    Object.values(saveTimers.current).forEach((timer) => window.clearTimeout(timer.handle));
    saveTimers.current = {};
    dispatch({ type: 'clear-writing-drafts', id: set.id });
    setValues({});
    setRevealed({});
    setManual({});
    setSeconds(TOTAL_SECONDS);
    setRunning(false);
  }

  const isRevealed = Boolean(revealed[question.number]);

  return (
    <article className="mx-auto max-w-3xl space-y-4">
      {/* Sticky bar: back, title, timer, question tabs */}
      <div className="sticky -top-4 z-40 -mx-3 -mt-4 border-b border-slate-200 bg-white/95 px-3 pb-2 pt-2 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:-top-5 sm:-mx-6 sm:-mt-5 sm:px-6 lg:mx-0 lg:mt-0 lg:rounded-b-lg lg:border-x lg:px-4">
        <div className="flex items-center gap-2">
          <Link
            to="/writing"
            aria-label="Back to writing"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm transition hover:bg-emerald-700"
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </Link>
          <p className="min-w-0 flex-1 truncate text-sm font-bold text-slate-950 dark:text-white">{set.title}</p>
          <button
            type="button"
            onClick={() => {
              if (timeUp) setSeconds(TOTAL_SECONDS);
              setRunning((value) => (timeUp ? true : !value));
            }}
            aria-label={timeUp ? 'Restart timer' : running ? 'Pause timer' : 'Start timer'}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 transition ${
              timeUp
                ? 'border-coral-500 bg-coral-50 text-coral-700 dark:bg-coral-500/20 dark:text-white'
                : running
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-500/20 dark:text-white'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {timeUp ? <RotateCcw size={13} aria-hidden="true" /> : running ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
            <Clock size={13} aria-hidden="true" />
            <span className="font-mono text-sm font-black tabular-nums leading-none">{formatTime(seconds)}</span>
          </button>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800" role="tablist" aria-label="Questions">
          {set.questions.map((item, index) => (
            <button
              key={item.number}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`relative rounded-md py-1.5 text-sm font-bold transition ${
                active === index
                  ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-950 dark:text-emerald-300'
                  : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {item.number}
              <span className="ml-1 text-[10px] font-semibold text-slate-400">{item.points}점</span>
              {answered[index] ? (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-label="answered" />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {timeUp ? (
        <p className="rounded-xl border border-coral-300 bg-coral-50 px-3.5 py-2.5 text-sm font-semibold text-coral-700 dark:border-coral-500/40 dark:bg-coral-500/10 dark:text-coral-100">
          Time is up. In the real test you would stop here. You can keep writing and then check your answers.
        </p>
      ) : null}

      <Card>
        <div className="rounded-md bg-slate-200 px-3.5 py-2.5 text-sm font-bold leading-6 text-slate-950 dark:bg-slate-700 dark:text-white sm:px-5 sm:py-3.5 sm:text-base sm:leading-7">
          {question.number}. {question.instruction}
        </div>

        {question.type === 'blank' ? (
          <div className="mt-3 rounded-xl bg-slate-50 px-3.5 py-3 text-base leading-8 text-slate-950 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-100 dark:ring-slate-700 sm:px-5 sm:py-4 sm:text-lg">
            {question.title ? <p className="mb-1 text-center font-bold">{question.title}</p> : null}
            <PassageWithBlanks text={question.passage} />
          </div>
        ) : null}

        {question.type === 'chart' ? (
          <>
            <p className="mt-3 text-base leading-7 text-slate-800 dark:text-slate-100"><QuotedTopic text={question.prompt} /></p>
            <ChartPanel chart={question.chart} />
            <Q53Form
              chart={question.chart}
              hasAnswer={Boolean(values['53'])}
              onUse={(text) => change('53', values['53'] ? `${values['53']}\n${text}` : text)}
            />
          </>
        ) : null}

        {question.type === 'essay' ? (
          <>
            <div className="mt-3 rounded-xl bg-slate-50 px-3.5 py-3 text-base leading-8 text-slate-950 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-100 dark:ring-slate-700 sm:px-5 sm:py-4">
              <p>
                <QuotedTopic text={question.intro} />
              </p>
              <ul className="mt-2 list-disc space-y-0.5 pl-5 font-semibold">
                {question.questions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Q54Form
              question={question}
              hasAnswer={Boolean(values['54'])}
              onUse={(text) => change('54', values['54'] ? `${values['54']}\n${text}` : text)}
            />
          </>
        ) : null}

        {question.type === 'blank' ? (
          <BlankAnswer question={question} values={values} onChange={change} revealed={isRevealed} />
        ) : (
          <LongAnswer
            question={question}
            value={values[String(question.number)] || ''}
            onChange={(text) => change(String(question.number), text)}
            revealed={isRevealed}
            manual={manual}
            setManual={setManual}
          />
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button onClick={() => setRevealed((current) => ({ ...current, [question.number]: !isRevealed }))}>
            {isRevealed ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
            {isRevealed ? 'Hide model answer' : 'Check my answer'}
          </Button>
          <span className="text-xs text-slate-500 dark:text-slate-400">Your writing is saved on this device as you type.</span>
        </div>
      </Card>

      <nav aria-label="Question navigation" className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          disabled={active === 0}
          onClick={() => setActive(active - 1)}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ChevronLeft size={16} aria-hidden="true" /> Previous
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-coral-50 hover:text-coral-600 dark:text-slate-400 dark:hover:bg-coral-500/10"
          >
            <Trash2 size={13} aria-hidden="true" /> Clear answers
          </button>
          <button
            type="button"
            role="checkbox"
            aria-checked={completed}
            onClick={() => dispatch({ type: completed ? 'uncomplete-writing' : 'complete-writing', id: set.id })}
            className={`group inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold transition-all duration-200 ${
              completed
                ? 'bg-gradient-to-r from-emerald-500 to-mint-500 text-white shadow-md shadow-emerald-500/30'
                : 'bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:text-emerald-700 hover:ring-emerald-300 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700'
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                completed ? 'bg-white/25 text-white' : 'border-2 border-slate-300 text-transparent group-hover:border-emerald-500 group-hover:text-emerald-500 dark:border-slate-600'
              }`}
            >
              <Check size={14} strokeWidth={3} aria-hidden="true" />
            </span>
            {completed ? 'Completed' : 'Mark complete'}
          </button>
        </div>
        <button
          type="button"
          disabled={active === set.questions.length - 1}
          onClick={() => setActive(active + 1)}
          className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-40"
        >
          Next <ChevronRight size={16} aria-hidden="true" />
        </button>
      </nav>
    </article>
  );
}
