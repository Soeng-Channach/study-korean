import { CheckCircle2, ChevronRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import VocabSectionTabs from '../../components/learning/VocabSectionTabs';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import { useLearning } from '../../context/LearningContext';
import { planDays, planWordCount } from '../../data/thirtyDayPlan';
import { usePageMeta } from '../../hooks/usePageMeta';

const pad = (n) => String(n).padStart(2, '0');

export default function PlanOverviewPage() {
  const { state, isPlanDayCompleted } = useLearning();
  usePageMeta('TOPIK II 30-Day Plan', 'Learn 1,000 TOPIK II words in 30 days with Korean, English and Khmer.');

  const known = new Set(state.knownPlanWordIds || []);
  const completedDays = (state.completedPlanDays || []).length;
  const knownCount = planDays.reduce((sum, day) => sum + day.words.filter((w) => known.has(w.id)).length, 0);
  const nextDay = planDays.find((day) => !isPlanDayCompleted(day.day)) || planDays[planDays.length - 1];

  return (
    <div className="space-y-4 sm:space-y-5">
      <VocabSectionTabs />
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">30-Day Plan</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {planWordCount.toLocaleString()} TOPIK II words, about 33 a day. Learn the list, then take the day&apos;s quiz.
          </p>
          <div className="mt-3 max-w-md">
            <ProgressBar
              value={Math.round((knownCount / planWordCount) * 100)}
              size="sm"
              ariaLabel={`${knownCount} of ${planWordCount} words known`}
            />
            <p className="mt-1.5 text-xs font-medium tabular-nums text-slate-500 dark:text-slate-400">
              {completedDays} / {planDays.length} days · {knownCount.toLocaleString()} / {planWordCount.toLocaleString()} words known
            </p>
          </div>
        </div>
        <Link
          to={`/plan/${nextDay.day}`}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:self-center"
        >
          {completedDays === 0 ? 'Start' : 'Continue'} Day {pad(nextDay.day)} <ChevronRight size={16} aria-hidden="true" />
        </Link>
      </Card>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
        {planDays.map((day) => {
          const done = isPlanDayCompleted(day.day);
          const dayKnown = day.words.filter((w) => known.has(w.id)).length;
          const best = (state.planQuizBest || {})[day.day];
          return (
            <Link
              key={day.day}
              to={`/plan/${day.day}`}
              className={`group rounded-2xl border p-3 transition hover:shadow-card ${
                done
                  ? 'border-mint-200 bg-mint-50/40 dark:border-mint-500/30 dark:bg-mint-500/5'
                  : 'border-slate-200/80 bg-white hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Day {pad(day.day)}</span>
                {done ? <CheckCircle2 size={18} className="text-mint-600 dark:text-mint-100" aria-label="Completed" /> : null}
              </div>
              <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                {day.words.slice(0, 3).map((w) => w.word).join(' · ')}
              </p>
              <div className="mt-2.5">
                <ProgressBar
                  value={Math.round((dayKnown / day.words.length) * 100)}
                  size="sm"
                  ariaLabel={`Day ${day.day}: ${dayKnown} of ${day.words.length} words known`}
                  barClassName={done ? 'bg-mint-500' : 'bg-brand-600'}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <span>
                  {dayKnown}/{day.words.length} known
                </span>
                {best ? (
                  <span className="inline-flex items-center gap-0.5 text-amber-700 dark:text-amber-200">
                    <Trophy size={11} aria-hidden="true" /> {best.correct}/{best.total}
                  </span>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
