import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
      <Card>
        <CardHeader>
          <CardTitle>Página de Configurações</CardTitle>
        </CardHeader>
        <CardContent>
          <p>As abas de configurações (Perfil, Segurança, etc.) serão implementadas aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
