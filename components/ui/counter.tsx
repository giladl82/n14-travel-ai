import { Input, InputProps } from '@/components/ui/input';
import { Button } from '../ui/button';
import { MouseEventHandler, forwardRef } from 'react';

type CounterProps = {
  onDecrease: MouseEventHandler<HTMLButtonElement>;
  onIncrease: MouseEventHandler<HTMLButtonElement>;
} & InputProps;

export const Counter = forwardRef<HTMLInputElement, CounterProps>(
  ({ className, onDecrease, onIncrease, ...props }: CounterProps, ref) => {
    return (
      <div className="flex gap-4">
        <Button onClick={onDecrease}>-</Button>
        <Input
          type="number"
          readOnly
          ref={ref}
          className="w-16 text-center"
          {...props}
        />
        <Button onClick={onIncrease}>+</Button>
      </div>
    );
  }
);

Counter.displayName = 'Counter';
