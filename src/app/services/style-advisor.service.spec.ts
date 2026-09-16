import { TestBed } from '@angular/core/testing';
import { ClothingItem } from '../models/clothing-item.model';
import { StyleAdvisorService } from './style-advisor.service';

describe('StyleAdvisorService', () => {
  let service: StyleAdvisorService;

  beforeEach(() => {
    service = TestBed.inject(StyleAdvisorService);
  });

  it('offers neutral and color-theory recommendations', () => {
    const recommendations = service.recommendations('#315A8C', 'shirt');

    expect(recommendations).toHaveLength(6);
    expect(recommendations.some((item) => item.pairing === 'Statement contrast')).toBe(true);
    expect(recommendations.every((item) => item.garmentIdeas.length > 0)).toBe(true);
  });

  it('matches a top with bottoms but not another top', () => {
    const items: ClothingItem[] = [
      {
        id: 'jeans',
        name: 'Blue jeans',
        category: 'jeans',
        color: '#405D7A',
        occasions: ['casual'],
        gender: 'unisex',
        createdAt: 1,
      },
      {
        id: 'tee',
        name: 'White tee',
        category: 'tshirt',
        color: '#F7F5EF',
        occasions: ['casual'],
        gender: 'unisex',
        createdAt: 2,
      },
    ];

    const matches = service.closetMatches('#315A8C', 'shirt', items);

    expect(matches.map((match) => match.item.id)).toEqual(['jeans']);
  });

  it('matches a bottom with tops', () => {
    const items: ClothingItem[] = [
      {
        id: 'shirt',
        name: 'White shirt',
        category: 'shirt',
        color: '#F7F5EF',
        occasions: ['office'],
        gender: 'unisex',
        createdAt: 1,
      },
    ];

    expect(service.closetMatches('#1D3557', 'pants', items)[0].item.id).toBe('shirt');
  });

  it('pairs a saree with a blouse, not a T-shirt', () => {
    const items: ClothingItem[] = [
      {
        id: 'blouse',
        name: 'Rose blouse',
        category: 'blouse',
        color: '#D995A6',
        occasions: ['family-function'],
        gender: 'girls',
        createdAt: 1,
      },
      {
        id: 'tee',
        name: 'White tee',
        category: 'tshirt',
        color: '#F7F5EF',
        occasions: ['casual'],
        gender: 'unisex',
        createdAt: 2,
      },
    ];

    const matches = service.closetMatches('#C43D4F', 'saree', items);
    const ideas = service.recommendations('#C43D4F', 'saree').flatMap((item) => item.garmentIdeas);

    expect(matches.map((match) => match.item.id)).toEqual(['blouse']);
    expect(ideas).toContain('saree blouse');
    expect(ideas.some((idea) => idea.toLowerCase().includes('t-shirt'))).toBe(false);
  });
});
