declare global {
  interface Window {
    electronAPI?: {
      getStoreValue: (key: string) => Promise<any>;
      setStoreValue: (key: string, value: any) => Promise<boolean>;
      checkForUpdates: () => Promise<void>;
      installUpdate: () => Promise<void>;
      onUpdateStatus: (callback: (status: any) => void) => void;
      scheduleMessage: (id: string, cron: string, message: string, chatId: string) => Promise<{success: boolean, error?: string}>;
      cancelScheduledMessage: (id: string) => Promise<{success: boolean, error?: string}>;
      getScheduledMessages: () => Promise<any[]>;
      onScheduledMessage: (callback: (data: any) => void) => void;
    };
  }
}

export {};