/** Small color-theory helpers used by the outfit matching engine. */

export interface Hsl {
  h: number;
  s: number;
  l: number;
}

export function hexToHsl(hex: string): Hsl {
  const clean = hex.replace('#', '');
  const bigint = parseInt(
    clean.length === 3
      ? clean.split('').map((c) => c + c).join('')
      : clean,
    16
  );
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return { h, s: s * 100, l: l * 100 };
}

/** Absolute hue distance on the 360-degree color wheel, in [0, 180]. */
export function hueDistance(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

export function isNeutral(hex: string): boolean {
  const { s, l } = hexToHsl(hex);
  return s < 15 || l < 12 || l > 92;
}

/**
 * Scores how well two colors pair, 0 (clashing) to 1 (great match).
 * Neutrals pair with everything; otherwise reward classic color-wheel
 * relationships: complementary (~180°), analogous (~0-40°), triadic (~120°).
 */
export function colorHarmonyScore(hexA: string, hexB: string): number {
  if (isNeutral(hexA) || isNeutral(hexB)) return 0.9;

  const { h: hA } = hexToHsl(hexA);
  const { h: hB } = hexToHsl(hexB);
  const dist = hueDistance(hA, hB);

  if (dist <= 20) return 0.85; // analogous / same family
  if (dist >= 150) return 0.95; // complementary
  if (dist >= 100 && dist <= 140) return 0.75; // triadic-ish
  if (dist > 20 && dist < 60) return 0.4; // muddy, too close but not matching
  return 0.55; // everything else, wearable but not ideal
}
