import { RotateCcw } from 'lucide-react';

// Answer control for TOPIK 배열 questions whose official option text was never
// extracted: instead of picking one of four printed orderings, the learner puts
// the four clauses themselves into sequence. Tap an available clause to place it
// in the next slot; tap a placed clause to take it back.
export default function ClauseOrderAnswer({ question, placed, revealed, onChange }) {
  const clauses = question.clauses || [];
  const correctOrder = question.correctOrder || [];
  const sequence = Array.isArray(placed) ? placed : [];
  const byLabel = new Map(clauses.map((clause) => [clause.label, clause]));
  const remaining = clauses.filter((clause) => !sequence.includes(clause.label));

  const place = (label) => {
    if (revealed || sequence.includes(label)) return;
    onChange([...sequence, label]);
  };

  const unplace = (index) => {
    if (revealed) return;
    onChange(sequence.filter((_, position) => position !== index));
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          {revealed ? 'Your order' : `Tap the clauses in order (${sequence.length}/${clauses.length})`}
        </p>
        {!revealed && sequence.length > 0 ? (
          <button
            type="button"
            onClick={() => onChange([])}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <RotateCcw size={12} aria-hidden="true" /> Clear
          </button>
        ) : null}
      </div>

      <ol className="space-y-2.5">
        {clauses.map((_, slot) => {
          const label = sequence[slot];
          const clause = label ? byLabel.get(label) : null;
          const isCorrectSlot = revealed && label === correctOrder[slot];
          const isWrongSlot = revealed && label !== undefined && label !== correctOrder[slot];

          return (
            <li key={slot}>
              <button
                type="button"
                onClick={() => (clause ? unplace(slot) : undefined)}
                disabled={revealed || !clause}
                aria-label={
                  clause
                    ? `Position ${slot + 1}: (${clause.label}) ${clause.text}. Tap to remove.`
                    : `Position ${slot + 1}: empty`
                }
                className={[
                  'flex min-h-16 w-full items-center gap-4 rounded-md border px-4 py-3 text-left text-lg font-semibold leading-7 transition [overflow-wrap:anywhere] sm:px-5',
                  isCorrectSlot
                    ? 'border-mint-500 bg-mint-100 text-mint-700 dark:bg-mint-500/15 dark:text-mint-100'
                    : '',
                  isWrongSlot
                    ? 'border-coral-500 bg-coral-100 text-coral-700 dark:bg-coral-500/15 dark:text-coral-100'
                    : '',
                  !revealed && clause
                    ? 'border-brand-500 bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/15 dark:text-brand-100 dark:hover:bg-brand-500/25'
                    : '',
                  !clause && !revealed
                    ? 'border-dashed border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-500'
                    : '',
                  !clause && revealed
                    ? 'border-dashed border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-500'
                    : ''
                ].join(' ')}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-base font-black text-slate-700 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100">
                  {slot + 1}
                </span>
                {clause ? (
                  <span>
                    <span className="mr-1.5 font-black">({clause.label})</span>
                    {clause.text}
                  </span>
                ) : (
                  <span className="text-base font-medium">Tap a clause below</span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {!revealed && remaining.length > 0 ? (
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Available
          </p>
          <div className="space-y-2">
            {remaining.map((clause) => (
              <button
                key={clause.label}
                type="button"
                onClick={() => place(clause.label)}
                className="flex w-full items-start gap-3 rounded-md border border-slate-200 bg-white px-3 py-2.5 text-left text-base font-semibold leading-7 text-slate-950 transition [overflow-wrap:anywhere] hover:border-brand-300 hover:bg-brand-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-brand-500 dark:hover:bg-slate-800"
              >
                <span className="font-black text-brand-600 dark:text-brand-100">({clause.label})</span>
                <span className="min-w-0 flex-1">{clause.text}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {revealed ? (
        <p className="rounded-md bg-slate-100 px-4 py-3 text-base font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-100">
          Correct order: {correctOrder.map((label) => `(${label})`).join(' → ')}
        </p>
      ) : null}
    </div>
  );
}
