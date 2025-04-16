
import { useProfessional } from '@/context/ProfessionalContext';

const Footer = () => {
  const { currentProfessional } = useProfessional();
  
  return (
    <footer 
      className="py-8 bg-gray-50"
      style={currentProfessional ? { backgroundColor: currentProfessional.secondaryColor } : {}}
    >
      <div className="beauty-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">
              {currentProfessional ? currentProfessional.name : 'BeautyFolioConnect'}
            </h3>
            <p className="text-gray-600">
              {currentProfessional 
                ? currentProfessional.bio.substring(0, 100) + '...' 
                : 'Conectando clientes a profissionais de beleza.'}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/" className="hover:underline">Início</a></li>
              {currentProfessional && (
                <>
                  <li>
                    <a href={`/pro/${currentProfessional.id}/services`} className="hover:underline">
                      Serviços
                    </a>
                  </li>
                  <li>
                    <a href={`/pro/${currentProfessional.id}/appointment`} className="hover:underline">
                      Agendamento
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <p className="text-gray-600">
              Entre em contato para mais informações sobre nossos serviços.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} BeautyFolioConnect. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
