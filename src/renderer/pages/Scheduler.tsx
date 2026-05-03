import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export default function Scheduler() {
  const { scheduledMessages, setScheduledMessages } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [newMsg, setNewMsg] = useState({ message: '', time: '09:00', days: '1,2,3,4,5' });

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getScheduledMessages().then(setScheduledMessages);
    }
  }, []);

  const handleAdd = async () => {
    if (!newMsg.message.trim()) return;
    const id = Date.now().toString();
    const cron = `0 ${newMsg.time.split(':')[1]} ${newMsg.time.split(':')[0]} * * ${newMsg.days}`;
    
    if (window.electronAPI) {
      await window.electronAPI.scheduleMessage(id, cron, newMsg.message, 'default');
      const msgs = await window.electronAPI.getScheduledMessages();
      setScheduledMessages(msgs);
    }
    setShowForm(false);
    setNewMsg({ message: '', time: '09:00', days: '1,2,3,4,5' });
  };

  const handleDelete = async (id: string) => {
    if (window.electronAPI) {
      await window.electronAPI.cancelScheduledMessage(id);
      const msgs = await window.electronAPI.getScheduledMessages();
      setScheduledMessages(msgs);
    }
  };

  return (
    <>
      <div className="page-header">
        <h2>📅 Планировщик</h2>
        <p>Запланируй отправку сообщений по расписанию</p>
      </div>
      <div className="page-content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Запланированные сообщения</h3>
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Отмена' : '+ Добавить'}
            </button>
          </div>

          {showForm && (
            <div style={{ marginBottom: 20, padding: 20, background: 'var(--bg-tertiary)', borderRadius: 12 }}>
              <div className="form-group">
                <label className="form-label">Сообщение</label>
                <textarea 
                  className="form-input" 
                  value={newMsg.message}
                  onChange={(e) => setNewMsg({...newMsg, message: e.target.value})}
                  placeholder="Текст сообщения..."
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Время</label>
                  <input 
                    type="time" 
                    className="form-input"
                    value={newMsg.time}
                    onChange={(e) => setNewMsg({...newMsg, time: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Дни недели (1-7)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={newMsg.days}
                    onChange={(e) => setNewMsg({...newMsg, days: e.target.value})}
                    placeholder="1,2,3,4,5"
                  />
                </div>
              </div>
              <button className="btn btn-primary" onClick={handleAdd}>Сохранить</button>
            </div>
          )}

          <div className="schedule-list">
            {scheduledMessages.length === 0 ? (
              <div className="empty-state">
                <div className="icon">📅</div>
                <h3>Нет запланированных сообщений</h3>
                <p>Добавь первое сообщение для автоматической отправки</p>
              </div>
            ) : (
              scheduledMessages.map(msg => (
                <div key={msg.id} className="schedule-item">
                  <div className="schedule-info">
                    <span className="schedule-time">{msg.cronExpression?.split(' ')[1]}:{msg.cronExpression?.split(' ')[0]}</span>
                    <span className="schedule-message">{msg.message}</span>
                  </div>
                  <div className="schedule-actions">
                    <button className="btn btn-danger" onClick={() => handleDelete(msg.id)}>Удалить</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
