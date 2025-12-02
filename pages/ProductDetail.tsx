import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Truck, CheckCircle, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatting';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id || '');
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [cep, setCep] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Pega todas as imagens do produto (images array ou fallback para image)
  const productImages = product?.images?.length ? product.images : (product?.image ? [product.image] : []);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 bg-blackCarbon min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-grayLight mt-4">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 bg-blackCarbon min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-grayLight mb-4">Produto não encontrado</p>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-blackCarbon min-h-screen">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-grayLight hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} /> Voltar
      </button>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] overflow-hidden rounded-[6px] border border-grayMedium bg-grayDark relative">
            <img 
              src={productImages[selectedImageIndex] || product.image} 
              alt={product.name} 
              className="h-full w-full object-cover object-center"
            />
            {!product.isNew && <div className="absolute top-4 left-4"><Badge variant="warning" className="text-lg px-3 py-1">PEÇA USADA ORIGINAL</Badge></div>}
          </div>
          {/* Thumbnails - mostra apenas se houver imagens */}
          {productImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2 sm:gap-4">
               {productImages.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedImageIndex(i)}
                    className={`aspect-square rounded-[4px] border-2 bg-grayDark cursor-pointer transition-all overflow-hidden
                      ${selectedImageIndex === i ? 'border-primary' : 'border-grayMedium hover:border-grayLight'}`}
                  >
                     <img src={img} alt={`${product.name} - ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
               ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:col-span-5">
          <div className="mb-4 flex items-center gap-3">
             <Badge variant="default" className="bg-grayMedium text-white border border-grayLight/20">{product.brand}</Badge>
             <span className="text-xs font-mono text-grayLight uppercase">Cód: {product.code}</span>
          </div>

          <h1 className="mb-6 text-4xl font-heading text-white uppercase leading-tight">{product.name}</h1>

          <div className="mb-8 flex flex-col gap-2 border-l-4 border-primary pl-6 bg-grayDark/30 py-4 rounded-r-lg">
            {product.originalPrice && (
              <span className="text-sm text-grayLight line-through">
                De: {formatCurrency(product.originalPrice)}
              </span>
            )}
            <div className="flex items-baseline gap-3">
                <span className="text-5xl font-heading text-primary">
                {formatCurrency(product.price)}
                </span>
                <span className="text-sm font-bold text-success uppercase tracking-wider">10% OFF no PIX</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-8 space-y-4 bg-grayDark p-6 rounded-[6px] border border-grayMedium">
             <div className="flex items-center gap-2 text-sm text-success mb-4">
                <CheckCircle size={16} />
                <span className="font-bold uppercase tracking-wide">Disponível em estoque ({product.stock} un.)</span>
             </div>

             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center rounded-[4px] border border-grayMedium bg-blackCarbon shrink-0">
                   <button 
                      className="p-3 hover:bg-grayMedium text-grayLight hover:text-white disabled:opacity-50"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      disabled={qty <= 1}
                   >
                      <Minus size={16} />
                   </button>
                   <span className="w-12 text-center font-mono font-bold text-white">{qty}</span>
                   <button 
                      className="p-3 hover:bg-grayMedium text-grayLight hover:text-white"
                      onClick={() => setQty(qty + 1)}
                   >
                      <Plus size={16} />
                   </button>
                </div>
                <Button size="lg" className="w-full sm:flex-1 gap-2 h-12 text-sm sm:text-base whitespace-nowrap" onClick={handleAddToCart}>
                   <ShoppingCart size={18} /> Adicionar ao Carrinho
                </Button>
             </div>
          </div>

          {/* Shipping Simulator */}
          <div className="mb-10">
             <label className="text-xs font-bold text-grayLight uppercase tracking-wider mb-2 block">Simular Frete</label>
             <div className="flex gap-2">
                <div className="relative flex-1">
                   <input 
                      type="text" 
                      placeholder="00000-000" 
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      className="w-full h-10 rounded-[4px] border border-grayMedium bg-grayDark px-3 py-2 pl-9 text-sm text-white focus:border-primary focus:outline-none"
                   />
                   <Truck className="absolute left-2.5 top-2.5 text-grayLight" size={16} />
                </div>
                <Button variant="secondary" size="md">Calcular</Button>
             </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
             <div>
                <h3 className="mb-3 text-xl font-heading text-white uppercase border-b border-grayMedium pb-2">Descrição</h3>
                <p className="text-grayLight leading-relaxed text-sm">{product.description}</p>
             </div>

             <div>
                <h3 className="mb-3 text-xl font-heading text-white uppercase border-b border-grayMedium pb-2">Ficha Técnica</h3>
                <div className="overflow-hidden rounded-[4px] border border-grayMedium">
                   <table className="w-full text-sm text-left">
                      <tbody>
                         {Object.entries(product.specs).map(([key, value], idx) => (
                            <tr key={key} className={idx % 2 === 0 ? 'bg-grayDark' : 'bg-blackCarbon'}>
                               <td className="px-4 py-3 font-bold text-grayLight uppercase text-xs tracking-wide border-r border-grayMedium/50 w-1/3">{key}</td>
                               <td className="px-4 py-3 text-white">{value}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>

             <div>
                <h3 className="mb-3 text-xl font-heading text-white uppercase border-b border-grayMedium pb-2">Compatibilidade</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                   {product.compatibility.map((car) => (
                      <li key={car} className="flex items-center gap-2 text-sm text-grayLight bg-grayDark px-3 py-2 rounded-[4px] border border-grayMedium/50">
                         <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                         {car}
                      </li>
                   ))}
                </ul>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};