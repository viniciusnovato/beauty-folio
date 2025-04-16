import { supabase } from './supabase';

/**
 * Faz upload de uma imagem para o Storage do Supabase
 */
export async function uploadImage(
  file: File,
  folder: string = 'general'
): Promise<string | null> {
  try {
    // Criar um nome único para o arquivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Fazer o upload do arquivo
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Erro no upload:', uploadError.message);
      return null;
    }

    // Gerar URL pública do arquivo
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    return null;
  }
}

/**
 * Remove uma imagem do Storage do Supabase
 */
export async function deleteImage(url: string): Promise<boolean> {
  try {
    // Extrair o caminho do arquivo da URL
    const path = url.split('images/')[1];
    if (!path) return false;

    const { error } = await supabase.storage
      .from('images')
      .remove([path]);

    if (error) {
      console.error('Erro ao deletar imagem:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    return false;
  }
}

/**
 * Atualiza a imagem de um profissional
 */
export async function updateProfessionalImage(
  professionalId: string,
  file: File
): Promise<boolean> {
  try {
    // Fazer upload da nova imagem
    const imageUrl = await uploadImage(file, 'professionals');
    if (!imageUrl) return false;

    // Atualizar o profissional com a nova URL da imagem
    const { error } = await supabase
      .from('professionals')
      .update({ logo: imageUrl })
      .eq('id', professionalId);

    if (error) {
      console.error('Erro ao atualizar profissional:', error.message);
      await deleteImage(imageUrl); // Limpar imagem se falhar
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar imagem do profissional:', error);
    return false;
  }
}

/**
 * Adiciona uma imagem a um serviço
 */
export async function addServiceImage(
  serviceId: string,
  file: File
): Promise<boolean> {
  try {
    // Fazer upload da nova imagem
    const imageUrl = await uploadImage(file, 'services');
    if (!imageUrl) return false;

    // Buscar o serviço atual
    const { data: service, error: fetchError } = await supabase
      .from('services')
      .select('images')
      .eq('id', serviceId)
      .single();

    if (fetchError) {
      console.error('Erro ao buscar serviço:', fetchError.message);
      await deleteImage(imageUrl); // Limpar imagem se falhar
      return false;
    }

    // Adicionar nova imagem ao array de imagens
    const images = service.images || [];
    images.push(imageUrl);

    // Atualizar o serviço com o novo array de imagens
    const { error: updateError } = await supabase
      .from('services')
      .update({ images })
      .eq('id', serviceId);

    if (updateError) {
      console.error('Erro ao atualizar serviço:', updateError.message);
      await deleteImage(imageUrl); // Limpar imagem se falhar
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao adicionar imagem ao serviço:', error);
    return false;
  }
} 