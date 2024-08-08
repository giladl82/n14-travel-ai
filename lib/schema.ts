import { z } from 'zod';

export const tripDetailsSchema = z.object({
  budget: z.string().optional().refine(v => {
    const num = Number(v);
    if (isNaN(num)) {
      return 'Budget must be a number';
    } else if(num < 0 || num > 1_000_000) {
      return 'Budget must be between 0 and 1,000,000';
    }
    return true
  }),
  numberOfAdults: z.coerce.number().min(1).max(100).optional(),
  numberOfChildren: z.coerce.number().min(0).max(100).optional(),
  country: z.string().min(1).max(50).optional(),
  city: z.string().min(1).max(50).optional(),
  hotel: z.string().min(1).max(150).optional(),
  fromDate: z
    .string()
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: 'Invalid from date',
    })
    .optional(),
  toDate: z
    .string()
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: 'Invalid to date',
    })
    .optional(),
  attractions: z.string().optional(),
  withCar: z.boolean().optional(),
});

export type TripDetailsType = z.infer<typeof tripDetailsSchema>;
