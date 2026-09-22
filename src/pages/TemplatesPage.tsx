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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      
      {/* Page Title & Instructions */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-saudi-50 border border-saudi-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-saudi-900 mb-3">
          <Sparkles className="w-4 h-4 text-gold-500" />
          <span>التصاميم الرسمية الثلاثة</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          اختر تصميم بطاقتك
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
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
      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={onProceedToEditor}
          className="px-8 py-3.5 rounded-xl font-extrabold text-base bg-gradient-to-r from-saudi-900 to-saudi-950 text-white hover:from-saudi-800 hover:to-saudi-900 border border-saudi-600/30 shadow-lg shadow-saudi-950/20 flex items-center gap-3 transition-all hover:-translate-y-0.5"
        >
          <span>متابعة لتخصيص الاسم</span>
          <ArrowLeft className="w-5 h-5 text-gold-400" />
        </button>
      </div>

    </div>
  );
};
