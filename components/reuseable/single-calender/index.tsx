'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { helpers } from '@/lib/helpers';
import { CalendarDays } from 'lucide-react';
import { Calendar } from '@/components/ui';

interface Props {
  onChange?: (value?: Date) => void;
  disabled?: boolean;
}

export function SingleCalendar({ onChange, disabled }: Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>();

  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/*  */}
      <PopoverTrigger>
        <Button
          disabled={disabled}
          variant="outline"
          className="w-full h-10 justify-start items-center gap-3 rounded-lg cursor-pointer
    bg-transparent text-white
    hover:bg-transparent
    focus:bg-transparent
    focus-visible:bg-transparent
    data-[state=open]:bg-transparent"
        >
          <CalendarDays />
          {date ? helpers.formatDate(date) : 'Select Date'}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-auto rounded-xl border bg-white p-4 shadow-xl"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          className="rounded-md"
        />
      </PopoverContent>
    </Popover>
  );
}
