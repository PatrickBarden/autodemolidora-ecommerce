import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { 
  User,
  ShoppingBag, 
  Heart,
  MapPin,
  Star,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/minha-conta', icon: User, label: 'Meu Perfil', end: true },
  { to: '/minha-conta/pedidos', icon: ShoppingBag, label: 'Meus Pedidos' },
  { to: '/minha-conta/favoritos', icon: Heart, label: 'Favoritos' },
  { to: '/minha-conta/enderecos', icon: MapPin, label: 'Endereços' },
  { to: '/minha-conta/avaliacoes', icon: Star, label: 'Minhas Avaliações' },
  { to: '/minha-conta/configuracoes', icon: Settings, label: 'Configurações' },
];

export const UserLayout: React.FC = () => {
  const { profile, signOut } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-grayDark rounded-lg border border-grayMedium overflow-hidden sticky top-4">
            {/* User Header */}
            <div className="p-6 border-b border-grayMedium bg-gradient-to-r from-primary/20 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center border-2 border-primary">
                  <span className="text-primary font-heading text-2xl">
                    {profile?.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-bold text-lg truncate">{profile?.full_name || 'Usuário'}</h2>
                  <p className="text-xs text-grayLight">Cliente desde {new Date(profile?.created_at || '').getFullYear()}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-grayLight hover:bg-grayMedium hover:text-white'
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight size={16} className="ml-auto opacity-50" />
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="p-4 border-t border-grayMedium space-y-2">
              <Link 
                to="/" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-grayLight hover:text-white hover:bg-grayMedium rounded transition-colors w-full"
              >
                <ExternalLink size={16} />
                <span>Continuar Comprando</span>
              </Link>
              <button
                onClick={signOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-grayLight hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
              >
                <LogOut size={16} />
                <span>Sair da Conta</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
