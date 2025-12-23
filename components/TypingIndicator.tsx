
import React from 'react';
import { AppTheme } from '../types';

interface TypingIndicatorProps {
  theme: AppTheme;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ theme }) => {
  const getDotColor = () => {
    switch (theme) {
      case 'ocean': return 'bg-cyan-500';
      case 'midnight': return 'bg-slate-700';
      case 'sky': return 'bg-blue-400';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-3 bg-white border border-blue-50 px-5 py-3.5 rounded-2xl rounded-tl-none shadow-sm relative overflow-hidden group">
        {/* Subtle background glow */}
        <div className={`absolute inset-0 opacity-5 bg-gradient-to-r from-transparent via-blue-400 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}></div>
        
        <div className="flex gap-1.5">
          <div className={`w-2 h-2 ${getDotColor()} rounded-full animate-bounce [animation-duration:1.2s]`}></div>
          <div className={`w-2 h-2 ${getDotColor()} rounded-full animate-bounce [animation-delay:0.2s] [animation-duration:1.2s]`}></div>
          <div className={`w-2 h-2 ${getDotColor()} rounded-full animate-bounce [animation-delay:0.4s] [animation-duration:1.2s]`}></div>
        </div>
        
        <div className="h-4 w-[1px] bg-slate-100 mx-1"></div>
        
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] animate-pulse">
          Reflecting
        </span>
      </div>
      
      <div className="flex items-center gap-1.5 px-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-300 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
        </svg>
        <span className="text-[9px] text-slate-300 font-medium italic">Xofa is composing wisdom...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
