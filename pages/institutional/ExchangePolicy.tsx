import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  Package,
  FileText,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { CONTACT } from '../../constants/contact';

export const ExchangePolicyPage: React.FC = () => {
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
            Política de <span className="text-primary">Trocas</span>
          </h1>
          <p className="text-xl text-grayLight max-w-2xl">
            Conheça nossa política de garantia, trocas e devoluções. 
            Trabalhamos para garantir sua satisfação em todas as compras.
          </p>
        </div>
      </section>

      {/* Garantia */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Card Principal - Garantia */}
            <div className="bg-grayDark rounded-lg border border-grayMedium p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-success/20 rounded-lg flex items-center justify-center shrink-0">
                  <ShieldCheck size={28} className="text-success" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading text-white uppercase mb-2">Garantia de 3 Meses</h2>
                  <p className="text-grayLight">
                    Todas as peças usadas comercializadas pela Autodemolidora Coronel Barros possuem 
                    garantia de funcionamento de <strong className="text-white">90 dias</strong> a partir 
                    da data de emissão da Nota Fiscal.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blackCarbon rounded-lg p-4 border border-grayMedium">
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <CheckCircle size={18} className="text-success" />
                    Coberto pela Garantia
                  </h3>
                  <ul className="space-y-2 text-sm text-grayLight">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-success shrink-0 mt-1" />
                      Defeitos de funcionamento não aparentes no momento da venda
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-success shrink-0 mt-1" />
                      Problemas internos em motores e câmbios (compressão, engrenagens)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-success shrink-0 mt-1" />
                      Falhas em módulos eletrônicos testados
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-success shrink-0 mt-1" />
                      Peças que não correspondem à descrição do anúncio
                    </li>
                  </ul>
                </div>

                <div className="bg-blackCarbon rounded-lg p-4 border border-grayMedium">
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <XCircle size={18} className="text-red-500" />
                    Não Coberto pela Garantia
                  </h3>
                  <ul className="space-y-2 text-sm text-grayLight">
                    <li className="flex items-start gap-2">
                      <XCircle size={14} className="text-red-500 shrink-0 mt-1" />
                      Danos causados por instalação incorreta
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={14} className="text-red-500 shrink-0 mt-1" />
                      Desgaste natural de peças (pastilhas, discos, buchas)
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={14} className="text-red-500 shrink-0 mt-1" />
                      Peças de acabamento (riscos, manchas, desbotamento)
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle size={14} className="text-red-500 shrink-0 mt-1" />
                      Módulos queimados por curto-circuito do veículo
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Condições para Troca */}
            <div className="bg-grayDark rounded-lg border border-grayMedium p-8 mb-8">
              <h2 className="text-2xl font-heading text-white uppercase mb-6 flex items-center gap-3">
                <Package size={24} className="text-primary" />
                Condições para Troca ou Devolução
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blackCarbon rounded-lg border border-grayMedium">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Prazo de Solicitação</h3>
                    <p className="text-grayLight text-sm">
                      A solicitação de troca ou devolução deve ser feita em até <strong className="text-white">7 dias</strong> após 
                      o recebimento da peça para casos de arrependimento, ou dentro do período de garantia para defeitos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blackCarbon rounded-lg border border-grayMedium">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Selo de Garantia Inviolado</h3>
                    <p className="text-grayLight text-sm">
                      Peças que possuem selo de garantia (motores, câmbios, módulos) devem estar com o selo 
                      <strong className="text-white"> intacto</strong>. A violação do selo invalida a garantia.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blackCarbon rounded-lg border border-grayMedium">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Nota Fiscal Obrigatória</h3>
                    <p className="text-grayLight text-sm">
                      É necessário apresentar a <strong className="text-white">Nota Fiscal</strong> de compra para 
                      qualquer solicitação de garantia, troca ou devolução.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blackCarbon rounded-lg border border-grayMedium">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Estado da Peça</h3>
                    <p className="text-grayLight text-sm">
                      A peça deve ser devolvida nas mesmas condições em que foi recebida, sem sinais de 
                      instalação, danos ou alterações.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Processo de Troca */}
            <div className="bg-grayDark rounded-lg border border-grayMedium p-8 mb-8">
              <h2 className="text-2xl font-heading text-white uppercase mb-6 flex items-center gap-3">
                <Clock size={24} className="text-primary" />
                Como Solicitar uma Troca
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={28} className="text-primary" />
                  </div>
                  <h3 className="text-white font-bold mb-2">1. Entre em Contato</h3>
                  <p className="text-grayLight text-sm">
                    Fale conosco pelo WhatsApp informando o número da Nota Fiscal e o motivo da solicitação.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={28} className="text-primary" />
                  </div>
                  <h3 className="text-white font-bold mb-2">2. Análise</h3>
                  <p className="text-grayLight text-sm">
                    Nossa equipe analisará a solicitação e, se aprovada, fornecerá as instruções para envio.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package size={28} className="text-primary" />
                  </div>
                  <h3 className="text-white font-bold mb-2">3. Resolução</h3>
                  <p className="text-grayLight text-sm">
                    Após recebimento e verificação, realizamos a troca por outra peça ou estorno do valor.
                  </p>
                </div>
              </div>
            </div>

            {/* Avisos Importantes */}
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle size={24} className="text-warning shrink-0" />
                <div>
                  <h3 className="text-warning font-bold mb-2">Avisos Importantes</h3>
                  <ul className="space-y-2 text-sm text-grayLight">
                    <li>
                      • Para <strong className="text-white">câmbios automáticos</strong>, a garantia só é válida 
                      mediante comprovação de troca de óleo e filtro na instalação.
                    </li>
                    <li>
                      • <strong className="text-white">Motores</strong> devem ser instalados por profissional 
                      qualificado. Recomendamos a troca de correias, tensores e bomba d'água.
                    </li>
                    <li>
                      • O <strong className="text-white">frete de devolução</strong> é por conta do cliente em 
                      casos de arrependimento. Em defeitos cobertos pela garantia, arcamos com os custos.
                    </li>
                    <li>
                      • Peças de <strong className="text-white">lataria</strong> não possuem garantia contra 
                      diferenças de tonalidade de cor ou pequenos detalhes estéticos informados no anúncio.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Dúvidas */}
            <div className="bg-grayDark rounded-lg border border-grayMedium p-8 text-center">
              <HelpCircle size={48} className="text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-heading text-white uppercase mb-4">Ficou com Dúvidas?</h2>
              <p className="text-grayLight mb-6 max-w-lg mx-auto">
                Nossa equipe está pronta para esclarecer qualquer dúvida sobre garantia, 
                trocas ou devoluções. Entre em contato!
              </p>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=Olá! Tenho uma dúvida sobre a política de trocas.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded bg-primary text-white font-bold hover:bg-primaryDark transition-colors"
              >
                <MessageCircle size={20} />
                Falar no WhatsApp
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
