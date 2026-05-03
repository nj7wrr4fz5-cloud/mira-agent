import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AIChat from './pages/AIChat';
import Scheduler from './pages/Scheduler';
import Groups from './pages/Groups';
import Bots from './pages/Bots';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/chat" replace />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="scheduler" element={<Scheduler />} />
          <Route path="groups" element={<Groups />} />
          <Route path="bots" element={<Bots />} />
          <Route path="settings" element={<Settings />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
