import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="col-span-2 flex items-center justify-center">
      <SignUp />
    </div>
  );
}
