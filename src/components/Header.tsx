import React from 'react';
import { Sparkles, Home as HomeIcon, Layers, Edit3 } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'templates' | 'editor';
  onNavigate: (tab: 'home' | 'templates' | 'editor') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B241E]/95 backdrop-blur-md border-b border-saudi-500/20 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Desktop & Mobile Main Row */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Entity Name */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group select-none min-w-0"
          >
            <div className="relative w-9 h-9 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/15 group-hover:border-gold-400/50 transition-colors">
              <img
                src="/logo/presidency-logo.png"
                alt="شعار رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] sm:text-xs text-gold-300 font-medium tracking-wide truncate">
                رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي
              </span>
              <h1 className="text-sm sm:text-lg font-bold text-white tracking-tight truncate">
                بطاقات اليوم الوطني
              </h1>
            </div>
          </div>

          {/* Desktop Navigation Links (hidden on mobile, shown on sm:) */}
          <nav className="hidden sm:flex items-center gap-2">
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
              التصاميم
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

          {/* Quick CTA on Mobile Header */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => onNavigate('editor')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                currentTab === 'editor'
                  ? 'bg-gold-500 text-slate-950'
                  : 'bg-saudi-700 text-white border border-saudi-500/30'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 text-gold-300" />
              <span>إنشاء بطاقة</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Segmented Tabs (Visible on Mobile only) */}
        <div className="sm:hidden pb-2.5 pt-0.5">
          <nav className="flex items-center justify-between bg-black/25 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => onNavigate('home')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentTab === 'home'
                  ? 'bg-white/20 text-gold-300 shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>الرئيسية</span>
            </button>
            <button
              onClick={() => onNavigate('templates')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentTab === 'templates'
                  ? 'bg-white/20 text-gold-300 shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>التصاميم</span>
            </button>
            <button
              onClick={() => onNavigate('editor')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentTab === 'editor'
                  ? 'bg-gold-500 text-slate-950 shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>المحرر</span>
            </button>
          </nav>
        </div>

      </div>
    </header>
  );
};
