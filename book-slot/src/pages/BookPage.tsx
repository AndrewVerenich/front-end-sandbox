import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import BookingForm from '../BookingForm';
import SlotPicker from '../SlotPicker';
import { postAppointment } from '../api';
import useFetch from '../useFetch';
import type { FieldErrors, Specialist, TimeSlot } from '../types';

interface SlotsResponse {
  items: TimeSlot[];
}

function todayIso(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function BookPage() {
  const { specialistId } = useParams();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('serviceId') ?? '';
  const navigate = useNavigate();

  const [date, setDate] = useState(todayIso());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<FieldErrors | undefined>();

  const { data: specialist, loading: specLoading, error: specError } = useFetch<Specialist>(
    `/api/specialists/${specialistId}`,
  );

  const { data: slotsData, loading: slotsLoading, error: slotsError } = useFetch<SlotsResponse>(
    `/api/specialists/${specialistId}/slots?date=${date}`,
  );

  async function handleBook(customer: { name: string; email: string; phone: string }) {
    if (!selectedTime || !specialistId || !serviceId) {
      setFormError('Please pick a time slot first.');
      return;
    }

    setSubmitting(true);
    setFormError(null);
    setServerErrors(undefined);

    const slotStart = `${date}T${selectedTime}:00`;

    const result = await postAppointment({
      specialistId,
      serviceId,
      slotStart,
      customer,
    });

    setSubmitting(false);

    if (result.ok) {
      navigate(`/appointments/${result.appointment.id}`);
      return;
    }

    if (result.status === 422 && result.errors) {
      setServerErrors(result.errors);
      return;
    }

    setFormError(result.message);
  }

  if (specLoading) {
    return <p>Loading...</p>;
  }

  if (specError !== null) {
    return <p className="text-red-400">Error: {specError}</p>;
  }

  if (!specialist) {
    return <p>Specialist not found.</p>;
  }

  return (
    <div>
      <p className="mb-2">
        <Link
          to={`/services/${serviceId}`}
          className="text-sky-400 hover:text-sky-300"
        >
          ← Back to specialists
        </Link>
      </p>

      <h1 className="mb-1 text-2xl font-semibold">Book with {specialist.name}</h1>
      <p className="mb-6 text-slate-400">{specialist.title}</p>

      <div>
        <label className="mb-2 block text-sm text-slate-400" htmlFor="date">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setSelectedTime(null);
          }}
          className="rounded border border-slate-600 bg-slate-900 px-3 py-2"
        />
      </div>

      <div className="mt-4">
        <h2 className="mb-2 text-lg font-medium">Available slots</h2>
        {slotsLoading && <p>Loading slots...</p>}
        {slotsError !== null && <p className="text-red-400">Error: {slotsError}</p>}
        {slotsData && (
          <SlotPicker
            slots={slotsData.items}
            selectedTime={selectedTime}
            onSelect={setSelectedTime}
          />
        )}
      </div>

      {formError && <p className="mt-4 text-red-400">{formError}</p>}

      <BookingForm
        onSubmit={handleBook}
        serverErrors={serverErrors}
        submitting={submitting}
      />
    </div>
  );
}

export default BookPage;
