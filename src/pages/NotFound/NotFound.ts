import { createEl } from '../../utils/dom';

export function NotFound(): HTMLElement {
    const section = createEl('section', { className: 'not-found' });

    const homeLink = createEl('a', { text: 'Back to home' });
    homeLink.href = '/';
    homeLink.dataset.link = '';

    section.append(
        createEl('h1', { text: 'Page not found' }),
        createEl('p', { text: 'The page you are looking for does not exist.' }),
        homeLink
    );
    return section;
}
