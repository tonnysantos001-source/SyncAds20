import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const IntegrationsPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Integrações</h1>
      <Card>
        <CardHeader>
          <CardTitle>Página de Integrações</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A grade de integrações será implementada aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsPage;
