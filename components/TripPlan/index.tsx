'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTripPlan } from '@/providers/TripPlanProvider';
import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';

export function TripPlan() {
  const { plan, error } = useTripPlan();
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (plan && container.current) {
      Array.from(container.current.getElementsByTagName('a')).forEach((link) => {
        link.setAttribute('target', '_blank');
      });
    }
  }, [plan, error]);

  return (
    <Card className="shadow-md max-h-[calc(100dvh-120px)] h-full overflow-auto  mt-4 mr-4">
      <CardHeader>
        <CardTitle>{plan ? 'Here is your trip plan' : error ? 'Something went wrong' : 'No Response'}</CardTitle>
      </CardHeader>
      <CardContent>
        {(plan ? (
          <div ref={container}>
            <Markdown
              className="[&>h2]:text-xl [&>h2]:pt-4 [&>h2]:pb-1
          [&>p]:pt-2
          [&>p]:pb-2
          [&>p>a]:text-blue-500
           [&>p]:line-relaxed"
            >
              {plan}
            </Markdown>
          </div>
        ) : (
          error?.message
        )) ?? 'No Response'}
      </CardContent>
      <CardFooter className="sticky bottom-0 bg-white"></CardFooter>
    </Card>
  );
}
