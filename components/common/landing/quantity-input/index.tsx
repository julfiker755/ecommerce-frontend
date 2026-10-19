'use client';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: 'sm' | 'default';
  className?: string;
}

export function QuantityInput({ value, onChange, max = 99, size = 'default', className }: QuantityInputProps) {
  const sm = size === 'sm';
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg border-2 border-border bg-card',
        sm ? 'h-9' : 'h-12',
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size={sm ? 'icon-xs' : 'icon'}
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus />
      </Button>
      <span className={cn('text-center font-semibold tabular-nums', sm ? 'w-7 text-sm' : 'w-10')}>{value}</span>
      <Button
        type="button"
        variant="ghost"
        size={sm ? 'icon-xs' : 'icon'}
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus />
      </Button>
    </div>
  );
}
