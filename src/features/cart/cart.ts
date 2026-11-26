import type { Gift } from '../../types/types.ts';

export type CartItem = Gift & { quantity: number };

export const PROMO_CODES: Record<string, number> = {
    SALE10: 0.1,
};

export function normalizePromo(code: string): string {
    return code.trim().toUpperCase();
}

export function isValidPromo(code: string): boolean {
    return Object.hasOwn(PROMO_CODES, normalizePromo(code));
}

export function addToCart(cart: CartItem[], gift: Gift): CartItem[] {
    if (gift.amount <= 0) return cart;

    const existing = cart.find((item) => item.id === gift.id);
    if (!existing) return [...cart, { ...gift, quantity: 1 }];

    if (existing.quantity >= existing.amount) return cart;

    return cart.map((item) => (item.id === gift.id ? { ...item, quantity: item.quantity + 1 } : item));
}

export function changeQuantity(cart: CartItem[], id: string, quantity: number): CartItem[] {
    return cart.map((item) => {
        if (item.id !== id) return item;
        const clamped = Math.min(Math.max(quantity, 1), item.amount);
        return { ...item, quantity: clamped };
    });
}

export function removeFromCart(cart: CartItem[], id: string): CartItem[] {
    return cart.filter((item) => item.id !== id);
}

export function getCartCount(cart: CartItem[]): number {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function calculateSubtotal(cart: CartItem[]): number {
    return cart.reduce((sum, item) => sum + item.cost * item.quantity, 0);
}

export type OrderTotal = {
    subtotal: number;
    discount: number;
    total: number;
};

export function calculateOrderTotal(cart: CartItem[], promoCode = ''): OrderTotal {
    const subtotal = calculateSubtotal(cart);
    const code = normalizePromo(promoCode);
    const rate = Object.hasOwn(PROMO_CODES, code) ? PROMO_CODES[code] : 0;

    const discount = Math.round(subtotal * rate * 100) / 100;
    const total = Math.round((subtotal - discount) * 100) / 100;

    return { subtotal, discount, total };
}
