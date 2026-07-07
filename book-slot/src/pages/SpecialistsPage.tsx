import { Link, useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import type { Specialist } from '../types';

interface SpecialistsResponse {
  items: Specialist[];
}

function SpecialistsPage() {
  const { serviceId } = useParams();
  const { data, loading, error } = useFetch<SpecialistsResponse>(
    `/api/services/${serviceId}/specialists`,
  );

  if (loading) {
    return <p>Loading specialists...</p>;
  }

  if (error !== null) {
    return <p className="text-red-400">Error: {error}</p>;
  }

  if (!data || data.items.length === 0) {
    return <p>No specialists for this service.</p>;
  }

  return (
    <div>
      <p className="mb-2">
        <Link to="/" className="text-sky-400 hover:text-sky-300">
          ← Back to services
        </Link>
      </p>
      <h1 className="mb-4 text-2xl font-semibold">Choose a specialist</h1>
      <ul className="space-y-3">
        {data.items.map((specialist) => (
          <li
            key={specialist.id}
            className="rounded-lg border border-slate-700 bg-slate-800/50 p-4"
          >
            <h2 className="text-lg font-medium">{specialist.name}</h2>
            <p className="text-sm text-slate-400">{specialist.title}</p>
            <Link
              to={`/specialists/${specialist.id}?serviceId=${serviceId}`}
              className="mt-3 inline-block rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500"
            >
              Book appointment
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpecialistsPage;
