import type { Event, EventStats } from '@/shared/proto/event';

export type Tone = 'brand' | 'success' | 'gold' | 'muted';

export type SectionId = 'basics' | 'layout' | 'pricing' | 'timeline' | 'staff' | 'preview';

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
  weight: 'critical' | 'recommended' | 'optional';
  section: SectionId;
}

export interface EventCompletion {
  items: ChecklistItem[];
  percent: number;
  canPublish: boolean;
}

export interface EventVoice {
  headline: string;
  tone: Tone;
}

export interface Suggestion {
  id: string;
  text: string;
  actionLabel: string;
  section: SectionId;
}

export interface InsightInput {
  hasTicketTypes: boolean;
  hasFloorTables: boolean;
  staffCount: number;
}

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

function isPast(event: Event): boolean {
  return Number(event.endDate) > 0 && Number(event.endDate) < nowSeconds();
}

function isSoldOut(event: Event, stats: EventStats | null): boolean {
  return event.totalCapacity > 0 && stats != null && stats.ticketsSold >= event.totalCapacity;
}

function sellsTables(event: Event): boolean {
  return event.eventType === 'Table';
}

export function buildCompletion(event: Event, input: InsightInput): EventCompletion {
  const canPublish = input.hasTicketTypes || input.hasFloorTables;
  const items: ChecklistItem[] = [
    { id: 'name', label: 'Event name', done: event.title.trim().length > 0, weight: 'critical', section: 'basics' },
    {
      id: 'when',
      label: 'Date & time',
      done: Number(event.startDate) > 0 && Number(event.endDate) > 0,
      weight: 'critical',
      section: 'basics',
    },
    { id: 'venue', label: 'Venue', done: event.venuesId.trim().length > 0, weight: 'critical', section: 'basics' },
    {
      id: 'sell',
      label: sellsTables(event) ? 'Add tables to the floor plan' : 'Add ticket types',
      done: canPublish,
      weight: 'critical',
      section: sellsTables(event) ? 'layout' : 'pricing',
    },
    {
      id: 'desc',
      label: 'Event description',
      done: event.description.trim().length > 20,
      weight: 'recommended',
      section: 'basics',
    },
    { id: 'image', label: 'Cover image', done: event.imagePath.trim().length > 0, weight: 'recommended', section: 'timeline' },
    { id: 'category', label: 'Category', done: event.category.trim().length > 0, weight: 'optional', section: 'basics' },
  ];
  const done = items.filter((item) => item.done).length;
  const percent = Math.round((done / items.length) * 100);
  return { items, percent, canPublish };
}

export function buildVoice(event: Event, stats: EventStats | null, completion: EventCompletion): EventVoice {
  if (event.status === 'Cancelled') {
    return { headline: 'This event is cancelled. You can always spin up a new one when you’re ready.', tone: 'muted' };
  }
  if (isPast(event)) {
    return { headline: 'That’s a wrap! Your event has ended — dive into the attendance and revenue below.', tone: 'brand' };
  }
  if (event.status === 'Published' && isSoldOut(event, stats)) {
    return { headline: 'Sold out! Every seat is spoken for — incredible work.', tone: 'gold' };
  }
  if (event.status === 'Published') {
    const booked = stats?.totalBookings ?? 0;
    const headline =
      booked > 0
        ? `Your event is live and ${booked} ${booked === 1 ? 'booking is' : 'bookings are'} already in.`
        : 'Your event is live! Share the link and watch the bookings roll in.';
    return { headline, tone: 'success' };
  }
  if (completion.percent >= 80) {
    return { headline: 'Almost there! One last pass and you’re ready to publish.', tone: 'gold' };
  }
  if (completion.percent >= 40) {
    return { headline: 'You’re on the right track. A few more details and this event comes to life.', tone: 'brand' };
  }
  return { headline: 'Fresh canvas. Let’s build something people will want to show up for.', tone: 'brand' };
}

export function buildSuggestions(
  event: Event,
  stats: EventStats | null,
  input: InsightInput,
  completion: EventCompletion,
): Suggestion[] {
  if (isPast(event)) {
    return [{ id: 'thank', text: 'Your event is over. Review the analytics and thank your attendees.', actionLabel: 'View stats', section: 'preview' }];
  }
  const out: Suggestion[] = [];
  if (!completion.canPublish) {
    out.push({
      id: 'sell',
      text: sellsTables(event)
        ? 'Tables are the heart of a floor-plan event. Place your first one to unlock publishing.'
        : 'Tickets are the heart of your event. Create your first ticket type to unlock publishing.',
      actionLabel: 'Set it up',
      section: sellsTables(event) ? 'layout' : 'pricing',
    });
  }
  if (event.description.trim().length <= 20) {
    out.push({ id: 'desc', text: 'A good description sells tickets. Add a few lines about what makes this event special.', actionLabel: 'Write it', section: 'basics' });
  }
  if (event.imagePath.trim().length === 0) {
    out.push({ id: 'img', text: 'Events with a cover image draw far more clicks. Upload one to stand out.', actionLabel: 'Add media', section: 'timeline' });
  }
  if (isSoldOut(event, stats)) {
    out.push({ id: 'vip', text: 'You’re sold out! Consider a premium or waitlist tier to capture the extra demand.', actionLabel: 'Add a tier', section: 'pricing' });
  }
  if (input.staffCount === 0 && completion.canPublish) {
    out.push({ id: 'staff', text: 'No staff assigned yet. Add team members so check-in runs smoothly on the day.', actionLabel: 'Assign staff', section: 'staff' });
  }
  return out;
}
