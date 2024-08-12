import { TripDetails } from '@/components/TripDetails';
import { TripPlan } from '@/components/TripPlan';
import { CountriesProvider } from '@/providers/CountriesProvider';
import { TripPlanProvider } from '@/providers/TripPlanProvider';
import { loadCountries } from '@/services/countries';
import { loadTripPlan } from '@/services/tripPlans';

export default async function Home({ params }: { params: { id: string } }) {
  const countries = (await loadCountries()) ?? [];
  const tripPlan = params.id ? await loadTripPlan(params.id) : null;

  return (
    <>
      <CountriesProvider initialCountries={countries}>
        <TripPlanProvider initialTripPlan={tripPlan?.data.plan ?? ''}>
          <TripDetails />
          <TripPlan />
        </TripPlanProvider>
      </CountriesProvider>
    </>
  );
}
