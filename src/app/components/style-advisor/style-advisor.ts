import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORY_LABELS, ClothingCategory, ClothingItem } from '../../models/clothing-item.model';
import { ClosetService } from '../../services/closet.service';
import { dominantColorFromImage } from '../../services/image-color';
import { StyleAdvisorService } from '../../services/style-advisor.service';
import { StylePreviewService } from '../../services/style-preview.service';

type AdvisorSource = 'photo' | 'color' | 'closet';

const ADVISOR_CATEGORIES: ClothingCategory[] = [
  'top',
  'tshirt',
  'shirt',
  'kurta',
  'blouse',
  'pants',
  'jeans',
  'leggings',
  'skirt',
  'shorts',
  'saree',
  'salwar-kameez',
  'dress',
  'gown',
  'jacket',
];

@Component({
  selector: 'app-style-advisor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './style-advisor.html',
  styleUrl: './style-advisor.scss',
})
export class StyleAdvisor {
  readonly categories = ADVISOR_CATEGORIES.map((value) => ({
    value,
    label: CATEGORY_LABELS[value],
  }));
  readonly categoryLabels = CATEGORY_LABELS;

  source = signal<AdvisorSource>('photo');
  category = signal<ClothingCategory>('shirt');
  color = signal('#315A8C');
  imageDataUrl = signal<string | null>(null);
  imageName = signal('');
  isAnalyzing = signal(false);
  imageError = signal('');
  selectedClosetId = signal('');

  readonly colorName = computed(() => this.advisor.colorName(this.color()));
  readonly recommendations = computed(() =>
    this.advisor.recommendations(this.color(), this.category()),
  );
  readonly closetMatches = computed(() =>
    this.advisor.closetMatches(
      this.color(),
      this.category(),
      this.closet.items(),
      this.selectedClosetId() || undefined,
    ),
  );
  readonly selectedClosetItem = computed(() =>
    this.closet.items().find((item) => item.id === this.selectedClosetId()),
  );
  readonly targetLabel = computed(() => {
    const category = this.category();
    if (category === 'saree') return 'blouses, jackets and accessories';
    if (category === 'blouse') return 'sarees, bottoms and layers';
    const role = this.advisor.roleFor(category);
    if (role === 'top') return 'bottoms and layers';
    if (role === 'bottom') return 'shirts, T-shirts and tops';
    if (role === 'one-piece') return 'layers, shoes and accessories';
    return 'tops, bottoms and one-piece outfits';
  });

  constructor(
    readonly closet: ClosetService,
    readonly advisor: StyleAdvisorService,
    private preview: StylePreviewService,
  ) {
    effect(() => {
      const request = this.preview.request();
      if (!request) return;
      this.source.set('color');
      this.category.set(request.category);
      this.color.set(request.color);
      this.imageDataUrl.set(null);
      this.imageError.set('');
    });
  }

  setSource(source: AdvisorSource): void {
    this.source.set(source);
    this.imageError.set('');
    if (source === 'closet' && !this.selectedClosetId() && this.closet.items().length) {
      this.selectClosetItem(this.closet.items()[0].id);
    }
  }

  setCategory(category: ClothingCategory): void {
    this.category.set(category);
  }

  setColor(color: string): void {
    this.color.set(color);
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.imageError.set('Please choose a JPG, PNG or other image file.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      this.imageError.set('Please choose an image smaller than 8 MB.');
      return;
    }

    this.imageError.set('');
    this.isAnalyzing.set(true);
    this.imageName.set(file.name);

    try {
      const dataUrl = await this.readFile(file);
      this.imageDataUrl.set(dataUrl);
      this.color.set(await dominantColorFromImage(dataUrl));
    } catch {
      this.imageError.set('We could not analyse this photo. Try a clearer image.');
    } finally {
      this.isAnalyzing.set(false);
    }
  }

  selectClosetItem(id: string): void {
    this.selectedClosetId.set(id);
    const item = this.closet.items().find((candidate) => candidate.id === id);
    if (!item) return;
    this.category.set(item.category);
    this.color.set(item.color);
    this.imageDataUrl.set(item.imageDataUrl ?? null);
  }

  matchPercent(score: number): number {
    return Math.round(score * 100);
  }

  trackClosetItem(_index: number, item: ClothingItem): string {
    return item.id;
  }

  private readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
}
