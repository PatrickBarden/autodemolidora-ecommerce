import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Eye, 
  Database,
  UserCheck,
  FileText,
  Mail,
  AlertCircle
} from 'lucide-react';
import { CONTACT } from '../../constants/contact';

export const PrivacyPage: React.FC = () => {
  const lastUpdate = '09 de Dezembro de 2024';

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
            Política de <span className="text-primary">Privacidade</span>
          </h1>
          <p className="text-xl text-grayLight max-w-2xl">
            Saiba como coletamos, utilizamos e protegemos seus dados pessoais 
            em conformidade com a LGPD.
          </p>
          <p className="text-sm text-grayLight/60 mt-4">
            Última atualização: {lastUpdate}
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introdução */}
            <div className="bg-grayDark rounded-lg border border-grayMedium p-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                  <Shield size={28} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading text-white uppercase mb-3">Nosso Compromisso</h2>
                  <p className="text-grayLight leading-relaxed">
                    A <strong className="text-white">Autodemolidora Coronel Barros</strong> está comprometida 
                    com a proteção da privacidade e dos dados pessoais de seus clientes, em conformidade 
                    com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                  </p>
                </div>
              </div>
            </div>

            {/* Seções */}
            <div className="space-y-8">
              
              {/* Dados Coletados */}
              <div className="bg-grayDark rounded-lg border border-grayMedium p-8">
                <h2 className="text-xl font-heading text-white uppercase mb-4 flex items-center gap-3">
                  <Database size={24} className="text-primary" />
                  Dados que Coletamos
                </h2>
                <p className="text-grayLight mb-4">
                  Coletamos apenas os dados necessários para a prestação de nossos serviços:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blackCarbon rounded-lg p-4 border border-grayMedium">
                    <h3 className="text-white font-bold mb-2">Dados de Identificação</h3>
                    <ul className="text-sm text-grayLight space-y-1">
                      <li>• Nome completo</li>
                      <li>• CPF/CNPJ</li>
                      <li>• E-mail</li>
                      <li>• Telefone/WhatsApp</li>
                    </ul>
                  </div>
                  <div className="bg-blackCarbon rounded-lg p-4 border border-grayMedium">
                    <h3 className="text-white font-bold mb-2">Dados de Entrega</h3>
                    <ul className="text-sm text-grayLight space-y-1">
                      <li>• Endereço completo</li>
                      <li>• CEP</li>
                      <li>• Cidade e Estado</li>
                      <li>• Ponto de referência</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Finalidade */}
              <div className="bg-grayDark rounded-lg border border-grayMedium p-8">
                <h2 className="text-xl font-heading text-white uppercase mb-4 flex items-center gap-3">
                  <Eye size={24} className="text-primary" />
                  Finalidade do Uso dos Dados
                </h2>
                <p className="text-grayLight mb-4">
                  Seus dados pessoais são utilizados exclusivamente para:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-grayLight">
                    <FileText size={18} className="text-primary shrink-0 mt-1" />
                    <span><strong className="text-white">Emissão de Nota Fiscal:</strong> Obrigação legal para formalização da venda.</span>
                  </li>
                  <li className="flex items-start gap-3 text-grayLight">
                    <Lock size={18} className="text-primary shrink-0 mt-1" />
                    <span><strong className="text-white">Processamento de Pedidos:</strong> Confirmação, separação e envio das peças.</span>
                  </li>
                  <li className="flex items-start gap-3 text-grayLight">
                    <Mail size={18} className="text-primary shrink-0 mt-1" />
                    <span><strong className="text-white">Comunicação:</strong> Atualizações sobre seu pedido e suporte pós-venda.</span>
                  </li>
                  <li className="flex items-start gap-3 text-grayLight">
                    <UserCheck size={18} className="text-primary shrink-0 mt-1" />
                    <span><strong className="text-white">Garantia:</strong> Registro para acionamento de garantia quando necessário.</span>
                  </li>
                </ul>
              </div>

              {/* Compartilhamento */}
              <div className="bg-grayDark rounded-lg border border-grayMedium p-8">
                <h2 className="text-xl font-heading text-white uppercase mb-4 flex items-center gap-3">
                  <UserCheck size={24} className="text-primary" />
                  Compartilhamento de Dados
                </h2>
                <p className="text-grayLight mb-4">
                  Seus dados podem ser compartilhados apenas com:
                </p>
                <div className="space-y-4">
                  <div className="bg-blackCarbon rounded-lg p-4 border border-grayMedium">
                    <h3 className="text-white font-bold mb-1">Transportadoras</h3>
                    <p className="text-sm text-grayLight">
                      Nome, endereço e telefone para entrega das peças.
                    </p>
                  </div>
                  <div className="bg-blackCarbon rounded-lg p-4 border border-grayMedium">
                    <h3 className="text-white font-bold mb-1">Órgãos Governamentais</h3>
                    <p className="text-sm text-grayLight">
                      Receita Federal e SEFAZ para emissão de Nota Fiscal Eletrônica (obrigação legal).
                    </p>
                  </div>
                  <div className="bg-blackCarbon rounded-lg p-4 border border-grayMedium">
                    <h3 className="text-white font-bold mb-1">Processadores de Pagamento</h3>
                    <p className="text-sm text-grayLight">
                      Dados necessários para processamento de pagamentos via cartão ou PIX.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-success/10 border border-success/30 rounded-lg">
                  <p className="text-sm text-grayLight flex items-start gap-2">
                    <Shield size={16} className="text-success shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Não vendemos, alugamos ou compartilhamos</strong> seus 
                      dados com terceiros para fins de marketing ou publicidade.
                    </span>
                  </p>
                </div>
              </div>

              {/* Segurança */}
              <div className="bg-grayDark rounded-lg border border-grayMedium p-8">
                <h2 className="text-xl font-heading text-white uppercase mb-4 flex items-center gap-3">
                  <Lock size={24} className="text-primary" />
                  Segurança dos Dados
                </h2>
                <p className="text-grayLight mb-4">
                  Adotamos medidas técnicas e organizacionais para proteger seus dados:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-blackCarbon rounded-lg border border-grayMedium">
                    <Lock size={20} className="text-success shrink-0" />
                    <div>
                      <h3 className="text-white font-bold text-sm">Criptografia SSL/TLS</h3>
                      <p className="text-xs text-grayLight">Todas as comunicações são criptografadas.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blackCarbon rounded-lg border border-grayMedium">
                    <Database size={20} className="text-success shrink-0" />
                    <div>
                      <h3 className="text-white font-bold text-sm">Banco de Dados Seguro</h3>
                      <p className="text-xs text-grayLight">Dados armazenados com acesso restrito.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blackCarbon rounded-lg border border-grayMedium">
                    <UserCheck size={20} className="text-success shrink-0" />
                    <div>
                      <h3 className="text-white font-bold text-sm">Acesso Controlado</h3>
                      <p className="text-xs text-grayLight">Apenas funcionários autorizados.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blackCarbon rounded-lg border border-grayMedium">
                    <Shield size={20} className="text-success shrink-0" />
                    <div>
                      <h3 className="text-white font-bold text-sm">Políticas de Segurança</h3>
                      <p className="text-xs text-grayLight">Procedimentos internos de proteção.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direitos do Titular */}
              <div className="bg-grayDark rounded-lg border border-grayMedium p-8">
                <h2 className="text-xl font-heading text-white uppercase mb-4 flex items-center gap-3">
                  <UserCheck size={24} className="text-primary" />
                  Seus Direitos (LGPD)
                </h2>
                <p className="text-grayLight mb-4">
                  De acordo com a LGPD, você tem direito a:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Confirmar a existência de tratamento de dados',
                    'Acessar seus dados pessoais',
                    'Corrigir dados incompletos ou desatualizados',
                    'Solicitar anonimização ou bloqueio de dados',
                    'Solicitar a eliminação de dados desnecessários',
                    'Revogar consentimento a qualquer momento'
                  ].map((right, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-grayLight">
                      <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                      {right}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cookies */}
              <div className="bg-grayDark rounded-lg border border-grayMedium p-8">
                <h2 className="text-xl font-heading text-white uppercase mb-4 flex items-center gap-3">
                  <Database size={24} className="text-primary" />
                  Cookies e Tecnologias
                </h2>
                <p className="text-grayLight mb-4">
                  Utilizamos cookies e tecnologias similares para:
                </p>
                <ul className="space-y-2 text-sm text-grayLight">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2"></div>
                    <span><strong className="text-white">Cookies essenciais:</strong> Necessários para o funcionamento do site (carrinho, login).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2"></div>
                    <span><strong className="text-white">Cookies de desempenho:</strong> Análise de uso para melhorar a experiência.</span>
                  </li>
                </ul>
                <p className="text-sm text-grayLight mt-4">
                  Você pode gerenciar as preferências de cookies nas configurações do seu navegador.
                </p>
              </div>

              {/* Retenção */}
              <div className="bg-grayDark rounded-lg border border-grayMedium p-8">
                <h2 className="text-xl font-heading text-white uppercase mb-4 flex items-center gap-3">
                  <FileText size={24} className="text-primary" />
                  Retenção de Dados
                </h2>
                <p className="text-grayLight">
                  Seus dados são mantidos pelo tempo necessário para cumprir as finalidades descritas 
                  nesta política, bem como para atender obrigações legais (como guarda de Notas Fiscais 
                  por <strong className="text-white">5 anos</strong> conforme legislação tributária).
                </p>
              </div>

              {/* Contato */}
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-8">
                <div className="flex items-start gap-4">
                  <AlertCircle size={24} className="text-primary shrink-0" />
                  <div>
                    <h2 className="text-xl font-heading text-white uppercase mb-3">
                      Dúvidas ou Solicitações
                    </h2>
                    <p className="text-grayLight mb-4">
                      Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
                      entre em contato conosco:
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="text-grayLight">
                        <strong className="text-white">E-mail:</strong>{' '}
                        <a href={`mailto:${CONTACT.email}`} className="text-primary hover:underline">
                          {CONTACT.email}
                        </a>
                      </p>
                      <p className="text-grayLight">
                        <strong className="text-white">WhatsApp:</strong>{' '}
                        <a 
                          href={`https://wa.me/${CONTACT.whatsapp}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {CONTACT.whatsappFormatted}
                        </a>
                      </p>
                      <p className="text-grayLight">
                        <strong className="text-white">Endereço:</strong> {CONTACT.fullAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
