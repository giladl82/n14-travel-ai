import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { TripDetailsType } from '../../lib/schema';
import { Autocomplete } from '../ui/autocomplete';
import { useCountries } from '../../services/countries';

export function CityInput({ form }: { form: UseFormReturn<TripDetailsType> }) {
  const { data: countries } = useCountries();
  const cities =
    countries?.find((country) => country.country === form.getValues('country'))
      ?.cities ?? [];

  return (
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem>
          <FormLabel>City:</FormLabel>
          <FormControl>
            <Autocomplete
              {...field}
              suggestions={cities}
              onSuggestionSelected={(suggestion: string) => {
                field.onChange(suggestion);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
