import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SubmitButton() {
  const data = useFormStatus();
  const isLoading = data.pending;

  return (
    <Button
      className={cn('w-full', {
        'bg-slate-300': isLoading,
        'text-slate-800': isLoading,
      })}
      disabled={isLoading}
      type="submit"
    >
      {isLoading ? (
        <>
          <Loader className="animate-spin pr-1" />
          &nbsp; Loading...
        </>
      ) : (
        <>Submit</>
      )}
    </Button>
  );
}