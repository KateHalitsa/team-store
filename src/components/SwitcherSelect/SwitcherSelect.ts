import { CATEGORY_OPTIONS } from '../../types/types';

export function createSwitcherSelect(): HTMLSelectElement {
    const select = document.createElement('select');
    select.className = 'switcher-select';
    select.ariaLabel = 'aria-label';

    CATEGORY_OPTIONS.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;

        if (category === 'all') {
            option.selected = true;
        }

        select.append(option);
    });

    return select;
}
