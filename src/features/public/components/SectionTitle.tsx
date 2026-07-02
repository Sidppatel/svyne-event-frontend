import { type ComponentType } from 'react';
import { cn } from '@/shared/lib/cn';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: ComponentType<{ className?: string }>;
  light?: boolean;
  className?: string;
}

export function SectionTitle({ title, subtitle, icon: Icon, light = false, className }: SectionTitleProps) {
  return (
    <div className={cn('space-y-1.5 border-b pb-4', light ? 'border-on-stage/15' : 'border-hairline', className)}>
      <div className="flex items-center gap-2.5">
        {Icon && <Icon className={cn('size-5', light ? 'text-voltage' : 'text-brand')} />}
        <h2 className={cn('font-display text-2xl font-semibold md:text-3xl', light ? 'text-on-stage' : 'text-foreground')}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className={cn('text-sm', light ? 'text-on-stage-soft' : 'text-ink-soft')}>{subtitle}</p>
      )}
    </div>
  );
}
