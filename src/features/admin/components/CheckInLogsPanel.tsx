import { useCallback, useState } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { listCheckInLogs, downloadCheckInLogsCsv } from '@/features/admin/services/checkInLogService';
import { formatEpoch } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { ClipboardCheck, Download } from 'lucide-react';

const PAGE_SIZE = 50;

export function CheckInLogsPanel({ eventsId, eventTitle }: { eventsId: string; eventTitle: string }) {
  const [method, setMethod] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const loader = useCallback(
    () => listCheckInLogs(eventsId, { method, status, page, pageSize: PAGE_SIZE }),
    [eventsId, method, status, page],
  );
  const result = useAsync(loader);
  const logs = result.data?.logs ?? [];
  const totalCount = result.data?.totalCount ?? 0;
  const hasPrevious = page > 1;
  const hasNext = page * PAGE_SIZE < totalCount;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:size-4">
          <ClipboardCheck />
        </span>
        <CardTitle>Check-in log</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <Label>Method</Label>
            <Select
              value={method}
              onChange={(e) => {
                setMethod(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All methods</option>
              <option value="qr_scan">QR scan</option>
              <option value="manual_entry">Manual entry</option>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Result</Label>
            <Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All results</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </Select>
          </div>
          <Button
            size="sm"
            variant="outline"
            disabled={logs.length === 0}
            onClick={() => downloadCheckInLogsCsv(eventTitle, logs)}
          >
            <Download /> Export CSV
          </Button>
          <span className="ml-auto text-sm text-muted-foreground">{totalCount} entries</span>
        </div>

        {result.loading ? <p className="text-sm text-muted-foreground">Loading…</p> : null}
        {!result.loading && logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No check-in activity yet.</p>
        ) : null}

        {logs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Time</th>
                  <th className="py-2 pr-3 font-medium">Staff</th>
                  <th className="py-2 pr-3 font-medium">Attendee</th>
                  <th className="py-2 pr-3 font-medium">Booking #</th>
                  <th className="py-2 pr-3 font-medium">Ticket type</th>
                  <th className="py-2 pr-3 font-medium">Method</th>
                  <th className="py-2 font-medium">Result</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.checkinLogsId} className="border-b border-border/50">
                    <td className="py-2 pr-3 whitespace-nowrap tabular-nums">{formatEpoch(Number(log.timestamp))}</td>
                    <td className="py-2 pr-3">{log.staffName}</td>
                    <td className="py-2 pr-3">{log.attendeeName}</td>
                    <td className="py-2 pr-3">{log.bookingNumber}</td>
                    <td className="py-2 pr-3">{log.ticketTypeLabel}</td>
                    <td className="py-2 pr-3">{log.method === 'qr_scan' ? 'QR scan' : 'Manual'}</td>
                    <td className="py-2">
                      {log.status === 'success' ? (
                        <span className="text-success">Success</span>
                      ) : (
                        <span className="text-destructive">{log.failureReason || 'Failed'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {hasPrevious || hasNext ? (
          <div className="flex items-center justify-end gap-2">
            <Button size="sm" variant="ghost" disabled={!hasPrevious} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">Page {page}</span>
            <Button size="sm" variant="ghost" disabled={!hasNext} onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
