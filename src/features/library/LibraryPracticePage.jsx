import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Clock, KeyRound, Play, RotateCcw, Send } from 'lucide-react';
import PdfViewer from '../../components/library/PdfViewer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { getPdf, getPracticeState, setPracticeState } from '../../lib/db';
import { usePageMeta } from '../../hooks/usePageMeta';

function parseAnswerKey(text) {
  if (!text) return [];
  return Array.from(String(text).matchAll(/[1-4]/g)).map((match) => Number(match[0]));
}

function formatDuration(seconds) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const remaining = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
}

const DEFAULT_QUESTIONS = 50;
const DEFAULT_DURATION = 70;

export default function LibraryPracticePage() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const [totalQuestions, setTotalQuestions] = useState(DEFAULT_QUESTIONS);
  const [durationMinutes, setDurationMinutes] = useState(DEFAULT_DURATION);
  const [answerKeyInput, setAnswerKeyInput] = useState('');
  const [keyOpen, setKeyOpen] = useState(false);

  const [answers, setAnswers] = useState({});
  const [running, setRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const [result, setResult] = useState(null);

  usePageMeta(entry?.name ? `Practice · ${entry.name}` : 'Practice', 'Practice with a stored PDF.');

  // Load PDF blob + persisted practice state
  useEffect(() => {
    let blobUrl = null;
    let cancelled = false;
    (async () => {
      const record = await getPdf(id);
      if (cancelled) return;
      if (record?.blob) {
        blobUrl = URL.createObjectURL(record.blob);
        setEntry(record);
        setUrl(blobUrl);
      }
      const saved = await getPracticeState(id);
      if (saved && !cancelled) {
        setTotalQuestions(saved.totalQuestions || DEFAULT_QUESTIONS);
        setDurationMinutes(saved.durationMinutes || DEFAULT_DURATION);
        setAnswerKeyInput(saved.answerKey || '');
        if (saved.lastResult) setResult(saved.lastResult);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [id]);

  const handleSubmit = useCallback(
    (reason = 'manual') => {
      const key = parseAnswerKey(answerKeyInput);
      const givenCount = Object.keys(answers).length;
      const wrong = [];
      let correct = 0;
      const maxIndex = Math.min(key.length, totalQuestions);
      for (let i = 0; i < maxIndex; i += 1) {
        const expected = key[i];
        const given = answers[i + 1];
        if (given === expected) {
          correct += 1;
        } else {
          wrong.push({ question: i + 1, expected, given: given ?? null });
        }
      }
      const newResult = {
        total: maxIndex || totalQuestions,
        keyEntered: key.length,
        givenCount,
        correct,
        wrong,
        score: maxIndex > 0 ? Math.round((correct / maxIndex) * 100) : null,
        completedAt: Date.now(),
        reason
      };
      setResult(newResult);
      setRunning(false);
      setRemainingSeconds(null);
      setPracticeState(id, {
        totalQuestions,
        durationMinutes,
        answerKey: answerKeyInput,
        lastResult: newResult
      });
    },
    [id, answers, answerKeyInput, totalQuestions, durationMinutes]
  );

  // Countdown
  useEffect(() => {
    if (!running || remainingSeconds == null) return undefined;
    if (remainingSeconds <= 0) {
      handleSubmit('timeout');
      return undefined;
    }
    const interval = window.setInterval(() => {
      setRemainingSeconds((value) => (value == null ? null : Math.max(0, value - 1)));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running, remainingSeconds, handleSubmit]);

  function handleStart() {
    setAnswers({});
    setResult(null);
    setRunning(true);
    setRemainingSeconds(durationMinutes * 60);
    setPracticeState(id, {
      totalQuestions,
      durationMinutes,
      answerKey: answerKeyInput,
      lastResult: null
    });
  }

  function selectAnswer(question, option) {
    if (result) return;
    setAnswers((prev) => {
      const next = { ...prev };
      if (next[question] === option) {
        delete next[question];
      } else {
        next[question] = option;
      }
      return next;
    });
  }

  function resetAttempt() {
    setAnswers({});
    setResult(null);
    setRunning(false);
    setRemainingSeconds(null);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">Loading…</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <EmptyState
        title="PDF not found"
        message="This PDF is not in your library anymore. Pick another from the list."
      />
    );
  }

  const keyDigits = parseAnswerKey(answerKeyInput);
  const answeredCount = Object.keys(answers).length;
  const isUrgent = running && remainingSeconds != null && remainingSeconds < 60;
  const questionNumbers = Array.from({ length: totalQuestions }, (_, index) => index + 1);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          to={`/library/${entry.id}`}
          className="group inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200 dark:bg-slate-900 dark:text-brand-100 dark:ring-slate-700 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Back
        </Link>
        <h2 className="min-w-0 flex-1 truncate text-sm font-bold text-slate-950 dark:text-white sm:text-base">
          {entry.name}
        </h2>
        {running ? (
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 font-mono text-base font-black tabular-nums shadow-sm ${
              isUrgent
                ? 'border-coral-500 bg-coral-50 text-coral-700 dark:border-coral-400 dark:bg-coral-500/25 dark:text-white'
                : 'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/25 dark:text-white'
            } ${isUrgent ? 'animate-pulse' : ''}`}
          >
            <Clock size={14} aria-hidden="true" />
            {formatDuration(remainingSeconds)}
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
        <div className="h-[60vh] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:h-[calc(100vh-12rem)]">
          <PdfViewer blob={entry.blob} />
        </div>

        <div className="space-y-3">
          <Card>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">Session</h3>
              {result ? (
                <button
                  type="button"
                  onClick={resetAttempt}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-coral-600 dark:text-slate-400 dark:hover:text-coral-100"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              ) : null}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <label className="block">
                <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Questions
                </span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={totalQuestions}
                  disabled={running}
                  onChange={(event) => setTotalQuestions(Math.max(1, Math.min(100, Number(event.target.value) || 1)))}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </label>
              <label className="block">
                <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Minutes
                </span>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={durationMinutes}
                  disabled={running}
                  onChange={(event) => setDurationMinutes(Math.max(1, Math.min(180, Number(event.target.value) || 1)))}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => setKeyOpen((open) => !open)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-100"
            >
              <KeyRound size={12} />
              Answer key
              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {keyDigits.length} / {totalQuestions}
              </span>
              {keyOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            {keyOpen ? (
              <div className="mt-2">
                <textarea
                  value={answerKeyInput}
                  onChange={(event) => setAnswerKeyInput(event.target.value)}
                  placeholder="Paste or type the answer key, e.g. 1,1,4,4,1,3,2,1,2,4,2,1,1,2,1,2,3,1,1,4 …"
                  rows={3}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-mono text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
                <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                  Only digits 1–4 are read; any commas, spaces, or other characters are ignored.
                </p>
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              {!running && !result ? (
                <Button icon={Play} onClick={handleStart} className="flex-1">
                  Start session
                </Button>
              ) : null}
              {running ? (
                <Button icon={Send} onClick={() => handleSubmit('manual')} className="flex-1">
                  Submit answers
                </Button>
              ) : null}
              {result ? (
                <Button icon={Play} onClick={handleStart} className="flex-1">
                  Try again
                </Button>
              ) : null}
            </div>
          </Card>

          {result ? (
            <Card>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                  {result.score != null ? `Score: ${result.score}%` : 'Submitted'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {result.correct} / {result.total} correct
                  {result.reason === 'timeout' ? ' · time ran out' : ''}
                </p>
              </div>
              {result.keyEntered === 0 ? (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  No answer key entered, so nothing was graded. Your selections are highlighted below.
                </p>
              ) : null}
              {result.wrong.length > 0 ? (
                <details className="mt-3 group">
                  <summary className="cursor-pointer text-xs font-semibold text-coral-700 group-open:mb-2 dark:text-coral-100">
                    {result.wrong.length} incorrect
                  </summary>
                  <ul className="space-y-1 text-xs">
                    {result.wrong.map((item) => (
                      <li key={item.question} className="flex items-center gap-2 rounded-md bg-coral-50 px-2 py-1 dark:bg-coral-500/10">
                        <span className="font-bold text-slate-900 dark:text-white">Q{item.question}</span>
                        <span className="text-slate-500 dark:text-slate-400">your</span>
                        <span className="rounded bg-white px-1.5 py-0.5 font-bold text-coral-700 dark:bg-slate-900 dark:text-coral-100">
                          {item.given ?? '—'}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">expected</span>
                        <span className="rounded bg-white px-1.5 py-0.5 font-bold text-mint-700 dark:bg-slate-900 dark:text-mint-100">
                          {item.expected}
                        </span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </Card>
          ) : null}

          <Card>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">Answers</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {answeredCount} / {totalQuestions}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {questionNumbers.map((number) => {
                const userPick = answers[number];
                const expected = result ? keyDigits[number - 1] : null;
                return (
                  <div key={number} className="flex items-center gap-1.5">
                    <span className="w-7 shrink-0 text-right text-xs font-bold text-slate-500 dark:text-slate-400">
                      {number}.
                    </span>
                    <div className="grid flex-1 grid-cols-4 gap-1">
                      {[1, 2, 3, 4].map((option) => {
                        const selected = userPick === option;
                        const isExpected = expected === option;
                        const isWrongPick = result && selected && expected != null && expected !== option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => selectAnswer(number, option)}
                            disabled={!!result}
                            className={`h-8 rounded-md text-xs font-bold transition disabled:cursor-default ${
                              selected && !result
                                ? 'bg-brand-600 text-white shadow-sm'
                                : isWrongPick
                                  ? 'bg-coral-500 text-white'
                                  : isExpected && result
                                    ? 'bg-mint-500 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
