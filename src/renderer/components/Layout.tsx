import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

export default function Layout() {
  const { isConnected } = useAppStore();
  const location = useLocation();
  
  const navItems = [
    { path: '/chat', icon: '🤖', label: 'AI Chat' },
    { path: '/scheduler', icon: '📅', label: 'Планировщик' },
    { path: '/groups', icon: '👥', label: 'Группы' },
    { path: '/bots', icon: '🤖', label: 'Боты' },
    { path: '/statistics', icon: '📊', label: 'Статистика' },
    { path: '/settings', icon: '⚙️', label: 'Настройки' },
  ];

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">✨</div>
            <h1>Mira</h1>
          </div>
        </div>
        <nav className="nav-menu">
          {navItems.map(item => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="connection-status">
            <span className={`status-dot ${isConnected ? '' : 'disconnected'}`}></span>
            <span>{isConnected ? 'Mira подключена' : 'Отключено'}</span>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}