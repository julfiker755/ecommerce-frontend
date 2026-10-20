'use client';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CircleAlert } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextareaHTMLAttributes } from 'react';
import { Label } from '@/components/ui';

// Props interface
interface FromTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  stylelabel?: string;
}

export function FromTextArea({
  name,
  label,
  placeholder,
  className,
  stylelabel,
  ...rest
}: FromTextAreaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label && (
            <Label className={cn('mb-1 text-base! font-medium text-black', stylelabel)}>
              {label}
            </Label>
          )}
          <div className="relative">
            <Textarea
              className={cn(
                'min-h-16 w-full resize-none field-sizing-content rounded-lg border border-slate-300 bg-white pl-4 pr-3 text-sm text-black shadow-xs placeholder:text-slate-400 hover:border-slate-400 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15',
                error &&
                  'border-[#f73f4e] focus-visible:border-[#f73f4e] focus-visible:ring-[#f73f4e]/15',
                className
              )}
              placeholder={placeholder}
              {...field}
              {...rest}
            />
          </div>
          {error?.message && (
            <h3 className="text-sm pt-px text-end text-[#f73f4e] flex gap-1 items-center justify-end">
              {error.message}
              <CircleAlert size={14} />
            </h3>
          )}
        </div>
      )}
    />
  );
}
