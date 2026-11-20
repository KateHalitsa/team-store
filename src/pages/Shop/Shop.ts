import { AddCards } from '../../components/AddCards/AddCards';
import productsData from '../../data/products.json';
import type { Gift } from '../../types/types';
import { createEl } from '../../utils/dom';
import '../../components/ProductCard/ProductCard.css';
import './Shop.css';

const products = productsData as Gift[];

export function Shop(): HTMLElement {
    const shop = createEl('section', { className: 'shop' });
    shop.append(createEl('h1', { text: 'Shop' }));

    const catalog = document.createElement('div');
    catalog.classList.add('catalog');

    const queries = createEl('div', { className: 'queries' });

    const searchInput = createEl('input', { className: 'search-input' });
    searchInput.placeholder = 'Search...';

    queries.append(searchInput);
    shop.append(queries);

    const showMoreBtn = document.createElement('button');
    showMoreBtn.classList.add('show-more-btn');
    showMoreBtn.textContent = 'More';

    let batch = 0;
    let fillTheCatalog = AddCards(products, showMoreBtn, searchInput.value);

    function renderCatalog() {
        catalog.replaceChildren();
        batch = 0;
        showMoreBtn.hidden = false;

        fillTheCatalog = AddCards(products, showMoreBtn, searchInput.value);
        batch = fillTheCatalog(batch, catalog);
    }

    showMoreBtn.addEventListener('click', () => {
        batch = fillTheCatalog(batch, catalog);
    });

    searchInput.addEventListener('input', renderCatalog);

    shop.append(catalog, showMoreBtn);
    document.body.append(shop);

    renderCatalog();

    return shop;
}
