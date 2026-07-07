import { type FormEvent, useState } from 'react';
import type { Customer, FieldErrors } from './types';

interface BookingFormProps {
  onSubmit: (customer: Customer) => void;
  serverErrors?: FieldErrors;
  submitting: boolean;
}

function BookingForm({ onSubmit, serverErrors, submitting }: BookingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors: FieldErrors = {};

    if (name.trim() === '') {
      newErrors.name = ['Name is required'];
    }
    if (!email.includes('@')) {
      newErrors.email = ['Invalid email'];
    }
    if (phone.trim().length < 6) {
      newErrors.phone = ['Phone is too short'];
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    }
  }

  function getError(field: string): string | undefined {
    if (serverErrors && serverErrors[field]) {
      return serverErrors[field][0];
    }
    if (errors[field]) {
      return errors[field][0];
    }
    return undefined;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <h2 className="text-lg font-medium">Your details</h2>

      <div>
        <label className="mb-1 block text-sm text-slate-400" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2"
        />
        {getError('name') && <p className="mt-1 text-sm text-red-400">{getError('name')}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-400" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2"
        />
        {getError('email') && <p className="mt-1 text-sm text-red-400">{getError('email')}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-400" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2"
        />
        {getError('phone') && <p className="mt-1 text-sm text-red-400">{getError('phone')}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-sky-600 px-4 py-2 text-white hover:bg-sky-500 disabled:opacity-50"
      >
        {submitting ? 'Booking...' : 'Confirm booking'}
      </button>
    </form>
  );
}

export default BookingForm;
