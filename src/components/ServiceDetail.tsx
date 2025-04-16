import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProfessional } from '@/context/ProfessionalContext';
import { getServiceById } from '@/utils/mockData';
import { Service } from '@/types';
import Header from './Header';
import Footer from './Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Info } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ServiceDetail = () => {
  const { profId, serviceId } = useParams<{ profId: string; serviceId: string }>();
  const { currentProfessional, setProfessionalById, setSelectedService } = useProfessional();
  const [service, setService] = useState<Service | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
  
  useEffect(() => {
    if (profId) {
      setProfessionalById(profId);
    }
    
    if (profId && serviceId) {
      const foundService = getServiceById(profId, serviceId);
      if (foundService) {
        setService(foundService);
        setSelectedService(foundService);
        setMainImage(foundService.images[0]);
      }
    }
  }, [profId, serviceId, setProfessionalById, setSelectedService]);
  
  if (!currentProfessional || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Serviço não encontrado</h2>
          <p className="mb-6">O serviço que você está procurando não existe.</p>
          <Link to="/" className="inline-block py-2 px-4 bg-primary text-white rounded-lg">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  const getRingColorClass = () => {
    return `ring-[${currentProfessional?.primaryColor || '#000'}]`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-4 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 md:mb-6">
            <Link 
              to={`/pro/${currentProfessional.id}/services`}
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors text-sm md:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"></path></svg>
              Voltar para Serviços
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="w-full">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3 md:mb-4">
                <img 
                  src={mainImage} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {service.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                      mainImage === image ? 'ring-2 ring-primary scale-95' : 'hover:scale-95'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${service.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="w-full">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">{service.name}</h1>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <span 
                  className="text-xl md:text-2xl font-bold"
                  style={{ color: currentProfessional.primaryColor }}
                >
                  R$ {service.price.toFixed(2).replace('.', ',')}
                </span>
                
                <div className="flex items-center text-gray-500 text-sm md:text-base">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                  <span>{service.duration} minutos</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6 md:mb-8">
                <h3 className="flex items-center text-base md:text-lg font-medium mb-2">
                  <Info className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Descrição
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  {service.description}
                </p>
              </div>
              
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold mb-3">O que inclui:</h3>
                <ul className="space-y-3">
                  {service.includedItems?.map((item) => (
                    <li key={item.id} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span className="text-sm md:text-base">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link 
                to={`/pro/${currentProfessional.id}/appointment?serviceId=${service.id}`}
                className="w-full block"
              >
                <Button 
                  className="w-full text-base md:text-lg py-4 md:py-6"
                  style={{ 
                    backgroundColor: currentProfessional.primaryColor,
                    color: 'white' 
                  }}
                >
                  <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Agendar este Serviço
                </Button>
              </Link>
            </div>
          </div>
          
          {currentProfessional.services.filter(s => s.id !== service.id).length > 0 && (
            <div className="mt-12 md:mt-16">
              <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Você também pode gostar</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {currentProfessional.services
                  .filter(s => s.id !== service.id)
                  .slice(0, 3)
                  .map((relatedService) => (
                    <div 
                      key={relatedService.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="aspect-video sm:aspect-square overflow-hidden">
                        <img 
                          src={relatedService.images[0]} 
                          alt={relatedService.name} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-sm md:text-base line-clamp-1">{relatedService.name}</h3>
                          <span className="font-medium text-sm md:text-base" style={{ color: currentProfessional.primaryColor }}>
                            R$ {relatedService.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <Link 
                          to={`/pro/${currentProfessional.id}/service/${relatedService.id}`}
                        >
                          <Button
                            variant="secondary"
                            className="w-full mt-2 text-xs md:text-sm py-2"
                            style={{ 
                              backgroundColor: currentProfessional.primaryColor,
                              color: 'white' 
                            }}
                          >
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
