import { CardTemplate, NameAreaConfig } from '../types';
import { calculateFitText } from './textFit';

// Cache for loaded template images to avoid repeated network / memory overhead
const imageCache = new Map<string, HTMLImageElement>();

export function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(src);
  if (cached && cached.complete && cached.naturalWidth > 0) {
    return Promise.resolve(cached);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

export interface RenderCardOptions {
  template: CardTemplate;
  name: string;
  userFontSize?: number; // Custom font size chosen by user
  debug?: boolean;       // If true, render calibration guidelines
  customNameArea?: Partial<NameAreaConfig>; // For real-time calibration overrides
}

/**
 * Draws the card on an arbitrary Canvas context.
 * Can be used for both the on-screen preview canvas and the off-screen full-res export canvas.
 */
export async function drawCardOnCanvas(
  canvas: HTMLCanvasElement,
  options: RenderCardOptions
): Promise<{ width: number; height: number; fittedFontSize: number }> {
  const { template, name, userFontSize, debug = false, customNameArea } = options;

  // 1. Ensure fonts are loaded before drawing Arabic typography
  if ('fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font ready errors
    }
  }

  // 2. Load background image
  const img = await loadImage(template.image);
  const naturalWidth = img.naturalWidth || 1440;
  const naturalHeight = img.naturalHeight || 2560;

  // Set canvas size to natural image size
  if (canvas.width !== naturalWidth || canvas.height !== naturalHeight) {
    canvas.width = naturalWidth;
    canvas.height = naturalHeight;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  // 3. Draw background image 1:1
  ctx.clearRect(0, 0, naturalWidth, naturalHeight);
  ctx.drawImage(img, 0, 0, naturalWidth, naturalHeight);

  // 4. Compute Name Area coordinates using percentage system
  const area: NameAreaConfig = {
    ...template.nameArea,
    ...customNameArea,
  };

  const boxCenterX = (area.x / 100) * naturalWidth;
  const boxCenterY = (area.y / 100) * naturalHeight;
  const boxWidth = (area.width / 100) * naturalWidth;
  const boxHeight = (area.height / 100) * naturalHeight;
  const boxLeft = boxCenterX - boxWidth / 2;
  const boxTop = boxCenterY - boxHeight / 2;

  // 5. Compute font size & fitting
  const baseSize = userFontSize || area.fontSize;
  const fitResult = calculateFitText(
    ctx,
    name || 'اسم الموظف',
    boxWidth * 0.95, // leave 5% padding
    boxHeight * 0.9,
    baseSize,
    area.minFontSize,
    area.fontFamily,
    area.fontWeight,
    area.maxLines || 1
  );

  // 6. Draw Name if provided or in debug mode
  if (name.trim() || debug) {
    const textToDraw = name.trim() || (debug ? 'فيصل محمد' : '');

    ctx.save();
    ctx.direction = 'rtl';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = area.color;
    ctx.font = `${area.fontWeight} ${fitResult.fontSize}px "${area.fontFamily}", "IBM Plex Sans Arabic", sans-serif`;

    // Add gentle text shadow if specified or subtle depth
    if (area.color.toUpperCase() === '#FFFFFF') {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
    }

    if (fitResult.lines.length === 1) {
      ctx.fillText(textToDraw, boxCenterX, boxCenterY);
    } else {
      // 2 lines centered vertically
      const totalH = fitResult.totalHeight;
      const startY = boxCenterY - totalH / 2 + fitResult.lineHeight / 2;
      fitResult.lines.forEach((line, index) => {
        ctx.fillText(line, boxCenterX, startY + index * fitResult.lineHeight);
      });
    }

    ctx.restore();
  }

  // 7. Render Debug / Calibration overlay if active
  if (debug) {
    ctx.save();
    // Bounding Box outline
    ctx.strokeStyle = '#ef4444'; // Red
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 8]);
    ctx.strokeRect(boxLeft, boxTop, boxWidth, boxHeight);

    // Box center crosshair
    ctx.strokeStyle = '#3b82f6'; // Blue
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(boxCenterX - 30, boxCenterY);
    ctx.lineTo(boxCenterX + 30, boxCenterY);
    ctx.moveTo(boxCenterX, boxCenterY - 30);
    ctx.lineTo(boxCenterX, boxCenterY + 30);
    ctx.stroke();

    // Debug Label
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(boxLeft, Math.max(0, boxTop - 45), 380, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.direction = 'ltr';
    ctx.fillText(
      `X:${area.x.toFixed(1)}% Y:${area.y.toFixed(1)}% W:${area.width.toFixed(1)}% H:${area.height.toFixed(1)}%`,
      boxLeft + 10,
      Math.max(20, boxTop - 25)
    );

    ctx.restore();
  }

  return {
    width: naturalWidth,
    height: naturalHeight,
    fittedFontSize: fitResult.fontSize,
  };
}

/**
 * Creates a full-resolution PNG Blob ready for download or file sharing.
 */
export async function exportCardAsBlob(options: RenderCardOptions): Promise<Blob> {
  const canvas = document.createElement('canvas');
  await drawCardOnCanvas(canvas, { ...options, debug: false });

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create PNG blob from canvas'));
      }
    }, 'image/png');
  });
}
