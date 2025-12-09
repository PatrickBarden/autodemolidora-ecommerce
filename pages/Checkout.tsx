import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { UserData } from '../types';
import { STORE_PHONE } from '../constants';
import { formatCurrency, formatPhone, formatCEP } from '../utils/formatting';
import { Button } from '../components/ui/Button';

const INITIAL_DATA: UserData = {
  name: '', email: '', phone: '', cpf: '',
  cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: 'RS',
  paymentMethod: 'pix', deliveryMethod: 'shipping', notes: ''
};

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState<UserData>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);

  // Mock Shipping Calculation
  const shippingCost = formData.cep.length >= 8 ? 35.00 : 0;
  const total = subtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    // Simple masks
    if (name === 'phone') finalValue = formatPhone(value);
    if (name === 'cep') finalValue = formatCEP(value);

    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleFinishOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Construct WhatsApp Message - Sem emojis para evitar problemas de encoding
    const productsList = items.map(item => 
      `- ${item.code} | ${item.name} | ${item.quantity}x ${formatCurrency(item.price)} = ${formatCurrency(item.quantity * item.price)}`
    ).join('\n');

    const paymentLabel = formData.paymentMethod === 'credit_card' ? 'Cartao' : 
                         formData.paymentMethod === 'pix' ? 'PIX' : 
                         formData.paymentMethod === 'boleto' ? 'Boleto' : 'Dinheiro';

    const deliveryLabel = formData.deliveryMethod === 'shipping' ? 'Envio' : 'Retirada';

    const addressLine = `${formData.street}, ${formData.number}${formData.complement ? ' - ' + formData.complement : ''}, ${formData.neighborhood}, ${formData.city}/${formData.state} - CEP: ${formData.cep}`;

    const message = `*NOVO PEDIDO - CORONEL BARROS*

*CLIENTE:*
${formData.name}
CPF: ${formData.cpf}
Tel: ${formData.phone}
Email: ${formData.email}

*ENDERECO:*
${addressLine}

*PECAS:*
${productsList}

*VALORES:*
Subtotal: ${formatCurrency(subtotal)}
Frete: ${formatCurrency(shippingCost)}
TOTAL: ${formatCurrency(total)}

*PAGAMENTO:* ${paymentLabel}
*ENTREGA:* ${deliveryLabel}${formData.notes ? '\n\nObs: ' + formData.notes : ''}

Aguardo confirmacao!`;

    const encodedMessage = encodeURIComponent(message);
    
    // URL para WhatsApp Web (fallback)
    const whatsappWebUrl = `https://wa.me/${STORE_PHONE}?text=${encodedMessage}`;
    
    // URL para WhatsApp Desktop/Mobile App (protocolo direto)
    const whatsappAppUrl = `https://api.whatsapp.com/send?phone=${STORE_PHONE}&text=${encodedMessage}`;
    
    // Usar api.whatsapp.com que funciona melhor com o app desktop
    window.open(whatsappAppUrl, '_blank');
    
    // Limpar carrinho e redirecionar após pequeno delay
    setTimeout(() => {
      clearCart();
      setLoading(false);
      navigate('/');
    }, 500);
  };

  const inputClass = "w-full rounded-[4px] border border-grayMedium bg-blackCarbon px-3 py-2 text-white placeholder:text-grayLight/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all";
  const labelClass = "flex items-center gap-3 rounded-[4px] border border-grayMedium p-4 cursor-pointer hover:bg-blackCarbon transition-colors bg-grayDark/50";

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl bg-blackCarbon min-h-screen">
       <button 
        onClick={() => navigate('/cart')}
        className="mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-grayLight hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} /> Voltar para Carrinho
      </button>

      <h1 className="text-3xl font-heading text-white uppercase mb-8 border-l-4 border-primary pl-4">Finalizar Pedido</h1>

      <form onSubmit={handleFinishOrder} className="grid gap-10 md:grid-cols-2">
        
        {/* Left Column: Forms */}
        <div className="space-y-8">
          
          {/* Personal Data */}
          <section className="rounded-[6px] border border-grayMedium bg-grayDark p-6">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-subheading text-white uppercase tracking-wide">
               <span className="flex h-7 w-7 items-center justify-center rounded bg-primary text-sm font-bold text-white">1</span>
               Seus Dados
            </h2>
            <div className="grid gap-4">
               <input 
                  name="name" required placeholder="Nome Completo" 
                  className={inputClass}
                  value={formData.name} onChange={handleChange}
               />
               <div className="grid grid-cols-2 gap-4">
                  <input 
                     name="cpf" required placeholder="CPF" 
                     className={inputClass}
                     value={formData.cpf} onChange={handleChange}
                  />
                  <input 
                     name="phone" required placeholder="WhatsApp" 
                     className={inputClass}
                     value={formData.phone} onChange={handleChange}
                  />
               </div>
               <input 
                  name="email" type="email" required placeholder="E-mail" 
                  className={inputClass}
                  value={formData.email} onChange={handleChange}
               />
            </div>
          </section>

          {/* Address */}
          <section className="rounded-[6px] border border-grayMedium bg-grayDark p-6">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-subheading text-white uppercase tracking-wide">
               <span className="flex h-7 w-7 items-center justify-center rounded bg-primary text-sm font-bold text-white">2</span>
               Entrega
            </h2>
            <div className="grid gap-4">
               <div className="grid grid-cols-2 gap-4">
                  <input 
                     name="cep" required placeholder="CEP" 
                     className={inputClass}
                     value={formData.cep} onChange={handleChange}
                  />
               </div>
               <div className="grid grid-cols-3 gap-4">
                  <input 
                     name="street" required placeholder="Rua/Av" className={`col-span-2 ${inputClass}`}
                     value={formData.street} onChange={handleChange}
                  />
                  <input 
                     name="number" required placeholder="Nº" className={inputClass}
                     value={formData.number} onChange={handleChange}
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <input 
                     name="neighborhood" required placeholder="Bairro" className={inputClass}
                     value={formData.neighborhood} onChange={handleChange}
                  />
                  <input 
                     name="complement" placeholder="Comp." className={inputClass}
                     value={formData.complement} onChange={handleChange}
                  />
               </div>
               <div className="grid grid-cols-3 gap-4">
                  <input 
                     name="city" required placeholder="Cidade" className={`col-span-2 ${inputClass}`}
                     value={formData.city} onChange={handleChange}
                  />
                  <select 
                     name="state" className={inputClass}
                     value={formData.state} onChange={handleChange}
                  >
                     <option value="RS">RS</option>
                     <option value="SC">SC</option>
                     <option value="PR">PR</option>
                     <option value="SP">SP</option>
                  </select>
               </div>
            </div>
          </section>

           {/* Payment */}
           <section className="rounded-[6px] border border-grayMedium bg-grayDark p-6">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-subheading text-white uppercase tracking-wide">
               <span className="flex h-7 w-7 items-center justify-center rounded bg-primary text-sm font-bold text-white">3</span>
               Pagamento Preferencial
            </h2>
            <div className="space-y-3">
               {['pix', 'credit_card', 'boleto'].map((method) => (
                  <label key={method} className={labelClass}>
                     <input 
                        type="radio" name="paymentMethod" 
                        value={method} 
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                        className="h-4 w-4 accent-primary bg-transparent"
                     />
                     <span className="text-sm font-bold text-white uppercase tracking-wider">
                        {method === 'credit_card' ? 'Cartão de Crédito' : method}
                     </span>
                  </label>
               ))}
            </div>
          </section>
        </div>

        {/* Right Column: Summary */}
        <div className="space-y-6">
           <div className="rounded-[6px] border border-grayMedium bg-grayDark p-8 sticky top-24 shadow-2xl">
             <h3 className="mb-6 text-xl font-heading text-white uppercase">Sua Compra</h3>
             
             <div className="max-h-60 overflow-y-auto pr-2 space-y-4 border-b border-grayMedium pb-6 mb-6 custom-scrollbar">
                {items.map((item) => (
                   <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex gap-3">
                         <span className="font-bold text-primary">{item.quantity}x</span>
                         <span className="text-grayLight line-clamp-2 w-40">{item.name}</span>
                      </div>
                      <span className="text-white font-bold">{formatCurrency(item.price * item.quantity)}</span>
                   </div>
                ))}
             </div>

             <div className="space-y-3 border-b border-grayMedium pb-6 mb-6">
                <div className="flex justify-between text-grayLight text-sm">
                   <span>Subtotal</span>
                   <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-grayLight text-sm">
                   <span>Frete (Estimado)</span>
                   <span>{formatCurrency(shippingCost)}</span>
                </div>
                <div className="flex justify-between font-heading text-2xl text-white pt-2 uppercase">
                   <span>Total</span>
                   <span>{formatCurrency(total)}</span>
                </div>
             </div>

             <div className="bg-primaryDark/20 p-4 rounded-[4px] border border-primary/30 text-xs text-grayLight mb-6">
                <p className="font-bold text-primary mb-1 uppercase tracking-wide">Informação Importante</p>
                <p>Ao finalizar, você será redirecionado para nosso WhatsApp oficial. Um vendedor confirmará a disponibilidade real das peças usadas e o valor exato do frete antes do pagamento.</p>
             </div>

             <Button 
               type="submit"
               className="w-full h-14 text-base gap-2 bg-success hover:bg-green-600" 
               disabled={loading}
             >
               {loading ? 'Gerando Pedido...' : (
                  <>
                     <Send size={18} /> Finalizar no WhatsApp
                  </>
               )}
             </Button>
          </div>
        </div>
      </form>
    </div>
  );
};