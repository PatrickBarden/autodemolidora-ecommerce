import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Product } from '../../types';
import { Button } from '../../components/ui/Button';
import { Plus, Pencil, Trash2, Search, Filter, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      alert('Erro ao excluir produto');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.stock > 0).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock < 3).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading text-white uppercase">Produtos</h1>
          <p className="text-grayLight">Gerenciamento de estoque</p>
        </div>
        <Button onClick={() => navigate('/admin/products/new')} className="flex items-center gap-2">
          <Plus size={20} /> Novo Produto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-grayDark p-4 rounded border border-grayMedium">
          <p className="text-grayLight text-xs uppercase font-bold mb-1">Total</p>
          <p className="text-2xl font-heading text-white">{stats.total}</p>
        </div>
        <div className="bg-grayDark p-4 rounded border border-grayMedium">
          <p className="text-grayLight text-xs uppercase font-bold mb-1">Em Estoque</p>
          <p className="text-2xl font-heading text-success">{stats.inStock}</p>
        </div>
        <div className="bg-grayDark p-4 rounded border border-grayMedium">
          <p className="text-grayLight text-xs uppercase font-bold mb-1">Estoque Baixo</p>
          <p className="text-2xl font-heading text-warning">{stats.lowStock}</p>
        </div>
        <div className="bg-grayDark p-4 rounded border border-grayMedium">
          <p className="text-grayLight text-xs uppercase font-bold mb-1">Sem Estoque</p>
          <p className="text-2xl font-heading text-red-500">{stats.outOfStock}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-grayLight" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-grayDark border border-grayMedium text-white rounded pl-10 p-3 focus:border-primary outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-grayLight" size={20} />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-grayDark border border-grayMedium text-white rounded pl-10 pr-8 p-3 focus:border-primary outline-none appearance-none min-w-[180px]"
          >
            <option value="">Todas categorias</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-grayDark rounded border border-grayMedium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-grayLight">
            <thead className="bg-blackCarbon/50 text-xs uppercase font-bold">
              <tr>
                <th className="p-4">Imagem</th>
                <th className="p-4">Produto</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Estoque</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grayMedium">
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center">Carregando...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <Package size={48} className="mx-auto text-grayMedium mb-4" />
                    <p>Nenhum produto encontrado.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-blackCarbon/30 transition-colors">
                    <td className="p-4">
                      <img 
                        src={product.image || product.image_url} 
                        alt="" 
                        className="w-12 h-12 object-cover rounded bg-blackCarbon" 
                      />
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white">{product.name}</div>
                      <div className="text-xs opacity-60">{product.code}</div>
                    </td>
                    <td className="p-4 capitalize">{product.category}</td>
                    <td className="p-4 text-white font-bold">
                      R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        product.stock === 0 
                          ? 'bg-red-500/20 text-red-500'
                          : product.stock < 3 
                            ? 'bg-warning/20 text-warning'
                            : 'bg-success/20 text-success'
                      }`}>
                        {product.stock} unid.
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => navigate(`/admin/products/${product.id}`)}
                        className="p-2 hover:text-white hover:bg-white/10 rounded transition-colors"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
