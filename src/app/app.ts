import { Component } from '@angular/core';
import { AddItem } from './components/add-item/add-item';
import { ClosetGrid } from './components/closet-grid/closet-grid';
import { OutfitSuggestions } from './components/outfit-suggestions/outfit-suggestions';
import { StyleAdvisor } from './components/style-advisor/style-advisor';
import { StyleFormulas } from './components/style-formulas/style-formulas';
import { ToastHost } from './components/toast/toast';

@Component({
  imports: [StyleAdvisor, AddItem, OutfitSuggestions, ClosetGrid, StyleFormulas, ToastHost],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
