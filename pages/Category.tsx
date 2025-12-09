import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES, CATEGORY_DETAILS } from '../constants';
import { useProductsByCategory } from '../hooks/useProducts';
import { IMAGES } from '../assets/images';
import { ProductCard } from '../components/ProductCard';
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const categoryId = slug || 'all';
  const { products: filteredProducts, loading } = useProductsByCategory(categoryId);
  
  const catDetails = CATEGORY_DETAILS[categoryId] || {
     title: CATEGORIES.find(c => c.id === categoryId)?.name || "Todos os Produtos",
     description: "Confira nosso estoque atualizado de peças com procedência e garantia.",
     banner: IMAGES.categories.fallback,
     tips: []
  };
  
  return (
     <div className="min-h-screen bg-blackCarbon">
        {/* Category Hero Banner */}
        <div className="relative h-64 w-full overflow-hidden border-b border-grayMedium">
           <div 
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url('${catDetails.banner}')` }}
           ></div>
           <div className="absolute inset-0 bg-gradient-to-t from-blackCarbon to-transparent"></div>
           <div className="absolute bottom-0 left-0 w-full p-8">
              <div className="container mx-auto px-4">
                 <h1 className="text-5xl font-heading text-white uppercase mb-2 drop-shadow-md">{catDetails.title}</h1>
                 <p className="text-grayLight text-lg max-w-2xl drop-shadow-sm">{catDetails.description}</p>
              </div>
           </div>
        </div>

        <div className="container mx-auto px-4 py-12">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Sidebar / Tips Section */}
              <div className="lg:col-span-1 space-y-6">
                 {/* Filters (Visual Only) */}
                 <div className="bg-grayDark p-6 rounded-[6px] border border-grayMedium">
                    <h3 className="font-heading text-white uppercase text-xl mb-4">Filtros</h3>
                    <div className="space-y-4">
                       <div>
                          <label className="text-xs font-bold text-grayLight uppercase block mb-2">Marca</label>
                          <select className="w-full bg-blackCarbon border border-grayMedium text-white rounded p-2 text-sm">
                             <option>Todas</option>
                             <option>Volkswagen</option>
                             <option>Chevrolet</option>
                             <option>Fiat</option>
                             <option>Ford</option>
                          </select>
                       </div>
                       <div>
                          <label className="text-xs font-bold text-grayLight uppercase block mb-2">Condição</label>
                          <div className="flex gap-2">
                             <label className="flex items-center gap-2 text-sm text-grayLight cursor-pointer">
                                <input type="checkbox" className="accent-primary" /> Novo
                             </label>
                             <label className="flex items-center gap-2 text-sm text-grayLight cursor-pointer">
                                <input type="checkbox" className="accent-primary" /> Usado
                             </label>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Specialist Tips */}
                 {catDetails.tips && catDetails.tips.length > 0 && (
                    <div className="bg-primaryDark/10 p-6 rounded-[6px] border border-primary/20">
                       <div className="flex items-center gap-2 text-primary mb-4">
                          <Info size={20} />
                          <h3 className="font-heading uppercase text-lg">Dicas do Especialista</h3>
                       </div>
                       <ul className="space-y-3">
                          {catDetails.tips.map((tip, idx) => (
                             <li key={idx} className="text-sm text-grayLight flex gap-2">
                                <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-primary" />
                                {tip}
                             </li>
                          ))}
                       </ul>
                    </div>
                 )}
                 
                 {/* Warranty Badge */}
                 <div className="bg-grayDark p-4 rounded-[6px] border border-grayMedium flex items-center gap-3">
                    <div className="p-2 bg-success/20 text-success rounded-full">
                       <AlertTriangle size={20} />
                    </div>
                    <div>
                       <p className="text-white font-bold uppercase text-sm">Garantia de 3 Meses</p>
                       <p className="text-xs text-grayLight">Em todas as peças usadas</p>
                    </div>
                 </div>
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                 <div className="mb-6 flex justify-between items-center">
                    <p className="text-grayLight text-sm">Mostrando <strong className="text-white">{filteredProducts.length}</strong> resultados</p>
                    <select className="bg-grayDark border border-grayMedium text-white text-sm rounded px-3 py-1">
                       <option>Mais Relevantes</option>
                       <option>Menor Preço</option>
                       <option>Maior Preço</option>
                    </select>
                 </div>

                 {loading ? (
                    <div className="text-center py-20">
                       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                       <p className="text-grayLight mt-4">Carregando produtos...</p>
                    </div>
                 ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       {filteredProducts.map(p => (
                          <ProductCard key={p.id} product={p} onClick={() => navigate(`/product/${p.id}`)} />
                       ))}
                    </div>
                 ) : (
                    <div className="text-center py-20 bg-grayDark/30 rounded border border-dashed border-grayMedium">
                       <p className="text-grayLight text-lg mb-2">Nenhum produto cadastrado nesta categoria.</p>
                       <p className="text-sm text-grayLight/50">Em breve teremos novidades! Entre em contato pelo WhatsApp.</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
     </div>
  );
};
