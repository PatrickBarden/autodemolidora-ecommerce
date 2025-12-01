import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';
import { Button } from '../../components/ui/Button';
import { User, Lock, Bell, Save, Eye, EyeOff } from 'lucide-react';

export const UserSettings: React.FC = () => {
  const { user, profile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [personalData, setPersonalData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: true,
    promotions: true,
  });

  const handleSavePersonal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: personalData.full_name,
          phone: personalData.phone,
        })
        .eq('id', user?.id);

      if (error) throw error;
      alert('Dados atualizados com sucesso!');
    } catch (error: any) {
      alert('Erro ao atualizar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres!');
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) {
        if (error.message.includes('different from the old')) {
          alert('A nova senha deve ser diferente da senha atual!');
        } else {
          alert('Erro ao alterar senha: ' + error.message);
        }
        return;
      }
      
      alert('Senha alterada com sucesso!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      alert('Erro ao alterar senha: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading text-white uppercase">Configurações</h1>
        <p className="text-grayLight text-sm">Gerencie suas preferências de conta</p>
      </div>

      {/* Personal Data */}
      <section className="bg-grayDark rounded-lg border border-grayMedium p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-primary" size={24} />
          <h2 className="text-xl font-heading text-white uppercase">Dados Pessoais</h2>
        </div>
        
        <form onSubmit={handleSavePersonal} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-grayLight mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className={inputClass + " opacity-50 cursor-not-allowed"}
            />
            <p className="text-xs text-grayLight mt-1">O email não pode ser alterado</p>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-grayLight mb-2">Nome Completo</label>
            <input
              type="text"
              value={personalData.full_name}
              onChange={(e) => setPersonalData({ ...personalData, full_name: e.target.value })}
              className={inputClass}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-grayLight mb-2">Telefone</label>
            <input
              type="tel"
              value={personalData.phone}
              onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
              placeholder="(00) 00000-0000"
              className={inputClass}
            />
          </div>

          <Button type="submit" disabled={saving} className="flex items-center gap-2">
            <Save size={18} />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </form>
      </section>

      {/* Change Password */}
      <section className="bg-grayDark rounded-lg border border-grayMedium p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-primary" size={24} />
          <h2 className="text-xl font-heading text-white uppercase">Alterar Senha</h2>
        </div>
        
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-bold text-grayLight mb-2">Nova Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              minLength={6}
              className={inputClass + " pr-12"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-grayLight hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-grayLight mb-2">Confirmar Nova Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              minLength={6}
              className={inputClass}
            />
          </div>

          <Button type="submit" disabled={saving || !passwordData.newPassword} className="flex items-center gap-2">
            <Lock size={18} />
            {saving ? 'Alterando...' : 'Alterar Senha'}
          </Button>
        </form>
      </section>

      {/* Notifications */}
      <section className="bg-grayDark rounded-lg border border-grayMedium p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-primary" size={24} />
          <h2 className="text-xl font-heading text-white uppercase">Notificações</h2>
        </div>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-blackCarbon rounded border border-grayMedium cursor-pointer hover:border-primary transition-colors">
            <div>
              <p className="font-bold text-white">Notificações por Email</p>
              <p className="text-sm text-grayLight">Receba atualizações sobre seus pedidos</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
              className="w-5 h-5 accent-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-blackCarbon rounded border border-grayMedium cursor-pointer hover:border-primary transition-colors">
            <div>
              <p className="font-bold text-white">Notificações por WhatsApp</p>
              <p className="text-sm text-grayLight">Receba mensagens sobre seus pedidos</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.whatsapp}
              onChange={(e) => setNotifications({ ...notifications, whatsapp: e.target.checked })}
              className="w-5 h-5 accent-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-blackCarbon rounded border border-grayMedium cursor-pointer hover:border-primary transition-colors">
            <div>
              <p className="font-bold text-white">Promoções e Ofertas</p>
              <p className="text-sm text-grayLight">Receba novidades e descontos exclusivos</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.promotions}
              onChange={(e) => setNotifications({ ...notifications, promotions: e.target.checked })}
              className="w-5 h-5 accent-primary"
            />
          </label>
        </div>
      </section>
    </div>
  );
};
