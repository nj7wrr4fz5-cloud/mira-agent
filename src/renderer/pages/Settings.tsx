import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export default function Settings() {
  const { updateStatus, setUpdateStatus } = useAppStore();
  const [apiKey, setApiKey] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(true);


  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onUpdateStatus((status: any) => setUpdateStatus(status));
    }
  }, []);

  const checkUpdates = () => {
    if (window.electronAPI) {
      window.electronAPI.checkForUpdates();
    }
  };

  const installUpdate = () => {
    if (window.electronAPI) {
      window.electronAPI.installUpdate();
    }
  };

  return (
    <>
      <div className="page-header">
        <h2>⚙️ Настройки</h2>
        <p>Конфигурация приложения</p>
      </div>
      <div className="page-content">
        <div className="grid grid-2">
          <div className="card">
            <div className="settings-section">
              <h3 className="settings-title">Профиль</h3>
              <div className="form-group">
                <label className="form-label">Имя пользователя</label>
                <input type="text" className="form-input" defaultValue="Александр" />
              </div>
              <div className="form-group">
                <label className="form-label">Telegram ID</label>
                <input type="text" className="form-input" defaultValue="5510935195" disabled />
              </div>
            </div>

            <div className="settings-section">
              <h3 className="settings-title">Подключения</h3>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>GitHub</h4>
                  <p>Подключено: nj7wrr4fz5-cloud</p>
                </div>
                <span style={{ color: 'var(--accent-success)' }}>✓</span>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Telegram</h4>
                  <p>Подключено</p>
                </div>
                <span style={{ color: 'var(--accent-success)' }}>✓</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="settings-section">
              <h3 className="settings-title">Автообновление</h3>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Автоматически проверять обновления</h4>
                  <p>При запуске приложения</p>
                </div>
                <div className={`toggle ${autoUpdate ? 'active' : ''}`} onClick={() => setAutoUpdate(!autoUpdate)}></div>
              </div>
              
              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
                  {updateStatus?.status === 'checking' && 'Проверяю обновления...'}
                  {updateStatus?.status === 'available' && `Доступна версия ${updateStatus.version}`}
                  {updateStatus?.status === 'downloading' && `Загружаю: ${Math.round(updateStatus.percent)}%`}
                  {updateStatus?.status === 'downloaded' && 'Обновление готово к установке'}
                  {updateStatus?.status === 'not-available' && 'У вас последняя версия'}
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-secondary" onClick={checkUpdates}>Проверить обновления</button>
                  {updateStatus?.status === 'downloaded' && (
                    <button className="btn btn-primary" onClick={installUpdate}>Установить</button>
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3 className="settings-title">Соединение с Mira</h3>
              <div className="form-group">
                <label className="form-label">API Key (опционально)</label>
                <input 
                  type="password" 
                  className="form-input" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Введите API ключ..."
                />
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Без API Key будет использоваться базовая версия с ограничениями
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}