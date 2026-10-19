'use client';
import { CircleAlert } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FormSelectProps {
    label?: string;
    placeholder?: string;
    items: { label: string; value: string; icon?: any }[];
    value?: string;
    onChange: (value: string) => void;
    error?: string;
    stylelabel?: string;
    matching?: boolean;
    className?: string;
    itemStyle?: string;
    selectStyle?: string;
}

export function InputSelectField({
    label,
    placeholder,
    items,
    value,
    onChange,
    error,
    stylelabel,
    matching = false,
    className,
    itemStyle,
    selectStyle,
}: FormSelectProps) {
    const selectedLabel = (val: string) => {
        const item = items?.find((item) => item.value === val);
        return item?.label || '';
    };

    return (
        <div className="relative flex gap-1 items-center">
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
            <Select onValueChange={onChange as any} value={value ? String(value) : ''}>
                <SelectTrigger
                    className={cn(
                        'w-full rounded-md bg-admin-sideber border-border py-[22px] cursor-pointer shadow-none text-white data-[placeholder]:!text-white [&_svg]:!text-white',
                        className
                    )}
                >
                    <SelectValue placeholder={placeholder} className='placeholder:text-white text-white'>
                        {value && selectedLabel(String(value)) ? (
                            <span className="text-white">
                                {selectedLabel(String(value))}
                            </span>
                        ) : (
                            <span className="text-white">{placeholder}</span>
                        )}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent
                    className={cn('rounded-md bg-background text-black p-0', selectStyle)}
                >
                    <SelectGroup className="p-0 m-0">
                        {items?.map((item, index) => (
                            <SelectItem
                                className={cn(
                                    'border-b last:border-b-0 py-3 pl-4 text-black rounded-none [&_svg]:!text-black',
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

            {error && (
                <h3 className="text-sm pt-[1px] text-end text-[#f73f4e] flex gap-1 items-center justify-end">
                    {error}
                    <CircleAlert size={14} />
                </h3>
            )}
        </div>
    );
}