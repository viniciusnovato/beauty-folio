
import { Professional, Service, Availability, Appointment } from '../types';

// Helper to generate random time slots
const generateTimeSlots = (startHour: number, endHour: number, intervalMinutes: number = 60) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    slots.push({
      id: `slot-${startTime}`,
      startTime,
      endTime,
      isAvailable: Math.random() > 0.3, // Randomly make some slots unavailable
    });
  }
  return slots;
};

const standardAvailability: Availability[] = [
  { day: 'monday', slots: generateTimeSlots(9, 18) },
  { day: 'tuesday', slots: generateTimeSlots(9, 18) },
  { day: 'wednesday', slots: generateTimeSlots(9, 18) },
  { day: 'thursday', slots: generateTimeSlots(9, 18) },
  { day: 'friday', slots: generateTimeSlots(9, 18) },
  { day: 'saturday', slots: generateTimeSlots(10, 15) },
  { day: 'sunday', slots: [] },
];

// Example client with appointments
const exampleClient = {
  name: "Maria Silva",
  email: "maria.silva@exemplo.com",
  phone: "(11) 98765-4321"
};

// Service for Sofia Estúdio de Beleza
const sofiaServices: Service[] = [
  {
    id: 'sof1',
    name: 'Design de Sobrancelhas',
    price: 80,
    description: 'Design personalizado de sobrancelhas para realçar o seu olhar, incluindo modelagem e correção de falhas.',
    duration: 45,
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-1.2.1&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&auto=format&fit=crop',
    ],
  },
  {
    id: 'sof2',
    name: 'Maquiagem Social',
    price: 150,
    description: 'Maquiagem para eventos sociais realizada com produtos de alta qualidade e técnicas modernas.',
    duration: 60,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588001400347-8c898d422082?ixlib=rb-1.2.1&auto=format&fit=crop',
    ],
  },
  {
    id: 'sof3',
    name: 'Depilação Facial',
    price: 70,
    description: 'Depilação completa da face com cera especial para peles sensíveis.',
    duration: 30,
    images: [
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop',
    ],
  },
  {
    id: 'sof4',
    name: 'Pacote Noiva',
    price: 450,
    description: 'Pacote completo para noivas incluindo teste de maquiagem, design de sobrancelhas e maquiagem no dia.',
    duration: 240,
    images: [
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607030389235-5212a868b3a1?ixlib=rb-1.2.1&auto=format&fit=crop',
    ],
  },
];

// Services for Lucas Barbershop
const lucasServices: Service[] = [
  {
    id: 'luc1',
    name: 'Corte Masculino',
    price: 70,
    description: 'Corte moderno com acabamento preciso, inclui lavagem e finalização.',
    duration: 45,
    images: [
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop',
    ],
  },
  {
    id: 'luc2',
    name: 'Barba',
    price: 50,
    description: 'Modelagem de barba com toalha quente, produtos especiais e hidratação.',
    duration: 30,
    images: [
      'https://images.unsplash.com/photo-1591672748041-146a9d3ffc33?ixlib=rb-1.2.1&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579975098263-56af4bbe9a90?ixlib=rb-1.2.1&auto=format&fit=crop',
    ],
  },
  {
    id: 'luc3',
    name: 'Corte + Barba',
    price: 110,
    description: 'Combo completo de corte masculino e modelagem de barba, com produtos premium.',
    duration: 75,
    images: [
      'https://images.unsplash.com/photo-1560700065-c55a11f2d3e6?ixlib=rb-1.2.1&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?ixlib=rb-1.2.1&auto=format&fit=crop',
    ],
  },
  {
    id: 'luc4',
    name: 'Corte Degradê',
    price: 85,
    description: 'Corte especializado com técnica de degradê precisa e personalizada.',
    duration: 60,
    images: [
      'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?ixlib=rb-1.2.1&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-1.2.1&auto=format&fit=crop',
    ],
  },
];

// Example appointments
const exampleAppointments: Appointment[] = [
  {
    id: 'apt1',
    serviceId: 'sof2',
    clientName: exampleClient.name,
    clientPhone: exampleClient.phone,
    clientEmail: exampleClient.email,
    date: '2025-04-20',
    timeSlotId: 'slot-14:00',
    status: 'confirmed',
    notes: 'Cliente solicitou maquiagem em tons neutros para evento corporativo.'
  },
  {
    id: 'apt2',
    serviceId: 'sof1',
    clientName: 'Ana Paula Ferreira',
    clientPhone: '(11) 97654-3210',
    clientEmail: 'ana.ferreira@exemplo.com',
    date: '2025-04-22',
    timeSlotId: 'slot-10:00',
    status: 'confirmed'
  },
  {
    id: 'apt3',
    serviceId: 'luc3',
    clientName: 'João Mendes',
    clientPhone: '(11) 91234-5678',
    clientEmail: 'joao.mendes@exemplo.com',
    date: '2025-04-18',
    timeSlotId: 'slot-16:00',
    status: 'confirmed',
    notes: 'Cliente alérgico a alguns produtos. Verificar antes.'
  }
];

export const mockProfessionals: Professional[] = [
  {
    id: 'prof1',
    name: 'Sofia Estúdio de Beleza',
    bio: 'Estúdio especializado em design de sobrancelhas, maquiagem profissional e tratamentos faciais. Trabalhamos com produtos premium e atendimento personalizado.',
    logo: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?ixlib=rb-1.2.1&auto=format&fit=crop',
    primaryColor: '#D8BFD8',
    secondaryColor: '#F0E6FF',
    services: sofiaServices,
    availability: standardAvailability,
    appointments: [exampleAppointments[0], exampleAppointments[1]],
  },
  {
    id: 'prof2',
    name: 'Lucas Barbershop',
    bio: 'Barbearia moderna com atendimento exclusivo, especializada em cortes masculinos, barba e tratamentos capilares. Ambiente descontraído e profissional.',
    logo: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?ixlib=rb-1.2.1&auto=format&fit=crop',
    primaryColor: '#3A506B',
    secondaryColor: '#E0E1DD',
    services: lucasServices,
    availability: standardAvailability,
    appointments: [exampleAppointments[2]],
  },
];

// Function to find a professional by ID
export const getProfessionalById = (id: string): Professional | undefined => {
  return mockProfessionals.find(prof => prof.id === id);
};

// Function to get all professionals
export const getAllProfessionals = (): Professional[] => {
  return mockProfessionals;
};

// Function to find a service by ID
export const getServiceById = (profId: string, serviceId: string): Service | undefined => {
  const professional = getProfessionalById(profId);
  return professional?.services.find(service => service.id === serviceId);
};
