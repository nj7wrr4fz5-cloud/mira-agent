import React from 'react';
import { useAppStore } from '../store/appStore';

export default function Groups() {
  const { groups } = useAppStore();

  return (
    <>
      <div className="page-header">
        <h2>👥 Группы</h2>
        <p>Управление группами и каналами</p>
      </div>
      <div className="page-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Мои группы</h3>
              <button className="btn btn-primary">+ Добавить</button>
            </div>
            <div>
              {groups.map(group => (
                <div key={group.id} className="group-card">
                  <div className="group-avatar">{group.avatar}</div>
                  <div className="group-info">
                    <div className="group-name">{group.name}</div>
                    <div className="group-members">{group.members} участников • {group.lastActivity}</div>
                  </div>
                  <button className="btn btn-secondary">Настроить</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Статистика групп</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>👥</div>
                <div className="stat-value">{groups.reduce((a, g) => a + g.members, 0)}</div>
                <div className="stat-label">Всего участников</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>📈</div>
                <div className="stat-value">{groups.length}</div>
                <div className="stat-label">Активных групп</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
