import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfessional } from '@/context/ProfessionalContext';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  transparent?: boolean;
}

const Header = ({ transparent = false }: HeaderProps) => {
  const { currentProfessional } = useProfessional();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isMenuOpen ? "bg-[#F06292]" : transparent ? "bg-transparent" : "bg-[#F06292]"
        )}
      >
        <div className="beauty-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              {currentProfessional ? (
                <>
                  <img 
                    src={currentProfessional.logo} 
                    alt="Logo" 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-lg md:text-xl text-white">
                    Estúdio de Beleza
                  </span>
                </>
              ) : (
                <span className="font-semibold text-lg md:text-xl text-white">
                  BeautyFolioConnect
                </span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {currentProfessional ? (
                <>
                  <Link 
                    to={`/pro/${currentProfessional.id}`} 
                    className="font-medium text-white hover:opacity-80 transition-opacity"
                  >
                    Início
                  </Link>
                  <Link 
                    to={`/pro/${currentProfessional.id}/services`} 
                    className="font-medium text-white hover:opacity-80 transition-opacity"
                  >
                    Serviços
                  </Link>
                </>
              ) : null}
              <Link 
                to="/" 
                className="font-medium text-white hover:opacity-80 transition-opacity"
              >
                {currentProfessional ? 'Mudar Profissional' : 'Início'}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <nav className="flex flex-col gap-4">
                {currentProfessional ? (
                  <>
                    <Link 
                      to={`/pro/${currentProfessional.id}`} 
                      className="text-white font-medium px-4 py-2 hover:bg-white/10 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Início
                    </Link>
                    <Link 
                      to={`/pro/${currentProfessional.id}/services`} 
                      className="text-white font-medium px-4 py-2 hover:bg-white/10 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Serviços
                    </Link>
                  </>
                ) : null}
                <Link 
                  to="/" 
                  className="text-white font-medium px-4 py-2 hover:bg-white/10 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentProfessional ? 'Mudar Profissional' : 'Início'}
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Header;
