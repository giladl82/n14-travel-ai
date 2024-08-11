import { Separator } from '@/components/ui/separator';
import { currentUser } from '@clerk/nextjs/server';
import { History, type TripHistory } from './History';
import { UserDetails } from './UserDetails';
import { loadTripPlans } from '@/services/tripPlans';

export async function Menu() {
  const history = await loadTripPlans();
  const user = await currentUser();
  
  if(!user) return null;

  return (
    <div className="bg-white w-[400px] h-full shadow-md flex flex-col justify-between">
      <History history={history as unknown as TripHistory[] ?? []}/>

      <div className='h-44'>
        <Separator />
        <UserDetails user={user} />
      </div>
    </div>
  );
}
