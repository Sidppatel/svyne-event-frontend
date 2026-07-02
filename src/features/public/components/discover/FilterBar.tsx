import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/cn';

interface FilterBarProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  search: string;
  onSearch: (value: string) => void;
}

export function FilterBar({ categories, selected, onSelect, search, onSearch }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-hairline pb-4 md:flex-row md:items-center md:justify-between">
      <div className="order-2 flex flex-wrap gap-2 md:order-1">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            aria-pressed={selected === cat}
            className={cn(
              'cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition-[background-color,border-color,color] duration-[180ms]',
              selected === cat
                ? 'border-ink bg-ink text-on-stage'
                : 'border-hairline bg-surface text-ink-soft hover:border-hairline-strong hover:text-ink',
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="relative order-1 w-full md:order-2 md:w-80">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <Input
          type="search"
          placeholder="Search events…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="h-10 w-full rounded-full pl-10"
        />
      </div>
    </div>
  );
}
