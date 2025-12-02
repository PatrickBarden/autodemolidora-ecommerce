import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Search, Plus, Pencil, Trash2, Tag, Calendar, Percent, Package } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface Promotion {
  id: string;
  name: string;
  description: string;
  discount_percent: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  banner_url?: string;
  category?: string;
  created_at: string;
}

export const AdminPromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    discount_percent: 10,
    start_date: '',
    end_date: '',
    is_active: true,
    banner_url: '',
    category: '',
  });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Tabela ainda não existe - ignorar silenciosamente
        if (error.code === 'PGRST205') {
          setPromotions([]);
          return;
        }
        throw error;
      }
      setPromotions(data || []);
    } catch (error) {
      // Silenciar erro se tabela não existir
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (promo?: Promotion) => {
    if (promo) {
      setEditingPromo(promo);
      setFormData({
        name: promo.name,
        description: promo.description,
        discount_percent: promo.discount_percent,
        start_date: promo.start_date?.split('T')[0] || '',
        end_date: promo.end_date?.split('T')[0] || '',
        is_active: promo.is_active,
        banner_url: promo.banner_url || '',
        category: promo.category || '',
      });
    } else {
      setEditingPromo(null);
      setFormData({
        name: '',
        description: '',
        discount_percent: 10,
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        is_active: true,
        banner_url: '',
        category: '',
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingPromo) {
        const { error } = await supabase
          .from('promotions')
          .update(formData)
          .eq('id', editingPromo.id);

        if (error) throw error;
        setPromotions(promotions.map(p => p.id === editingPromo.id ? { ...p, ...formData } : p));
      } else {
        const { data, error } = await supabase
          .from('promotions')
          .insert([formData])
          .select()
          .single();

        if (error) throw error;
        setPromotions([data, ...promotions]);
      }

      setShowModal(false);
      alert(editingPromo ? 'Promoção atualizada!' : 'Promoção criada!');
    } catch (error: any) {
      alert('Erro: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (promo: Promotion) => {
    try {
      const { error } = await supabase
        .from('promotions')
        .update({ is_active: !promo.is_active })
        .eq('id', promo.id);

      if (error) throw error;
      setPromotions(promotions.map(p => p.id === promo.id ? { ...p, is_active: !p.is_active } : p));
    } catch (error) {
      alert('Erro ao atualizar promoção');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta promoção?')) return;

    try {
      const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPromotions(promotions.filter(p => p.id !== id));
    } catch (error) {
      alert('Erro ao excluir promoção');
    }
  };

  const filteredPromotions = promotions.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: promotions.length,
    active: promotions.filter(p => p.is_active).length,
    avgDiscount: promotions.length > 0 
      ? Math.round(promotions.reduce((acc, p) => acc + p.discount_percent, 0) / promotions.length)
      : 0,
  };

  const categories = ['motor', 'lataria', 'suspensao', 'eletrica', 'acessorios', 'todos'];

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading text-white uppercase">Promoções</h1>
          <p className="text-grayLight">Gerenciamento de ofertas e descontos</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus size={20} /> Nova Promoção
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-grayDark p-6 rounded border border-grayMedium">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-grayLight text-sm uppercase font-bold">Total</h3>
            <Tag className="text-primary" size={24} />
          </div>
          <p className="text-3xl font-heading text-white">{stats.total}</p>
        </div>
        <div className="bg-grayDark p-6 rounded border border-grayMedium">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-grayLight text-sm uppercase font-bold">Ativas</h3>
            <span className="text-success text-xl">●</span>
          </div>
          <p className="text-3xl font-heading text-white">{stats.active}</p>
        </div>
        <div className="bg-grayDark p-6 rounded border border-grayMedium">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-grayLight text-sm uppercase font-bold">Desconto Médio</h3>
            <Percent className="text-warning" size={24} />
          </div>
          <p className="text-3xl font-heading text-white">{stats.avgDiscount}%</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-grayLight" size={20} />
        <input
          type="text"
          placeholder="Buscar promoção..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-grayDark border border-grayMedium text-white rounded pl-10 p-3 focus:border-primary outline-none"
        />
      </div>

      {/* Promotions Grid */}
      {loading ? (
        <div className="text-center py-12 text-grayLight">Carregando...</div>
      ) : filteredPromotions.length === 0 ? (
        <div className="text-center py-12">
          <Tag size={48} className="mx-auto text-grayMedium mb-4" />
          <p className="text-grayLight">Nenhuma promoção cadastrada</p>
          <Button onClick={() => handleOpenModal()} className="mt-4">
            Criar Primeira Promoção
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map((promo) => (
            <div key={promo.id} className="bg-grayDark rounded-lg border border-grayMedium overflow-hidden">
              {promo.banner_url && (
                <img src={promo.banner_url} alt="" className="w-full h-32 object-cover" />
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-white text-lg">{promo.name}</h3>
                    {promo.category && (
                      <span className="text-xs text-grayLight flex items-center gap-1 mt-1">
                        <Package size={12} /> {promo.category}
                      </span>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    promo.is_active ? 'bg-success/20 text-success' : 'bg-grayMedium text-grayLight'
                  }`}>
                    {promo.is_active ? 'Ativa' : 'Inativa'}
                  </span>
                </div>
                
                <p className="text-grayLight text-sm mb-4 line-clamp-2">{promo.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-heading text-primary">-{promo.discount_percent}%</span>
                  <div className="text-xs text-grayLight text-right">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(promo.start_date).toLocaleDateString('pt-BR')}
                    </div>
                    <div>até {new Date(promo.end_date).toLocaleDateString('pt-BR')}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleActive(promo)}
                    className={`flex-1 py-2 rounded text-sm font-bold transition-colors ${
                      promo.is_active 
                        ? 'bg-grayMedium text-grayLight hover:bg-red-500/20 hover:text-red-400'
                        : 'bg-success/20 text-success hover:bg-success/30'
                    }`}
                  >
                    {promo.is_active ? 'Desativar' : 'Ativar'}
                  </button>
                  <button
                    onClick={() => handleOpenModal(promo)}
                    className="p-2 bg-grayMedium text-grayLight hover:text-white rounded transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(promo.id)}
                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-grayDark rounded-lg border border-grayMedium w-full max-w-lg my-8">
            <div className="p-6 border-b border-grayMedium">
              <h2 className="text-xl font-heading text-white uppercase">
                {editingPromo ? 'Editar Promoção' : 'Nova Promoção'}
              </h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">Nome da Promoção</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Black Friday, Queima de Estoque..."
                  className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Descreva a promoção..."
                  className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-grayLight mb-2">Desconto (%)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={formData.discount_percent}
                    onChange={(e) => setFormData({ ...formData, discount_percent: Number(e.target.value) })}
                    className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-grayLight mb-2">Categoria</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
                  >
                    <option value="">Todas</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-grayLight mb-2">Data Início</label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-grayLight mb-2">Data Fim</label>
                  <input
                    type="date"
                    required
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-grayLight mb-2">URL do Banner (opcional)</label>
                <input
                  type="url"
                  value={formData.banner_url}
                  onChange={(e) => setFormData({ ...formData, banner_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
                <label htmlFor="is_active" className="text-white">Promoção ativa</label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving} className="flex-1">
                  {saving ? 'Salvando...' : (editingPromo ? 'Atualizar' : 'Criar')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
