import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CATEGORY_LABELS,
  ClothingCategory,
  OCCASION_LABELS,
  Occasion,
} from '../../models/clothing-item.model';
import { ClosetService } from '../../services/closet.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-item.html',
  styleUrl: './add-item.scss',
})
export class AddItem {
  readonly categoryOptions = Object.entries(CATEGORY_LABELS) as [ClothingCategory, string][];
  readonly occasionOptions = Object.entries(OCCASION_LABELS) as [Occasion, string][];

  name = '';
  category: ClothingCategory = 'tshirt';
  color = '#3366cc';
  purchasedFrom = '';
  selectedOccasions = signal<Set<Occasion>>(new Set());
  imageDataUrl = signal<string | undefined>(undefined);

  constructor(private closet: ClosetService) {}

  toggleOccasion(occasion: Occasion): void {
    const next = new Set(this.selectedOccasions());
    next.has(occasion) ? next.delete(occasion) : next.add(occasion);
    this.selectedOccasions.set(next);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.imageDataUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (!this.name.trim() || this.selectedOccasions().size === 0) return;

    this.closet.addItem({
      name: this.name.trim(),
      category: this.category,
      color: this.color,
      occasions: Array.from(this.selectedOccasions()),
      purchasedFrom: this.purchasedFrom.trim() || undefined,
      imageDataUrl: this.imageDataUrl(),
    });

    this.name = '';
    this.purchasedFrom = '';
    this.color = '#3366cc';
    this.selectedOccasions.set(new Set());
    this.imageDataUrl.set(undefined);
  }
}
