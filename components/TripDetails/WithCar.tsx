import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { TripDetailsType } from '../../lib/schema';
import { Checkbox } from '@/components/ui/checkbox';
export function WithCarInput({
  form,
}: {
  form: UseFormReturn<TripDetailsType>;
}) {
  return (
    <FormField
      control={form.control}
      name="withCar"
      render={({ field }) => (
        <FormItem className="flex gap-4 items-center">
          <FormLabel>Do you have a car?</FormLabel>
          <FormControl>
            <>
              <Checkbox
                name={field.name}
                style={{ marginTop: 0 }}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
