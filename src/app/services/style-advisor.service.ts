import { Injectable } from '@angular/core';
import {
  BOTTOM_CATEGORIES,
  ClothingCategory,
  ClothingItem,
  ONE_PIECE_CATEGORIES,
  OUTER_CATEGORIES,
  TOP_CATEGORIES,
} from '../models/clothing-item.model';
import { colorHarmonyScore, hexToHsl } from './color-utils';

export type GarmentRole = 'top' | 'bottom' | 'one-piece' | 'layer' | 'saree';

export interface ColorRecommendation {
  name: string;
  hex: string;
  pairing: string;
  explanation: string;
  garmentIdeas: string[];
}

export interface ClosetMatch {
  item: ClothingItem;
  score: number;
  explanation: string;
}

interface NamedColor {
  name: string;
  hex: string;
}

const NEUTRALS: NamedColor[] = [
  { name: 'Crisp White', hex: '#F7F5EF' },
  { name: 'Soft Beige', hex: '#D8C3A5' },
  { name: 'Charcoal', hex: '#353A40' },
  { name: 'Classic Black', hex: '#171717' },
  { name: 'Navy', hex: '#1D3557' },
  { name: 'Chocolate Brown', hex: '#5D4037' },
];

const COLOR_NAMES: NamedColor[] = [
  { name: 'Red', hex: '#C43D4F' },
  { name: 'Coral', hex: '#E77965' },
  { name: 'Mustard', hex: '#C99624' },
  { name: 'Olive', hex: '#6F7845' },
  { name: 'Emerald', hex: '#28755A' },
  { name: 'Teal', hex: '#287A7B' },
  { name: 'Sky Blue', hex: '#6FA8D6' },
  { name: 'Royal Blue', hex: '#3454A4' },
  { name: 'Lavender', hex: '#A28AC8' },
  { name: 'Plum', hex: '#70405F' },
  { name: 'Blush Pink', hex: '#D995A6' },
  ...NEUTRALS,
];

@Injectable({ providedIn: 'root' })
export class StyleAdvisorService {
  roleFor(category: ClothingCategory): GarmentRole {
    if (category === 'saree') return 'saree';
    if (TOP_CATEGORIES.includes(category)) return 'top';
    if (BOTTOM_CATEGORIES.includes(category)) return 'bottom';
    if (ONE_PIECE_CATEGORIES.includes(category)) return 'one-piece';
    if (OUTER_CATEGORIES.includes(category)) return 'layer';
    return category === 'shoes' ? 'bottom' : 'layer';
  }

