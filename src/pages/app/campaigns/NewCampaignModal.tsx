import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, CheckCircle, Circle, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

interface NewCampaignModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, name: 'Detalhes' },
  { id: 2, name: 'Orçamento' },
  { id: 3, name: 'Público' },
  { id: 4, name: 'Revisão' },
];

export const NewCampaignModal: React.FC<NewCampaignModalProps> = ({ isOpen, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Form state
  const [campaignName, setCampaignName] = useState('');
  const [objective, setObjective] = useState('');
  const [platform, setPlatform] = useState('');
  const [dailyBudget, setDailyBudget] = useState('');
  const [totalBudget, setTotalBudget] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [targetCountry, setTargetCountry] = useState('Brasil');
  const [targetAge, setTargetAge] = useState('18-65+');
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState('');


  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  
  const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && interestInput.trim() !== '') {
      e.preventDefault();
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (indexToRemove: number) => {
    setInterests(interests.filter((_, index) => index !== indexToRemove));
  };


  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onOpenChange(false);
      toast({
        title: "Campanha Criada com Sucesso!",
        description: `A campanha "${campaignName}" foi salva e está pronta para ser lançada.`,
        variant: "default",
      });
      // Reset state after closing
      setTimeout(() => {
        setCurrentStep(1);
        setCampaignName('');
        // ... reset other fields
      }, 300);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Campanha</DialogTitle>
          <DialogDescription>Siga os passos para configurar sua nova campanha de marketing.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between my-4 px-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                    currentStep > step.id ? 'bg-primary text-primary-foreground' :
                    currentStep === step.id ? 'bg-primary/20 border-2 border-primary text-primary' :
                    'bg-muted text-muted-foreground'
                  )}
                >
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : <span className="font-bold">{step.id}</span>}
                </div>
                <p className={cn("text-xs mt-1", currentStep >= step.id ? "text-foreground" : "text-muted-foreground")}>{step.name}</p>
              </div>
              {index < steps.length - 1 && <div className="flex-1 h-0.5 bg-border" />}
            </React.Fragment>
          ))}
        </div>

        <div className="space-y-4 py-4 min-h-[250px]">
          {currentStep === 1 && (
            <div className="grid gap-4 px-4">
              <div className="grid gap-2">
                <Label htmlFor="campaign-name">Nome da Campanha</Label>
                <Input id="campaign-name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="Ex: Lançamento de Inverno" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="objective">Objetivo</Label>
                <Select value={objective} onValueChange={setObjective}>
                  <SelectTrigger><SelectValue placeholder="Selecione um objetivo" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conversions">Conversões</SelectItem>
                    <SelectItem value="traffic">Tráfego</SelectItem>
                    <SelectItem value="brand-awareness">Reconhecimento de Marca</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="platform">Plataforma</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger><SelectValue placeholder="Selecione uma plataforma" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Google Ads">Google Ads</SelectItem>
                    <SelectItem value="Meta">Meta (Facebook/Instagram)</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="grid gap-4 px-4">
               <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="daily-budget">Orçamento Diário (R$)</Label>
                  <Input id="daily-budget" type="number" value={dailyBudget} onChange={e => setDailyBudget(e.target.value)} placeholder="50.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="total-budget">Orçamento Total (R$)</Label>
                  <Input id="total-budget" type="number" value={totalBudget} onChange={e => setTotalBudget(e.target.value)} placeholder="1000.00" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Período da Campanha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y", { locale: ptBR })} -{' '}
                            {format(dateRange.to, "LLL dd, y", { locale: ptBR })}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y", { locale: ptBR })
                        )
                      ) : (
                        <span>Escolha um período</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="grid gap-4 px-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="country">País</Label>
                  <Select value={targetCountry} onValueChange={setTargetCountry}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Brasil">Brasil</SelectItem>
                      <SelectItem value="Portugal">Portugal</SelectItem>
                      <SelectItem value="EUA">Estados Unidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="age">Idade</Label>
                  <Select value={targetAge} onValueChange={setTargetAge}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-24">18-24</SelectItem>
                      <SelectItem value="25-34">25-34</SelectItem>
                      <SelectItem value="35-44">35-44</SelectItem>
                      <SelectItem value="45+">45+</SelectItem>
                      <SelectItem value="18-65+">Todos (18-65+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="interests">Interesses</Label>
                <Input id="interests" value={interestInput} onChange={e => setInterestInput(e.target.value)} onKeyDown={handleAddInterest} placeholder="Digite um interesse e pressione Enter" />
                <div className="flex flex-wrap gap-2 mt-2">
                  {interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="pr-1">
                      {interest}
                      <button onClick={() => removeInterest(index)} className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          {currentStep === 4 && (
             <div className="space-y-4 px-4 text-sm">
                <h4 className="font-semibold text-base mb-2">Revise os detalhes da sua campanha</h4>
                <div className="p-4 rounded-lg border bg-muted/50 space-y-3">
                    <p><strong>Nome:</strong> {campaignName || "Não definido"}</p>
                    <p><strong>Objetivo:</strong> {objective || "Não definido"}</p>
                    <p><strong>Plataforma:</strong> {platform || "Não definido"}</p>
                    <p><strong>Orçamento:</strong> R${dailyBudget} (diário) / R${totalBudget} (total)</p>
                    <p><strong>Período:</strong> {dateRange.from ? `${format(dateRange.from, "P", { locale: ptBR })} até ${dateRange.to ? format(dateRange.to, "P", { locale: ptBR }) : 'Indefinido'}` : "Não definido"}</p>
                    <p><strong>Público:</strong> {targetCountry}, {targetAge} anos</p>
                    <p><strong>Interesses:</strong> {interests.join(', ') || "Nenhum"}</p>
                </div>
                <p className="text-xs text-muted-foreground">Ao clicar em "Salvar Campanha", você confirma que todos os detalhes estão corretos.</p>
             </div>
          )}
        </div>

        <DialogFooter>
          {currentStep > 1 && <Button variant="outline" onClick={handleBack}>Voltar</Button>}
          {currentStep < steps.length && <Button onClick={handleNext}>Próximo</Button>}
          {currentStep === steps.length && (
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Campanha
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
