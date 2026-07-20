import { useEffect, useRef, useState } from 'react';
import { useLandingStore, venueSlug, type VenueType } from '@/features/public/hooks/landingStore';

const eventByType: Record<VenueType, { name: string; detail: string }> = {
  club: { name: 'Winter Gala', detail: 'Grand Hall' },
  theater: { name: 'Opening Night', detail: 'Main Stage' },
  rooftop: { name: 'Sunset Sessions', detail: 'Sky Terrace' },
  'supper club': { name: 'Harvest Supper', detail: 'Dining Room' },
};

function motionOk() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
}

const QR_PATH =
  'M2 2h8v8H2V2Zm2 2v4h4V4H4Zm10-2h8v8h-8V2Zm2 2v4h4V4h-4ZM2 14h8v8H2v-8Zm2 2v4h4v-4H4Zm12-2h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-4 4h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-2 2h2v2h-2v-2Zm-4 0h2v2h-2v-2Z';

export function HeroTicket() {
  const venueName = useLandingStore((s) => s.venueName);
  const venueType = useLandingStore((s) => s.venueType);
  const [showQr, setShowQr] = useState(false);
  useEffect(() => {
    if (!motionOk()) return;
    const id = window.setInterval(() => setShowQr((v) => !v), 3600);
    return () => window.clearInterval(id);
  }, []);
  const show = eventByType[venueType];
  const house = venueName.trim() || 'The Aster Room';
  return (
    <div className="relative w-full max-w-[270px]" data-ticket-scene>
      <div
        data-ticket-stub
        className="absolute -right-5 top-10 hidden h-full w-full rotate-3 bg-(--lp-green) md:block"
        aria-hidden="true"
      />
      <button
        type="button"
        data-ticket-card
        onClick={() => setShowQr((v) => !v)}
        aria-label={showQr ? 'Show ticket details' : 'Show entry QR code'}
        className="relative block w-full cursor-pointer overflow-hidden rounded-[2.6rem] border-[3px] border-(--lp-ink) bg-(--lp-ivory) text-left shadow-[14px_14px_0_rgba(25,23,20,0.1)]"
      >
        <div className="bg-(--lp-green) px-6 pb-5 pt-7 text-(--lp-ivory)">
          <p className="truncate font-[family-name:var(--lp-display)] text-xl font-semibold">{house}</p>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-(--lp-green-ivory)">
            Box office · Your ticket
          </p>
        </div>
        <div className="relative min-h-[280px] px-6 py-5">
          {showQr ? (
            <div key="qr" className="flex animate-[lp-rise_0.45s_var(--lp-ease)_both] flex-col items-center pt-2 text-center">
              <svg viewBox="0 0 24 24" className="h-36 w-36 text-(--lp-ink)" aria-hidden="true">
                <path fill="currentColor" d={QR_PATH} />
              </svg>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-(--lp-ink-soft)">
                Show at the door
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-(--lp-green)">№ 000147 · SEAT 14</p>
            </div>
          ) : (
            <div key="ticket" className="animate-[lp-rise_0.45s_var(--lp-ease)_both]">
              <div className="flex items-baseline justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-(--lp-ink-soft)">
                <span>Admit one</span>
                <span>№ 000147</span>
              </div>
              <p className="mt-3 font-[family-name:var(--lp-display)] text-2xl font-semibold text-(--lp-ink)">
                {show.name}
              </p>
              <p className="mt-0.5 truncate text-xs text-(--lp-ink-soft)">{show.detail}</p>
              <div className="mt-4 flex items-baseline justify-between font-mono text-[10px] tracking-[0.14em] text-(--lp-ink-soft)">
                <span>SAT · DEC 12 · 8 PM</span>
                <span className="text-(--lp-green)">$120.00</span>
              </div>
              <div className="lp-perf mt-4 pt-3">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-(--lp-green)">
                  <span>BOX B</span>
                  <span>ROW 2</span>
                  <span>SEAT 14</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-(--lp-line-soft) pt-3.5">
                <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 text-(--lp-ink)" aria-hidden="true">
                  <path fill="currentColor" d={QR_PATH} />
                </svg>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-(--lp-ink-faint)">
                  Tap for entry QR
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center border-t border-(--lp-line-soft) py-2.5">
          <span className="truncate px-4 font-mono text-[9px] uppercase tracking-[0.26em] text-(--lp-ink-faint)">
            {venueSlug(house)}.ticketspan.com
          </span>
        </div>
      </button>
    </div>
  );
}

const orderFeed = [
  { name: 'Amara Okonkwo', detail: 'Table 12 · 4 seats', amount: '$480.00' },
  { name: 'Jordan Reed', detail: 'Box B · 2 seats', amount: '$240.00' },
  { name: 'Sarah Jenkins', detail: 'GA · 2 tickets', amount: '$90.00' },
  { name: 'Marcus Cole', detail: 'GA · 3 tickets', amount: '$135.00' },
  { name: 'Priya Nair', detail: 'Table 7 · 6 seats', amount: '$720.00' },
  { name: 'Dana Whitfield', detail: 'Box A · 2 seats', amount: '$240.00' },
];

const revenueTicker = ['$4,820', '$5,300', '$5,540', '$5,630', '$5,765', '$6,485', '$6,725'];

export function DashboardMock() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!motionOk()) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 2600);
    return () => window.clearInterval(id);
  }, []);
  const sold = Math.min(132 + tick, 160);
  const revenue = revenueTicker[Math.min(tick, revenueTicker.length - 1)];
  const atDoor = Math.min(84 + Math.floor(tick / 2), sold);
  const rows = [0, 1, 2].map((i) => orderFeed[(tick + i) % orderFeed.length]);
  return (
    <div className="lp-frame px-6 py-6 md:px-8">
      <div className="flex items-baseline justify-between">
        <p className="lp-eyebrow text-(--lp-green)">Tonight — Winter Gala</p>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-(--lp-green)">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-(--lp-green)" aria-hidden="true" />
          Live
        </span>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--lp-ink-soft)">Revenue</p>
          <p className="mt-1 font-[family-name:var(--lp-display)] text-3xl font-semibold tabular-nums text-(--lp-ink)">
            {revenue}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--lp-ink-soft)">Sold</p>
          <p className="mt-1 font-[family-name:var(--lp-display)] text-3xl font-semibold tabular-nums text-(--lp-ink)">
            {sold}
            <span className="text-lg text-(--lp-ink-faint)">/160</span>
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--lp-ink-soft)">At the door</p>
          <p className="mt-1 font-[family-name:var(--lp-display)] text-3xl font-semibold tabular-nums text-(--lp-green)">
            {atDoor}
          </p>
        </div>
      </div>
      <div className="mt-5 h-1.5 w-full bg-(--lp-line-soft)">
        <div
          className="h-full bg-(--lp-green) transition-[width] duration-700"
          style={{ width: `${Math.round((sold / 160) * 100)}%` }}
        />
      </div>
      <div className="mt-6 border-t border-(--lp-line-soft) pt-4">
        {rows.map((order, i) => (
          <div
            key={`${order.name}-${tick}`}
            className={`flex items-baseline justify-between py-2 text-[13px] ${i === 0 ? 'animate-[lp-rise_0.5s_var(--lp-ease)_both]' : ''}`}
          >
            <span className="text-(--lp-ink)">{order.name}</span>
            <span
              className="mx-3 hidden flex-1 border-b border-dotted border-(--lp-line-soft) sm:block"
              aria-hidden="true"
            />
            <span className="text-(--lp-ink-soft)">{order.detail}</span>
            <span className="ml-4 font-mono text-xs text-(--lp-green)">{order.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type TableShape = 'circle' | 'square' | 'rect' | 'diamond';

interface FloorTable {
  id: number;
  x: number;
  y: number;
  shape: TableShape;
  status: 'open' | 'booked' | 'held';
}

const TABLE_R = 11;
const BOUNDS = { minX: 20, maxX: 220, minY: 50, maxY: 148 };
const SHAPES: TableShape[] = ['circle', 'square', 'rect', 'diamond'];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function seedTables(): FloorTable[] {
  const placed: { x: number; y: number }[] = [];
  let guard = 0;
  while (placed.length < 9 && guard < 400) {
    guard += 1;
    const x = randomBetween(BOUNDS.minX, BOUNDS.maxX);
    const y = randomBetween(BOUNDS.minY, BOUNDS.maxY);
    if (placed.every((p) => Math.hypot(p.x - x, p.y - y) >= TABLE_R * 2 + 6)) {
      placed.push({ x, y });
    }
  }
  const shuffled = [...placed.keys()].sort(() => Math.random() - 0.5);
  const booked = new Set(shuffled.slice(0, 3));
  const held = shuffled[3];
  return placed.map((p, i) => ({
    id: i,
    x: p.x,
    y: p.y,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    status: i === held ? 'held' : booked.has(i) ? 'booked' : 'open',
  }));
}

function TableShapeSvg({ table }: { table: FloorTable }) {
  const held = table.status === 'held';
  const fill =
    table.status === 'booked' ? 'var(--lp-green)' : held ? 'var(--lp-paper)' : 'var(--lp-ivory)';
  const stroke = held ? 'var(--lp-green)' : 'var(--lp-ink)';
  const strokeWidth = held ? 2.5 : 1.2;
  const r = held ? 13 : TABLE_R;
  const common = { fill, stroke, strokeWidth };
  switch (table.shape) {
    case 'square':
      return <rect x={table.x - r + 1} y={table.y - r + 1} width={(r - 1) * 2} height={(r - 1) * 2} {...common} />;
    case 'rect':
      return <rect x={table.x - r - 2} y={table.y - r + 4} width={(r + 2) * 2} height={(r - 4) * 2} {...common} />;
    case 'diamond':
      return (
        <rect
          x={table.x - r + 2}
          y={table.y - r + 2}
          width={(r - 2) * 2}
          height={(r - 2) * 2}
          transform={`rotate(45 ${table.x} ${table.y})`}
          {...common}
        />
      );
    default:
      return <circle cx={table.x} cy={table.y} r={r} {...common} />;
  }
}

const HOLD_SECONDS = 9 * 60 + 41;

function formatHold(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function FloorPlanMock() {
  const [tables, setTables] = useState<FloorTable[]>(seedTables);
  const [holdLeft, setHoldLeft] = useState(HOLD_SECONDS);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ id: number; dx: number; dy: number } | null>(null);

  useEffect(() => {
    if (!motionOk()) return;
    const id = window.setInterval(() => {
      setHoldLeft((v) => {
        if (v === 1) {
          setTables((prev) => prev.map((t) => (t.status === 'held' ? { ...t, status: 'open' } : t)));
        }
        return v > 0 ? v - 1 : 0;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  function svgPoint(e: React.PointerEvent) {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 240,
      y: ((e.clientY - rect.top) / rect.height) * 170,
    };
  }

  function onDown(e: React.PointerEvent, table: FloorTable) {
    if (table.status !== 'open') return;
    const p = svgPoint(e);
    if (!p) return;
    drag.current = { id: table.id, dx: p.x - table.x, dy: p.y - table.y };
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      void 0;
    }
  }

  function onMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    const p = svgPoint(e);
    if (!p) return;
    const x = Math.min(Math.max(p.x - d.dx, BOUNDS.minX), BOUNDS.maxX);
    const y = Math.min(Math.max(p.y - d.dy, BOUNDS.minY), BOUNDS.maxY);
    setTables((prev) => {
      const collides = prev.some(
        (t) => t.id !== d.id && Math.hypot(t.x - x, t.y - y) < TABLE_R * 2 + 3,
      );
      return collides ? prev : prev.map((t) => (t.id === d.id ? { ...t, x, y } : t));
    });
  }

  function onUp() {
    drag.current = null;
  }

  const held = tables.find((t) => t.status === 'held');
  return (
    <div className="lp-frame px-6 py-6 md:px-8">
      <div className="flex items-baseline justify-between">
        <p className="lp-eyebrow text-(--lp-green)">Floor plan — Grand Hall</p>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--lp-ink-faint)">
          Try it — drag a table
        </span>
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 240 170"
        className="mt-5 w-full touch-none select-none"
        role="img"
        aria-label="Interactive floor plan demo: drag open tables around the stage; booked and held tables stay put"
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        <rect x="60" y="10" width="120" height="22" fill="none" stroke="var(--lp-ink)" strokeWidth="1.5" />
        <text
          x="120"
          y="25"
          textAnchor="middle"
          fontSize="9"
          fill="var(--lp-ink)"
          fontFamily="var(--lp-mono)"
          letterSpacing="2"
        >
          STAGE
        </text>
        {tables.map((table) => (
          <g
            key={table.id}
            onPointerDown={(e) => onDown(e, table)}
            style={{ cursor: table.status === 'open' ? 'grab' : 'not-allowed' }}
          >
            <TableShapeSvg table={table} />
            <text
              x={table.x}
              y={table.y + 2.5}
              textAnchor="middle"
              fontSize="7"
              fill={
                table.status === 'booked'
                  ? 'var(--lp-ivory)'
                  : table.status === 'held'
                    ? 'var(--lp-green)'
                    : 'var(--lp-ink)'
              }
              fontFamily="var(--lp-mono)"
              pointerEvents="none"
            >
              T{table.id + 1}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-4 flex items-center gap-6 border-t border-(--lp-line-soft) pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-(--lp-ink-soft)">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-(--lp-green)" aria-hidden="true" /> Booked
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full border border-(--lp-ink)" aria-hidden="true" /> Open
        </span>
        <span className="ml-auto text-(--lp-green)">
          {held ? `T${held.id + 1} held ${formatHold(holdLeft)}` : 'Hold released'}
        </span>
      </div>
    </div>
  );
}

const doorFeed = [
  { verdict: 'GO', seat: 'Table 12 · Seat 3', name: 'Jordan Reed' },
  { verdict: 'GO', seat: 'GA · Ticket 088', name: 'Sarah Jenkins' },
  { verdict: 'STOP', seat: 'Already scanned 9:12 PM', name: 'Ticket № 000112' },
  { verdict: 'GO', seat: 'Box A · Seat 1', name: 'Dana Whitfield' },
  { verdict: 'GO', seat: 'Table 7 · Seat 5', name: 'Priya Nair' },
];

export function ScannerMock() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!motionOk()) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % doorFeed.length), 2200);
    return () => window.clearInterval(id);
  }, []);
  const scan = doorFeed[i];
  const stop = scan.verdict === 'STOP';
  return (
    <div className="mx-auto w-full max-w-[260px]">
      <div className="border-[1.5px] border-(--lp-ink) bg-(--lp-ink)">
        <div className="flex items-center justify-between px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-(--lp-ivory)/70">
          <span>Door — Main</span>
          <span>9:47 PM</span>
        </div>
        <div
          key={i}
          className="mx-5 mb-4 animate-[lp-rise_0.4s_var(--lp-ease)_both] border px-4 py-8 text-center"
          style={{ borderColor: stop ? 'rgba(255, 138, 128, 0.5)' : 'var(--lp-line-ivory)' }}
        >
          <p
            className="font-[family-name:var(--lp-display)] text-4xl font-semibold"
            style={{ color: stop ? '#FF8A80' : 'var(--lp-green-ivory)' }}
          >
            {scan.verdict}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-(--lp-ivory)/80">
            {scan.seat}
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-(--lp-ivory)/60">{scan.name}</p>
        </div>
        <div className="flex items-center justify-between border-t border-(--lp-line-ivory) px-5 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-(--lp-ivory)/70">
          <span>In: 84/160</span>
          <span className="text-(--lp-green-ivory)">Audited</span>
        </div>
      </div>
    </div>
  );
}
