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
    if (window.electronAPI) window.electronAPI.checkForUpdates();
  };

  const installUpdate = () => {
    if (window.electronAPI) window.electronAPI.installUpdate();
  };

  return (
    <>
      <div className="page-header">
        <h2>⚙️ Настройки</h2>
        <p>Конфигурация приложения</p>
      </div>
      <div className="page-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="card">
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border-color)' }}>Профиль</h3>
              <div className="form-group">
                <label className="form-label">Имя пользователя</label>
                <input type="text" className="form-input" defaultValue="Александр" />
              </div>
              <div className="form-group">
                <label className="form-label">Telegram ID</label>
                <input type="text" className="form-input" defaultValue="5510935195" disabled />
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border-color)' }}>Подключения</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>GitHub</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Подключено: nj7wrr4fz5-cloud</p>
                </div>
                <span style={{ color: 'var(--accent-success)' }}>✓</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>Telegram</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Подключено</p>
                </div>
                <span style={{ color: 'var(--accent-success)' }}>✓</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border-color)' }}>Автообновление</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>Автоматически проверять обновления</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>При запуске приложения</p>
                </div>
                <div 
                  className={`toggle ${autoUpdate ? 'active' : ''}`} 
                  onClick={() => setAutoUpdate(!autoUpdate)}
                  style={{ position: 'relative', width: 48, height: 26, background: 'var(--bg-tertiary)', borderRadius: 13, cursor: 'pointer', transition: 'all .2s' }}
                >
                  <div style={{ content: '', position: 'absolute', top: 3, left: 3, width: 20, height: 20, background: '#fff', borderRadius: '50%', transition: 'all .2s', left: autoUpdate ? 25 : 3 }}></div>
                </div>
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

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border-color)' }}>Соединение с Mira</h3>
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
