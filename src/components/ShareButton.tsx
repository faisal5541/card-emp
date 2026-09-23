import React, { useState } from 'react';
import { CardTemplate, NameAreaConfig } from '../types';
import { exportCardAsBlob } from '../utils/canvasRenderer';
import { shareCardFile } from '../utils/share';
import { Share2, Loader2 } from 'lucide-react';
import { track } from '@vercel/analytics';

interface ShareButtonProps {
  template: CardTemplate;
  name: string;
  userFontSize?: number;
  customNameArea?: Partial<NameAreaConfig>;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onMissingName: (message: string) => void;
  onFallback: (message: string) => void;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  template,
  name,
  userFontSize,
  customNameArea,
  onSuccess,
  onError,
  onMissingName,
  onFallback,
}) => {
  const [isSharing, setIsSharing] = useState<boolean>(false);

  const handleShare = async () => {
    if (!name.trim()) {
      onMissingName('فضلاً اكتب اسمك أولاً.');
      return;
    }

    setIsSharing(true);

    try {
      // 1. Render PNG Blob
      const blob = await exportCardAsBlob({
        template,
        name: name.trim(),
        userFontSize,
        customNameArea,
        debug: false,
      });

      // 2. Share using Web Share API
      const result = await shareCardFile(blob, name.trim());

      if (result.success) {
        try {
          track('Card Shared', { template: template.title });
        } catch {
          // analytics silent
        }
        onSuccess(result.message || 'تمت مشاركة البطاقة بنجاح.');
      } else if (result.fallbackNeeded) {
        onFallback(result.message || 'جهازك لا يدعم المشاركة المباشرة، يمكنك تحميل البطاقة ومشاركتها يدويًا.');
      }
    } catch (err: unknown) {
      console.error('Share error:', err);
      onError('تعذر إنشاء البطاقة، حاول مرة أخرى.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={isSharing}
      className="flex-1 min-w-[140px] py-3.5 px-5 rounded-xl font-bold text-base bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-saudi-400 shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none"
    >
      {isSharing ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin text-saudi-700" />
          <span>جاري التجهيز...</span>
        </>
      ) : (
        <>
          <Share2 className="w-5 h-5 text-saudi-700" />
          <span>مشاركة البطاقة</span>
        </>
      )}
    </button>
  );
};
