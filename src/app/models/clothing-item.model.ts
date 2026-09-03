export type ClothingCategory =
  | 'top'
  | 'tshirt'
  | 'shirt'
  | 'pants'
  | 'jeans'
  | 'jacket'
  | 'shoes'
  | 'accessory';

export type Occasion =
  | 'office'
  | 'family-function'
  | 'casual'
  | 'party'
  | 'formal-event'
  | 'workout';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  color: string; // hex color, e.g. #1a2b3c
  occasions: Occasion[];
  purchasedFrom?: string;
  imageDataUrl?: string; // base64 image stored locally
  createdAt: number;
}

export const CATEGORY_LABELS: Record<ClothingCategory, string> = {
  top: 'Top',
  tshirt: 'T-Shirt',
  shirt: 'Shirt',
  pants: 'Pants',
  jeans: 'Jeans',
  jacket: 'Jacket',
  shoes: 'Shoes',
  accessory: 'Accessory',
};

export const OCCASION_LABELS: Record<Occasion, string> = {
  office: 'Office',
  'family-function': 'Family Function',
  casual: 'Casual Outing',
  party: 'Party',
  'formal-event': 'Formal Event',
  workout: 'Workout',
};

export const TOP_CATEGORIES: ClothingCategory[] = ['top', 'tshirt', 'shirt'];
export const BOTTOM_CATEGORIES: ClothingCategory[] = ['pants', 'jeans'];
export const OUTER_CATEGORIES: ClothingCategory[] = ['jacket'];
