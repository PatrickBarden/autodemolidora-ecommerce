import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Truck, ShieldCheck, Headphones, Settings, Star, Zap, Clock, CheckCircle, MessageCircle, ChevronLeft, ChevronRight, Recycle, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, STORE_PHONE } from '../constants';
import { useProducts } from '../hooks/useProducts';
import { useHeroSlides, HeroSlide } from '../hooks/useHeroSlides';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { IMAGES } from '../assets/images';
import { Product } from '../types';

// Componente de Carrossel de Produtos
const ProductCarouselSection: React.FC<{
  products: Product[];
  onProductClick: (id: string) => void;
}> = ({ products, onProductClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll Buttons - Desktop */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blackCarbon/90 text-white border border-grayMedium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:border-primary hidden md:flex items-center justify-center -ml-4"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blackCarbon/90 text-white border border-grayMedium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:border-primary hidden md:flex items-center justify-center -mr-4"
      >
        <ChevronRight size={24} />
      </button>

      {/* Products Container - Horizontal scroll on mobile, grid on desktop */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[260px] snap-start md:w-auto"
          >
            <ProductCard
              product={product}
              onClick={() => onProductClick(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const BRANDS = ['Volkswagen', 'Chevrolet', 'Fiat', 'Ford', 'Toyota', 'Honda', 'Hyundai', 'Renault'];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Mecânico - Oficina Silva",
    text: "Comprei um motor AP 1.8 completo e chegou em perfeito estado. A nota fiscal de baixa facilitou muito a regularização. Recomendo!",
    stars: 5
  },
  {
    id: 2,
    name: "Roberto Almeida",
    role: "Cliente Particular",
    text: "Precisava de uma porta pro meu Honda Fit e achei aqui com a mesma cor do meu carro. Economizei muito na pintura.",
    stars: 5
  },
  {
    id: 3,
    name: "Fernanda Costa",
    role: "Auto Center Top Gear",
    text: "Parceria de anos. Sempre que preciso de peças de acabamento ou módulos eletrônicos, a Coronel Barros é a primeira que procuro.",
    stars: 4
  }
];

// Slides de fallback (usados quando não há slides no banco)
const FALLBACK_SLIDES: HeroSlide[] = [
  {
    id: 'fallback-1',
    order: 0,
    is_active: true,
    background_image: IMAGES.hero.engine,
    tag_text: 'Peças com Baixa no Detran',
    title_prefix: 'O',
    title_highlight: 'coração',
    title_suffix: 'da sua máquina está aqui',
    description: 'Maior acervo de peças usadas originais e novas da região. Motores, câmbios e lataria com garantia e procedência legal.',
    button_primary_text: 'Buscar Peça Agora',
    button_primary_link: '/category/motor',
    button_secondary_text: 'Falar no WhatsApp',
    button_secondary_link: ''
  },
  {
    id: 'fallback-2',
    order: 1,
    is_active: true,
    background_image: IMAGES.hero.workshop,
    tag_text: 'Desmonte Técnico Sustentável',
    title_prefix: 'Peças originais com',
    title_highlight: 'procedência',
    title_suffix: 'e rastreabilidade',
    description: 'Somos credenciados pelo Detran. Compramos veículos de leilão e seguradoras para oferecer peças originais com nota fiscal.',
    button_primary_text: 'Ver Estoque',
    button_primary_link: '/category/all',
    button_secondary_text: 'Conheça a Empresa',
    button_secondary_link: ''
  },
  {
    id: 'fallback-3',
    order: 2,
    is_active: true,
    background_image: IMAGES.hero.logistics,
    tag_text: 'Envio para todo o Brasil',
    title_prefix: 'Sua encomenda chega',
    title_highlight: 'rápido',
    title_suffix: 'onde você estiver',
    description: 'Logística eficiente via transportadora com seguro de carga. Embalagem reforçada para lataria, vidros e componentes sensíveis.',
    button_primary_text: 'Simular Frete',
    button_primary_link: '/category/lataria',
    button_secondary_text: 'Atendimento Online',
    button_secondary_link: ''
  }
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products, loading } = useProducts();
  const { slides: dbSlides, loading: slidesLoading } = useHeroSlides();
  
  // Usar slides do banco ou fallback
  const heroSlides = dbSlides.length > 0 ? dbSlides : FALLBACK_SLIDES;
  
  const promoProducts = products.filter(p => p.originalPrice);
  const featuredProducts = products.filter(p => !p.originalPrice).slice(0, 4);

  // Auto-play do carrossel
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // 6 segundos por slide
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  return (
    <div className="space-y-0 pb-0 bg-blackCarbon">
      
      {/* Hero Banner Carousel */}
      <section className="relative bg-blackCarbon border-b border-grayMedium overflow-hidden h-[600px] md:h-[700px] flex items-center group">
        
        {/* Slides Backgrounds & Content */}
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Background Image - cover em todos os dispositivos */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear"
              style={{ 
                backgroundImage: `url('${slide.background_image}')`,
                transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)'
              }} 
            ></div>
            
            {/* Overlay escuro para legibilidade do texto */}
            <div className="absolute inset-0 bg-blackCarbon/50"></div>

            {/* Content Container */}
            <div className="container mx-auto px-4 h-full flex items-center relative z-20">
              <div className={`max-w-3xl space-y-8 transition-all duration-700 delay-200 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                
                {/* Tag */}
                {slide.tag_text && (
                  <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary rounded-full backdrop-blur-sm">
                    <Zap size={14} fill="currentColor" /> {slide.tag_text}
                  </div>
                )}
                
                {/* Title */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading text-white uppercase leading-[0.9] tracking-wide drop-shadow-lg">
                  {slide.title_prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-500">{slide.title_highlight}</span> {slide.title_suffix}
                </h1>
                
                {/* Description */}
                <p className="text-lg text-grayLight md:text-xl max-w-xl leading-relaxed font-light border-l-4 border-primary pl-6">
                  {slide.description}
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {slide.button_primary_text && (
                    <Button size="lg" className="h-14 px-8 text-lg" onClick={() => navigate(slide.button_primary_link || '/')}>
                      {slide.button_primary_text}
                    </Button>
                  )}
                  {slide.button_secondary_text && (
                    <a 
                      href={`https://wa.me/${STORE_PHONE}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-14 px-8 text-lg rounded border-2 border-grayLight/30 text-white hover:bg-white hover:text-blackCarbon transition-colors font-bold"
                    >
                      <MessageCircle size={20} />
                      {slide.button_secondary_text}
                    </a>
                  )}
                </div>

                {/* Features Footer (Static for all slides or dynamic if needed) */}
                <div className="flex items-center gap-6 text-grayLight/60 text-sm font-mono pt-4">
                  <span className="flex items-center gap-2"><CheckCircle size={14} className="text-success" /> Nota Fiscal</span>
                  <span className="flex items-center gap-2"><CheckCircle size={14} className="text-success" /> Garantia 3 Meses</span>
                  <span className="flex items-center gap-2"><CheckCircle size={14} className="text-success" /> Envio Imediato</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-grayLight/30 hover:bg-grayLight'}`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows (Visible on Hover) */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-blackCarbon/50 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:border-primary hidden md:block"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-blackCarbon/50 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:border-primary hidden md:block"
        >
          <ChevronRight size={24} />
        </button>

      </section>

      {/* Brands Marquee - Infinite Scroll */}
      <section className="border-b border-grayMedium bg-grayDark py-6 overflow-hidden">
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-grayLight/40 mb-4">Trabalhamos com as principais marcas</p>
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <span 
                key={`${brand}-${i}`} 
                className="mx-4 md:mx-8 text-base md:text-xl font-heading uppercase text-grayLight/50 hover:text-primary transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="border-b border-grayMedium bg-blackCarbon py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group flex gap-5 rounded-[6px] border border-transparent p-4 transition-colors hover:border-grayMedium hover:bg-grayDark/30">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-grayDark text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-colors">
                <Truck size={28} />
              </div>
              <div>
                <h3 className="mb-1 font-heading text-xl text-white uppercase tracking-wide">Entrega Expressa</h3>
                <p className="text-sm text-grayLight leading-relaxed">
                  Despachamos para todo o Brasil via transportadora com seguro de carga.
                </p>
              </div>
            </div>
            <div className="group flex gap-5 rounded-[6px] border border-transparent p-4 transition-colors hover:border-grayMedium hover:bg-grayDark/30">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-grayDark text-success shadow-lg group-hover:bg-success group-hover:text-white transition-colors">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="mb-1 font-heading text-xl text-white uppercase tracking-wide">Garantia Total</h3>
                <p className="text-sm text-grayLight leading-relaxed">
                  Todas as peças usadas passam por rigorosos testes e possuem 3 meses de garantia.
                </p>
              </div>
            </div>
            <div className="group flex gap-5 rounded-[6px] border border-transparent p-4 transition-colors hover:border-grayMedium hover:bg-grayDark/30">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-grayDark text-warning shadow-lg group-hover:bg-warning group-hover:text-blackCarbon transition-colors">
                <Headphones size={28} />
              </div>
              <div>
                <h3 className="mb-1 font-heading text-xl text-white uppercase tracking-wide">Time de Especialistas</h3>
                <p className="text-sm text-grayLight leading-relaxed">
                  Dúvida na compatibilidade? Nossos consultores ajudam você a escolher certo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Centered Grid */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 md:mb-10 flex items-center justify-between border-b border-grayMedium pb-4">
            <h2 className="text-2xl md:text-3xl font-heading text-white uppercase tracking-wide">
              Busque por <span className="text-primary">Categoria</span>
            </h2>
            <span className="text-xs text-grayLight uppercase tracking-wider hidden sm:block">Arraste para ver mais →</span>
          </div>
          
          {/* Categories Grid - Centered */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-2 pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="group flex flex-col items-center justify-center gap-2 md:gap-3 rounded-lg border border-grayMedium bg-grayDark p-4 md:p-6 transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 min-w-[100px] md:min-w-[140px]"
              >
                <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-grayMedium text-grayLight transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <Settings size={20} className="md:hidden" strokeWidth={1.5} />
                  <Settings size={28} className="hidden md:block" strokeWidth={1.5} />
                </div>
                <span className="font-subheading text-xs md:text-sm tracking-wide text-grayLight group-hover:text-white uppercase text-center whitespace-nowrap">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-primaryDark relative overflow-hidden">
         <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-multiply" style={{ backgroundImage: `url('${IMAGES.hero.promoBg}')` }}></div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-blackCarbon/30 border border-white/10 text-white text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
               <span className="text-warning mr-2">⚠</span> Oportunidade da Semana
            </div>
            <h2 className="text-4xl md:text-6xl font-heading text-white uppercase mb-6 drop-shadow-lg">
               Queima de Estoque <br/>
               <span className="text-blackCarbon bg-white px-2 transform -skew-x-6 inline-block mt-2">Lataria & Faróis</span>
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 font-light">
               Peças originais com pequenos detalhes estéticos com até <strong className="text-white">40% de desconto</strong>. Ideal para funilaria e pintura.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Button variant="secondary" size="lg" className="bg-blackCarbon text-white border-transparent hover:bg-black hover:text-white" onClick={() => navigate('/category/lataria')}>
                  Ver Itens da Promoção
               </Button>
            </div>
         </div>
      </section>

      {/* Offers / Promo Products */}
      {promoProducts.length > 0 && (
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-6 md:mb-10 flex items-end justify-between border-b border-grayMedium pb-4">
              <div>
                <span className="block text-success font-bold uppercase text-xs tracking-widest mb-1 flex items-center gap-1"><Clock size={12} /> Tempo Limitado</span>
                <h2 className="text-2xl md:text-3xl font-heading text-white uppercase">Ofertas Especiais</h2>
              </div>
              <button 
                className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-grayLight hover:text-primary transition-colors"
                onClick={() => navigate('/category/all')}
              >
                Ver todas <ArrowRight size={16} />
              </button>
            </div>
            <ProductCarouselSection 
              products={promoProducts} 
              onProductClick={(id) => navigate(`/product/${id}`)} 
            />
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="bg-grayDark/30 py-10 md:py-16 border-y border-grayMedium">
        <div className="container mx-auto px-4">
          <div className="mb-6 md:mb-10 flex items-end justify-between border-b border-grayMedium pb-4">
             <div>
                <span className="block text-primary font-bold uppercase text-xs tracking-widest mb-1">Recém chegados</span>
                <h2 className="text-2xl md:text-3xl font-heading text-white uppercase">Destaques do Pátio</h2>
             </div>
             <button 
                className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-grayLight hover:text-primary transition-colors"
                onClick={() => navigate('/category/all')}
             >
               Ver todos <ArrowRight size={16} />
             </button>
          </div>
          <ProductCarouselSection 
            products={featuredProducts} 
            onProductClick={(id) => navigate(`/product/${id}`)} 
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
         <h2 className="text-center text-3xl font-heading text-white uppercase mb-12">
            Quem compra, <span className="text-primary">Recomenda</span>
         </h2>
         <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
               <div key={t.id} className="bg-grayDark p-8 rounded-[6px] border border-grayMedium relative">
                  <div className="text-primary mb-4 absolute -top-4 left-8 bg-grayDark px-2 border border-grayMedium rounded-full">
                     <span className="text-3xl font-heading">“</span>
                  </div>
                  <div className="flex gap-1 text-warning mb-4">
                     {[...Array(t.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-grayLight italic mb-6 leading-relaxed min-h-[80px]">
                     "{t.text}"
                  </p>
                  <div className="border-t border-grayMedium pt-4 flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-grayMedium flex items-center justify-center text-white font-bold font-heading text-lg">
                        {t.name.charAt(0)}
                     </div>
                     <div>
                        <p className="text-white font-bold uppercase text-sm tracking-wide">{t.name}</p>
                        <p className="text-primary text-xs uppercase font-bold tracking-wider">{t.role}</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Newsletter / Lead Gen */}
      <section className="bg-primary text-white py-16 relative overflow-hidden border-t border-white/10">
         <div className="absolute inset-0 bg-blackCarbon opacity-20 pattern-grid-lg"></div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <MessageCircle size={48} className="mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-heading uppercase mb-4">Receba Ofertas no seu WhatsApp</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
               Cadastre seu número e seja o primeiro a saber quando chegar aquele motor ou peça exclusiva que você procura.
            </p>
            <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
               <input 
                  type="text" 
                  placeholder="(00) 99999-9999" 
                  className="flex-1 h-12 rounded-[4px] border-2 border-white/30 bg-white px-4 text-blackCarbon font-bold focus:ring-2 focus:ring-blackCarbon focus:border-blackCarbon"
               />
               <Button variant="secondary" className="h-12 bg-blackCarbon text-white hover:bg-black hover:text-white px-6">
                  Cadastrar
               </Button>
            </form>
            <p className="text-white/50 text-xs mt-4 uppercase tracking-wider">Sem spam. Apenas peças de qualidade.</p>
         </div>
      </section>

    </div>
  );
};
