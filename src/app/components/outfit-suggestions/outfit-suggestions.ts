import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GENDER_LABELS, Gender, OCCASION_LABELS, Occasion } from '../../models/clothing-item.model';
import { ClosetService } from '../../services/closet.service';
import { OutfitMatcherService } from '../../services/outfit-matcher.service';

type GenderFilter = Gender | 'all';

@Component({
  selector: 'app-outfit-suggestions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './outfit-suggestions.html',
  styleUrl: './outfit-suggestions.scss',
})
export class OutfitSuggestions {
  readonly occasionOptions = Object.entries(OCCASION_LABELS) as [Occasion, string][];
  readonly genderLabels = GENDER_LABELS;
  readonly genderFilters: GenderFilter[] = ['all', 'girls', 'boys', 'unisex'];

  occasion = signal<Occasion>('office');
  gender = signal<GenderFilter>('all');

  readonly suggestions = computed(() => {
    const gender = this.gender();
    const items =
      gender === 'all' ? this.closet.items() : this.closet.items().filter((i) => i.gender === gender);
    return this.matcher.suggest(items, this.occasion());
  });

  constructor(
    private closet: ClosetService,
    private matcher: OutfitMatcherService
  ) {}

  scorePercent(score: number): number {
    return Math.round(score * 100);
  }
}
