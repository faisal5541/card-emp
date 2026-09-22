import React from 'react';
import { CardTemplate } from '../types';
import { Sparkles, ArrowLeft, ShieldCheck, Download, Share2, Palette } from 'lucide-react';

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
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#09221B] via-[#0D2E25] to-[#0A261F] text-white py-16 sm:py-24 border-b border-saudi-500/20">
        
        {/* Subtle Decorative Elements */}
        <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-saudi-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Government Entity Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-8 shadow-sm">
            <img
              src="/logo/presidency-logo.png"
              alt="شعار الرئاسة"
              className="w-5 h-5 object-contain"
            />
            <span className="text-xs sm:text-sm font-semibold text-gold-300 tracking-wide">
              رئاسة الشؤون الدينية بالمسجد الحرام والمسجد النبوي
            </span>
          </div>

          {/* Main Titles */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-tight">
            بطاقات اليوم الوطني السعودي
            <span className="block mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent">
              عزنا بطبعنا
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-200/90 font-medium max-w-2xl mx-auto mt-6 leading-relaxed">
            أنشئ بطاقة تهنئة باسمك وشارك فرحة الوطن
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base sm:text-lg font-extrabold bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-slate-950 hover:brightness-105 shadow-gold-glow hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>ابدأ الآن</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Micro badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              منصة رسمية معتمدة
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold-400" />
              3 تصاميم رسمية حصرية
            </span>
            <span className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-teal-400" />
              تصدير فوري بجودة 100%
            </span>
          </div>

        </div>
      </section>

      {/* Featured Templates Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-saudi-800 bg-saudi-100/80 px-3 py-1 rounded-full uppercase tracking-wider">
            نماذج البطاقات
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            اختر التصميم المناسب لك
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
            ثلاثة تصاميم رسمية معتمدة تم إعدادها بعناية لتناسب منسوبي رئاسة الشؤون الدينية
          </p>
        </div>

        {/* 3 Template Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template, idx) => (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-saudi-500 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-slate-900/10">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs px-2.5 py-1 rounded-md">
                  التصميم {idx + 1}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-saudi-900 transition-colors">
                    {template.title}
                  </h3>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-saudi-800 font-bold text-xs">
                  <span>تخصيص هذا التصميم</span>
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works / Features */}
      <section className="bg-slate-100/70 border-t border-slate-200/80 py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-saudi-50 text-saudi-800 flex items-center justify-center mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">١. اختر التصميم</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                اختر التصميم الأنسب من بين النماذج الرسمية الثلاثة المعتمدة.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">٢. اكتب اسمك</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                أدخل اسمك الكريم ليتم مواءمته تلقائياً بالخط العربي واللون المناسب.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">٣. حمّل أو شارك</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                احصل على بطاقتك بصيغة PNG بدقة كاملة وشاركها مع زملائك وأحبائك.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
