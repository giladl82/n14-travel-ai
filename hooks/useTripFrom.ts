import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TripDetailsType, tripDetailsSchema } from '../lib/schema';
import { useTripPlanStore } from '@/providers/TripPlanProvider';

//TODO: Save trip on stream end
//TODO: Clear code

export const useTripForm = () => {
  const { details, setTripPlan, setError, reset } = useTripPlanStore(({ details, setTripPlan, setError, reset }) => ({
    details,
    setTripPlan,
    setError,
    reset,
  }));

  const form = useForm<TripDetailsType>({
    resolver: zodResolver(tripDetailsSchema),
    defaultValues: {
      budget: '10000',
      numberOfAdults: 3,
      numberOfChildren: 1,
      country: 'Germany',
      city: 'Black forest',
      hotel: 'NATURE TITISEE - Easy.Life.Hotel. Alemannenhofweg 1-5, 79822 Titisee-Neustadt, Germany',
      attractions: '',
      withCar: false,
      fromDate: new Date(2024, 8, 5).toDateString(),
      toDate: new Date(2024, 8, 11).toDateString(),
      ...details,
    },
    shouldFocusError: false,
  });

  const onSubmit = async (details: FormData) => {
    const postData = Object.fromEntries(details.entries());
    const parsed = tripDetailsSchema.safeParse(postData);

    if (!parsed.success) {
      console.log(parsed.error.errors);
      return;
    }
    try {
      reset();
      const response = await fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify(postData),
      });

      if (response?.body) {
        const reader = response.body.getReader();
        let tripPlan = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            // await saveTripPlan({
            //   ...parsed.data,
            //   budget: parsed.data.budget?.replaceAll(',', ''),
            //   plan: tripPlan
            // })
            break;
          }
          const chunk = new TextDecoder().decode(value);
          tripPlan += chunk;
          setTripPlan(chunk);
        }
      } else {
        setError(new Error('No response from server'));
      }
    } catch (error) {
      setError(error as Error);
    }

    // try {
    //   reset();
    //   const response = await callAI(details);
    //   if (response) {
    //     const chunks = response.split(' ');
    //     for (const chunk of chunks) {
    //       setTimeout(() => {
    //         setPlan(chunk + ' ');

    //       }, 400);
    //     }
    //     // setPlan(response);
    //   } else {
    //     setError(new Error('No response from server'));
    //   }
    // } catch (error) {
    //   setError(error as Error);
    // }
  };
  return { form, onSubmit };
};
