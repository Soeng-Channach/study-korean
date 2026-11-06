import { CalendarCheck, CheckCircle2, ChevronRight, Trophy } from 'lucide-react';
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
      <Card className="overflow-hidden bg-gradient-to-br from-brand-600 to-indigo-700 border-0 text-white ring-0 dark:from-brand-600 dark:to-indigo-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-100">
          <CalendarCheck size={14} aria-hidden="true" /> TOPIK II · Korean / English / Khmer
        </div>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">30-Day Vocabulary Plan</h1>
        <p className="mt-1 text-sm text-brand-100">
          {planWordCount.toLocaleString()} intermediate words, about 33 a day. Learn the list, then take the day&apos;s quiz.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-white/10 px-3 py-2">
            <p className="text-xs text-brand-100">Days completed</p>
            <p className="text-xl font-bold">
              {completedDays} <span className="text-sm font-medium text-brand-100">/ {planDays.length}</span>
            </p>
          </div>
          <div className="rounded-lg bg-white/10 px-3 py-2">
            <p className="text-xs text-brand-100">Words known</p>
            <p className="text-xl font-bold">
              {knownCount} <span className="text-sm font-medium text-brand-100">/ {planWordCount}</span>
            </p>
          </div>
        </div>
        <Link
          to={`/plan/${nextDay.day}`}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-700 shadow-sm transition hover:bg-brand-50"
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
              className={`group rounded-xl border p-3 transition hover:-translate-y-0.5 hover:shadow-md ${
                done
                  ? 'border-mint-300 bg-mint-50 dark:border-mint-500/40 dark:bg-mint-500/10'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-950 dark:text-white">Day {pad(day.day)}</span>
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
