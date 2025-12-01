import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não conferem');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone
          }
        }
      });

      if (error) throw error;
      
      // Auto login or redirect
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blackCarbon flex items-center justify-center px-4 py-12">
      <div className="bg-grayDark p-8 rounded-lg border border-grayMedium w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading text-white uppercase">Criar Conta</h1>
          <p className="text-grayLight">Faça parte da Autodemolidora Coronel Barros</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-6 flex items-center gap-2">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-grayLight uppercase mb-1">Nome Completo</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none transition-colors"
              placeholder="Seu nome"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-grayLight uppercase mb-1">WhatsApp/Telefone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none transition-colors"
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-grayLight uppercase mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-grayLight uppercase mb-1">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-grayLight uppercase mb-1">Confirmar Senha</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-grayLight">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-primary hover:underline font-bold">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};
