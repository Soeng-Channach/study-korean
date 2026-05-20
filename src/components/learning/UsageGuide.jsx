import Badge from '../ui/Badge';
import Card from '../ui/Card';

const rows = [
  ['Verb', 'verb'],
  ['Adjective', 'adjective'],
  ['Noun', 'noun']
];

export function UsageGuideCompact({ usage }) {
  if (!usage) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {rows.map(([label, key]) => (
        <Badge key={key} tone={usage[key] === 'Not used' ? 'rose' : 'slate'}>
          {label}: {usage[key]}
        </Badge>
      ))}
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
