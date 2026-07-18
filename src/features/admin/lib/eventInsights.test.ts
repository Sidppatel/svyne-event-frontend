import type { Event } from '@/shared/proto/event';
import { buildCompletion, publishBlockers } from './eventInsights';

const base = {
  eventsId: 'e1',
  title: 'Gala',
  category: 'Music',
  venuesId: 'v1',
  description: '',
  imagePath: '',
  slug: '',
  status: 'Draft',
  eventType: 'Open',
  startDate: '1',
  endDate: '2',
  totalCapacity: 0,
} as unknown as Event;

export function demo(): void {
  console.assert(publishBlockers(base).length === 0, 'complete event has no blockers');
  console.assert(publishBlockers({ ...base, title: '   ' } as Event)[0] === 'Title is required', 'whitespace title invalid');
  console.assert(publishBlockers({ ...base, category: '' } as Event)[0] === 'Category is required', 'blank category invalid');
  console.assert(publishBlockers({ ...base, venuesId: '' } as Event)[0] === 'Venue is required', 'blank venue invalid');

  const full = buildCompletion(base, { hasTicketTypes: true, hasFloorTables: false, staffCount: 0 });
  console.assert(full.canPublish, 'publishable when fields and ticket types present');

  const noTickets = buildCompletion(base, { hasTicketTypes: false, hasFloorTables: false, staffCount: 0 });
  console.assert(!noTickets.canPublish && noTickets.missing.length === 1, 'blocked without ticket types');
}

demo();
