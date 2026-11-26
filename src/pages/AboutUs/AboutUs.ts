import { createEl } from '../../utils/dom';
import './AboutUs.css';

type Feature = { icon: string; title: string; text: string };
type Member = { name: string; login: string; contributions: string[] };

const FEATURES: Feature[] = [
    {
        icon: '🔍',
        title: 'Find it fast',
        text: 'Browse the catalog, search for gifts, filter by category and price, sort products and reset all filters in one click.',
    },
    {
        icon: '🎁',
        title: 'Explore the catalog',
        text: 'Discover Christmas gifts with product cards, availability status and a Show more button to load more items.',
    },
    {
        icon: '🛒',
        title: 'Your cart stays put',
        text: 'Change quantities, remove items, check the total and apply the SALE10 promo code for 10% off. Your cart is saved in localStorage.',
    },
    {
        icon: '⚡',
        title: 'No page reloads',
        text: 'Navigate between About Us, Shop and Cart instantly. Browser Back and Forward buttons work as expected.',
    },
];

const TEAM: Member[] = [
    {
        name: 'Katerina Halitsa',
        login: 'KateHalitsa',
        contributions: [
            'Project setup: Vite, TypeScript, ESLint, Prettier, Vitest and Husky',
            'Netlify deployment',
            'Shop page: product catalog, cards and pagination',
            'Search, category and price filters, sorting and reset',
            'Responsive layout',
        ],
    },
    {
        name: 'Alena Danilchenko',
        login: 'anelka777',
        contributions: [
            'Project structure, global styles and page stubs',
            'History API router with Back/Forward support and tests',
            'Header, navigation and burger menu',
            'Cart: quantities, item removal, totals, promo code and localStorage',
            'NotFound and About Us pages',
            'README',
            'Responsive layout',
        ],
    },
];

const STACK = ['TypeScript', 'Vite', 'Vitest', 'ESLint', 'Prettier', 'Husky', 'GitHub Actions', 'Netlify'];

function createLink(text: string, href: string, className: string, external = false): HTMLAnchorElement {
    const link = createEl('a', { className, text });
    link.href = href;

    if (external) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    } else {
        link.dataset.link = '';
    }

    return link;
}

function createHero(): HTMLElement {
    const hero = createEl('div', { className: 'about-hero' });
    const content = createEl('div', { className: 'about-hero__content' });

    content.append(
        createEl('h1', {
            className: 'about-hero__title',
            text: 'About Us',
        }),
        createEl('p', {
            className: 'about-hero__lead',
            text: 'Gifts that make the season bright.',
        }),
        createEl('p', {
            className: 'about-hero__text',
            text: 'Evergreen Christmas Store is a team project created as part of the Rolling Scopes School. Explore our Christmas gift catalog, find your favorites and enjoy a simple shopping experience.',
        }),
        createLink('Browse the shop', '/shop', 'about-hero__cta')
    );

    hero.append(content);
    return hero;
}

function createFeatures(): HTMLElement {
    const section = createEl('section', { className: 'about-section' });

    section.append(
        createEl('h2', {
            className: 'about-section__title',
            text: 'What you can do',
        })
    );

    const list = createEl('div', { className: 'about-features' });

    for (const feature of FEATURES) {
        const item = createEl('div', { className: 'about-feature' });
        const icon = createEl('span', {
            className: 'about-feature__icon',
            text: feature.icon,
        });

        icon.setAttribute('aria-hidden', 'true');

        item.append(
            icon,
            createEl('h3', {
                className: 'about-feature__title',
                text: feature.title,
            }),
            createEl('p', {
                className: 'about-feature__text',
                text: feature.text,
            })
        );

        list.append(item);
    }

    section.append(list);
    return section;
}

function createMemberCard(member: Member): HTMLElement {
    const card = createEl('article', { className: 'about-member' });
    const avatar = createEl('img', { className: 'about-member__avatar' });

    avatar.src = `https://github.com/${member.login}.png?size=160`;
    avatar.alt = `${member.name} on GitHub`;
    avatar.width = 88;
    avatar.height = 88;
    avatar.loading = 'lazy';

    avatar.addEventListener('error', () => {
        avatar.hidden = true;
    });

    const header = createEl('div', { className: 'about-member__header' });
    const names = createEl('div');

    names.append(
        createEl('h3', {
            className: 'about-member__name',
            text: member.name,
        }),
        createLink(`@${member.login}`, `https://github.com/${member.login}`, 'about-member__link', true)
    );

    header.append(avatar, names);

    const list = createEl('ul', { className: 'about-member__list' });

    for (const item of member.contributions) {
        list.append(createEl('li', { text: item }));
    }

    card.append(header, list);
    return card;
}

function createTeam(): HTMLElement {
    const section = createEl('section', { className: 'about-section' });

    section.append(
        createEl('h2', {
            className: 'about-section__title',
            text: 'The team',
        })
    );

    const grid = createEl('div', { className: 'about-team' });

    for (const member of TEAM) {
        grid.append(createMemberCard(member));
    }

    section.append(grid);
    return section;
}

function createStack(): HTMLElement {
    const section = createEl('section', { className: 'about-section' });

    section.append(
        createEl('h2', {
            className: 'about-section__title',
            text: 'Built with',
        })
    );

    const list = createEl('ul', { className: 'about-stack' });

    for (const tech of STACK) {
        list.append(
            createEl('li', {
                className: 'about-stack__chip',
                text: tech,
            })
        );
    }

    section.append(list);
    return section;
}

export function AboutUs(): HTMLElement {
    const page = createEl('section', { className: 'about' });
    const dark = createEl('div', { className: 'about-dark' });
    const inner = createEl('div', { className: 'about-dark__inner' });

    inner.append(createFeatures(), createTeam());
    dark.append(inner);

    page.append(createHero(), dark, createStack());

    return page;
}
