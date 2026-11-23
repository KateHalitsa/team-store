import { describe, expect, it } from 'vitest';
import type { Gift } from '../../types/types';
import { getFiltered } from './getFiltered';

const products: Gift[] = [
    { id: 'apple', name: 'Apple', cost: 1, amount: 5, image: 'apple.png', category: 'food' },
    { id: 'banana', name: 'Banana', cost: 2, amount: 3, image: 'banana.png', category: 'food' },
    { id: 'apple-pie', name: 'Apple pie', cost: 3, amount: 2, image: 'pie.png', category: 'food' },
    { id: 'teddy-bear', name: 'Teddy Bear', cost: 10, amount: 5, image: 'bear.png', category: 'toys' },
    { id: 'yo-yo', name: 'Yo-yo', cost: 2, amount: 3, image: 'yo-yo.png', category: 'toys' },
    { id: 'candle', name: 'Candle', cost: 3, amount: 2, image: 'candle.png', category: 'accessories' },
];

describe('getFiltered', () => {
    it('returns all products when search is empty', () => {
        expect(getFiltered(products, '')).toEqual(products);
    });

    it('returns products containing the search string', () => {
        expect(getFiltered(products, 'apple')).toEqual([products[0], products[2]]);
    });

    it('returns an empty array when no products match', () => {
        expect(getFiltered(products, 'chocolate')).toEqual([]);
    });

    it('performs case-insensitive search', () => {
        expect(getFiltered(products, 'BANANA')).toEqual([products[1]]);
    });
    it('returns products from the "toys" category', () => {
        expect(getFiltered(products, '', 'toys').length).toBe(2);
    });
    it('returns products with a price between 2 and 5', () => {
        expect(getFiltered(products, '', 'all', 2, 5).length).toBe(4);
    });
    it("doesn't return products out of range", () => {
        expect(getFiltered(products, '', 'all', 11, 50)).toEqual([]);
    });
    it('returns products sorted by price in ascending order', () => {
        expect(
            getFiltered(products, '', undefined, undefined, undefined, 'up')
                .slice(0, 3)
                .map((product) => product.cost)
        ).toEqual([products[0].cost, products[1].cost, products[4].cost]);
    });
    it('returns products sorted by price in descending order', () => {
        expect(
            getFiltered(products, '', undefined, undefined, undefined, 'down')
                .slice(0, 3)
                .map((product) => product.cost)
        ).toEqual([products[3].cost, products[2].cost, products[5].cost]);
    });
    it('returns products sorted by default', () => {
        expect(getFiltered(products, '', undefined, undefined, undefined, 'default')).toEqual(products);
    });
});
