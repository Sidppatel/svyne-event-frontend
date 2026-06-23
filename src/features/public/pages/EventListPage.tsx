import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import { listPublicEvents } from '@/features/public/services/publicEventService';
import { Input } from '@/shared/ui/input';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';

export function EventListPage() {
  const [search, setSearch] = useState('');
  const loader = useCallback(() => listPublicEvents(search), [search]);
  const { data, loading, error } = useAsync(loader);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Upcoming events</h1>
      <Input placeholder="Search events…" value={search} onChange={(e) => setSearch(e.target.value)} />
      {loading ? <p className="text-gray-500">Loading…</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((event) => (
          <Link key={event.eventsId} to={`/events/${event.slug}`}>
            <Card>
              <CardContent className="space-y-1">
                <CardTitle>{event.title}</CardTitle>
                <p className="text-sm text-gray-500">{event.category}</p>
                <p className="text-sm text-gray-400">{event.status}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {!loading && (data ?? []).length === 0 ? <p className="text-gray-500">No events found.</p> : null}
    </div>
  );
}
