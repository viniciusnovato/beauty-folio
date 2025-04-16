import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type Professional = Database['public']['Tables']['professionals']['Row'];
type Service = Database['public']['Tables']['services']['Row'];
type Appointment = Database['public']['Tables']['appointments']['Row'];

interface ProfessionalContextType {
  currentProfessional: Professional | null;
  setProfessionalById: (id: string) => Promise<void>;
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  bookAppointment: (serviceId: string, formData: ClientFormData) => Promise<void>;
  professionals: Professional[];
  updateProfessionalProfile: (data: Partial<Professional>) => Promise<void>;
  addService: (data: Omit<Service, 'id' | 'created_at' | 'professional_id'>) => Promise<void>;
  updateService: (serviceId: string, data: Partial<Service>) => Promise<void>;
  deleteService: (serviceId: string) => Promise<void>;
}

interface ClientFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlotId: string;
}

const ProfessionalContext = createContext<ProfessionalContextType | undefined>(undefined);

export const useProfessional = () => {
  const context = useContext(ProfessionalContext);
  if (!context) {
    throw new Error('useProfessional must be used within a ProfessionalProvider');
  }
  return context;
};

export const ProfessionalProvider = ({ children }: { children: ReactNode }) => {
  const [currentProfessional, setCurrentProfessional] = useState<Professional | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  const setProfessionalById = async (id: string) => {
    try {
      // Buscar profissional
      const { data: professional, error: professionalError } = await supabase
        .from('professionals')
        .select('*')
        .eq('id', id)
        .single();

      if (professionalError) throw professionalError;

      // Buscar serviços do profissional
      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('professional_id', id);

      if (servicesError) throw servicesError;

      // Buscar agendamentos do profissional
      const { data: appointments, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .eq('professional_id', id);

      if (appointmentsError) throw appointmentsError;

      // Buscar disponibilidade do profissional
      const { data: availability, error: availabilityError } = await supabase
        .from('availability')
        .select('*')
        .eq('professional_id', id);

      if (availabilityError) throw availabilityError;

      setCurrentProfessional({
        ...professional,
        services,
        appointments,
        availability
      } as any);
    } catch (error) {
      console.error('Error fetching professional:', error);
      toast({
        title: "Erro ao carregar profissional",
        description: "Não foi possível carregar os dados do profissional.",
        variant: "destructive",
      });
    }
  };

  const updateProfessionalProfile = async (data: Partial<Professional>) => {
    if (!currentProfessional) return;

    try {
      const { data: updatedProfessional, error } = await supabase
        .from('professionals')
        .update(data)
        .eq('id', currentProfessional.id)
        .select()
        .single();

      if (error) throw error;

      setCurrentProfessional({ ...currentProfessional, ...updatedProfessional });
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erro ao atualizar perfil",
        description: "Não foi possível atualizar suas informações.",
        variant: "destructive",
      });
    }
  };

  const addService = async (data: Omit<Service, 'id' | 'created_at' | 'professional_id'>) => {
    if (!currentProfessional) return;

    try {
      const { data: newService, error } = await supabase
        .from('services')
        .insert({
          ...data,
          professional_id: currentProfessional.id
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentProfessional({
        ...currentProfessional,
        services: [...(currentProfessional.services || []), newService]
      } as any);

      toast({
        title: "Serviço adicionado",
        description: "O serviço foi adicionado com sucesso.",
      });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: "Erro ao adicionar serviço",
        description: "Não foi possível adicionar o serviço.",
        variant: "destructive",
      });
    }
  };

  const updateService = async (serviceId: string, data: Partial<Service>) => {
    if (!currentProfessional) return;

    try {
      const { data: updatedService, error } = await supabase
        .from('services')
        .update(data)
        .eq('id', serviceId)
        .select()
        .single();

      if (error) throw error;

      setCurrentProfessional({
        ...currentProfessional,
        services: currentProfessional.services?.map(service =>
          service.id === serviceId ? updatedService : service
        )
      } as any);

      toast({
        title: "Serviço atualizado",
        description: "O serviço foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Erro ao atualizar serviço",
        description: "Não foi possível atualizar o serviço.",
        variant: "destructive",
      });
    }
  };

  const deleteService = async (serviceId: string) => {
    if (!currentProfessional) return;

    try {
      // Verificar se existem agendamentos para este serviço
      const { data: appointments, error: checkError } = await supabase
        .from('appointments')
        .select('id')
        .eq('service_id', serviceId);

      if (checkError) throw checkError;

      if (appointments && appointments.length > 0) {
        toast({
          title: "Não é possível excluir",
          description: "Este serviço possui agendamentos. Cancele os agendamentos primeiro.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;

      setCurrentProfessional({
        ...currentProfessional,
        services: currentProfessional.services?.filter(service => service.id !== serviceId)
      } as any);

      toast({
        title: "Serviço excluído",
        description: "O serviço foi removido com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Erro ao excluir serviço",
        description: "Não foi possível excluir o serviço.",
        variant: "destructive",
      });
    }
  };

  const bookAppointment = async (serviceId: string, formData: ClientFormData) => {
    if (!currentProfessional) return;

    try {
      const { data: appointment, error } = await supabase
        .from('appointments')
        .insert({
          professional_id: currentProfessional.id,
          service_id: serviceId,
          client_name: formData.name,
          client_phone: formData.phone,
          client_email: formData.email,
          date: formData.date,
          time_slot_id: formData.timeSlotId,
          status: 'confirmed'
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentProfessional({
        ...currentProfessional,
        appointments: [...(currentProfessional.appointments || []), appointment]
      } as any);

      toast({
        title: "Agendamento confirmado!",
        description: `Seu horário foi reservado com ${currentProfessional.name}`,
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Erro no agendamento",
        description: "Não foi possível confirmar seu agendamento.",
        variant: "destructive",
      });
    }
  };

  return (
    <ProfessionalContext.Provider 
      value={{ 
        currentProfessional, 
        setProfessionalById, 
        selectedService, 
        setSelectedService, 
        bookAppointment,
        professionals,
        updateProfessionalProfile,
        addService,
        updateService,
        deleteService
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
};
