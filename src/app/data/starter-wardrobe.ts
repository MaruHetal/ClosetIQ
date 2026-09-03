import { ClothingItem } from '../models/clothing-item.model';
import { clothingPhotoUrl } from '../services/clothing-photo';

type StarterPiece = Omit<ClothingItem, 'id' | 'createdAt' | 'imageDataUrl'>;

const PIECES: StarterPiece[] = [
  // Girls — Indian wear
  { name: 'Pink Silk Saree', category: 'saree', color: '#f2a6c6', gender: 'girls', occasions: ['family-function', 'formal-event'] },
  { name: 'Rose Sari Blouse', category: 'blouse', color: '#e8709e', gender: 'girls', occasions: ['family-function', 'formal-event'] },
  { name: 'Peach Salwar Kameez', category: 'salwar-kameez', color: '#f6c9a8', gender: 'girls', occasions: ['casual', 'family-function'] },
  { name: 'Party Gown', category: 'gown', color: '#c23c7a', gender: 'girls', occasions: ['party', 'formal-event'] },
  { name: 'Floral Frock Dress', category: 'dress', color: '#e8b4cb', gender: 'girls', occasions: ['casual', 'party'] },

  // Girls — Western wear
  { name: 'Blush Pink Blouse', category: 'shirt', color: '#f2a6c6', gender: 'girls', occasions: ['office', 'family-function'] },
  { name: 'Blush Tee', category: 'tshirt', color: '#f7c9dc', gender: 'girls', occasions: ['casual'] },
  { name: 'Blush Trousers', category: 'pants', color: '#e8b4cb', gender: 'girls', occasions: ['office', 'formal-event'] },
  { name: 'Rosewood Denim Jacket', category: 'jacket', color: '#b96c8f', gender: 'girls', occasions: ['casual', 'family-function'] },

  // Boys — Indian wear
  { name: 'Cream Kurta', category: 'kurta', color: '#f2e2c6', gender: 'boys', occasions: ['family-function', 'formal-event'] },
  { name: 'Maroon Festive Kurta', category: 'kurta', color: '#7a2e3e', gender: 'boys', occasions: ['party', 'family-function'] },

  // Boys — Western wear
  { name: 'Sky Blue Oxford Shirt', category: 'shirt', color: '#8fb8d6', gender: 'boys', occasions: ['office', 'family-function'] },
  { name: 'Classic Grey Tee', category: 'tshirt', color: '#9aa0a6', gender: 'boys', occasions: ['casual', 'workout'] },
  { name: 'Navy Chinos', category: 'pants', color: '#33475b', gender: 'boys', occasions: ['office', 'formal-event'] },
  { name: 'Indigo Jeans', category: 'jeans', color: '#3b5a86', gender: 'boys', occasions: ['casual', 'family-function'] },
  { name: 'Charcoal Blazer', category: 'jacket', color: '#4a4a52', gender: 'boys', occasions: ['formal-event', 'party'] },

  // Unisex basics
  { name: 'White Essential Tee', category: 'tshirt', color: '#fdfaf7', gender: 'unisex', occasions: ['casual', 'workout'] },
  { name: 'Black Slim Trousers', category: 'pants', color: '#2b2b2f', gender: 'unisex', occasions: ['office', 'formal-event', 'party'] },
  { name: 'White Sneakers', category: 'shoes', color: '#fdfaf7', gender: 'unisex', occasions: ['casual', 'workout'] },
];

/** Ready-made pieces used to seed a new closet, so suggestions appear immediately. */
export const STARTER_WARDROBE: Omit<ClothingItem, 'id' | 'createdAt'>[] = PIECES.map((p) => ({
  ...p,
  imageDataUrl: clothingPhotoUrl(p.category, p.gender),
}));
