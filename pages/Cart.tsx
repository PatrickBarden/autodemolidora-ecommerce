import React from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatting';
import { Button } from '../components/ui/Button';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 bg-blackCarbon min-h-screen">
        <div className="mb-6 rounded-full bg-grayDark border border-grayMedium p-8 text-grayLight/50">
           <ShoppingBag size={64} strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-heading text-white uppercase mb-2">Seu carrinho está vazio</h2>
        <p className="text-grayLight mb-10 text-center max-w-md">Nenhuma peça selecionada no momento. Explore nosso catálogo de peças usadas e novas.</p>
        <Button onClick={() => navigate('/category/all')} size="lg">
          Ir para o Pátio
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-blackCarbon min-h-screen">
      <h1 className="text-3xl font-heading text-white uppercase mb-10 border-l-4 border-primary pl-4">Carrinho de Peças</h1>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 rounded-[6px] border border-grayMedium bg-grayDark p-6 transition-colors hover:border-grayLight/30">
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-[4px] border border-grayMedium bg-blackCarbon">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover opacity-90" />
                </div>
                
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                       <h3 className="font-subheading text-2xl text-white tracking-wide line-clamp-2">{item.name}</h3>
                       <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-grayLight hover:text-primary transition-colors p-1"
                       >
                          <Trash2 size={20} />
                       </button>
                    </div>
                    <p className="text-xs font-mono text-grayLight/70 mt-1 uppercase">Cód: {item.code}</p>
                  </div>
                  
                  <div className="mt-4 flex items-end justify-between">
                    <div className="flex items-center rounded-[4px] border border-grayMedium bg-blackCarbon">
                      <button 
                         className="px-3 py-1 hover:bg-grayMedium text-grayLight"
                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >-</button>
                      <span className="px-3 text-sm font-mono font-bold text-white">{item.quantity}</span>
                      <button 
                         className="px-3 py-1 hover:bg-grayMedium text-grayLight"
                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-grayLight mb-1">Unit: {formatCurrency(item.price)}</p>
                       <p className="font-heading text-xl text-primary tracking-wide">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="rounded-[6px] border border-grayMedium bg-grayDark p-8 sticky top-24 shadow-xl">
             <h3 className="mb-6 text-xl font-heading text-white uppercase">Resumo do Pedido</h3>
             
             <div className="space-y-4 border-b border-grayMedium pb-6 mb-6">
                <div className="flex justify-between text-grayLight text-sm">
                   <span>Subtotal ({items.length} itens)</span>
                   <span className="text-white font-bold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-grayLight text-sm">
                   <span>Frete estimado</span>
                   <span className="text-xs italic text-grayLight/50 uppercase">Calculado no próximo passo</span>
                </div>
             </div>

             <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-subheading text-grayLight uppercase">Total</span>
                <span className="text-3xl font-heading text-white">{formatCurrency(subtotal)}</span>
             </div>

             <Button 
               className="w-full py-4 text-base h-14" 
               onClick={() => navigate('/checkout')}
             >
               Fechar Negócio
             </Button>

             <button 
                className="mt-6 w-full text-center text-xs font-bold uppercase tracking-widest text-grayLight hover:text-white transition-colors"
                onClick={() => navigate('/category/all')}
             >
                Continuar Comprando
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};