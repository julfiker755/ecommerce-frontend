'use client';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: boolean;
}

export function OtpInput({ value, onChange, length = 6, error }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  const focus = (i: number) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus();

  const setDigit = (i: number, d: string) => {
    const next = digits.slice();
    next[i] = d;
    onChange(next.join('').slice(0, length));
  };

  return (
    <div className="flex justify-between gap-2 sm:gap-3">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={d}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, '').slice(-1);
            setDigit(i, v);
            if (v) focus(i + 1);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !d) focus(i - 1);
            if (e.key === 'ArrowLeft') focus(i - 1);
            if (e.key === 'ArrowRight') focus(i + 1);
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
            if (!pasted) return;
            onChange(pasted);
            focus(pasted.length);
          }}
          onFocus={(e) => e.target.select()}
          className={cn(
            'size-12 sm:size-14 rounded-xl border-2 bg-card text-center text-xl font-bold text-foreground outline-none transition-all',
            'focus:border-primary focus:ring-4 focus:ring-primary/15',
            d ? 'border-primary/60' : 'border-input',
            error && 'border-sale focus:border-sale focus:ring-sale/15'
          )}
        />
      ))}
    </div>
  );
}
