/**
 * Estimates a garment's dominant color entirely in the browser.
 * Very bright background pixels and transparent pixels are ignored so a
 * product photo on a white background still produces a useful result.
 */
export function dominantColorFromImage(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 80;
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        reject(new Error('Image analysis is not available in this browser.'));
        return;
      }

      context.drawImage(image, 0, 0, size, size);
      const pixels = context.getImageData(0, 0, size, size).data;
      const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();

      for (let i = 0; i < pixels.length; i += 16) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const alpha = pixels[i + 3];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        if (alpha < 180 || (min > 238 && max - min < 12)) continue;

        const key = `${Math.round(r / 32)}-${Math.round(g / 32)}-${Math.round(b / 32)}`;
        const bucket = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0 };
        bucket.count++;
        bucket.r += r;
        bucket.g += g;
        bucket.b += b;
        buckets.set(key, bucket);
      }

      const dominant = [...buckets.values()].sort((a, b) => b.count - a.count)[0];
      if (!dominant) {
        resolve('#6B7280');
        return;
      }

      const toHex = (value: number) =>
        Math.round(value / dominant.count)
          .toString(16)
          .padStart(2, '0');
      resolve(`#${toHex(dominant.r)}${toHex(dominant.g)}${toHex(dominant.b)}`.toUpperCase());
    };
    image.onerror = () => reject(new Error('That image could not be read.'));
    image.src = dataUrl;
  });
}

/** Shrinks camera photos before they are persisted in localStorage. */
export function resizeImageForStorage(
  dataUrl: string,
  maxDimension = 900,
  quality = 0.82,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Image resizing is not available in this browser.'));
        return;
      }
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    image.onerror = () => reject(new Error('That image could not be read.'));
    image.src = dataUrl;
  });
}
