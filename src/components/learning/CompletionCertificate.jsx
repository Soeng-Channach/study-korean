import { Award, ScanLine, Sparkles, Star, Trophy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Celebratory certificate shown on the Progress page once every grammar,
// reading, and listening lesson is complete.
export default function CompletionCertificate({ subtitle, stats = [], certificateId, dateLabel }) {
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <section className="relative overflow-hidden rounded-2xl p-[3px] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)]">
      <div className="absolute inset-0 animate-[spin_18s_linear_infinite] bg-[conic-gradient(from_0deg,#fbbf24,#f43f5e,#a855f7,#6366f1,#10b981,#fbbf24)]" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[14px] bg-[radial-gradient(circle_at_top_left,#fef3c7,transparent_28%),radial-gradient(circle_at_bottom_right,#e0e7ff,transparent_30%),linear-gradient(135deg,#ffffff_0%,#f8fafc_56%,#eef2ff_100%)] p-6 sm:p-12">
        <div className="absolute left-5 top-5 h-14 w-14 rounded-tl-xl border-l-[3px] border-t-[3px] border-amber-500/80" aria-hidden="true" />
        <div className="absolute right-5 top-5 h-14 w-14 rounded-tr-xl border-r-[3px] border-t-[3px] border-amber-500/80" aria-hidden="true" />
        <div className="absolute bottom-5 left-5 h-14 w-14 rounded-bl-xl border-b-[3px] border-l-[3px] border-amber-500/80" aria-hidden="true" />
        <div className="absolute bottom-5 right-5 h-14 w-14 rounded-br-xl border-b-[3px] border-r-[3px] border-amber-500/80" aria-hidden="true" />

        <Sparkles className="absolute right-10 top-16 hidden text-amber-400/50 sm:block" size={32} aria-hidden="true" />
        <Sparkles className="absolute left-12 bottom-24 hidden text-indigo-400/40 sm:block" size={22} aria-hidden="true" />
        <Star className="absolute right-20 bottom-40 hidden text-rose-400/40 sm:block" size={16} aria-hidden="true" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="relative mx-auto inline-block">
            <div className="absolute -inset-4 animate-pulse rounded-full bg-amber-300/40 blur-2xl" aria-hidden="true" />
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-white shadow-lg shadow-amber-500/40 ring-4 ring-amber-100">
              <Trophy aria-hidden="true" size={44} />
            </div>
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.4em] text-brand-700">TOPIK Korean</p>
          <h1 className="mt-3 bg-gradient-to-br from-slate-950 via-brand-700 to-indigo-700 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl">
            Certificate of Completion
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
            Awarded for completing every grammar, reading, and listening lesson — a full course of dedicated TOPIK study.
          </p>

          <div className="my-8 flex items-center justify-center gap-3">
            <div className="h-px max-w-xs flex-1 bg-gradient-to-r from-transparent to-amber-400" />
            <Star className="text-amber-500" size={14} aria-hidden="true" />
            <div className="h-px max-w-xs flex-1 bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Awarded for</p>
          <h2 className="mt-2 text-3xl font-extrabold text-brand-700 sm:text-4xl">{subtitle}</h2>

          {stats.length ? (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-amber-200/70 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      {Icon ? <Icon size={20} aria-hidden="true" /> : null}
                    </div>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
                    <p className="mt-1 text-3xl font-black text-slate-950">{stat.value}</p>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-950 via-indigo-900 to-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-900/30 ring-2 ring-amber-300/60">
            <Award aria-hidden="true" size={18} className="text-amber-300" />
            Full Course Completion
          </div>

          <div className="mt-10 grid gap-6 border-t border-amber-200/70 pt-6 sm:grid-cols-3 sm:items-end">
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">Certificate ID</p>
              <p className="mt-2 break-all font-mono text-xs font-bold text-slate-800">{certificateId}</p>
              {dateLabel ? <p className="mt-2 text-xs text-slate-500">Issued {dateLabel}</p> : null}
            </div>

            <div className="flex flex-col items-center">
              <div className="rounded-xl bg-white p-2 shadow-md ring-1 ring-slate-200">
                {url ? (
                  <QRCodeSVG value={url} size={104} level="M" marginSize={2} bgColor="#ffffff" fgColor="#0f172a" />
                ) : null}
              </div>
              <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <ScanLine size={12} aria-hidden="true" />
                Scan to verify
              </p>
            </div>

            <div className="text-center sm:text-right">
              <div className="inline-block min-w-36 border-t-2 border-slate-950 pt-2">
                <p className="text-sm font-bold text-slate-950">Korean TOPIK</p>
                <p className="text-xs text-slate-500">Practice Certificate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
