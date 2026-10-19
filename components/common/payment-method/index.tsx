'use client';
import { Banknote, CircleCheck, CreditCard, Smartphone } from 'lucide-react';
import type { PaymentMethod as Method } from '@/lib/data';
import { cn } from '@/lib/utils';

const methods: {
  value: Method;
  title: string;
  text: string;
  icon: React.ElementType;
  tone: string;
  disabled?: boolean;
}[] = [
  {
    value: 'cod',
    title: 'Cash on Delivery',
    text: 'Pay when you receive',
    icon: Banknote,
    tone: 'bg-secondary text-primary',
  },
  {
    value: 'bkash',
    title: 'bKash',
    text: 'Coming soon',
    icon: Smartphone,
    tone: 'bg-[#E2136E]/10 text-[#E2136E]',
    disabled: true,
  },
  {
    value: 'online',
    title: 'Card / Online',
    text: 'Coming soon',
    icon: CreditCard,
    tone: 'bg-[#1A4CB8]/10 text-[#1A4CB8]',
    disabled: true,
  },
];

interface PaymentMethodProps {
  value: Method;
  onChange: (value: Method) => void;
}

export function PaymentMethod({ value, onChange }: PaymentMethodProps) {
  return (
    <div role="radiogroup" aria-label="Payment method" className="grid gap-3">
      {methods.map(({ value: v, title, text, icon: Icon, tone, disabled }) => {
        const active = value === v;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(v)}
            className={cn(
              'flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all',
              active
                ? 'border-primary bg-secondary/60'
                : 'border-border hover:border-primary/40 cursor-pointer',
              disabled && 'cursor-not-allowed opacity-55 hover:border-border'
            )}
          >
            <span className={cn('grid size-10 shrink-0 place-items-center rounded-lg', tone)}>
              <Icon className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold text-foreground">{title}</span>
              <span className="block text-xs text-muted-foreground">{text}</span>
            </span>
            {active ? (
              <CircleCheck className="size-5 fill-primary text-primary-foreground" />
            ) : (
              <span className="size-5 rounded-full border-2 border-border" />
            )}
          </button>
        );
      })}
    </div>
  );
}
