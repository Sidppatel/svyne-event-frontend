import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import { listEventsForStaff } from '@/features/staff/services/staffService';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Calendar, MapPin, Scan, Sparkles } from 'lucide-react';

export default function StaffDashboardPage() {
  const navigate = useNavigate();
  const eventsLoader = useCallback(() => listEventsForStaff(), []);
  const events = useAsync(eventsLoader);

  function formatDate(epoch: number) {
    return new Intl.DateTimeFormat('default', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(epoch * 1000));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Staff Portal
          </h1>
          <p className="text-sm text-muted-foreground">
            Select an event to manage check-ins.
          </p>
        </div>
      </div>

      {events.loading ? (
        <p className="text-muted-foreground text-center py-12">Loading assigned events...</p>
      ) : events.error ? (
        <p className="text-destructive text-center py-12">{events.error}</p>
      ) : (events.data ?? []).length === 0 ? (
        <Card className="border-dashed border-2 py-12 text-center">
          <CardContent className="space-y-3">
            <Sparkles className="h-10 w-10 mx-auto text-muted-foreground/60" />
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">No Active Events</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                You are not currently assigned to any active events within the check-in window (24 hours before/after).
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {(events.data ?? []).map((ev) => (
            <Card key={ev.eventsId} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="font-display text-lg font-bold leading-tight">
                      {ev.title}
                    </CardTitle>
                    <p className="text-xs uppercase tracking-wider font-semibold text-primary">
                      {ev.status}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                    <span>{formatDate(Number(ev.startDate))}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                    <span>{ev.venueName || 'Online/TBD'}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate(`/staff/${ev.eventsId}`)}
                  className="w-full gap-2 font-semibold"
                >
                  <Scan className="h-4 w-4" />
                  Launch Check-In
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
