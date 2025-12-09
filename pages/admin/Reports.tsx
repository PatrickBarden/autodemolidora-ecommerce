import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShoppingCart,
  FileText
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../utils/formatting';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ProductStats {
  id: string;
  name: string;
  code: string;
  category: string;
  stock: number;
  price: number;
  created_at: string;
}

interface CategoryStats {
  category: string;
  count: number;
  totalValue: number;
  avgPrice: number;
}

interface ReportData {
  totalProducts: number;
  totalValue: number;
  avgPrice: number;
  lowStockCount: number;
  outOfStockCount: number;
  newProductsThisMonth: number;
  categoryStats: CategoryStats[];
  topProducts: ProductStats[];
  recentProducts: ProductStats[];
  totalUsers: number;
  newUsersThisMonth: number;
}

const CATEGORY_NAMES: Record<string, string> = {
  motor: 'Motores',
  transmissao: 'Caixas de Câmbio',
  lataria: 'Lataria & Carroceria',
  suspensao: 'Suspensão',
  eletrica: 'Elétrica & Módulos',
  interior: 'Acabamento Interno',
};

export const AdminReports: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('all');
  const [data, setData] = useState<ReportData>({
    totalProducts: 0,
    totalValue: 0,
    avgPrice: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    newProductsThisMonth: 0,
    categoryStats: [],
    topProducts: [],
    recentProducts: [],
    totalUsers: 0,
    newUsersThisMonth: 0,
  });

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    try {
      setRefreshing(true);

      // Fetch all products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // Fetch users
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id, created_at');

      if (usersError) throw usersError;

      const productList = products || [];
      const userList = users || [];
      
      // Calculate date filters
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - 7);

      // Filter products by date range
      let filteredProducts = productList;
      if (dateRange === 'week') {
        filteredProducts = productList.filter(p => new Date(p.created_at) >= startOfWeek);
      } else if (dateRange === 'month') {
        filteredProducts = productList.filter(p => new Date(p.created_at) >= startOfMonth);
      }

      // Calculate category statistics
      const categoryMap = new Map<string, { count: number; totalValue: number; prices: number[] }>();
      
      productList.forEach(product => {
        const cat = product.category || 'outros';
        const existing = categoryMap.get(cat) || { count: 0, totalValue: 0, prices: [] };
        existing.count += 1;
        existing.totalValue += (product.price * product.stock);
        existing.prices.push(product.price);
        categoryMap.set(cat, existing);
      });

      const categoryStats: CategoryStats[] = Array.from(categoryMap.entries()).map(([category, stats]) => ({
        category,
        count: stats.count,
        totalValue: stats.totalValue,
        avgPrice: stats.prices.length > 0 ? stats.prices.reduce((a, b) => a + b, 0) / stats.prices.length : 0,
      })).sort((a, b) => b.count - a.count);

      // Calculate totals
      const totalValue = productList.reduce((acc, p) => acc + (p.price * p.stock), 0);
      const avgPrice = productList.length > 0 
        ? productList.reduce((acc, p) => acc + p.price, 0) / productList.length 
        : 0;

      // Stock analysis
      const lowStockCount = productList.filter(p => p.stock > 0 && p.stock <= 3).length;
      const outOfStockCount = productList.filter(p => p.stock === 0).length;

      // New products this month
      const newProductsThisMonth = productList.filter(p => new Date(p.created_at) >= startOfMonth).length;

      // New users this month
      const newUsersThisMonth = userList.filter(u => new Date(u.created_at) >= startOfMonth).length;

      // Top products by price
      const topProducts = [...productList]
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);

      // Recent products
      const recentProducts = productList.slice(0, 5);

      setData({
        totalProducts: productList.length,
        totalValue,
        avgPrice,
        lowStockCount,
        outOfStockCount,
        newProductsThisMonth,
        categoryStats,
        topProducts,
        recentProducts,
        totalUsers: userList.length,
        newUsersThisMonth,
      });

    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleExportPDF = () => {
    // Cores do site
    const primaryColor: [number, number, number] = [185, 28, 28]; // Vermelho #B91C1C
    const darkColor: [number, number, number] = [24, 24, 27]; // Preto #18181B
    const grayColor: [number, number, number] = [113, 113, 122]; // Cinza #71717A
    const lightGray: [number, number, number] = [244, 244, 245]; // Cinza claro

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const today = new Date().toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });

    // Header com fundo vermelho
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    // Título
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('AUTODEMOLIDORA CORONEL BARROS', pageWidth / 2, 15, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Relatório Gerencial de Produtos', pageWidth / 2, 23, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text(`Gerado em: ${today}`, pageWidth / 2, 30, { align: 'center' });

    // Linha separadora
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(14, 40, pageWidth - 14, 40);

    // Resumo Geral - Título
    doc.setTextColor(...darkColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMO GERAL', 14, 50);

    // Cards de resumo
    const cardY = 55;
    const cardWidth = (pageWidth - 42) / 3;
    const cardHeight = 25;

    // Card 1 - Total Produtos
    doc.setFillColor(...lightGray);
    doc.roundedRect(14, cardY, cardWidth, cardHeight, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setTextColor(...grayColor);
    doc.text('Total de Produtos', 14 + cardWidth/2, cardY + 8, { align: 'center' });
    doc.setFontSize(16);
    doc.setTextColor(...darkColor);
    doc.setFont('helvetica', 'bold');
    doc.text(String(data.totalProducts), 14 + cardWidth/2, cardY + 18, { align: 'center' });

    // Card 2 - Valor em Estoque
    doc.setFillColor(...lightGray);
    doc.roundedRect(14 + cardWidth + 7, cardY, cardWidth, cardHeight, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setTextColor(...grayColor);
    doc.setFont('helvetica', 'normal');
    doc.text('Valor em Estoque', 14 + cardWidth + 7 + cardWidth/2, cardY + 8, { align: 'center' });
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text(formatCurrency(data.totalValue), 14 + cardWidth + 7 + cardWidth/2, cardY + 18, { align: 'center' });

    // Card 3 - Preço Médio
    doc.setFillColor(...lightGray);
    doc.roundedRect(14 + (cardWidth + 7) * 2, cardY, cardWidth, cardHeight, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setTextColor(...grayColor);
    doc.setFont('helvetica', 'normal');
    doc.text('Preço Médio', 14 + (cardWidth + 7) * 2 + cardWidth/2, cardY + 8, { align: 'center' });
    doc.setFontSize(14);
    doc.setTextColor(...darkColor);
    doc.setFont('helvetica', 'bold');
    doc.text(formatCurrency(data.avgPrice), 14 + (cardWidth + 7) * 2 + cardWidth/2, cardY + 18, { align: 'center' });

    // Alertas de Estoque
    let currentY = cardY + cardHeight + 15;
    doc.setFontSize(14);
    doc.setTextColor(...darkColor);
    doc.setFont('helvetica', 'bold');
    doc.text('SITUAÇÃO DO ESTOQUE', 14, currentY);
    currentY += 8;

    // Mini cards de alerta
    const alertWidth = (pageWidth - 42) / 3;
    
    // Estoque Normal
    doc.setFillColor(34, 197, 94); // Verde
    doc.roundedRect(14, currentY, alertWidth, 15, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Estoque Normal', 14 + 5, currentY + 6);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(String(data.totalProducts - data.lowStockCount - data.outOfStockCount), 14 + alertWidth - 10, currentY + 10, { align: 'right' });

    // Estoque Baixo
    doc.setFillColor(234, 179, 8); // Amarelo
    doc.roundedRect(14 + alertWidth + 7, currentY, alertWidth, 15, 2, 2, 'F');
    doc.setTextColor(...darkColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Estoque Baixo', 14 + alertWidth + 7 + 5, currentY + 6);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(String(data.lowStockCount), 14 + alertWidth + 7 + alertWidth - 10, currentY + 10, { align: 'right' });

    // Sem Estoque
    doc.setFillColor(...primaryColor);
    doc.roundedRect(14 + (alertWidth + 7) * 2, currentY, alertWidth, 15, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Sem Estoque', 14 + (alertWidth + 7) * 2 + 5, currentY + 6);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(String(data.outOfStockCount), 14 + (alertWidth + 7) * 2 + alertWidth - 10, currentY + 10, { align: 'right' });

    currentY += 25;

    // Tabela de Categorias
    doc.setFontSize(14);
    doc.setTextColor(...darkColor);
    doc.setFont('helvetica', 'bold');
    doc.text('PRODUTOS POR CATEGORIA', 14, currentY);
    currentY += 5;

    autoTable(doc, {
      startY: currentY,
      head: [['Categoria', 'Quantidade', 'Preço Médio', 'Valor Total']],
      body: data.categoryStats.map(cat => [
        CATEGORY_NAMES[cat.category] || cat.category,
        cat.count,
        formatCurrency(cat.avgPrice),
        formatCurrency(cat.totalValue)
      ]),
      foot: [['TOTAL', data.totalProducts, formatCurrency(data.avgPrice), formatCurrency(data.totalValue)]],
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      footStyles: {
        fillColor: darkColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      bodyStyles: {
        textColor: darkColor
      },
      alternateRowStyles: {
        fillColor: lightGray
      },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right' }
      },
      margin: { left: 14, right: 14 }
    });

    // Nova página para Top Produtos
    doc.addPage();

    // Header da segunda página
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('AUTODEMOLIDORA CORONEL BARROS - Relatório Gerencial', pageWidth / 2, 13, { align: 'center' });

    // Top 5 Produtos
    doc.setTextColor(...darkColor);
    doc.setFontSize(14);
    doc.text('TOP 5 PRODUTOS - MAIOR VALOR', 14, 35);

    autoTable(doc, {
      startY: 40,
      head: [['#', 'Código', 'Nome', 'Categoria', 'Preço', 'Estoque']],
      body: data.topProducts.map((p, i) => [
        i + 1,
        p.code || '-',
        p.name.substring(0, 30) + (p.name.length > 30 ? '...' : ''),
        CATEGORY_NAMES[p.category] || p.category,
        formatCurrency(p.price),
        p.stock
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        textColor: darkColor
      },
      alternateRowStyles: {
        fillColor: lightGray
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 10 },
        1: { halign: 'center', cellWidth: 25 },
        2: { halign: 'left' },
        3: { halign: 'center', cellWidth: 35 },
        4: { halign: 'right', cellWidth: 25 },
        5: { halign: 'center', cellWidth: 20 }
      },
      margin: { left: 14, right: 14 }
    });

    // Produtos Recentes
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setTextColor(...darkColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PRODUTOS RECENTES', 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Código', 'Nome', 'Categoria', 'Preço', 'Data Cadastro']],
      body: data.recentProducts.map(p => [
        p.code || '-',
        p.name.substring(0, 35) + (p.name.length > 35 ? '...' : ''),
        CATEGORY_NAMES[p.category] || p.category,
        formatCurrency(p.price),
        new Date(p.created_at).toLocaleDateString('pt-BR')
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        textColor: darkColor
      },
      alternateRowStyles: {
        fillColor: lightGray
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 25 },
        1: { halign: 'left' },
        2: { halign: 'center', cellWidth: 35 },
        3: { halign: 'right', cellWidth: 25 },
        4: { halign: 'center', cellWidth: 28 }
      },
      margin: { left: 14, right: 14 }
    });

    // Rodapé
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(...grayColor);
      doc.text(
        `Página ${i} de ${pageCount} | Autodemolidora Coronel Barros | ${today}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Download
    doc.save(`relatorio_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    color?: string;
    trend?: 'up' | 'down' | 'neutral';
  }> = ({ title, value, subtitle, icon, color = 'primary', trend }) => (
    <div className="bg-grayDark rounded-lg border border-grayMedium p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-grayLight text-sm uppercase font-bold mb-1">{title}</p>
          <p className={`text-3xl font-heading text-white`}>{value}</p>
          {subtitle && (
            <p className="text-xs text-grayLight/60 mt-1 flex items-center gap-1">
              {trend === 'up' && <TrendingUp size={12} className="text-success" />}
              {trend === 'down' && <TrendingUp size={12} className="text-red-500 rotate-180" />}
              {subtitle}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}/20`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <RefreshCw className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading text-white uppercase flex items-center gap-3">
            <BarChart3 className="text-primary" />
            Relatórios
          </h1>
          <p className="text-grayLight">Análise completa do seu negócio</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Date Filter */}
          <div className="flex items-center gap-2 bg-grayDark border border-grayMedium rounded-lg p-1">
            <button
              onClick={() => setDateRange('all')}
              className={`px-3 py-1.5 rounded text-sm font-bold transition-colors ${
                dateRange === 'all' ? 'bg-primary text-white' : 'text-grayLight hover:text-white'
              }`}
            >
              Tudo
            </button>
            <button
              onClick={() => setDateRange('month')}
              className={`px-3 py-1.5 rounded text-sm font-bold transition-colors ${
                dateRange === 'month' ? 'bg-primary text-white' : 'text-grayLight hover:text-white'
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setDateRange('week')}
              className={`px-3 py-1.5 rounded text-sm font-bold transition-colors ${
                dateRange === 'week' ? 'bg-primary text-white' : 'text-grayLight hover:text-white'
              }`}
            >
              Semana
            </button>
          </div>

          <Button
            variant="ghost"
            onClick={fetchReportData}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
            Atualizar
          </Button>

          <Button onClick={handleExportPDF} className="gap-2">
            <FileText size={18} />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total de Produtos"
          value={data.totalProducts}
          subtitle={`+${data.newProductsThisMonth} este mês`}
          icon={<Package className="text-primary" size={24} />}
          trend="up"
        />
        <StatCard
          title="Valor em Estoque"
          value={formatCurrency(data.totalValue)}
          icon={<DollarSign className="text-success" size={24} />}
          color="success"
        />
        <StatCard
          title="Preço Médio"
          value={formatCurrency(data.avgPrice)}
          icon={<TrendingUp className="text-warning" size={24} />}
          color="warning"
        />
        <StatCard
          title="Usuários Cadastrados"
          value={data.totalUsers}
          subtitle={`+${data.newUsersThisMonth} este mês`}
          icon={<Users className="text-info" size={24} />}
          color="info"
          trend="up"
        />
      </div>

      {/* Stock Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-grayDark rounded-lg border border-grayMedium p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-warning" size={24} />
            <h3 className="text-lg font-heading text-white uppercase">Alertas de Estoque</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="text-warning" size={20} />
                <span className="text-white">Estoque Baixo (≤3 unidades)</span>
              </div>
              <span className="text-2xl font-heading text-warning">{data.lowStockCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-red-500" size={20} />
                <span className="text-white">Sem Estoque</span>
              </div>
              <span className="text-2xl font-heading text-red-500">{data.outOfStockCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-success" size={20} />
                <span className="text-white">Em Estoque Normal</span>
              </div>
              <span className="text-2xl font-heading text-success">
                {data.totalProducts - data.lowStockCount - data.outOfStockCount}
              </span>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-grayDark rounded-lg border border-grayMedium p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-primary" size={24} />
            <h3 className="text-lg font-heading text-white uppercase">Produtos por Categoria</h3>
          </div>
          <div className="space-y-3">
            {data.categoryStats.map((cat, index) => {
              const percentage = data.totalProducts > 0 
                ? Math.round((cat.count / data.totalProducts) * 100) 
                : 0;
              return (
                <div key={cat.category} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-grayLight">{CATEGORY_NAMES[cat.category] || cat.category}</span>
                    <span className="text-white font-bold">{cat.count} ({percentage}%)</span>
                  </div>
                  <div className="h-2 bg-blackCarbon rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {data.categoryStats.length === 0 && (
              <p className="text-grayLight text-center py-4">Nenhum produto cadastrado</p>
            )}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products by Price */}
        <div className="bg-grayDark rounded-lg border border-grayMedium overflow-hidden">
          <div className="p-4 border-b border-grayMedium flex items-center gap-3">
            <DollarSign className="text-success" size={20} />
            <h3 className="font-heading text-white uppercase">Top 5 - Maior Valor</h3>
          </div>
          <div className="divide-y divide-grayMedium">
            {data.topProducts.map((product, index) => (
              <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-blackCarbon/50 transition-colors">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{product.name}</p>
                  <p className="text-xs text-grayLight">{product.code} • {CATEGORY_NAMES[product.category] || product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-primary font-heading">{formatCurrency(product.price)}</p>
                  <p className="text-xs text-grayLight">{product.stock} un.</p>
                </div>
              </div>
            ))}
            {data.topProducts.length === 0 && (
              <p className="text-grayLight text-center py-8">Nenhum produto cadastrado</p>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-grayDark rounded-lg border border-grayMedium overflow-hidden">
          <div className="p-4 border-b border-grayMedium flex items-center gap-3">
            <Clock className="text-info" size={20} />
            <h3 className="font-heading text-white uppercase">Produtos Recentes</h3>
          </div>
          <div className="divide-y divide-grayMedium">
            {data.recentProducts.map((product) => (
              <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-blackCarbon/50 transition-colors">
                <div className="w-8 h-8 rounded bg-grayMedium flex items-center justify-center">
                  <Package className="text-grayLight" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{product.name}</p>
                  <p className="text-xs text-grayLight">{product.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{formatCurrency(product.price)}</p>
                  <p className="text-xs text-grayLight">
                    {new Date(product.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
            {data.recentProducts.length === 0 && (
              <p className="text-grayLight text-center py-8">Nenhum produto cadastrado</p>
            )}
          </div>
        </div>
      </div>

      {/* Category Value Table */}
      <div className="mt-6 bg-grayDark rounded-lg border border-grayMedium overflow-hidden">
        <div className="p-4 border-b border-grayMedium flex items-center gap-3">
          <ShoppingCart className="text-primary" size={20} />
          <h3 className="font-heading text-white uppercase">Valor por Categoria</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blackCarbon">
              <tr>
                <th className="text-left p-4 text-xs font-bold text-grayLight uppercase">Categoria</th>
                <th className="text-center p-4 text-xs font-bold text-grayLight uppercase">Qtd. Produtos</th>
                <th className="text-right p-4 text-xs font-bold text-grayLight uppercase">Preço Médio</th>
                <th className="text-right p-4 text-xs font-bold text-grayLight uppercase">Valor Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grayMedium">
              {data.categoryStats.map((cat) => (
                <tr key={cat.category} className="hover:bg-blackCarbon/50 transition-colors">
                  <td className="p-4 text-white font-medium">
                    {CATEGORY_NAMES[cat.category] || cat.category}
                  </td>
                  <td className="p-4 text-center text-grayLight">{cat.count}</td>
                  <td className="p-4 text-right text-grayLight">{formatCurrency(cat.avgPrice)}</td>
                  <td className="p-4 text-right text-primary font-heading">{formatCurrency(cat.totalValue)}</td>
                </tr>
              ))}
              {data.categoryStats.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-grayLight">
                    Nenhum produto cadastrado
                  </td>
                </tr>
              )}
            </tbody>
            {data.categoryStats.length > 0 && (
              <tfoot className="bg-blackCarbon border-t-2 border-primary">
                <tr>
                  <td className="p-4 text-white font-bold uppercase">Total Geral</td>
                  <td className="p-4 text-center text-white font-bold">{data.totalProducts}</td>
                  <td className="p-4 text-right text-white font-bold">{formatCurrency(data.avgPrice)}</td>
                  <td className="p-4 text-right text-primary font-heading text-lg">{formatCurrency(data.totalValue)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
