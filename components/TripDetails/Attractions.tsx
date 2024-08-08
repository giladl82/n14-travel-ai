import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { TripDetailsType } from '../../lib/schema';
import { Toggle } from '@/components/ui/toggle';
import { MultiSelect } from '@/components/ui/multiselect';

const attractions = [
  { icon: '🎢', label: 'Theme Park' },
  { icon: '🦁', label: 'Zoo' },
  { icon: '🖼️', label: 'Museum' },
  { icon: '🐠', label: 'Aquarium' },
  { icon: '🌸', label: 'Botanical Garden' },
  { icon: '🏰', label: 'Historical Site' },
  { icon: '🕹️', label: 'Amusement Arcade' },
  { icon: '🌊', label: 'Water Park' },
  { icon: '🏞️', label: 'National Park' },
  { icon: '🎶', label: 'Concert Hall' },
  { icon: '🎨', label: 'Art Gallery' },
  { icon: '🧗‍♂️', label: 'Rope Park' },
  { icon: '🔬', label: 'Science Center' },
  { icon: '🌌', label: 'Planetarium' },
  { icon: '🏖️', label: 'Beach' },
  { icon: '🎿', label: 'Ski Resort' },
  { icon: '🎭', label: 'Cultural Festival' },
  { icon: '🎪', label: 'Circus' },
  { icon: '🐘', label: 'Safari' },
  { icon: '🥾', label: 'Hiking Trail' },
]
  .sort((a, b) => a.label.localeCompare(b.label))
  .map((at) => ({ label: `${at.icon} ${at.label}`, value: at.label }));

export function Attractions({
  form,
}: {
  form: UseFormReturn<TripDetailsType>;
}) {
  return (
    <FormField
      control={form.control}
      name="attractions"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>Attractions</FormLabel>
          <FormControl>
            <>
              <input type="hidden" {...field} />
              <MultiSelect
                id={field.name}
                options={attractions}
                selectedOptions={attractions.filter((at) =>
                  form.getValues('attractions')?.includes(at.value)
                )}
                setSelectedOptions={(options) => {
                  form.setValue(
                    'attractions',
                    options.map((op) => op.value).join(', ')
                  );
                }}
              />
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
