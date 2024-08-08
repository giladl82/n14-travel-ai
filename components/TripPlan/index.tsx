'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect } from 'react';
import Markdown from 'react-markdown';
type TripPlanProps = {
  response: string | null;
  error: Error | null;
};

export function TripPlan(props: TripPlanProps) {
  const { response, error } = props;

  useEffect(() => {
    if (response) {
      Array.from(document.getElementsByTagName('a')).forEach((link) => {
        link.setAttribute('target', '_blank');
      });
    }
  }, [response, error]);

  return (
    <Card className="shadow-md max-h-[calc(100dvh-120px)] h-full overflow-auto  mt-4 mr-4">
      <CardHeader>
        <CardTitle>
          {response
            ? 'Here is your trip plan'
            : error
            ? 'Something went wrong'
            : 'No Response'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {(response ? (
          <Markdown
            className="[&>h2]:text-xl [&>h2]:pt-4 [&>h2]:pb-1
          [&>p]:pt-2
          [&>p]:pb-2
          [&>p>a]:text-blue-500
           [&>p]:line-relaxed"
          >
            {response}
          </Markdown>
        ) : (
          error?.message
        )) ?? 'No Response'}
      </CardContent>
      <CardFooter className="sticky bottom-0 bg-white"></CardFooter>
    </Card>
  );
}
