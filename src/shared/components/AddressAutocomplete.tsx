import { useEffect, useRef, useState } from 'react';
import { Input } from '@/shared/ui/input';
import { BACKEND_URL } from '@/shared/apiClient';
import { getAccessToken } from '@/shared/auth/store';

export interface ParsedAddress {
  line1: string;
  city: string;
  state: string;
  zip: string;
}

interface Suggestion extends ParsedAddress {
  placeId: string;
  formatted: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (line1: string) => void;
  onSelect: (address: ParsedAddress) => void;
}

export function AddressAutocomplete({ value, onChange, onSelect }: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const skipNext = useRef(false);

  useEffect(() => {
    if (skipNext.current) {
      skipNext.current = false;
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      if (value.trim().length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const url = new URL(`${BACKEND_URL}/geocode/autocomplete`);
        url.searchParams.set('text', value);
        const token = getAccessToken();
        const response = await fetch(url, {
          signal: controller.signal,
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!response.ok) {
          throw new Error(`geocode ${response.status}`);
        }
        const data = await response.json();
        const results: Suggestion[] = (data.results ?? []).map((r: Record<string, string>) => ({
          placeId: r.place_id ?? r.formatted,
          formatted: r.formatted ?? '',
          line1: r.address_line1 ?? [r.housenumber, r.street].filter(Boolean).join(' '),
          city: r.city ?? '',
          state: (r.state_code ?? '').toUpperCase(),
          zip: r.postcode ?? '',
        }));
        setSuggestions(results);
        setOpen(true);
        setError(null);
      } catch (caught) {
        if ((caught as Error).name !== 'AbortError') {
          setError('Address lookup failed');
        }
      }
    }, 300);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [value]);

  function choose(suggestion: Suggestion) {
    skipNext.current = true;
    setOpen(false);
    setSuggestions([]);
    onSelect({
      line1: suggestion.line1,
      city: suggestion.city,
      state: suggestion.state,
      zip: suggestion.zip,
    });
  }

  return (
    <div className="relative">
      <Input
        value={value}
        placeholder="Start typing an address…"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
      />
      {error ? <p className="mt-1 text-xs text-amber-600">{error}</p> : null}
      {open && suggestions.length > 0 ? (
        <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border bg-white shadow-md">
          {suggestions.map((suggestion) => (
            <li key={suggestion.placeId}>
              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                onClick={() => choose(suggestion)}
              >
                {suggestion.formatted}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
