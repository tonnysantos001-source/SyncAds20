import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChatPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Chat IA</h1>
      <Card>
        <CardHeader>
          <CardTitle>Página de Chat IA</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A interface do Chat IA será implementada aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;
