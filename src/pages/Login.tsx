import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { createTestUser } from '../lib/supabase';

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('teste@exemplo.com');
  const [password, setPassword] = useState('senha123');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Erro detalhado:', err);
      if (err.message.includes('Email not confirmed')) {
        setError('Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada.');
      } else {
        setError('Falha ao fazer login. Verifique suas credenciais ou tente criar um novo usuário.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTestUser = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const result = await createTestUser();
      if (result.message.includes('sucesso')) {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      console.error('Erro ao criar usuário:', err);
      setError(err.message || 'Erro ao criar usuário de teste');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar o painel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert variant="default" className="border-green-500 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mt-2"
                onClick={handleCreateTestUser}
                disabled={loading}
              >
                Criar Usuário de Teste
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 