import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types';

interface ProductCarouselProps {
  products: Product[];
  onProductClick: (id: string) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onProductClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative group">
      {/* Scroll Buttons - Desktop */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blackCarbon/90 text-white border border-grayMedium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:border-primary hidden md:flex items-center justify-center -ml-4"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blackCarbon/90 text-white border border-grayMedium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:border-primary hidden md:flex items-center justify-center -mr-4"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Products Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4 md:mx-0 md:px-0"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-auto md:flex-1 md:min-w-[250px] md:max-w-[300px]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ProductCard
              product={product}
              onClick={() => onProductClick(product.id)}
            />
          </div>
        ))}
      </div>

      {/* Scroll Indicator - Mobile */}
      <div className="flex justify-center gap-1 mt-4 md:hidden">
        <div className="h-1 w-8 rounded-full bg-primary/50"></div>
        <div className="h-1 w-2 rounded-full bg-grayMedium"></div>
        <div className="h-1 w-2 rounded-full bg-grayMedium"></div>
      </div>
    </div>
  );
};
