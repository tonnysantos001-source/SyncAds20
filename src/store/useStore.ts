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
  plan: 'Free' | 'Pro' | 'Enterprise';
}

export interface NotificationSettings {
  emailSummary: boolean;
  emailAlerts: boolean;
  emailNews: boolean;
  pushMentions: boolean;
  pushIntegrations: boolean;
  pushSuggestions: boolean;
}

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  login: (user: Omit<User, 'plan'>) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;

  // Global Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Integrations
  connectedIntegrations: IntegrationId[];
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

  // Settings
  aiSystemPrompt: string;
  setAiSystemPrompt: (prompt: string) => void;
  isTwoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
}

const initialNotificationSettings: NotificationSettings = {
  emailSummary: true,
  emailAlerts: true,
  emailNews: false,
  pushMentions: true,
  pushIntegrations: false,
  pushSuggestions: true,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      isAuthenticated: false,
      user: null,
      login: (userData) => set({ isAuthenticated: true, user: { ...userData, plan: 'Pro' } }),
      logout: () => {
        set({ 
          isAuthenticated: false, 
          user: null, 
          campaigns: initialCampaigns,
          apiKeys: initialApiKeys,
          conversations: initialConversations,
          connectedIntegrations: ['google-analytics', 'github'],
          searchTerm: '',
          isTwoFactorEnabled: false,
          notificationSettings: initialNotificationSettings,
        });
      },
      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null
      })),

      // Global Search
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),

      // Integrations
      connectedIntegrations: ['google-analytics', 'github'],
      toggleIntegration: (id, connect) => set((state) => {
        const currentIntegrations = Array.isArray(state.connectedIntegrations) ? state.connectedIntegrations : [];
        if (connect) {
          if (!currentIntegrations.includes(id)) {
            return { connectedIntegrations: [...currentIntegrations, id] };
          }
        } else {
          return { connectedIntegrations: currentIntegrations.filter(i => i !== id) };
        }
        return {}; // No change
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

      // Settings
      aiSystemPrompt: 'Você é o SyncAds AI, um assistente de marketing digital especializado em otimização de campanhas. Seja proativo, criativo e forneça insights baseados em dados. Suas respostas devem ser claras, concisas e sempre focadas em ajudar o usuário a atingir seus objetivos de marketing.',
      setAiSystemPrompt: (prompt) => set({ aiSystemPrompt: prompt }),
      isTwoFactorEnabled: false,
      setTwoFactorEnabled: (enabled) => set({ isTwoFactorEnabled: enabled }),
      notificationSettings: initialNotificationSettings,
      updateNotificationSettings: (settings) => set(state => ({
        notificationSettings: { ...state.notificationSettings, ...settings }
      })),
    }),
    {
      name: 'marketing-ai-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        connectedIntegrations: state.connectedIntegrations,
        aiSystemPrompt: state.aiSystemPrompt,
        isTwoFactorEnabled: state.isTwoFactorEnabled,
        notificationSettings: state.notificationSettings,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (!state.campaigns) state.campaigns = initialCampaigns;
          if (!state.apiKeys) state.apiKeys = initialApiKeys;
          if (!state.conversations) state.conversations = initialConversations;
          if (!Array.isArray(state.connectedIntegrations)) {
            state.connectedIntegrations = ['google-analytics', 'github'];
          }
          if (!state.notificationSettings) {
            state.notificationSettings = initialNotificationSettings;
          }
        }
      },
    }
  )
);
