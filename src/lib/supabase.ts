import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = "https://klhtchqpnnnqouuyumhw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsaHRjaHFwbm5ucW91dXl1bWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTE5MzIsImV4cCI6MjA2MDM4NzkzMn0.3Q_QMZzR5FeKblI2nIR41ux19LH6VdNktQ7NgEml65Y";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.39.3',
    },
  },
});

// Função para verificar a configuração do Supabase
export async function checkSupabaseConfig() {
  try {
    console.log('Verificando configuração do Supabase...');
    
    // Verifica se consegue se conectar
    const { data: health, error: healthError } = await supabase.from('professionals').select('count').limit(0);
    console.log('Teste de conexão:', { health, healthError });
    
    // Verifica configurações de autenticação
    const { data: authSettings, error: authError } = await supabase.auth.getSession();
    console.log('Configurações de autenticação:', { authSettings, authError });
    
    return { ok: !healthError && !authError };
  } catch (error) {
    console.error('Erro ao verificar configuração:', error);
    return { ok: false, error };
  }
}

// Função auxiliar para criar um usuário de teste
export async function createTestUser() {
  try {
    console.log('Iniciando criação de usuário de teste');
    
    // Primeiro verifica a configuração
    const configCheck = await checkSupabaseConfig();
    if (!configCheck.ok) {
      throw new Error('Problemas com a configuração do Supabase');
    }

    // Primeiro, verifica se o usuário já existe
    const { data: existingUser, error: userError } = await supabase
      .from('professionals')
      .select('*')
      .eq('email', 'teste@exemplo.com')
      .single();

    console.log('Verificação de usuário existente:', { existingUser, userError });

    if (existingUser) {
      console.log('Usuário já existe no banco, tentando fazer login...');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'teste@exemplo.com',
        password: 'senha123'
      });

      console.log('Tentativa de login:', { signInData, signInError });

      if (signInError) {
        console.error('Erro ao fazer login:', signInError);
        return { message: 'Usuário existe mas não foi possível fazer login. Tente novamente mais tarde.' };
      }

      return {
        message: 'Login realizado com sucesso!',
        user: signInData.user
      };
    }

    // Se não existe, cria o usuário
    console.log('Usuário não existe, criando novo...');
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: 'teste@exemplo.com',
      password: 'senha123',
      options: {
        data: {
          name: 'Usuário Teste',
          role: 'professional'
        }
      }
    });

    console.log('Resultado da criação:', { signUpData, signUpError });

    if (signUpError) {
      console.error('Erro ao criar usuário:', signUpError);
      throw signUpError;
    }

    if (!signUpData.user) {
      throw new Error('Usuário não foi criado');
    }

    // Cria o perfil profissional
    const { error: profileError } = await supabase
      .from('professionals')
      .insert([
        {
          id: signUpData.user.id,
          name: 'Usuário Teste',
          email: 'teste@exemplo.com',
          phone: '(11) 99999-9999',
          bio: 'Profissional de teste'
        }
      ]);

    if (profileError) {
      console.error('Erro ao criar perfil:', profileError);
      console.log('Continuando mesmo com erro no perfil...');
    }

    // Tenta fazer login imediatamente após criar
    const { data: immediateSignInData, error: immediateSignInError } = await supabase.auth.signInWithPassword({
      email: 'teste@exemplo.com',
      password: 'senha123'
    });

    console.log('Tentativa de login imediato:', { immediateSignInData, immediateSignInError });

    if (immediateSignInError) {
      return {
        message: 'Usuário criado com sucesso! Por favor, aguarde alguns segundos e tente fazer login.',
        user: signUpData.user
      };
    }

    return {
      message: 'Usuário criado e logado com sucesso!',
      user: immediateSignInData.user
    };

  } catch (error: any) {
    console.error('Erro completo ao criar usuário:', error);
    throw error;
  }
} 