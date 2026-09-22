import React from 'react';
import { Minus, Plus, Type } from 'lucide-react';

interface FontSizeSliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (size: number) => void;
  onReset?: () => void;
  defaultSize?: number;
}

export const FontSizeSlider: React.FC<FontSizeSliderProps> = ({
  value,
  min = 30,
  max = 90,
  step = 2,
  onChange,
  onReset,
  defaultSize,
}) => {
  const handleDecrease = () => {
    onChange(Math.max(min, value - step));
  };

  const handleIncrease = () => {
    onChange(Math.min(max, value + step));
  };

  return (
    <div className="space-y-2 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
      <div className="flex items-center justify-between">
        <label
          htmlFor="font-size-slider"
          className="text-sm font-bold text-slate-800 flex items-center gap-1.5"
        >
          <Type className="w-4 h-4 text-saudi-700" />
          <span>حجم الاسم</span>
        </label>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-saudi-900">
            {value}px
          </span>
          {defaultSize && value !== defaultSize && onReset && (
            <button
              type="button"
              onClick={onReset}
              className="text-[11px] text-slate-500 hover:text-saudi-700 underline"
            >
              استعادة الافتراضي
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 pt-1">
        {/* Decrease Button [-] */}
        <button
          type="button"
          onClick={handleDecrease}
          disabled={value <= min}
          aria-label="تصغير حجم الخط"
          className="w-10 h-10 sm:w-9 sm:h-9 rounded-xl sm:rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-saudi-50 hover:text-saudi-900 hover:border-saudi-300 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm active:scale-95 shrink-0"
        >
          <Minus className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Range Slider */}
        <div className="flex-1 relative">
          <input
            id="font-size-slider"
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2.5 sm:h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-saudi-700 focus:outline-none focus:ring-2 focus:ring-saudi-500/20"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
            <span>{min}px</span>
            <span>{max}px</span>
          </div>
        </div>

        {/* Increase Button [+] */}
        <button
          type="button"
          onClick={handleIncrease}
          disabled={value >= max}
          aria-label="تكبير حجم الخط"
          className="w-10 h-10 sm:w-9 sm:h-9 rounded-xl sm:rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-saudi-50 hover:text-saudi-900 hover:border-saudi-300 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
