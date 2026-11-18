import { AboutUs } from '../pages/AboutUs/AboutUs';
import { Shop } from '../pages/Shop/Shop';
import { Cart } from '../pages/Cart/Cart';
import { NotFound } from '../pages/NotFound/NotFound';

type PageFactory = () => HTMLElement;

const routes: Record<string, PageFactory> = {
    '/': AboutUs,
    '/shop': Shop,
    '/cart': Cart,
};

export const normalizePath = (path: string): string => (path.length > 1 ? path.replace(/\/+$/, '') : path);

export const resolvePage = (path: string): PageFactory => routes[normalizePath(path)] ?? NotFound;

let outlet: HTMLElement;

function render(): void {
    outlet.replaceChildren(resolvePage(location.pathname)());
    window.dispatchEvent(new Event('routechange'));
}

export function navigate(path: string): void {
    if (path === location.pathname) return;
    history.pushState({}, '', path);
    render();
}

export function initRouter(root: HTMLElement): void {
    outlet = root;

    document.addEventListener('click', (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
        const target = event.target;
        if (!(target instanceof Element)) return;
        const link = target.closest<HTMLAnchorElement>('a[data-link]');
        if (!link) return;
        event.preventDefault();
        navigate(link.getAttribute('href') ?? '/');
    });

    window.addEventListener('popstate', render);
    render();
}
