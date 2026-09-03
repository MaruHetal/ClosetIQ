import { ClothingCategory } from '../models/clothing-item.model';

/**
 * Renders a simple flat-illustration SVG for a clothing category/color,
 * used as the artwork for starter-wardrobe pieces (no photo on file).
 */
export function clothingIconDataUrl(category: ClothingCategory, color: string): string {
  const shape = SHAPES[category] ?? SHAPES['tshirt'];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#fdf1f6"/>
      ${shape(color)}
    </svg>`.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const SHAPES: Record<ClothingCategory, (color: string) => string> = {
  tshirt: (c) => `
    <path d="M30 22 L42 14 Q50 20 58 14 L70 22 L82 34 L72 44 L66 38 L66 86 L34 86 L34 38 L28 44 L18 34 Z"
      fill="${c}" stroke="#7a5568" stroke-width="2" stroke-linejoin="round"/>`,
  shirt: (c) => `
    <path d="M30 22 L42 14 Q50 20 58 14 L70 22 L82 34 L72 44 L66 38 L66 86 L34 86 L34 38 L28 44 L18 34 Z"
      fill="${c}" stroke="#7a5568" stroke-width="2" stroke-linejoin="round"/>
    <line x1="50" y1="24" x2="50" y2="84" stroke="#7a5568" stroke-width="1.5" stroke-dasharray="2 3"/>
    <circle cx="50" cy="34" r="1.6" fill="#7a5568"/>
    <circle cx="50" cy="46" r="1.6" fill="#7a5568"/>
    <circle cx="50" cy="58" r="1.6" fill="#7a5568"/>`,
  top: (c) => `
    <path d="M32 26 L44 16 Q50 22 56 16 L68 26 L64 40 L64 88 L36 88 L36 40 Z"
      fill="${c}" stroke="#7a5568" stroke-width="2" stroke-linejoin="round"/>`,
  pants: (c) => `
    <path d="M32 12 H68 L70 30 L64 88 H54 L50 40 L46 88 H36 L30 30 Z"
      fill="${c}" stroke="#7a5568" stroke-width="2" stroke-linejoin="round"/>
    <line x1="32" y1="20" x2="68" y2="20" stroke="#7a5568" stroke-width="1.5"/>`,
  jeans: (c) => `
    <path d="M32 12 H68 L70 30 L64 88 H54 L50 40 L46 88 H36 L30 30 Z"
      fill="${c}" stroke="#5a4a63" stroke-width="2" stroke-linejoin="round"/>
    <path d="M32 20 H68" stroke="#5a4a63" stroke-width="1.5"/>
    <path d="M40 30 L38 80 M60 30 L62 80" stroke="#f4e7ee" stroke-width="1" stroke-dasharray="3 2"/>`,
  jacket: (c) => `
    <path d="M28 24 L42 14 Q50 20 58 14 L72 24 L84 38 L74 48 L68 40 L68 88 L32 88 L32 40 L26 48 L16 38 Z"
      fill="${c}" stroke="#7a5568" stroke-width="2" stroke-linejoin="round"/>
    <line x1="50" y1="22" x2="50" y2="86" stroke="#7a5568" stroke-width="1.5"/>
    <path d="M42 16 L38 30 M58 16 L62 30" stroke="#7a5568" stroke-width="1.5"/>`,
  shoes: (c) => `
    <path d="M18 70 Q18 58 32 58 L58 58 L82 68 Q86 70 86 76 L86 82 L18 82 Z"
      fill="${c}" stroke="#7a5568" stroke-width="2" stroke-linejoin="round"/>`,
  accessory: (c) => `
    <circle cx="50" cy="50" r="24" fill="none" stroke="${c}" stroke-width="6"/>
    <circle cx="50" cy="50" r="6" fill="${c}"/>`,
};
