import { useUser } from '@clerk/clerk-react';
import { Separator } from '@/components/ui/separator';
import { UserDetails } from './UserDetails';
import { usePlans } from '@/hooks/usePlans';
import { TripDetailsType } from '@/lib/schema';

export default function Menu() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { data: plans, isLoading, isError } = usePlans();

  if (!isLoaded || !isSignedIn || isError || isLoading || !plans) {
    return null;
  }

  console.log(plans.data);

  return (
    <div className="bg-white w-full h-full shadow-md flex flex-col justify-between">
      <ul>
        {plans.data?.map((plan: TripDetailsType & { id: string }) => (
          <li key={plan.id} className='p-4'>
            <a href={`/plans/${plan.id}`}>
              {plan.city} {plan.country}
              <span className='text-gray-500 text-xs block mb-2'>
                {plan.fromDate} - {plan.toDate}
              </span>
              <hr />
            </a>
          </li>
        ))}
      </ul>

      <div>
        <Separator />
        <UserDetails user={user} />
      </div>
    </div>
  );
}
