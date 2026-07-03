import { checkInClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import { formatEpoch } from '@/shared/lib/format';
import type { CheckInLogEntry } from '@/shared/proto/bookings';

export interface CheckInLogFilters {
  method: string;
  status: string;
  page: number;
  pageSize: number;
}

export async function listCheckInLogs(
  eventsId: string,
  filters: CheckInLogFilters,
): Promise<{ logs: CheckInLogEntry[]; totalCount: number }> {
  const response = await callRpc(() =>
    checkInClient.listCheckInLogs({
      eventsId,
      staffUserId: '',
      method: filters.method,
      status: filters.status,
      page: filters.page,
      pageSize: filters.pageSize,
    }),
  );
  return { logs: response.logs, totalCount: response.totalCount };
}

function csvCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function downloadCheckInLogsCsv(eventTitle: string, logs: CheckInLogEntry[]): void {
  const header = ['Time', 'Staff', 'Attendee', 'Booking #', 'Ticket code', 'Ticket type', 'Method', 'Status', 'Failure reason'];
  const rows = logs.map((log) => [
    formatEpoch(Number(log.timestamp)),
    log.staffName,
    log.attendeeName,
    log.bookingNumber,
    log.ticketCode,
    log.ticketTypeLabel,
    log.method,
    log.status,
    log.failureReason,
  ]);
  const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `checkin-logs-${eventTitle.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}
