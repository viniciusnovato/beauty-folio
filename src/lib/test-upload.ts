import { supabase } from './supabase';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testUpload() {
  try {
    // Criar um arquivo de teste
    const testFilePath = join(__dirname, 'test-image.txt');
    writeFileSync(testFilePath, 'Test content');

    // Ler o arquivo como buffer
    const fileBuffer = readFileSync(testFilePath);

    // Criar um nome único para o arquivo
    const timestamp = Date.now();
    const fileName = `test/test-file-${timestamp}.txt`;

    // Fazer upload do arquivo
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, fileBuffer, {
        contentType: 'text/plain'
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

    console.log('URL pública:', urlData.publicUrl);

    // Limpar arquivo de teste
    unlinkSync(testFilePath);

  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

testUpload(); 