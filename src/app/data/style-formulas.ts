import { ClothingCategory } from '../models/clothing-item.model';

export interface FormulaPiece {
  label: string;
  color: string;
  category: ClothingCategory;
}

export interface StyleFormula {
  id: string;
  title: string;
  occasion: string;
  why: string;
  start: FormulaPiece;
  pairings: FormulaPiece[];
}

export const STYLE_FORMULAS: StyleFormula[] = [
  {
    id: 'navy-ivory',
    title: 'Navy shirt, ivory trousers',
    occasion: 'Office',
    why: 'A deep blue shirt with an off-white bottom looks sharp without trying too hard.',
    start: { label: 'Navy shirt', color: '#27466E', category: 'shirt' },
    pairings: [
      { label: 'Ivory trousers', color: '#EEE9DC', category: 'pants' },
      { label: 'Camel chinos', color: '#B08B5D', category: 'pants' },
      { label: 'Dark jeans', color: '#3B5A86', category: 'jeans' },
    ],
  },
  {
    id: 'white-black',
    title: 'White tee, black trousers',
    occasion: 'Everyday',
    why: 'The highest-contrast classic. Clean, modern, and easy to dress up with a jacket.',
    start: { label: 'White T-shirt', color: '#F7F5EF', category: 'tshirt' },
    pairings: [
      { label: 'Black trousers', color: '#171717', category: 'pants' },
      { label: 'Indigo jeans', color: '#405D7A', category: 'jeans' },
      { label: 'Charcoal jacket', color: '#353A40', category: 'jacket' },
    ],
  },
  {
    id: 'blush-denim',
    title: 'Blush top, blue denim',
    occasion: 'Casual',
    why: 'A soft pink against denim feels fresh and wearable from brunch to a city walk.',
    start: { label: 'Blush blouse', color: '#D995A6', category: 'blouse' },
    pairings: [
      { label: 'Blue jeans', color: '#4E6D8C', category: 'jeans' },
      { label: 'White skirt', color: '#F7F5EF', category: 'skirt' },
      { label: 'Beige trousers', color: '#D8C3A5', category: 'pants' },
    ],
  },
  {
    id: 'saree-gold',
    title: 'Maroon saree, cream blouse',
    occasion: 'Family function',
    why: 'A rich saree needs a quieter blouse. Cream or gold keeps the look festive, not busy.',
    start: { label: 'Maroon saree', color: '#7A2E3E', category: 'saree' },
    pairings: [
      { label: 'Cream blouse', color: '#F2E2C6', category: 'blouse' },
      { label: 'Gold blouse', color: '#C99624', category: 'blouse' },
      { label: 'Ivory jacket', color: '#EEE9DC', category: 'jacket' },
    ],
  },
  {
    id: 'cream-kurta',
    title: 'Cream kurta, navy chinos',
    occasion: 'Festive smart',
    why: 'Light kurta, dark tailored bottom. Balanced, respectful, and easy to photograph.',
    start: { label: 'Cream kurta', color: '#F2E2C6', category: 'kurta' },
    pairings: [
      { label: 'Navy chinos', color: '#1D3557', category: 'pants' },
      { label: 'Charcoal trousers', color: '#353A40', category: 'pants' },
      { label: 'Charcoal blazer', color: '#353A40', category: 'jacket' },
    ],
  },
  {
    id: 'olive-white',
    title: 'Olive trousers, white shirt',
    occasion: 'Smart casual',
    why: 'Olive is a flexible neutral. White keeps it crisp; camel or navy adds warmth.',
    start: { label: 'Olive trousers', color: '#6F7845', category: 'pants' },
    pairings: [
      { label: 'White shirt', color: '#F7F5EF', category: 'shirt' },
      { label: 'Navy knit', color: '#27466E', category: 'top' },
      { label: 'Camel jacket', color: '#B08B5D', category: 'jacket' },
    ],
  },
];
