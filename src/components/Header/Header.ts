import './Header.css';
import { cartStore } from '../../cart/cartStore';
import { getCartCount } from '../../cart/cart';
import { createEl } from '../../utils/dom';

type NavLink = { href: string; label: string; showBadge?: boolean };

const links: NavLink[] = [
    { href: '/', label: 'About Us' },
    { href: '/shop', label: 'Shop' },
    { href: '/cart', label: 'Cart', showBadge: true },
];

const DESKTOP_QUERY = '(min-width: 769px)';

export function Header(): HTMLElement {
    const header = createEl('header', { className: 'header' });
    const banner = createEl('p', { className: 'header__banner', text: '✦ CHRISTMAS COLLECTION ✦' });
    const bar = createEl('div', { className: 'header__bar' });

    const brand = createEl('a', { className: 'header__brand' });
    brand.href = '/';
    brand.dataset.link = '';
    brand.append(
        createEl('span', { className: 'header__title', text: 'Evergreen' }),
        createEl('span', { className: 'header__subtitle', text: 'Christmas Store' })
    );

    const burger = createEl('button', { className: 'header__burger' });
    burger.type = 'button';
    burger.setAttribute('aria-label', 'Open menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'main-nav');
    burger.append(createEl('span'), createEl('span'), createEl('span'));

    const nav = createEl('nav', { className: 'header__nav' });
    nav.id = 'main-nav';
    nav.setAttribute('aria-label', 'Main navigation');

    let cartBadge: HTMLElement | null = null;

    links.forEach(({ href, label, showBadge }) => {
        const link = createEl('a', { className: 'header__link', text: label });
        link.href = href;
        link.dataset.link = '';

        if (showBadge) {
            cartBadge = createEl('span', {
                className: 'header__badge',
                text: '0',
            });
            link.append(cartBadge);
        }
        nav.append(link);
    });

    bar.append(brand, burger, nav);
    header.append(banner, bar);

    const setMenuOpen = (open: boolean): void => {
        nav.classList.toggle('header__nav--open', open);
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    burger.addEventListener('click', () => {
        setMenuOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', (event) => {
        if (event.target instanceof Element && event.target.closest('a')) setMenuOpen(false);
    });

    document.addEventListener('click', (event) => {
        if (event.target instanceof Node && !header.contains(event.target)) setMenuOpen(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenuOpen(false);
    });

    window.matchMedia(DESKTOP_QUERY).addEventListener('change', (event) => {
        if (event.matches) setMenuOpen(false);
    });

    const updateActive = (): void => {
        header.querySelectorAll<HTMLAnchorElement>('.header__link').forEach((link) => {
            const isActive = link.getAttribute('href') === location.pathname;
            link.classList.toggle('header__link--active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const updateCount = (): void => {
        if (!cartBadge) return;
        cartBadge.textContent = String(getCartCount(cartStore.getState().items));
    };

    updateCount();
    cartStore.subscribe(updateCount);

    window.addEventListener('routechange', () => {
        updateActive();
        setMenuOpen(false);
    });
    updateActive();

    return header;
}
