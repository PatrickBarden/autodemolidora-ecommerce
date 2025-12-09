
import { Product } from './types';
import { IMAGES } from './assets/images';

export const STORE_PHONE = "5555984069184"; // WhatsApp Autodemolidora Coronel Barros (55 = Brasil, 55 = DDD RS)

export const CATEGORIES = [
  { id: 'motor', name: 'Motores', icon: 'Engine' },
  { id: 'transmissao', name: 'Caixas de Câmbio', icon: 'Cog' },
  { id: 'lataria', name: 'Lataria & Carroceria', icon: 'Disc' },
  { id: 'suspensao', name: 'Suspensão', icon: 'Activity' },
  { id: 'eletrica', name: 'Elétrica & Módulos', icon: 'Zap' },
  { id: 'interior', name: 'Acabamento Interno', icon: 'Droplet' },
];

export const CATEGORY_DETAILS: Record<string, { title: string; description: string; banner: string; tips: string[] }> = {
  motor: {
    title: 'Motores Completos e Parciais',
    description: 'Motores com baixa no DETRAN e Nota Fiscal para regularização imediata. Testados e com garantia de funcionamento de 3 meses.',
    banner: IMAGES.categories.motor,
    tips: [
      'Exija sempre a Nota Fiscal Eletrônica com o número do motor para o DETRAN.',
      'Verifique se o motor é parcial (bloco/cabeçote) ou completo (com periféricos).',
      'Recomendamos a troca de correias, tensores e bomba d\'água antes da instalação.'
    ]
  },
  transmissao: {
    title: 'Câmbios e Transmissão',
    description: 'Caixas de câmbio manuais, automáticas e automatizadas (i-Motion, Dualogic, Powershift) revisadas. Diferenciais, eixos cardan e kits de embreagem com garantia.',
    banner: IMAGES.categories.transmissao,
    tips: [
      'Confirme o código de referência gravado na carcaça do câmbio antes da compra.',
      'Para câmbios automáticos, é OBRIGATÓRIA a troca de óleo e filtro na instalação para validar a garantia.',
      'Verifique a compatibilidade do conversor de torque e suportes.'
    ]
  },
  lataria: {
    title: 'Lataria e Funilaria',
    description: 'Portas, capôs, paralamas e tampas traseiras originais. Peças com alinhamento perfeito, ideais para reposição mantendo a originalidade.',
    banner: IMAGES.categories.lataria,
    tips: [
      'Verifique o código da cor original para facilitar a pintura.',
      'Confira se a peça acompanha vidros, fechaduras ou máquinas (geralmente vendidas à parte).',
      'Transporte de lataria exige embalagem especial (engradado de madeira).'
    ]
  },
  suspensao: {
    title: 'Suspensão e Freios',
    description: 'Amortecedores, balanças, eixos traseiros e agregados. Itens de segurança inspecionados rigorosamente.',
    banner: IMAGES.categories.suspensao,
    tips: [
      'Verifique se as buchas das balanças estão em bom estado ou precisam de reparo.',
      'Amortecedores usados devem ser testados quanto a vazamentos e pressão.',
      'Discos de freio têm espessura mínima de segurança; verifique a medida.'
    ]
  },
  eletrica: {
    title: 'Elétrica e Módulos',
    description: 'Módulos de injeção, ABS, Conforto e chicotes elétricos. Alternadores e motores de arranque testados em bancada.',
    banner: IMAGES.categories.eletrica,
    tips: [
      'Módulos (ECU) geralmente requerem reprogramação ou desbloqueio por profissional (chaveiro).',
      'Verifique a numeração Bosch/Delphi/Magneti Marelli exata.',
      'Não aceitamos devolução de módulos queimados por má instalação elétrica do veículo.'
    ]
  },
  interior: {
    title: 'Acabamento Interno',
    description: 'Bancos, forros de porta, painéis e volantes. Renove o interior do seu carro com peças originais em bom estado.',
    banner: IMAGES.categories.interior,
    tips: [
      'Confira o padrão do tecido/couro dos bancos (ex: Tear, Couro, Tecido liso).',
      'Verifique se os airbags (se houver no painel/volante) estão intactos.',
      'Botões e difusores de ar são peças frágeis; solicite fotos detalhadas dos encaixes.'
    ]
  }
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    code: 'MOT-AP-18',
    name: 'Motor VW AP 1.8 Gasolina Completo Baixado',
    brand: 'Volkswagen',
    price: 3500.00,
    category: 'motor',
    image: IMAGES.products.engine_vw,
    description: 'Motor completo retirado de veículo sucata com baixa legal. Acompanha nota fiscal e garantia de 3 meses. Testado compressão ok.',
    compatibility: ['VW Gol G2', 'VW Saveiro G3', 'VW Santana'],
    specs: { 'Combustível': 'Gasolina', 'Condição': 'Usado Original', 'Garantia': '3 Meses' },
    stock: 1,
    isNew: false
  },
  {
    id: '2',
    code: 'DIS-FRE-055',
    name: 'Par Disco de Freio Dianteiro Ventilado Fremax',
    brand: 'Fremax',
    price: 210.50,
    category: 'freios',
    image: IMAGES.products.brake_disc,
    description: 'Discos de freio novos na caixa. Liga de carbono para melhor dissipação de calor.',
    compatibility: ['Honda Civic 2012-2016', 'Honda HR-V 2015+'],
    specs: { 'Tipo': 'Ventilado', 'Diâmetro': '282mm', 'Furos': '5' },
    stock: 25,
    isNew: true
  },
  {
    id: '3',
    code: 'CAM-HB20-16',
    name: 'Caixa de Câmbio Manual Hyundai HB20 1.6',
    brand: 'Hyundai',
    price: 2800.00,
    originalPrice: 3200.00,
    category: 'transmissao',
    image: IMAGES.products.gearbox_hb20,
    description: 'Caixa de câmbio 6 marchas original usada. Revisada, sem ruídos.',
    compatibility: ['Hyundai HB20 1.6 2014-2018'],
    specs: { 'Marchas': '6', 'Acionamento': 'Cabo', 'Estado': 'Excelente' },
    stock: 2,
    isNew: false
  },
  {
    id: 'cam-004',
    code: 'CAM-TF72-AUTO',
    name: 'Câmbio Automático TF72 6 Marchas (Renegade/Toro)',
    brand: 'Jeep/Fiat',
    price: 6500.00,
    category: 'transmissao',
    image: IMAGES.products.gearbox_tf72,
    description: 'Câmbio automático Aisin TF72SC de 6 velocidades. Retirado de veículo com baixa quilometragem (45.000km). Acompanha conversor de torque. Garantia de 3 meses mediante comprovação de troca de óleo.',
    compatibility: ['Jeep Renegade 1.8', 'Fiat Toro 1.8', 'Fiat Argo 1.8'],
    specs: { 'Tipo': 'Automático', 'Marchas': '6', 'Modelo': 'TF72SC', 'Condição': 'Seminovo' },
    stock: 1,
    isNew: false
  },
  {
    id: 'cam-005',
    code: 'CAM-GM-6M',
    name: 'Caixa de Câmbio Manual Onix/Prisma 1.4 6M',
    brand: 'Chevrolet',
    price: 2200.00,
    originalPrice: 2500.00,
    category: 'transmissao',
    image: IMAGES.products.gearbox_gm,
    description: 'Câmbio manual de 6 marchas para família GM Onix. Caixa revisada, engates precisos. Carcaça sem soldas ou trincas.',
    compatibility: ['Onix 1.4 2017+', 'Prisma 1.4 2017+', 'Cobalt 1.8 6M'],
    specs: { 'Marchas': '6', 'Acionamento': 'Cabo', 'Estado': 'Usado Original' },
    stock: 3,
    isNew: false
  },
  {
    id: 'cam-006',
    code: 'KIT-EMB-RANGER',
    name: 'Kit Embreagem LUK Ford Ranger 2.2/3.2 Diesel',
    brand: 'LUK',
    price: 1850.00,
    category: 'transmissao',
    image: IMAGES.products.clutch_ranger,
    description: 'Kit de embreagem novo original LUK. Composto por platô, disco e atuador hidráulico. Ideal para reposição pesada.',
    compatibility: ['Ford Ranger 2.2 Diesel 2013+', 'Ford Ranger 3.2 Diesel 2013+'],
    specs: { 'Diâmetro': '280mm', 'Estrias': '23', 'Condição': 'Novo na Caixa' },
    stock: 4,
    isNew: true
  },
  {
    id: 'cam-007',
    code: 'CAM-CVT-K120',
    name: 'Câmbio Automático CVT Toyota Corolla 2.0 (Direct Shift)',
    brand: 'Toyota',
    price: 7800.00,
    category: 'transmissao',
    image: IMAGES.products.cvt_corolla,
    description: 'Câmbio CVT Direct Shift (com primeira marcha mecânica) do Corolla XEi 2.0 2021. Peça em estado de zero, veículo com apenas 12.000km rodados. Oportunidade única.',
    compatibility: ['Toyota Corolla 2.0 2020+', 'Toyota Corolla Cross 2.0'],
    specs: { 'Tipo': 'CVT Direct Shift', 'Modelo': 'K120', 'Km': '12.000', 'Garantia': '6 Meses' },
    stock: 1,
    isNew: false
  },
  {
    id: '4',
    code: 'POR-TRA-FIT',
    name: 'Porta Traseira Direita Honda Fit 2010',
    brand: 'Honda',
    price: 850.00,
    category: 'lataria',
    image: IMAGES.products.door_fit,
    description: 'Porta original usada em bom estado. Pequenos detalhes de pintura, sem amassados graves. Vai sem vidro e forração.',
    compatibility: ['Honda Fit 2009-2014'],
    specs: { 'Lado': 'Direito', 'Cor': 'Prata (revisar)', 'Material': 'Aço' },
    stock: 1,
    isNew: false
  },
  {
    id: '5',
    code: 'BAT-60AH',
    name: 'Bateria 60Ah Livre de Manutenção Moura',
    brand: 'Moura',
    price: 429.00,
    category: 'eletrica',
    image: IMAGES.products.battery,
    description: 'Bateria nova com garantia de fábrica.',
    compatibility: ['Universal 60Ah'],
    specs: { 'Amperagem': '60Ah', 'CCA': '450', 'Garantia': '18 meses' },
    stock: 5,
    isNew: true
  },
  {
    id: '6',
    code: 'MOD-INJ-GOL',
    name: 'Módulo de Injeção Bosch ME7.5.30',
    brand: 'Bosch',
    price: 650.00,
    category: 'eletrica',
    image: IMAGES.products.ecu_module,
    description: 'Módulo desbloqueado e testado em bancada. Pronto para codificar.',
    compatibility: ['VW Gol G5', 'VW Fox'],
    specs: { 'Referência': '0 261 201 599', 'Estado': 'Usado' },
    stock: 3,
    isNew: false
  }
];

export const INSTITUTIONAL_PAGES = {
  sobre: { title: 'Sobre a Autodemolidora', content: 'A Autodemolidora Coronel Barros atua no mercado de reciclagem automotiva com total respeito às normas ambientais e legais (Lei do Desmanche). Oferecemos peças com procedência rastreável.' },
  trocas: { title: 'Política de Trocas', content: 'Para peças usadas, oferecemos garantia de funcionamento de 3 meses. Trocas apenas com selo de garantia inviolado.' },
  privacidade: { title: 'Política de Privacidade', content: 'Seus dados são utilizados apenas para formalização da venda e emissão de Nota Fiscal.' }
};
