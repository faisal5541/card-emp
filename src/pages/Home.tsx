import React from 'react';
import { CardTemplate } from '../types';
import { Sparkles, ArrowLeft, Download, Palette } from 'lucide-react';

interface HomeProps {
  templates: CardTemplate[];
  onStart: () => void;
  onSelectTemplate: (template: CardTemplate) => void;
}

export const Home: React.FC<HomeProps> = ({
  templates,
  onStart,
  onSelectTemplate,
}) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#09221B] via-[#0D2E25] to-[#0A261F] text-white py-10 sm:py-20 border-b border-saudi-500/20">
        
        {/* Subtle Decorative Elements */}
        <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-saudi-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Government Entity Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full mb-5 sm:mb-8 shadow-sm max-w-full">
            <img
              src="/logo/presidency-logo.png"
              alt="شعار الرئاسة"
              className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0"
            />
            <span className="text-[11px] sm:text-sm font-semibold text-gold-300 tracking-wide truncate">
              رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي
            </span>
          </div>

          {/* Main Titles */}
          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-snug sm:leading-tight">
            بطاقات اليوم الوطني السعودي
            <span className="block mt-2 text-xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent">
              عزنا بطبعنا
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-200/90 font-medium max-w-xl mx-auto mt-4 sm:mt-6 leading-relaxed px-2">
            أنشئ بطاقة تهنئة رسمية باسمك وشارك فرحة الوطن
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <button
              type="button"
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-extrabold bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-slate-950 hover:brightness-105 shadow-gold-glow hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              <span>ابدأ الآن</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* Featured Templates Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-xs font-bold text-saudi-800 bg-saudi-100/80 px-3 py-1 rounded-full uppercase tracking-wider">
            التصاميم الرسمية
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            اختر التصميم المناسب لك
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            ثلاثة تصاميم معتمدة لمنسوبي رئاسة الشؤون الدينية
          </p>
        </div>

        {/* 3 Template Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-sm sm:max-w-none mx-auto">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-200/80 hover:border-saudi-600 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col active:scale-[0.98]"
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-slate-900/10">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <h3 className="font-bold text-center text-base text-slate-900 group-hover:text-saudi-900 transition-colors">
                  {template.title}
                </h3>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-saudi-800 font-bold text-xs">
                  <span>تخصيص هذا التصميم</span>
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works / 3 Easy Steps */}
      <section className="bg-slate-100/70 border-t border-slate-200/80 py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-saudi-50 text-saudi-800 flex items-center justify-center mb-2.5">
                <Palette className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">١. اختر التصميم</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                حدد أحد النماذج الرسمية الثلاثة المعتمدة.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center mb-2.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">٢. اكتب اسمك</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                أدخل اسمك ليتم ضبط مكانه وحجمه فورياً.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2.5">
                <Download className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">٣. حمّل أو شارك</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                احصل على البطاقة بدقة كاملة وشاركها فوراً.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
