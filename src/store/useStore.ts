import { create } from 'zustand';
import { integrations as allIntegrations, ChatConversation, ChatMessage, chatConversations as initialConversations } from '@/data/mocks';

type IntegrationId = typeof allIntegrations[number]['id'];

interface AppState {
  // Integrations
  connectedIntegrations: Set<IntegrationId>;
  toggleIntegration: (id: IntegrationId, connect: boolean) => void;

  // Chat
  conversations: ChatConversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
  isAssistantTyping: boolean;
  setAssistantTyping: (isTyping: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Integrations
  connectedIntegrations: new Set(['google-analytics', 'github']),
  toggleIntegration: (id, connect) => set((state) => {
    const newSet = new Set(state.connectedIntegrations);
    if (connect) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    return { connectedIntegrations: newSet };
  }),

  // Chat
  conversations: initialConversations,
  activeConversationId: initialConversations.length > 0 ? initialConversations[0].id : null,
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  addMessage: (conversationId, message) => set((state) => {
    const newConversations = state.conversations.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, messages: [...conv.messages, message] };
      }
      return conv;
    });
    return { conversations: newConversations };
  }),
  isAssistantTyping: false,
  setAssistantTyping: (isTyping) => set({ isAssistantTyping: isTyping }),
}));
