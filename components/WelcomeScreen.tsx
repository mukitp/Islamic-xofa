
import React, { useMemo } from 'react';

interface WelcomeScreenProps {
  onSelectSuggestion: (text: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectSuggestion }) => {
  const greetings = [
    "Assalamu Alaikum wa Rahmatullahi wa Barakatuh",
    "Welcome to Xofa, your journey of knowledge starts here",
    "Peace be upon you, how can I assist your faith today?",
    "Blessed day! I am Xofa, ready to explore Islamic wisdom with you"
  ];

  const randomGreeting = useMemo(() => greetings[Math.floor(Math.random() * greetings.length)], []);

  const categories = [
    {
      title: "Spiritual Growth",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      suggestions: [
        "How to improve focus in Salah?",
        "Dua for patience and strength",
        "Morning Adhkar benefits"
      ]
    },
    {
      title: "Knowledge & History",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      suggestions: [
        "Stories of the Sahaba",
        "Explain the concept of Tawheed",
        "The Islamic Golden Age"
      ]
    },
    {
      title: "Life & Character",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      suggestions: [
        "Who made you?",
        "Sunnah for productivity",
        "Suggest a good deed for today"
      ]
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-10 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative w-28 h-28 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3 font-amiri tracking-wide">
        {randomGreeting}
      </h1>
      <p className="text-slate-500 max-w-lg mb-12 text-lg leading-relaxed">
        I am <span className="text-blue-600 font-bold">Xofa</span>. Think of me as your digital companion for clarifying doubts, exploring Islamic history, and strengthening your faith.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {categories.map((category, idx) => (
          <div key={idx} className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-blue-100 shadow-sm flex flex-col items-start text-left hover:shadow-md transition-shadow">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl mb-4">
              {category.icon}
            </div>
            <h3 className="font-bold text-blue-900 mb-4 uppercase tracking-widest text-xs">{category.title}</h3>
            <div className="space-y-3 w-full">
              {category.suggestions.map((suggestion, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => onSelectSuggestion(suggestion)}
                  className="w-full text-left p-3 rounded-xl text-sm text-slate-700 bg-white border border-slate-100 hover:border-blue-400 hover:text-blue-600 transition-all active:scale-95 flex items-center justify-between group"
                >
                  <span>{suggestion}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 flex items-center gap-2 text-slate-400 text-sm italic">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Created with respect for your journey by MUKIT SARKER
      </div>
    </div>
  );
};

export default WelcomeScreen;
