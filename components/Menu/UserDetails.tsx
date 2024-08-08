import { SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';

type UserDetailsProps = {
  user: {
    imageUrl: string;
    fullName: string | null;
    firstName: string | null;
  };
};

export function UserDetails({ user }: UserDetailsProps) {
  return (
    <div className="flex flex-col items-center [&>button]:text-[#296281] [&>button]:underline p-4">
      <div className="flex gap-4 items-center justify-center">
        <Image
          src={user.imageUrl}
          alt={user.fullName ?? 'User profile picture'}
          width={32}
          height={32}
          className="rounded-full"
        />
        {user.fullName ?? user.firstName ?? ''}
      </div>
      <SignOutButton></SignOutButton>
    </div>
  );
}
