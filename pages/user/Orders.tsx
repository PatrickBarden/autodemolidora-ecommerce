import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, MessageCircle, ChevronDown, ChevronUp, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

// Mock data - em produção virá do Supabase
const mockOrders: Order[] = [];

const statusConfig = {
  pending: { label: 'Aguardando', icon: Clock, color: 'warning' },
  confirmed: { label: 'Confirmado', icon: CheckCircle, color: 'blue-500' },
  shipped: { label: 'Enviado', icon: Truck, color: 'primary' },
  delivered: { label: 'Entregue', icon: CheckCircle, color: 'success' },
  cancelled: { label: 'Cancelado', icon: XCircle, color: 'red-500' },
};

export const UserOrders: React.FC = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredOrders = filter === 'all' 
    ? mockOrders 
    : mockOrders.filter(o => o.status === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-heading text-white uppercase">Meus Pedidos</h1>
          <p className="text-grayLight text-sm">Acompanhe o status dos seus pedidos</p>
        </div>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-grayDark border border-grayMedium text-white rounded px-4 py-2 focus:border-primary outline-none"
        >
          <option value="all">Todos os pedidos</option>
          <option value="pending">Aguardando</option>
          <option value="confirmed">Confirmados</option>
          <option value="shipped">Enviados</option>
          <option value="delivered">Entregues</option>
          <option value="cancelled">Cancelados</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-grayDark rounded-lg border border-grayMedium p-12 text-center">
          <Package size={64} className="mx-auto text-grayMedium mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Nenhum pedido encontrado</h2>
          <p className="text-grayLight mb-6">
            {filter === 'all' 
              ? 'Você ainda não fez nenhum pedido. Que tal começar a comprar?' 
              : 'Nenhum pedido com este status.'}
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded font-bold hover:bg-primaryDark transition-colors"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const status = statusConfig[order.status];
            const isExpanded = expandedOrder === order.id;
            
            return (
              <div key={order.id} className="bg-grayDark rounded-lg border border-grayMedium overflow-hidden">
                {/* Order Header */}
                <div 
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-blackCarbon/30 transition-colors"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 bg-${status.color}/20 rounded-lg flex items-center justify-center`}>
                      <status.icon className={`text-${status.color}`} size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-white">Pedido #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-grayLight">
                        {new Date(order.date).toLocaleDateString('pt-BR', { 
                          day: '2-digit', month: 'long', year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded text-xs font-bold bg-${status.color}/20 text-${status.color}`}>
                      {status.label}
                    </span>
                    <span className="font-bold text-white">
                      R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    {isExpanded ? <ChevronUp size={20} className="text-grayLight" /> : <ChevronDown size={20} className="text-grayLight" />}
                  </div>
                </div>

                {/* Order Details */}
                {isExpanded && (
                  <div className="border-t border-grayMedium">
                    <div className="p-4 space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img src={item.image} alt="" className="w-16 h-16 object-cover rounded bg-blackCarbon" />
                          <div className="flex-1">
                            <p className="font-medium text-white">{item.name}</p>
                            <p className="text-sm text-grayLight">Qtd: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-white">
                            R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t border-grayMedium flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-grayMedium text-white rounded hover:bg-primary transition-colors text-sm font-bold">
                        <Eye size={16} /> Ver Detalhes
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-success/20 text-success rounded hover:bg-success/30 transition-colors text-sm font-bold">
                        <MessageCircle size={16} /> Contato WhatsApp
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
