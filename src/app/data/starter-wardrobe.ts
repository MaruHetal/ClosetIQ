import { ClothingItem } from '../models/clothing-item.model';
import { clothingIconDataUrl } from '../services/clothing-icon';

type StarterPiece = Omit<ClothingItem, 'id' | 'createdAt' | 'imageDataUrl'>;

const PIECES: StarterPiece[] = [
  // Girls
  { name: 'Rose Pink Blouse', category: 'shirt', color: '#f2a6c6', gender: 'girls', occasions: ['office', 'family-function'] },
  { name: 'Blush Tee', category: 'tshirt', color: '#f7c9dc', gender: 'girls', occasions: ['casual'] },
  { name: 'White Lace Top', category: 'top', color: '#fdfaf7', gender: 'girls', occasions: ['party', 'formal-event'] },
  { name: 'Floral Skater Skirt Jeans', category: 'jeans', color: '#c98fb0', gender: 'girls', occasions: ['casual', 'party'] },
  { name: 'Blush Trousers', category: 'pants', color: '#e8b4cb', gender: 'girls', occasions: ['office', 'formal-event'] },
  { name: 'Rosewood Denim Jacket', category: 'jacket', color: '#b96c8f', gender: 'girls', occasions: ['casual', 'family-function'] },
  { name: 'Berry Party Tee', category: 'tshirt', color: '#d16b93', gender: 'girls', occasions: ['party'] },

  // Boys
  { name: 'Sky Blue Oxford Shirt', category: 'shirt', color: '#8fb8d6', gender: 'boys', occasions: ['office', 'family-function'] },
  { name: 'Classic Grey Tee', category: 'tshirt', color: '#9aa0a6', gender: 'boys', occasions: ['casual', 'workout'] },
  { name: 'Navy Chinos', category: 'pants', color: '#33475b', gender: 'boys', occasions: ['office', 'formal-event'] },
  { name: 'Indigo Jeans', category: 'jeans', color: '#3b5a86', gender: 'boys', occasions: ['casual', 'family-function'] },
  { name: 'Charcoal Blazer', category: 'jacket', color: '#4a4a52', gender: 'boys', occasions: ['formal-event', 'party'] },
  { name: 'Forest Green Polo', category: 'shirt', color: '#4f7a63', gender: 'boys', occasions: ['casual', 'family-function'] },

  // Unisex basics
  { name: 'White Essential Tee', category: 'tshirt', color: '#fdfaf7', gender: 'unisex', occasions: ['casual', 'workout'] },
  { name: 'Black Slim Trousers', category: 'pants', color: '#2b2b2f', gender: 'unisex', occasions: ['office', 'formal-event', 'party'] },
  { name: 'Light-Wash Denim Jacket', category: 'jacket', color: '#a9c4dd', gender: 'unisex', occasions: ['casual'] },
];

/** Ready-made pieces used to seed a new closet, so suggestions appear immediately. */
export const STARTER_WARDROBE: Omit<ClothingItem, 'id' | 'createdAt'>[] = PIECES.map((p) => ({
  ...p,
  imageDataUrl: clothingIconDataUrl(p.category, p.color),
}));
