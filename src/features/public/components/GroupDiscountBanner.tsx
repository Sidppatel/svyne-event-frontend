import { Users, Tag } from 'lucide-react';
import type { GroupDiscountHint } from '@/shared/proto/bookings';
import {
  groupDiscountState,
  nextTierMessage,
  appliedMessage,
  cappedMessage,
  tierProgressPercent,
} from '@/features/public/lib/groupDiscount';
import { cn } from '@/shared/lib/cn';

export function GroupDiscountBanner({
  hint,
  className,
}: {
  hint: GroupDiscountHint | undefined;
  className?: string;
}) {
  const state = groupDiscountState(hint);
  if (!hint || state === 'none') {
    return null;
  }

  if (state === 'applied') {
    return (
      <div
        className={cn(
          'rounded-lg border border-success/30 bg-success/10 p-3 text-sm text-success',
          className,
        )}
      >
        <p className="flex items-center gap-2 font-semibold">
          <Tag className="size-4 shrink-0" />
          {appliedMessage(hint)}
        </p>
        {hint.capped ? (
          <p className="mt-1 pl-6 text-xs text-ink-soft">{cappedMessage(hint)}</p>
        ) : null}
        {hint.nextTierMinQty > 0 ? (
          <p className="mt-1 pl-6 text-xs text-ink-soft">{nextTierMessage(hint)}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border border-hairline-strong bg-surface p-3', className)}>
      <p className="flex items-center gap-2 text-sm font-medium text-ink">
        <Users className="size-4 shrink-0 text-ink-soft" />
        {nextTierMessage(hint)}
      </p>
      {hint.eligibleQty > 0 ? (
        <div
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-hairline"
          role="progressbar"
          aria-valuenow={hint.eligibleQty}
          aria-valuemin={0}
          aria-valuemax={hint.nextTierMinQty}
          aria-label="Progress toward group discount"
        >
          <div
            className="h-full rounded-full bg-success transition-[width] duration-300 ease-[var(--ease-out)]"
            style={{ width: `${tierProgressPercent(hint)}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
