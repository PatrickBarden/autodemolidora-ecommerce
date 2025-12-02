import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { Button } from '../../components/ui/Button';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save, 
  Image, 
  Type, 
  Link as LinkIcon,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface HeroSlide {
  id: string;
  order: number;
  is_active: boolean;
  background_image: string;
  tag_text: string;
  title_prefix: string;
  title_highlight: string;
  title_suffix: string;
  description: string;
  button_primary_text: string;
  button_primary_link: string;
  button_secondary_text: string;
  button_secondary_link: string;
}

const defaultSlide: Omit<HeroSlide, 'id'> = {
  order: 0,
  is_active: true,
  background_image: '',
  tag_text: 'Novidade',
  title_prefix: '',
  title_highlight: 'Destaque',
  title_suffix: '',
  description: '',
  button_primary_text: 'Ver Mais',
  button_primary_link: '/',
  button_secondary_text: 'WhatsApp',
  button_secondary_link: '',
};

export const HeroManager: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState<Omit<HeroSlide, 'id'>>(defaultSlide);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setSlides(data || []);
    } catch (error) {
      console.error('Error fetching slides:', error);
      // Se a tabela não existir, usar dados locais
      const localData = localStorage.getItem('hero_slides');
      if (localData) {
        setSlides(JSON.parse(localData));
      }
    } finally {
      setLoading(false);
    }
  };

  const saveToLocal = (newSlides: HeroSlide[]) => {
    localStorage.setItem('hero_slides', JSON.stringify(newSlides));
    setSlides(newSlides);
  };

  const handleOpenModal = (slide?: HeroSlide) => {
    if (slide) {
      setEditingSlide(slide);
      setFormData({
        order: slide.order,
        is_active: slide.is_active,
        background_image: slide.background_image,
        tag_text: slide.tag_text,
        title_prefix: slide.title_prefix,
        title_highlight: slide.title_highlight,
        title_suffix: slide.title_suffix,
        description: slide.description,
        button_primary_text: slide.button_primary_text,
        button_primary_link: slide.button_primary_link,
        button_secondary_text: slide.button_secondary_text,
        button_secondary_link: slide.button_secondary_link,
      });
    } else {
      setEditingSlide(null);
      setFormData({
        ...defaultSlide,
        order: slides.length,
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingSlide) {
        // Update existing
        const { error } = await supabase
          .from('hero_slides')
          .update(formData)
          .eq('id', editingSlide.id);

        if (error) throw error;
        
        const updated = slides.map(s => 
          s.id === editingSlide.id ? { ...s, ...formData } : s
        );
        saveToLocal(updated);
      } else {
        // Create new
        const { data, error } = await supabase
          .from('hero_slides')
          .insert([formData])
          .select()
          .single();

        if (error) throw error;
        
        if (data) {
          saveToLocal([...slides, data]);
        }
      }

      setShowModal(false);
      fetchSlides();
      // Não usar alert, apenas fechar o modal
    } catch (error: any) {
      console.error('Erro ao salvar slide:', error);
      alert('Erro ao salvar slide: ' + (error.message || 'Tente novamente.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, slideTitle: string) => {
    if (!window.confirm(`Deseja excluir o slide "${slideTitle || 'Sem título'}"?\n\nEsta ação não pode ser desfeita.`)) return;

    try {
      const { error } = await supabase
        .from('hero_slides')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      // Fallback
    }
    
    saveToLocal(slides.filter(s => s.id !== id));
  };

  const handleToggleActive = async (slide: HeroSlide) => {
    const updated = { ...slide, is_active: !slide.is_active };
    
    try {
      await supabase
        .from('hero_slides')
        .update({ is_active: updated.is_active })
        .eq('id', slide.id);
    } catch (error) {
      // Fallback
    }
    
    saveToLocal(slides.map(s => s.id === slide.id ? updated : s));
  };

  const handleMoveSlide = async (slide: HeroSlide, direction: 'up' | 'down') => {
    const currentIndex = slides.findIndex(s => s.id === slide.id);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= slides.length) return;
    
    const newSlides = [...slides];
    [newSlides[currentIndex], newSlides[newIndex]] = [newSlides[newIndex], newSlides[currentIndex]];
    
    // Update order values
    const reordered = newSlides.map((s, idx) => ({ ...s, order: idx }));
    saveToLocal(reordered);
    
    // Update in database
    for (const s of reordered) {
      try {
        await supabase
          .from('hero_slides')
          .update({ order: s.order })
          .eq('id', s.id);
      } catch (error) {
        // Continue
      }
    }
  };

  const inputClass = "w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none";
  const labelClass = "block text-sm font-bold text-grayLight mb-2";

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading text-white uppercase">Gerenciar Hero</h1>
          <p className="text-grayLight">Configure os slides do banner principal</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus size={20} /> Novo Slide
        </Button>
      </div>

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
        <p className="text-blue-400 text-sm">
          <strong>Dica:</strong> Os slides aparecem no banner principal da página inicial. 
          Você pode reordenar arrastando ou usando as setas. Slides inativos não aparecem no site.
        </p>
      </div>

      {/* Slides List */}
      {loading ? (
        <div className="text-center py-12 text-grayLight">Carregando...</div>
      ) : slides.length === 0 ? (
        <div className="bg-grayDark rounded-lg border border-grayMedium p-12 text-center">
          <Image size={64} className="mx-auto text-grayMedium mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Nenhum slide cadastrado</h2>
          <p className="text-grayLight mb-6">
            Crie slides para exibir no banner principal do site.
          </p>
          <Button onClick={() => handleOpenModal()} className="inline-flex items-center gap-2">
            <Plus size={20} /> Criar Primeiro Slide
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`bg-grayDark rounded-lg border overflow-hidden ${
                slide.is_active ? 'border-grayMedium' : 'border-grayMedium/50 opacity-60'
              }`}
            >
              <div className="flex">
                {/* Preview Image */}
                <div className="w-48 h-32 bg-blackCarbon shrink-0 relative">
                  {slide.background_image ? (
                    <img 
                      src={slide.background_image} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="text-grayMedium" size={32} />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-blackCarbon/80 text-white text-xs font-bold px-2 py-1 rounded">
                    #{index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {slide.tag_text && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                            {slide.tag_text}
                          </span>
                        )}
                        {!slide.is_active && (
                          <span className="text-xs bg-grayMedium text-grayLight px-2 py-0.5 rounded">
                            Inativo
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-white text-lg">
                        {slide.title_prefix} <span className="text-primary">{slide.title_highlight}</span> {slide.title_suffix}
                      </h3>
                      <p className="text-grayLight text-sm line-clamp-1 mt-1">{slide.description}</p>
                      <div className="flex gap-2 mt-2">
                        {slide.button_primary_text && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            {slide.button_primary_text} → {slide.button_primary_link}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveSlide(slide, 'up')}
                        disabled={index === 0}
                        className="p-2 text-grayLight hover:text-white hover:bg-grayMedium rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Mover para cima"
                      >
                        <ChevronUp size={18} />
                      </button>
                      <button
                        onClick={() => handleMoveSlide(slide, 'down')}
                        disabled={index === slides.length - 1}
                        className="p-2 text-grayLight hover:text-white hover:bg-grayMedium rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Mover para baixo"
                      >
                        <ChevronDown size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleActive(slide)}
                        className={`p-2 rounded ${
                          slide.is_active 
                            ? 'text-success hover:bg-success/10' 
                            : 'text-grayLight hover:bg-grayMedium'
                        }`}
                        title={slide.is_active ? 'Desativar' : 'Ativar'}
                      >
                        {slide.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <button
                        onClick={() => handleOpenModal(slide)}
                        className="p-2 text-grayLight hover:text-white hover:bg-grayMedium rounded"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(slide.id, slide.title_highlight)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-grayDark rounded-lg border border-grayMedium w-full max-w-2xl my-8">
            <div className="p-6 border-b border-grayMedium">
              <h2 className="text-xl font-heading text-white uppercase">
                {editingSlide ? 'Editar Slide' : 'Novo Slide'}
              </h2>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Background Image */}
              <div>
                <label className={labelClass}>
                  <Image size={16} className="inline mr-2" />
                  Imagem de Fundo
                </label>
                <ImageUpload
                  value={formData.background_image}
                  onChange={(url) => setFormData({ ...formData, background_image: url })}
                  bucket="images"
                  folder="hero"
                  previewClassName="h-40 w-full"
                />
              </div>

              {/* Tag */}
              <div>
                <label className={labelClass}>Tag (Badge)</label>
                <input
                  type="text"
                  value={formData.tag_text}
                  onChange={(e) => setFormData({ ...formData, tag_text: e.target.value })}
                  placeholder="Ex: Novidade, Promoção, Lançamento..."
                  className={inputClass}
                />
              </div>

              {/* Title */}
              <div className="bg-blackCarbon rounded-lg p-4 border border-grayMedium">
                <label className={labelClass}>
                  <Type size={16} className="inline mr-2" />
                  Título (3 partes)
                </label>
                <p className="text-xs text-grayLight mb-3">
                  O título é dividido em 3 partes. A parte do meio fica em destaque (vermelho).
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-grayLight">Início</label>
                    <input
                      type="text"
                      value={formData.title_prefix}
                      onChange={(e) => setFormData({ ...formData, title_prefix: e.target.value })}
                      placeholder="O"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-primary font-bold">Destaque</label>
                    <input
                      type="text"
                      value={formData.title_highlight}
                      onChange={(e) => setFormData({ ...formData, title_highlight: e.target.value })}
                      placeholder="CORAÇÃO"
                      className={inputClass + " border-primary"}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-grayLight">Final</label>
                    <input
                      type="text"
                      value={formData.title_suffix}
                      onChange={(e) => setFormData({ ...formData, title_suffix: e.target.value })}
                      placeholder="da sua máquina"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="mt-3 p-3 bg-grayDark rounded text-center">
                  <span className="text-white font-heading text-xl">
                    {formData.title_prefix} <span className="text-primary">{formData.title_highlight}</span> {formData.title_suffix}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Texto descritivo do slide..."
                  className={inputClass + " resize-none"}
                />
              </div>

              {/* Buttons */}
              <div className="bg-blackCarbon rounded-lg p-4 border border-grayMedium">
                <label className={labelClass}>
                  <LinkIcon size={16} className="inline mr-2" />
                  Botões
                </label>
                
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="text-xs text-grayLight">Botão Principal - Texto</label>
                    <input
                      type="text"
                      value={formData.button_primary_text}
                      onChange={(e) => setFormData({ ...formData, button_primary_text: e.target.value })}
                      placeholder="Buscar Peça"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-grayLight">Botão Principal - Link</label>
                    <input
                      type="text"
                      value={formData.button_primary_link}
                      onChange={(e) => setFormData({ ...formData, button_primary_link: e.target.value })}
                      placeholder="/category/motor"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="text-xs text-grayLight">Botão Secundário - Texto</label>
                    <input
                      type="text"
                      value={formData.button_secondary_text}
                      onChange={(e) => setFormData({ ...formData, button_secondary_text: e.target.value })}
                      placeholder="Falar no WhatsApp"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-grayLight">Botão Secundário - Link</label>
                    <input
                      type="text"
                      value={formData.button_secondary_link}
                      onChange={(e) => setFormData({ ...formData, button_secondary_link: e.target.value })}
                      placeholder="whatsapp (deixe vazio para usar padrão)"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Active */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
                <label htmlFor="is_active" className="text-white">Slide ativo (visível no site)</label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-grayMedium">
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2">
                  <Save size={18} />
                  {saving ? 'Salvando...' : 'Salvar Slide'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
