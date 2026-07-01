import { cn } from '@/shared/lib/cn';
import { playTap } from '@/shared/lib/haptic';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export function Switch({ checked, onCheckedChange, disabled, label }: SwitchProps) {
  const handleClick = () => {
    const nextVal = !checked;
    playTap(nextVal ? 'toggle-on' : 'toggle-off');
    onCheckedChange(nextVal);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-all duration-300 active:scale-90',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-primary' : 'bg-muted-foreground/30',
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-all duration-300',
          checked ? 'translate-x-5 scale-110' : 'translate-x-0.5 scale-100',
        )}
      />
    </button>
  );
}
