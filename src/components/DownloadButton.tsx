import React, { useState } from 'react';
import { CardTemplate, NameAreaConfig } from '../types';
import { exportCardAsBlob } from '../utils/canvasRenderer';
import { generateCardFileName } from '../utils/fileName';
import { Download, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DownloadButtonProps {
  template: CardTemplate;
  name: string;
  userFontSize?: number;
  customNameArea?: Partial<NameAreaConfig>;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onMissingName: (message: string) => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  template,
  name,
  userFontSize,
  customNameArea,
  onSuccess,
  onError,
  onMissingName,
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleDownload = async () => {
    if (!name.trim()) {
      onMissingName('فضلاً اكتب اسمك أولاً.');
      return;
    }

    setIsExporting(true);

    try {
      // Generate full-resolution blob directly from the background image dimensions
      const blob = await exportCardAsBlob({
        template,
        name: name.trim(),
        userFontSize,
        customNameArea,
        debug: false,
      });

      // Trigger download
      const fileName = generateCardFileName(name);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Launch festive confetti
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#006C35', '#C5A869', '#FFFFFF', '#14352D'],
      });

      onSuccess('تم تجهيز بطاقتك بنجاح.');
    } catch (err: unknown) {
      console.error('Download error:', err);
      onError('تعذر إنشاء البطاقة، حاول مرة أخرى.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isExporting}
      className="flex-1 min-w-[160px] py-3.5 px-6 rounded-xl font-bold text-base bg-gradient-to-r from-saudi-900 via-saudi-800 to-saudi-950 text-white hover:from-saudi-800 hover:to-saudi-900 border border-saudi-600/40 shadow-lg shadow-saudi-950/20 hover:shadow-xl transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin text-gold-400" />
          <span>جاري التجهيز...</span>
        </>
      ) : (
        <>
          <Download className="w-5 h-5 text-gold-400" />
          <span>تحميل البطاقة</span>
        </>
      )}
    </button>
  );
};
