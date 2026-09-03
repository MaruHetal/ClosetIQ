import { Component } from '@angular/core';
import { AddItem } from './components/add-item/add-item';
import { ClosetGrid } from './components/closet-grid/closet-grid';
import { OutfitSuggestions } from './components/outfit-suggestions/outfit-suggestions';

@Component({
  imports: [AddItem, OutfitSuggestions, ClosetGrid],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
