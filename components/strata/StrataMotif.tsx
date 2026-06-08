import { cn } from "@/lib/utils";

type Variant = "lines" | "rings" | "bands";
type Density = "sparse" | "normal";
type Tone = "paper" | "navy";

interface StrataMotifProps {
  variant?: Variant;
  density?: Density;
  tone?: Tone;
  className?: string;
}

interface Palette {
  line: string;
  strong: string;
  gold: string;
}

const PALETTES: Record<Tone, Palette> = {
  paper: {
    line: "var(--strata-line)",
    strong: "var(--strata-line-strong)",
    gold: "var(--strata-gold-hair)",
  },
  navy: {
    line: "color-mix(in srgb, var(--color-st-paper) 8%, transparent)",
    strong: "color-mix(in srgb, var(--color-st-paper) 14%, transparent)",
    gold: "color-mix(in srgb, var(--color-st-accent-bright) 30%, transparent)",
  },
};

function smoothPath(points: ReadonlyArray<readonly [number, number]>): string {
  if (points.length === 0) return "";
  let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
  for (let i = 1; i < points.length; i += 1) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const dx = (x1 - x0) / 3;
    d +=
      ` C ${(x0 + dx).toFixed(2)} ${y0.toFixed(2)}` +
      ` ${(x1 - dx).toFixed(2)} ${y1.toFixed(2)}` +
      ` ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }
  return d;
}

interface Stroke {
  d: string;
  color: string;
  width: number;
}

function buildLines(density: Density, palette: Palette): Stroke[] {
  const W = 1200;
  const H = 400;
  const top = 48;
  const bottom = H - 36;
  const count = density === "sparse" ? 6 : 10;
  const span = bottom - top;
  const goldIndex = Math.floor(count * 0.34);
  const segs = 6;
  const strokes: Stroke[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const wobble = Math.sin(i * 1.4) * 5 + Math.sin(i * 0.6) * 5;
    const baseY = top + span * t + wobble;
    const amp = 6 + (i % 3) * 3.5;
    const phase = i * 0.9;
    const points: Array<readonly [number, number]> = [];
    for (let s = 0; s <= segs; s += 1) {
      const x = (W * s) / segs;
      const y = baseY + Math.sin(phase + (s / segs) * Math.PI * 1.6) * amp;
      points.push([x, y]);
    }
    const isLast = i === count - 1;
    const isGold = i === goldIndex;
    strokes.push({
      d: smoothPath(points),
      color: isGold ? palette.gold : isLast ? palette.strong : palette.line,
      width: isLast ? 1.25 : 1,
    });
  }
  return strokes;
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  a0: number,
  a1: number,
): string {
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return (
    `M ${x0.toFixed(2)} ${y0.toFixed(2)}` +
    ` A ${r.toFixed(2)} ${r.toFixed(2)} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`
  );
}

function buildRings(density: Density, palette: Palette): Stroke[] {
  const cx = 470;
  const cy = 470;
  const count = density === "sparse" ? 5 : 8;
  const goldIndex = Math.floor(count * 0.45);
  const strokes: Stroke[] = [];
  let r = 80;

  for (let i = 0; i < count; i += 1) {
    const a0 = -Math.PI * 0.78 + Math.sin(i * 1.1) * 0.12;
    const a1 = a0 + Math.PI * 1.58;
    const isLast = i === count - 1;
    const isGold = i === goldIndex;
    strokes.push({
      d: arcPath(cx, cy, r, a0, a1),
      color: isGold ? palette.gold : isLast ? palette.strong : palette.line,
      width: isLast ? 1.25 : 1,
    });
    r += 52 + Math.sin(i * 1.3) * 12;
  }
  return strokes;
}

interface Band {
  centerY: number;
  height: number;
  color: string;
}

function buildBands(density: Density, palette: Palette): Band[] {
  const H = 400;
  const count = density === "sparse" ? 3 : 4;
  const goldIndex = 1;
  const top = 70;
  const bottom = H - 50;
  const span = bottom - top;
  const bands: Band[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const centerY = top + span * t + Math.sin(i * 1.7) * 8;
    const height = 64 + Math.sin(i * 0.9) * 14;
    const isLast = i === count - 1;
    // Same restrained palette as "lines": faint hairline tone for most
    // bands, the heavier line for the anchoring band, one gold accent.
    const color =
      i === goldIndex ? palette.gold : isLast ? palette.strong : palette.line;
    bands.push({ centerY, height, color });
  }
  return bands;
}

// Peak alpha at the flat middle of each band. Multiplies the already-faint
// palette colors, so bands read as near-flat sediment with feathered edges —
// no bright center highlight, no metallic gradient.
const BAND_PEAK_OPACITY = 0.75;

/** Decorative "strata" motif — stratified contour lines in the brand palette. */
export function StrataMotif({
  variant = "lines",
  density = "sparse",
  tone = "paper",
  className,
}: StrataMotifProps): React.JSX.Element {
  const palette = PALETTES[tone];
  const rootClass = cn(
    "pointer-events-none absolute inset-0 block h-full w-full",
    className,
  );

  if (variant === "bands") {
    const bands = buildBands(density, palette);
    return (
      <svg
        aria-hidden="true"
        focusable={false}
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        className={rootClass}
      >
        <defs>
          {bands.map((band, bi) => {
            const id = `strata-band-${tone}-${density}-${bi}`;
            // Vertical feather: transparent edges, a flat low-alpha plateau
            // through the middle. No center spike — the calm cousin of lines.
            return (
              <linearGradient key={bi} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={band.color} stopOpacity={0} />
                <stop
                  offset="22%"
                  stopColor={band.color}
                  stopOpacity={BAND_PEAK_OPACITY}
                />
                <stop
                  offset="78%"
                  stopColor={band.color}
                  stopOpacity={BAND_PEAK_OPACITY}
                />
                <stop offset="100%" stopColor={band.color} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>
        {bands.map((band, bi) => (
          <rect
            key={bi}
            x={0}
            y={band.centerY - band.height / 2}
            width={1200}
            height={band.height}
            fill={`url(#strata-band-${tone}-${density}-${bi})`}
          />
        ))}
      </svg>
    );
  }

  const isRings = variant === "rings";
  const strokes = isRings
    ? buildRings(density, palette)
    : buildLines(density, palette);

  return (
    <svg
      aria-hidden="true"
      focusable={false}
      viewBox={isRings ? "0 0 940 940" : "0 0 1200 400"}
      preserveAspectRatio={isRings ? "xMidYMid slice" : "none"}
      className={rootClass}
    >
      {strokes.map((stroke, i) => (
        <path
          key={i}
          d={stroke.d}
          fill="none"
          stroke={stroke.color}
          strokeWidth={stroke.width}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
