import { generateCardFileName } from './fileName';

export interface ShareResult {
  success: boolean;
  message?: string;
  fallbackNeeded?: boolean;
}

/**
 * Attempts to share the generated PNG image using navigator.share with files support.
 */
export async function shareCardFile(blob: Blob, employeeName: string): Promise<ShareResult> {
  const fileName = generateCardFileName(employeeName);
  const file = new File([blob], fileName, { type: 'image/png' });

  // 1. Check if navigator.share exists
  if (!navigator.share) {
    return {
      success: false,
      fallbackNeeded: true,
      message: 'جهازك لا يدعم المشاركة المباشرة، يمكنك تحميل البطاقة ومشاركتها يدويًا.',
    };
  }

  // 2. Check if canShare supports sharing this file
  const shareData = {
    title: 'بطاقة تهنئة باليوم الوطني السعودي',
    text: `تهنئة بمناسبة اليوم الوطني السعودي 96 - ${employeeName}`,
    files: [file],
  };

  try {
    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      return {
        success: true,
        message: 'تمت مشاركة البطاقة بنجاح.',
      };
    } else {
      // Browser supports navigator.share but not files directly
      return {
        success: false,
        fallbackNeeded: true,
        message: 'جهازك لا يدعم مشاركة الملفات المباشرة، يمكنك تحميل البطاقة ومشاركتها يدويًا.',
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      // User cancelled share dialog, not an error
      return { success: false, message: '' };
    }
    return {
      success: false,
      fallbackNeeded: true,
      message: 'تعذر مشاركة البطاقة مباشرة، يرجى تحميلها.',
    };
  }
}
