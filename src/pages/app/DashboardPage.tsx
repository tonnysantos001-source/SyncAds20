import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardMetrics } from '@/data/mocks';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ActiveCampaignsTable } from './dashboard/ActiveCampaignsTable';
import { DashboardChart } from './dashboard/DashboardChart';
import { ConversionGoalsCard } from './dashboard/ConversionGoalsCard';
import { AiSuggestionsCard } from './dashboard/AiSuggestionsCard';
import { cn } from '@/lib/utils';

const MetricCard: React.FC<{ metric: typeof dashboardMetrics[0] }> = ({ metric }) => {
  const { icon: Icon, title, value, change, changeType, color } = metric;
  const isIncrease = changeType === 'increase';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn('rounded-full p-2', color)}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span className={`flex items-center mr-1 ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
            {isIncrease ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {change}
          </span>
          vs. mês passado
        </p>
      </CardContent>
    </Card>
  );
};

const DashboardPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance de Campanhas</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <DashboardChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Campanhas Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <ActiveCampaignsTable />
            </CardContent>
          </Card>
        </div>
        
        {/* Side column */}
        <div className="lg:col-span-1 space-y-6">
          <ConversionGoalsCard />
          <AiSuggestionsCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
