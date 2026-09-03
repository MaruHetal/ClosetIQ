import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OCCASION_LABELS, Occasion } from '../../models/clothing-item.model';
import { ClosetService } from '../../services/closet.service';
import { OutfitMatcherService } from '../../services/outfit-matcher.service';

@Component({
  selector: 'app-outfit-suggestions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './outfit-suggestions.html',
  styleUrl: './outfit-suggestions.scss',
})
export class OutfitSuggestions {
  readonly occasionOptions = Object.entries(OCCASION_LABELS) as [Occasion, string][];
  occasion = signal<Occasion>('office');

  readonly suggestions = computed(() =>
    this.matcher.suggest(this.closet.items(), this.occasion())
  );

  constructor(
    private closet: ClosetService,
    private matcher: OutfitMatcherService
  ) {}

  scorePercent(score: number): number {
    return Math.round(score * 100);
  }
}
