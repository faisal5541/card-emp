import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#081B16] border-t border-saudi-500/20 text-white/70 py-8 px-3 sm:px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-right">
          
          {/* Brand info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-right">
            <div className="w-11 h-11 rounded-xl bg-white/5 p-1.5 flex items-center justify-center border border-white/10 shrink-0">
              <img
                src="/logo/presidency-logo.png"
                alt="شعار الرئاسة"
                className="w-full h-full object-contain opacity-90"
              />
            </div>
            <div>
              <p className="text-white font-bold text-xs sm:text-sm">
                رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي
              </p>
              <p className="text-[11px] text-gold-400 mt-0.5">
                اليوم الوطني السعودي — عزنا بطبعنا
              </p>
            </div>
          </div>

          {/* Privacy & Browser note */}
          <div className="text-[11px] text-white/50 max-w-xs leading-relaxed">
            <span>
              جميع عمليات إنشاء وتصدير البطاقات تتم محلياً وبأمان كامل داخل جهازك.
            </span>
          </div>

          {/* Copyright */}
          <div className="text-[11px] text-white/60">
            <p>© {new Date().getFullYear()} رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي</p>
            <p className="mt-0.5 text-white/40">جميع الحقوق محفوظة</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
