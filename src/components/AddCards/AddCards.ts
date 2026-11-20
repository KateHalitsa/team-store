import { getFiltered } from '../../features/queries/getFiltered';
import type { Gift } from '../../types/types';
import { ProductCard } from '../ProductCard/ProductCard';

export function AddCards(products: Gift[], button: HTMLButtonElement, search: string) {
    const filtredproducts = getFiltered(products, search);
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
