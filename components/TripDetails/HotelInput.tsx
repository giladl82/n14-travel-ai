import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { TripDetailsType } from '../../lib/schema';
import { Input } from '@/components/ui/input';

export function HotelInput({ form }: { form: UseFormReturn<TripDetailsType> }) {
  return (
    <FormField
      control={form.control}
      name="hotel"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Hotel Name/Address:</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
