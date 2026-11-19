import { AddCards } from '../../components/AddCards/AddCards';
import productsData from '../../data/products.json';
import type { Gift } from '../../types/types';

const products = productsData as Gift[];

export function Shop() {
    const shop = document.createElement('section');
    shop.classList.add('shop');
    const catalog = document.createElement('div');
    catalog.classList.add('catalog');

    let batch = 0;

    const showMoreBtn = document.createElement('button');
    showMoreBtn.classList.add('show-more-btn');
    showMoreBtn.textContent = 'More';
    const fillTheСatalog = AddCards(products, showMoreBtn);
    batch = fillTheСatalog(batch, catalog);
    showMoreBtn.addEventListener('click', () => {
        batch = fillTheСatalog(batch, catalog);
    });

    shop.append(catalog, showMoreBtn);
    document.body.append(shop);
}
