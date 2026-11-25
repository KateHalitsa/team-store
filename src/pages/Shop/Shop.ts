import { AddCards } from '../../components/AddCards/AddCards';
import productsData from '../../data/products.json';
import type { Gift } from '../../types/types';
import { createEl } from '../../utils/dom';
import '../../components/ProductCard/ProductCard.css';
import './Shop.css';
import { PriceFilter } from '../../components/PriceFilter/PriceFilter';
import { CategorySwitcher } from '../../components/CategorySwitcher/CategorySwitcher';
import { SortSelect } from '../../components/SortSelect/SortSelect';
import { createSwitcherSelect } from '../../components/SwitcherSelect/SwitcherSelect';

const products = productsData as Gift[];
const prices = products.map((p) => p.cost);
const bounds = { min: Math.min(...prices), max: Math.max(...prices) };

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

    const switcherSelect = createSwitcherSelect();

    const cleanBtn = createEl('button', { className: 'clean-btn' });
    cleanBtn.title = 'Clear filters';
    cleanBtn.setAttribute('aria-label', 'Clear filters');

    function renderCatalog() {
        catalog.replaceChildren();
        batch = 0;
        showMoreBtn.hidden = false;
        message.hidden = true;

        const category = switcher.querySelector<HTMLInputElement>('input[name="options"]:checked')?.value;

        fillTheCatalog = AddCards(
            products,
            showMoreBtn,
            message,
            searchInput.value,
            category,
            priceFilter.getMinPrice(),
            priceFilter.getMaxPrice(),
            select.value
        );

        batch = fillTheCatalog(batch, catalog);
    }

    const priceFilter = PriceFilter(renderCatalog, bounds);
    bottomQueries.append(searchInput, priceFilter.element, select, switcherSelect, cleanBtn);

    const switcher = CategorySwitcher(renderCatalog);
    queries.append(switcher, bottomQueries);
    shop.append(queries);

    const showMoreBtn = document.createElement('button');
    showMoreBtn.classList.add('show-more-btn');
    showMoreBtn.textContent = 'More';

    const message = createEl('div', { className: 'catalog-message' });
    message.textContent = 'Nothing found';

    let batch = 0;
    let fillTheCatalog = AddCards(products, showMoreBtn, message, searchInput.value);

    showMoreBtn.addEventListener('click', () => {
        batch = fillTheCatalog(batch, catalog);
    });
    switcher.addEventListener('change', (event: Event) => {
        const target = event.target;

        if (target instanceof HTMLInputElement && target.name === 'options') {
            switcherSelect.value = target.value;
        }
    });

    // Синхронизация select -> radio
    switcherSelect.addEventListener('change', () => {
        const categoryInput = switcher.querySelector<HTMLInputElement>(
            `input[name="options"][value="${switcherSelect.value}"]`
        );

        if (categoryInput) {
            categoryInput.checked = true;
            categoryInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    searchInput.addEventListener('input', renderCatalog);

    select.addEventListener('change', renderCatalog);

    priceFilter.updateTrack();
    cleanBtn.addEventListener('click', () => {
        searchInput.value = '';
        select.value = 'default';
        switcherSelect.value = 'all';

        const categoryInput = switcher.querySelector<HTMLInputElement>('input[name="options"][value="all"]');

        if (categoryInput) {
            categoryInput.checked = true;
        }

        priceFilter.reset();
        renderCatalog();
    });
    shop.append(catalog, showMoreBtn, message);
    document.body.append(shop);

    renderCatalog();

    return shop;
}
