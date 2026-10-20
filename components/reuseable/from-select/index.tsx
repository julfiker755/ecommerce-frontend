'use client';
import {CircleAlert} from 'lucide-react';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type ControllerRenderProps,
  type ControllerFieldState,
} from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui';

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  items: { label: string; value: string; icon?: any }[];
  defaultValue?: string;
  stylelabel?: string;
  matching?: boolean;
  className?: string;
  itemStyle?: string;
  selectStyle?: string;
}

export function InputSelectField({
  name,
  label,
  placeholder,
  items,
  stylelabel,
  matching = false,
  className,
  itemStyle,
  selectStyle,
}: FormSelectProps) {
  const { control } = useFormContext();

  const selectedLabel = (value: string) => {
    const item = items?.find((item) => item.value === value);
    return item?.label || '';
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => (
        <div className="relative">
          {!matching && (
            <Label
              className={cn(
                'text-black text-base! font-medium  mb-1',
                stylelabel
              )}
            >
              {label}
            </Label>
          )}
          <Select onValueChange={onChange} value={value ? String(value) : ''}>
            <SelectTrigger
              className={cn(
                'w-full cursor-pointer rounded-lg border border-slate-300 bg-white pl-4 pr-3 text-black shadow-xs transition-[color,box-shadow,border-color] data-[size=default]:h-11 hover:border-slate-400 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 data-popup-open:border-primary data-popup-open:ring-3 data-popup-open:ring-primary/15 [&_svg:not([class*=size-])]:size-4',
                error &&
                  'border-[#f73f4e] focus-visible:border-[#f73f4e] focus-visible:ring-[#f73f4e]/15 data-popup-open:border-[#f73f4e] data-popup-open:ring-[#f73f4e]/15',
                className
              )}
            >
              <SelectValue placeholder={placeholder}>
                {value && selectedLabel(String(value)) ? (
                  <span className="text-black">
                    {selectedLabel(String(value))}
                  </span>
                ) : (
                  <span className="text-slate-400">{placeholder}</span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              className={cn('rounded-lg border border-slate-200 bg-white text-black p-1 shadow-lg', selectStyle)}
            >
              <SelectGroup className="p-0 m-0">
                {items?.map((item, index) => (
                  <SelectItem
                    className={cn(
                      'cursor-pointer rounded-md py-2.5 pl-3 text-black hover:bg-slate-50',
                      itemStyle
                    )}
                    key={index}
                    value={item.value}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {error?.message && (
            <h3 className="text-sm pt-[1px] text-end text-[#f73f4e] flex gap-1 items-center justify-end">
              {error.message}
              <CircleAlert size={14} />
            </h3>
          )}
        </div>
      )}
    />
  );
}
