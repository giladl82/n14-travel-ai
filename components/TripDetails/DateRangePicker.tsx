'use client';

import { UseFormReturn } from 'react-hook-form';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TripDetailsType } from '../../lib/schema';
import { useState } from 'react';

export function DateRangePicker({
  form,
}: {
  form: UseFormReturn<TripDetailsType>;
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: form.getValues('fromDate')
      ? new Date(form.getValues('fromDate') ?? '')
      : addDays(new Date(), 7),
    to: form.getValues('toDate')
      ? new Date(form.getValues('toDate') ?? '')
      : addDays(new Date(), 14),
  });

  return (
    <div className="flex flex-col gap-3">
      <FormItem>
        <FormLabel htmlFor="date">Dates:</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(range) => {
                setDate(range);
                if (range) {
                  form.setValue('fromDate', range.from?.toDateString());
                  form.setValue('toDate', range.to?.toDateString());
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </FormItem>

      <FormField
        control={form.control}
        name="fromDate"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <input type="hidden" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="toDate"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <input type="hidden" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
