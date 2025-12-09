import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Recycle, 
  Award, 
  Users, 
  Truck, 
  FileText,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react';
import { CONTACT, BUSINESS_HOURS } from '../../constants/contact';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-blackCarbon min-h-screen">
      {/* Hero */}
      <section className="bg-grayDark border-b border-grayMedium py-16">
        <div className="container mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-grayLight hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Voltar
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading text-white uppercase mb-4">
            Sobre <span className="text-primary">Nós</span>
          </h1>
          <p className="text-xl text-grayLight max-w-2xl">
            Conheça a história e os valores da Autodemolidora Coronel Barros, 
            sua referência em peças automotivas com procedência e garantia.
          </p>
        </div>
      </section>

      {/* História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-bold uppercase text-sm tracking-widest mb-2 block">Nossa História</span>
              <h2 className="text-3xl font-heading text-white uppercase mb-6">
                Tradição e Confiança no Mercado Automotivo
              </h2>
              <div className="space-y-4 text-grayLight leading-relaxed">
                <p>
                  A <strong className="text-white">Autodemolidora Coronel Barros</strong> nasceu da paixão pelo 
                  universo automotivo e da necessidade de oferecer peças de qualidade com preços justos 
                  para a região noroeste do Rio Grande do Sul.
                </p>
                <p>
                  Localizada estrategicamente na BR-285, em Coronel Barros/RS, nossa empresa se consolidou 
                  como referência no segmento de desmonte sustentável e comercialização de peças usadas 
                  originais e novas.
                </p>
                <p>
                  Trabalhamos com veículos provenientes de leilões e seguradoras, garantindo total 
                  rastreabilidade e procedência legal de todas as peças comercializadas.
                </p>
              </div>
            </div>
            <div className="bg-grayDark rounded-lg border border-grayMedium p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="text-4xl font-heading text-primary mb-2">500+</div>
                  <div className="text-sm text-grayLight uppercase tracking-wide">Veículos Desmontados</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-heading text-primary mb-2">10k+</div>
                  <div className="text-sm text-grayLight uppercase tracking-wide">Peças em Estoque</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-heading text-primary mb-2">3k+</div>
                  <div className="text-sm text-grayLight uppercase tracking-wide">Clientes Atendidos</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-heading text-primary mb-2">100%</div>
                  <div className="text-sm text-grayLight uppercase tracking-wide">Procedência Legal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-grayDark/30 border-y border-grayMedium">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-bold uppercase text-sm tracking-widest mb-2 block">Por que nos escolher</span>
            <h2 className="text-3xl font-heading text-white uppercase">
              Nossos Diferenciais
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-grayDark rounded-lg border border-grayMedium p-6 hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading text-white uppercase mb-3">Garantia de 3 Meses</h3>
              <p className="text-grayLight text-sm leading-relaxed">
                Todas as peças usadas passam por rigorosa inspeção e possuem garantia de funcionamento 
                de 3 meses, assegurando sua tranquilidade na compra.
              </p>
            </div>

            <div className="bg-grayDark rounded-lg border border-grayMedium p-6 hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <FileText size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading text-white uppercase mb-3">Nota Fiscal & Baixa</h3>
              <p className="text-grayLight text-sm leading-relaxed">
                Emitimos Nota Fiscal Eletrônica em todas as vendas. Peças de motor e câmbio acompanham 
                documento de baixa do DETRAN para regularização.
              </p>
            </div>

            <div className="bg-grayDark rounded-lg border border-grayMedium p-6 hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Recycle size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading text-white uppercase mb-3">Desmonte Sustentável</h3>
              <p className="text-grayLight text-sm leading-relaxed">
                Seguimos todas as normas ambientais da Lei do Desmanche. Fluidos são descartados 
                corretamente e materiais são reciclados de forma responsável.
              </p>
            </div>

            <div className="bg-grayDark rounded-lg border border-grayMedium p-6 hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Truck size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading text-white uppercase mb-3">Envio para Todo Brasil</h3>
              <p className="text-grayLight text-sm leading-relaxed">
                Despachamos para todo o território nacional via transportadora com seguro de carga. 
                Embalagem reforçada para peças sensíveis.
              </p>
            </div>

            <div className="bg-grayDark rounded-lg border border-grayMedium p-6 hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Users size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading text-white uppercase mb-3">Atendimento Especializado</h3>
              <p className="text-grayLight text-sm leading-relaxed">
                Nossa equipe é formada por profissionais com experiência no ramo automotivo, 
                prontos para ajudar na identificação da peça correta.
              </p>
            </div>

            <div className="bg-grayDark rounded-lg border border-grayMedium p-6 hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Award size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading text-white uppercase mb-3">Credenciamento DETRAN</h3>
              <p className="text-grayLight text-sm leading-relaxed">
                Somos empresa credenciada pelo DETRAN-RS para atividade de desmonte de veículos, 
                operando dentro de todas as exigências legais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Localização e Horários */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Localização */}
            <div>
              <span className="text-primary font-bold uppercase text-sm tracking-widest mb-2 block">Onde Estamos</span>
              <h2 className="text-3xl font-heading text-white uppercase mb-6">
                Nossa Localização
              </h2>
              <div className="bg-grayDark rounded-lg border border-grayMedium p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{CONTACT.companyName}</h3>
                    <p className="text-grayLight">{CONTACT.address}</p>
                    <p className="text-grayLight">{CONTACT.city} - CEP: {CONTACT.cep}</p>
                    <a 
                      href={CONTACT.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline mt-3 text-sm font-bold"
                    >
                      Ver no Google Maps →
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Mapa */}
              <div className="rounded-lg overflow-hidden border border-grayMedium h-64">
                <iframe
                  src={CONTACT.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Autodemolidora Coronel Barros"
                ></iframe>
              </div>
            </div>

            {/* Horários */}
            <div>
              <span className="text-primary font-bold uppercase text-sm tracking-widest mb-2 block">Atendimento</span>
              <h2 className="text-3xl font-heading text-white uppercase mb-6">
                Horário de Funcionamento
              </h2>
              <div className="bg-grayDark rounded-lg border border-grayMedium overflow-hidden">
                {BUSINESS_HOURS.map((schedule, index) => (
                  <div 
                    key={schedule.day}
                    className={`flex items-center justify-between p-4 ${
                      index !== BUSINESS_HOURS.length - 1 ? 'border-b border-grayMedium' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={16} className={schedule.isOpen ? 'text-primary' : 'text-grayLight/50'} />
                      <span className={schedule.isOpen ? 'text-white' : 'text-grayLight/50'}>
                        {schedule.day}
                      </span>
                    </div>
                    <span className={`text-sm font-mono ${
                      schedule.isOpen ? 'text-grayLight' : 'text-red-500'
                    }`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm mb-1">Atendimento via WhatsApp</p>
                    <p className="text-grayLight text-xs">
                      Fora do horário comercial, deixe sua mensagem no WhatsApp que 
                      retornaremos assim que possível.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading text-white uppercase mb-4">
            Precisa de uma peça?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Entre em contato conosco pelo WhatsApp ou visite nossa loja. 
            Teremos prazer em ajudá-lo a encontrar a peça certa para seu veículo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded bg-white text-blackCarbon font-bold hover:bg-grayLight transition-colors"
            >
              Falar no WhatsApp
            </a>
            <Link
              to="/category/all"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded border-2 border-white text-white font-bold hover:bg-white hover:text-blackCarbon transition-colors"
            >
              Ver Catálogo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
