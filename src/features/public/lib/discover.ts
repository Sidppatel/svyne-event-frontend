import type { Event } from '@/shared/proto/event';

function epochSeconds(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function pickHeroEvent(events: Event[]): Event | null {
  if (events.length === 0) return null;
  const now = Date.now() / 1000;
  const upcoming = events
    .filter((e) => epochSeconds(e.startDate) > now)
    .sort((a, b) => epochSeconds(a.startDate) - epochSeconds(b.startDate));
  const featured = upcoming.find((e) => e.isFeatured);
  return featured ?? upcoming[0] ?? events[0];
}

export function restOfEvents(events: Event[], hero: Event | null): Event[] {
  if (!hero) return events;
  return events.filter((e) => e.eventsId !== hero.eventsId);
}

export function distinctCategories(events: Event[]): string[] {
  const seen = new Set<string>();
  for (const e of events) {
    if (e.category) seen.add(e.category);
  }
  return Array.from(seen).sort();
}

export function upcomingLabel(startEpoch: string): string | null {
  const start = epochSeconds(startEpoch);
  if (start === 0) return null;
  const now = Date.now() / 1000;
  if (start <= now) return null;
  const days = Math.floor((start - now) / 86400);
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days <= 30) return `In ${days} days`;
  return null;
}

export function minTicketPriceCents(
  tiers: Array<{ priceCents: number; sellingPriceCents?: number }>,
): number | undefined {
  if (tiers.length === 0) return undefined;
  return Math.min(
    ...tiers.map((t) =>
      t.sellingPriceCents && t.sellingPriceCents > 0 && t.sellingPriceCents < t.priceCents
        ? t.sellingPriceCents
        : t.priceCents,
    ),
  );
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  live: boolean;
  past: boolean;
}

export function countdownParts(startEpoch: string, endEpoch: string): CountdownParts {
  const now = Date.now() / 1000;
  const start = epochSeconds(startEpoch);
  const end = epochSeconds(endEpoch);
  if (start <= now && (end === 0 || end > now)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, live: true, past: false };
  }
  if (start <= now) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, live: false, past: true };
  }
  let remain = Math.floor(start - now);
  const days = Math.floor(remain / 86400);
  remain -= days * 86400;
  const hours = Math.floor(remain / 3600);
  remain -= hours * 3600;
  const minutes = Math.floor(remain / 60);
  const seconds = remain - minutes * 60;
  return { days, hours, minutes, seconds, live: false, past: false };
}
