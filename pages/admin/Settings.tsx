import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Save, Store, Phone, MapPin, Clock, Globe, MessageCircle } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'Autodemolidora Coronel Barros',
    phone: '(55) 98406-9184',
    whatsapp: '55984069184',
    email: 'demolidoracb@hotmail.com',
    address: 'Coronel Barros',
    city: 'Coronel Barros - RS',
    cep: '',
    openingHours: 'Seg-Sex: 8h às 18h | Sáb: 8h às 12h',
    instagram: 'https://www.instagram.com/coronelbarrosautodemolidora/',
    facebook: 'https://www.facebook.com/autodemolidora.coronelbarros/',
    aboutText: 'Há mais de 20 anos no mercado, a Autodemolidora Coronel Barros é referência em peças usadas e seminovas para veículos.',
  });

  const handleSave = async () => {
    setSaving(true);
    // Simular salvamento - em produção, salvar no Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert('Configurações salvas com sucesso!');
  };

  const inputClass = "w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none";
  const labelClass = "block text-sm font-bold text-grayLight mb-2";

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading text-white uppercase">Configurações</h1>
        <p className="text-grayLight">Configurações gerais da loja</p>
      </div>

      <div className="space-y-8">
        {/* Informações da Loja */}
        <section className="bg-grayDark rounded-lg border border-grayMedium p-6">
          <div className="flex items-center gap-3 mb-6">
            <Store className="text-primary" size={24} />
            <h2 className="text-xl font-heading text-white uppercase">Informações da Loja</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Nome da Loja</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Sobre a Loja</label>
              <textarea
                value={settings.aboutText}
                onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                rows={3}
                className={inputClass + " resize-none"}
              />
            </div>
          </div>
        </section>

        {/* Contato */}
        <section className="bg-grayDark rounded-lg border border-grayMedium p-6">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="text-primary" size={24} />
            <h2 className="text-xl font-heading text-white uppercase">Contato</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Telefone</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>WhatsApp (apenas números)</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                placeholder="5511999999999"
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Endereço */}
        <section className="bg-grayDark rounded-lg border border-grayMedium p-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="text-primary" size={24} />
            <h2 className="text-xl font-heading text-white uppercase">Endereço</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Endereço</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Cidade / Estado</label>
              <input
                type="text"
                value={settings.city}
                onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>CEP</label>
              <input
                type="text"
                value={settings.cep}
                onChange={(e) => setSettings({ ...settings, cep: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Horário */}
        <section className="bg-grayDark rounded-lg border border-grayMedium p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-primary" size={24} />
            <h2 className="text-xl font-heading text-white uppercase">Horário de Funcionamento</h2>
          </div>
          
          <div>
            <label className={labelClass}>Horários</label>
            <input
              type="text"
              value={settings.openingHours}
              onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
              placeholder="Ex: Seg-Sex: 8h às 18h | Sáb: 8h às 13h"
              className={inputClass}
            />
          </div>
        </section>

        {/* Redes Sociais */}
        <section className="bg-grayDark rounded-lg border border-grayMedium p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="text-primary" size={24} />
            <h2 className="text-xl font-heading text-white uppercase">Redes Sociais</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Instagram</label>
              <input
                type="text"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                placeholder="@usuario"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Facebook</label>
              <input
                type="text"
                value={settings.facebook}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                placeholder="/pagina"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* WhatsApp Checkout Info */}
        <section className="bg-grayDark rounded-lg border border-grayMedium p-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="text-success" size={24} />
            <h2 className="text-xl font-heading text-white uppercase">Checkout via WhatsApp</h2>
          </div>
          
          <div className="bg-blackCarbon rounded p-4 border border-grayMedium">
            <p className="text-grayLight text-sm mb-2">
              O checkout do site redireciona automaticamente para o WhatsApp com todas as informações do pedido.
            </p>
            <p className="text-white text-sm">
              <strong>Número configurado:</strong> {settings.whatsapp}
            </p>
            <p className="text-xs text-grayLight mt-2">
              Certifique-se de que o número está correto e com o código do país (55 para Brasil).
            </p>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-8">
            <Save size={20} />
            {saving ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </div>
    </div>
  );
};
