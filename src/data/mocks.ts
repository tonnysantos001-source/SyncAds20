import { Bot, BarChart3, Megaphone, Target, DollarSign, Activity, Youtube, Github, Linkedin, Facebook, Globe, Mail, Store, Database } from 'lucide-react';

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
  ctr: number;
  cpc: number;
  startDate: string;
  endDate: string;
};

export type Metric = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
};

export type Integration = {
  id: string;
  name: string;
  description: string;
  logo: React.FC<any>;
};

export type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: 'Paga' | 'Pendente';
};

export type ApiKey = {
  id: string;
  key: string;
  createdAt: string;
  lastUsed: string;
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
    ctr: 1.94,
    cpc: 0.64,
    startDate: '2025-06-01',
    endDate: '2025-07-15',
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
    ctr: 1.83,
    cpc: 0.32,
    startDate: '2024-11-10',
    endDate: '2024-11-25',
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
    ctr: 2.18,
    cpc: 0.82,
    startDate: '2025-06-10',
    endDate: '2025-08-10',
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
    ctr: 1.54,
    cpc: 0.25,
    startDate: '2025-05-20',
    endDate: '2025-06-30',
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
    ctr: 2.51,
    cpc: 0.28,
    startDate: '2025-06-05',
    endDate: '2025-07-05',
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
    ctr: 5.00,
    cpc: 0.80,
    startDate: '2025-04-01',
    endDate: '2025-04-15',
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
    ctr: 1.60,
    cpc: 0.38,
    startDate: '2025-06-20',
    endDate: '2025-06-27',
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
    ctr: 1.67,
    cpc: 0.43,
    startDate: '2025-01-15',
    endDate: '2025-12-31',
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
    ctr: 1.89,
    cpc: 0.28,
    startDate: '2025-07-01',
    endDate: '2025-07-31',
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
    ctr: 0.50,
    cpc: 5.00,
    startDate: '2025-05-01',
    endDate: '2025-05-31',
  },
];

export const recentCampaigns: Campaign[] = allCampaigns.slice(0, 5);

export const integrations: Integration[] = [
  { id: 'google-ads', name: 'Google Ads', description: 'Conecte sua conta do Google Ads.', logo: Globe },
  { id: 'meta-ads', name: 'Meta Ads', description: 'Conecte sua conta do Meta Ads.', logo: Facebook },
  { id: 'linkedin-ads', name: 'LinkedIn Ads', description: 'Conecte sua conta do LinkedIn Ads.', logo: Linkedin },
  { id: 'google-analytics', name: 'Google Analytics', description: 'Sincronize com o Google Analytics.', logo: BarChart3 },
  { id: 'mailchimp', name: 'Mailchimp', description: 'Conecte sua conta do Mailchimp.', logo: Mail },
  { id: 'shopify', name: 'Shopify', description: 'Sincronize os dados da sua loja.', logo: Store },
  { id: 'youtube', name: 'YouTube', description: 'Analise a performance do seu canal.', logo: Youtube },
  { id: 'supabase', name: 'Supabase', description: 'Conecte seu projeto Supabase.', logo: Database },
  { id: 'github', name: 'GitHub', description: 'Conecte seu repositório GitHub.', logo: Github },
];

export const billingHistory: Invoice[] = [
  { id: 'INV-001', date: '01/06/2025', amount: 'R$ 99,00', status: 'Paga' },
  { id: 'INV-002', date: '01/05/2025', amount: 'R$ 99,00', status: 'Paga' },
  { id: 'INV-003', date: '01/04/2025', amount: 'R$ 99,00', status: 'Paga' },
  { id: 'INV-004', date: '01/03/2025', amount: 'R$ 99,00', status: 'Paga' },
];

export const apiKeysData: ApiKey[] = [
  { id: 'key-1', key: 'sk_live_******************1234', createdAt: '15/05/2025', lastUsed: '28/06/2025' },
  { id: 'key-2', key: 'sk_test_******************5678', createdAt: '01/03/2025', lastUsed: '25/06/2025' },
];

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export type ChatConversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
};

export const chatConversations: ChatConversation[] = [
  {
    id: 'conv-1',
    title: 'Campanha de Facebook Ads',
    messages: [
      { id: 'msg-1', role: 'user', content: 'Criar campanha de Facebook Ads para o produto X.' },
      { id: 'msg-2', role: 'assistant', content: 'Claro! Qual é o objetivo principal da campanha? (Ex: Vendas, Leads, Tráfego)' },
    ],
  },
  {
    id: 'conv-2',
    title: 'Análise da última semana',
    messages: [
      { id: 'msg-3', role: 'user', content: 'Analisar performance da última semana.' },
      { id: 'msg-4', role: 'assistant', content: 'Na última semana, sua taxa de conversão aumentou 15% e o ROI foi de R$ 2.500. A campanha "Lançamento Verão 2025" foi a de melhor desempenho.' },
    ],
  },
  {
    id: 'conv-3',
    title: 'Sugestões de otimização',
    messages: [
      { id: 'msg-5', role: 'user', content: 'Sugerir otimizações para a campanha "Geração de Leads B2B".' },
      { id: 'msg-6', role: 'assistant', content: 'Sugiro testar um novo criativo com um vídeo e aumentar o orçamento para o público de "Gerentes de Marketing" em 20%, pois ele está apresentando um CTR 30% maior que a média.' },
    ],
  },
];

// Analytics Page Data
export const analyticsMetrics = {
  totalImpressions: 1250000,
  totalClicks: 25000,
  avgCTR: 2.0,
  avgCPC: 0.55,
};

export const platformPerformanceData = [
  { platform: 'Google Ads', clicks: 12000, color: '#4285F4' },
  { platform: 'Meta', clicks: 9500, color: '#1877F2' },
  { platform: 'LinkedIn', clicks: 3500, color: '#0A66C2' },
];

export const audienceDemographicsData = [
  { name: '18-24', value: 25, fill: '#3B82F6' },
  { name: '25-34', value: 40, fill: '#8B5CF6' },
  { name: '35-44', value: 20, fill: '#10B981' },
  { name: '45-54', value: 10, fill: '#F59E0B' },
  { name: '55+', value: 5, fill: '#EF4444' },
];
