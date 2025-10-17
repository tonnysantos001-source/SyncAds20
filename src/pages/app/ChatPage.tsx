import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Paperclip, Send, User, Bot, CornerDownLeft, Loader2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Textarea from 'react-textarea-autosize';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const quickSuggestions = [
  "Criar campanha de Facebook Ads",
  "Analisar performance da última semana",
  "Sugerir otimizações"
];

const ChatPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const addMessage = useStore((state) => state.addMessage);
  const conversations = useStore((state) => state.conversations);
  const activeConversationId = useStore((state) => state.activeConversationId);
  const setActiveConversationId = useStore((s) => s.setActiveConversationId);
  const isAssistantTyping = useStore(s => s.isAssistantTyping);
  const setAssistantTyping = useStore(s => s.setAssistantTyping);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [activeConversation?.messages, isAssistantTyping]);

  const handleSend = () => {
    if (input.trim() === '' || !activeConversationId) return;

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

  return (
    <div className="flex h-[calc(100vh-100px)]">
      {/* Conversations Sidebar */}
      <Card className={cn("transition-all duration-300 ease-in-out", sidebarOpen ? "w-1/4 min-w-[250px]" : "w-0 min-w-0 opacity-0")}>
        <CardContent className="p-2 h-full overflow-y-auto">
          <h2 className="text-lg font-semibold p-2">Conversas</h2>
          <div className="space-y-1">
            {conversations.map(conv => (
              <Button
                key={conv.id}
                variant={activeConversationId === conv.id ? 'secondary' : 'ghost'}
                className="w-full justify-start truncate"
                onClick={() => setActiveConversationId(conv.id)}
              >
                {conv.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col pl-4">
        <Card className="flex-1 flex flex-col">
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            <Button variant="ghost" size="icon" className="absolute top-20 left-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
            </Button>
            {activeConversation ? (
              <>
                {activeConversation.messages.map((message) => (
                  <div key={message.id} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot size={18} /></AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg p-3 max-w-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="text-sm">{message.content}</p>
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
                    <div className="rounded-lg p-3 bg-muted flex items-center space-x-1">
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
                <p>Selecione uma conversa para começar.</p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2 mb-2">
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
                placeholder="Digite sua mensagem ou use 'Shift + Enter' para uma nova linha..."
                className="w-full resize-none rounded-lg border p-2 pr-28 min-h-[40px]"
                minRows={1}
                maxRows={5}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button type="button" size="icon" variant="ghost">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button type="submit" size="icon" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
