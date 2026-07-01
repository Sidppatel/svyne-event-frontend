import * as React from 'react';
import { cn } from '@/shared/lib/cn';
import { playTap } from '@/shared/lib/haptic';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onFocus, ...props }, ref) => {
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      playTap('focus');
      if (onFocus) onFocus(e);
    };
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 svyne-spring-input',
          className,
        )}
        onFocus={handleFocus}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
