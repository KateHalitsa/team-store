import { getFiltered } from '../../features/queries/getFiltered';
import type { Gift } from '../../types/types';
import { ProductCard } from '../ProductCard/ProductCard';

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
    const filtredproducts = getFiltered(products, search, category, minPrice, maxPrice, select);
    const amountOfBatch = Math.ceil(filtredproducts.length / 6);
    return function (batch: number, catalog: HTMLDivElement) {
        filtredproducts.slice(batch * 6, ++batch * 6).forEach((product: Gift) => {
            const card = ProductCard(product);
            catalog.append(card);
        });
        if (batch === amountOfBatch) {
            button.hidden = true;
        }
        if (filtredproducts.length === 0) {
            button.hidden = true;
            message.hidden = false;
        }
        return batch;
    };
}
