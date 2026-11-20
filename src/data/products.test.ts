import { describe, expect, it } from 'vitest';
import products from './products.json';

describe('products.json', () => {
    it('has unique ids', () => {
        const ids = products.map((p) => p.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('has only ascii slug ids', () => {
        for (const { id } of products) {
            expect(id).toMatch(/^[a-z0-9-]+$/);
        }
    });

    it('has unique names', () => {
        const names = products.map((p) => p.name);
        expect(new Set(names).size).toBe(names.length);
    });
});
