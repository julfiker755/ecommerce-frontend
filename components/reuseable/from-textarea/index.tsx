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
            <Label className={cn('mb-1 text-base text-black', stylelabel)}>
              {label}
            </Label>
          )}
          <div className="relative">
            <Textarea
              className={cn(
                'min-h-16  border! text-black  border-border w-full placeholder:text-muted-foreground!  resize-none  field-sizing-content rounded-sm   pl-4 pr-3 text-sm',
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
