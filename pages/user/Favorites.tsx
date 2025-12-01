import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Package } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';

export const UserFavorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Load favorites from localStorage
    const saved = localStorage.getItem('autodemolidora-favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    }
  }, []);

  const removeFavorite = (productId: string) => {
    const updated = favorites.filter(f => f.id !== productId);
    setFavorites(updated);
    localStorage.setItem('autodemolidora-favorites', JSON.stringify(updated));
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    alert('Produto adicionado ao carrinho!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading text-white uppercase">Meus Favoritos</h1>
        <p className="text-grayLight text-sm">Produtos que você salvou para ver depois</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-grayDark rounded-lg border border-grayMedium p-12 text-center">
          <Heart size={64} className="mx-auto text-grayMedium mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Nenhum favorito ainda</h2>
          <p className="text-grayLight mb-6">
            Salve produtos que você gostou para encontrá-los facilmente depois.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded font-bold hover:bg-primaryDark transition-colors"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((product) => (
            <div key={product.id} className="bg-grayDark rounded-lg border border-grayMedium overflow-hidden group">
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image || product.image_url} 
                    alt={product.name} 
                    className="w-full h-48 object-cover bg-blackCarbon"
                  />
                </Link>
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-colors"
                  title="Remover dos favoritos"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-bold text-white hover:text-primary transition-colors line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-grayLight mb-3">{product.code}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-heading text-primary">
                    R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-2 bg-primary text-white rounded hover:bg-primaryDark transition-colors"
                    title="Adicionar ao carrinho"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
