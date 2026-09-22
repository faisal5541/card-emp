import React from 'react';
import { User, X } from 'lucide-react';

interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export const NameInput: React.FC<NameInputProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="employee-name-input"
          className="block text-sm font-bold text-slate-800"
        >
          اكتب اسمك
        </label>
        <span className="text-xs text-slate-400">
          {value.length}/50 حرف
        </span>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
          <User className="w-5 h-5" />
        </div>
        <input
          id="employee-name-input"
          type="text"
          value={value}
          maxLength={50}
          dir="rtl"
          onChange={(e) => onChange(e.target.value)}
          placeholder="مثال: فيصل محمد"
          className={`w-full pr-11 pl-10 py-3.5 rounded-xl text-base font-semibold text-slate-900 bg-white border-2 shadow-sm placeholder:text-slate-400 focus:outline-none transition-all ${
            error
              ? 'border-rose-400 focus:border-rose-600 focus:ring-4 focus:ring-rose-500/10'
              : 'border-slate-200 focus:border-saudi-600 focus:ring-4 focus:ring-saudi-500/10'
          }`}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            title="مسح الاسم"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {error ? (
        <p className="text-xs font-medium text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in">
          <span>{error}</span>
        </p>
      ) : (
        <p className="text-xs text-slate-500">
          سيتم ضبط الخط ومكانه بدقة وبشكل تلقائي في البطاقة.
        </p>
      )}
    </div>
  );
};
