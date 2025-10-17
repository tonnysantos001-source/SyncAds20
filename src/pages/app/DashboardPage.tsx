import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dashboardMetrics, recentCampaigns } from '@/data/mocks';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { RecentCampaignsTable } from './dashboard/RecentCampaignsTable';
import { DashboardChart } from './dashboard/DashboardChart';

const MetricCard: React.FC<{ metric: typeof dashboardMetrics[0] }> = ({ metric }) => {
  const { icon: Icon, title, value, change, changeType } = metric;
  const isIncrease = changeType === 'increase';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span className={`flex items-center mr-1 ${isIncrease ? 'text-success' : 'text-danger'}`}>
            {isIncrease ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {change}
          </span>
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
};

const DashboardPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>Cliques e conversões nos últimos 30 dias.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardChart />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Campanhas Recentes</CardTitle>
            <CardDescription>
              Você tem {recentCampaigns.filter(c => c.status === 'Ativa').length} campanhas ativas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentCampaignsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
