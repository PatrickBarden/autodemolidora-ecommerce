
import React, { useState } from 'react';
import { ShoppingCart, Menu, Search, User, Settings, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { PageRoute } from '../../types';
import { CATEGORIES } from '../../constants';
import { cn } from '../../utils/formatting';
import { IMAGES } from '../../assets/images';

interface HeaderProps {
  onNavigate: (route: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate({ name: 'search', query: searchQuery });
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
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onNavigate({ name: 'home' })}
          >
            <div className="bg-white rounded-md p-1">
                <img 
                  src={IMAGES.logo}
                  alt="Autodemolidora Coronel Barros" 
                  className="h-10 w-auto object-contain"
                />
            </div>
          </div>

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
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex gap-2 text-grayLight hover:text-white"
              onClick={() => onNavigate({ name: 'account' })}
            >
              <User size={20} />
              <span className="hidden lg:inline font-subheading text-lg tracking-wide mt-0.5">Minha Conta</span>
            </Button>

            <Button 
              variant="primary" 
              size="sm" 
              className="relative rounded-[4px] h-11 w-11 p-0 flex items-center justify-center"
              onClick={() => onNavigate({ name: 'cart' })}
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
                <button 
                  className="hover:text-primary transition-colors"
                  onClick={() => onNavigate({ name: 'category', slug: cat.id })}
                >
                  {cat.name}
                </button>
              </li>
            ))}
            <li className="text-primary hover:text-white cursor-pointer transition-colors">
              <button onClick={() => onNavigate({ name: 'category', slug: 'all' })}>
                Ofertas do Dia
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-xs bg-grayDark border-r border-grayMedium shadow-2xl flex flex-col h-full">
            <div className="p-4 border-b border-grayMedium flex justify-between items-center bg-blackCarbon">
              <span className="font-heading text-xl text-white uppercase">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-grayLight"><X size={24} /></button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <ul className="space-y-4 font-subheading text-xl text-grayLight tracking-wide">
                <li className="hover:text-primary cursor-pointer" onClick={() => {onNavigate({name: 'home'}); setIsMobileMenuOpen(false)}}>Início</li>
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button 
                      className="block w-full text-left py-1 hover:text-primary transition-colors uppercase"
                      onClick={() => { onNavigate({ name: 'category', slug: cat.id }); setIsMobileMenuOpen(false); }}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-grayMedium pt-4">
                 <button className="flex items-center gap-3 text-grayLight w-full py-2 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    <User size={20} /> <span className="font-subheading text-lg">Minha Conta</span>
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
