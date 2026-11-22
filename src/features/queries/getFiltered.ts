import type { Gift } from '../../types/types';

export function getFiltered(
    products: Gift[],
    search: string,
    category: string = 'all',
    minPrice: number = 0,
    maxPrice: number = 150
) {
    let result = products;

    if (search) {
        result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== 'all') {
        result = result.filter((p) => p.category === category);
    }
    result = result.filter((p) => p.cost >= minPrice && p.cost <= maxPrice);

    return result;
}
