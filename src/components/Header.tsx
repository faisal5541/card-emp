import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'templates' | 'editor';
  onNavigate: (tab: 'home' | 'templates' | 'editor') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B241E]/95 backdrop-blur-md border-b border-saudi-500/20 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Entity Name */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="relative w-12 h-12 rounded-xl bg-white/10 p-1.5 flex items-center justify-center border border-white/15 group-hover:border-gold-400/50 transition-colors">
              <img
                src="/logo/presidency-logo.png"
                alt="شعار رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gold-300 font-medium tracking-wide">
                رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي
              </span>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                بطاقات اليوم الوطني السعودي
              </h1>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'home'
                  ? 'bg-white/15 text-gold-300 shadow-inner'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => onNavigate('templates')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'templates'
                  ? 'bg-white/15 text-gold-300 shadow-inner'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              التصاميم المتاحة
            </button>
            <button
              onClick={() => onNavigate('editor')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                currentTab === 'editor'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold shadow-gold-glow'
                  : 'bg-saudi-700/80 hover:bg-saudi-600 text-white border border-saudi-500/30'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>إنشاء بطاقة</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
