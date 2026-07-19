import { cn } from '@/shared/lib/cn';

export interface TicketSpanLogoProps {
  className?: string;
  light?: boolean;
}

export function TicketSpanLogo({ className, light }: TicketSpanLogoProps) {
  return (
    <img
      src="/logo.svg"
      alt="TicketSpan Logo"
      className={cn(
        'w-auto',
        light && 'brightness-0 invert',
        className
      )}
    />
  );
}
