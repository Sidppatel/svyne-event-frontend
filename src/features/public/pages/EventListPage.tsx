import { useCallback, useMemo, useState } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { listPublicEvents } from '@/features/public/services/publicEventService';
import { pickHeroEvent, restOfEvents, distinctCategories } from '@/features/public/lib/discover';
import { HeroEvent } from '@/features/public/components/discover/HeroEvent';
import { EventCard } from '@/features/public/components/discover/EventCard';
import { FilterBar } from '@/features/public/components/discover/FilterBar';
import { Skeleton } from '@/shared/ui/skeleton';
import { CalendarX } from 'lucide-react';

export function EventListPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const debouncedSearch = useDebouncedValue(search);

  const loader = useCallback(
    () => listPublicEvents(debouncedSearch, category === 'All' ? '' : category),
    [debouncedSearch, category],
  );
  const { data, loading, error } = useAsync(loader);

  const categoriesLoader = useCallback(() => listPublicEvents('', ''), []);
  const { data: allEvents } = useAsync(categoriesLoader);
  const categories = useMemo(() => (allEvents ? distinctCategories(allEvents) : []), [allEvents]);

  const isUnfiltered = !debouncedSearch && category === 'All';
  const hero = useMemo(() => (isUnfiltered && data ? pickHeroEvent(data) : null), [data, isUnfiltered]);
  const gridEvents = useMemo(() => (data ? restOfEvents(data, hero) : []), [data, hero]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 py-4">
      {loading && !data ? (
        <Skeleton className="h-[420px] w-full rounded-2xl md:h-[520px]" />
      ) : hero ? (
        <HeroEvent event={hero} />
      ) : null}

      <FilterBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
        search={search}
        onSearch={setSearch}
      />

      {error ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-center text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {gridEvents.length > 0 || loading ? (
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            {isUnfiltered ? 'Coming up' : 'Results'}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? [0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="overflow-hidden rounded-lg border border-hairline bg-surface">
                    <Skeleton className="aspect-[16/10] w-full rounded-none" />
                    <div className="space-y-3 p-5">
                      <Skeleton className="h-4 w-1/3 rounded" />
                      <Skeleton className="h-6 w-3/4 rounded" />
                    </div>
                  </div>
                ))
              : gridEvents.map((event, i) => <EventCard key={event.eventsId} event={event} index={i} />)}
          </div>
        </section>
      ) : null}

      {!loading && !hero && gridEvents.length === 0 && !error ? (
        <div className="mx-auto max-w-md space-y-4 rounded-lg border border-dashed border-hairline-strong p-16 text-center">
          <div className="inline-flex rounded-full bg-surface-sunken p-4 text-ink-faint">
            <CalendarX className="h-8 w-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-display text-lg font-semibold text-ink">Nothing on the calendar yet</h3>
            <p className="mx-auto max-w-xs text-sm text-ink-soft">
              {debouncedSearch || category !== 'All'
                ? 'No events match your filters. Try widening the search.'
                : 'New events are announced here first — check back soon.'}
            </p>
          </div>
          {debouncedSearch || category !== 'All' ? (
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
              }}
              className="cursor-pointer text-sm font-semibold text-brand hover:underline"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
