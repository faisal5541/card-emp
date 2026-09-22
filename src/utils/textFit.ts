export interface TextFitResult {
  fontSize: number;
  lines: string[];
  lineHeight: number;
  totalHeight: number;
}

/**
 * Calculates optimal font size and wrapping lines for Arabic text to fit inside a bounding box.
 */
export function calculateFitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
  baseFontSize: number,
  minFontSize: number,
  fontFamily: string,
  fontWeight: number | string = 700,
  maxLines: number = 1
): TextFitResult {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return {
      fontSize: baseFontSize,
      lines: [''],
      lineHeight: baseFontSize * 1.3,
      totalHeight: baseFontSize * 1.3,
    };
  }

  // 1. Try single line from baseFontSize down to minFontSize
  let currentSize = baseFontSize;
  const step = 2;

  while (currentSize >= minFontSize) {
    ctx.font = `${fontWeight} ${currentSize}px "${fontFamily}", sans-serif`;
    const metrics = ctx.measureText(trimmedText);
    const textWidth = metrics.width;
    const lineHeight = currentSize * 1.25;

    if (textWidth <= maxWidth && lineHeight <= maxHeight) {
      return {
        fontSize: currentSize,
        lines: [trimmedText],
        lineHeight,
        totalHeight: lineHeight,
      };
    }

    currentSize -= step;
  }

  // 2. If single line didn't fit even at minFontSize and maxLines > 1, try splitting into 2 lines
  if (maxLines > 1) {
    const words = trimmedText.split(/\s+/);
    if (words.length >= 2) {
      const mid = Math.ceil(words.length / 2);
      const line1 = words.slice(0, mid).join(' ');
      const line2 = words.slice(mid).join(' ');

      currentSize = Math.max(minFontSize, Math.floor(baseFontSize * 0.75));
      while (currentSize >= Math.max(24, minFontSize * 0.8)) {
        ctx.font = `${fontWeight} ${currentSize}px "${fontFamily}", sans-serif`;
        const w1 = ctx.measureText(line1).width;
        const w2 = ctx.measureText(line2).width;
        const lineHeight = currentSize * 1.2;
        const totalHeight = lineHeight * 2;

        if (w1 <= maxWidth && w2 <= maxWidth && totalHeight <= maxHeight) {
          return {
            fontSize: currentSize,
            lines: [line1, line2],
            lineHeight,
            totalHeight,
          };
        }
        currentSize -= step;
      }
    }
  }

  // Fallback: use minFontSize, single line
  const finalSize = Math.max(24, minFontSize);
  return {
    fontSize: finalSize,
    lines: [trimmedText],
    lineHeight: finalSize * 1.25,
    totalHeight: finalSize * 1.25,
  };
}
