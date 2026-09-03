import { Component, signal } from '@angular/core';
import { STARTER_WARDROBE } from '../../data/starter-wardrobe';
import { ClothingItem } from '../../models/clothing-item.model';
import { ClosetService } from '../../services/closet.service';
import { ToastService } from '../../services/toast.service';

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
    title: 'Festive Pink Saree Set',
    vibe: 'Family Function',
    pieces: [find('Pink Silk Saree'), find('Rose Sari Blouse')],
  },
  {
    title: 'Easy Breezy Salwar Kameez',
    vibe: 'Casual',
    pieces: [find('Peach Salwar Kameez')],
  },
  {
    title: 'Evening Party Gown',
    vibe: 'Party',
    pieces: [find('Party Gown')],
  },
  {
    title: 'Weekend Frock & Denim',
    vibe: 'Casual',
    pieces: [find('Floral Frock Dress'), find('Rosewood Denim Jacket')],
  },
  {
    title: "Festive Cream Kurta",
    vibe: 'Family Function',
    pieces: [find('Cream Kurta'), find('Navy Chinos')],
  },
  {
    title: 'Smart Blue Weekday',
    vibe: 'Office',
    pieces: [find('Sky Blue Oxford Shirt'), find('Navy Chinos')],
  },
  {
    title: 'Easy Weekend Denim',
    vibe: 'Casual',
    pieces: [find('Classic Grey Tee'), find('Indigo Jeans'), find('White Sneakers')],
  },
  {
    title: "Maroon Party Kurta",
    vibe: 'Party',
    pieces: [find('Maroon Festive Kurta'), find('Black Slim Trousers'), find('Charcoal Blazer')],
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
  readonly justAdded = signal<string | null>(null);

  constructor(
    private closet: ClosetService,
    private toast: ToastService
  ) {}

  addLook(look: ExampleLook): void {
    for (const piece of look.pieces) {
      this.closet.addItem(piece);
    }
    this.justAdded.set(look.title);
    this.toast.show(`"${look.title}" added to your closet`);
    setTimeout(() => {
      if (this.justAdded() === look.title) this.justAdded.set(null);
    }, 2000);
  }
}
