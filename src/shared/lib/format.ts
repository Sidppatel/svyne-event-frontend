export function centsToUSD(value: number | string): string {
  const cents = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(cents)) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export function formatEpoch(value: number | string): string {
  const ms = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(ms) || ms === 0) {
    return '—';
  }
  return new Date(ms).toLocaleString();
}

export function toEpochString(value: string): string {
  if (!value) {
    return '0';
  }
  const ms = new Date(value).getTime();
  return Number.isFinite(ms) ? String(ms) : '0';
}
