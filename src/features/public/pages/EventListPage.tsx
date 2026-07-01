import { useCallback, useState, useMemo, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import { listPublicEvents } from '@/features/public/services/publicEventService';
import { Input } from '@/shared/ui/input';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { imageUrl } from '@/shared/upload';
import { Search, Calendar, Sparkles, Filter } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

const NOTCH = { ['--svyne-notch' as string]: 'var(--background)' } as CSSProperties;

const CATEGORIES = ['All', 'Nightlife', 'Concert', 'Festival', 'VIP / Gala', 'Community'];

export function EventListPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const loader = useCallback(() => listPublicEvents(search), [search]);
  const { data, loading, error } = useAsync(loader);

  const filteredEvents = useMemo(() => {
    if (!data) return [];
    if (selectedCategory === 'All') return data;
    return data.filter(e => e.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [data, selectedCategory]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* Hero Banner Grid overlay */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-card to-background p-8 md:p-12 shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/20 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Premium Event Booking Platform
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight font-display md:text-5xl lg:text-6xl text-foreground">
            Find your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-marigold">experience</span>.
          </h1>
          <p className="text-base text-muted-foreground max-w-md">
            Discover and book VIP tables, concerts, festivals, and exclusive community gatherings near you.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/30 pb-4">
        {/* Category tags */}
        <div className="flex flex-wrap gap-2 order-2 md:order-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer border",
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                  : "bg-card text-muted-foreground border-border/60 hover:text-foreground hover:border-neutral-700"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 order-1 md:order-2">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search events, cities, artists…" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="pl-10 h-10 w-full bg-card border-border hover:border-neutral-700 focus:border-primary text-sm rounded-full"
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-center text-destructive">
          {error}
        </div>
      ) : null}

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? [0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
                <Skeleton className="aspect-[16/10] w-full rounded-none" />
                <div className="space-y-3 p-5">
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/3 rounded" />
                </div>
              </div>
            ))
          : filteredEvents.map((event, i) => (
              <Link
                key={event.eventsId}
                to={`/events/${event.slug}`}
                className="svyne-page rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background group"
                style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
              >
                <Card interactive className="group h-full overflow-hidden flex flex-col border border-border bg-card hover:border-neutral-800 transition-all duration-300">
                  {/* Event Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    {event.primaryImageId ? (
                      <img
                        src={imageUrl(event.primaryImageId)}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-card">
                        <Sparkles className="h-8 w-8 text-muted-foreground/30" />
                      </div>
                    )}
                    {/* Glowing status tag overlay */}
                    <div className="absolute top-3 right-3 shrink-0 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-marigold border border-marigold/20">
                      {event.status}
                    </div>
                  </div>

                  {/* Perforation design Stub */}
                  <div className="svyne-ticket-edge mx-5" style={NOTCH} />

                  {/* Event Details Content */}
                  <CardContent className="flex flex-col flex-1 p-5 space-y-3 justify-between bg-card/40">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        <span>Upcoming Event</span>
                      </div>
                      <CardTitle className="text-lg font-bold font-display line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200">
                        {event.title}
                      </CardTitle>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-border/20 pt-3 text-xs">
                      <span className="rounded bg-muted px-2 py-1 text-muted-foreground font-medium">
                        {event.category || 'General'}
                      </span>
                      <span className="text-marigold font-display font-semibold text-sm">
                        Tickets Available
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>

      {/* Empty State */}
      {!loading && filteredEvents.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-16 text-center space-y-4 max-w-md mx-auto">
          <div className="inline-flex p-4 bg-muted/40 rounded-full text-muted-foreground/60">
            <Filter className="h-8 w-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold font-display text-foreground">No events match your criteria</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              We couldn't find any events matching "{search || selectedCategory}". Try clearing your filters or testing another query.
            </p>
          </div>
          <button 
            onClick={() => { setSearch(''); setSelectedCategory('All'); }} 
            className="text-xs text-primary font-bold hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
