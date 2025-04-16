import { supabase } from './supabase';

async function testServices() {
  try {
    // Buscar todos os serviços
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select(`
        *,
        professionals (
          name,
          email
        )
      `);
    
    if (servicesError) {
      console.error('Erro ao buscar serviços:', servicesError.message);
      return;
    }
    
    console.log('Serviços encontrados:', services.length);
    console.log('Detalhes dos serviços:', JSON.stringify(services, null, 2));
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

testServices(); 