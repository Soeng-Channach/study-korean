import Card from '../ui/Card';

const rows = [
  ['Verb', 'verb', 'V'],
  ['Adjective', 'adjective', 'A'],
  ['Noun', 'noun', 'N']
];

const isNotUsedValue = (value = '') => value.toLowerCase().startsWith('not used');

// Noun forms are stored as "N인", "N이/가" (no hyphen) while verb/adjective forms use
// "V-"/"A-". Add the matching hyphen so a noun reads "N-인", "N-이/가" — including each
// segment of multi-form values like "N인 / N일" -> "N-인 / N-일". Only an "N" directly
// bound to a following particle/ending is touched, so "N 도중에" (separate word) and a
// trailing bare "N" ("...비롯한 N") stay as-is, and "N-..." is left idempotent.
const withNounHyphen = (value = '') => value.replace(/N(?=[^\s\-/])/g, 'N-');

const patternSlots = ['-(으)ㄴ/는/(으)ㄹ', '-(으)ㄴ/는', '-(으)ㄹ', '-(으)ㄴ', '-고', '-기'];

function structureValue(value, short, pattern) {
  if (!pattern || isNotUsedValue(value) || !value.startsWith(short)) return value;

  const slot = patternSlots.find((candidate) => pattern.includes(candidate));
  if (!slot) return value;

  const [prefix = '', suffix = ''] = pattern.split(slot).map((part) => part.trim());
  if (!prefix && !suffix) return value;
  if ((prefix && value.includes(prefix)) || (suffix && value.includes(suffix))) return value;

  return value
    .split(' / ')
    .map((form) => pattern.replace(slot, form))
    .join(' / ');
}

function UsageValueBadge({ short, value, pattern }) {
  const normalized = value === 'Not used directly' ? 'Not used' : value;
  const notUsed = isNotUsedValue(normalized);
  const structuredValue = structureValue(normalized, short, pattern);
  const displayValue = !notUsed && short === 'N' ? withNounHyphen(structuredValue) : structuredValue;
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

export function UsageGuideCompact({ usage, pattern }) {
  if (!usage) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {rows.map(([label, key, short]) => {
        const value = usage[key];
        return (
          <span key={key} title={`${label}: ${value}`}>
            <UsageValueBadge short={short} value={value} pattern={pattern} />
          </span>
        );
      })}
    </div>
  );
}

export default function UsageGuide({ usage, pattern }) {
  if (!usage) return null;

  const usedRows = rows.filter(([, key]) => {
    const value = usage[key];
    return value && !isNotUsedValue(value);
  });

  const colsClass =
    usedRows.length >= 3 ? 'sm:grid-cols-3' : usedRows.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1';

  return (
    <Card>
      <h3 className="text-lg font-bold text-slate-950 dark:text-white">Structure</h3>
      <div className={`mt-4 grid gap-3 ${colsClass}`}>
        {usedRows.map(([label, key, short]) => (
          <div key={key} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {label}
            </p>
            <div className="mt-2">
              <UsageValueBadge short={short} value={usage[key]} pattern={pattern} />
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
