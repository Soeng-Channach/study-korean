export default function ProgressBar({ value, label }) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      ) : null}
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
