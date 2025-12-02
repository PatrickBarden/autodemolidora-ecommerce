
import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Menu, Search, User, X, LogOut, Shield, ChevronDown, Settings, Package, Phone, Tag, FileText, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { CATEGORIES } from '../../constants';
import { IMAGES } from '../../assets/images';
import { useNavigate, Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Bloquear scroll do body quando menu mobile estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-grayMedium bg-blackCarbon/95 backdrop-blur-sm shadow-lg">
      {/* Top Bar */}
      <div className="bg-primaryDark py-1.5 text-center text-[10px] uppercase tracking-widest font-bold text-white">
        <span>Peças com procedência e garantia • Envio para todo Brasil</span>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-white hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <img 
              src={IMAGES.logo}
              alt="Autodemolidora Coronel Barros" 
              className="h-16 w-auto object-contain max-w-sm"
            />
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden max-w-lg flex-1 lg:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Busque por peça, marca ou código..."
                className="h-11 w-full rounded-[4px] border border-grayMedium bg-grayDark px-4 py-2 pl-11 text-sm text-white placeholder:text-grayLight/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 text-grayLight" size={18} />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user ? (
               <div className="hidden sm:block relative" ref={accountMenuRef}>
                  <Button 
                     variant="ghost" 
                     size="sm" 
                     className="gap-2 text-grayLight hover:text-white"
                     onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  >
                     <User size={20} />
                     <span className="hidden lg:inline font-subheading text-lg tracking-wide mt-0.5">Conta</span>
                     <ChevronDown size={16} className={`transition-transform ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  {/* Dropdown Menu */}
                  {isAccountMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-grayDark border border-grayMedium rounded-lg shadow-xl overflow-hidden z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-grayMedium bg-blackCarbon">
                        <p className="text-xs text-grayLight/60 uppercase tracking-wider">Logado como</p>
                        <p className="text-sm text-white truncate">{user.email}</p>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        {isAdmin && (
                          <button 
                            onClick={() => { navigate('/admin'); setIsAccountMenuOpen(false); }}
                            className="w-full px-4 py-2.5 flex items-center gap-3 text-warning hover:bg-warning/10 transition-colors"
                          >
                            <Shield size={18} />
                            <span className="text-sm font-medium">Painel Admin</span>
                          </button>
                        )}
                        <button 
                          onClick={() => { navigate('/minha-conta'); setIsAccountMenuOpen(false); }}
                          className="w-full px-4 py-2.5 flex items-center gap-3 text-grayLight hover:bg-grayMedium/50 hover:text-white transition-colors"
                        >
                          <Settings size={18} />
                          <span className="text-sm font-medium">Minha Conta</span>
                        </button>
                        <button 
                          onClick={() => { navigate('/meus-pedidos'); setIsAccountMenuOpen(false); }}
                          className="w-full px-4 py-2.5 flex items-center gap-3 text-grayLight hover:bg-grayMedium/50 hover:text-white transition-colors"
                        >
                          <Package size={18} />
                          <span className="text-sm font-medium">Meus Pedidos</span>
                        </button>
                      </div>
                      
                      {/* Logout */}
                      <div className="border-t border-grayMedium py-2">
                        <button 
                          onClick={() => { signOut(); setIsAccountMenuOpen(false); }}
                          className="w-full px-4 py-2.5 flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut size={18} />
                          <span className="text-sm font-medium">Sair</span>
                        </button>
                      </div>
                    </div>
                  )}
               </div>
            ) : (
               <Button 
                 variant="ghost" 
                 size="sm" 
                 className="hidden sm:flex gap-2 text-grayLight hover:text-white"
                 onClick={() => navigate('/login')}
               >
                 <User size={20} />
                 <span className="hidden lg:inline font-subheading text-lg tracking-wide mt-0.5">Entrar</span>
               </Button>
            )}

            <Button 
              variant="primary" 
              size="sm" 
              className="relative rounded-[4px] h-11 w-11 p-0 flex items-center justify-center"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded bg-white text-[10px] font-bold text-primary shadow-sm">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search (Visible only on mobile) */}
        <div className="pb-4 lg:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="O que você procura?"
              className="h-10 w-full rounded-[4px] border border-grayMedium bg-grayDark px-4 pl-10 text-sm text-white focus:border-primary focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-grayLight" size={18} />
          </form>
        </div>
      </div>

      {/* Navigation Bar (Desktop) */}
      <nav className="hidden border-t border-grayMedium bg-blackCarbon/50 lg:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 py-3 text-sm font-bold text-grayLight tracking-wider uppercase font-subheading text-lg">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link 
                  to={`/category/${cat.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li className="text-primary hover:text-white cursor-pointer transition-colors">
              <Link to="/category/all">
                Ofertas do Dia
              </Link>
            </li>
            <li>
              <Link 
                to="/contato"
                className="hover:text-primary transition-colors"
              >
                Contato
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden h-screen">
          <div className="absolute inset-0 bg-black/95" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 h-screen w-[85%] max-w-[320px] bg-grayDark border-r border-grayMedium shadow-2xl animate-slide-in-left overflow-hidden">
            {/* Header */}
            <div className="h-14 px-4 border-b border-grayMedium flex justify-between items-center bg-blackCarbon">
              <img src={IMAGES.logo} alt="Logo" className="h-7 w-auto" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 rounded-lg bg-grayMedium text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <div className="overflow-y-auto pb-36" style={{ maxHeight: 'calc(100vh - 56px)' }}>
              <div className="p-3 space-y-1">
                {/* Início */}
                <button 
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-white hover:bg-grayMedium/30 transition-colors"
                  onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
                >
                  <Package size={18} className="text-grayLight" />
                  <span className="font-bold uppercase text-sm">Início</span>
                </button>

                {/* Categorias - Dropdown */}
                <div>
                  <button 
                    className="w-full flex items-center gap-3 p-3 rounded-lg text-white hover:bg-grayMedium/30 transition-colors"
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  >
                    <Settings size={18} className="text-grayLight" />
                    <span className="font-bold uppercase text-sm flex-1 text-left">Categorias</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-grayLight transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {/* Dropdown Content */}
                  {isCategoriesOpen && (
                    <div className="ml-6 mt-1 space-y-0.5 border-l-2 border-primary/30 pl-3">
                      {CATEGORIES.map((cat) => (
                        <button 
                          key={cat.id}
                          className="w-full flex items-center gap-2 p-2.5 rounded text-grayLight hover:bg-grayMedium/30 hover:text-white transition-colors"
                          onClick={() => { navigate(`/category/${cat.id}`); setIsMobileMenuOpen(false); setIsCategoriesOpen(false); }}
                        >
                          <ChevronRight size={12} className="text-primary" />
                          <span className="text-sm">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Promoções */}
                <button 
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-white hover:bg-grayMedium/30 transition-colors"
                  onClick={() => { navigate('/category/all'); setIsMobileMenuOpen(false); }}
                >
                  <Tag size={18} className="text-primary" />
                  <span className="font-bold uppercase text-sm">Promoções</span>
                  <span className="ml-auto bg-primary text-white text-[10px] px-1.5 py-0.5 rounded font-bold">NOVO</span>
                </button>

                {/* Meus Pedidos */}
                <button 
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-white hover:bg-grayMedium/30 transition-colors"
                  onClick={() => { navigate(user ? '/minha-conta/pedidos' : '/login'); setIsMobileMenuOpen(false); }}
                >
                  <FileText size={18} className="text-grayLight" />
                  <span className="font-bold uppercase text-sm">Meus Pedidos</span>
                </button>

                {/* Contato */}
                <button 
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-white hover:bg-grayMedium/30 transition-colors"
                  onClick={() => { navigate('/contato'); setIsMobileMenuOpen(false); }}
                >
                  <Phone size={18} className="text-grayLight" />
                  <span className="font-bold uppercase text-sm">Contato</span>
                </button>

                {/* Carrinho */}
                <button 
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-white hover:bg-grayMedium/30 transition-colors"
                  onClick={() => { navigate('/cart'); setIsMobileMenuOpen(false); }}
                >
                  <ShoppingCart size={18} className="text-grayLight" />
                  <span className="font-bold uppercase text-sm">Carrinho</span>
                  {totalItems > 0 && (
                    <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded font-bold">{totalItems}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Footer - User Actions - Fixed at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-grayMedium bg-blackCarbon" style={{ height: '140px' }}>
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-grayMedium/20 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{user.email}</p>
                      <p className="text-[10px] text-grayLight">Conta ativa</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg bg-grayMedium/30 text-white text-xs font-bold"
                      onClick={() => { navigate('/minha-conta'); setIsMobileMenuOpen(false); }}
                    >
                      <User size={14} /> Minha Conta
                    </button>
                    <button 
                      className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold"
                      onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                    >
                      <LogOut size={14} /> Sair
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <button 
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-primary text-white text-sm font-bold"
                    onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                  >
                    <User size={16} /> Entrar na Conta
                  </button>
                  <button 
                    className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border border-grayMedium text-grayLight text-sm font-bold"
                    onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}
                  >
                    Criar Nova Conta
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
