import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Tag, 
  Settings, 
  LogOut,
  ChevronRight,
  ExternalLink,
  Image,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/hero', icon: Image, label: 'Banner Hero' },
  { to: '/admin/products', icon: Package, label: 'Produtos' },
  { to: '/admin/users', icon: Users, label: 'Usuários' },
  { to: '/admin/promotions', icon: Tag, label: 'Promoções' },
  { to: '/admin/reports', icon: BarChart3, label: 'Relatórios' },
  { to: '/admin/settings', icon: Settings, label: 'Configurações' },
];

export const AdminLayout: React.FC = () => {
  const { profile, signOut } = useAuth();

  return (
    <div className="flex h-screen bg-blackCarbon">
      {/* Sidebar - Fixed height */}
      <aside className="w-64 h-screen bg-grayDark border-r border-grayMedium flex flex-col fixed left-0 top-0">
        {/* Logo */}
        <div className="p-4 border-b border-grayMedium">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/autodemolidora-logo.svg" 
              alt="Autodemolidora" 
              className="w-14 h-14 object-contain"
            />
            <div>
              <h1 className="font-heading text-white text-xl uppercase">Administrador</h1>
              <p className="text-xs text-grayLight">Painel de Controle</p>
            </div>
          </div>
        </div>
        
        {/* Link para o site */}
        <div className="px-4 pt-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 text-sm text-grayLight hover:text-white hover:bg-grayMedium rounded transition-colors"
          >
            <ExternalLink size={16} />
            <span>Voltar ao Site</span>
          </Link>
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

        {/* Spacer to push user info to bottom */}
        <div className="flex-1"></div>

        {/* User Info - Always at bottom */}
        <div className="p-4 border-t border-grayMedium">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold">
                {profile?.full_name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{profile?.full_name || 'Admin'}</p>
              <p className="text-xs text-grayLight">Administrador</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-grayMedium text-grayLight hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded transition-colors"
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content - with left margin to account for fixed sidebar */}
      <main className="flex-1 ml-64 overflow-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
};
