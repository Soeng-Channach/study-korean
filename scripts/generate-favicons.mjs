// Derives every app icon and favicon from a single source artwork.
// Run with: node scripts/generate-favicons.mjs   (npm run favicons)
// Requires @napi-rs/canvas, also used by the render_pdf scripts.
//
// Source of truth is assets/icon-source.png — a square export of the app icon.
// Replace that file and re-run to roll out a new icon everywhere at once. It is
// deliberately outside public/, which Vite copies into dist and the service
// worker precaches — a full-size source there would bloat the offline bundle.
import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
// resolve, not join, so an absolute path passed on the CLI is honoured as-is
const source = path.resolve(root, process.argv[2] || 'assets/icon-source.png');

if (!fs.existsSync(source)) {
  throw new Error(
    `No source artwork at ${path.relative(root, source)}.\n` +
    'Save the app icon there as a square PNG (1024x1024 or larger is ideal), then re-run.'
  );
}

const artwork = await loadImage(fs.readFileSync(source));
if (artwork.width !== artwork.height) {
  console.warn(
    `warning: source is ${artwork.width}x${artwork.height}, not square — ` +
    'it will be letterboxed to avoid distorting the artwork.'
  );
}
console.log(`source ${path.relative(root, source)} (${artwork.width}x${artwork.height})`);

// iOS shows black behind a transparent apple-touch-icon, and the maskable icon
// has to cover its whole tile, so those two get flattened onto the artwork's
// own background colour rather than shipping with an alpha channel.
const FLATTEN_BG = '#ffffff';

// The full artwork — flag, book, pencil, two pieces of text — turns to mush by
// 16px, so the favicon sizes crop into the taegeuk instead. Same artwork, closer
// framing: still recognisably this icon, but legible in a tab.
// Fractions of the source's width/height; retune if the artwork is re-exported.
const FAVICON_CROP = { cx: 0.5, cy: 0.335, size: 0.34 };
const FAVICON_FILL = 0.86; // how much of the favicon tile the crop occupies

const ICONS = [
  { size: 180, out: 'public/apple-touch-icon.png', flatten: true },
  { size: 192, out: 'public/icons/icon-192.png' },
  { size: 512, out: 'public/icons/icon-512.png' },
  // Maskable icons get cropped to a circle 80% of the width, so the artwork is
  // scaled into that safe zone and the background covers the full tile.
  { size: 512, out: 'public/icons/icon-512-maskable.png', flatten: true, inset: 0.78 },
];
const ICO_SIZES = [16, 32, 48];

// Going straight from ~1024px to 16px in one drawImage aliases badly — thin
// features drop out entirely. Halving repeatedly keeps the detail that survives.
function downscale(image, target) {
  let current = createCanvas(image.width, image.height);
  current.getContext('2d').drawImage(image, 0, 0);

  while (current.width / 2 >= target) {
    const next = createCanvas(Math.max(1, Math.round(current.width / 2)), Math.max(1, Math.round(current.height / 2)));
    const ctx = next.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(current, 0, 0, next.width, next.height);
    current = next;
  }
  return current;
}

// iOS-style squircle, matching the silhouette of the source artwork so the
// cropped favicon still reads as the same icon family.
function squircle(ctx, size) {
  const c = size / 2;
  const n = 4.2;
  const steps = 220;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const ct = Math.cos(t);
    const st = Math.sin(t);
    const x = c + c * Math.sign(ct) * Math.abs(ct) ** (2 / n);
    const y = c + c * Math.sign(st) * Math.abs(st) ** (2 / n);
    if (i) ctx.lineTo(x, y);
    else ctx.moveTo(x, y);
  }
  ctx.closePath();
}

function render(size, { flatten = false, inset = 1 } = {}) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  if (flatten) {
    ctx.fillStyle = FLATTEN_BG;
    ctx.fillRect(0, 0, size, size);
  }

  const box = Math.round(size * inset);
  const stepped = downscale(artwork, box);

  // Fit rather than fill, so a non-square source is letterboxed instead of cropped.
  const scale = Math.min(box / stepped.width, box / stepped.height);
  const w = Math.round(stepped.width * scale);
  const h = Math.round(stepped.height * scale);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(stepped, Math.round((size - w) / 2), Math.round((size - h) / 2), w, h);

  return canvas.toBuffer('image/png');
}

// Favicon sizes: the taegeuk crop on the artwork's own ground, inside a squircle
// so the corners stay transparent instead of showing a hard square in the tab.
function renderFavicon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  squircle(ctx, size);
  ctx.save();
  ctx.clip();
  ctx.fillStyle = FLATTEN_BG;
  ctx.fillRect(0, 0, size, size);

  const src = Math.round(artwork.width * FAVICON_CROP.size);
  const sx = Math.round(artwork.width * FAVICON_CROP.cx - src / 2);
  const sy = Math.round(artwork.height * FAVICON_CROP.cy - src / 2);

  // Cut the region out at full resolution first, then step it down — scaling
  // straight from the source region to 16px loses the taegeuk's curve.
  const region = createCanvas(src, src);
  region.getContext('2d').drawImage(artwork, sx, sy, src, src, 0, 0, src, src);

  const target = Math.round(size * FAVICON_FILL);
  const stepped = downscale(region, target);
  const offset = Math.round((size - target) / 2);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(stepped, offset, offset, target, target);
  ctx.restore();

  return canvas.toBuffer('image/png');
}

// ICO carrying PNG payloads, which every browser and Windows Vista+ accepts.
function packIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const dir = entries.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...dir, ...entries.map((e) => e.data)]);
}

for (const { size, out, flatten, inset } of ICONS) {
  const data = render(size, { flatten, inset });
  const target = path.join(root, out);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, data);
  console.log('wrote', out, data.length, 'bytes');
}

const ico = packIco(ICO_SIZES.map((size) => ({ size, data: renderFavicon(size) })));
fs.writeFileSync(path.join(root, 'public/favicon.ico'), ico);
console.log('wrote public/favicon.ico', ico.length, 'bytes');
