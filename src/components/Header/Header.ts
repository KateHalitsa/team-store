import './Header.css';

const links = [
    { href: '/', label: 'About Us' },
    { href: '/shop', label: 'Shop' },
    { href: '/cart', label: 'Cart' },
];

export function Header(): HTMLElement {
    const header = document.createElement('header');
    header.className = 'header';

    header.innerHTML = `
    <p class="header__banner">✦ CHRISTMAS COLLECTION ✦</p>
    <div class="header__bar">
      <a href="/" data-link class="header__brand">
        <span class="header__title">Evergreen</span>
        <span class="header__subtitle">Christmas Store</span>
      </a>
      <nav class="header__nav">
        ${links
            .map(
                ({ href, label }) => `
          <a href="${href}" data-link class="header__link">
            ${label}${label === 'Cart' ? '<span class="header__badge">0</span>' : ''}
          </a>`
            )
            .join('')}
      </nav>
    </div>
  `;

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

    window.addEventListener('routechange', updateActive);
    updateActive();

    return header;
}
