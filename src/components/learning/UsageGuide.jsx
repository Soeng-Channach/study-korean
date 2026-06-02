import Card from '../ui/Card';

const rows = [
  ['Verb', 'verb', 'V'],
  ['Adjective', 'adjective', 'A'],
  ['Noun', 'noun', 'N']
];

const isNotUsedValue = (value = '') => value.toLowerCase().startsWith('not used');

function UsageValueBadge({ short, value }) {
  const displayValue = value === 'Not used directly' ? 'Not used' : value;
  const notUsed = isNotUsedValue(displayValue);
  const valueStartsWithLetter = displayValue.startsWith(short);

  return (
    <span
      className={
        notUsed
          ? 'inline-flex w-fit items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-400 dark:bg-slate-800/70 dark:text-slate-500'
          : 'inline-flex w-fit items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-100 dark:ring-brand-500/25'
      }
    >
      {valueStartsWithLetter ? null : <span className="font-bold">{short}</span>}
      <span className={notUsed ? 'line-through decoration-slate-400/60' : ''}>{displayValue}</span>
    </span>
  );
}

export function UsageGuideCompact({ usage }) {
  if (!usage) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {rows.map(([label, key, short]) => {
        const value = usage[key];
        return (
          <span key={key} title={`${label}: ${value}`}>
            <UsageValueBadge short={short} value={value} />
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
      <h3 className="text-lg font-bold text-slate-950 dark:text-white">Structure</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {rows.map(([label, key, short]) => (
          <div key={key} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {label}
            </p>
            <div className="mt-2">
              <UsageValueBadge short={short} value={usage[key]} />
            </div>
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
