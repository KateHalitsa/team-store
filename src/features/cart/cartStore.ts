import type { Gift } from '../../types/types.ts';
import { addToCart, changeQuantity, removeFromCart, isValidPromo, normalizePromo, type CartItem } from './cart';

const STORAGE_KEY = 'evergreen-cart';

type CartState = { items: CartItem[]; promoCode: string };

function load(): CartState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.items)) {
                return {
                    items: parsed.items,
                    promoCode: typeof parsed.promoCode === 'string' ? parsed.promoCode : '',
                };
            }
        }
    } catch {
        /* invalid JSON — start with an empty cart */
    }
    return { items: [], promoCode: '' };
}

let state: CartState = load();
const listeners = new Set<() => void>();

function setState(next: CartState) {
    state = next;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        /* localStorage is unavailable — keep working in memory */
    }
    listeners.forEach((listener) => listener());
}

export const cartStore = {
    getState: () => state,

    subscribe(listener: () => void) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },

    add: (gift: Gift) => setState({ ...state, items: addToCart(state.items, gift) }),

    setQuantity: (id: string, quantity: number) =>
        setState({ ...state, items: changeQuantity(state.items, id, quantity) }),

    remove: (id: string) => setState({ ...state, items: removeFromCart(state.items, id) }),

    applyPromo(code: string): boolean {
        if (!isValidPromo(code)) return false;
        setState({ ...state, promoCode: normalizePromo(code) });
        return true;
    },

    clearPromo: () => setState({ ...state, promoCode: '' }),
};
