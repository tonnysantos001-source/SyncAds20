import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Trash2, PlusCircle, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useStore } from '@/store/useStore';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export const ApiKeysTab: React.FC = () => {
  const { toast } = useToast();
  const { apiKeys, addApiKey, deleteApiKey } = useStore();
  const [newKey, setNewKey] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: "Chave de API copiada!" });
  };
  
  const handleCopyNewKey = () => {
    if (!newKey) return;
    navigator.clipboard.writeText(newKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleGenerate = () => {
    const generatedKey = addApiKey();
    setNewKey(generatedKey);
  };

  const handleRevoke = (id: string) => {
    deleteApiKey(id);
    toast({
      title: "Chave de API revogada",
      description: "A chave de API foi revogada e não pode mais ser usada.",
      variant: "destructive",
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Chaves de API</CardTitle>
            <CardDescription>Gerencie suas chaves de API para integrações personalizadas.</CardDescription>
          </div>
          <Button onClick={handleGenerate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Gerar Nova Chave
          </Button>
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
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-mono">{apiKey.key.substring(0, 15)}...</TableCell>
                  <TableCell>{apiKey.createdAt}</TableCell>
                  <TableCell>{apiKey.lastUsed}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleCopy(apiKey.key)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Revogar chave de API?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. A chave será permanentemente deletada.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRevoke(apiKey.id)} className="bg-destructive hover:bg-destructive/90">Revogar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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

      <Dialog open={!!newKey} onOpenChange={(open) => !open && setNewKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Chave de API Gerada</DialogTitle>
            <DialogDescription>
              Copie sua nova chave de API. Por segurança, ela não será mostrada novamente.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 my-4">
            <pre className="flex-1 p-3 bg-muted rounded-md overflow-x-auto text-sm font-mono">{newKey}</pre>
            <Button size="icon" variant="outline" onClick={handleCopyNewKey}>
              {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Button className="w-full" onClick={() => setNewKey(null)}>Feito</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