  colorName(hex: string): string {
    const source = hexToHsl(hex);
    let best = COLOR_NAMES[0];
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const color of COLOR_NAMES) {
      const candidate = hexToHsl(color.hex);
      const hueDelta = Math.min(
        Math.abs(source.h - candidate.h),
        360 - Math.abs(source.h - candidate.h),
      );
      const distance =
        hueDelta * (source.s < 16 ? 0.1 : 1) +
        Math.abs(source.s - candidate.s) * 0.35 +
        Math.abs(source.l - candidate.l) * 0.55;
      if (distance < bestDistance) {
        best = color;
        bestDistance = distance;
      }
    }
    return best.name;
  }

  recommendations(baseHex: string, category: ClothingCategory): ColorRecommendation[] {
    const { h, s, l } = hexToHsl(baseHex);
    const role = this.roleFor(category);
    const complementary = this.hslToHex((h + 180) % 360, Math.max(35, s * 0.75), 48);
    const analogous = this.hslToHex((h + 32) % 360, Math.max(28, s * 0.7), Math.min(64, l + 6));
    const tonal = this.hslToHex(h, Math.max(22, s * 0.55), l > 55 ? 30 : 72);
    const dynamic: ColorRecommendation[] = [
      {
        name: this.colorName(complementary),
        hex: complementary,
        pairing: 'Statement contrast',
        explanation: 'Opposite sides of the color wheel create a confident, balanced focal point.',
        garmentIdeas: this.garmentIdeas(category, role, 'statement'),
      },
      {
        name: this.colorName(analogous),
        hex: analogous,
        pairing: 'Modern tonal blend',
        explanation: 'A nearby hue keeps the outfit coordinated while adding gentle color depth.',
        garmentIdeas: this.garmentIdeas(category, role, 'relaxed'),
      },
      {
        name: this.colorName(tonal),
        hex: tonal,
        pairing: 'Tonal dressing',
        explanation:
          'A lighter or darker shade from the same family looks polished and intentional.',
        garmentIdeas: this.garmentIdeas(category, role, 'smart'),
      },
    ];

    const neutralChoices = this.bestNeutrals(baseHex)
      .slice(0, 3)
      .map((color, index) => ({
        ...color,
        pairing: index === 0 ? 'Safest choice' : index === 1 ? 'Smart casual' : 'Everyday classic',
        explanation:
          index === 0
            ? 'A clean neutral lets your main garment lead and works across most occasions.'
            : 'This grounded neutral balances the color without making the outfit feel busy.',
        garmentIdeas: this.garmentIdeas(category, role, index === 0 ? 'classic' : 'casual'),
      }));

    return [...neutralChoices, ...dynamic];
  }

  closetMatches(
    baseHex: string,
    category: ClothingCategory,
    items: ClothingItem[],
    excludeId?: string,
  ): ClosetMatch[] {
    const baseRole = this.roleFor(category);
    return items
      .filter(
        (item) => item.id !== excludeId && this.categoriesPair(category, item.category, baseRole),
      )
      .map((item) => {
        const score = colorHarmonyScore(baseHex, item.color);
        return {
          item,
          score,
          explanation:
            score >= 0.9
              ? 'Excellent color balance'
              : score >= 0.75
                ? 'Coordinated and wearable'
                : 'A bolder, more expressive pairing',
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }

  private categoriesPair(
    first: ClothingCategory,
    second: ClothingCategory,
    firstRole = this.roleFor(first),
  ): boolean {
    if (first === 'saree') return second === 'blouse' || OUTER_CATEGORIES.includes(second);
    if (second === 'saree') return first === 'blouse' || OUTER_CATEGORIES.includes(first);
    return this.rolesPair(firstRole, this.roleFor(second));
  }

  private rolesPair(first: GarmentRole, second: GarmentRole): boolean {
    if (first === 'saree') return second === 'top' || second === 'layer';
    if (first === 'top') return second === 'bottom' || second === 'layer' || second === 'saree';
    if (first === 'bottom') return second === 'top' || second === 'layer';
    if (first === 'one-piece') return second === 'layer';
    return second === 'top' || second === 'bottom' || second === 'one-piece' || second === 'saree';
  }

  private garmentIdeas(category: ClothingCategory, role: GarmentRole, mood: string): string[] {
    if (category === 'saree') return ['saree blouse', 'light jacket', 'gold or pearl accessories'];
    if (category === 'blouse') {
      return mood === 'statement'
        ? ['silk saree', 'wide-leg trousers', 'midi skirt']
        : ['saree', 'high-waist jeans', 'palazzo pants'];
    }
    if (role === 'top') {
      return mood === 'statement'
        ? ['wide-leg trousers', 'midi skirt', 'straight jeans']
        : ['tailored trousers', 'jeans', 'chinos'];
    }
    if (role === 'bottom') {
      return mood === 'smart'
        ? ['Oxford shirt', 'fitted blouse', 'fine-knit top']
        : ['cotton shirt', 'plain T-shirt', 'kurta'];
    }
    if (role === 'one-piece') return ['light jacket', 'structured blazer', 'shoes or accessories'];
    return ['simple top', 'one-piece dress', 'trousers'];
  }

  private bestNeutrals(baseHex: string): NamedColor[] {
    return [...NEUTRALS].sort(
      (a, b) => colorHarmonyScore(baseHex, b.hex) - colorHarmonyScore(baseHex, a.hex),
    );
  }

  private hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const chroma = (1 - Math.abs(2 * l - 1)) * s;
    const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - chroma / 2;
    let [r, g, b] = [0, 0, 0];

    if (h < 60) [r, g] = [chroma, x];
    else if (h < 120) [r, g] = [x, chroma];
    else if (h < 180) [g, b] = [chroma, x];
    else if (h < 240) [g, b] = [x, chroma];
    else if (h < 300) [r, b] = [x, chroma];
    else [r, b] = [chroma, x];

    const toHex = (value: number) =>
      Math.round((value + m) * 255)
        .toString(16)
        .padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }
}
