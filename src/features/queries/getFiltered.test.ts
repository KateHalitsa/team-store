import { describe, expect, it } from 'vitest';
import type { Gift } from '../../types/types';
import { getFiltered } from './getFiltered';

const products: Gift[] = [
    { id: 'apple', name: 'Apple', cost: 1, amount: 5, image: 'apple.png', category: 'food' },
    { id: 'banana', name: 'Banana', cost: 2, amount: 3, image: 'banana.png', category: 'food' },
    { id: 'apple-pie', name: 'Apple pie', cost: 3, amount: 2, image: 'pie.png', category: 'food' },
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
});
