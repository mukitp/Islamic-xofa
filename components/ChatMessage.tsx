
import React from 'react';
import { ChatMessage, MessageRole, AppTheme } from '../types';

interface ChatMessageProps {
  message: ChatMessage;
  theme: AppTheme;
}

const ChatMessageItem: React.FC<ChatMessageProps> = ({ message, theme }) => {
  const isUser = message.role === MessageRole.USER;

  const getThemeStyles = () => {
    switch (theme) {
      case 'ocean':
        return isUser 
          ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-tr-none shadow-blue-200' 
          : 'bg-blue-50 text-slate-800 border border-blue-100 rounded-tl-none';
      case 'midnight':
        return isUser 
          ? 'bg-slate-800 text-white rounded-tr-none shadow-slate-300' 
          : 'bg-white text-slate-800 border-2 border-slate-100 rounded-tl-none';
      case 'sky':
        return isUser 
          ? 'bg-blue-400 text-white rounded-tr-none shadow-blue-100' 
          : 'bg-blue-50/50 text-slate-700 border border-blue-200/50 rounded-tl-none';
      case 'classic':
      default:
        return isUser 
          ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-200' 
          : 'bg-white text-slate-800 border border-blue-100 rounded-tl-none';
    }
  };

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start animate-in fade-in slide-in-from-left-2 duration-300'}`}>
      <div className={`max-w-[85%] md:max-w-[70%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div 
          className={`px-5 py-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm transition-all duration-500 ${getThemeStyles()}`}
        >
          {message.text.split('\n').map((line, i) => (
            <p key={i} className={i > 0 ? 'mt-2' : ''}>
              {line}
            </p>
          ))}
        </div>
        <span className="text-[10px] text-slate-400 mt-1.5 px-1 font-medium tracking-wider uppercase">
          {isUser ? 'You' : 'Xofa'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessageItem;
