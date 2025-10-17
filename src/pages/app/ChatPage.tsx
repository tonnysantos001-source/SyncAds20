import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Paperclip, Send, User, Bot, PanelLeftClose, PanelLeftOpen, Trash2 } from 'lucide-react';
import Textarea from 'react-textarea-autosize';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const quickSuggestions = [
  "Criar campanha de Facebook Ads",
  "Analisar performance da última semana",
  "Sugerir otimizações"
];

const MAX_CHARS = 500;

const ChatPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { 
    addMessage, 
    conversations, 
    activeConversationId, 
    setActiveConversationId,
    isAssistantTyping,
    setAssistantTyping,
    deleteConversation,
  } = useStore();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [activeConversation?.messages, isAssistantTyping]);

  const handleSend = () => {
    if (input.trim() === '' || !activeConversationId || input.length > MAX_CHARS) return;

    addMessage(activeConversationId, { id: `msg-${Date.now()}`, role: 'user', content: input });
    setInput('');
    
    setAssistantTyping(true);
    setTimeout(() => {
      addMessage(activeConversationId, { id: `msg-${Date.now() + 1}`, role: 'assistant', content: 'Esta é uma resposta simulada do assistente de IA.' });
      setAssistantTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Arquivo Selecionado",
        description: `O arquivo "${file.name}" está pronto para ser enviado (simulação).`,
        variant: "info",
      });
    }
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleDeleteConversation = (id: string) => {
    deleteConversation(id);
    toast({
        title: "Conversa Apagada",
        description: "A conversa foi removida do seu histórico.",
        variant: "destructive",
    });
  };

  return (
    <div className="flex h-full">
      {/* Conversations Sidebar */}
      <Card className={cn("transition-all duration-300 ease-in-out hidden sm:block border-0", sidebarOpen ? "w-1/4 min-w-[250px]" : "w-0 min-w-0 opacity-0")}>
        <CardContent className="p-2 h-full overflow-y-auto">
          <h2 className="text-lg font-semibold p-2">Conversas</h2>
          <div className="space-y-1">
            {conversations.map(conv => (
              <div key={conv.id} className="group relative">
                <Button
                  variant={activeConversationId === conv.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start truncate pr-8"
                  onClick={() => setActiveConversationId(conv.id)}
                >
                  {conv.title}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Apagar conversa?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem a certeza que quer apagar a conversa "{conv.title}"? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={() => handleDeleteConversation(conv.id)}
                      >
                        Apagar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col sm:pl-4 h-full">
        <Card className="flex-1 flex flex-col overflow-hidden rounded-none sm:rounded-2xl border-0">
          <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="absolute top-20 left-2 hidden sm:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{sidebarOpen ? 'Fechar painel' : 'Abrir painel'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {activeConversation ? (
              <>
                {activeConversation.messages.map((message) => (
                  <div key={message.id} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot size={18} /></AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-2xl p-3 max-w-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback><User size={18} /></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isAssistantTyping && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot size={18} /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-2xl p-3 bg-muted flex items-center space-x-1">
                      <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-foreground rounded-full animate-bounce"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Selecione ou crie uma conversa para começar.</p>
              </div>
            )}
          </div>
          
          <div className="p-2 sm:p-4 border-t bg-card/50 backdrop-blur-sm">
            <div className="hidden sm:flex gap-2 mb-2">
              {quickSuggestions.map(s => (
                <Button key={s} variant="outline" size="sm" onClick={() => handleSuggestionClick(s)}>
                  {s}
                </Button>
              ))}
            </div>
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Digite sua mensagem..."
                className="w-full resize-none rounded-lg border bg-background p-3 pr-24 min-h-[48px]"
                minRows={1}
                maxRows={5}
                maxLength={MAX_CHARS}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                <Button type="button" size="icon" variant="ghost" onClick={handleAttachClick}>
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button type="submit" size="icon" onClick={handleSend} disabled={input.trim() === ''}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
             <p className={cn("text-xs text-right mt-1", input.length > MAX_CHARS ? "text-destructive" : "text-muted-foreground")}>
                {input.length} / {MAX_CHARS}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
