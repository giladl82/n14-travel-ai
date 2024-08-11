import { TripDetailsType } from '@/lib/schema';
import Link from 'next/link';

export type TripHistory = (TripDetailsType & { id: string })
type HistoryProps = { history: TripHistory[] };

export function History({ history }: HistoryProps) {
  return (
    <ul>
      {history.map((trip) => (
        <li key={trip.id} className="p-4">
          <Link href={`/plans/${trip.id}`}>
            {trip.city} {trip.country}
            <span className="text-gray-500 text-xs block mb-2">
              {trip.fromDate} - {trip.toDate}
            </span>
            <hr />
          </Link>
        </li>
      ))}
    </ul>
  );
}
