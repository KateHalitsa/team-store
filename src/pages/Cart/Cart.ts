import { cartStore } from '../../cart/cartStore';
import { calculateOrderTotal, isValidPromo, type CartItem } from '../../cart/cart';
import { createEl } from '../../utils/dom';
import './Cart.css';

const formatPrice = (n: number) => (Number.isInteger(n) ? `${n}$` : `${n.toFixed(2)}$`);
function createButton(text: string, action: string): HTMLButtonElement {
    const button = createEl('button', { text });
    button.dataset.action = action;
    return button;
}

function createRow(item: CartItem): HTMLElement {
    const row = createEl('li', { className: 'cart__row' });
    row.dataset.id = item.id;

    const image = createEl('img');
    image.src = item.image;
    image.alt = item.name;
    image.width = 80;
    image.height = 80;

    const name = createEl('span', { className: 'cart__name', text: item.name });
    const price = createEl('span', { className: 'cart__price', text: formatPrice(item.cost) });

    const decrease = createButton('−', 'dec');
    decrease.setAttribute('aria-label', 'Decrease quantity');
    decrease.disabled = item.quantity <= 1;
    const increase = createButton('+', 'inc');
    increase.setAttribute('aria-label', 'Increase quantity');
    increase.disabled = item.quantity >= item.amount;

    const quantity = createEl('span', { className: 'cart__qty' });
    quantity.append(decrease, createEl('span', { text: String(item.quantity) }), increase);

    const lineTotal = createEl('span', {
        className: 'cart__line-total',
        text: formatPrice(item.cost * item.quantity),
    });

    row.append(image, name, price, quantity, lineTotal, createButton('Remove', 'remove'));
    return row;
}

function createSummaryRow(label: string, value: string, modifier = ''): HTMLElement {
    const row = createEl('p', { className: `cart__summary-row ${modifier}`.trim() });
    row.append(createEl('span', { text: label }), createEl('span', { text: value }));
    return row;
}

export function Cart(): HTMLElement {
    const root = createEl('section', { className: 'cart' });
    let promoDraft = cartStore.getState().promoCode;
    let promoMessage = '';

    const render = () => {
        const { items, promoCode } = cartStore.getState();
        const { subtotal, discount, total } = calculateOrderTotal(items, promoCode);

        const title = createEl('h1', { text: 'Cart' });

        let list: HTMLElement;
        if (items.length === 0) {
            list = createEl('p', { className: 'cart__empty', text: 'Your cart is empty' });
        } else {
            list = createEl('ul', { className: 'cart__list' });
            list.append(...items.map(createRow));
        }

        const input = createEl('input', { className: 'cart__promo-input' });
        input.type = 'text';
        input.placeholder = 'Promo code';
        input.value = promoDraft;
        input.setAttribute('aria-label', 'Promo code');

        const promo = createEl('div', { className: 'cart__promo' });
        promo.append(input, createButton('Apply', 'apply-promo'));

        if (promoCode) {
            const applied = createEl('p', { className: 'cart__promo-msg cart__promo-msg--ok' });
            const removePromo = createButton('Remove', 'remove-promo');
            removePromo.className = 'cart__promo-remove';
            removePromo.setAttribute('aria-label', 'Remove promo code');
            applied.append(createEl('span', { text: 'Promo code applied: 10% off' }), removePromo);
            promo.append(applied);
        }

        if (promoMessage) {
            promo.append(createEl('p', { className: 'cart__promo-msg cart__promo-msg--error', text: promoMessage }));
        }

        const summary = createEl('div', { className: 'cart__summary' });
        summary.append(
            createEl('h2', { className: 'cart__summary-title', text: 'Order summary' }),
            createSummaryRow('Subtotal', formatPrice(subtotal))
        );
        if (discount > 0) {
            summary.append(createSummaryRow('Discount', `−${formatPrice(discount)}`, 'cart__summary-row--discount'));
        }
        summary.append(createSummaryRow('Total', formatPrice(total), 'cart__summary-row--total'));

        root.replaceChildren(title, list, promo, summary);
    };

    root.addEventListener('click', (event) => {
        const button = (event.target as HTMLElement).closest<HTMLElement>('[data-action]');
        if (!button) return;

        const action = button.dataset.action;

        if (action === 'remove-promo') {
            promoDraft = '';
            promoMessage = '';
            cartStore.clearPromo();
            return;
        }

        if (action === 'apply-promo') {
            const input = root.querySelector<HTMLInputElement>('.cart__promo-input');
            promoDraft = input?.value ?? '';

            if (!promoDraft.trim()) {
                promoMessage = 'Enter a promo code';
                render();
            } else if (isValidPromo(promoDraft)) {
                promoMessage = '';
                cartStore.applyPromo(promoDraft);
            } else {
                promoMessage = 'Unknown promo code';
                render();
            }
            return;
        }

        const id = button.closest<HTMLElement>('[data-id]')?.dataset.id;
        if (!id) return;
        const item = cartStore.getState().items.find((i) => i.id === id);
        if (!item) return;

        if (action === 'inc') cartStore.setQuantity(id, item.quantity + 1);
        if (action === 'dec') cartStore.setQuantity(id, item.quantity - 1);
        if (action === 'remove') cartStore.remove(id);
    });

    const unsubscribe = cartStore.subscribe(() => {
        if (!root.isConnected) {
            unsubscribe();
            return;
        }
        render();
    });

    render();
    return root;
}
