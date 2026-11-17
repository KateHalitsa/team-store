export type Gift = {
    name: string;
    cost: number;
    amount: number;
    image: string;
    category: Category;
};
type Category = 'food' | 'ornaments' | 'diy';
