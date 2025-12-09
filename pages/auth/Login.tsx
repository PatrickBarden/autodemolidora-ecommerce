import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { AlertCircle, Mail, Info } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailConfirmationHint, setShowEmailConfirmationHint] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowEmailConfirmationHint(false);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/');
    } catch (err: any) {
      // Traduzir mensagens de erro comuns
      let errorMessage = err.message || 'Erro ao fazer login';
      
      if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos';
      } else if (err.message?.includes('Email not confirmed')) {
        errorMessage = 'Email não confirmado';
        setShowEmailConfirmationHint(true);
      } else if (err.message?.includes('Too many requests')) {
        errorMessage = 'Muitas tentativas. Aguarde alguns minutos.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blackCarbon flex items-center justify-center px-4">
      <div className="bg-grayDark p-8 rounded-lg border border-grayMedium w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading text-white uppercase">Login</h1>
          <p className="text-grayLight">Entre para acessar sua conta</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 flex items-center gap-2">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Dica sobre confirmação de email */}
        {showEmailConfirmationHint && (
          <div className="bg-warning/10 border border-warning/30 rounded p-4 mb-6">
            <div className="flex items-start gap-3">
              <Mail size={20} className="text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-warning font-bold mb-1">Confirme seu email</p>
                <p className="text-xs text-grayLight">
                  Verifique sua caixa de entrada (e a pasta de spam) e clique no link de confirmação 
                  que enviamos para ativar sua conta.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-grayLight uppercase mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-grayLight uppercase mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-grayLight">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-primary hover:underline font-bold">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};
