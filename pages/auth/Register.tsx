import React, { useState, useMemo } from 'react';
import { supabase } from '../../utils/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { AlertCircle, CheckCircle, XCircle, Mail, Info } from 'lucide-react';

// Requisitos de senha conforme configurado no Supabase
const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireLowercase: true,
  requireUppercase: true,
  requireDigit: true,
  requireSymbol: true
};

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
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Validação de senha em tempo real
  const passwordValidation = useMemo(() => {
    const password = formData.password;
    return {
      minLength: password.length >= PASSWORD_REQUIREMENTS.minLength,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasDigit: /[0-9]/.test(password),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/`~';]/.test(password),
      matches: password === formData.confirmPassword && password.length > 0
    };
  }, [formData.password, formData.confirmPassword]);

  const isPasswordValid = useMemo(() => {
    return passwordValidation.minLength &&
           passwordValidation.hasLowercase &&
           passwordValidation.hasUppercase &&
           passwordValidation.hasDigit &&
           passwordValidation.hasSymbol;
  }, [passwordValidation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isPasswordValid) {
      setError('A senha não atende aos requisitos de segurança');
      setLoading(false);
      return;
    }

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
      
      // Mostrar mensagem de sucesso com instrução para confirmar email
      setSuccess(true);
    } catch (err: any) {
      // Traduzir mensagens de erro comuns
      let errorMessage = err.message || 'Erro ao criar conta';
      if (err.message?.includes('Password should be at least')) {
        errorMessage = 'A senha deve ter no mínimo 8 caracteres';
      } else if (err.message?.includes('Password should contain')) {
        errorMessage = 'A senha deve conter letras maiúsculas, minúsculas, números e símbolos';
      } else if (err.message?.includes('User already registered')) {
        errorMessage = 'Este email já está cadastrado';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Tela de sucesso após cadastro
  if (success) {
    return (
      <div className="min-h-screen bg-blackCarbon flex items-center justify-center px-4 py-12">
        <div className="bg-grayDark p-8 rounded-lg border border-grayMedium w-full max-w-md text-center">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-success" />
          </div>
          <h1 className="text-2xl font-heading text-white uppercase mb-4">Confirme seu Email</h1>
          <p className="text-grayLight mb-6">
            Enviamos um link de confirmação para <strong className="text-white">{formData.email}</strong>. 
            Clique no link para ativar sua conta.
          </p>
          <div className="bg-warning/10 border border-warning/30 rounded p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-warning shrink-0 mt-0.5" />
              <p className="text-sm text-warning/90 text-left">
                <strong>Importante:</strong> Você precisa confirmar seu email antes de fazer login. 
                Verifique também a pasta de spam.
              </p>
            </div>
          </div>
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Ir para Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
              className={`w-full bg-blackCarbon border text-white rounded p-3 outline-none transition-colors ${
                formData.password.length > 0 
                  ? isPasswordValid 
                    ? 'border-success focus:border-success' 
                    : 'border-warning focus:border-warning'
                  : 'border-grayMedium focus:border-primary'
              }`}
              placeholder="Mínimo 8 caracteres"
              required
            />
            
            {/* Indicadores de requisitos de senha */}
            {formData.password.length > 0 && (
              <div className="mt-3 p-3 bg-blackCarbon/50 rounded border border-grayMedium">
                <p className="text-xs font-bold text-grayLight uppercase mb-2">Requisitos da senha:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className={`flex items-center gap-1.5 text-xs ${passwordValidation.minLength ? 'text-success' : 'text-grayLight'}`}>
                    {passwordValidation.minLength ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    <span>8+ caracteres</span>
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs ${passwordValidation.hasLowercase ? 'text-success' : 'text-grayLight'}`}>
                    {passwordValidation.hasLowercase ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    <span>Letra minúscula</span>
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs ${passwordValidation.hasUppercase ? 'text-success' : 'text-grayLight'}`}>
                    {passwordValidation.hasUppercase ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    <span>Letra maiúscula</span>
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs ${passwordValidation.hasDigit ? 'text-success' : 'text-grayLight'}`}>
                    {passwordValidation.hasDigit ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    <span>Número</span>
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs ${passwordValidation.hasSymbol ? 'text-success' : 'text-grayLight'}`}>
                    {passwordValidation.hasSymbol ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    <span>Símbolo (!@#$...)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-bold text-grayLight uppercase mb-1">Confirmar Senha</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full bg-blackCarbon border text-white rounded p-3 outline-none transition-colors ${
                formData.confirmPassword.length > 0 
                  ? passwordValidation.matches 
                    ? 'border-success focus:border-success' 
                    : 'border-red-500 focus:border-red-500'
                  : 'border-grayMedium focus:border-primary'
              }`}
              placeholder="Repita a senha"
              required
            />
            {formData.confirmPassword.length > 0 && !passwordValidation.matches && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <XCircle size={12} /> As senhas não conferem
              </p>
            )}
            {formData.confirmPassword.length > 0 && passwordValidation.matches && (
              <p className="text-xs text-success mt-1 flex items-center gap-1">
                <CheckCircle size={12} /> Senhas conferem
              </p>
            )}
          </div>

          {/* Aviso sobre confirmação de email */}
          <div className="bg-primary/10 border border-primary/30 rounded p-3">
            <div className="flex items-start gap-2">
              <Mail size={16} className="text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-grayLight">
                Após o cadastro, você receberá um <strong className="text-white">email de confirmação</strong>. 
                É necessário clicar no link para ativar sua conta.
              </p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !isPasswordValid || !passwordValidation.matches}
          >
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
