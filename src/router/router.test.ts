import { describe, it, expect } from 'vitest';
import { normalizePath, resolvePage } from './router';
import { AboutUs } from '../pages/AboutUs/AboutUs';
import { Shop } from '../pages/Shop/Shop';
import { Cart } from '../pages/Cart/Cart';
import { NotFound } from '../pages/NotFound/NotFound';

describe('normalizePath', () => {
    it('keeps the root path as is', () => {
        expect(normalizePath('/')).toBe('/');
    });

    it('removes a trailing slash', () => {
        expect(normalizePath('/shop/')).toBe('/shop');
    });

    it('keeps a path without a trailing slash unchanged', () => {
        expect(normalizePath('/cart')).toBe('/cart');
    });
});

describe('resolvePage', () => {
    it('opens About Us on the root path', () => {
        expect(resolvePage('/')).toBe(AboutUs);
    });

    it('resolves the shop and cart pages', () => {
        expect(resolvePage('/shop')).toBe(Shop);
        expect(resolvePage('/cart')).toBe(Cart);
    });

    it('ignores a trailing slash', () => {
        expect(resolvePage('/shop/')).toBe(Shop);
    });

    it('falls back to NotFound for unknown paths', () => {
        expect(resolvePage('/unknown')).toBe(NotFound);
    });
});
