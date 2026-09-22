import React from 'react';
import { CardTemplate } from '../types';
import { Check, Sparkles } from 'lucide-react';

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
          ? 'border-gold-500 shadow-2xl ring-4 ring-gold-400/20 shadow-saudi-900/15'
          : 'border-slate-200/80 hover:border-saudi-400 shadow-card hover:shadow-card-hover'
      }`}
    >
      {/* Active Indicator Badge */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-full shadow-lg">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>التصميم المختار</span>
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-white text-xs font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            انقر لتحديد هذا التصميم
          </span>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white border-t border-slate-100">
        <div>
          {template.badgeTitle && (
            <span className="inline-block text-[11px] font-semibold text-saudi-700 bg-saudi-50 px-2.5 py-0.5 rounded-md mb-2">
              {template.badgeTitle}
            </span>
          )}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-saudi-900 transition-colors">
            {template.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {template.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
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
                <span>تم الاختيار</span>
              </>
            ) : (
              <span>اختيار التصميم</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
