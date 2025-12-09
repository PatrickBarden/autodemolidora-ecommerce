import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Pencil, Trash2, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface Address {
  id: string;
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  isDefault: boolean;
}

export const UserAddresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    cep: '',
    isDefault: false,
  });

  useEffect(() => {
    // Load addresses from localStorage
    const saved = localStorage.getItem('autodemolidora-addresses');
    if (saved) {
      try {
        setAddresses(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading addresses:', e);
      }
    }
  }, []);

  const saveAddresses = (newAddresses: Address[]) => {
    setAddresses(newAddresses);
    localStorage.setItem('autodemolidora-addresses', JSON.stringify(newAddresses));
  };

  const handleOpenModal = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        name: address.name,
        street: address.street,
        number: address.number,
        complement: address.complement || '',
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        cep: address.cep,
        isDefault: address.isDefault,
      });
    } else {
      setEditingAddress(null);
      setFormData({
        name: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        cep: '',
        isDefault: addresses.length === 0,
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    let newAddresses: Address[];
    
    if (editingAddress) {
      newAddresses = addresses.map(a => 
        a.id === editingAddress.id 
          ? { ...a, ...formData }
          : formData.isDefault ? { ...a, isDefault: false } : a
      );
    } else {
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
      };
      
      if (formData.isDefault) {
        newAddresses = addresses.map(a => ({ ...a, isDefault: false }));
        newAddresses.push(newAddress);
      } else {
        newAddresses = [...addresses, newAddress];
      }
    }
    
    saveAddresses(newAddresses);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este endereço?')) return;
    saveAddresses(addresses.filter(a => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    saveAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const inputClass = "w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none";

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-heading text-white uppercase">Meus Endereços</h1>
          <p className="text-grayLight text-sm">Gerencie seus endereços de entrega</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus size={20} /> Novo Endereço
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-grayDark rounded-lg border border-grayMedium p-12 text-center">
          <MapPin size={64} className="mx-auto text-grayMedium mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Nenhum endereço cadastrado</h2>
          <p className="text-grayLight mb-6">
            Adicione um endereço para facilitar suas compras.
          </p>
          <Button onClick={() => handleOpenModal()} className="inline-flex items-center gap-2">
            <Plus size={20} /> Adicionar Endereço
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div 
              key={address.id} 
              className={`bg-grayDark rounded-lg border p-5 relative ${
                address.isDefault ? 'border-primary' : 'border-grayMedium'
              }`}
            >
              {address.isDefault && (
                <span className="absolute top-3 right-3 px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded">
                  Padrão
                </span>
              )}
              
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-white">{address.name}</h3>
                  <p className="text-grayLight text-sm">
                    {address.street}, {address.number}
                    {address.complement && ` - ${address.complement}`}
                  </p>
                  <p className="text-grayLight text-sm">
                    {address.neighborhood} - {address.city}/{address.state}
                  </p>
                  <p className="text-grayLight text-sm">CEP: {address.cep}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-grayLight hover:text-success hover:bg-success/10 rounded transition-colors"
                  >
                    <Check size={14} /> Definir como padrão
                  </button>
                )}
                <button
                  onClick={() => handleOpenModal(address)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-grayLight hover:text-white hover:bg-grayMedium rounded transition-colors"
                >
                  <Pencil size={14} /> Editar
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-grayLight hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 size={14} /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-grayDark rounded-lg border border-grayMedium w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-grayMedium">
              <h2 className="text-xl font-heading text-white uppercase">
                {editingAddress ? 'Editar Endereço' : 'Novo Endereço'}
              </h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">Nome do Endereço</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Casa, Trabalho..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">CEP</label>
                <input
                  type="text"
                  required
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-grayLight mb-2">Rua</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-grayLight mb-2">Número</label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">Complemento</label>
                <input
                  type="text"
                  placeholder="Apto, Bloco, etc."
                  value={formData.complement}
                  onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">Bairro</label>
                <input
                  type="text"
                  required
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-grayLight mb-2">Cidade</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-grayLight mb-2">Estado</label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    placeholder="UF"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
                <label htmlFor="isDefault" className="text-white">Definir como endereço padrão</label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  {editingAddress ? 'Salvar' : 'Adicionar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
