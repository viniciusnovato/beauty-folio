import { supabase } from './supabase';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testImageUpload() {
  try {
    // Criar uma imagem de teste (1x1 pixel PNG transparente)
    const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    const imageBuffer = Buffer.from(base64Image, 'base64');
    
    // Salvar temporariamente
    const testFilePath = join(__dirname, 'test-image.png');
    writeFileSync(testFilePath, imageBuffer);

    // Criar um nome único para o arquivo
    const timestamp = Date.now();
    const fileName = `test/test-image-${timestamp}.png`;

    // Fazer upload do arquivo
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png'
      });

    if (error) {
      console.error('Erro ao fazer upload:', error.message);
      return;
    }

    console.log('Upload realizado com sucesso:', data);

    // Gerar URL pública
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);

    console.log('URL pública da imagem:', urlData.publicUrl);

    // Limpar arquivo de teste
    unlinkSync(testFilePath);

  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

testImageUpload(); 