import { useCallback, useState, type FormEvent } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { formatEpoch } from '@/shared/lib/format';
import {
  ERROR_SEVERITIES,
  ERROR_SOURCES,
  RESOLVED_FILTER_ALL,
  RESOLVED_FILTER_RESOLVED,
  RESOLVED_FILTER_UNRESOLVED,
  getErrorLogStats,
  getErrorLogs,
  hasNextPage,
  nextPageOffset,
  pageLabel,
  previousPageOffset,
  resolveErrorLog,
  type ErrorLogEntry,
} from '@/features/developer/services/developerService';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';

const PAGE_SIZE = 25;

type SeverityBadgeVariant = 'danger' | 'warn' | 'neutral';

function severityVariant(severity: string): SeverityBadgeVariant {
  if (severity === 'Critical' || severity === 'High' || severity === 'Error') {
    return 'danger';
  }
  if (severity === 'Medium' || severity === 'Warning') {
    return 'warn';
  }
  return 'neutral';
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}

function CountList({ title, counts }: { title: string; counts: { key: string; count: number }[] }) {
  return (
    <Card>
      <CardContent className="space-y-2">
        <p className="text-sm font-medium">{title}</p>
        {counts.length === 0 ? <p className="text-sm text-muted-foreground">None</p> : null}
        {counts.map((item) => (
          <div key={item.key} className="flex items-center justify-between text-sm">
            <span className="truncate pr-2">{item.key}</span>
            <span className="text-muted-foreground">{item.count}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ErrorDetail({ entry, onResolved }: { entry: ErrorLogEntry; onResolved: () => void }) {
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const submitResolution = async () => {
    setSaving(true);
    setSaveError('');
    try {
      await resolveErrorLog(entry.id, notes);
      onResolved();
    } catch (caught) {
      setSaveError(caught instanceof Error ? caught.message : 'Failed to resolve');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-3 border-t pt-3 text-sm">
      <div className="grid gap-1 sm:grid-cols-2">
        <p>
          <span className="text-muted-foreground">Error ID: </span>
          {entry.id}
        </p>
        <p>
          <span className="text-muted-foreground">Correlation: </span>
          {entry.correlationId || '—'}
        </p>
        <p>
          <span className="text-muted-foreground">Type: </span>
          {entry.exceptionType || '—'}
        </p>
        <p>
          <span className="text-muted-foreground">Status: </span>
          {entry.statusCode || '—'}
        </p>
        <p>
          <span className="text-muted-foreground">User: </span>
          {entry.usersId || '—'}
        </p>
        <p>
          <span className="text-muted-foreground">Tenant: </span>
          {entry.tenantsId || '—'}
        </p>
        <p>
          <span className="text-muted-foreground">IP: </span>
          {entry.ipAddress || '—'}
        </p>
        <p>
          <span className="text-muted-foreground">Source: </span>
          {entry.source}
        </p>
      </div>
      {entry.stackTrace ? (
        <div>
          <p className="mb-1 font-medium">Stack trace</p>
          <pre className="max-h-64 overflow-auto rounded bg-surface-sunken p-2 text-xs">{entry.stackTrace}</pre>
        </div>
      ) : null}
      {entry.metadataJson ? (
        <div>
          <p className="mb-1 font-medium">Context</p>
          <pre className="max-h-48 overflow-auto rounded bg-surface-sunken p-2 text-xs">{entry.metadataJson}</pre>
        </div>
      ) : null}
      {entry.resolved ? (
        <div className="rounded bg-success/10 p-2">
          <p className="font-medium">Resolved {formatEpoch(entry.resolvedAt)}</p>
          <p className="text-muted-foreground">{entry.resolvedNotes || 'No notes'}</p>
        </div>
      ) : (
        <div className="space-y-2">
          <Textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Resolution notes"
            rows={2}
          />
          {saveError ? <p className="text-destructive">{saveError}</p> : null}
          <Button size="sm" onClick={() => void submitResolution()} disabled={saving}>
            {saving ? 'Saving…' : 'Mark resolved'}
          </Button>
        </div>
      )}
    </div>
  );
}

export function DeveloperLogsPage() {
  const [severity, setSeverity] = useState('');
  const [source, setSource] = useState('');
  const [resolvedFilter, setResolvedFilter] = useState(RESOLVED_FILTER_ALL);
  const [searchDraft, setSearchDraft] = useState('');
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [expandedId, setExpandedId] = useState('');

  const statsLoader = useCallback(() => getErrorLogStats(), []);
  const stats = useAsync(statsLoader);

  const logsLoader = useCallback(
    () => getErrorLogs({ severity, source, resolvedFilter, search, offset, limit: PAGE_SIZE }),
    [severity, source, resolvedFilter, search, offset],
  );
  const logs = useAsync(logsLoader);

  const applySearch = (event: FormEvent) => {
    event.preventDefault();
    setOffset(0);
    setSearch(searchDraft);
  };

  const onResolved = () => {
    logs.reload();
    stats.reload();
  };

  const total = logs.data?.meta?.total ?? 0;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Error logs</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Errors today" value={stats.data?.totalToday ?? 0} />
        <StatCard label="Last 7 days" value={stats.data?.totalWeek ?? 0} />
        <StatCard label="Last 30 days" value={stats.data?.totalMonth ?? 0} />
        <StatCard label="Unresolved" value={stats.data?.unresolved ?? 0} />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <CountList title="By severity (30d)" counts={stats.data?.bySeverity ?? []} />
        <CountList title="Top error types (30d)" counts={stats.data?.topTypes ?? []} />
        <CountList title="Top tenants (30d)" counts={stats.data?.topTenants ?? []} />
      </div>

      <form onSubmit={applySearch} className="flex flex-wrap items-center gap-2">
        <Select
          className="w-36"
          value={severity}
          onChange={(event) => {
            setOffset(0);
            setSeverity(event.target.value);
          }}
        >
          <option value="">All severities</option>
          {ERROR_SEVERITIES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          className="w-32"
          value={source}
          onChange={(event) => {
            setOffset(0);
            setSource(event.target.value);
          }}
        >
          <option value="">All sources</option>
          {ERROR_SOURCES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          className="w-36"
          value={String(resolvedFilter)}
          onChange={(event) => {
            setOffset(0);
            setResolvedFilter(Number(event.target.value));
          }}
        >
          <option value={String(RESOLVED_FILTER_ALL)}>All statuses</option>
          <option value={String(RESOLVED_FILTER_UNRESOLVED)}>Unresolved</option>
          <option value={String(RESOLVED_FILTER_RESOLVED)}>Resolved</option>
        </Select>
        <Input
          className="w-64"
          value={searchDraft}
          onChange={(event) => setSearchDraft(event.target.value)}
          placeholder="Search message, path, error ID…"
        />
        <Button type="submit" variant="outline" size="sm">
          Search
        </Button>
      </form>

      {logs.loading ? <p className="text-muted-foreground">Loading…</p> : null}
      {logs.error ? <p className="text-destructive">{logs.error}</p> : null}

      <div className="space-y-2">
        {(logs.data?.entries ?? []).map((entry) => (
          <Card key={entry.id}>
            <CardContent className="space-y-2">
              <button
                type="button"
                className="flex w-full flex-wrap items-center gap-2 text-left"
                onClick={() => setExpandedId(expandedId === entry.id ? '' : entry.id)}
              >
                <Badge variant={severityVariant(entry.severity)}>{entry.severity}</Badge>
                <Badge variant="neutral">{entry.source}</Badge>
                {entry.resolved ? <Badge variant="success">Resolved</Badge> : null}
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{entry.message}</span>
                <span className="text-xs text-muted-foreground">
                  {entry.requestMethod} {entry.requestPath}
                </span>
                <span className="text-xs text-muted-foreground">{formatEpoch(entry.timestamp)}</span>
              </button>
              {expandedId === entry.id ? <ErrorDetail entry={entry} onResolved={onResolved} /> : null}
            </CardContent>
          </Card>
        ))}
      </div>

      {!logs.loading && (logs.data?.entries ?? []).length === 0 ? (
        <p className="text-muted-foreground">No errors match the current filters.</p>
      ) : null}

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={offset === 0}
          onClick={() => setOffset(previousPageOffset(offset, PAGE_SIZE))}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">{pageLabel(offset, PAGE_SIZE, total)}</span>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasNextPage(offset, PAGE_SIZE, total)}
          onClick={() => setOffset(nextPageOffset(offset, PAGE_SIZE))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
