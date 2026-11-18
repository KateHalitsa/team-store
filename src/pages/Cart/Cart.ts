export function Cart(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'cart';
    section.innerHTML = '<h1>Cart</h1>';
    return section;
}
