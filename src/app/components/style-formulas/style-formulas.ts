import { Component } from '@angular/core';
import { STYLE_FORMULAS, StyleFormula } from '../../data/style-formulas';
import { StylePreviewService } from '../../services/style-preview.service';

@Component({
  selector: 'app-style-formulas',
  standalone: true,
  templateUrl: './style-formulas.html',
  styleUrl: './style-formulas.scss',
})
export class StyleFormulas {
  readonly formulas = STYLE_FORMULAS;

  constructor(private preview: StylePreviewService) {}

  tryFormula(formula: StyleFormula): void {
    this.preview.open(formula.start.color, formula.start.category, formula.title);
  }
}
