'use client';
import { TripDetails } from '@/components/TripDetails';
import { TripPlan } from '@/components/TripPlan';
import { useResponseStore } from '../../hooks/useResponseStore';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import Menu from '../Menu';
import { useIsClient } from '@/hooks/useIsClient';
import { cn } from '@/lib/utils';
export function Main() {
  const { error, response } = useResponseStore(({ error, response }) => ({
    error,
    response,
  }));

  const isClient = useIsClient();
  const isLargeScreen = useIsLargeScreen();
  const shouldShowPlan = error || response || isLargeScreen;
  return (
    <main
      className={cn(
        'grid grid-cols-1 lg:grid-cols-[300px_2fr_2fr] gap-4 justify-between grow bg-teal-50',
        {
          hidden: !isClient,
        }
      )}
    >
      {isLargeScreen && <Menu />}

      <TripDetails />
      {shouldShowPlan && <TripPlan response={response} error={error} />}
    </main>
  );
}
