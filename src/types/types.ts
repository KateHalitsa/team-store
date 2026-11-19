export type Gift = {
    id: string;
    name: string;
    cost: number;
    amount: number;
    image: string;
    category: Category;
};
type Category = 'food' | 'ornaments' | 'toys' | 'accessories';
