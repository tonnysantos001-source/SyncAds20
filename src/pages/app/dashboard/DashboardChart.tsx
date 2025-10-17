import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { chartData } from '@/data/mocks';

export const DashboardChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="name" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))"
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="Cliques"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
        <Line 
          type="monotone" 
          dataKey="Conversoes" 
          stroke="hsl(var(--secondary))" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
