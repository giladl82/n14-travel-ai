import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Counter } from '@/components/ui/counter';
import { TripDetailsType } from '../../lib/schema';

export function ChildrenCounter({
  form,
}: {
  form: UseFormReturn<TripDetailsType>;
}) {
  return (
    <FormField
      control={form.control}
      name="numberOfChildren"
      render={({ field }) => (
        <FormItem>
          <FormLabel>No. of children (under 18):</FormLabel>
          <FormControl>
            <Counter
              {...field}
              onDecrease={(e) => {
                e.preventDefault();
                e.stopPropagation();

                typeof field.value !== 'undefined' &&
                  field.value > 0 &&
                  field.onChange(field.value - 1);
              }}
              onIncrease={(e) => {
                e.preventDefault();
                e.stopPropagation();

                typeof field.value !== 'undefined' &&
                  field.value < 100 &&
                  field.onChange(field.value + 1);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
