import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const searchResults = MOCK_PRODUCTS.filter(p => 
     p.name.toLowerCase().includes(query) || 
     p.code.toLowerCase().includes(query) ||
     p.brand.toLowerCase().includes(query)
  );

  return (
     <div className="container mx-auto px-4 py-12 bg-blackCarbon min-h-screen">
        <h1 className="text-3xl font-heading text-white uppercase mb-8 border-l-4 border-primary pl-4">Busca: "{query}"</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
           {searchResults.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => navigate(`/product/${p.id}`)} />
           ))}
        </div>
        {searchResults.length === 0 && (
           <div className="text-center py-16">
              <p className="text-xl text-grayLight mb-4">Não encontramos nada com esse termo.</p>
              <p className="text-grayLight/60">Dica: Tente buscar pelo nome do carro (ex: "Gol", "Civic") ou pela peça genérica (ex: "Motor", "Porta").</p>
           </div>
        )}
     </div>
  );
};
