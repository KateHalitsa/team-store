import { getFiltered } from '../../features/queries/getFiltered';
import type { Gift } from '../../types/types';
import { ProductCard } from '../ProductCard/ProductCard';

export function AddCards(
    products: Gift[],
    button: HTMLButtonElement,
    search: string,
    category: string = 'all',
    minPrice: number = 0,
    maxPrice: number = 150
) {
    const filtredproducts = getFiltered(products, search, category, minPrice, maxPrice);
    const amountOfBatch = Math.ceil(filtredproducts.length / 6);
    return function (batch: number, catalog: HTMLDivElement) {
        filtredproducts.slice(batch * 6, ++batch * 6).forEach((product: Gift) => {
            const card = ProductCard(product);
            catalog.append(card);
        });
        if (batch === amountOfBatch) {
            button.hidden = true;
        }
        return batch;
    };
}
