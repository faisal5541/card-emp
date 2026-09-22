import React, { useEffect, useRef, useState } from 'react';
import { CardTemplate, NameAreaConfig } from '../types';
import { drawCardOnCanvas } from '../utils/canvasRenderer';
import { Loader2 } from 'lucide-react';

interface CardPreviewProps {
  template: CardTemplate;
  name: string;
  userFontSize?: number;
  debug?: boolean;
  customNameArea?: Partial<NameAreaConfig>;
  onRenderComplete?: (fittedSize: number) => void;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  template,
  name,
  userFontSize,
  debug = false,
  customNameArea,
  onRenderComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const render = async () => {
      if (!canvasRef.current) return;
      setIsLoading(true);
      setError(null);

      try {
        const result = await drawCardOnCanvas(canvasRef.current, {
          template,
          name,
          userFontSize,
          debug,
          customNameArea,
        });

        if (!isCancelled && onRenderComplete) {
          onRenderComplete(result.fittedFontSize);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          console.error('Canvas render error:', err);
          setError('تعذر تحميل قالب البطاقة.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    render();

    return () => {
      isCancelled = true;
    };
  }, [template, name, userFontSize, debug, customNameArea, onRenderComplete]);

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center select-none">
      {/* Container with rounded frame and elegant shadow */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-200/50">
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-white">
            <Loader2 className="w-8 h-8 animate-spin text-gold-400 mb-2" />
            <span className="text-xs font-medium">جاري معالجة البطاقة...</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-rose-950/80 text-white p-4 text-center">
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Canvas displaying 1:1 preview */}
        <canvas
          ref={canvasRef}
          className="w-full h-auto block object-contain transition-opacity duration-300"
          style={{ maxHeight: '72vh' }}
        />

        {/* Debug watermark badge */}
        {debug && (
          <div className="absolute top-2 left-2 z-30 bg-rose-600/90 text-white font-mono text-[10px] px-2 py-0.5 rounded shadow">
            CALIBRATION MODE (DEBUG)
          </div>
        )}
      </div>

      <div className="mt-2 text-center text-xs text-slate-500 font-medium">
        معاينة حية ومطابقة 100% للبطاقة النهائية
      </div>
    </div>
  );
};
