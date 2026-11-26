import { describe, expect, it } from 'vitest';
import { addToCart, calculateOrderTotal, changeQuantity, removeFromCart, type CartItem } from './cart';
import type { Gift } from '../../types/types.ts';

const ball: Gift = { id: 'ball', name: 'Ball', cost: 15, amount: 3, image: '', category: 'ornaments' };
const carousel: Gift = { id: 'car', name: 'Carousel', cost: 50, amount: 4, image: '', category: 'toys' };
const soldOut: Gift = { id: 'box', name: 'Box', cost: 8, amount: 0, image: '', category: 'food' };

describe('cart operations', () => {
    it('adds a new item with quantity 1', () => {
        expect(addToCart([], ball)).toEqual([{ ...ball, quantity: 1 }]);
    });

    it('increases quantity instead of adding a duplicate row', () => {
        const cart = addToCart(addToCart([], ball), ball);
        expect(cart).toHaveLength(1);
        expect(cart[0].quantity).toBe(2);
    });

    it('does not exceed stock', () => {
        let cart: CartItem[] = [];
        for (let i = 0; i < 10; i++) cart = addToCart(cart, ball);
        expect(cart[0].quantity).toBe(3);
    });

    it('does not add out-of-stock items', () => {
        expect(addToCart([], soldOut)).toEqual([]);
    });

    it('does not allow quantity below 1', () => {
        const cart = addToCart([], ball);
        expect(changeQuantity(cart, 'ball', 0)[0].quantity).toBe(1);
    });

    it('removes an item', () => {
        const cart = addToCart(addToCart([], ball), carousel);
        expect(removeFromCart(cart, 'ball').map((i) => i.id)).toEqual(['car']);
    });
});

describe('calculateOrderTotal', () => {
    it('returns zeros for an empty cart', () => {
        expect(calculateOrderTotal([])).toEqual({ subtotal: 0, discount: 0, total: 0 });
    });
});
