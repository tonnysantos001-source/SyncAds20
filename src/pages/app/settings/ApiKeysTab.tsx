import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useStore, AiConnection } from '@/store/useStore';
import { PlusCircle, Edit, Trash2, TestTube2, MoreVertical, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AiConnectionModal } from './AiConnectionModal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { EmptyState } from '@/components/EmptyState';

const statusConfig = {
  untested: { text: 'Não testada', icon: HelpCircle, variant: 'secondary' as const },
  valid: { text: 'Válida', icon: CheckCircle, variant: 'success' as const },
  invalid: { text: 'Inválida', icon: XCircle, variant: 'destructive' as const },
};

const ConnectionCard: React.FC<{ connection: AiConnection }> = ({ connection }) => {
  const { toast } = useToast();
  const { updateAiConnection, removeAiConnection } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleTest = () => {
    setIsTesting(true);
    updateAiConnection(connection.id, { status: 'untested' });
    setTimeout(() => {
      const isValid = Math.random() > 0.3; // Simulate API call
      updateAiConnection(connection.id, { status: isValid ? 'valid' : 'invalid' });
      setIsTesting(false);
      toast({
        title: isValid ? 'Conexão Válida!' : 'Falha no Teste',
        description: isValid ? `A conexão com "${connection.name}" foi bem-sucedida.` : 'Verifique sua chave de API e URL base.',
        variant: isValid ? 'success' : 'destructive',
      });
    }, 1500);
  };

  const status = statusConfig[connection.status];

  return (
    <>
      <AiConnectionModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        connection={connection}
      />
      <div className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1 overflow-hidden">
          <h3 className="font-semibold text-lg truncate">{connection.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            URL Base: {connection.baseUrl || 'Padrão (OpenAI)'}
          </p>
          <p className="text-sm text-muted-foreground font-mono">
            Chave: ••••••••••••{connection.apiKey.slice(-4)}
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center">
          <Badge variant={status.variant}>
            <status.icon className="h-3 w-3 mr-1" />
            {status.text}
          </Badge>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleTest} disabled={isTesting}>
                  <TestTube2 className="mr-2 h-4 w-4" />
                  {isTesting ? 'Testando...' : 'Testar Conexão'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remover
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso removerá permanentemente a conexão "{connection.name}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => removeAiConnection(connection.id)} variant="destructive">
                  Remover
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
};

export const ApiKeysTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const connections = useStore(state => state.aiConnections);

  return (
    <>
      <AiConnectionModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Conexões de IA</CardTitle>
            <CardDescription>
              Adicione e gerencie suas chaves de API para modelos de linguagem.
            </CardDescription>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Conexão
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {connections.length > 0 ? (
            connections.map(conn => <ConnectionCard key={conn.id} connection={conn} />)
          ) : (
            <EmptyState
              icon={PlusCircle}
              title="Nenhuma conexão de IA"
              description="Adicione sua primeira chave de API de IA para começar a usar os recursos inteligentes da plataforma."
              action={
                <Button onClick={() => setIsModalOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Primeira Conexão
                </Button>
              }
            />
          )}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Suas chaves de API são armazenadas de forma segura no seu navegador e nunca são enviadas para nossos servidores.
          </p>
        </CardFooter>
      </Card>
    </>
  );
};
