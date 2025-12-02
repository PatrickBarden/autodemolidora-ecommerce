
import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { IMAGES } from '../../assets/images';
import { Link } from 'react-router-dom';
import { CONTACT } from '../../constants/contact';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blackCarbon text-grayLight border-t border-grayMedium">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img 
                src={IMAGES.logo}
                alt="Autodemolidora Coronel Barros"
                className="h-20 w-auto object-contain mb-3"
              />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block">
                Peças com Procedência
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-grayLight/80">
              Sua referência em peças usadas originais e novas. 
              Desmonte sustentável e garantia de procedência para o seu veículo.
            </p>
            <div className="flex gap-3">
              <a 
                href={`https://wa.me/${CONTACT.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded bg-grayDark border border-grayMedium hover:bg-primary hover:border-primary text-grayLight hover:text-white transition-colors"
                title="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a 
                href={CONTACT.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded bg-grayDark border border-grayMedium hover:bg-primary hover:border-primary text-grayLight hover:text-white transition-colors"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={CONTACT.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded bg-grayDark border border-grayMedium hover:bg-primary hover:border-primary text-grayLight hover:text-white transition-colors"
                title="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-heading text-white uppercase tracking-wide">Institucional</h3>
            <ul className="space-y-3 font-subheading text-lg tracking-wide text-grayLight/80">
              <li><Link to="/institutional/sobre" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link to="/institutional/trocas" className="hover:text-primary transition-colors">Política de Trocas</Link></li>
              <li><Link to="/institutional/privacidade" className="hover:text-primary transition-colors">Privacidade</Link></li>
              <li><Link to="/contato" className="hover:text-primary transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-heading text-white uppercase tracking-wide">Contato</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a 
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <div className="p-2 rounded bg-grayDark text-primary"><Phone size={16} /></div>
                  <span>{CONTACT.whatsappFormatted}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <div className="p-2 rounded bg-grayDark text-primary"><Mail size={16} /></div>
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <Link 
                  to="/contato"
                  className="flex items-start gap-3 hover:text-primary transition-colors"
                >
                  <div className="p-2 rounded bg-grayDark text-primary shrink-0"><MapPin size={16} /></div>
                  <div>
                    <span className="block">{CONTACT.address}</span>
                    <span className="block text-xs text-grayLight/60">{CONTACT.city}, {CONTACT.cep}</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h3 className="mb-6 text-lg font-heading text-white uppercase tracking-wide">Pagamento</h3>
            <p className="mb-4 text-xs text-grayLight/60">
              Pague com segurança via PIX, Boleto ou Cartão. 
              Descontos especiais à vista.
            </p>
            <div className="flex flex-wrap gap-2">
               {/* Visa */}
               <div className="h-8 w-12 rounded-[4px] bg-white flex items-center justify-center" title="Visa">
                 <svg viewBox="0 0 48 48" className="h-5 w-8">
                   <path fill="#1565C0" d="M18.7 13.8l-2.5 14.3h3.2l2.5-14.3h-3.2zm-5.8 0l-3 9.8-.4-1.9-.1-.5-1-5.2c-.2-.8-.7-1.2-1.5-1.2H2.1l-.1.3c1.2.3 2.5.7 3.3 1.2l2.8 10.6h3.3l5.1-13.1h-3.6zm24.6 9.5c0-2.8-1.7-3.8-3.5-4.5-1.1-.5-1.8-.8-1.8-1.3 0-.4.5-.9 1.7-.9 1 0 1.7.2 2.3.4l.3.1.4-2.4c-.6-.2-1.6-.5-2.8-.5-3.1 0-5.2 1.6-5.2 3.9 0 1.7 1.6 2.7 2.8 3.3 1.2.6 1.6 1 1.6 1.5 0 .8-1 1.2-1.9 1.2-1.3 0-2-.2-3-.6l-.4-.2-.4 2.5c.8.3 2.1.6 3.6.6 3.2 0 5.3-1.6 5.3-4.1zm8.5-9.5h-2.4c-.8 0-1.3.2-1.7 1l-4.7 11.3h3.3l.7-1.8h4l.4 1.8h2.9l-2.5-12.3zm-3.8 8c.3-.7 1.3-3.4 1.3-3.4l.3-.8.2.7.8 3.5h-2.6z"/>
                 </svg>
               </div>
               {/* Mastercard */}
               <div className="h-8 w-12 rounded-[4px] bg-white flex items-center justify-center" title="Mastercard">
                 <svg viewBox="0 0 48 48" className="h-5 w-8">
                   <circle cx="17" cy="24" r="10" fill="#EB001B"/>
                   <circle cx="31" cy="24" r="10" fill="#F79E1B"/>
                   <path fill="#FF5F00" d="M24 16.5c2.4 1.9 4 4.8 4 8s-1.6 6.1-4 8c-2.4-1.9-4-4.8-4-8s1.6-6.1 4-8z"/>
                 </svg>
               </div>
               {/* PIX */}
               <div className="h-8 w-12 rounded-[4px] bg-[#32BCAD] flex items-center justify-center" title="PIX">
                 <svg viewBox="0 0 48 48" className="h-5 w-5">
                   <path fill="white" d="M35.2 24l-6.4-6.4c-1.2-1.2-3.2-1.2-4.4 0L18 24l6.4 6.4c1.2 1.2 3.2 1.2 4.4 0L35.2 24zm-11.6 8.8l-8-8 8-8 8 8-8 8z"/>
                 </svg>
               </div>
               {/* Boleto */}
               <div className="h-8 w-12 rounded-[4px] bg-white flex items-center justify-center" title="Boleto">
                 <svg viewBox="0 0 48 48" className="h-5 w-8">
                   <rect x="6" y="12" width="2" height="24" fill="#333"/>
                   <rect x="10" y="12" width="1" height="24" fill="#333"/>
                   <rect x="13" y="12" width="3" height="24" fill="#333"/>
                   <rect x="18" y="12" width="1" height="24" fill="#333"/>
                   <rect x="21" y="12" width="2" height="24" fill="#333"/>
                   <rect x="25" y="12" width="1" height="24" fill="#333"/>
                   <rect x="28" y="12" width="3" height="24" fill="#333"/>
                   <rect x="33" y="12" width="1" height="24" fill="#333"/>
                   <rect x="36" y="12" width="2" height="24" fill="#333"/>
                   <rect x="40" y="12" width="2" height="24" fill="#333"/>
                 </svg>
               </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-grayMedium pt-8 text-center text-xs text-grayLight/40 uppercase tracking-wider">
          &copy; {new Date().getFullYear()} Autodemolidora Coronel Barros. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
