// Small exam-style charts for writing question 53, drawn as SVG so they work
// offline and in dark mode. A figure looks like:
//   { kind: 'line' | 'bar', unit, labels: ['2019년', '2024년'],
//     series: [{ name, values: [340, 650], display: ['340만 명', '650만 명'] }] }
// One series is drawn in a single colour; two series get a legend.

const W = 320;
const H = 190;
const PAD = { top: 26, right: 16, bottom: 26, left: 16 };

// Blue and orange stay apart for colour-blind readers in both themes.
const SERIES = [
  { fill: 'fill-[#2a78d6] dark:fill-[#3987e5]', stroke: 'stroke-[#2a78d6] dark:stroke-[#3987e5]', dot: 'bg-[#2a78d6] dark:bg-[#3987e5]' },
  { fill: 'fill-[#eb6834] dark:fill-[#d95926]', stroke: 'stroke-[#eb6834] dark:stroke-[#d95926]', dot: 'bg-[#eb6834] dark:bg-[#d95926]' }
];

const INK = 'fill-slate-900 dark:fill-slate-100';
const MUTED = 'fill-slate-500 dark:fill-slate-400';
const SURFACE = 'fill-white dark:fill-slate-900';

function scaleFor(figure) {
  const all = figure.series.flatMap((item) => item.values);
  const max = Math.max(0, ...all);
  const min = Math.min(0, ...all);
  const span = max - min || 1;
  const top = PAD.top + 16;
  const bottom = H - PAD.bottom - (min < 0 ? 14 : 0);
  return (value) => bottom - ((value - min) / span) * (bottom - top);
}

function text(item, index) {
  return item.display?.[index] ?? String(item.values[index]);
}

// A bar with rounded corners only at its data end.
function barPath(x, y0, y1, width) {
  const r = Math.min(4, width / 2, Math.abs(y1 - y0));
  const up = y1 < y0;
  const ry = up ? r : -r;
  return `M${x},${y0} V${y1 + ry} Q${x},${y1} ${x + r},${y1} H${x + width - r} Q${x + width},${y1} ${x + width},${y1 + ry} V${y0} Z`;
}

function Bars({ figure, y }) {
  const groups = figure.labels.length;
  const count = figure.series.length;
  const inner = W - PAD.left - PAD.right;
  const slot = inner / groups;
  const gap = 2;
  const width = Math.min(34, (slot * 0.62 - gap * (count - 1)) / count);
  const groupWidth = width * count + gap * (count - 1);
  const zero = y(0);

  return (
    <>
      {figure.labels.map((label, g) => {
        const start = PAD.left + slot * g + (slot - groupWidth) / 2;
        return (
          <g key={label}>
            {figure.series.map((item, s) => {
              const value = item.values[g];
              const x = start + s * (width + gap);
              const top = y(value);
              return (
                <g key={item.name || s}>
                  <path d={barPath(x, zero, top, width)} className={SERIES[s].fill}>
                    <title>{`${label}${item.name ? ` · ${item.name}` : ''}: ${text(item, g)}`}</title>
                  </path>
                  <text
                    x={x + width / 2}
                    y={value < 0 ? top + 12 : top - 5}
                    textAnchor="middle"
                    className={`${INK} text-[11px] font-bold`}
                  >
                    {text(item, g)}
                  </text>
                </g>
              );
            })}
            <text x={start + groupWidth / 2} y={H - 8} textAnchor="middle" className={`${MUTED} text-[11px]`}>
              {label}
            </text>
          </g>
        );
      })}
      <line x1={PAD.left} x2={W - PAD.right} y1={zero} y2={zero} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
    </>
  );
}

function Lines({ figure, y }) {
  const points = figure.labels.length;
  const inner = W - PAD.left - PAD.right;
  const edge = inner / (points * 2);
  const x = (index) => PAD.left + edge + (points === 1 ? 0 : ((inner - edge * 2) / (points - 1)) * index);
  const zero = y(0);

  return (
    <>
      <line x1={PAD.left} x2={W - PAD.right} y1={zero} y2={zero} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
      {figure.series.map((item, s) => (
        <polyline
          key={item.name || s}
          points={item.values.map((value, index) => `${x(index)},${y(value)}`).join(' ')}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={SERIES[s].stroke}
        />
      ))}
      {figure.series.map((item, s) =>
        item.values.map((value, index) => {
          // With two lines, the lower one is labelled underneath so labels never collide.
          const others = figure.series.filter((_, other) => other !== s).map((other) => other.values[index]);
          const below = others.some((other) => other > value);
          return (
            <g key={`${item.name || s}-${figure.labels[index]}`}>
              <circle cx={x(index)} cy={y(value)} r="6" className={SURFACE} />
              <circle cx={x(index)} cy={y(value)} r="4" className={SERIES[s].fill}>
                <title>{`${figure.labels[index]}${item.name ? ` · ${item.name}` : ''}: ${text(item, index)}`}</title>
              </circle>
              <text
                x={x(index)}
                y={below ? y(value) + 18 : y(value) - 10}
                textAnchor="middle"
                className={`${INK} text-[11px] font-bold`}
              >
                {text(item, index)}
              </text>
            </g>
          );
        })
      )}
      {figure.labels.map((label, index) => (
        <text key={label} x={x(index)} y={H - 8} textAnchor="middle" className={`${MUTED} text-[11px]`}>
          {label}
        </text>
      ))}
    </>
  );
}

export default function WritingChart({ figure, heading }) {
  const y = scaleFor(figure);
  const named = figure.series.filter((item) => item.name);
  const summary = figure.labels
    .map((label, index) => `${label} ${figure.series.map((item) => `${item.name ? `${item.name} ` : ''}${text(item, index)}`).join(', ')}`)
    .join('; ');

  return (
    <figure className="px-2 pb-1 pt-2">
      {named.length > 1 ? (
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
          {named.map((item, s) => (
            <li key={item.name} className="inline-flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-sm ${SERIES[s].dot}`} aria-hidden="true" />
              {item.name}
            </li>
          ))}
        </ul>
      ) : null}
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${heading}: ${summary}`} className="mx-auto block w-full max-w-[380px]">
        {figure.unit ? (
          <text x={W - PAD.right} y={12} textAnchor="end" className={`${MUTED} text-[10px]`}>
            (단위: {figure.unit})
          </text>
        ) : null}
        {figure.kind === 'line' ? <Lines figure={figure} y={y} /> : <Bars figure={figure} y={y} />}
      </svg>
    </figure>
  );
}
