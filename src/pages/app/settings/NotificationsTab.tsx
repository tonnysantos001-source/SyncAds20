import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const NotificationItem: React.FC<{ title: string; description: string; defaultChecked?: boolean }> = ({ title, description, defaultChecked }) => (
  <div className="flex items-start justify-between space-x-4">
    <div className="space-y-0.5">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Switch defaultChecked={defaultChecked} />
  </div>
);

export const NotificationsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificações</CardTitle>
        <CardDescription>Gerencie como você recebe notificações.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold">Notificações por Email</h4>
          <NotificationItem title="Resumos Semanais" description="Receba um resumo do desempenho de suas campanhas toda semana." defaultChecked />
          <NotificationItem title="Alertas de Campanha" description="Seja notificado sobre problemas ou conclusões de campanhas." defaultChecked />
          <NotificationItem title="Notícias e Atualizações" description="Receba emails sobre novidades e atualizações da plataforma." />
        </div>
        <Separator />
        <div className="space-y-4">
          <h4 className="font-semibold">Notificações Push</h4>
          <NotificationItem title="Menções no Chat" description="Receba uma notificação quando for mencionado no chat." defaultChecked />
          <NotificationItem title="Conexões de Integração" description="Seja notificado sobre o status de suas integrações." />
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Salvar Preferências</Button>
      </CardFooter>
    </Card>
  );
};
