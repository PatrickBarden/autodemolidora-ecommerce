
import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { PageRoute } from './types';
import { MOCK_PRODUCTS, CATEGORIES, CATEGORY_DETAILS } from './constants';
import { ProductCard } from './components/ProductCard';
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { IMAGES } from './assets/images';

const App: React.FC = () => {
  const [route, setRoute] = useState<PageRoute>({ name: 'home' });

  const handleNavigate = (newRoute: PageRoute) => {
    window.scrollTo(0, 0);
    setRoute(newRoute);
  };

  // Simple Router Switch
  const renderContent = () => {
    switch (route.name) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      
      case 'product':
        const product = MOCK_PRODUCTS.find(p => p.id === route.id);
        return product ? <ProductDetail product={product} onNavigate={handleNavigate} /> : <div className="text-white p-8">Produto não encontrado</div>;
      
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;

      case 'category':
        const categoryId = route.slug;
        const filteredProducts = categoryId === 'all' 
           ? MOCK_PRODUCTS 
           : MOCK_PRODUCTS.filter(p => p.category === categoryId);
        
        // Get details from new constant or fallback
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
                       {catDetails.tips.length > 0 && (
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

                       {filteredProducts.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                             {filteredProducts.map(p => (
                                <ProductCard key={p.id} product={p} onClick={() => handleNavigate({ name: 'product', id: p.id })} />
                             ))}
                          </div>
                       ) : (
                          <div className="text-center py-20 bg-grayDark/30 rounded border border-dashed border-grayMedium">
                             <p className="text-grayLight text-lg mb-2">Nenhum produto encontrado nesta categoria.</p>
                             <p className="text-sm text-grayLight/50">Tente buscar em outras categorias ou entre em contato pelo WhatsApp.</p>
                          </div>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        );

      case 'search':
        const query = route.query.toLowerCase();
        const searchResults = MOCK_PRODUCTS.filter(p => 
           p.name.toLowerCase().includes(query) || 
           p.code.toLowerCase().includes(query) ||
           p.brand.toLowerCase().includes(query)
        );
        return (
           <div className="container mx-auto px-4 py-12 bg-blackCarbon min-h-screen">
              <h1 className="text-3xl font-heading text-white uppercase mb-8 border-l-4 border-primary pl-4">Busca: "{route.query}"</h1>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                 {searchResults.map(p => (
                    <ProductCard key={p.id} product={p} onClick={() => handleNavigate({ name: 'product', id: p.id })} />
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

      case 'account':
         return (
            <div className="container mx-auto px-4 py-20 text-center min-h-screen bg-blackCarbon">
               <h1 className="text-3xl font-heading text-white uppercase mb-4">Minha Conta</h1>
               <p className="text-grayLight">Funcionalidade em desenvolvimento. Apenas visual.</p>
            </div>
         );

      case 'institutional':
         return (
            <div className="container mx-auto px-4 py-12 max-w-3xl min-h-screen bg-blackCarbon text-grayLight">
               <h1 className="text-4xl font-heading text-white uppercase mb-8 border-l-4 border-primary pl-4 capitalize">{route.slug}</h1>
               <div className="prose prose-invert">
                  <p className="text-lg">Conteúdo da página institucional...</p>
               </div>
            </div>
         );

      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-blackCarbon font-sans text-gray-100 antialiased selection:bg-primary selection:text-white">
        <Header onNavigate={handleNavigate} />
        <main className="flex-1">
          {renderContent()}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </CartProvider>
  );
};

export default App;
