import { createEl } from '../../utils/dom';

const sortOptions = [
    ['default', 'Default'],
    ['up', 'Price ↑'],
    ['down', 'Price ↓'],
];

export function SortSelect(): HTMLSelectElement {
    const select = createEl('select');

    sortOptions.forEach(([value, label]) => {
        const option = createEl('option');
        option.value = value;
        option.textContent = label;
        select.append(option);
    });

    return select;
}
