import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProfessional } from '@/context/ProfessionalContext';
import Header from './Header';
import Footer from './Footer';
import { Scissors, Sparkles, Star, Calendar, Palette, Heart } from 'lucide-react';

const WelcomePage = () => {
  const { professionals } = useProfessional();
  const navigate = useNavigate();
  
  // Use first professional as default example
  const defaultProfessional = professionals[0];
  
  const handleClientClick = () => {
    navigate(`/pro/${defaultProfessional.id}`);
  };
  
  const handleProfessionalClick = () => {
    // For demo purposes, direct to the professional dashboard
    navigate(`/pro/${defaultProfessional.id}/dashboard`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent={true} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 z-0 bg-[#F06292]"></div>
          
          <div className="beauty-container relative z-10 flex flex-col md:flex-row items-center justify-between py-16">
            {/* Left Side - Text Content */}
            <div className="w-full md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                BeautyFolioConnect
              </h1>
              <p className="text-xl md:text-2xl mb-10 max-w-xl text-white/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Conectando clientes a profissionais de beleza de forma simples e elegante
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Button 
                  className="text-lg py-6 px-8 bg-white text-primary hover:bg-white/90 rounded-full"
                  onClick={handleClientClick}
                >
                  Sou Cliente
                </Button>
                <Button 
                  variant="outline"
                  className="text-lg py-6 px-8 border-white hover:bg-white/10 rounded-full text-pink-500"
                  onClick={handleProfessionalClick}
                >
                  Sou Profissional
                </Button>
              </div>
            </div>
            
            {/* Right Side - Vector Icons */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-80 h-80">
                {/* Central circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ animationDuration: '3s' }}>
                  <Heart size={50} className="text-primary" />
                </div>
                
                {/* Orbiting icons */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.1s' }}>
                  <Scissors size={24} className="text-primary" />
                </div>
                
                <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                  <Sparkles size={24} className="text-primary" />
                </div>
                
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce" style={{ animationDuration: '2.7s', animationDelay: '0.8s' }}>
                  <Calendar size={24} className="text-primary" />
                </div>
                
                <div className="absolute top-1/2 left-0 transform -translate-x-1/4 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '1.2s' }}>
                  <Palette size={24} className="text-primary" />
                </div>
                
                <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.3s' }}>
                  <Star size={20} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Por que usar nossa plataforma?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Experiência Personalizada</h3>
                <p className="text-gray-600">
                  Cada profissional tem seu espaço único, com sua identidade visual e portfólio.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Agendamento Simplificado</h3>
                <p className="text-gray-600">
                  Sistema de agendamento fácil e intuitivo para os clientes marcarem seus horários.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Gestão Profissional</h3>
                <p className="text-gray-600">
                  Ferramentas para os profissionais gerenciarem seus serviços e agendamentos.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WelcomePage;