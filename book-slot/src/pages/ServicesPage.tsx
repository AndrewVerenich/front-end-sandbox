import { Link } from 'react-router-dom';
import useFetch from '../useFetch';
import type { Service } from '../types';

interface ServicesResponse {
  items: Service[];
}

function ServicesPage() {
  const { data, loading, error } = useFetch<ServicesResponse>('/api/services');

  if (loading) {
    return <p>Loading services...</p>;
  }

  if (error !== null) {
    return <p className="text-red-400">Error: {error}</p>;
  }

  if (!data || data.items.length === 0) {
    return <p>No services found.</p>;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Choose a service</h1>
      <ul className="space-y-3">
        {data.items.map((service) => (
          <li
            key={service.id}
            className="rounded-lg border border-slate-700 bg-slate-800/50 p-4"
          >
            <h2 className="text-lg font-medium">{service.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{service.description}</p>
            <p className="mt-2 text-sm text-slate-300">
              {service.durationMinutes} min · €{(service.priceCents / 100).toFixed(2)}
            </p>
            <Link
              to={`/services/${service.id}`}
              className="mt-3 inline-block rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500"
            >
              Pick specialist
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServicesPage;
