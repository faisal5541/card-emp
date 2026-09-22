import React, { useState, useEffect } from 'react';
import { CardTemplate, NameAreaConfig } from '../types';
import { CardPreview } from './CardPreview';
import { NameInput } from './NameInput';
import { FontSizeSlider } from './FontSizeSlider';
import { DownloadButton } from './DownloadButton';
import { ShareButton } from './ShareButton';
import { CalibrationPanel } from './CalibrationPanel';
import { ArrowRight, Layers, Sparkles, Check } from 'lucide-react';

interface CardEditorProps {
  templates: CardTemplate[];
  selectedTemplate: CardTemplate;
  onSelectTemplate: (template: CardTemplate) => void;
  onNavigateToTemplates: () => void;
  onShowToast: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  initialDebug?: boolean;
}

export const CardEditor: React.FC<CardEditorProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  onNavigateToTemplates,
  onShowToast,
  initialDebug = false,
}) => {
  const [employeeName, setEmployeeName] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);

  // User custom font size (default to template's base font size)
  const [userFontSize, setUserFontSize] = useState<number>(selectedTemplate.nameArea.fontSize);

  // Debug & Calibration State
  const [debug, setDebug] = useState<boolean>(initialDebug);
  const [customNameArea, setCustomNameArea] = useState<NameAreaConfig>({
    ...selectedTemplate.nameArea,
  });

  // Reset custom settings when template changes
  useEffect(() => {
    setUserFontSize(selectedTemplate.nameArea.fontSize);
    setCustomNameArea({ ...selectedTemplate.nameArea });
  }, [selectedTemplate]);

  // Check URL query parameters for ?debug=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === 'true') {
      setDebug(true);
    }
  }, []);

  const handleNameChange = (val: string) => {
    setEmployeeName(val);
    if (val.trim()) {
      setNameError(null);
    }
  };

  const handleResetFontSize = () => {
    setUserFontSize(selectedTemplate.nameArea.fontSize);
  };

  const handleResetCalibration = () => {
    setCustomNameArea({ ...selectedTemplate.nameArea });
    onShowToast('تمت استعادة الإعدادات الافتراضية لمنطقة الاسم.', 'info');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      
      {/* Header bar inside Editor */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-saudi-800 bg-saudi-50 border border-saudi-200 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              اليوم الوطني السعودي
            </span>
            {debug && (
              <span className="text-xs bg-rose-100 text-rose-800 font-mono px-2 py-0.5 rounded font-bold">
                وضع المعايرة مفعّل
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            إنشاء بطاقة التهنئة
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            اختر التصميم واكتب اسمك لتحصل على بطاقتك فوراً بأعلى جودة رسمية
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToTemplates}
          className="flex items-center gap-2 text-sm font-bold text-saudi-800 hover:text-saudi-950 bg-white hover:bg-saudi-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-saudi-300 transition-all shadow-sm"
        >
          <Layers className="w-4 h-4 text-saudi-700" />
          <span>استعراض كافة التصاميم</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Studio Layout: Responsive Flex/Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Desktop) / Top Section (Mobile): Live Preview Canvas */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-4 order-1">
          <CardPreview
            template={selectedTemplate}
            name={employeeName}
            userFontSize={userFontSize}
            debug={debug}
            customNameArea={customNameArea}
          />

          {/* Calibration HUD if debug=true */}
          {debug && (
            <div className="mt-4">
              <CalibrationPanel
                template={selectedTemplate}
                currentArea={customNameArea}
                onChange={(updated) => setCustomNameArea(updated)}
                onReset={handleResetCalibration}
              />
            </div>
          )}
        </div>

        {/* Right Column (Desktop) / Bottom Section (Mobile): Controls */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card order-2">
          
          {/* 1. Quick Template Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-saudi-700" />
                <span>اختيار التصميم:</span>
              </label>
              <span className="text-xs text-slate-500">
                {templates.findIndex((t) => t.id === selectedTemplate.id) + 1} من 3
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {templates.map((tpl, idx) => {
                const isActive = tpl.id === selectedTemplate.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => onSelectTemplate(tpl)}
                    className={`relative p-2 rounded-xl border-2 transition-all flex flex-col items-center gap-2 text-center group ${
                      isActive
                        ? 'border-saudi-700 bg-saudi-50/70 shadow-md ring-2 ring-saudi-700/20'
                        : 'border-slate-200 hover:border-saudi-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden bg-slate-900/10 shadow-inner">
                      <img
                        src={tpl.image}
                        alt={tpl.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-saudi-900/30 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-saudi-700 text-white flex items-center justify-center shadow">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>
                    <span className={`text-xs font-bold ${isActive ? 'text-saudi-900' : 'text-slate-700'}`}>
                      التصميم {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* 2. Employee Name Input */}
          <NameInput
            value={employeeName}
            onChange={handleNameChange}
            error={nameError}
          />

          {/* 3. Font Size Slider */}
          <FontSizeSlider
            value={userFontSize}
            min={selectedTemplate.nameArea.minFontSize}
            max={selectedTemplate.nameArea.maxFontSize}
            step={2}
            onChange={(newSize) => setUserFontSize(newSize)}
            onReset={handleResetFontSize}
            defaultSize={selectedTemplate.nameArea.fontSize}
          />

          <hr className="border-slate-100" />

          {/* 4. Action Buttons (Download & Share) */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <DownloadButton
                template={selectedTemplate}
                name={employeeName}
                userFontSize={userFontSize}
                customNameArea={customNameArea}
                onSuccess={(msg) => onShowToast(msg, 'success')}
                onError={(msg) => onShowToast(msg, 'error')}
                onMissingName={(msg) => {
                  setNameError(msg);
                  onShowToast(msg, 'warning');
                }}
              />

              <ShareButton
                template={selectedTemplate}
                name={employeeName}
                userFontSize={userFontSize}
                customNameArea={customNameArea}
                onSuccess={(msg) => onShowToast(msg, 'success')}
                onError={(msg) => onShowToast(msg, 'error')}
                onMissingName={(msg) => {
                  setNameError(msg);
                  onShowToast(msg, 'warning');
                }}
                onFallback={(msg) => onShowToast(msg, 'info')}
              />
            </div>

            <button
              type="button"
              onClick={onNavigateToTemplates}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-500 hover:text-saudi-800 transition-colors"
            >
              اختيار تصميم آخر
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
