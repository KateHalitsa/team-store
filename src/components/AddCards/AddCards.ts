import type { Gift } from '../../types/types';
import { ProductCard } from '../ProductCard/ProductCard';

export function AddCards(products: Gift[], button: HTMLButtonElement) {
    const amountOfBatch = Math.ceil(products.length / 6);
    return function (batch: number, catalog: HTMLDivElement) {
        products.slice(batch * 6, ++batch * 6).forEach((product: Gift) => {
            const card = ProductCard(product);
            catalog.append(card);
        });
        if (batch === amountOfBatch) {
            button.hidden = true;
        }
        return batch;
    };
}
