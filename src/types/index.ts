export interface NameAreaConfig {
  x: number;          // Percentage of image width (0-100), center X
  y: number;          // Percentage of image height (0-100), center Y
  width: number;      // Percentage of image width (0-100)
  height: number;     // Percentage of image height (0-100)
  fontFamily: string; // e.g. "Tajawal"
  fontSize: number;   // Base font size in px at original resolution
  minFontSize: number;// Minimum font size during auto-fit
  maxFontSize: number;// Maximum allowed font size
  color: string;      // Hex color e.g. "#FFFFFF" or "#153e35"
  fontWeight: number | string; // e.g. 700 or "bold"
  textAlign: 'center' | 'left' | 'right';
  verticalAlign?: 'middle' | 'top' | 'bottom';
  maxLines: number;   // Usually 1, max 2 for very long names
  textShadow?: string;// Optional subtle shadow for contrast
}

export interface CardTemplate {
  id: string;
  title: string;
  badgeTitle?: string;
  description?: string;
  image: string;
  nameArea: NameAreaConfig;
  aspectRatio?: number; // width / height
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}
