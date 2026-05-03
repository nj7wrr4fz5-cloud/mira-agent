import React from 'react';
import { useAppStore } from '../store/appStore';

export default function Statistics() {
  const { groups, bots, scheduledMessages } = useAppStore();

  return (
    <>
      <div className="page-header">
        <h2>📊 Статистика</h2>
        <p>Метрики и аналитика</p>
      </div>
      <div className="page-content">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>👥</div>
            <div className="stat-value">{groups.reduce((a, g) => a + g.members, 0)}</div>
            <div className="stat-label">Участников в группах</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>🤖</div>
            <div className="stat-value">{bots.filter(b => b.status === 'active').length}</div>
            <div className="stat-label">Активных ботов</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>📅</div>
            <div className="stat-value">{scheduledMessages.length}</div>
            <div className="stat-label">Заданий в очереди</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Активность по дням</h3>
            </div>
            <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 8, padding: 20 }}>
              {[65, 45, 80, 55, 70, 90, 60].map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ height: h, width: '100%', background: 'linear-gradient(to top, var(--accent-primary), var(--accent-secondary))', borderRadius: 4 }}></div>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Топ групп</h3>
            </div>
            <div>
              {groups.sort((a, b) => b.members - a.members).map((g, i) => (
                <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < groups.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                  <span style={{ width: 24, color: 'var(--accent-primary)', fontWeight: 600 }}>#{i + 1}</span>
                  <span style={{ flex: 1 }}>{g.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{g.members} уч.</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
