export interface Professional {
  id: string;
  name: string;
  bio: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  services: Service[];
  availability: Availability[];
  appointments: Appointment[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  images: string[];
  includedItems: Array<{
    id: string;
    text: string;
  }>;
}

export interface Availability {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  slots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  startTime: string; // format: HH:MM
  endTime: string; // format: HH:MM
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  serviceId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  date: string; // format: YYYY-MM-DD
  timeSlotId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
}

export interface ClientFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlotId: string;
}
