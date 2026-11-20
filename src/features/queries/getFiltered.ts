import type { Gift } from '../../types/types';

export function getFiltered(products: Gift[], search: string) {
    let result = products;

    if (search) {
        result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    return result;
}
