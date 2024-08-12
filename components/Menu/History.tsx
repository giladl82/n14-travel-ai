import { TripDetailsType } from '@/lib/schema';
import { Globe } from 'lucide-react';
import Link from 'next/link';

export type TripHistory = TripDetailsType & { id: string };
type HistoryProps = { history: TripHistory[] };

export function History({ history }: HistoryProps) {
  return (
    <ul>
      {history.map((trip) => (
        <li key={trip.id} className="pr-4 pl-4 pt-4 flex items-start gap-2">
          <Globe size={14} className='mt-1 text-[#4481a2]' />
          <Link href={`/${trip.id}`}>
            {trip.city} {trip.country}
            <span className="text-gray-500 text-xs block mb-2">
              {trip.fromDate} - {trip.toDate}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
