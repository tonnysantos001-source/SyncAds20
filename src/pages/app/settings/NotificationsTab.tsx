import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const NotificationItem: React.FC<{ title: string; description: string; defaultChecked?: boolean }> = ({ title, description, defaultChecked }) => (
  <div className="flex items-center justify-between space-x-4">
    <div className="space-y-0.5">
      <Label className="font-medium">{title}</Label>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Switch defaultChecked={defaultChecked} />
  </div>
);

const CheckboxNotificationItem: React.FC<{ id: string; title: string; defaultChecked?: boolean }> = ({ id, title, defaultChecked }) => (
  <div className="flex items-center space-x-2">
    <Checkbox id={id} defaultChecked={defaultChecked} />
    <Label htmlFor={id} className="text-sm font-normal">
      {title}
    </Label>
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
          <div className="p-4 border rounded-lg space-y-4">
            <CheckboxNotificationItem id="email-summary" title="Resumos Semanais de Desempenho" defaultChecked />
            <CheckboxNotificationItem id="email-alerts" title="Alertas Críticos de Campanha" defaultChecked />
            <CheckboxNotificationItem id="email-news" title="Notícias e Atualizações da Plataforma" />
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <h4 className="font-semibold">Notificações Push</h4>
           <div className="p-4 border rounded-lg space-y-4">
            <CheckboxNotificationItem id="push-mentions" title="Menções no Chat IA" defaultChecked />
            <CheckboxNotificationItem id="push-integrations" title="Status de Conexão de Integrações" />
            <CheckboxNotificationItem id="push-suggestions" title="Novas Sugestões da IA" defaultChecked />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Salvar Preferências</Button>
      </CardFooter>
    </Card>
  );
};
