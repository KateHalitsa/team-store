import { createEl } from '../../utils/dom';

export function AboutUs(): HTMLElement {
    const section = createEl('section', { className: 'about' });
    section.append(createEl('h1', { text: 'About Us' }));
    return section;
}
