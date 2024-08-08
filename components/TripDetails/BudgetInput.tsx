import { UseFormReturn } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { TripDetailsType } from '@/lib/schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function BudgetInput({
  form,
}: {
  form: UseFormReturn<TripDetailsType>;
}) {
  return (
    <FormField
      control={form.control}
      name="budget"
      render={({ field }) => (
        <FormItem className="w-52">
          <FormLabel>Budget:</FormLabel>
          <div className="flex items-center gap-4">
            <FormControl>
              <NumericFormat
                {...field}                
                value={field.value}
                thousandSeparator={true}
                customInput={Input}
                valueIsNumericString={true}
                onValueChange={(v) => {
                  field.onChange(Number(v.value.replace(/,/g, '')));
                }}
                decimalScale={0}
                inputMode='numeric'
                fixedDecimalScale={true}
                className="text-center"
              />
            </FormControl>
            <Label className="text-xl">$</Label>
          </div>
        </FormItem>
      )}
    />
  );
}
