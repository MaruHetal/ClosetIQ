import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CATEGORY_LABELS,
  ClothingCategory,
  GENDER_LABELS,
  Gender,
  OCCASION_LABELS,
  Occasion,
} from '../../models/clothing-item.model';
import { ClosetService } from '../../services/closet.service';
import { dominantColorFromImage, resizeImageForStorage } from '../../services/image-color';
import { ToastService } from '../../services/toast.service';

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
  readonly genderOptions = Object.entries(GENDER_LABELS) as [Gender, string][];

  name = '';
  category: ClothingCategory = 'tshirt';
  gender: Gender = 'unisex';
  color = '#e8a4c4';
  purchasedFrom = '';
  selectedOccasions = signal<Set<Occasion>>(new Set());
  imageDataUrl = signal<string | undefined>(undefined);
  photoStatus = signal('');
  showValidation = signal(false);

  constructor(
    private closet: ClosetService,
    private toast: ToastService,
  ) {}

  toggleOccasion(occasion: Occasion): void {
    const next = new Set(this.selectedOccasions());
    next.has(occasion) ? next.delete(occasion) : next.add(occasion);
    this.selectedOccasions.set(next);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      this.photoStatus.set('Please choose a photo smaller than 5 MB.');
      input.value = '';
      return;
    }

    const reader = new FileReader();
    this.photoStatus.set('Reading the garment color…');
    reader.onload = async () => {
      try {
        const dataUrl = await resizeImageForStorage(reader.result as string);
        this.imageDataUrl.set(dataUrl);
        this.color = await dominantColorFromImage(dataUrl);
        this.photoStatus.set('Main color detected — you can adjust it below.');
      } catch {
        this.imageDataUrl.set(reader.result as string);
        this.photoStatus.set('Photo added. Choose the closest color below.');
      }
    };
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (!this.name.trim() || this.selectedOccasions().size === 0) {
      this.showValidation.set(true);
      return;
    }

    this.closet.addItem({
      name: this.name.trim(),
      category: this.category,
      gender: this.gender,
      color: this.color,
      occasions: Array.from(this.selectedOccasions()),
      purchasedFrom: this.purchasedFrom.trim() || undefined,
      imageDataUrl: this.imageDataUrl(),
    });

    this.toast.show(`"${this.name.trim()}" added to your closet`);

    this.name = '';
    this.purchasedFrom = '';
    this.color = '#e8a4c4';
    this.showValidation.set(false);
    this.selectedOccasions.set(new Set());
    this.imageDataUrl.set(undefined);
    this.photoStatus.set('');
  }
}
