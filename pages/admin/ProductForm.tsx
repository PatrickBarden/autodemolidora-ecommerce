import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { MultiImageUpload } from '../../components/ui/MultiImageUpload';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '../../constants';

export const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== 'new';
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    brand: '',
    price: '',
    category: 'motor',
    stock: '1',
    description: '',
    image_url: '',
    images: [] as string[],
    is_new: false
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;
      // Parse images - pode vir como array ou string JSON
      let images: string[] = [];
      if (data.images) {
        images = Array.isArray(data.images) ? data.images : JSON.parse(data.images);
      } else if (data.image_url) {
        images = [data.image_url];
      }

      setFormData({
        name: data.name,
        code: data.code || '',
        brand: data.brand || '',
        price: data.price,
        category: data.category,
        stock: data.stock,
        description: data.description || '',
        image_url: data.image_url || '',
        images: images,
        is_new: data.is_new
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validar campos obrigatórios
      if (!formData.name.trim()) {
        throw new Error('Nome do produto é obrigatório');
      }
      if (!formData.price || parseFloat(formData.price) <= 0) {
        throw new Error('Preço deve ser maior que zero');
      }

      // Prepara dados do produto
      // A primeira imagem é usada como image_url principal para compatibilidade
      const mainImage = formData.images[0] || formData.image_url.trim() || null;
      
      const productData: Record<string, any> = {
        name: formData.name.trim(),
        code: formData.code.trim() || null,
        brand: formData.brand.trim() || null,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
        description: formData.description.trim() || null,
        image_url: mainImage,
        is_new: formData.is_new,
        specs: {}
      };

      // Adiciona images se houver mais de uma imagem
      if (formData.images.length > 0) {
        productData.images = formData.images;
      }

      if (isEditing && id && id !== 'new') {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        if (error) throw error;
      }
      navigate('/admin/products');
    } catch (error: any) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar: ' + (error.message || 'Tente novamente'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-blackCarbon min-h-screen">
      <button onClick={() => navigate('/admin')} className="text-grayLight hover:text-white mb-6 flex items-center gap-2">
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="max-w-2xl mx-auto bg-grayDark p-8 rounded border border-grayMedium">
        <h1 className="text-2xl font-heading text-white uppercase mb-8">
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-grayLight uppercase mb-2">Código (SKU)</label>
              <input
                type="text"
                value={formData.code}
                onChange={e => setFormData({...formData, code: e.target.value})}
                className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-grayLight uppercase mb-2">Estoque</label>
              <input
                type="number"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: e.target.value})}
                className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-grayLight uppercase mb-2">Nome do Produto</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-grayLight uppercase mb-2">Marca</label>
              <input
                type="text"
                value={formData.brand}
                onChange={e => setFormData({...formData, brand: e.target.value})}
                className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-grayLight uppercase mb-2">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-grayLight uppercase mb-2">Categoria</label>
              <select
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-grayLight uppercase mb-2">Condição</label>
              <div className="flex items-center gap-4 h-[50px]">
                 <label className="flex items-center gap-2 text-grayLight cursor-pointer">
                    <input 
                      type="radio" 
                      checked={!formData.is_new} 
                      onChange={() => setFormData({...formData, is_new: false})}
                      className="accent-primary"
                    /> Usado
                 </label>
                 <label className="flex items-center gap-2 text-grayLight cursor-pointer">
                    <input 
                      type="radio" 
                      checked={formData.is_new} 
                      onChange={() => setFormData({...formData, is_new: true})}
                      className="accent-primary"
                    /> Novo
                 </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-grayLight uppercase mb-2">Imagens do Produto</label>
            <MultiImageUpload
              value={formData.images}
              onChange={(urls) => setFormData({...formData, images: urls, image_url: urls[0] || ''})}
              bucket="images"
              folder="products"
              maxImages={5}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-grayLight uppercase mb-2">Descrição</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-3 h-32"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </Button>
        </form>
      </div>
    </div>
  );
};
