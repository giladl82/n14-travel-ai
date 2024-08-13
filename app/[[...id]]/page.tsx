import { TripDetails } from '@/components/TripDetails';
import { TripPlan } from '@/components/TripPlan';
import { CountriesProvider } from '@/providers/CountriesProvider';
import { TripPlanStoreProvider } from '@/providers/TripPlanProvider';
import { loadCountries } from '@/services/countries';
import { loadTripPlan } from '@/services/tripPlans';

export default async function Home({ params }: { params: { id: string } }) {
  const countries = (await loadCountries()) ?? [];
  const tripPlan = params.id ? await loadTripPlan(params.id) : null;

  return (
    <>
      <CountriesProvider initialCountries={countries}>
        <TripPlanStoreProvider plan={tripPlan?.data.plan ?? ''} details={tripPlan?.data ?? null}>
          <TripDetails />
          <TripPlan />
        </TripPlanStoreProvider>
      </CountriesProvider>
    </>
  );
}
