import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { apiKeysData } from '@/data/mocks';
import { Copy, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const ApiKeysTab: React.FC = () => {
  const { toast } = useToast();

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: "Chave de API copiada!" });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Chaves de API</CardTitle>
          <CardDescription>Gerencie suas chaves de API para integrações personalizadas.</CardDescription>
        </div>
        <Button>Gerar Nova Chave</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chave (início)</TableHead>
              <TableHead>Criada em</TableHead>
              <TableHead>Último Uso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeysData.map((apiKey) => (
              <TableRow key={apiKey.id}>
                <TableCell className="font-mono">{apiKey.key.substring(0, 15)}...</TableCell>
                <TableCell>{apiKey.createdAt}</TableCell>
                <TableCell>{apiKey.lastUsed}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(apiKey.key)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <p className="text-xs text-muted-foreground">
          Lembre-se de armazenar suas chaves de API com segurança. Elas não serão mostradas novamente.
        </p>
      </CardFooter>
    </Card>
  );
};
