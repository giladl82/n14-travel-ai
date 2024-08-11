import { loadTripPlans } from '@/services/tripPlans';

export const dynamic = 'force-dynamic';

export async function GET() {
  const history = await loadTripPlans();
  return Response.json(history);
}
