import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TripDetailsType, tripDetailsSchema } from '../lib/schema';
import { useSavePlan } from '../services/tripPlans';
import { useResponseStoreModifiers } from './useResponseStore';

export const useTripForm = () => {
  const { mutate: saveTripPlan } = useSavePlan();
  const { setResponse, setError, reset } = useResponseStoreModifiers();
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
            await saveTripPlan({
              ...parsed.data,
              budget: parsed.data.budget?.replaceAll(',', ''),
              plan: tripPlan
            })
            break;
          }
          const chunk = new TextDecoder().decode(value);
          tripPlan += chunk;
          setResponse(chunk);
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
    //         setResponse(chunk + ' ');

    //       }, 400);
    //     }
    //     // setResponse(response);
    //   } else {
    //     setError(new Error('No response from server'));
    //   }
    // } catch (error) {
    //   setError(error as Error);
    // }
  };
  return { form, onSubmit };
};
