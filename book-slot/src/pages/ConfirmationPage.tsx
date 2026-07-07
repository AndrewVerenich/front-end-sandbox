import { Link, useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import type { Appointment } from '../types';

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ConfirmationPage() {
  const { id } = useParams();
  const { data, loading, error } = useFetch<Appointment>(`/api/appointments/${id}`);

  if (loading) {
    return <p>Loading confirmation...</p>;
  }

  if (error !== null) {
    return (
      <div>
        <p className="text-red-400">Error: {error}</p>
        <Link to="/" className="mt-4 inline-block text-sky-400">
          Back to home
        </Link>
      </div>
    );
  }

  if (!data) {
    return <p>Appointment not found.</p>;
  }

  return (
    <div className="rounded-lg border border-green-700 bg-green-900/20 p-6">
      <h1 className="mb-4 text-2xl font-semibold text-green-400">Booking confirmed</h1>
      <dl className="space-y-2 text-sm">
        <div>
          <dt className="text-slate-400">Reference</dt>
          <dd>{data.id}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Service</dt>
          <dd>{data.serviceTitle}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Specialist</dt>
          <dd>{data.specialistName}</dd>
        </div>
        <div>
          <dt className="text-slate-400">When</dt>
          <dd>{formatDateTime(data.slotStart)}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Guest</dt>
          <dd>
            {data.customer.name} · {data.customer.email} · {data.customer.phone}
          </dd>
        </div>
        <div>
          <dt className="text-slate-400">Status</dt>
          <dd>{data.status}</dd>
        </div>
      </dl>
      <Link to="/" className="mt-6 inline-block text-sky-400 hover:text-sky-300">
        Book another appointment
      </Link>
    </div>
  );
}

export default ConfirmationPage;
