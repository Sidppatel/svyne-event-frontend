import type { Event, EventStats } from '@/shared/proto/event';
import { centsToUSD } from '@/shared/lib/format';

export interface Greeting {
  title: string;
  blurb: string;
  phase: 'morning' | 'afternoon' | 'evening';
}

export type EventState = 'live' | 'draft' | 'past' | 'cancelled';

export interface EventCardVM {
  eventsId: string;
  title: string;
  category: string;
  primaryImageId: string;
  state: EventState;
  statusLabel: string;
  dateLabel: string;
  timingLabel: string;
  soldLabel: string;
  capacityPct: number;
  revenueUSD: string;
  startSeconds: number;
}

export interface EventWithStats {
  event: Event;
  stats: EventStats | null;
}

const DAY = 86400;

function firstNameOrFriend(firstName: string): string {
  const name = firstName.trim();
  return name.length > 0 ? name : 'there';
}

export function buildGreeting(firstName: string, activeEvents: number, attendees: number, now: Date): Greeting {
  const name = firstNameOrFriend(firstName);
  const hour = now.getHours();
  const day = now.getDay();

  let title: string;
  let phase: Greeting['phase'];
  if (hour < 12) {
    title = `Good morning, ${name}`;
    phase = 'morning';
  } else if (hour < 18) {
    title = `Good afternoon, ${name}`;
    phase = 'afternoon';
  } else {
    title = `Good evening, ${name}`;
    phase = 'evening';
  }
  if (day === 1) {
    title = `Ready for a great week, ${name}?`;
  } else if (day === 5) {
    title = `Almost the weekend, ${name}!`;
  }

  let blurb: string;
  if (activeEvents === 0) {
    blurb = 'Quiet stretch — a good moment to plan your next event.';
  } else if (activeEvents >= 4) {
    blurb = `Busy season — ${activeEvents} events live and ${attendees.toLocaleString()} people counting on you. You've got this.`;
  } else {
    const evt = activeEvents === 1 ? '1 event' : `${activeEvents} events`;
    const ppl = attendees === 1 ? '1 guest' : `${attendees.toLocaleString()} guests`;
    blurb = `${evt} live right now, ${ppl} registered so far.`;
  }

  return { title, blurb, phase };
}

function stateOf(event: Event, endSeconds: number, now: number): EventState {
  if (event.status === 'Cancelled') return 'cancelled';
  if (endSeconds > 0 && endSeconds < now) return 'past';
  if (event.status === 'Published') return 'live';
  return 'draft';
}

export function eventState(event: Event, now: Date): EventState {
  const nowSec = Math.floor(now.getTime() / 1000);
  return stateOf(event, Number(event.endDate) || 0, nowSec);
}

export type EventFilter = 'all' | 'upcoming' | 'past' | 'draft';

export function filterEvents(events: Event[], filter: EventFilter, search: string, now: Date): Event[] {
  const term = search.trim().toLowerCase();
  return events.filter((event) => {
    const state = eventState(event, now);
    if (filter === 'upcoming' && state !== 'live') return false;
    if (filter === 'past' && state !== 'past' && state !== 'cancelled') return false;
    if (filter === 'draft' && state !== 'draft') return false;
    if (term.length === 0) return true;
    return event.title.toLowerCase().includes(term) || event.category.toLowerCase().includes(term);
  });
}

export interface EventCounts {
  total: number;
  active: number;
}

export function countEvents(events: Event[], now: Date): EventCounts {
  let active = 0;
  for (const event of events) {
    if (eventState(event, now) === 'live') active += 1;
  }
  return { total: events.length, active };
}

function timingLabel(state: EventState, startSeconds: number, now: number): string {
  if (state === 'past') return 'Ended';
  if (state === 'cancelled') return 'Cancelled';
  if (startSeconds <= 0) return 'No date set';
  const diff = startSeconds - now;
  if (diff <= 0) return 'Happening now';
  const days = Math.ceil(diff / DAY);
  if (days === 1) return 'Tomorrow';
  if (days <= 14) return `${days} days away`;
  const weeks = Math.round(days / 7);
  return `${weeks} weeks away`;
}

function statusLabel(state: EventState): string {
  if (state === 'live') return 'Live';
  if (state === 'past') return 'Past';
  if (state === 'cancelled') return 'Cancelled';
  return 'Draft';
}

function soldLabel(sold: number, capacity: number): string {
  if (capacity <= 0) return `${sold.toLocaleString()} sold`;
  return `${sold.toLocaleString()} / ${capacity.toLocaleString()} sold`;
}

function pct(sold: number, capacity: number): number {
  if (capacity <= 0) return 0;
  const raw = Math.round((sold / capacity) * 100);
  return Math.max(0, Math.min(100, raw));
}

function dateLabel(startSeconds: number): string {
  if (startSeconds <= 0) return 'Date TBA';
  return new Date(startSeconds * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function toEventCardVM(entry: EventWithStats, now: Date): EventCardVM {
  const { event, stats } = entry;
  const nowSec = Math.floor(now.getTime() / 1000);
  const startSeconds = Number(event.startDate) || 0;
  const endSeconds = Number(event.endDate) || 0;
  const state = stateOf(event, endSeconds, nowSec);
  const sold = stats?.ticketsSold ?? 0;
  const capacity = event.totalCapacity;

  return {
    eventsId: event.eventsId,
    title: event.title,
    category: event.category,
    primaryImageId: event.primaryImageId,
    state,
    statusLabel: statusLabel(state),
    dateLabel: dateLabel(startSeconds),
    timingLabel: timingLabel(state, startSeconds, nowSec),
    soldLabel: soldLabel(sold, capacity),
    capacityPct: pct(sold, capacity),
    revenueUSD: centsToUSD(stats?.revenueCents ?? '0'),
    startSeconds,
  };
}

function rankScore(vm: EventCardVM): number {
  if (vm.state === 'live') return 0;
  if (vm.state === 'draft') return 1;
  if (vm.state === 'past') return 2;
  return 3;
}

export function toDashboardCards(entries: EventWithStats[], now: Date): EventCardVM[] {
  return entries
    .map((entry) => toEventCardVM(entry, now))
    .sort((a, b) => {
      const byState = rankScore(a) - rankScore(b);
      if (byState !== 0) return byState;
      return a.startSeconds - b.startSeconds;
    });
}

export interface UpcomingItem {
  eventsId: string;
  title: string;
  dateLabel: string;
  timingLabel: string;
  soldLabel: string;
}

export function upcomingWeek(cards: EventCardVM[], now: Date): UpcomingItem[] {
  const nowSec = Math.floor(now.getTime() / 1000);
  const horizon = nowSec + DAY * 7;
  return cards
    .filter((c) => c.state !== 'past' && c.state !== 'cancelled' && c.startSeconds > nowSec && c.startSeconds <= horizon)
    .sort((a, b) => a.startSeconds - b.startSeconds)
    .map((c) => ({
      eventsId: c.eventsId,
      title: c.title,
      dateLabel: c.dateLabel,
      timingLabel: c.timingLabel,
      soldLabel: c.soldLabel,
    }));
}
