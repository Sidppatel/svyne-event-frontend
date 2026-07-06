import { useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import { getTenant } from '@/features/developer/services/developerService';
import {
  getTenantDashboard,
  tenantRevenueBarPercents,
  ticketsOfCapacity,
  tierLabel,
  type TenantDashboard,
  type TenantDashboardEventRow,
} from '@/features/developer/services/developerBillingService';
import { rpcErrorMessage } from '@/shared/session';
import { centsToUSD, formatEpoch } from '@/shared/lib/format';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';
import { TenantSettingsPanel, TenantMembersPanel } from '@/features/developer/pages/TenantPanels';

export function DeveloperTenantDashboardPage() {
  const { tenantsId = '' } = useParams();
  const tenantLoader = useCallback(() => getTenant(tenantsId), [tenantsId]);
  const dashLoader = useCallback(() => getTenantDashboard(tenantsId), [tenantsId]);
  const tenant = useAsync(tenantLoader);
  const dash = useAsync(dashLoader);

  return (
    <div className="space-y-6">
      <Link to="/tenants" className="text-sm text-primary">
        ← Back to tenants
      </Link>

      {tenant.error ? <p className="text-sm text-destructive">{rpcErrorMessage(tenant.error)}</p> : null}
      {dash.error ? <p className="text-sm text-destructive">{rpcErrorMessage(dash.error)}</p> : null}
      {tenant.loading || dash.loading ? <p className="text-sm text-muted-foreground">Loading…</p> : null}

      {tenant.data && dash.data ? (
        <>
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-semibold tracking-tight">{tenant.data.name}</h1>
              <span className="text-muted-foreground">/{tenant.data.slug}</span>
              {dash.data.tier ? <Badge variant="neutral">{tierLabel(dash.data.tier)}</Badge> : null}
              {tenant.data.archived ? <Badge variant="danger">Archived</Badge> : null}
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatCard label="Events" value={String(dash.data.eventCount)} />
              <StatCard label="Revenue" value={centsToUSD(dash.data.totalRevenueCents)} />
              <StatCard label="Tickets sold" value={String(dash.data.totalTicketsSold)} />
              <StatCard label="Tax collected" value={centsToUSD(dash.data.totalTaxCents)} />
            </div>
          </header>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="tax">Tax</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <StatCard label="Revenue this month" value={centsToUSD(dash.data.revenueThisMonthCents)} />
                <StatCard label="Revenue last month" value={centsToUSD(dash.data.revenueLastMonthCents)} />
              </div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Recent events</CardTitle>
                </CardHeader>
                <CardContent>
                  <EventTable rows={dash.data.events.slice(0, 5)} />
                </CardContent>
              </Card>
              <RevenueTrendCard dash={dash.data} />
              <TaxByVenueCard dash={dash.data} />
            </TabsContent>

            <TabsContent value="events">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    All events created by this tenant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EventTable rows={dash.data.events} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <StatCard label="Total revenue" value={centsToUSD(dash.data.totalRevenueCents)} />
                <StatCard label="This month" value={centsToUSD(dash.data.revenueThisMonthCents)} />
                <StatCard label="Average per ticket" value={centsToUSD(dash.data.avgTicketCents)} />
              </div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Revenue by event</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <tbody>
                      {dash.data.events.map((row) => (
                        <tr key={row.eventsId} className="border-t">
                          <td className="py-1.5">{row.eventTitle}</td>
                          <td className="py-1.5 text-right font-mono">{centsToUSD(row.revenueCents)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              <RevenueTrendCard dash={dash.data} />
            </TabsContent>

            <TabsContent value="tax" className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <StatCard label="Total tax" value={centsToUSD(dash.data.totalTaxCents)} />
                <StatCard label="Tax this month" value={centsToUSD(dash.data.taxThisMonthCents)} />
              </div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Tax by event</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <tbody>
                      {dash.data.events.map((row) => (
                        <tr key={row.eventsId} className="border-t">
                          <td className="py-1.5">{row.eventTitle}</td>
                          <td className="py-1.5 text-right font-mono">{centsToUSD(row.taxCollectedCents)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              <TaxByVenueCard dash={dash.data} />
            </TabsContent>

            <TabsContent value="staff">
              <TenantMembersPanel tenantsId={tenantsId} />
            </TabsContent>

            <TabsContent value="settings">
              <TenantSettingsPanel tenantsId={tenantsId} />
            </TabsContent>
          </Tabs>
        </>
      ) : null}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-semibold">{value}</CardContent>
    </Card>
  );
}

function EventTable({ rows }: { rows: TenantDashboardEventRow[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">This tenant hasn't created any events yet.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-muted-foreground">
          <tr>
            <th className="py-1">Event</th>
            <th className="py-1">Venue</th>
            <th className="py-1">Date</th>
            <th className="py-1">Status</th>
            <th className="py-1 text-right">Revenue</th>
            <th className="py-1 text-right">Tickets</th>
            <th className="py-1 text-right">Tax</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.eventsId} className="border-t">
              <td className="py-1.5">{row.eventTitle}</td>
              <td className="py-1.5 text-muted-foreground">{row.venueName}</td>
              <td className="py-1.5 text-muted-foreground">{formatEpoch(row.startDateEpochSeconds)}</td>
              <td className="py-1.5 text-muted-foreground">{row.status}</td>
              <td className="py-1.5 text-right font-mono">{centsToUSD(row.revenueCents)}</td>
              <td className="py-1.5 text-right font-mono">{ticketsOfCapacity(row)}</td>
              <td className="py-1.5 text-right font-mono">{centsToUSD(row.taxCollectedCents)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RevenueTrendCard({ dash }: { dash: TenantDashboard }) {
  const bars = tenantRevenueBarPercents(dash.revenueByMonth);
  if (bars.length === 0) {
    return null;
  }
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">Revenue by month (12 months)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-32 items-end gap-1" role="img" aria-label="Monthly revenue trend">
          {bars.map((bar, index) => (
            <div
              key={dash.revenueByMonth[index].bucketStartEpochSeconds}
              className="flex-1 rounded-t bg-primary/70"
              style={{ height: `${bar.heightPct}%` }}
              title={`${formatEpoch(dash.revenueByMonth[index].bucketStartEpochSeconds)}: ${bar.total}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TaxByVenueCard({ dash }: { dash: TenantDashboard }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">Tax by venue</CardTitle>
      </CardHeader>
      <CardContent>
        {dash.taxByVenue.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tax collected yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>
                <th className="pb-1">Venue</th>
                <th className="pb-1">State</th>
                <th className="pb-1 text-right">Tax collected</th>
                <th className="pb-1 text-right">Orders</th>
              </tr>
            </thead>
            <tbody>
              {dash.taxByVenue.map((row) => (
                <tr key={row.venueName} className="border-t">
                  <td className="py-1.5">{row.venueName}</td>
                  <td className="py-1.5 text-muted-foreground">{row.state || '—'}</td>
                  <td className="py-1.5 text-right font-mono">{centsToUSD(row.taxCollectedCents)}</td>
                  <td className="py-1.5 text-right font-mono">{row.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
