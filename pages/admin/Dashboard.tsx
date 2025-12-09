import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Product } from '../../types';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Users, 
  Tag, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  DollarSign,
  ShoppingCart
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  activePromotions: number;
  lowStockProducts: number;
  totalValue: number;
  recentProducts: Product[];
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalUsers: 0,
    activePromotions: 0,
    lowStockProducts: 0,
    totalValue: 0,
    recentProducts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch products
      const { data: products } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch users
      const { data: users } = await supabase
        .from('profiles')
        .select('id');

      // Fetch promotions (tabela pode não existir ainda)
      let promotionsCount = 0;
      try {
        const { data: promotions, error } = await supabase
          .from('promotions')
          .select('id')
          .eq('is_active', true);
        if (!error) promotionsCount = promotions?.length || 0;
      } catch {
        // Tabela não existe ainda
      }

      const productList = products || [];
      
      setStats({
        totalProducts: productList.length,
        totalUsers: users?.length || 0,
        activePromotions: promotionsCount,
        lowStockProducts: productList.filter(p => p.stock < 3 && p.stock > 0).length,
        totalValue: productList.reduce((acc, p) => acc + (Number(p.price) * p.stock), 0),
        recentProducts: productList.slice(0, 5),
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-grayLight">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading text-white uppercase">Dashboard</h1>
        <p className="text-grayLight">Visão geral do sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/admin/products" className="bg-grayDark p-6 rounded-lg border border-grayMedium hover:border-primary transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Package className="text-primary" size={24} />
            </div>
            <ArrowRight className="text-grayMedium group-hover:text-primary transition-colors" size={20} />
          </div>
          <p className="text-grayLight text-sm uppercase font-bold mb-1">Produtos</p>
          <p className="text-3xl font-heading text-white">{stats.totalProducts}</p>
        </Link>

        <Link to="/admin/users" className="bg-grayDark p-6 rounded-lg border border-grayMedium hover:border-primary transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="text-blue-500" size={24} />
            </div>
            <ArrowRight className="text-grayMedium group-hover:text-primary transition-colors" size={20} />
          </div>
          <p className="text-grayLight text-sm uppercase font-bold mb-1">Usuários</p>
          <p className="text-3xl font-heading text-white">{stats.totalUsers}</p>
        </Link>

        <Link to="/admin/promotions" className="bg-grayDark p-6 rounded-lg border border-grayMedium hover:border-primary transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
              <Tag className="text-success" size={24} />
            </div>
            <ArrowRight className="text-grayMedium group-hover:text-primary transition-colors" size={20} />
          </div>
          <p className="text-grayLight text-sm uppercase font-bold mb-1">Promoções Ativas</p>
          <p className="text-3xl font-heading text-white">{stats.activePromotions}</p>
        </Link>

        <div className="bg-grayDark p-6 rounded-lg border border-grayMedium">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-warning" size={24} />
            </div>
          </div>
          <p className="text-grayLight text-sm uppercase font-bold mb-1">Estoque Baixo</p>
          <p className="text-3xl font-heading text-warning">{stats.lowStockProducts}</p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-grayDark p-6 rounded-lg border border-grayMedium">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-success/20 rounded-lg flex items-center justify-center">
              <DollarSign className="text-success" size={28} />
            </div>
            <div>
              <p className="text-grayLight text-sm uppercase font-bold">Valor Total em Estoque</p>
              <p className="text-2xl font-heading text-white">
                R$ {stats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-grayDark p-6 rounded-lg border border-grayMedium">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-primary" size={28} />
            </div>
            <div>
              <p className="text-grayLight text-sm uppercase font-bold">Checkout via WhatsApp</p>
              <p className="text-lg text-white">Sistema Ativo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-grayDark rounded-lg border border-grayMedium overflow-hidden">
        <div className="p-6 border-b border-grayMedium flex items-center justify-between">
          <h2 className="text-xl font-heading text-white uppercase">Produtos Recentes</h2>
          <Link to="/admin/products" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>
        
        {stats.recentProducts.length === 0 ? (
          <div className="p-8 text-center text-grayLight">
            <Package size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhum produto cadastrado ainda.</p>
            <Link to="/admin/products/new" className="text-primary hover:underline mt-2 inline-block">
              Adicionar primeiro produto
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-grayMedium">
            {stats.recentProducts.map((product) => (
              <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-blackCarbon/30 transition-colors">
                <img 
                  src={product.image || product.image_url} 
                  alt="" 
                  className="w-12 h-12 object-cover rounded bg-blackCarbon" 
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">{product.name}</p>
                  <p className="text-xs text-grayLight">{product.code} • {product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">
                    R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <span className={`text-xs font-bold ${
                    product.stock === 0 ? 'text-red-500' : product.stock < 3 ? 'text-warning' : 'text-success'
                  }`}>
                    {product.stock} em estoque
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
