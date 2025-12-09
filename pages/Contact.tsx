import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Instagram, 
  Facebook,
  Send,
  CheckCircle,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CONTACT, BUSINESS_HOURS, isOpenNow, getWhatsAppLink } from '../constants/contact';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const openStatus = isOpenNow();
  const today = new Date().getDay();
  const dayMap = [6, 0, 1, 2, 3, 4, 5];
  const todayIndex = dayMap[today];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Criar mensagem para WhatsApp
    const message = `*Nova Mensagem do Site*

*Nome:* ${formData.name}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Assunto:* ${formData.subject}

*Mensagem:*
${formData.message}`;

    // Abrir WhatsApp com a mensagem
    setTimeout(() => {
      window.open(getWhatsAppLink(message), '_blank');
      setSending(false);
      setSent(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => setSent(false), 5000);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-blackCarbon">
      {/* Hero Section */}
      <section className="relative bg-grayDark border-b border-grayMedium py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading text-white uppercase mb-4">
              Entre em <span className="text-primary">Contato</span>
            </h1>
            <p className="text-xl text-grayLight">
              Estamos prontos para atender você. Tire suas dúvidas, faça orçamentos ou venha nos visitar.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              
              {/* Status Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                openStatus.isOpen 
                  ? 'bg-success/20 text-success border border-success/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-success animate-pulse' : 'bg-red-500'}`} />
                {openStatus.message}
              </div>

              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* WhatsApp */}
                <a 
                  href={getWhatsAppLink('Olá! Vim pelo site e gostaria de mais informações.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-grayDark border border-grayMedium rounded-lg p-6 hover:border-primary transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <MessageCircle className="text-primary" size={24} />
                  </div>
                  <h3 className="text-white font-bold mb-1">WhatsApp</h3>
                  <p className="text-grayLight text-sm">{CONTACT.whatsappFormatted}</p>
                  <span className="text-primary text-xs mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Iniciar conversa <ExternalLink size={12} />
                  </span>
                </a>

                {/* Email */}
                <a 
                  href={`mailto:${CONTACT.email}`}
                  className="group bg-grayDark border border-grayMedium rounded-lg p-6 hover:border-primary transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <h3 className="text-white font-bold mb-1">E-mail</h3>
                  <p className="text-grayLight text-sm break-all">{CONTACT.email}</p>
                  <span className="text-primary text-xs mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Enviar e-mail <ExternalLink size={12} />
                  </span>
                </a>

                {/* Phone */}
                <a 
                  href={`tel:+${CONTACT.whatsapp}`}
                  className="group bg-grayDark border border-grayMedium rounded-lg p-6 hover:border-primary transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <h3 className="text-white font-bold mb-1">Telefone</h3>
                  <p className="text-grayLight text-sm">{CONTACT.whatsappFormatted}</p>
                  <span className="text-primary text-xs mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ligar agora <ExternalLink size={12} />
                  </span>
                </a>

                {/* Address */}
                <a 
                  href={CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-grayDark border border-grayMedium rounded-lg p-6 hover:border-primary transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <h3 className="text-white font-bold mb-1">Endereço</h3>
                  <p className="text-grayLight text-sm">{CONTACT.address}</p>
                  <p className="text-grayLight text-sm">{CONTACT.city}</p>
                  <span className="text-primary text-xs mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver no mapa <ExternalLink size={12} />
                  </span>
                </a>
              </div>

              {/* Business Hours */}
              <div className="bg-grayDark border border-grayMedium rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <h3 className="text-lg font-heading text-white uppercase">Horário de Funcionamento</h3>
                </div>
                
                <div className="space-y-3">
                  {BUSINESS_HOURS.map((schedule, index) => (
                    <div 
                      key={schedule.day}
                      className={`flex items-center justify-between py-2 px-3 rounded ${
                        index === todayIndex 
                          ? 'bg-primary/10 border border-primary/30' 
                          : ''
                      }`}
                    >
                      <span className={`font-medium ${
                        index === todayIndex ? 'text-primary' : 'text-white'
                      }`}>
                        {schedule.day}
                        {index === todayIndex && (
                          <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded">Hoje</span>
                        )}
                      </span>
                      <span className={schedule.isOpen ? 'text-grayLight' : 'text-red-400'}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-grayDark border border-grayMedium rounded-lg p-6">
                <h3 className="text-lg font-heading text-white uppercase mb-4">Redes Sociais</h3>
                <div className="flex gap-4">
                  <a 
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-blackCarbon border border-grayMedium rounded-lg hover:border-primary transition-colors group"
                  >
                    <Instagram className="text-grayLight group-hover:text-primary transition-colors" size={24} />
                    <span className="text-grayLight group-hover:text-white transition-colors">Instagram</span>
                  </a>
                  <a 
                    href={CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-blackCarbon border border-grayMedium rounded-lg hover:border-primary transition-colors group"
                  >
                    <Facebook className="text-grayLight group-hover:text-primary transition-colors" size={24} />
                    <span className="text-grayLight group-hover:text-white transition-colors">Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Form & Map */}
            <div className="space-y-8">
              
              {/* Contact Form */}
              <div className="bg-grayDark border border-grayMedium rounded-lg p-6">
                <h3 className="text-lg font-heading text-white uppercase mb-6">Envie sua Mensagem</h3>
                
                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle className="mx-auto text-success mb-4" size={48} />
                    <h4 className="text-xl text-white font-bold mb-2">Mensagem Enviada!</h4>
                    <p className="text-grayLight">Você será redirecionado para o WhatsApp para finalizar o envio.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-grayLight uppercase mb-2">Nome *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-blackCarbon border border-grayMedium text-white rounded-lg p-3 focus:border-primary outline-none transition-colors"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-grayLight uppercase mb-2">Telefone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-blackCarbon border border-grayMedium text-white rounded-lg p-3 focus:border-primary outline-none transition-colors"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-grayLight uppercase mb-2">E-mail</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-blackCarbon border border-grayMedium text-white rounded-lg p-3 focus:border-primary outline-none transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-grayLight uppercase mb-2">Assunto *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-blackCarbon border border-grayMedium text-white rounded-lg p-3 focus:border-primary outline-none transition-colors"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="Orçamento de Peça">Orçamento de Peça</option>
                        <option value="Disponibilidade de Peça">Disponibilidade de Peça</option>
                        <option value="Venda de Veículo">Venda de Veículo para Desmonte</option>
                        <option value="Dúvidas">Dúvidas Gerais</option>
                        <option value="Reclamação">Reclamação</option>
                        <option value="Outro">Outro Assunto</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-grayLight uppercase mb-2">Mensagem *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-blackCarbon border border-grayMedium text-white rounded-lg p-3 focus:border-primary outline-none transition-colors resize-none"
                        placeholder="Descreva sua necessidade..."
                      />
                    </div>

                    <Button type="submit" className="w-full gap-2" disabled={sending}>
                      {sending ? (
                        <>Enviando...</>
                      ) : (
                        <>
                          <Send size={18} />
                          Enviar via WhatsApp
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-grayLight/60 text-center">
                      Ao enviar, você será redirecionado para o WhatsApp para finalizar a mensagem.
                    </p>
                  </form>
                )}
              </div>

              {/* Map */}
              <div className="bg-grayDark border border-grayMedium rounded-lg overflow-hidden">
                <div className="p-4 border-b border-grayMedium flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Navigation className="text-primary" size={20} />
                    <h3 className="font-heading text-white uppercase">Nossa Localização</h3>
                  </div>
                  <a 
                    href={CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm flex items-center gap-1 hover:underline"
                  >
                    Abrir no Google Maps <ExternalLink size={14} />
                  </a>
                </div>
                
                {/* Google Maps Embed */}
                <div className="relative h-[400px] bg-blackCarbon">
                  <iframe
                    src="https://maps.google.com/maps?q=CDV+Auto+Demolidora+Coronel+Barros&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="CDV Auto Demolidora Coronel Barros"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Address Footer */}
                <div className="p-4 bg-blackCarbon/50">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-white font-medium">{CONTACT.fullAddress}</p>
                      <p className="text-grayLight text-sm mt-1">
                        Localizado na BR-285, fácil acesso para toda a região.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-grayDark border-t border-grayMedium">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading text-white uppercase mb-4">
            Precisa de uma peça específica?
          </h2>
          <p className="text-grayLight mb-6 max-w-xl mx-auto">
            Entre em contato conosco pelo WhatsApp e consulte a disponibilidade. 
            Temos o maior acervo de peças da região!
          </p>
          <a
            href={getWhatsAppLink('Olá! Estou procurando uma peça específica. Podem me ajudar?')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="gap-2">
              <MessageCircle size={20} />
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};
