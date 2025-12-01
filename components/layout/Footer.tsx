
import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { IMAGES } from '../../assets/images';
import { Link } from 'react-router-dom';

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
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-heading text-white uppercase tracking-wide">Institucional</h3>
            <ul className="space-y-3 font-subheading text-lg tracking-wide text-grayLight/80">
              <li><Link to="/institutional/sobre" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link to="/institutional/trocas" className="hover:text-primary transition-colors">Política de Trocas</Link></li>
              <li><Link to="/institutional/privacidade" className="hover:text-primary transition-colors">Privacidade</Link></li>
              <li><Link to="/institutional/contato" className="hover:text-primary transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-heading text-white uppercase tracking-wide">Contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <div className="p-2 rounded bg-grayDark text-primary"><Phone size={16} /></div>
                <span>(55) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded bg-grayDark text-primary"><Mail size={16} /></div>
                <span>vendas@coronelbarros.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 rounded bg-grayDark text-primary shrink-0"><MapPin size={16} /></div>
                <span>Rua da Sucata, 500 - Industrial<br />Coronel Barros - RS</span>
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
               <div className="h-8 w-12 rounded-[4px] bg-grayDark border border-grayMedium" title="Visa"></div>
               <div className="h-8 w-12 rounded-[4px] bg-grayDark border border-grayMedium" title="Mastercard"></div>
               <div className="h-8 w-12 rounded-[4px] bg-grayDark border border-grayMedium flex items-center justify-center text-[10px] font-bold text-grayLight">PIX</div>
               <div className="h-8 w-12 rounded-[4px] bg-grayDark border border-grayMedium" title="Boleto"></div>
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
