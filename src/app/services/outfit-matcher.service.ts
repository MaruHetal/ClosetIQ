import { Injectable } from '@angular/core';
import {
  BOTTOM_CATEGORIES,
  ClothingItem,
  OUTER_CATEGORIES,
  Occasion,
  TOP_CATEGORIES,
} from '../models/clothing-item.model';
import { colorHarmonyScore } from './color-utils';

export interface OutfitSuggestion {
  top: ClothingItem;
  bottom: ClothingItem;
  jacket?: ClothingItem;
  score: number; // 0-1, higher is better
}

@Injectable({ providedIn: 'root' })
export class OutfitMatcherService {
  /**
   * Builds ranked top+bottom(+jacket) combinations for an occasion,
   * scored by color harmony and occasion fit.
   */
  suggest(items: ClothingItem[], occasion: Occasion, limit = 6): OutfitSuggestion[] {
    const tops = items.filter(
      (i) => TOP_CATEGORIES.includes(i.category) && i.occasions.includes(occasion)
    );
    const bottoms = items.filter(
      (i) => BOTTOM_CATEGORIES.includes(i.category) && i.occasions.includes(occasion)
    );
    const jackets = items.filter(
      (i) => OUTER_CATEGORIES.includes(i.category) && i.occasions.includes(occasion)
    );

    const suggestions: OutfitSuggestion[] = [];

    for (const top of tops) {
      for (const bottom of bottoms) {
        const baseScore = colorHarmonyScore(top.color, bottom.color);

        if (jackets.length === 0) {
          suggestions.push({ top, bottom, score: baseScore });
          continue;
        }

        for (const jacket of jackets) {
          const jacketScore =
            (colorHarmonyScore(top.color, jacket.color) +
              colorHarmonyScore(bottom.color, jacket.color)) /
            2;
          suggestions.push({
            top,
            bottom,
            jacket,
            score: (baseScore + jacketScore) / 2,
          });
        }
        // Also offer the jacket-free version so it isn't crowded out.
        suggestions.push({ top, bottom, score: baseScore });
      }
    }

    return suggestions.sort((a, b) => b.score - a.score).slice(0, limit);
  }
}
