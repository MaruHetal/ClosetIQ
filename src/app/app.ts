import { Component } from '@angular/core';
import { AddItem } from './components/add-item/add-item';
import { ClosetGrid } from './components/closet-grid/closet-grid';
import { ExampleLooks } from './components/example-looks/example-looks';
import { OutfitSuggestions } from './components/outfit-suggestions/outfit-suggestions';
import { ToastHost } from './components/toast/toast';

@Component({
  imports: [ExampleLooks, AddItem, OutfitSuggestions, ClosetGrid, ToastHost],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
