import { createEl } from '../../utils/dom';

export function Shop(): HTMLElement {
    const section = createEl('section', { className: 'shop' });
    section.append(createEl('h1', { text: 'Shop' }));
    return section;
}
