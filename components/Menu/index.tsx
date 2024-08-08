import { useUser } from '@clerk/clerk-react';
import { Separator } from '@/components/ui/separator';
import { UserDetails } from './UserDetails';

export default function Menu() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="bg-white w-full h-full shadow-md flex flex-col justify-between">
      <div></div>

      <div>
        <Separator />
        <UserDetails user={user} />
      </div>
    </div>
  );
}
