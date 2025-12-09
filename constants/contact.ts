// Dados de contato da empresa - Autodemolidora Coronel Barros
export const CONTACT = {
  whatsapp: '5555984069184', // 55 (Brasil) + 55 (DDD RS) + 984069184
  whatsappFormatted: '(55) 98406-9184',
  email: 'demolidoracb@hotmail.com',
  facebook: 'https://www.facebook.com/autodemolidora.coronelbarros/',
  instagram: 'https://www.instagram.com/coronelbarrosautodemolidora/',
  address: 'BR-285, KM 480 - Centro',
  city: 'Cel. Barros - RS',
  cep: '98735-000',
  fullAddress: 'BR-285, KM 480 - Centro, Cel. Barros - RS, 98735-000',
  companyName: 'Autodemolidora Coronel Barros',
  // Coordenadas para o mapa (Coronel Barros, RS)
  coordinates: {
    lat: -28.3847,
    lng: -54.0669
  },
  googleMapsUrl: 'https://www.google.com/maps/search/CDV+Auto+Demolidora+Coronel+Barros',
  googleMapsEmbed: 'https://maps.google.com/maps?q=CDV+Auto+Demolidora+Coronel+Barros&t=&z=16&ie=UTF8&iwloc=&output=embed'
};

// Horários de funcionamento
export const BUSINESS_HOURS = [
  { day: 'Segunda-feira', hours: '08:00–12:00, 13:30–18:00', isOpen: true },
  { day: 'Terça-feira', hours: '08:00–12:00, 13:30–18:00', isOpen: true },
  { day: 'Quarta-feira', hours: '08:00–12:00, 13:30–18:00', isOpen: true },
  { day: 'Quinta-feira', hours: '08:00–12:00, 13:30–18:00', isOpen: true },
  { day: 'Sexta-feira', hours: '08:00–12:00, 13:30–18:00', isOpen: true },
  { day: 'Sábado', hours: '08:00–12:00', isOpen: true },
  { day: 'Domingo', hours: 'Fechado', isOpen: false },
];

// Função para verificar se está aberto agora
export const isOpenNow = (): { isOpen: boolean; message: string } => {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 = Domingo
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  // Mapear dia da semana para nosso array (nosso array começa em Segunda)
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Dom=6, Seg=0, Ter=1...
  const todaySchedule = BUSINESS_HOURS[dayMap[dayIndex]];

  if (!todaySchedule.isOpen) {
    return { isOpen: false, message: 'Fechado hoje' };
  }

  // Verificar horários (08:00-12:00 e 13:30-18:00)
  const morningStart = 8 * 60; // 08:00
  const morningEnd = 12 * 60; // 12:00
  const afternoonStart = 13 * 60 + 30; // 13:30
  const afternoonEnd = 18 * 60; // 18:00

  if (dayIndex === 6) { // Sábado - só manhã
    if (currentTime >= morningStart && currentTime < morningEnd) {
      return { isOpen: true, message: 'Aberto agora' };
    }
  } else if (dayIndex !== 0) { // Dias úteis
    if ((currentTime >= morningStart && currentTime < morningEnd) ||
        (currentTime >= afternoonStart && currentTime < afternoonEnd)) {
      return { isOpen: true, message: 'Aberto agora' };
    }
  }

  return { isOpen: false, message: 'Fechado agora' };
};

// Função para gerar link do WhatsApp com mensagem
export const getWhatsAppLink = (message?: string) => {
  const baseUrl = `https://wa.me/${CONTACT.whatsapp}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
};
