import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { TripDetailsType } from '../../lib/schema';
import { useCountries } from '../../services/countries';
import { Input } from '@/components/ui/input';

export function HotelInput({ form }: { form: UseFormReturn<TripDetailsType> }) {
  const { data: countries } = useCountries();
  const cities =
    countries?.find((country) => country.country === form.getValues('country'))
      ?.cities ?? [];

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
