import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        let bgStyle = 'bg-slate-900 text-white border-slate-700';
        let Icon = Info;
        let iconColor = 'text-blue-400';

        if (toast.type === 'success') {
          bgStyle = 'bg-[#0B241E] text-white border-emerald-600/60 shadow-lg shadow-emerald-950/20';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
        } else if (toast.type === 'warning') {
          bgStyle = 'bg-amber-950/95 text-amber-50 border-amber-600/60 shadow-lg';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else if (toast.type === 'error') {
          bgStyle = 'bg-rose-950/95 text-rose-50 border-rose-600/60 shadow-lg';
          Icon = AlertCircle;
          iconColor = 'text-rose-400';
        }

        return (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-3 ${bgStyle}`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />
              <p className="text-sm font-medium leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              aria-label="إغلاق الإشعار"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
