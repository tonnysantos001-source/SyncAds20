import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, BarChart3, Target, Zap, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <Card className="text-center">
    <CardHeader>
      <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
        <Icon className="h-8 w-8" />
      </div>
      <CardTitle className="mt-4">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link to="/" className="flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">Marketing AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Login
          </Link>
          <Button asChild>
            <Link to="/register">Começar Agora</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                O Futuro do Marketing é Inteligente
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Nossa plataforma de IA automatiza suas campanhas, analisa dados em tempo real e otimiza seu ROI. Foque na estratégia, nós cuidamos do resto.
              </p>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link to="/register">Teste Grátis por 14 dias</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="#">Ver Demonstração</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Nossos Recursos</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tudo que você precisa para escalar</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  De automação de campanhas a insights profundos, nossa plataforma foi construída para performance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <FeatureCard 
                icon={Zap}
                title="Automação Inteligente"
                description="Crie, gerencie e otimize campanhas em múltiplas plataformas com o poder da nossa IA."
              />
              <FeatureCard 
                icon={BarChart3}
                title="Analytics Avançado"
                description="Tenha uma visão unificada de todas as suas métricas e receba insights acionáveis."
              />
              <FeatureCard 
                icon={Target}
                title="Otimização de ROI"
                description="Nossos algoritmos trabalham 24/7 para garantir que seu orçamento seja investido da forma mais eficiente possível."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2025 Marketing AI Inc. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Termos de Serviço
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
