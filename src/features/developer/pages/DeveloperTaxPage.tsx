import { useCallback, useState } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { rpcErrorMessage } from '@/shared/session';
import { formatEpoch } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  formatRatePercent,
  listTaxOverrides,
  setEventTaxOverride,
  clearEventTaxOverride,
  taxOverrideLabel,
  percentToBps,
  listVenueTaxSummaries,
  refreshAllTaxRates,
  lookupTaxRateMessage,
  cityLocalRatePercent,
  filterVenueSummaries,
  groupVenuesByTenant,
  type TaxOverrideRow,
} from '@/features/developer/services/developerBillingService';
import { TaxRatesPanel } from '@/features/developer/components/TaxRatesPanel';

export function DeveloperTaxPage() {
  const summaryLoader = useCallback(() => listVenueTaxSummaries(), []);
  const summary = useAsync(summaryLoader);

  const overridesLoader = useCallback(() => listTaxOverrides(), []);
  const overrides = useAsync(overridesLoader);
  const [eventsId, setEventsId] = useState('');
  const [exempt, setExempt] = useState(false);
  const [ratePercent, setRatePercent] = useState('');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const [refreshing, setRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedTenants, setCollapsedTenants] = useState<Record<string, boolean>>({});

  async function runRefresh(action: () => Promise<string>) {
    setRefreshing(true);
    setRefreshMessage(null);
    try {
      setRefreshMessage(await action());
      summary.reload();
    } catch (caught) {
      setRefreshMessage(`Error: ${rpcErrorMessage(caught)}`);
    } finally {
      setRefreshing(false);
    }
  }

  async function runAction(action: () => Promise<string>) {
    setBusy(true);
    setActionError(null);
    setActionMessage(null);
    try {
      setActionMessage(await action());
      overrides.reload();
    } catch (caught) {
      setActionError(rpcErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  function onApplyOverride(event: React.FormEvent) {
    event.preventDefault();
    void runAction(() =>
      setEventTaxOverride(eventsId.trim(), exempt, exempt ? 0 : percentToBps(ratePercent), reason),
    );
  }

  function onClearOverride(row: TaxOverrideRow) {
    const clearReason = window.prompt(`Clear the tax override on "${row.eventTitle}". Reason:`);
    if (clearReason === null) return;
    void runAction(() => clearEventTaxOverride(row.eventsId, clearReason));
  }

  const toggleTenant = (tenantName: string) => {
    setCollapsedTenants((prev) => ({ ...prev, [tenantName]: !prev[tenantName] }));
  };

  const filteredTenants = groupVenuesByTenant(filterVenueSummaries(summary.data ?? [], searchQuery));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Tax Management</h1>
          <p className="text-sm text-ink-soft">Review and update tax rate breakdowns by tenant and venue.</p>
          {refreshMessage ? (
            <p className="mt-1 text-xs font-medium text-success">{refreshMessage}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tenants, venues, cities, zip codes..."
            className="w-72"
          />
          <Button
            variant="default"
            onClick={() => void runRefresh(() => refreshAllTaxRates())}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing…' : 'Refresh All Tax Rates'}
          </Button>
        </div>
      </div>

      <TaxRatesPanel />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Tax overrides</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-ink-soft">
            Exempt a qualifying event from tax or replace the venue-zip rate with a manual combined
            rate. Overrides win over the SalesTaxZip cache.
          </p>
          <form className="flex flex-wrap items-end gap-2" onSubmit={onApplyOverride}>
            <label className="text-sm">
              Event ID
              <Input
                className="mt-1 w-80"
                value={eventsId}
                onChange={(event) => setEventsId(event.target.value)}
                placeholder="uuid"
                required
              />
            </label>
            <label className="flex items-center gap-2 pb-2 text-sm">
              <input
                type="checkbox"
                checked={exempt}
                onChange={(event) => setExempt(event.target.checked)}
              />
              Tax exempt
            </label>
            {exempt ? null : (
              <label className="text-sm">
                Rate %
                <Input
                  className="mt-1 w-24"
                  value={ratePercent}
                  onChange={(event) => setRatePercent(event.target.value)}
                  inputMode="decimal"
                  required
                />
              </label>
            )}
            <label className="text-sm">
              Reason (required)
              <Input
                className="mt-1 w-64"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="e.g. 501(c)(3) exemption certificate"
                required
              />
            </label>
            <Button type="submit" disabled={busy}>
              Apply
            </Button>
          </form>
          {actionMessage ? <p className="text-sm text-success">{actionMessage}</p> : null}
          {actionError ? <p className="text-sm text-destructive">{actionError}</p> : null}
          {overrides.error ? (
            <p className="text-sm text-destructive">{rpcErrorMessage(overrides.error)}</p>
          ) : null}
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft">
                <th className="pb-2">Tenant</th>
                <th className="pb-2">Event</th>
                <th className="pb-2 text-right">Tax</th>
                <th className="pb-2 text-right">Updated</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {(overrides.data ?? []).map((row) => (
                <tr key={row.eventsId} className="border-t border-hairline">
                  <td className="py-1.5">{row.tenantName}</td>
                  <td className="py-1.5">{row.eventTitle}</td>
                  <td className="py-1.5 text-right font-mono">{taxOverrideLabel(row)}</td>
                  <td className="py-1.5 text-right text-ink-soft">
                    {formatEpoch(row.updatedAtEpochSeconds)}
                  </td>
                  <td className="py-1.5 text-right">
                    <Button size="sm" variant="ghost" disabled={busy} onClick={() => onClearOverride(row)}>
                      Clear
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {overrides.data && overrides.data.length === 0 ? (
            <p className="text-sm text-ink-soft">No tax overrides.</p>
          ) : null}
        </CardContent>
      </Card>

      {summary.loading ? (
        <div className="animate-pulse text-sm text-ink-soft">Loading tenants and venue tax rates…</div>
      ) : summary.error ? (
        <div className="text-sm text-destructive">Failed to load tax data: {rpcErrorMessage(summary.error)}</div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Tenants & Venues breakdown</h2>
          {Object.keys(filteredTenants).length === 0 ? (
            <p className="text-sm text-ink-soft">No tenants or venues match your search query.</p>
          ) : (
            Object.entries(filteredTenants).map(([tenantName, venues]) => {
              const isCollapsed = collapsedTenants[tenantName] ?? false;
              return (
                <Card key={tenantName} className="overflow-hidden">
                  <CardHeader
                    className="flex flex-row items-center justify-between bg-muted/30 py-3 px-4 cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => toggleTenant(tenantName)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-ink-soft font-mono">
                        {isCollapsed ? '▶' : '▼'}
                      </span>
                      <CardTitle className="text-sm font-semibold">{tenantName}</CardTitle>
                    </div>
                    <span className="text-xs text-ink-soft">{venues.length} venue(s)</span>
                  </CardHeader>
                  {!isCollapsed && (
                    <CardContent className="p-0 border-t border-hairline">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/10 text-left text-xs font-semibold text-ink-soft uppercase tracking-wider">
                            <th className="py-2.5 px-4">Venue & Address</th>
                            <th className="py-2.5 px-2 text-right">Combined</th>
                            <th className="py-2.5 px-2 text-right">State</th>
                            <th className="py-2.5 px-2 text-right">County</th>
                            <th className="py-2.5 px-2 text-right">City/Local</th>
                            <th className="py-2.5 px-2 text-center">Last Fetched</th>
                            <th className="py-2.5 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-hairline">
                          {venues.map((v) => (
                            <tr key={v.venuesId} className="hover:bg-muted/5">
                              <td className="py-3 px-4">
                                <div className="font-semibold text-foreground">{v.venueName}</div>
                                <div className="text-xs text-ink-soft">
                                  {v.city ? `${v.city}, ${v.state} ${v.zipCode}` : 'No address provided'}
                                </div>
                              </td>
                              <td className="py-3 px-2 text-right font-mono font-bold text-accent-gold">
                                {formatRatePercent(v.combinedRate)}
                              </td>
                              <td className="py-3 px-2 text-right font-mono text-xs text-ink-soft">
                                {formatRatePercent(v.stateRate)}
                              </td>
                              <td className="py-3 px-2 text-right font-mono text-xs text-ink-soft">
                                {formatRatePercent(v.countyRate)}
                              </td>
                              <td className="py-3 px-2 text-right font-mono text-xs text-ink-soft">
                                {cityLocalRatePercent(v)}
                              </td>
                              <td className="py-3 px-2 text-center text-xs text-ink-soft">
                                {v.fetchedAtEpochSeconds !== '0' ? formatEpoch(v.fetchedAtEpochSeconds) : 'Never'}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    void runRefresh(() => lookupTaxRateMessage(v.zipCode));
                                  }}
                                  disabled={!v.zipCode || refreshing}
                                >
                                  Update Rate
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  )}
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
