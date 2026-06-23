import { useState } from 'react';
import {
  getStripeStatus,
  startStripeOnboarding,
  getMonthlyReport,
} from '@/features/admin/services/financialService';
import { useAuth } from '@/shared/auth/useAuth';
import { rpcErrorMessage } from '@/shared/session';
import { centsToUSD } from '@/shared/lib/format';
import type { StripeStatus, MonthlyReport } from '@/shared/proto/admin';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function AdminFinancialPage() {
  const { tenantsId } = useAuth();
  const [stripe, setStripe] = useState<StripeStatus | null>(null);
  const [report, setReport] = useState<MonthlyReport | null>(null);
  const [eventsId, setEventsId] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [error, setError] = useState<string | null>(null);

  async function guard(action: () => Promise<void>) {
    setError(null);
    try {
      await action();
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Financial</h1>
      {error ? <p className="text-red-600">{error}</p> : null}

      <Card>
        <CardHeader>
          <CardTitle>Stripe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => guard(async () => setStripe(await getStripeStatus(tenantsId ?? '')))}>
              Check status
            </Button>
            <Button
              size="sm"
              onClick={() =>
                guard(async () => {
                  const url = await startStripeOnboarding(tenantsId ?? '');
                  window.open(url, '_blank');
                })
              }
            >
              Start onboarding
            </Button>
          </div>
          {stripe ? (
            <p className="text-sm text-gray-600">
              charges: {String(stripe.chargesEnabled)} · payouts: {String(stripe.payoutsEnabled)} · details:{' '}
              {String(stripe.detailsSubmitted)}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap items-end gap-3">
            <div className="space-y-1">
              <Label>Event ID</Label>
              <Input value={eventsId} onChange={(e) => setEventsId(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Year</Label>
              <Input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label>Month</Label>
              <Input type="number" value={month} onChange={(e) => setMonth(Number(e.target.value))} />
            </div>
            <Button size="sm" onClick={() => guard(async () => setReport(await getMonthlyReport(eventsId, year, month)))}>
              Run report
            </Button>
          </div>
          {report ? (
            <div className="text-sm text-gray-600">
              <p>Gross: {centsToUSD(report.grossCents)}</p>
              <p>Fees: {centsToUSD(report.feesCents)}</p>
              <p>Net: {centsToUSD(report.netCents)}</p>
              <p>Tickets sold: {report.ticketsSold}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
