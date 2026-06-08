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
  band: string;
  bandGold: string;
}

const PALETTES: Record<Tone, Palette> = {
  paper: {
    line: "var(--strata-line)",
    strong: "var(--strata-line-strong)",
    gold: "var(--strata-gold-hair)",
    band: "var(--color-st-ink)",
    bandGold: "var(--color-st-accent)",
  },
  navy: {
    line: "color-mix(in srgb, var(--color-st-paper) 8%, transparent)",
    strong: "color-mix(in srgb, var(--color-st-paper) 14%, transparent)",
    gold: "color-mix(in srgb, var(--color-st-accent-bright) 30%, transparent)",
    band: "var(--color-st-paper)",
    bandGold: "var(--color-st-accent-bright)",
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
    const centerY = top + span * t + Math.sin(i * 1.7) * 10;
    const height = 78 + Math.sin(i * 0.9) * 16;
    bands.push({
      centerY,
      height,
      color: i === goldIndex ? palette.bandGold : palette.band,
    });
  }
  return bands;
}

const BAND_LAYERS = 10;
const BAND_LAYER_OPACITY = 0.028;

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
        {bands.map((band, bi) => (
          <g key={bi} fill={band.color}>
            {Array.from({ length: BAND_LAYERS }, (_, li) => {
              const h = band.height * (1 - (0.82 * li) / (BAND_LAYERS - 1));
              return (
                <rect
                  key={li}
                  x={0}
                  y={band.centerY - h / 2}
                  width={1200}
                  height={h}
                  opacity={BAND_LAYER_OPACITY}
                />
              );
            })}
          </g>
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
