
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, MessageRole, AppTheme } from './types';
import { sendMessageToXofa } from './services/geminiService';
import ChatMessageItem from './components/ChatMessage';
import WelcomeScreen from './components/WelcomeScreen';
import TypingIndicator from './components/TypingIndicator';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<AppTheme>('classic');
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (overrideInput?: string) => {
    const messageText = overrideInput || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!overrideInput) setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToXofa(messageText, messages);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error: any) {
      let errorMessage = "Sorry, I am having trouble connecting. Please check your internet or API settings.";
      
      if (error.message === "API_KEY_MISSING") {
        errorMessage = "API Key not found. Please make sure you have added the API_KEY to your project settings and redeployed.";
      }

      const errorMsg: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: MessageRole.MODEL,
        text: errorMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const themes: { id: AppTheme, label: string, color: string }[] = [
    { id: 'classic', label: 'Classic Blue', color: 'bg-blue-600' },
    { id: 'ocean', label: 'Ocean Tide', color: 'bg-cyan-500' },
    { id: 'midnight', label: 'Midnight Navy', color: 'bg-slate-800' },
    { id: 'sky', label: 'Sky Soft', color: 'bg-blue-400' },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 overflow-hidden relative font-sans">
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200 transform rotate-3">
            X
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-blue-900 tracking-tight flex items-center gap-2">
              Xofa
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">v2.1</span>
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Islamic AI Assistant</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:border-blue-200 transition-all shadow-sm flex items-center gap-2 group"
            >
              <div className={`w-4 h-4 rounded-full ${themes.find(t => t.id === theme)?.color} border-2 border-white shadow-sm transition-transform group-hover:scale-110`}></div>
              <span className="hidden sm:inline text-xs font-bold text-slate-600 uppercase tracking-wider">Theme</span>
            </button>
            
            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-blue-50 p-2 z-30 animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                  Styles
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${theme === t.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <div className={`w-4 h-4 rounded-full ${t.color} border-2 border-white shadow-sm`}></div>
                    <span className="text-xs font-bold">{t.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs text-blue-900 font-bold tracking-tight uppercase">Mukit Sarker</span>
            <span className="text-[10px] text-slate-400 italic">Creator</span>
          </div>
        </div>
      </header>

      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 scrollbar-hide bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] bg-fixed"
        onClick={() => setIsThemeMenuOpen(false)}
      >
        {messages.length === 0 ? (
          <WelcomeScreen onSelectSuggestion={(s) => handleSend(s)} />
        ) : (
          <div className="max-w-4xl mx-auto w-full">
            {messages.map((msg) => (
              <ChatMessageItem key={msg.id} message={msg} theme={theme} />
            ))}
            {isLoading && <TypingIndicator theme={theme} />}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 items-end">
            <div className="flex-1 relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Xofa anything..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-6 py-4 pr-14 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none max-h-48 text-slate-700 shadow-inner"
                rows={1}
              />
            </div>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-90 ${
                !input.trim() || isLoading 
                  ? 'bg-slate-100 text-slate-400' 
                  : `bg-blue-600 text-white shadow-blue-200 hover:-translate-y-1`
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-[0.2em] font-bold">
            Built by Mukit Sarker &middot; Xofa AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
