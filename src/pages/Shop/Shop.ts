import { AddCards } from '../../components/AddCards/AddCards';
import productsData from '../../data/products.json';
import type { Gift } from '../../types/types';
import { createEl } from '../../utils/dom';
import '../../components/ProductCard/ProductCard.css';
import './Shop.css';
import { PriceFilter } from '../../components/PriceFilter.ts/PriceFilter';
import { CategorySwitcher } from '../../components/CategorySwitcher/CategorySwitcher';
import { SortSelect } from '../../components/SortSelect/SortSelect';

const products = productsData as Gift[];

export function Shop(): HTMLElement {
    const shop = createEl('section', { className: 'shop' });
    shop.append(createEl('h1', { text: 'Shop' }));

    const catalog = document.createElement('div');
    catalog.classList.add('catalog');

    const queries = createEl('div', { className: 'queries' });
    const bottomQueries = createEl('div', { className: 'bottom-queries' });

    const searchInput = createEl('input', { className: 'search-input' });
    searchInput.placeholder = 'Search...';

    const select = SortSelect();

    const cleanBtn = createEl('button', { className: 'clean-btn' });

    function renderCatalog() {
        catalog.replaceChildren();
        batch = 0;
        showMoreBtn.hidden = false;

        const category = switcher.querySelector<HTMLInputElement>('input[name="options"]:checked')?.value;

        fillTheCatalog = AddCards(
            products,
            showMoreBtn,
            searchInput.value,
            category,
            priceFilter.getMinPrice(),
            priceFilter.getMaxPrice(),
            select.value
        );

        batch = fillTheCatalog(batch, catalog);
    }

    const priceFilter = PriceFilter(renderCatalog);
    bottomQueries.append(searchInput, priceFilter.element, select, cleanBtn);

    const switcher = CategorySwitcher(renderCatalog);
    queries.append(switcher, bottomQueries);
    shop.append(queries);

    const showMoreBtn = document.createElement('button');
    showMoreBtn.classList.add('show-more-btn');
    showMoreBtn.textContent = 'More';

    let batch = 0;
    let fillTheCatalog = AddCards(products, showMoreBtn, searchInput.value);

    showMoreBtn.addEventListener('click', () => {
        batch = fillTheCatalog(batch, catalog);
    });

    searchInput.addEventListener('input', renderCatalog);

    select.addEventListener('change', renderCatalog);

    priceFilter.updateTrack();

    cleanBtn.addEventListener('click', () => {
        searchInput.value = '';
        select.value = 'default';

        const categoryInput = document.querySelector<HTMLInputElement>('input[name="options"][value="all"]');

        if (categoryInput) {
            categoryInput.checked = true;
        }

        priceFilter.reset();

        renderCatalog();
    });
    shop.append(catalog, showMoreBtn);
    document.body.append(shop);

    renderCatalog();

    return shop;
}
