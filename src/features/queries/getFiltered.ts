import type { Gift } from '../../types/types';

export function getFiltered(products: Gift[], search: string, category: string = 'all') {
    let result = products;

    if (search) {
        result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== 'all') {
        result = result.filter((p) => p.category === category);
    }

    return result;
}
