import { createEl } from '../../utils/dom';

export function Cart(): HTMLElement {
    const section = createEl('section', { className: 'cart' });
    section.append(createEl('h1', { text: 'Cart' }));
    return section;
}
