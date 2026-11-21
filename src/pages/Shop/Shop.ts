import { AddCards } from '../../components/AddCards/AddCards';
import productsData from '../../data/products.json';
import type { Gift } from '../../types/types';
import { createEl } from '../../utils/dom';
import '../../components/ProductCard/ProductCard.css';
import './Shop.css';

const products = productsData as Gift[];

const options = ['all', 'ornaments', 'accessories', 'toys', 'food'];

export function Shop(): HTMLElement {
    const shop = createEl('section', { className: 'shop' });
    shop.append(createEl('h1', { text: 'Shop' }));

    const catalog = document.createElement('div');
    catalog.classList.add('catalog');

    const queries = createEl('div', { className: 'queries' });

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
    queries.append(switcher, searchInput);
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
        const selected = document.querySelector<HTMLInputElement>('input[name="options"]:checked');
        const label = document.querySelector(`label[for="${selected?.id}"]`);

        fillTheCatalog = AddCards(products, showMoreBtn, searchInput.value, label?.textContent);
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
