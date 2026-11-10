import { Clock3, Lightbulb } from 'lucide-react';
import BackLink from '../../components/ui/BackLink';
import Bilingual from '../../components/ui/Bilingual';
import Card from '../../components/ui/Card';
import SpeakButton from '../../components/ui/SpeakButton';
import { usePreferences } from '../../context/PreferencesContext';
import { writingOverview, writingRules, writingSections } from '../../data/writingGuide';
import { usePageMeta } from '../../hooks/usePageMeta';

const KM = 'text-violet-700 dark:text-violet-300';

export default function WritingGuidePage() {
  usePageMeta('Writing guide', 'How TOPIK II writing is scored, with templates and useful expressions.');
  const { meaningLanguage } = usePreferences();

  return (
    <article className="mx-auto max-w-3xl space-y-4">
      <BackLink to="/writing">Writing</BackLink>

      <Card>
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">TOPIK II · 쓰기</p>
        <h1 className="mt-0.5 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">Writing guide</h1>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
          <Clock3 size={15} aria-hidden="true" /> {writingOverview.minutes} minutes · 4 questions · {writingOverview.total} points
        </p>
        <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200 dark:ring-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
              <tr>
                <th className="px-3 py-2">No.</th>
                <th className="px-3 py-2">Task</th>
                <th className="px-3 py-2 text-right">Points</th>
                <th className="hidden px-3 py-2 text-right sm:table-cell">Suggested time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {writingOverview.rows.map((row) => (
                <tr key={row.number}>
                  <td className="px-3 py-2 font-black text-slate-950 dark:text-white">{row.number}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{row.kind}</td>
                  <td className="px-3 py-2 text-right font-bold text-emerald-700 dark:text-emerald-300">{row.points}</td>
                  <td className="hidden px-3 py-2 text-right text-slate-500 dark:text-slate-400 sm:table-cell">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950 dark:text-white">
          <Lightbulb size={18} className="text-amber-500" aria-hidden="true" /> Rules that cost points
        </h2>
        <ul className="mt-3 space-y-2.5">
          {writingRules.map((rule) => (
            <li key={rule.en} className="rounded-lg bg-amber-50/70 px-3 py-2 dark:bg-amber-400/10">
              <Bilingual
                en={rule.en}
                km={rule.km}
                className="text-sm leading-6 text-slate-800 dark:text-slate-100"
                kmClassName={`text-sm leading-7 ${KM}`}
              />
            </li>
          ))}
        </ul>
      </Card>

      {writingSections.map((section) => (
        <Card key={section.id} id={section.id} className="scroll-mt-24">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">{section.title}</h2>
          <div className="mt-1.5">
            <Bilingual
              en={section.summary.en}
              km={section.summary.km}
              className="text-sm leading-6 text-slate-600 dark:text-slate-300"
              kmClassName={`text-sm leading-7 ${KM}`}
            />
          </div>

          <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">How to do it</h3>
          <ol className="mt-2 space-y-2">
            {section.steps.map((step, index) => (
              <li key={step.en} className="flex gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <Bilingual
                    en={step.en}
                    km={step.km}
                    className="text-sm leading-6 text-slate-800 dark:text-slate-100"
                    kmClassName={`text-sm leading-7 ${KM}`}
                  />
                </div>
              </li>
            ))}
          </ol>

          <h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Useful expressions
          </h3>
          <ul className="mt-2 divide-y divide-slate-100 overflow-hidden rounded-xl ring-1 ring-slate-200 dark:divide-slate-800 dark:ring-slate-800">
            {section.expressions.map((item) => (
              <li key={item.ko} className="flex flex-wrap items-center gap-x-2 gap-y-0.5 px-3 py-2">
                <span className="font-bold text-slate-950 dark:text-white">{item.ko}</span>
                <SpeakButton text={item.ko.replace(/[…/]/g, ' ')} size={13} label={`Play ${item.ko}`} />
                {meaningLanguage !== 'km' ? (
                  <span className="text-sm text-slate-600 dark:text-slate-300">{item.en}</span>
                ) : null}
                {meaningLanguage !== 'en' ? (
                  <span lang="km" className={`text-sm ${KM}`}>
                    {meaningLanguage === 'both' ? '· ' : ''}
                    {item.km}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </article>
  );
}
