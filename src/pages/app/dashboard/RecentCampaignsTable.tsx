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
import { recentCampaigns, Campaign } from '@/data/mocks';

const statusVariantMap: Record<Campaign['status'], 'success' | 'warning' | 'default'> = {
  'Ativa': 'success',
  'Pausada': 'warning',
  'Concluída': 'default',
};

export const RecentCampaignsTable: React.FC = () => {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campanha</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Conversões</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentCampaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>
                <div className="font-medium">{campaign.name}</div>
                <div className="text-sm text-muted-foreground">{campaign.platform}</div>
              </TableCell>
              <TableCell>
                <Badge variant={statusVariantMap[campaign.status]}>{campaign.status}</Badge>
              </TableCell>
              <TableCell className="text-right">{campaign.conversions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
