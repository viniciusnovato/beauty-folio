
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProfessional } from '@/context/ProfessionalContext';
import Header from './Header';
import Footer from './Footer';

const ServicesList = () => {
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
          className="relative py-20"
          style={{ backgroundColor: currentProfessional.secondaryColor }}
        >
          <div className="beauty-container text-center">
            <h1 className="beauty-heading mb-4">
              Nossos Serviços
            </h1>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Conheça todos os serviços oferecidos por {currentProfessional.name}
            </p>
          </div>
        </section>
        
        {/* Services Grid */}
        <section className="beauty-section">
          <div className="beauty-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProfessional.services.map((service) => (
                <div 
                  key={service.id} 
                  className="beauty-card overflow-hidden group cursor-pointer"
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
                    <p className="text-gray-500 mb-4 text-sm">
                      Duração: {service.duration} minutos
                    </p>
                    <Link 
                      to={`/pro/${currentProfessional.id}/service/${service.id}`}
                      className="block py-2 text-center text-white rounded-lg transition-colors duration-300"
                      style={{ backgroundColor: currentProfessional.primaryColor }}
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="beauty-section bg-gray-50">
          <div className="beauty-container text-center">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para Transformar seu Visual?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Agende seu horário agora mesmo e experimente os serviços de {currentProfessional.name}
            </p>
            <Link 
              to={`/pro/${currentProfessional.id}/appointment`}
              className="inline-block py-3 px-8 text-white rounded-lg transition-colors duration-300"
              style={{ backgroundColor: currentProfessional.primaryColor }}
            >
              Agendar Agora
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesList;
