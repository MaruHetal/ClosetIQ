import { Component } from '@angular/core';
import { STARTER_WARDROBE } from '../../data/starter-wardrobe';
import { ClothingItem } from '../../models/clothing-item.model';
import { ClosetService } from '../../services/closet.service';

type StarterItem = Omit<ClothingItem, 'id' | 'createdAt'>;

interface ExampleLook {
  title: string;
  vibe: string;
  pieces: StarterItem[];
}

function find(name: string): StarterItem {
  const piece = STARTER_WARDROBE.find((p) => p.name === name);
  if (!piece) throw new Error(`Unknown starter piece: ${name}`);
  return piece;
}

const LOOKS: ExampleLook[] = [
  {
    title: 'Pretty in Pink Office Day',
    vibe: 'Office',
    pieces: [find('Rose Pink Blouse'), find('Blush Trousers')],
  },
  {
    title: 'Weekend Blush & Denim',
    vibe: 'Casual',
    pieces: [find('Blush Tee'), find('Floral Skater Skirt Jeans'), find('Rosewood Denim Jacket')],
  },
  {
    title: 'Party-Ready Berry Chic',
    vibe: 'Party',
    pieces: [find('Berry Party Tee'), find('Black Slim Trousers')],
  },
  {
    title: 'Smart Blue Weekday',
    vibe: 'Office',
    pieces: [find('Sky Blue Oxford Shirt'), find('Navy Chinos')],
  },
  {
    title: 'Easy Weekend Denim',
    vibe: 'Casual',
    pieces: [find('Classic Grey Tee'), find('Indigo Jeans'), find('Light-Wash Denim Jacket')],
  },
  {
    title: 'Sharp Formal Evening',
    vibe: 'Formal Event',
    pieces: [find('Forest Green Polo'), find('Black Slim Trousers'), find('Charcoal Blazer')],
  },
];

@Component({
  selector: 'app-example-looks',
  standalone: true,
  templateUrl: './example-looks.html',
  styleUrl: './example-looks.scss',
})
export class ExampleLooks {
  readonly looks = LOOKS;

  constructor(private closet: ClosetService) {}

  addLook(look: ExampleLook): void {
    for (const piece of look.pieces) {
      this.closet.addItem(piece);
    }
  }
}
