import { getFiltered } from '../../features/queries/getFiltered';
import type { Gift } from '../../types/types';
import { ProductCard } from '../ProductCard/ProductCard';

const BATCH_SIZE = 6;

export function AddCards(
    products: Gift[],
    button: HTMLButtonElement,
    message: HTMLDivElement,
    search: string,
    category: string = 'all',
    minPrice: number = 0,
    maxPrice: number = 150,
    select: string = 'default'
) {
    const filteredProducts = getFiltered(products, search, category, minPrice, maxPrice, select);
    const amountOfBatch = Math.ceil(filteredProducts.length / BATCH_SIZE);
    return function (batch: number, catalog: HTMLDivElement) {
        filteredProducts.slice(batch * BATCH_SIZE, ++batch * BATCH_SIZE).forEach((product: Gift) => {
            const card = ProductCard(product);
            catalog.append(card);
        });
        if (batch === amountOfBatch) {
            button.hidden = true;
        }
        if (filteredProducts.length === 0) {
            button.hidden = true;
            message.hidden = false;
        }
        return batch;
    };
}
