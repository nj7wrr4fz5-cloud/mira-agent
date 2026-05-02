import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export default function AIChat() {
  const { messages, addMessage } = useAppStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: 'user' as const, content: input, timestamp: new Date() };
    addMessage(userMsg);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMsg = { 
        id: (Date.now() + 1).toString(), 
        role: 'ai' as const, 
        content: getAIResponse(input), 
        timestamp: new Date() 
      };
      addMessage(aiMsg);
    }, 1000);
  };

  const getAIResponse = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('привет') || lower.includes('hi')) return 'Привет! Рада видеть тебя! ✨';
    if (lower.includes('помощь')) return 'Я могу помочь тебе с: написанием кода, анализом данных, созданием контента, и многим другим. Просто спроси!';
    if (lower.includes('как дела')) return 'У меня всё отлично! Готова помочь тебе с задачами. А как у тебя дела?';
    return 'Интересный вопрос! Расскажи подробнее, и я постараюсь помочь.';
  };

  return (
    <>
      <div className="page-header">
        <h2>🤖 AI Chat</h2>
        <p>Общение с AI-ассистентом Mira</p>
      </div>
      <div className="page-content">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.role}`}>
                <div className="message-avatar">{msg.role === 'user' ? '👤' : '✨'}</div>
                <div className="message-content">
                  {msg.content}
                  <div className="message-time">{msg.timestamp.toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input 
                className="chat-input" 
                placeholder="Напиши сообщение..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="btn btn-primary" onClick={handleSend}>Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}