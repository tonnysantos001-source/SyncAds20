import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const ProfileTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
        <CardDescription>Atualize seu avatar e detalhes do perfil.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <Label htmlFor="picture">Avatar</Label>
            <Input id="picture" type="file" className="w-full" />
            <p className="text-xs text-muted-foreground">PNG, JPG, GIF até 10MB</p>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" defaultValue="Usuário Teste" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="usuario@email.com" />
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Salvar Alterações</Button>
      </CardFooter>
    </Card>
  );
};
