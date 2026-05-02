import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import * as path from 'path';
import Store from 'electron-store';
import * as cron from 'node-cron';

log.transports.file.level = 'info';
log.transports.console.level = 'debug';
autoUpdater.logger = log;
const store = new Store();
let mainWindow: BrowserWindow | null = null;
let scheduledTasks: Map<string, cron.ScheduledTask> = new Map();
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400, height: 900, minWidth: 1000, minHeight: 700,
    webPreferences: { nodeIntegration: false, contextIsolation: true, preload: path.join(__dirname, 'preload.js') },
    title: 'Mira Agent', backgroundColor: '#0f0f23', show: false
  });
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
  mainWindow.once('ready-to-show', () => { mainWindow?.show(); log.info('Application started'); });
  mainWindow.on('closed', () => { mainWindow = null; });
}
autoUpdater.on('checking-for-update', () => mainWindow?.webContents.send('update-status', { status: 'checking' }));
autoUpdater.on('update-available', (info) => mainWindow?.webContents.send('update-status', { status: 'available', version: info.version }));
autoUpdater.on('update-not-available', () => mainWindow?.webContents.send('update-status', { status: 'not-available' }));
autoUpdater.on('download-progress', (p) => mainWindow?.webContents.send('update-status', { status: 'downloading', percent: p.percent }));
autoUpdater.on('update-downloaded', (info) => {
  mainWindow?.webContents.send('update-status', { status: 'downloaded', version: info.version });
  dialog.showMessageBox(mainWindow!, { type: 'info', title: 'Update Ready', message: 'Restart to apply?', buttons: ['Restart', 'Later'] }).then(r => { if (r.response === 0) autoUpdater.quitAndInstall(); });
});
autoUpdater.on('error', (e) => mainWindow?.webContents.send('update-status', { status: 'error', error: e.message }));
ipcMain.handle('get-store-value', (_, k) => store.get(k));
ipcMain.handle('set-store-value', (_, k, v) => { store.set(k, v); return true; });
ipcMain.handle('check-for-updates', () => autoUpdater.checkForUpdates());
ipcMain.handle('install-update', () => autoUpdater.quitAndInstall());
ipcMain.handle('schedule-message', (_, id, cronExpr, msg, chatId) => {
  try {
    if (scheduledTasks.has(id)) { scheduledTasks.get(id)?.stop(); scheduledTasks.delete(id); }
    const task = cron.schedule(cronExpr, () => mainWindow?.webContents.send('scheduled-message', { id, message: msg, chatId }));
    scheduledTasks.set(id, task);
    store.set('scheduled.' + id, { cronExpression: cronExpr, message: msg, chatId });
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
});
ipcMain.handle('cancel-scheduled-message', (_, id) => {
  if (scheduledTasks.has(id)) { scheduledTasks.get(id)?.stop(); scheduledTasks.delete(id); store.delete('scheduled.' + id); return { success: true }; }
  return { success: false, error: 'Task not found' };
});
ipcMain.handle('get-scheduled-messages', () => {
  const arr: any[] = [];
  store.each((v, k) => { if (k.startsWith('scheduled.')) arr.push({ id: k.replace('scheduled.', ''), ...v }); });
  return arr;
});
app.whenReady().then(() => {
  createWindow();
  if (process.env.NODE_ENV !== 'development') autoUpdater.checkForUpdatesAndNotify();
  store.each((v, k) => {
    if (k.startsWith('scheduled.')) {
      const { cronExpression, message, chatId } = v as any;
      const id = k.replace('scheduled.', '');
      try {
        const task = cron.schedule(cronExpression, () => mainWindow?.webContents.send('scheduled-message', { id, message, chatId }));
        scheduledTasks.set(id, task);
      } catch (e) { log.error('Failed to restore', id, e); }
    }
  });
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { scheduledTasks.forEach(t => t.stop()); scheduledTasks.clear(); if (process.platform !== 'darwin') app.quit(); });