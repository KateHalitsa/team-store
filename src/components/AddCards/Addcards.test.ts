// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { AddCards } from './AddCards';
import type { Gift } from '../../types/types';

vi.mock('../ProductCard/ProductCard', () => ({
    ProductCard: vi.fn((product: Gift) => {
        const card = document.createElement('article');
        card.textContent = product.name;
        return card;
    }),
}));

function createProducts(count: number): Gift[] {
    return Array.from({ length: count }, (_, i) => ({
        name: `Gift ${i + 1}`,
        cost: 100,
        amount: 1,
        image: 'image.jpg',
        category: 'food',
    })) as Gift[];
}

describe('AddCards', () => {
    it('adds the first batch of 6 cards', () => {
        const products = createProducts(12);
        const button = document.createElement('button');
        const catalog = document.createElement('div');

        const addCards = AddCards(products, button, '');

        const nextBatch = addCards(0, catalog);

        expect(catalog.children).toHaveLength(6);
        expect(catalog.children[0].textContent).toBe('Gift 1');
        expect(catalog.children[5].textContent).toBe('Gift 6');
        expect(nextBatch).toBe(1);
        expect(button.hidden).toBe(false);
    });

    it('adds the next batch without duplicating previous cards', () => {
        const products = createProducts(12);
        const button = document.createElement('button');
        const catalog = document.createElement('div');

        const addCards = AddCards(products, button, '');

        addCards(0, catalog);
        const nextBatch = addCards(1, catalog);

        expect(catalog.children).toHaveLength(12);
        expect(catalog.children[6].textContent).toBe('Gift 7');
        expect(catalog.children[11].textContent).toBe('Gift 12');
        expect(nextBatch).toBe(2);
        expect(button.hidden).toBe(true);
    });

    it('adds only the remaining products in the last batch', () => {
        const products = createProducts(8);
        const button = document.createElement('button');
        const catalog = document.createElement('div');

        const addCards = AddCards(products, button, '');

        const firstBatch = addCards(0, catalog);

        const nextBatch = addCards(firstBatch, catalog);

        expect(catalog.children).toHaveLength(8);
        expect(catalog.children[6].textContent).toBe('Gift 7');
        expect(catalog.children[7].textContent).toBe('Gift 8');
        expect(nextBatch).toBe(2);
        expect(button.hidden).toBe(true);
    });
});
