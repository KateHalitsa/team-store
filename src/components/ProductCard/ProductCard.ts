import type { Gift } from '../../types/types';
export const ProductStatus = {
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
} as const;

export function ProductCard(product: Gift) {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.classList.add('gift-img');
    img.src = product.image;

    const specifications = document.createElement('div');
    specifications.classList.add('specifications');

    const amountStatus = document.createElement('p');
    amountStatus.classList.add('amount-status');
    const status = getAmountStatus(product.amount);
    amountStatus.textContent = status;
    amountStatus.dataset.status = status;

    const giftName = document.createElement('p');
    giftName.classList.add('gift-name');
    giftName.textContent = product.name;

    const cost = document.createElement('p');
    cost.classList.add('cost');
    cost.textContent = `${product.cost}$`;
    const addToTheCartBtn = document.createElement('button');
    addToTheCartBtn.classList.add('add-to-the-cart-btn');
    addToTheCartBtn.textContent = 'Add to cart';

    specifications.append(amountStatus, giftName, cost);
    card.append(img, specifications, addToTheCartBtn);
    return card;
}
function getAmountStatus(amount: number) {
    if (amount > 5) {
        return ProductStatus.inStock;
    } else if (amount === 0) {
        return ProductStatus.outOfStock;
    }
    return ProductStatus.lowStock;
}
