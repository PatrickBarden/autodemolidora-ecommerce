import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatting';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-[6px] bg-grayDark border border-grayMedium transition-all duration-300 hover:border-primary hover:shadow-xl cursor-pointer hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="absolute top-2 left-2 z-10 flex gap-1">
        {product.originalPrice && (
          <Badge variant="promo">Promoção</Badge>
        )}
        {!product.isNew && (
          <Badge variant="warning">USADO</Badge>
        )}
        {product.isNew && (
          <Badge variant="success">NOVO</Badge>
        )}
      </div>
      
      <div className="relative aspect-square overflow-hidden bg-white/5">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-grayLight">
          <span className="font-bold uppercase tracking-wide">{product.brand}</span>
          <span className="text-grayMedium">•</span>
          <span className="font-mono text-grayLight/70">{product.code}</span>
        </div>
        
        <h3 className="mb-3 text-xl font-subheading tracking-wide text-white line-clamp-2 flex-1 leading-tight">
          {product.name}
        </h3>

        <div className="mt-auto">
          <div className="flex flex-col mb-3">
            {product.originalPrice && (
              <span className="text-xs text-grayLight/60 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-2xl font-heading text-primary tracking-wide">
              {formatCurrency(product.price)}
            </span>
            <span className="text-[10px] text-grayLight uppercase">à vista no PIX</span>
          </div>

          <Button 
            className="w-full gap-2" 
            size="sm" 
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
};