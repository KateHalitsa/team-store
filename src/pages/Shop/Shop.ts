import { ProductCard } from '../../components/ProductCard/ProductCard';
import productsData from '../../data/products.json';
import type { Gift } from '../../types/types';

const products = productsData as Gift[];

export function Shop() {
    const shop = document.createElement('section');
    shop.classList.add('shop');
    const catalog = document.createElement('div');
    catalog.classList.add('catalog');
    products.forEach((product: Gift) => {
        const card = ProductCard(product);
        catalog.append(card);
    });
    shop.append(catalog);
    document.body.append(shop);
}
