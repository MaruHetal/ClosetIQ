import { Component } from '@angular/core';
import { CATEGORY_LABELS } from '../../models/clothing-item.model';
import { ClosetService } from '../../services/closet.service';

@Component({
  selector: 'app-closet-grid',
  standalone: true,
  templateUrl: './closet-grid.html',
  styleUrl: './closet-grid.scss',
})
export class ClosetGrid {
  readonly labels = CATEGORY_LABELS;

  constructor(readonly closet: ClosetService) {}

  remove(id: string): void {
    this.closet.removeItem(id);
  }
}
