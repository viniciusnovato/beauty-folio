
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProfessional } from '@/context/ProfessionalContext';
import Header from './Header';
import Footer from './Footer';

const ProfessionalProfile = () => {
  const { profId } = useParams<{ profId: string }>();
  const { currentProfessional, setProfessionalById, setSelectedService } = useProfessional();
  
  useEffect(() => {
    if (profId) {
      setProfessionalById(profId);
    }
  }, [profId, setProfessionalById]);
  
  if (!currentProfessional) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Profissional não encontrado</h2>
          <p className="mb-6">O profissional que você está procurando não existe.</p>
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
        {/* Hero Section */}
        <section 
          className="relative py-32 md:py-40"
          style={{ backgroundColor: currentProfessional.secondaryColor }}
        >
          <div className="beauty-container">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/3">
                <img 
                  src={currentProfessional.logo} 
                  alt="Estúdio de Beleza" 
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg mx-auto md:mx-0"
                />
              </div>
              
              <div className="md:w-2/3 text-center md:text-left">
                <h1 className="beauty-heading mb-4">
                  Estúdio de Beleza
                </h1>
                <p className="text-lg mb-6 max-w-2xl">
                  {currentProfessional.bio}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to={`/pro/${currentProfessional.id}/services`}>
                    <Button className="beauty-button-primary rounded-full bg-white text-primary hover:bg-white/90" style={{ color: currentProfessional.primaryColor }}>
                      Ver Serviços
                    </Button>
                  </Link>
                  <Link to={`/pro/${currentProfessional.id}/appointment`}>
                    <Button className="beauty-button-outline rounded-full" style={{ borderColor: currentProfessional.primaryColor, color: currentProfessional.primaryColor }}>
                      Agendar Horário
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Services Section */}
        <section className="beauty-section">
          <div className="beauty-container">
            <h2 className="beauty-heading text-center mb-4">
              Serviços em Destaque
            </h2>
            
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Clique em um serviço para visualizar o portfólio com trabalhos anteriores relacionados.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentProfessional.services.slice(0, 3).map((service) => (
                <div 
                  key={service.id} 
                  className="beauty-card overflow-hidden group"
                  onClick={() => setSelectedService(service)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.images[0]} 
                      alt={service.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold">{service.name}</h3>
                      <span className="font-bold" style={{ color: currentProfessional.primaryColor }}>
                        R$ {service.price}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    <Link 
                      to={`/pro/${currentProfessional.id}/service/${service.id}`}
                      className="block py-2 text-center text-white rounded-full"
                      style={{ backgroundColor: currentProfessional.primaryColor }}
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to={`/pro/${currentProfessional.id}/services`}>
                <Button 
                  className="beauty-button-outline rounded-full" 
                  style={{ borderColor: currentProfessional.primaryColor, color: currentProfessional.primaryColor }}
                >
                  Ver Todos os Serviços
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="beauty-section bg-gray-50">
          <div className="beauty-container">
            <h2 className="beauty-heading text-center mb-12">
              O que Dizem Nossos Clientes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="beauty-card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Cliente" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Mariana Silva</h3>
                    <p className="text-sm text-gray-500">Cliente desde 2022</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Experiência incrível! O trabalho é impecável e o atendimento é sempre muito atencioso. Recomendo a todos!"
                </p>
              </div>
              
              <div className="beauty-card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/68.jpg" 
                      alt="Cliente" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Camila Oliveira</h3>
                    <p className="text-sm text-gray-500">Cliente desde 2023</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Adoro os serviços! Sempre saio muito satisfeita e recebendo muitos elogios. Ambiente acolhedor e profissionalismo impecável."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="beauty-section relative">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2215&q=80" 
              alt="Beauty Salon" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          <div className="beauty-container relative z-10 text-center text-white">
            <h2 className="beauty-heading mb-6">
              Pronto para Agendar seu Horário?
            </h2>
            <p className="beauty-subheading mb-10 max-w-2xl mx-auto text-white/90">
              Marque agora mesmo e transforme seu visual com o nosso Estúdio de Beleza
            </p>
            
            <Link to={`/pro/${currentProfessional.id}/appointment`}>
              <Button 
                className="beauty-button-primary text-lg py-6 px-8 rounded-full bg-white hover:bg-white/90"
                style={{ color: currentProfessional.primaryColor }}
              >
                Agendar Agora
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfessionalProfile;
