
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useProfessional } from '@/context/ProfessionalContext';
import { Service, TimeSlot, ClientFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import Header from './Header';
import Footer from './Footer';

const AppointmentForm = () => {
  const { profId } = useParams<{ profId: string }>();
  const { currentProfessional, setProfessionalById, bookAppointment } = useProfessional();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
  }>({
    name: '',
    phone: '',
    email: '',
  });
  
  // Get the service ID from URL query parameter if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceId = params.get('serviceId');
    if (serviceId) {
      setSelectedService(serviceId);
    }
  }, [location]);
  
  // Load professional data
  useEffect(() => {
    if (profId) {
      setProfessionalById(profId);
    }
  }, [profId, setProfessionalById]);
  
  // Generate available dates (next 14 days)
  useEffect(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Format as YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
    
    setAvailableDates(dates);
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  }, []);
  
  // Generate available time slots for the selected date
  useEffect(() => {
    if (currentProfessional && selectedDate) {
      const date = new Date(selectedDate);
      const dayOfWeek = date.getDay();
      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const dayName = dayNames[dayOfWeek] as 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
      
      const availabilityForDay = currentProfessional.availability.find(a => a.day === dayName);
      if (availabilityForDay) {
        setAvailableTimeSlots(availabilityForDay.slots.filter(slot => slot.isAvailable));
        if (availabilityForDay.slots.length > 0 && availabilityForDay.slots.some(slot => slot.isAvailable)) {
          const firstAvailableSlot = availabilityForDay.slots.find(slot => slot.isAvailable);
          if (firstAvailableSlot) {
            setSelectedTimeSlot(firstAvailableSlot.id);
          }
        } else {
          setSelectedTimeSlot('');
        }
      } else {
        setAvailableTimeSlots([]);
        setSelectedTimeSlot('');
      }
    }
  }, [currentProfessional, selectedDate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedService) {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, selecione um serviço.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedDate) {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, selecione uma data.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTimeSlot) {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, selecione um horário.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Erro no agendamento",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
      });
      return;
    }
    
    // Create appointment
    const appointmentData: ClientFormData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      date: selectedDate,
      timeSlotId: selectedTimeSlot,
    };
    
    bookAppointment(selectedService, appointmentData);
    
    // Navigate to confirmation or profile
    if (currentProfessional) {
      navigate(`/pro/${currentProfessional.id}`);
    }
  };
  
  if (!currentProfessional) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Profissional não encontrado</h2>
          <p className="mb-6">O profissional que você está procurando não existe.</p>
          <Button className="beauty-button-primary">
            Voltar para a página inicial
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section 
          className="relative py-16"
          style={{ backgroundColor: currentProfessional.secondaryColor }}
        >
          <div className="beauty-container text-center">
            <h1 className="beauty-heading mb-4">
              Agendar Horário
            </h1>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Escolha um serviço e um horário disponível para agendar com {currentProfessional.name}
            </p>
          </div>
        </section>
        
        <section className="beauty-section">
          <div className="beauty-container">
            <div className="max-w-2xl mx-auto beauty-card p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">1. Escolha o Serviço</h2>
                  
                  <RadioGroup value={selectedService} onValueChange={setSelectedService} className="space-y-4">
                    {currentProfessional.services.map((service) => (
                      <div 
                        key={service.id} 
                        className={`flex items-center space-x-2 p-4 border rounded-lg transition-all cursor-pointer ${
                          selectedService === service.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <RadioGroupItem value={service.id} id={`service-${service.id}`} />
                        <div className="flex-grow">
                          <Label 
                            htmlFor={`service-${service.id}`}
                            className="text-lg font-medium cursor-pointer"
                          >
                            {service.name}
                          </Label>
                          <p className="text-gray-500 text-sm">
                            {service.duration} minutos
                          </p>
                        </div>
                        <div className="font-bold" style={{ color: currentProfessional.primaryColor }}>
                          R$ {service.price}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">2. Escolha a Data e Horário</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="date" className="mb-2 block">Data</Label>
                      <Select value={selectedDate} onValueChange={setSelectedDate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma data" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDates.map((date) => (
                            <SelectItem key={date} value={date}>
                              {new Date(date).toLocaleDateString('pt-BR', {
                                weekday: 'long', 
                                day: 'numeric', 
                                month: 'long'
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="time" className="mb-2 block">Horário</Label>
                      <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimeSlots.length > 0 ? (
                            availableTimeSlots.map((slot) => (
                              <SelectItem key={slot.id} value={slot.id}>
                                {slot.startTime} - {slot.endTime}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              Nenhum horário disponível
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">3. Suas Informações</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="mb-2 block">Nome Completo</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Digite seu nome completo"
                        className="beauty-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="mb-2 block">Telefone</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(00) 00000-0000"
                        className="beauty-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="mb-2 block">E-mail</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        className="beauty-input"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="beauty-button-primary w-full text-lg"
                  style={{ backgroundColor: currentProfessional.primaryColor }}
                >
                  Confirmar Agendamento
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppointmentForm;
