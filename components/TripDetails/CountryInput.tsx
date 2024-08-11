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

export function CountryInput({
  form,
}: {
  form: UseFormReturn<TripDetailsType>;
}) {
  const { data: countries } = useCountries();

  return (
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>Country:</FormLabel>
          <FormControl>
            <Autocomplete
              {...field}
              suggestions={countries?.map((country) => country.country) ?? []}
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
