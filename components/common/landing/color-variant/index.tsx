'use client';
import { Check } from 'lucide-react';
import type { ColorVariant as ColorOption } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ColorVariantProps {
  colors: ColorOption[];
  value: string;
  onChange: (color: ColorOption) => void;
}

export function ColorVariant({ colors, value, onChange }: ColorVariantProps) {
  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-foreground">
        Color: <span className="font-semibold text-primary">{value}</span>
      </p>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Color">
        {colors.map((c) => {
          const active = c.name === value;
          return (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={c.name}
              title={c.name}
              onClick={() => onChange(c)}
              className={cn(
                'relative grid size-10 place-items-center rounded-full ring-2 ring-offset-2 ring-offset-card transition-all cursor-pointer',
                active ? 'ring-primary scale-105' : 'ring-transparent hover:ring-border'
              )}
              style={{ backgroundColor: c.hex }}
            >
              {active && <Check className="size-4 text-white drop-shadow" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
