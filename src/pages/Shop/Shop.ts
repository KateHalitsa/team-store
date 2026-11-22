import { AddCards } from '../../components/AddCards/AddCards';
import productsData from '../../data/products.json';
import type { Gift } from '../../types/types';
import { createEl } from '../../utils/dom';
import '../../components/ProductCard/ProductCard.css';
import './Shop.css';
import { PriceFilter } from '../../components/PriceFilter.ts/PriceFilter';

const products = productsData as Gift[];

const options = ['all', 'ornaments', 'accessories', 'toys', 'food'];
const sortOptions = [
    ['default', 'Default'],
    ['up', 'Price ↑'],
    ['down', 'Price ↓'],
];

export function Shop(): HTMLElement {
    const shop = createEl('section', { className: 'shop' });
    shop.append(createEl('h1', { text: 'Shop' }));

    const catalog = document.createElement('div');
    catalog.classList.add('catalog');

    const queries = createEl('div', { className: 'queries' });
    const bottomQueries = createEl('div', { className: 'bottom-queries' });

    const searchInput = createEl('input', { className: 'search-input' });
    searchInput.placeholder = 'Search...';

    const switcher = createEl('div', { className: 'switcher' });

    options.forEach((option, i) => {
        const input = createEl('input');
        input.id = `category${i + 1}`;
        input.type = 'radio';
        input.name = 'options';
        if (i === 0) input.checked = true;
        const label = createEl('label', { className: 'option-category' });
        label.htmlFor = input.id;
        label.textContent = option;
        input.addEventListener('change', () => {
            renderCatalog();
        });
        switcher.append(input, label);
    });
    const select = createEl('select');
    sortOptions.forEach((sort) => {
        const option = createEl('option');
        option.value = sort[0];
        option.textContent = sort[1];
        select.append(option);
    });
    function renderCatalog() {
        catalog.replaceChildren();
        batch = 0;
        showMoreBtn.hidden = false;
        const selected = document.querySelector<HTMLInputElement>('input[name="options"]:checked');
        const label = document.querySelector(`label[for="${selected?.id}"]`);

        fillTheCatalog = AddCards(
            products,
            showMoreBtn,
            searchInput.value,
            label?.textContent,
            priceFilter.getMinPrice(),
            priceFilter.getMaxPrice(),
            select.value
        );
        batch = fillTheCatalog(batch, catalog);
    }

    const priceFilter = PriceFilter(renderCatalog);
    bottomQueries.append(searchInput, priceFilter.element, select);
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

    shop.append(catalog, showMoreBtn);
    document.body.append(shop);

    renderCatalog();

    return shop;
}
