import { db } from '@/lib/db';
import { TripDetailsType } from '@/lib/schema';
import { queryClient } from '@/providers/QueryClientProvider';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from '@tanstack/react-query';

const PLANS_QUERY_KEY = ['plans'];

export const usePlans = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: PLANS_QUERY_KEY,
    queryFn: async () => {
      return await db
        .from('trips')
        .select('*')
        .eq('userId', user?.id ?? '')
        .order('createdAt', { ascending: false });
    },
    enabled: !!user,
  });
};

export const useSavePlan = () => {
  const { user } = useUser();
  return  useMutation({
    mutationFn: async (trip: TripDetailsType & { plan: string }) => {
      if (!user) return;

      await db.from('trips').insert({ ...trip, userId: user.id });
    },
    onSuccess: () => {
      console.log('Plan saved successfully');
      queryClient.invalidateQueries({ queryKey: PLANS_QUERY_KEY });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
