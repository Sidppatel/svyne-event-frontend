import { useState } from 'react';
import { getMonthlyReport } from '@/features/admin/services/financialService';
import { rpcErrorMessage } from '@/shared/session';
import { centsToUSD } from '@/shared/lib/format';
import type { MonthlyReport } from '@/shared/proto/admin';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function AdminFinancialPage() {
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
      {error ? <p className="text-destructive">{error}</p> : null}

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
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                Revenue: <span className="font-mono font-medium text-foreground">{centsToUSD(report.netCents)}</span>
              </p>
              <p>
                Tickets sold: <span className="font-mono font-medium text-foreground">{report.ticketsSold}</span>
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
