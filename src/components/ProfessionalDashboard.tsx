import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProfessional } from '@/context/ProfessionalContext';
import Header from './Header';
import Footer from './Footer';
import { ProfileEditForm } from './ProfileEditForm';
import { ServicesManager } from './ServicesManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ClipboardList, Settings, PaintBucket, Filter, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ProfessionalDashboard = () => {
  const { profId } = useParams<{ profId: string }>();
  const { currentProfessional, setProfessionalById } = useProfessional();
  const [activeTab, setActiveTab] = useState("appointments");
  
  useEffect(() => {
    if (profId) {
      setProfessionalById(profId);
    }
  }, [profId, setProfessionalById]);
  
  if (!currentProfessional) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Área restrita</h2>
          <p className="mb-6">Você precisa estar logado como profissional para acessar esta página.</p>
          <Link to="/" className="beauty-button-primary">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section 
          className="relative py-12 md:py-16"
          style={{ backgroundColor: "#F06292" }}
        >
          <div className="beauty-container">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <img 
                src={currentProfessional.logo} 
                alt={currentProfessional.name} 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-center md:text-left text-white">
                  Dashboard Profissional
                </h1>
                <p className="text-base md:text-lg text-center md:text-left text-white">
                  Bem-vindo(a), {currentProfessional.name}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="beauty-section">
          <div className="beauty-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
              <div className="beauty-card p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-bold">Agendamentos</h3>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Calendar className="text-primary w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: currentProfessional.primaryColor }}>
                  {currentProfessional.appointments.length}
                </div>
                <p className="text-gray-500 text-sm md:text-base">Agendamentos totais</p>
              </div>
              
              <div className="beauty-card p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-bold">Serviços</h3>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <ClipboardList className="text-primary w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: currentProfessional.primaryColor }}>
                  {currentProfessional.services.length}
                </div>
                <p className="text-gray-500 text-sm md:text-base">Serviços oferecidos</p>
              </div>
              
              <div className="beauty-card p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-bold">Média de Preço</h3>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <PaintBucket className="text-primary w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: currentProfessional.primaryColor }}>
                  R$ {Math.round(currentProfessional.services.reduce((acc, service) => acc + service.price, 0) / currentProfessional.services.length)}
                </div>
                <p className="text-gray-500 text-sm md:text-base">Valor médio dos serviços</p>
              </div>
            </div>
            
            <Tabs defaultValue="appointments" className="w-full mb-12">
              <div className="sticky top-0 bg-white z-50 py-4 border-b">
                <TabsList className="grid grid-cols-3 md:w-[400px]">
                  <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
                  <TabsTrigger value="services">Serviços</TabsTrigger>
                  <TabsTrigger value="profile">Perfil</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="appointments" className="beauty-card overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 bg-gray-50 border-b">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">Agendamentos Recentes</h2>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Filtrar por Data
                    </Button>
                    <Button variant="outline" size="sm" className="text-sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar por Status
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  {currentProfessional.appointments.length > 0 ? (
                    <>
                      {/* Desktop Table - Hidden on Mobile */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 text-sm font-medium">Cliente</th>
                              <th className="text-left py-3 px-4 text-sm font-medium">Serviço</th>
                              <th className="text-left py-3 px-4 text-sm font-medium">Data</th>
                              <th className="text-left py-3 px-4 text-sm font-medium">Horário</th>
                              <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                              <th className="text-right py-3 px-4 text-sm font-medium">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentProfessional.appointments.map((appointment) => {
                              const service = currentProfessional.services.find(s => s.id === appointment.serviceId);
                              return (
                                <tr key={appointment.id} className="border-b last:border-b-0">
                                  <td className="py-4 px-4">
                                    <div>
                                      <p className="font-medium">{appointment.clientName}</p>
                                      <p className="text-gray-500 text-sm">{appointment.clientPhone}</p>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span>{service?.name}</span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span>{appointment.date}</span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span>{appointment.timeSlotId}</span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      appointment.status === 'confirmed' 
                                        ? 'bg-green-100 text-green-800'
                                        : appointment.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                      {appointment.status === 'confirmed' ? 'Confirmado' : 
                                       appointment.status === 'pending' ? 'Pendente' : 'Cancelado'}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex justify-end gap-2">
                                      <Button variant="outline" size="sm" className="text-xs">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        Reagendar
                                      </Button>
                                      <Button variant="outline" size="sm" className="text-xs text-red-500 hover:text-red-700">
                                        <X className="w-3 h-3 mr-1" />
                                        Cancelar
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Cards */}
                      <div className="md:hidden space-y-4">
                        {currentProfessional.appointments.map((appointment) => {
                          const service = currentProfessional.services.find(s => s.id === appointment.serviceId);
                          return (
                            <div key={appointment.id} className="bg-white rounded-lg border p-4 space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{appointment.clientName}</h3>
                                  <p className="text-gray-500 text-sm">{appointment.clientPhone}</p>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  appointment.status === 'confirmed' 
                                    ? 'bg-green-100 text-green-800'
                                    : appointment.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {appointment.status === 'confirmed' ? 'Confirmado' : 
                                   appointment.status === 'pending' ? 'Pendente' : 'Cancelado'}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="text-gray-500">Serviço</p>
                                  <p className="font-medium">{service?.name}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Data</p>
                                  <p className="font-medium">{appointment.date}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Horário</p>
                                  <p className="font-medium">{appointment.timeSlotId}</p>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-2">
                                <Button variant="outline" size="sm" className="flex-1 text-xs">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Reagendar
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 text-xs text-red-500 hover:text-red-700">
                                  <X className="w-3 h-3 mr-1" />
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Nenhum agendamento encontrado.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="services">
                <div className="beauty-card p-6">
                  <ServicesManager />
                </div>
              </TabsContent>
              
              <TabsContent value="profile">
                <div className="beauty-card p-6">
                  <h2 className="text-xl font-bold mb-6">Configurações do Perfil</h2>
                  <ProfileEditForm />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfessionalDashboard;
