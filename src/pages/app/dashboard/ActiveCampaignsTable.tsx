import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/store/useStore';
import { CampaignStatus } from '@/data/mocks';

const statusVariantMap: Record<CampaignStatus, 'success' | 'warning' | 'default'> = {
  'Ativa': 'success',
  'Pausada': 'warning',
  'Concluída': 'default',
};

export const ActiveCampaignsTable: React.FC = () => {
  const allCampaigns = useStore(state => state.campaigns);
  const campaigns = React.useMemo(() => allCampaigns.filter(c => c.status === 'Ativa'), [allCampaigns]);

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Orçamento</TableHead>
            <TableHead className="text-right">Desempenho (Cliques)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.slice(0, 5).map((campaign) => {
            const budgetPercentage = (campaign.budgetSpent / campaign.budgetTotal) * 100;
            return (
              <TableRow key={campaign.id}>
                <TableCell>
                  <div className="font-medium">{campaign.name}</div>
                  <div className="text-sm text-muted-foreground">{campaign.platform}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[campaign.status]}>{campaign.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{`R$${campaign.budgetSpent.toLocaleString('pt-BR')}`}</span>
                    <span className="text-xs text-muted-foreground">{`de R$${campaign.budgetTotal.toLocaleString('pt-BR')}`}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                    <div className="font-medium">{campaign.clicks.toLocaleString('pt-BR')}</div>
                    <Progress value={budgetPercentage} className="h-2 mt-1" />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
};
