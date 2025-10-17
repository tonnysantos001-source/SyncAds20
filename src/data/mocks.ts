import { Bot, BarChart3, Megaphone, Target, DollarSign, Activity, TrendingUp } from 'lucide-react';

// Tipos
export type CampaignStatus = 'Ativa' | 'Pausada' | 'Concluída';
export type CampaignPlatform = 'Google Ads' | 'Meta' | 'LinkedIn';

export type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  platform: CampaignPlatform;
  budgetSpent: number;
  budgetTotal: number;
  impressions: number;
  clicks: number;
  conversions: number;
};

export type Metric = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
};

// Dados Mock
export const dashboardMetrics: Metric[] = [
  {
    title: 'Total de Campanhas',
    value: '12',
    change: '+2',
    changeType: 'increase',
    icon: Megaphone,
  },
  {
    title: 'Cliques Totais',
    value: '3,456',
    change: '+12.5%',
    changeType: 'increase',
    icon: Target,
  },
  {
    title: 'Taxa de Conversão',
    value: '4.2%',
    change: '-0.8%',
    changeType: 'decrease',
    icon: Activity,
  },
  {
    title: 'ROI',
    value: 'R$ 8,920',
    change: '+21%',
    changeType: 'increase',
    icon: DollarSign,
  },
];

export const chartData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    name: date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
    Cliques: Math.floor(Math.random() * (300 - 50 + 1)) + 50,
    Conversoes: Math.floor(Math.random() * (30 - 5 + 1)) + 5,
  };
});

export const allCampaigns: Campaign[] = [
    {
    id: 'CAM-001',
    name: 'Lançamento Verão 2025',
    status: 'Ativa',
    platform: 'Meta',
    budgetSpent: 1500,
    budgetTotal: 2000,
    impressions: 120500,
    clicks: 2340,
    conversions: 112,
  },
  {
    id: 'CAM-002',
    name: 'Promoção Black Friday',
    status: 'Concluída',
    platform: 'Google Ads',
    budgetSpent: 5000,
    budgetTotal: 5000,
    impressions: 850200,
    clicks: 15600,
    conversions: 980,
  },
  {
    id: 'CAM-003',
    name: 'Geração de Leads B2B',
    status: 'Ativa',
    platform: 'LinkedIn',
    budgetSpent: 800,
    budgetTotal: 3000,
    impressions: 45000,
    clicks: 980,
    conversions: 45,
  },
  {
    id: 'CAM-004',
    name: 'Campanha de Remarketing',
    status: 'Pausada',
    platform: 'Google Ads',
    budgetSpent: 300,
    budgetTotal: 1000,
    impressions: 78000,
    clicks: 1200,
    conversions: 60,
  },
  {
    id: 'CAM-005',
    name: 'Divulgação App Mobile',
    status: 'Ativa',
    platform: 'Meta',
    budgetSpent: 2500,
    budgetTotal: 4000,
    impressions: 350000,
    clicks: 8800,
    conversions: 420,
  },
  {
    id: 'CAM-006',
    name: 'Webinar de Marketing Digital',
    status: 'Concluída',
    platform: 'LinkedIn',
    budgetSpent: 1200,
    budgetTotal: 1200,
    impressions: 30000,
    clicks: 1500,
    conversions: 250,
  },
  {
    id: 'CAM-007',
    name: 'Teste A/B de Anúncios',
    status: 'Pausada',
    platform: 'Meta',
    budgetSpent: 150,
    budgetTotal: 500,
    impressions: 25000,
    clicks: 400,
    conversions: 15,
  },
  {
    id: 'CAM-008',
    name: 'Campanha Institucional 2025',
    status: 'Ativa',
    platform: 'Google Ads',
    budgetSpent: 3200,
    budgetTotal: 10000,
    impressions: 450000,
    clicks: 7500,
    conversions: 300,
  },
  {
    id: 'CAM-009',
    name: 'Vendas de Inverno',
    status: 'Ativa',
    platform: 'Meta',
    budgetSpent: 500,
    budgetTotal: 1500,
    impressions: 95000,
    clicks: 1800,
    conversions: 95,
  },
  {
    id: 'CAM-010',
    name: 'Recrutamento de Talentos',
    status: 'Concluída',
    platform: 'LinkedIn',
    budgetSpent: 2000,
    budgetTotal: 2000,
    impressions: 80000,
    clicks: 400,
    conversions: 12,
  },
];


export const recentCampaigns: Campaign[] = allCampaigns.slice(0, 5);
