import type { Gift } from '../../types/types';

export function getFiltered(
    products: Gift[],
    search: string,
    category: string = 'all',
    minPrice: number = 0,
    maxPrice: number = 150,
    sort: string = 'default'
) {
    let result = products;

    if (search) {
        result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== 'all') {
        result = result.filter((p) => p.category === category);
    }
    result = result.filter((p) => p.cost >= minPrice && p.cost <= maxPrice);
    if (sort === 'down') {
        result.sort((a, b) => b.cost - a.cost);
    } else if (sort === 'up') {
        result.sort((a, b) => a.cost - b.cost);
    }

    return result;
}
