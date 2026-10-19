'use client';
import { Button } from '@/components/ui/button';
import type { WeightVariant as WeightOption } from '@/lib/data';
import { cn } from '@/lib/utils';

interface WeightVariantProps {
  weights: WeightOption[];
  value: string;
  onChange: (weight: WeightOption) => void;
  label?: string;
}

export function WeightVariant({ weights, value, onChange, label = 'Size' }: WeightVariantProps) {
  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-foreground">
        {label}: <span className="font-semibold text-primary">{value}</span>
      </p>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {weights.map((w) => {
          const active = w.label === value;
          return (
            <Button
              key={w.label}
              type="button"
              role="radio"
              aria-checked={active}
              variant="outline"
              onClick={() => onChange(w)}
              className={cn(
                'h-11 min-w-20 border-2',
                active && 'border-primary bg-secondary text-primary hover:bg-secondary'
              )}
            >
              {w.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
