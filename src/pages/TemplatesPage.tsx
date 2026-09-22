import React from 'react';
import { CardTemplate } from '../types';
import { TemplateGrid } from '../components/TemplateGrid';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface TemplatesPageProps {
  templates: CardTemplate[];
  selectedTemplate: CardTemplate;
  onSelectTemplate: (template: CardTemplate) => void;
  onProceedToEditor: () => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  onProceedToEditor,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-14 overflow-x-hidden">
      
      {/* Page Title & Instructions */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 bg-saudi-50 border border-saudi-200/80 px-3 py-1 rounded-full text-xs font-bold text-saudi-900 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span>التصاميم الرسمية</span>
        </div>
        <h2 className="text-xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          اختر تصميم بطاقتك
        </h2>
        <p className="text-xs sm:text-base text-slate-500 mt-1 sm:mt-2 leading-relaxed">
          انقر على التصميم المفضل لديك للبدء في كتابة اسمك وتجهيز البطاقة فوراً
        </p>
      </div>

      {/* Grid of the 3 templates */}
      <TemplateGrid
        templates={templates}
        selectedTemplate={selectedTemplate}
        onSelect={(tpl) => {
          onSelectTemplate(tpl);
          // Automatically take the user to the editor for a frictionless experience
          onProceedToEditor();
        }}
      />

      {/* Proceed Button */}
      <div className="mt-8 sm:mt-12 flex justify-center max-w-xs sm:max-w-none mx-auto">
        <button
          type="button"
          onClick={onProceedToEditor}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm sm:text-base bg-gradient-to-r from-saudi-900 to-saudi-950 text-white hover:from-saudi-800 hover:to-saudi-900 border border-saudi-600/30 shadow-lg shadow-saudi-950/20 flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <span>متابعة لتخصيص الاسم</span>
          <ArrowLeft className="w-4 h-4 text-gold-400" />
        </button>
      </div>

    </div>
  );
};
