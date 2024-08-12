'use client';
import { TripDetails } from '@/components/TripDetails';
import { TripPlan } from '@/components/TripPlan';
import { useIsClient } from '@/hooks/useIsClient';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import { cn } from '@/lib/utils';
import { useTripPlan } from '@/providers/TripPlanProvider';
import { Menu } from '../Menu';

export function Main() {
  const { error, plan } = useTripPlan();

  const isClient = useIsClient();
  const isLargeScreen = useIsLargeScreen();
  const shouldShowPlan = error || plan || isLargeScreen;
  return null;
  // <main
  //   className={cn(
  //     'grid grid-cols-1 lg:grid-cols-[300px_2fr_2fr] gap-4 justify-between grow bg-teal-50',
  //     {
  //       hidden: !isClient,
  //     }
  //   )}
  // >
  //   {isLargeScreen && <Menu />}

  //   <TripDetails />
  //   {shouldShowPlan && <TripPlan plan={plan} error={error} />}
  // </main>
}
