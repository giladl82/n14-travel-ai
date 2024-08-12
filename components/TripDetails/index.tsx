'use client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useTripForm } from '../../hooks/userTripFrom';
import { Form } from '../ui/form';
import { AdultsCounter } from './AdultsCounter';
import { Attractions } from './Attractions';
import { BudgetInput } from './BudgetInput';
import { ChildrenCounter } from './ChildrenCounter';
import { CityInput } from './CityInput';
import { CountryInput } from './CountryInput';
import { DateRangePicker } from './DateRangePicker';
import { FormHeader } from './FormHeader';
import { WithCarInput } from './WithCar';

import { useRef } from 'react';
import { HotelInput } from './HotelInput';
import { SubmitButton } from './SubmitButton';

export function TripDetails() {
  const { form, onSubmit } = useTripForm();

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Card className="shadow-md  max-h-[calc(100dvh-120px)] overflow-auto mt-4">
      <FormHeader />
      <Form {...form}>
        <form ref={formRef} action={onSubmit}>
          <CardContent className="flex flex-col gap-3">
            <div className="flex gap-16">
              <AdultsCounter form={form} />
              <ChildrenCounter form={form} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <CountryInput form={form} />
              <CityInput form={form} />

              <DateRangePicker form={form} />
              <BudgetInput form={form} />
            </div>
            <HotelInput form={form} />
            <Attractions form={form} />
            <div className="mt-3 mb-3">
              <WithCarInput form={form} />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
