import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ScheduledMessage {
  id: string;
  cronExpression: string;
  message: string;
  chatId: string;
  enabled: boolean;
}

interface Group {
  id: string;
  name: string;
  members: number;
  avatar: string;
  lastActivity: string;
}

interface Bot {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  commands: string[];
}

interface AppState {
  isConnected: boolean;
  messages: Message[];
  scheduledMessages: ScheduledMessage[];
  groups: Group[];
  bots: Bot[];
  updateStatus: any;
  setConnected: (v: boolean) => void;
  addMessage: (m: Message) => void;
  setMessages: (m: Message[]) => void;
  setScheduledMessages: (s: ScheduledMessage[]) => void;
  setGroups: (g: Group[]) => void;
  setBots: (b: Bot[]) => void;
  setUpdateStatus: (s: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isConnected: true,
  messages: [
    { id: '1', role: 'ai', content: 'Привет! Я Mira — твой AI-ассистент. Чем могу помочь?', timestamp: new Date() }
  ],
  scheduledMessages: [],
  groups: [
    { id: '1', name: 'Команда разработки', members: 24, avatar: '👨‍💻', lastActivity: '2 часа назад' },
    { id: '2', name: 'Маркетинг', members: 18, avatar: '📢', lastActivity: 'Вчера' },
    { id: '3', name: 'Поддержка клиентов', members: 12, avatar: '💬', lastActivity: '5 часов назад' }
  ],
  bots: [
    { id: '1', name: 'Mira Bot', status: 'active', commands: ['/help', '/status', '/stats'] },
    { id: '2', name: 'Assistant Bot', status: 'active', commands: ['/ask', '/info'] }
  ],
  updateStatus: null,
  setConnected: (v) => set({ isConnected: v }),
  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
  setMessages: (m) => set({ messages: m }),
  setScheduledMessages: (s) => set({ scheduledMessages: s }),
  setGroups: (g) => set({ groups: g }),
  setBots: (b) => set({ bots: b }),
  setUpdateStatus: (s) => set({ updateStatus: s })
}));