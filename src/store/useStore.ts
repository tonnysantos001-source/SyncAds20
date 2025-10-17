import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { 
  integrations as allIntegrations, 
  ChatConversation, 
  ChatMessage, 
  chatConversations as initialConversations,
  Campaign,
  ApiKey,
  allCampaigns as initialCampaigns,
  apiKeysData as initialApiKeys,
} from '@/data/mocks';
import { v4 as uuidv4 } from 'uuid';

type IntegrationId = typeof allIntegrations[number]['id'];

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;

  // Global Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;

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

  // Campaigns
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (id: string, campaignData: Partial<Campaign>) => void;
  updateCampaignStatus: (id: string, status: Campaign['status']) => void;
  deleteCampaign: (id: string) => void;

  // API Keys
  apiKeys: ApiKey[];
  addApiKey: () => string;
  deleteApiKey: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      isAuthenticated: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => {
        set({ 
          isAuthenticated: false, 
          user: null, 
          campaigns: initialCampaigns,
          apiKeys: initialApiKeys,
          connectedIntegrations: new Set(['google-analytics', 'github']),
          searchTerm: '',
        });
      },
      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null
      })),

      // Global Search
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),

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

      // Campaigns
      campaigns: initialCampaigns,
      addCampaign: (campaignData) => set((state) => ({
        campaigns: [{ id: `CAM-${uuidv4().slice(0,4)}`, ...campaignData } as Campaign, ...state.campaigns],
      })),
      updateCampaign: (id, campaignData) => set(state => ({
        campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...campaignData } : c),
      })),
      updateCampaignStatus: (id, status) => set((state) => ({
        campaigns: state.campaigns.map(c => c.id === id ? { ...c, status } : c),
      })),
      deleteCampaign: (id) => set((state) => ({
        campaigns: state.campaigns.filter(c => c.id !== id),
      })),

      // API Keys
      apiKeys: initialApiKeys,
      addApiKey: () => {
        const newKey = `sk_live_${uuidv4().replace(/-/g, '')}`;
        const newApiKey: ApiKey = {
          id: `key-${uuidv4()}`,
          key: newKey,
          createdAt: new Date().toLocaleDateString('pt-BR'),
          lastUsed: 'Nunca',
        };
        set((state) => ({ apiKeys: [newApiKey, ...state.apiKeys] }));
        return newKey;
      },
      deleteApiKey: (id) => set((state) => ({
        apiKeys: state.apiKeys.filter(key => key.id !== id),
      })),
    }),
    {
      name: 'marketing-ai-storage',
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) => {
        const state = { ...currentState, ...(persistedState as object) };
        if ((persistedState as AppState)?.connectedIntegrations) {
          state.connectedIntegrations = new Set((persistedState as AppState).connectedIntegrations);
        }
        return state;
      },
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        connectedIntegrations: state.connectedIntegrations,
      }),
    }
  )
);
