import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se há uma sessão ativa
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Sessão atual:', session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Inscreve-se para mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Mudança de estado de autenticação:', { event: _event, session });
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Iniciando tentativa de login:', { email });
      
      // Primeiro, verifica a sessão atual
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      console.log('Sessão antes do login:', currentSession);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Resposta do login:', { data, error });

      if (error) {
        console.error('Erro detalhado de login:', error);
        
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Por favor, confirme seu email antes de fazer login');
        }
        
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Email ou senha incorretos');
        }
        
        throw error;
      }

      if (!data.user) {
        throw new Error('Não foi possível obter os dados do usuário');
      }

      // Verifica se o usuário tem um perfil profissional
      const { data: profile, error: profileError } = await supabase
        .from('professionals')
        .select('*')
        .eq('id', data.user.id)
        .single();

      console.log('Perfil do usuário:', { profile, profileError });

      setUser(data.user);
    } catch (error) {
      console.error('Erro completo:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 