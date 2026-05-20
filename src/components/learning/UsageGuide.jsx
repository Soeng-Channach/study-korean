import Card from '../ui/Card';

const rows = [
  ['Verb', 'verb', 'V'],
  ['Adjective', 'adjective', 'A'],
  ['Noun', 'noun', 'N']
];

export function UsageGuideCompact({ usage }) {
  if (!usage) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {rows.map(([label, key, short]) => {
        const value = usage[key];
        const notUsed = value === 'Not used';
        const valueStartsWithLetter = value.startsWith(short);
        return (
          <span
            key={key}
            className={
              notUsed
                ? 'inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-400 dark:bg-slate-800/70 dark:text-slate-500'
                : 'inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-100 dark:ring-brand-500/25'
            }
            title={`${label}: ${value}`}
          >
            {valueStartsWithLetter ? null : <span className="font-bold">{short}</span>}
            <span className={notUsed ? 'line-through decoration-slate-400/60' : ''}>{value}</span>
          </span>
        );
      })}
    </div>
  );
}

export default function UsageGuide({ usage }) {
  if (!usage) return null;

  return (
    <Card>
      <h3 className="text-lg font-bold text-slate-950 dark:text-white">Usage structure</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {rows.map(([label, key]) => (
          <div key={key} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {label}
            </p>
            <p className="mt-2 text-sm font-bold text-slate-950 dark:text-white">{usage[key]}</p>
          </div>
        ))}
      </div>
      {usage.note ? (
        <p className="mt-4 rounded-lg bg-brand-50 p-4 text-sm leading-6 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
          {usage.note}
        </p>
      ) : null}
    </Card>
  );
}
