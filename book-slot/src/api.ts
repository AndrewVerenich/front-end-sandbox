import type { Appointment, Customer, FieldErrors } from './types';

interface CreateAppointmentBody {
  specialistId: string;
  serviceId: string;
  slotStart: string;
  customer: Customer;
}

interface CreateResult {
  ok: true;
  appointment: Appointment;
}

interface CreateError {
  ok: false;
  status: number;
  message: string;
  errors?: FieldErrors;
}

export type PostAppointmentResult = CreateResult | CreateError;

export async function postAppointment(
  body: CreateAppointmentBody,
): Promise<PostAppointmentResult> {
  const res = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (res.status === 201) {
    return { ok: true, appointment: json as Appointment };
  }

  return {
    ok: false,
    status: res.status,
    message: json.message ?? 'Request failed',
    errors: json.errors,
  };
}
