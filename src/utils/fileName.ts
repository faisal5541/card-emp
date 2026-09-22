/**
 * Sanitizes and generates a clean file name for card download.
 * Example: بطاقة_اليوم_الوطني_فيصل_محمد.png
 */
export function generateCardFileName(name: string): string {
  const cleanName = (name || 'الموظف')
    .trim()
    .replace(/[\/\\?%*:|"<>]/g, '') // remove forbidden characters
    .replace(/\s+/g, '_');           // replace whitespace with underscore

  return `بطاقة_اليوم_الوطني_${cleanName}.png`;
}
