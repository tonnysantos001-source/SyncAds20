import { Link } from 'react-router-dom';
import { Bot, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Bot className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Marketing AI</h1>
          </div>
          <CardTitle className="text-2xl">Esqueceu sua senha?</CardTitle>
          <CardDescription>
            Sem problemas. Insira seu email e enviaremos um link para redefinir sua senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="nome@exemplo.com" required />
            </div>
            <Button type="submit" className="w-full">
              Enviar link de redefinição
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            <Link to="/login" className="underline flex items-center justify-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
