import { useCallback, useState } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { rpcErrorMessage } from '@/shared/session';
import { formatEpoch } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  listTaxRates,
  lookupTaxRateMessage,
  refreshAllTaxRates,
  filterTaxRates,
  newestFetchedEpoch,
  formatRatePercent,
} from '@/features/developer/services/developerBillingService';

export function TaxRatesPanel() {
  const loader = useCallback(() => listTaxRates(), []);
  const { data, loading, error, reload } = useAsync(loader);
  const [search, setSearch] = useState('');
  const [lookupZip, setLookupZip] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const rates = data ?? [];
  const filtered = filterTaxRates(rates, search);

  async function runAction(action: () => Promise<string>) {
    setBusy(true);
    setMessage(null);
    setActionError(null);
    try {
      setMessage(await action());
      reload();
    } catch (caught) {
      setActionError(rpcErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  function onLookup(event: React.FormEvent) {
    event.preventDefault();
    void runAction(() => lookupTaxRateMessage(lookupZip)).then(() => setLookupZip(''));
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Tax rates (SalesTaxZip cache)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <span className="block text-xs text-ink-soft">Cached zips</span>
            <span className="font-mono text-lg font-semibold">{rates.length}</span>
          </div>
          <div>
            <span className="block text-xs text-ink-soft">Last refreshed</span>
            <span className="font-mono text-lg font-semibold">
              {rates.length > 0 ? formatEpoch(newestFetchedEpoch(rates)) : '—'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <Input
            className="w-56"
            placeholder="Search zip, city, state…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <form className="flex items-end gap-2" onSubmit={onLookup}>
            <label className="text-sm">
              Lookup zip
              <Input
                className="mt-1 w-28"
                value={lookupZip}
                onChange={(event) => setLookupZip(event.target.value)}
                placeholder="36611"
                inputMode="numeric"
                pattern="\d{5}"
                required
              />
            </label>
            <Button type="submit" disabled={busy}>
              Lookup
            </Button>
          </form>
          <Button
            variant="outline"
            disabled={busy || rates.length === 0}
            onClick={() => void runAction(() => refreshAllTaxRates())}
          >
            Refresh all rates
          </Button>
        </div>

        {message ? <p className="text-sm text-success">{message}</p> : null}
        {actionError ? <p className="text-sm text-destructive">{actionError}</p> : null}
        {error ? <p className="text-sm text-destructive">{rpcErrorMessage(error)}</p> : null}
        {loading ? <p className="text-sm text-ink-soft">Loading…</p> : null}

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink-soft">
              <th className="pb-2">Zip</th>
              <th className="pb-2">City</th>
              <th className="pb-2">State</th>
              <th className="pb-2 text-right">Combined</th>
              <th className="pb-2 text-right">State / County / City / Local</th>
              <th className="pb-2 text-right">Fetched</th>
              <th className="pb-2" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.zipCode} className="border-t border-hairline">
                <td className="py-1.5 font-mono">
                  <a
                    className="hover:underline"
                    href={`https://salestaxzip.com/tax/${row.zipCode}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {row.zipCode}
                  </a>
                </td>
                <td className="py-1.5">{row.city || '—'}</td>
                <td className="py-1.5">{row.state || '—'}</td>
                <td className="py-1.5 text-right font-mono font-semibold">
                  {formatRatePercent(row.combinedRate)}
                </td>
                <td className="py-1.5 text-right font-mono text-ink-soft">
                  {formatRatePercent(row.stateRate)} / {formatRatePercent(row.countyRate)} /{' '}
                  {formatRatePercent(row.cityRate)} / {formatRatePercent(row.localRate)}
                </td>
                <td className="py-1.5 text-right text-ink-soft">{formatEpoch(row.fetchedAtEpochSeconds)}</td>
                <td className="py-1.5 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={busy}
                    onClick={() => void runAction(() => lookupTaxRateMessage(row.zipCode))}
                  >
                    Refresh
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filtered.length === 0 ? (
          <p className="text-sm text-ink-soft">
            {rates.length === 0
              ? 'No cached rates yet — rates appear after venue creation or a manual lookup.'
              : 'No rates match the search.'}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
