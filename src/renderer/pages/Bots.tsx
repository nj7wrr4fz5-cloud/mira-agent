import React from 'react';
import { useAppStore } from '../store/appStore';

export default function Bots() {
  const { bots } = useAppStore();

  return (
    <>
      <div className="page-header">
        <h2>🤖 Боты</h2>
        <p>Управление Telegram-ботами</p>
      </div>
      <div className="page-content">
        <div className="tabs">
          <button className="tab active">Активные</button>
          <button className="tab">Команды</button>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Мои боты</h3>
            <button className="btn btn-primary">+ Добавить бота</button>
          </div>
          <div>
            {bots.map(bot => (
              <div key={bot.id} className="bot-card">
                <div className="bot-header">
                  <div className="bot-info">
                    <div className="bot-avatar">🤖</div>
                    <div>
                      <div className="bot-name">{bot.name}</div>
                      <div className="bot-status">
                        <span className="status-dot"></span>
                        {bot.status === 'active' ? 'Активен' : 'Неактивен'}
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-secondary">Настроить</button>
                </div>
                <div className="bot-commands">
                  {bot.commands.map(cmd => (
                    <span key={cmd} className="bot-command">{cmd}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}