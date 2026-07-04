import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReports } from '@/features/admin/hooks/useReports';
import {
  percentChange,
  bpsToPercentLabel,
  salesVelocityLabel,
  downloadCsv,
  type RangePreset,
  type Bucket,
} from '@/features/admin/services/reportingService';
import { centsToUSD, formatEpoch, formatEventDate } from '@/shared/lib/format';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Skeleton } from '@/shared/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { RevenueLineChart, MetricCard } from '@/features/admin/components/ReportCharts';
import type { EventPerformanceRow, TicketTypeBreakdownRow } from '@/shared/proto/reporting';

function Drilldown({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        'grid overflow-hidden transition-all duration-300 ease-in-out',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

const PRESETS: { value: RangePreset; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'quarter', label: 'This quarter' },
];

const BASIC_BUCKETS: { value: Bucket; label: string }[] = [
  { value: 'day', label: 'Daily' },
  { value: 'week', label: 'Weekly' },
  { value: 'month', label: 'Monthly' },
];

const ADVANCED_BUCKETS: { value: Bucket; label: string }[] = [...BASIC_BUCKETS, { value: 'year', label: 'Yearly' }];

function ProBadge() {
  return <Badge variant="voltage">Pro</Badge>;
}

export function AdminFinancialPage() {
  const { data, loading, error, reload, controls } = useReports();
  const advanced = data?.access.hasAdvancedReporting ?? false;
  const buckets = advanced ? ADVANCED_BUCKETS : BASIC_BUCKETS;

  function exportEventsCsv() {
    if (!data) return;
    downloadCsv(
      'event-performance.csv',
      ['Event', 'Start', 'Status', 'Revenue', 'Orders', 'Tickets', 'Checked in', 'Attendance rate'],
      data.events.rows.map((row) => [
        row.eventTitle,
        formatEventDate(row.eventStartEpochSeconds),
        row.eventStatus,
        centsToUSD(row.revenueCents),
        row.orders,
        row.ticketsSold,
        row.checkedIn,
        bpsToPercentLabel(row.attendanceRateBps),
      ]),
    );
  }

  function exportTicketTypesCsv() {
    if (!data) return;
    downloadCsv(
      'ticket-types.csv',
      ['Ticket type', 'Event', 'Price', 'Quantity sold', 'Revenue'],
      data.ticketTypes.rows.map((row) => [
        row.label,
        row.eventTitle,
        centsToUSD(row.priceCents),
        row.quantitySold,
        centsToUSD(row.revenueCents),
      ]),
    );
  }

  function exportTimeseriesCsv() {
    if (!data) return;
    downloadCsv(
      'revenue-over-time.csv',
      ['Bucket start', 'Revenue', 'Orders', 'Tickets'],
      data.timeseries.points.map((point) => [
        formatEpoch(point.bucketStartEpochSeconds),
        centsToUSD(point.revenueCents),
        point.orders,
        point.ticketsSold,
      ]),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Reports</h1>
          {advanced ? <ProBadge /> : null}
        </div>
        {data ? (
          <p className="text-xs text-muted-foreground">
            Updated {formatEpoch(data.summary.generatedAtEpochSeconds)}
            <Button size="sm" variant="ghost" className="ml-2" onClick={reload}>
              Refresh
            </Button>
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex gap-1">
          {PRESETS.map((preset) => (
            <Button
              key={preset.value}
              size="sm"
              variant={controls.preset === preset.value ? 'default' : 'outline'}
              onClick={() => controls.setPreset(preset.value)}
            >
              {preset.label}
            </Button>
          ))}
          {advanced ? (
            <Button
              size="sm"
              variant={controls.preset === 'custom' ? 'default' : 'outline'}
              onClick={() => controls.setPreset('custom')}
            >
              Custom
            </Button>
          ) : null}
        </div>
        {advanced && controls.preset === 'custom' ? (
          <>
            <div className="space-y-1">
              <Label htmlFor="report-from">From</Label>
              <Input
                id="report-from"
                type="date"
                value={controls.customFrom}
                onChange={(e) => controls.setCustomFrom(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="report-to">To</Label>
              <Input
                id="report-to"
                type="date"
                value={controls.customTo}
                onChange={(e) => controls.setCustomTo(e.target.value)}
              />
            </div>
          </>
        ) : null}
        <div className="space-y-1">
          <Label htmlFor="report-bucket">Granularity</Label>
          <Select
            id="report-bucket"
            className="w-auto"
            value={controls.bucket}
            onChange={(e) => controls.setBucket(e.target.value as Bucket)}
          >
            {buckets.map((bucket) => (
              <option key={bucket.value} value={bucket.value}>
                {bucket.label}
              </option>
            ))}
          </Select>
        </div>
        {advanced ? (
          <label className="flex items-center gap-2 pb-1 text-sm">
            <Switch checked={controls.compareEnabled} onCheckedChange={controls.setCompareEnabled} />
            Compare with previous period
          </label>
        ) : null}
      </div>

      {error ? <p className="text-destructive">{error}</p> : null}
      {loading || !data ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((key) => (
            <Skeleton key={key} className="h-24 rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              label="Total revenue"
              value={centsToUSD(data.summary.revenueCents)}
              changePercent={percentChange(data.summary.revenueCents, data.previousSummary.revenueCents)}
            />
            <MetricCard
              label="Tickets sold"
              value={String(data.summary.ticketsSold)}
              changePercent={percentChange(data.summary.ticketsSold, data.previousSummary.ticketsSold)}
            />
            <MetricCard
              label="Orders"
              value={String(data.summary.orders)}
              changePercent={percentChange(data.summary.orders, data.previousSummary.orders)}
            />
            <MetricCard
              label="Average order value"
              value={centsToUSD(data.summary.averageOrderCents)}
              changePercent={percentChange(data.summary.averageOrderCents, data.previousSummary.averageOrderCents)}
            />
            <MetricCard
              label="Conversion rate"
              value={bpsToPercentLabel(data.summary.conversionBps)}
              changePercent={percentChange(data.summary.conversionBps, data.previousSummary.conversionBps)}
              hint={`${data.summary.visits} visits`}
            />
            {advanced ? (
              <MetricCard
                label="Refunded"
                value={centsToUSD(data.summary.refundedCents)}
                changePercent={percentChange(data.summary.refundedCents, data.previousSummary.refundedCents)}
                hint={`${data.summary.refundedOrders} orders`}
              />
            ) : (
              <MetricCard label="Visits" value={String(data.summary.visits)} changePercent={percentChange(data.summary.visits, data.previousSummary.visits)} />
            )}
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Revenue over time
                {advanced ? <span className="text-xs font-normal text-muted-foreground">with trend line</span> : null}
              </CardTitle>
              {advanced ? (
                <Button size="sm" variant="outline" onClick={exportTimeseriesCsv}>
                  Export CSV
                </Button>
              ) : null}
            </CardHeader>
            <CardContent>
              <RevenueLineChart
                points={data.timeseries.points}
                comparisonPoints={data.comparisonTimeseries?.points}
                bucket={controls.bucket}
                showTrendLine={advanced}
              />
              {data.comparisonTimeseries ? (
                <p className="mt-1 text-xs text-muted-foreground">Dashed line: previous period</p>
              ) : null}
            </CardContent>
          </Card>

          {advanced ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Event performance <ProBadge />
                </CardTitle>
                <Button size="sm" variant="outline" onClick={exportEventsCsv}>
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                {data.events.rows.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">No events in this period.</p>
                ) : (
                  <div className="divide-y">
                    {data.events.rows.map((row) => (
                      <EventRow key={row.eventsId} row={row} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}

          {advanced ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Revenue by ticket type <ProBadge />
                </CardTitle>
                <Button size="sm" variant="outline" onClick={exportTicketTypesCsv}>
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                {data.ticketTypes.rows.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">Nothing to show for this period.</p>
                ) : (
                  <div className="divide-y">
                    {data.ticketTypes.rows.map((row) => (
                      <TicketTypeRow key={`${row.eventTicketTypesId}-${row.eventsId}`} row={row} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}
        </>
      )}
    </div>
  );
}

function EventRow({ row }: { row: EventPerformanceRow }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 py-2 text-left text-sm hover:bg-muted/40"
      >
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open ? 'rotate-180' : '')} />
        <span className="flex-1 font-medium">{row.eventTitle}</span>
        <span className="text-muted-foreground">{formatEventDate(row.eventStartEpochSeconds)}</span>
        <span className="w-24 text-right font-mono">{centsToUSD(row.revenueCents)}</span>
      </button>
      <Drilldown open={open}>
        <div className="grid grid-cols-2 gap-3 border-l-2 border-primary/30 py-3 pl-7 sm:grid-cols-4">
          <Stat label="Status" value={row.eventStatus} />
          <Stat label="Orders" value={String(row.orders)} />
          <Stat label="Tickets" value={String(row.ticketsSold)} />
          <Stat label="Checked in" value={String(row.checkedIn)} />
          <Stat label="Attendance" value={bpsToPercentLabel(row.attendanceRateBps)} />
          <Stat label="Capacity used" value={bpsToPercentLabel(row.capacityUsedBps)} />
          <Stat label="Velocity" value={salesVelocityLabel(row.salesPerDayMilli)} />
          <Stat label="Rev / attendee" value={centsToUSD(row.revenuePerAttendeeCents)} />
          <Stat label="Refunded" value={centsToUSD(row.refundedCents)} />
        </div>
      </Drilldown>
    </div>
  );
}

function TicketTypeRow({ row }: { row: TicketTypeBreakdownRow }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 py-2 text-left text-sm hover:bg-muted/40"
      >
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open ? 'rotate-180' : '')} />
        <span className="flex-1 font-medium">
          {row.label} <span className="text-muted-foreground">— {row.eventTitle}</span>
        </span>
        <span className="w-24 text-right font-mono">{centsToUSD(row.revenueCents)}</span>
      </button>
      <Drilldown open={open}>
        <div className="grid grid-cols-2 gap-3 border-l-2 border-primary/30 py-3 pl-7 sm:grid-cols-4">
          <Stat label="Price" value={centsToUSD(row.priceCents)} />
          <Stat label="Quantity sold" value={String(row.quantitySold)} />
          <Stat label="Refunded qty" value={String(row.refundedQuantity)} />
          <Stat label="Refunded" value={centsToUSD(row.refundedCents)} />
        </div>
      </Drilldown>
    </div>
  );
}
