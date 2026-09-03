import { ClothingCategory, Gender } from '../models/clothing-item.model';

/**
 * Real, freely-licensed reference photos (Wikimedia Commons) per garment
 * type, used as the artwork for starter-wardrobe pieces and example looks.
 * Served via Special:FilePath so the link keeps resolving even if the file
 * is renamed or moved on Commons. See README for image credits.
 */
function commons(file: string, width = 400): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

const PHOTOS: Partial<Record<ClothingCategory, Partial<Record<Gender, string>> & { default: string }>> = {
  tshirt: { default: commons('T-Shirt_Wikipedia_white.jpg') },
  shirt: {
    boys: commons("Men's_long-sleeve_T-shirt.jpg"),
    default: commons('Classical_polo_shirt.jpg'),
  },
  kurta: { default: commons('Kurta_-_Mens.jpg') },
  pants: { default: commons('Trousers.jpg') },
  jeans: { default: commons('Jeans.jpg') },
  jacket: { default: commons('Denim_jacket.jpg') },
  shoes: { default: commons('Sneakers.jpg') },
  saree: { default: commons('Group_of_Indian_women_in_sari.jpg') },
  blouse: { default: commons('Kutch_blouse.jpg') },
  'salwar-kameez': { default: commons('Girl_in_salwar_kameez.jpg') },
  dress: { default: commons('Family_Photography_-_Baby_Girl_Red_Dress_Flower_Crown.jpg') },
  gown: { default: commons('1930s_green_velvet_evening_dress.jpg') },
  top: { default: commons('Ghagra_Choli.jpg') },
};

/** Best-match real photo for a category/gender pair, falling back to a neutral default. */
export function clothingPhotoUrl(category: ClothingCategory, gender: Gender): string {
  const entry = PHOTOS[category];
  if (!entry) return commons('T-Shirt_Wikipedia_white.jpg');
  return entry[gender] ?? entry.default;
}
