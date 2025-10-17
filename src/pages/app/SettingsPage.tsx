import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from './settings/ProfileTab';
import { SecurityTab } from './settings/SecurityTab';
import { NotificationsTab } from './settings/NotificationsTab';
import { BillingTab } from './settings/BillingTab';
import { ApiKeysTab } from './settings/ApiKeysTab';
import { cn } from '@/lib/utils';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da sua conta e preferências.</p>
      </div>
      <Tabs defaultValue="profile" orientation="vertical" className="flex flex-col md:flex-row gap-8">
        <TabsList className="flex flex-row md:flex-col items-start h-auto w-full md:w-1/5 shrink-0 bg-transparent p-0 gap-1">
          <TabsTrigger value="profile" className={cn("w-full justify-start")}>Perfil</TabsTrigger>
          <TabsTrigger value="security" className={cn("w-full justify-start")}>Segurança</TabsTrigger>
          <TabsTrigger value="notifications" className={cn("w-full justify-start")}>Notificações</TabsTrigger>
          <TabsTrigger value="billing" className={cn("w-full justify-start")}>Faturamento</TabsTrigger>
          <TabsTrigger value="api-keys" className={cn("w-full justify-start")}>Chaves de API</TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="profile" className="mt-0"><ProfileTab /></TabsContent>
          <TabsContent value="security" className="mt-0"><SecurityTab /></TabsContent>
          <TabsContent value="notifications" className="mt-0"><NotificationsTab /></TabsContent>
          <TabsContent value="billing" className="mt-0"><BillingTab /></TabsContent>
          <TabsContent value="api-keys" className="mt-0"><ApiKeysTab /></TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
