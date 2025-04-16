import { supabase } from './supabase';

async function testConnection() {
  try {
    const { data, error } = await supabase.from('professionals').select('*');
    
    if (error) {
      console.error('Erro ao conectar com o Supabase:', error.message);
      return;
    }
    
    console.log('Conexão com o Supabase estabelecida com sucesso!');
    console.log('Profissionais encontrados:', data?.length || 0);
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

testConnection(); 