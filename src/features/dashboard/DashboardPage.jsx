import { useMemo } from 'react';
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Clock3,
  Headphones,
  Languages,
  Newspaper,
  RotateCcw,
  Sparkles,
  Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { useConfirm } from '../../components/ui/ConfirmDialog';
import ProgressBar from '../../components/ui/ProgressBar';
import { useLearning } from '../../context/LearningContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { catalog } from '../../data/catalog';
import { currentStreak, DAILY_GOAL, longestStreak, pointsOn } from '../../lib/studyLog';

const pct = (done, total) => (total ? Math.round((done / total) * 100) : 0);

// Full class names so Tailwind keeps them.
const tones = {
  brand: { icon: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100', bar: 'bg-brand-600' },
  coral: { icon: 'bg-coral-100 text-coral-700 dark:bg-coral-500/15 dark:text-coral-100', bar: 'bg-coral-500' },
  mint: { icon: 'bg-mint-100 text-mint-700 dark:bg-mint-500/15 dark:text-mint-100', bar: 'bg-mint-500' },
  amber: { icon: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-100', bar: 'bg-amber-500' },
  violet: { icon: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-100', bar: 'bg-violet-500' }
};

function greetingFor(date) {
  const hour = date.getHours();
  if (hour < 5) return 'Late-night study';
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatAttemptDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value));
}

const heroButton =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

export default function DashboardPage() {
  usePageMeta('Dashboard', 'Track TOPIK I and TOPIK II grammar, reading, vocabulary, and mock test progress.');
  const { state, masteredWordCount, dispatch } = useLearning();
  const confirm = useConfirm();

  const now = useMemo(() => new Date(), []);
  const greeting = greetingFor(now);
  const today = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(now);

  // Due/weak counts come straight from the saved review records, so the
  // dashboard never has to import the multi-megabyte vocabulary dataset.
  const review = useMemo(() => {
    const entries = Object.values(state.vocabularyStats?.wordReview || {});
    const ts = now.getTime();
    let due = 0;
    let weak = 0;
    entries.forEach((entry) => {
      if (!entry) return;
      if (entry.stage !== 'new' && (entry.dueAt || 0) <= ts) due += 1;
      if ((entry.wrongAnswers || 0) > 0 && entry.stage !== 'mastered') weak += 1;
    });
    return { due, weak };
  }, [state.vocabularyStats, now]);

  const grammarDone = state.completedGrammarIds.length;
  const readingDone = state.completedReadingIds.length;
  const listeningDone = (state.completedListeningIds || []).length;
  const attempts = state.mockTestAttempts;
  const bestScore = attempts.length ? Math.max(...attempts.map((attempt) => attempt.score || 0)) : null;
  const savedCount = state.bookmarkedGrammarIds.length + (state.bookmarkedVocabIds || []).length;
  const studyLog = state.studyLog || {};
  const todayPoints = pointsOn(studyLog, now.getTime());
  const streak = currentStreak(studyLog, now.getTime());
  const bestStreak = longestStreak(studyLog);
  const goalMet = todayPoints >= DAILY_GOAL;
  const lessonsDone = grammarDone + readingDone + listeningDone;
  const lessonsTotal = catalog.grammar.total + catalog.reading.total + catalog.listening.total;
  const overall = pct(lessonsDone, lessonsTotal);
  const hasStarted = lessonsDone > 0 || attempts.length > 0 || (state.vocabularyStats?.totalAnswered || 0) > 0;

  async function handleReset() {
    const ok = await confirm({
      title: 'Reset all progress?',
      message:
        'This will clear all completions, saved items, vocabulary stats, and mock test attempts on this device. This cannot be undone.',
      confirmText: 'Reset progress',
      cancelText: 'Keep my progress',
      tone: 'danger'
    });
    if (ok) dispatch({ type: 'reset-progress' });
  }

  const sections = [
    {
      label: 'Vocabulary',
      path: '/vocabulary',
      icon: Languages,
      tone: 'coral',
      count: `${catalog.vocabulary.total} words`,
      done: masteredWordCount,
      total: catalog.vocabulary.total,
      verb: 'mastered'
    },
    {
      label: 'Grammar',
      path: '/grammar?level=TOPIK II',
      icon: BookOpen,
      tone: 'brand',
      count: `${catalog.grammar.total} lessons`,
      done: grammarDone,
      total: catalog.grammar.total,
      verb: 'completed'
    },
    {
      label: 'Reading',
      path: '/reading',
      icon: Newspaper,
      tone: 'mint',
      count: `${catalog.reading.total} passages`,
      done: readingDone,
      total: catalog.reading.total,
      verb: 'completed'
    },
    {
      label: 'Listening',
      path: '/listening',
      icon: Headphones,
      tone: 'amber',
      count: `${catalog.listening.total} tests`,
      done: listeningDone,
      total: catalog.listening.total,
      verb: 'completed'
    },
    {
      label: 'Tests',
      path: '/mock-tests',
      icon: ClipboardCheck,
      tone: 'violet',
      count: `${catalog.mockTests.total} tests`,
      done: attempts.length,
      total: null,
      verb: attempts.length === 1 ? 'attempt' : 'attempts',
      meta: bestScore !== null ? `best ${bestScore}%` : 'none taken yet'
    }
  ];

  const libraryRows = [
    { label: 'Grammar', counts: catalog.grammar.byLevel },
    { label: 'Vocabulary', counts: catalog.vocabulary.byLevel },
    { label: 'Reading', counts: catalog.reading.byLevel },
    { label: 'Listening', counts: catalog.listening.byLevel },
    { label: 'Mock tests', counts: catalog.mockTests.byLevel }
  ];

  const heroStats = [
    { label: 'Lessons', value: `${overall}%`, hint: `${lessonsDone} of ${lessonsTotal} done` },
    { label: 'Due', value: review.due, hint: review.weak ? `${review.weak} weak words` : 'words to review' },
    { label: 'Streak', value: `${streak}d`, hint: bestStreak > streak ? `best ${bestStreak} days` : 'days in a row' },
    { label: 'Tests', value: attempts.length, hint: bestScore !== null ? `best ${bestScore}%` : 'none taken yet' }
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-slate-950 px-5 py-6 text-white shadow-soft dark:ring-1 dark:ring-slate-800 sm:px-8 sm:py-7">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-coral-500/20 blur-3xl" />
          <span className="absolute -bottom-12 -left-4 select-none text-[11rem] font-black leading-none text-white/[0.04] sm:text-[14rem]">
            한
          </span>
        </div>
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-200 sm:text-sm">
              {greeting} · {today}
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl xl:text-4xl">
              {hasStarted ? 'Pick up where you left off.' : 'Build steady TOPIK skill, one focused session at a time.'}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
              {review.due > 0
                ? `${review.due} word${review.due === 1 ? '' : 's'} ${review.due === 1 ? 'is' : 'are'} due for review. A quick quiz now keeps them from slipping.`
                : 'Study grammar patterns, practice reading and listening, review vocabulary, and keep every bit of progress on this device.'}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {review.due > 0 ? (
                <Link
                  to="/vocabulary/quiz?mode=review&limit=30"
                  className={`${heroButton} bg-white text-slate-950 shadow-lg shadow-black/20 hover:bg-brand-50`}
                >
                  <Clock3 size={16} aria-hidden="true" />
                  Review {review.due} due word{review.due === 1 ? '' : 's'}
                </Link>
              ) : (
                <Link
                  to="/vocabulary"
                  className={`${heroButton} bg-white text-slate-950 shadow-lg shadow-black/20 hover:bg-brand-50`}
                >
                  <Sparkles size={16} aria-hidden="true" />
                  Start a vocabulary quiz
                </Link>
              )}
              <Link
                to="/mock-tests"
                className={`${heroButton} bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15`}
              >
                <ClipboardCheck size={16} aria-hidden="true" />
                Take a mock test
              </Link>
            </div>
            <div className="mt-5 max-w-sm">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={goalMet ? 'text-mint-100' : 'text-slate-300'}>
                  {goalMet ? 'Daily goal reached' : "Today's goal"}
                </span>
                <span className="tabular-nums text-slate-300">
                  {Math.min(todayPoints, DAILY_GOAL)} / {DAILY_GOAL} points
                </span>
              </div>
              <div
                className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Today's study goal"
                aria-valuemin={0}
                aria-valuemax={DAILY_GOAL}
                aria-valuenow={Math.min(todayPoints, DAILY_GOAL)}
              >
                <div
                  className={`h-full rounded-full transition-all ${goalMet ? 'bg-mint-500' : 'bg-brand-500'}`}
                  style={{ width: `${pct(Math.min(todayPoints, DAILY_GOAL), DAILY_GOAL)}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">
                1 point per quiz answer · 5 per grammar lesson · 10 per reading, listening or test
              </p>
            </div>
          </div>
          <dl className="grid shrink-0 grid-cols-4 gap-1.5 sm:gap-2 lg:grid-cols-2 lg:gap-2.5">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 rounded-xl bg-white/[0.07] px-2.5 py-2 ring-1 ring-white/10 sm:px-3.5 sm:py-2.5 lg:min-w-[7.5rem]"
              >
                <dt className="truncate text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:text-[11px]">
                  {stat.label}
                </dt>
                <dd className="mt-0.5 text-lg font-bold leading-tight tabular-nums sm:text-xl">{stat.value}</dd>
                <dd className="hidden text-[11px] text-slate-400 sm:block">{stat.hint}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="dashboard-sections">
        <h2 id="dashboard-sections" className="sr-only">
          Study sections
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-5">
          {sections.map((section) => {
            const Icon = section.icon;
            const tone = tones[section.tone];
            const percent = section.total ? pct(section.done, section.total) : null;
            return (
              <Link
                key={section.path}
                to={section.path}
                className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
              >
                <Card className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon}`}>
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600 dark:text-slate-600 dark:group-hover:text-brand-200"
                    />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-950 dark:text-white sm:text-lg">{section.label}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">{section.count}</p>
                  <div className="mt-auto pt-3">
                    {percent !== null ? (
                      <>
                        <ProgressBar value={percent} size="sm" barClassName={tone.bar} ariaLabel={`${section.label} progress`} />
                        <p className="mt-1.5 text-[11px] font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                          {section.done} {section.verb} · {percent}%
                        </p>
                      </>
                    ) : (
                      <p className="text-[11px] font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                        {section.done} {section.verb} · {section.meta}
                      </p>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Recent tests</h3>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Your latest mock test attempts.</p>
            </div>
            <Link
              to="/progress"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-200 dark:hover:text-brand-100"
            >
              All progress
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          {attempts.length ? (
            <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
              {attempts.slice(0, 4).map((attempt) => {
                const passed = (attempt.score || 0) >= 60;
                return (
                  <li key={`${attempt.testId}-${attempt.completedAt}`}>
                    <Link
                      to={`/mock-tests/${attempt.testId}/result`}
                      className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:hover:bg-slate-800/60"
                    >
                      <span
                        className={
                          passed
                            ? 'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mint-100 text-mint-700 dark:bg-mint-500/15 dark:text-mint-100'
                            : 'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-coral-100 text-coral-700 dark:bg-coral-500/15 dark:text-coral-100'
                        }
                      >
                        <Trophy size={16} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-slate-950 dark:text-white">
                          {attempt.title}
                        </span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                          {formatAttemptDate(attempt.completedAt)} · {attempt.correct}/{attempt.total} correct
                          {attempt.timeExpired ? ' · time expired' : ''}
                        </span>
                      </span>
                      <span
                        className={
                          passed
                            ? 'rounded-full bg-mint-100 px-2.5 py-1 text-xs font-bold tabular-nums text-mint-700 dark:bg-mint-500/15 dark:text-mint-100'
                            : 'rounded-full bg-coral-100 px-2.5 py-1 text-xs font-bold tabular-nums text-coral-700 dark:bg-coral-500/15 dark:text-coral-100'
                        }
                      >
                        {attempt.score}%
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-4 flex flex-col items-start gap-3 rounded-xl border border-dashed border-slate-200 p-4 dark:border-slate-700 sm:flex-row sm:items-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-100">
                <ClipboardCheck size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">No tests taken yet</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ten-question grammar and vocabulary tests take about five minutes.
                </p>
              </div>
              <Link
                to="/mock-tests"
                className="inline-flex items-center gap-1 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Browse tests
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Library</h3>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-coral-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-coral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              <RotateCcw size={12} aria-hidden="true" />
              Reset
            </button>
          </div>
          <div className="mt-4 grid grid-cols-[1fr_3.25rem_3.25rem] gap-x-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <span />
            <span className="text-right">TOPIK I</span>
            <span className="text-right">TOPIK II</span>
          </div>
          <dl className="text-sm">
            {libraryRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_3.25rem_3.25rem] gap-x-3 border-t border-slate-100 py-2 dark:border-slate-800"
              >
                <dt className="text-slate-500 dark:text-slate-400">{row.label}</dt>
                <dd
                  className={`text-right font-bold tabular-nums ${row.counts['TOPIK I'] ? '' : 'text-slate-300 dark:text-slate-600'}`}
                >
                  {row.counts['TOPIK I']}
                </dd>
                <dd className="text-right font-bold tabular-nums">{row.counts['TOPIK II']}</dd>
              </div>
            ))}
            <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <dt className="text-slate-500 dark:text-slate-400">Saved</dt>
              <dd className="font-bold tabular-nums">{savedCount}</dd>
            </div>
            <div className="mt-3 flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Test attempts</dt>
              <dd className="font-bold tabular-nums">{attempts.length}</dd>
            </div>
          </dl>
        </Card>
      </section>
    </div>
  );
}
