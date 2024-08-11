'use server';

import { createClient } from '@/lib/db';
import { TripDetailsType } from '@/lib/schema';
import { currentUser } from '@clerk/nextjs/server';
import { revalidateTag } from 'next/cache';

export const loadTripPlans = async () => {
  const user = await currentUser();
  if (!user) return;

  const db = createClient();

  const result = await db
    .from('trips')
    .select('*')
    .eq('userId', user?.id ?? '')
    .order('createdAt', { ascending: false });

  if (result.error) {
    throw result.error;
  }

  return result.data;
};

export const loadTripPlan = async (id: string) => {
  const user = await currentUser();
  if (!user || !id) return;

  const db = createClient();

  return await db
    .from('trips')
    .select('*')
    .eq('userId', user?.id ?? '')
    .eq('id', id)
    .single();
};

export const useSavePlan = async (trip: TripDetailsType & { plan: string }) => {
  const user = await currentUser();
  if (!user) return;

  const db = createClient();

  await db.from('trips').insert({ ...trip, userId: user.id });

  revalidateTag('history');
};
