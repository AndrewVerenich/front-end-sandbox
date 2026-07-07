export interface Service {
  id: string;
  title: string;
  durationMinutes: number;
  priceCents: number;
  description: string;
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  serviceIds: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface Appointment {
  id: string;
  specialistId: string;
  specialistName: string;
  serviceId: string;
  serviceTitle: string;
  slotStart: string;
  customer: Customer;
  status: string;
}

export interface FieldErrors {
  [field: string]: string[];
}
