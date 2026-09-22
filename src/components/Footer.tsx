import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#081B16] border-t border-saudi-500/20 text-white/70 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          
          {/* Brand info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 p-1.5 flex items-center justify-center border border-white/10">
              <img
                src="/logo/presidency-logo.png"
                alt="شعار الرئاسة"
                className="w-full h-full object-contain opacity-90"
              />
            </div>
            <div>
              <p className="text-white font-bold text-sm sm:text-base">
                رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي
              </p>
              <p className="text-xs text-gold-400 mt-0.5">
                اليوم الوطني السعودي 96 — عزنا بطبعنا
              </p>
            </div>
          </div>

          {/* Privacy & Browser note */}
          <div className="text-xs text-white/50 max-w-sm">
            <span>
              جميع عمليات إنشاء وتصدير البطاقات تتم محلياً وبأمان كامل داخل جهازك دون حفظ أي بيانات شخصية.
            </span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-white/60">
            <p>© {new Date().getFullYear()} رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي.</p>
            <p className="mt-1 text-white/40">جميع الحقوق محفوظة</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
