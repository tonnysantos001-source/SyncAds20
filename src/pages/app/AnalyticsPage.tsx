import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { analyticsMetrics, platformPerformanceData, audienceDemographicsData } from '@/data/mocks';
import { Eye, MousePointerClick, Percent, Coins } from 'lucide-react';

const AnalyticsMetricCard = ({ icon: Icon, title, value }: { icon: React.ElementType, title: string, value: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Uma visão aprofundada do desempenho geral de suas campanhas.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsMetricCard icon={Eye} title="Total de Impressões" value={analyticsMetrics.totalImpressions.toLocaleString('pt-BR')} />
        <AnalyticsMetricCard icon={MousePointerClick} title="Total de Cliques" value={analyticsMetrics.totalClicks.toLocaleString('pt-BR')} />
        <AnalyticsMetricCard icon={Percent} title="CTR Médio" value={`${analyticsMetrics.avgCTR.toFixed(2)}%`} />
        <AnalyticsMetricCard icon={Coins} title="CPC Médio" value={`R$ ${analyticsMetrics.avgCPC.toFixed(2)}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Plataforma</CardTitle>
            <CardDescription>Distribuição de cliques entre as diferentes plataformas de anúncios.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformPerformanceData} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="platform" type="category" axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}/>
                <Bar dataKey="clicks" radius={[0, 4, 4, 0]}>
                  {platformPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demografia do Público</CardTitle>
            <CardDescription>Distribuição de cliques por faixa etária.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={audienceDemographicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {audienceDemographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}/>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
