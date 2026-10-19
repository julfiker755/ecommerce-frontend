'use client';
import { ChevronDown, CircleAlert, Minus, Plus } from 'lucide-react';
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
                'text-black text-base font-medium  mb-1',
                stylelabel
              )}
            >
              {label}
            </Label>
          )}
          <Select onValueChange={onChange} value={value ? String(value) : ''}>
            <SelectTrigger
              className={cn(
                'w-full rounded-md bg-admin-sideber border-border   py-[22px] cursor-pointer shadow-none',
                className
              )}
            >
              <SelectValue placeholder={placeholder}>
                {value && selectedLabel(String(value)) ? (
                  <span className="text-black">
                    {selectedLabel(String(value))}
                  </span>
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              className={cn('rounded-md bg-background text-black  p-0', selectStyle)}
            >
              <SelectGroup className="p-0 m-0">
                {items?.map((item, index) => (
                  <SelectItem
                    className={cn(
                      'border-b last:border-b-0 py-3 pl-4 text-black rounded-none',
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
