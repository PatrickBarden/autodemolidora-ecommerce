
import React, { useState, useEffect } from 'react';
import { ArrowRight, Truck, ShieldCheck, Headphones, Settings, Star, Zap, Clock, CheckCircle, MessageCircle, ChevronLeft, ChevronRight, Recycle, MapPin } from 'lucide-react';
import { PageRoute } from '../types';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { IMAGES } from '../assets/images';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

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

// Dados dos Slides do Hero
const HERO_SLIDES = [
  {
    id: 1,
    image: IMAGES.hero.engine,
    tag: { icon: Zap, text: 'Peças com Baixa no Detran' },
    titlePrefix: 'O',
    titleHighlight: 'coração',
    titleSuffix: 'da sua máquina está aqui',
    description: 'Maior acervo de peças usadas originais e novas da região. Motores, câmbios e lataria com garantia e procedência legal.',
    ctaPrimary: 'Buscar Peça Agora',
    ctaSecondary: 'Falar no WhatsApp',
    linkSlug: 'motor'
  },
  {
    id: 2,
    image: IMAGES.hero.workshop,
    tag: { icon: Recycle, text: 'Desmonte Técnico Sustentável' },
    titlePrefix: 'Peças originais com',
    titleHighlight: 'procedência',
    titleSuffix: 'e rastreabilidade',
    description: 'Somos credenciados pelo Detran. Compramos veículos de leilão e seguradoras para oferecer peças originais com nota fiscal.',
    ctaPrimary: 'Ver Estoque',
    ctaSecondary: 'Conheça a Empresa',
    linkSlug: 'all'
  },
  {
    id: 3,
    image: IMAGES.hero.logistics,
    tag: { icon: MapPin, text: 'Envio para todo o Brasil' },
    titlePrefix: 'Sua encomenda chega',
    titleHighlight: 'rápido',
    titleSuffix: 'onde você estiver',
    description: 'Logística eficiente via transportadora com seguro de carga. Embalagem reforçada para lataria, vidros e componentes sensíveis.',
    ctaPrimary: 'Simular Frete',
    ctaSecondary: 'Atendimento Online',
    linkSlug: 'lataria'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const promoProducts = MOCK_PRODUCTS.filter(p => p.originalPrice);
  const featuredProducts = MOCK_PRODUCTS.filter(p => !p.originalPrice).slice(0, 4);

  // Auto-play do carrossel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // 6 segundos por slide
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));

  return (
    <div className="space-y-0 pb-0 bg-blackCarbon">
      
      {/* Hero Banner Carousel */}
      <section className="relative bg-grayDark border-b border-grayMedium overflow-hidden min-h-[600px] flex items-center group">
        
        {/* Slides Backgrounds & Content */}
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 transition-transform duration-[10000ms] ease-linear scale-105"
              style={{ 
                backgroundImage: `url('${slide.image}')`,
                transform: index === currentSlide ? 'scale(110)' : 'scale(100)' // Efeito Ken Burns sutil
              }} 
            ></div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blackCarbon via-blackCarbon/90 to-transparent"></div>

            {/* Content Container */}
            <div className="container mx-auto px-4 h-full flex items-center relative z-20">
              <div className={`max-w-3xl space-y-8 transition-all duration-700 delay-200 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                
                {/* Tag */}
                <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary rounded-full backdrop-blur-sm">
                  <slide.tag.icon size={14} fill="currentColor" /> {slide.tag.text}
                </div>
                
                {/* Title */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading text-white uppercase leading-[0.9] tracking-wide drop-shadow-lg">
                  {slide.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-500">{slide.titleHighlight}</span> {slide.titleSuffix}
                </h1>
                
                {/* Description */}
                <p className="text-lg text-grayLight md:text-xl max-w-xl leading-relaxed font-light border-l-4 border-primary pl-6">
                  {slide.description}
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="h-14 px-8 text-lg" onClick={() => onNavigate({ name: 'category', slug: slide.linkSlug })}>
                    {slide.ctaPrimary}
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-grayLight/30 text-white hover:bg-white hover:text-blackCarbon" onClick={() => onNavigate({ name: 'institutional', slug: 'contato' })}>
                    {slide.ctaSecondary}
                  </Button>
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
          {HERO_SLIDES.map((_, idx) => (
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

      {/* Brands Marquee */}
      <section className="border-b border-grayMedium bg-grayDark py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-grayLight/40 mb-6">Trabalhamos com as principais marcas</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            {BRANDS.map((brand) => (
              <span key={brand} className="text-2xl font-heading uppercase text-white cursor-default hover:text-primary transition-colors">
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

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 flex items-center justify-between border-b border-grayMedium pb-4">
          <h2 className="text-3xl font-heading text-white uppercase tracking-wide">
            Busque por <span className="text-primary">Categoria</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate({ name: 'category', slug: cat.id })}
              className="group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-[6px] border border-grayMedium bg-grayDark p-8 transition-all hover:border-primary hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blackCarbon/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-grayMedium text-grayLight transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <Settings size={32} strokeWidth={1.5} />
              </div>
              <span className="relative z-10 font-subheading text-xl tracking-wide text-grayLight group-hover:text-white uppercase">{cat.name}</span>
            </button>
          ))}
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
               <Button variant="secondary" size="lg" className="bg-blackCarbon text-white border-transparent hover:bg-black hover:text-white" onClick={() => onNavigate({ name: 'category', slug: 'lataria' })}>
                  Ver Itens da Promoção
               </Button>
            </div>
         </div>
      </section>

      {/* Offers / Promo Products */}
      {promoProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-10 flex items-end justify-between border-b border-grayMedium pb-4">
            <div>
              <span className="block text-success font-bold uppercase text-xs tracking-widest mb-1 flex items-center gap-1"><Clock size={12} /> Tempo Limitado</span>
              <h2 className="text-3xl font-heading text-white uppercase">Ofertas Especiais</h2>
            </div>
            <button 
              className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-grayLight hover:text-primary transition-colors"
              onClick={() => onNavigate({ name: 'category', slug: 'all' })}
            >
              Ver todas as ofertas <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {promoProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => onNavigate({ name: 'product', id: product.id })}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="bg-grayDark/30 py-16 border-y border-grayMedium">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between border-b border-grayMedium pb-4">
             <div>
                <span className="block text-primary font-bold uppercase text-xs tracking-widest mb-1">Recém chegados</span>
                <h2 className="text-3xl font-heading text-white uppercase">Destaques do Pátio</h2>
             </div>
             <button 
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-grayLight hover:text-primary transition-colors"
                onClick={() => onNavigate({ name: 'category', slug: 'all' })}
             >
               Estoque Completo <ArrowRight size={16} />
             </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => onNavigate({ name: 'product', id: product.id })}
              />
            ))}
          </div>
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
                  className="flex-1 h-12 rounded-[4px] border-none px-4 text-blackCarbon font-bold focus:ring-2 focus:ring-blackCarbon"
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
