export type Gift = {
    id: string;
    name: string;
    cost: number;
    amount: number;
    image: string;
    category: Category;
};
export const CATEGORIES = ['food', 'ornaments', 'toys', 'accessories'] as const;
export type Category = (typeof CATEGORIES)[number];
export const CATEGORY_OPTIONS = ['all', ...CATEGORIES] as const;
