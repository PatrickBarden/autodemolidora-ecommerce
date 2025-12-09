import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Heart, MapPin, Star, ChevronRight, Package } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { profile } = useAuth();

  const quickLinks = [
    { to: '/minha-conta/pedidos', icon: ShoppingBag, label: 'Meus Pedidos', description: 'Acompanhe seus pedidos', color: 'primary' },
    { to: '/minha-conta/favoritos', icon: Heart, label: 'Favoritos', description: 'Produtos salvos', color: 'red-500' },
    { to: '/minha-conta/enderecos', icon: MapPin, label: 'Endereços', description: 'Gerencie endereços', color: 'blue-500' },
    { to: '/minha-conta/avaliacoes', icon: Star, label: 'Avaliações', description: 'Suas avaliações', color: 'warning' },
  ];

  return (
    <div>
      {/* Welcome Header */}
      <div className="bg-grayDark rounded-lg border border-grayMedium p-6 mb-8">
        <h1 className="text-2xl font-heading text-white uppercase mb-2">
          Olá, {profile?.full_name?.split(' ')[0] || 'Cliente'}!
        </h1>
        <p className="text-grayLight">
          Bem-vindo à sua conta. Aqui você pode acompanhar seus pedidos, gerenciar seus dados e muito mais.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {quickLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="bg-grayDark rounded-lg border border-grayMedium p-5 hover:border-primary transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-${link.color}/20 rounded-lg flex items-center justify-center`}>
                <link.icon className={`text-${link.color}`} size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white group-hover:text-primary transition-colors">{link.label}</h3>
                <p className="text-sm text-grayLight">{link.description}</p>
              </div>
              <ChevronRight className="text-grayMedium group-hover:text-primary transition-colors" size={20} />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-grayDark rounded-lg border border-grayMedium overflow-hidden">
        <div className="p-6 border-b border-grayMedium flex items-center justify-between">
          <h2 className="text-xl font-heading text-white uppercase">Pedidos Recentes</h2>
          <Link to="/minha-conta/pedidos" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="p-8 text-center">
          <Package size={48} className="mx-auto text-grayMedium mb-4" />
          <p className="text-grayLight mb-2">Você ainda não fez nenhum pedido</p>
          <Link to="/" className="text-primary hover:underline font-bold">
            Começar a comprar
          </Link>
        </div>
      </div>
    </div>
  );
};
