import { useCallback, useMemo, useState } from 'react';
import { MessageSquare, Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAsync } from '@/shared/hooks/useAsync';
import { listFeedback, deleteFeedback } from '@/features/admin/services/feedbackService';
import { rpcErrorMessage } from '@/shared/session';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent } from '@/shared/ui/card';

type FeedbackFilter = 'all' | 'positive' | 'review';

const FILTERS: { id: FeedbackFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'positive', label: 'Positive' },
  { id: 'review', label: 'Needs review' },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={n <= rating ? 'h-3.5 w-3.5 fill-marigold text-marigold' : 'h-3.5 w-3.5 text-hairline-strong'}
        />
      ))}
    </span>
  );
}

export function AdminFeedbackPage() {
  const loader = useCallback(() => listFeedback(), []);
  const { data, loading, error, reload } = useAsync(loader);
  const [filter, setFilter] = useState<FeedbackFilter>('all');

  const items = useMemo(() => data ?? [], [data]);
  const visible = useMemo(
    () =>
      items.filter((item) => {
        if (filter === 'positive') return item.rating >= 4;
        if (filter === 'review') return item.rating <= 3;
        return true;
      }),
    [items, filter],
  );

  async function remove(id: string) {
    if (!window.confirm('Delete this feedback? This can’t be undone.')) return;
    try {
      await deleteFeedback(id);
      toast.success('Feedback removed.');
      reload();
    } catch (caught) {
      toast.error(rpcErrorMessage(caught));
    }
  }

  return (
    <div className="space-y-8 pb-4">
      <section className="space-y-1.5">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Feedback &amp; reviews</h1>
        <p className="text-sm text-ink-soft">
          {items.length === 0
            ? 'What your guests think will show up here.'
            : `${items.length} ${items.length === 1 ? 'response' : 'responses'} from your guests.`}
        </p>
      </section>

      {items.length > 0 ? (
        <div className="inline-flex flex-wrap gap-1 rounded-lg border border-hairline bg-surface p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === f.id ? 'bg-brand text-brand-ink shadow-[var(--shadow-e1)]' : 'text-ink-soft hover:bg-surface-sunken'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>
      ) : null}

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visible.map((item) => (
            <Card key={item.feedbacksId} interactive className="overflow-hidden">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Stars rating={item.rating} />
                    <Badge variant="neutral">{item.type}</Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => remove(item.feedbacksId)}
                    className="h-8 text-xs text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <p className="text-sm leading-relaxed text-foreground">{item.message}</p>
                <p className="text-xs font-medium text-ink-soft">— {item.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-5 px-6 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-marigold/15 text-marigold">
              <MessageSquare className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">No feedback yet</h3>
              <p className="max-w-md text-sm text-ink-soft">
                Once guests start reviewing your events, their words land right here — the good, and the useful.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="rounded-lg border border-dashed border-hairline-strong p-10 text-center text-sm text-ink-soft">
          Nothing matches that filter.
        </p>
      )}
    </div>
  );
}
