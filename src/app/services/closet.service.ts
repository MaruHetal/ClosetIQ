import { Injectable, signal } from '@angular/core';
import { ClothingItem } from '../models/clothing-item.model';

const STORAGE_KEY = 'closetiq.items.v1';

@Injectable({ providedIn: 'root' })
export class ClosetService {
  readonly items = signal<ClothingItem[]>(this.load());

  private load(): ClothingItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ClothingItem[]) : [];
    } catch {
      return [];
    }
  }

  private persist(items: ClothingItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  addItem(item: Omit<ClothingItem, 'id' | 'createdAt'>): void {
    const newItem: ClothingItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    const updated = [...this.items(), newItem];
    this.items.set(updated);
    this.persist(updated);
  }

  removeItem(id: string): void {
    const updated = this.items().filter((i) => i.id !== id);
    this.items.set(updated);
    this.persist(updated);
  }
}
