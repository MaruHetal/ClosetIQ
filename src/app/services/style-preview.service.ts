import { Injectable, signal } from '@angular/core';
import { ClothingCategory } from '../models/clothing-item.model';

export interface StylePreviewRequest {
  color: string;
  category: ClothingCategory;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class StylePreviewService {
  readonly request = signal<StylePreviewRequest | null>(null);

  open(color: string, category: ClothingCategory, title: string): void {
    this.request.set({ color, category, title });
  }
}
