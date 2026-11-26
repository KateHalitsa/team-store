// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
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
    let products: Gift[];
    let button: HTMLButtonElement;
    let catalog: HTMLDivElement;
    let message: HTMLDivElement;

    beforeEach(() => {
        products = createProducts(12);
        button = document.createElement('button');
        catalog = document.createElement('div');
        message = document.createElement('div');
    });
    it('adds the first batch of 6 cards', () => {
        const addCards = AddCards(products, button, message, '');

        const nextBatch = addCards(0, catalog);

        expect(catalog.children).toHaveLength(6);
        expect(catalog.children[0].textContent).toBe('Gift 1');
        expect(catalog.children[5].textContent).toBe('Gift 6');
        expect(nextBatch).toBe(1);
        expect(button.hidden).toBe(false);
    });

    it('adds the next batch without duplicating previous cards', () => {
        const addCards = AddCards(products, button, message, '');

        addCards(0, catalog);
        const nextBatch = addCards(1, catalog);

        expect(catalog.children).toHaveLength(12);
        expect(catalog.children[6].textContent).toBe('Gift 7');
        expect(catalog.children[11].textContent).toBe('Gift 12');
        expect(nextBatch).toBe(2);
        expect(button.hidden).toBe(true);
    });

    it('adds only the remaining products in the last batch', () => {
        products = createProducts(8);

        const addCards = AddCards(products, button, message, '');

        const firstBatch = addCards(0, catalog);

        const nextBatch = addCards(firstBatch, catalog);

        expect(catalog.children).toHaveLength(8);
        expect(catalog.children[6].textContent).toBe('Gift 7');
        expect(catalog.children[7].textContent).toBe('Gift 8');
        expect(nextBatch).toBe(2);
        expect(button.hidden).toBe(true);
    });

    it('show message and hide buttom if nothing found', () => {
        const addCards = AddCards(products, button, message, '', 'christmas');

        addCards(0, catalog);

        expect(message.hidden).toBe(false);
        expect(button.hidden).toBe(true);
    });
});
