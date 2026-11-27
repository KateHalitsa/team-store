import { createEl } from '../../utils/dom';
import './Footer.css';

export function Footer(): HTMLElement {
    const footer = createEl('footer', { className: 'footer' });

    const text = createEl('p', {
        className: 'footer__text',
        text: '© 2026 Evergreen Christmas Store · Educational project for ',
    });

    const link = createEl('a', {
        className: 'footer__link',
        text: 'The Rolling Scopes School',
    });

    link.href = 'https://rs.school/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    text.append(link);
    footer.append(text);

    return footer;
}
