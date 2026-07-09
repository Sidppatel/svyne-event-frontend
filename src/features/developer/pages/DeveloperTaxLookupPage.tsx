import { useState } from 'react';
import { rpcErrorMessage } from '@/shared/session';
import { formatEpoch } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  lookupTaxRate,
  formatRatePercent,
  type TaxRateRow,
} from '@/features/developer/services/developerBillingService';

export function DeveloperTaxLookupPage() {
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TaxRateRow | null>(null);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await lookupTaxRate(zip.trim()));
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">Tax Rate Lookup</h1>
        <p className="text-sm text-ink-soft">
          Query the SalesTaxZip API dynamically to retrieve and cache the combined sales tax rate and its jurisdictional breakdown for any US ZIP Code.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">ZIP Code Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLookup} className="flex gap-2">
            <Input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="e.g. 36611 or 90210"
              inputMode="numeric"
              pattern="\d{5}"
              maxLength={5}
              className="w-48"
              required
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Querying API…' : 'Look Up Tax Rate'}
            </Button>
          </form>

          {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
        </CardContent>
      </Card>

      {result ? (
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 pb-3 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">ZIP Code {result.zipCode}</CardTitle>
                <p className="text-xs text-ink-soft">
                  Location: {result.city}, {result.state} {result.county ? `(${result.county} County)` : ''}
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold text-accent-gold">
                  {formatRatePercent(result.combinedRate)}
                </span>
                <span className="block text-[10px] text-ink-faint">Combined Sales Tax</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="divide-y divide-hairline pt-0">
            <div className="flex justify-between py-2.5 text-sm">
              <span className="font-medium">State Rate</span>
              <span className="font-mono">{formatRatePercent(result.stateRate)}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="font-medium">County Rate</span>
              <span className="font-mono">{formatRatePercent(result.countyRate)}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="font-medium">City Rate</span>
              <span className="font-mono">{formatRatePercent(result.cityRate)}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="font-medium">Local Rate</span>
              <span className="font-mono">{formatRatePercent(result.localRate)}</span>
            </div>
            <div className="flex justify-between py-2.5 text-xs text-ink-soft">
              <span>Cache Fetched At</span>
              <span>{formatEpoch(result.fetchedAtEpochSeconds)}</span>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
