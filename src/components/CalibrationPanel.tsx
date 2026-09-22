import React, { useState } from 'react';
import { CardTemplate, NameAreaConfig } from '../types';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Copy, Check, RotateCcw, Wrench, ChevronDown, ChevronUp } from 'lucide-react';

interface CalibrationPanelProps {
  template: CardTemplate;
  currentArea: NameAreaConfig;
  onChange: (updated: NameAreaConfig) => void;
  onReset: () => void;
}

export const CalibrationPanel: React.FC<CalibrationPanelProps> = ({
  template,
  currentArea,
  onChange,
  onReset,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const step = 0.2; // fine-tuning percentage step

  const nudge = (field: keyof NameAreaConfig, delta: number) => {
    const val = Number(currentArea[field]) || 0;
    const updated = {
      ...currentArea,
      [field]: Math.round((val + delta) * 10) / 10,
    };
    onChange(updated);
  };

  const copyConfig = () => {
    const json = JSON.stringify(
      {
        id: template.id,
        nameArea: {
          x: currentArea.x,
          y: currentArea.y,
          width: currentArea.width,
          height: currentArea.height,
          fontFamily: currentArea.fontFamily,
          fontSize: currentArea.fontSize,
          minFontSize: currentArea.minFontSize,
          maxFontSize: currentArea.maxFontSize,
          color: currentArea.color,
          fontWeight: currentArea.fontWeight,
          textAlign: currentArea.textAlign,
          maxLines: currentArea.maxLines,
        },
      },
      null,
      2
    );

    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/95 border-2 border-amber-500/80 text-white rounded-2xl p-4 shadow-2xl backdrop-blur-md text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-3">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-sm text-amber-400">لوحة معايرة المطور (Debug HUD)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyConfig}
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-2.5 py-1 rounded-md transition-colors"
            title="نسخ الإعدادات بصيغة JSON"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-950" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ!' : 'نسخ JSON'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white"
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="space-y-4">
          <div className="text-[11px] text-slate-300">
            القالب الحالي: <span className="font-mono text-amber-300">{template.id}</span> (النسب المئوية)
          </div>

          {/* D-Pad Controller for Position (X, Y) */}
          <div className="grid grid-cols-2 gap-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <div>
              <span className="font-bold text-slate-200 block mb-2">الموضع (X / Y)</span>
              <div className="flex flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={() => nudge('y', -step)}
                  className="p-1.5 rounded bg-slate-700 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                  title="تحريك لأعلى (نقصان Y)"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => nudge('x', -step)}
                    className="p-1.5 rounded bg-slate-700 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                    title="تحريك لليمين/اليسار (نقصان X)"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-center text-xs text-amber-300 w-16">
                    {currentArea.x.toFixed(1)}%, {currentArea.y.toFixed(1)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => nudge('x', step)}
                    className="p-1.5 rounded bg-slate-700 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                    title="تحريك لليمين/اليسار (زيادة X)"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => nudge('y', step)}
                  className="p-1.5 rounded bg-slate-700 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                  title="تحريك لأسفل (زيادة Y)"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Size controls (Width, Height) */}
            <div className="space-y-2">
              <span className="font-bold text-slate-200 block mb-1">أبعاد المستطيل</span>
              <div className="flex items-center justify-between">
                <span>العرض (W): <b className="font-mono text-amber-300">{currentArea.width.toFixed(1)}%</b></span>
                <div className="flex gap-1">
                  <button
                    onClick={() => nudge('width', -0.5)}
                    className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded font-mono"
                  >
                    -
                  </button>
                  <button
                    onClick={() => nudge('width', 0.5)}
                    className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded font-mono"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>الارتفاع (H): <b className="font-mono text-amber-300">{currentArea.height.toFixed(1)}%</b></span>
                <div className="flex gap-1">
                  <button
                    onClick={() => nudge('height', -0.2)}
                    className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded font-mono"
                  >
                    -
                  </button>
                  <button
                    onClick={() => nudge('height', 0.2)}
                    className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded font-mono"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Color quick switch */}
              <div className="flex items-center justify-between pt-1">
                <span>لون الخط:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onChange({ ...currentArea, color: '#FFFFFF' })}
                    className="w-5 h-5 rounded-full bg-white border border-slate-400"
                    title="أبيض #FFFFFF"
                  />
                  <button
                    onClick={() => onChange({ ...currentArea, color: '#11392B' })}
                    className="w-5 h-5 rounded-full bg-[#11392B] border border-slate-400"
                    title="أخضر سعودي داكن #11392B"
                  />
                  <button
                    onClick={() => onChange({ ...currentArea, color: '#D4AF37' })}
                    className="w-5 h-5 rounded-full bg-[#D4AF37] border border-slate-400"
                    title="ذهبي #D4AF37"
                  />
                  <span className="font-mono text-[10px] text-slate-400">{currentArea.color}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة إعدادات الكود الافتراضية</span>
            </button>
            <span className="text-[10px] text-slate-500 font-mono">وضع التطوير ?debug=true</span>
          </div>
        </div>
      )}
    </div>
  );
};
