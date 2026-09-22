import React from 'react';
import { CardTemplate } from '../types';
import { Check } from 'lucide-react';

interface TemplateCardProps {
  template: CardTemplate;
  isSelected: boolean;
  onSelect: (template: CardTemplate) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(template)}
      className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 border-2 ${
        isSelected
          ? 'border-saudi-700 shadow-xl ring-4 ring-saudi-600/20'
          : 'border-slate-200/80 hover:border-saudi-400 shadow-card hover:shadow-card-hover'
      }`}
    >
      {/* Active Indicator Badge */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[#0B241E] text-gold-300 font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border border-gold-500/30">
          <Check className="w-3.5 h-3.5 stroke-[3] text-gold-400" />
          <span>{template.title} (محدد)</span>
        </div>
      )}

      {/* Image Preview Container */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-900/10">
        <img
          src={template.image}
          alt={template.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Info */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white border-t border-slate-100">
        <h3 className="text-base sm:text-lg font-bold text-center text-slate-900 group-hover:text-saudi-900 transition-colors">
          {template.title}
        </h3>

        <div className="mt-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template);
            }}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              isSelected
                ? 'bg-[#0B241E] text-gold-300 shadow-md'
                : 'bg-slate-100 hover:bg-saudi-50 text-slate-700 hover:text-saudi-900'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 text-gold-400" />
                <span>{template.title}</span>
              </>
            ) : (
              <span>اختيار {template.title}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
