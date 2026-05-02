import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('electronAPI', {
  getStoreValue: (k: string) => ipcRenderer.invoke('get-store-value', k),
  setStoreValue: (k: string, v: any) => ipcRenderer.invoke('set-store-value', k, v),
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  installUpdate: () => ipcRenderer.invoke('install-update'),
  onUpdateStatus: (cb: (s: any) => void) => ipcRenderer.on('update-status', (_, s) => cb(s)),
  scheduleMessage: (id: string, cron: string, msg: string, chatId: string) => ipcRenderer.invoke('schedule-message', id, cron, msg, chatId),
  cancelScheduledMessage: (id: string) => ipcRenderer.invoke('cancel-scheduled-message', id),
  getScheduledMessages: () => ipcRenderer.invoke('get-scheduled-messages'),
  onScheduledMessage: (cb: (d: any) => void) => ipcRenderer.on('scheduled-message', (_, d) => cb(d))
});