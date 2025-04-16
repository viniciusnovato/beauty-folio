import { supabase } from './supabase';

async function testStorage() {
  try {
    // Listar arquivos no bucket
    const { data: files, error: listError } = await supabase
      .storage
      .from('images')
      .list();

    if (listError) {
      console.error('Erro ao listar arquivos:', listError.message);
      return;
    }

    console.log('Arquivos no bucket:', files);

    // Listar arquivos na pasta professionals
    const { data: profFiles, error: profError } = await supabase
      .storage
      .from('images')
      .list('professionals');

    if (profError) {
      console.error('Erro ao listar arquivos de profissionais:', profError.message);
    } else {
      console.log('Arquivos de profissionais:', profFiles);
    }

    // Listar arquivos na pasta services
    const { data: servFiles, error: servError } = await supabase
      .storage
      .from('images')
      .list('services');

    if (servError) {
      console.error('Erro ao listar arquivos de serviços:', servError.message);
    } else {
      console.log('Arquivos de serviços:', servFiles);
    }

  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

testStorage(); 