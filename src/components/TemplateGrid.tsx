import React from 'react';
import { CardTemplate } from '../types';
import { TemplateCard } from './TemplateCard';

interface TemplateGridProps {
  templates: CardTemplate[];
  selectedTemplate: CardTemplate;
  onSelect: (template: CardTemplate) => void;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  selectedTemplate,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedTemplate.id === template.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
