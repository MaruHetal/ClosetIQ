import { Component, computed, signal } from '@angular/core';
import {
  CATEGORY_LABELS,
  GENDER_LABELS,
  Gender,
  OCCASION_LABELS,
} from '../../models/clothing-item.model';
import { ClosetService } from '../../services/closet.service';
import { ToastService } from '../../services/toast.service';

type GenderFilter = Gender | 'all';

@Component({
  selector: 'app-closet-grid',
  standalone: true,
  templateUrl: './closet-grid.html',
  styleUrl: './closet-grid.scss',
})
export class ClosetGrid {
  readonly labels = CATEGORY_LABELS;
  readonly occasionLabels = OCCASION_LABELS;
  readonly genderLabels = GENDER_LABELS;
  readonly genderFilters: GenderFilter[] = ['all', 'girls', 'boys', 'unisex'];

  filter = signal<GenderFilter>('all');

  readonly filteredItems = computed(() => {
    const filter = this.filter();
    const items = this.closet.items();
    return filter === 'all' ? items : items.filter((i) => i.gender === filter);
  });

  constructor(
    readonly closet: ClosetService,
    private toast: ToastService,
  ) {}

  remove(id: string): void {
    this.closet.removeItem(id);
    this.toast.show('Item removed from your closet');
  }
}
