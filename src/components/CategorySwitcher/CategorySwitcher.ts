import { CATEGORY_OPTIONS } from '../../types/types';
import { createEl } from '../../utils/dom';
import './CategorySwitcher.css';

export function CategorySwitcher(onChange: () => void): HTMLElement {
    const switcher = createEl('div', { className: 'switcher' });
    switcher.ariaLabel = 'aria-label';

    CATEGORY_OPTIONS.forEach((option, i) => {
        const input = createEl('input');
        input.id = `category${i + 1}`;
        input.type = 'radio';
        input.name = 'options';
        input.value = option;
        input.checked = i === 0;

        const label = createEl('label', { className: 'option-category' });
        label.htmlFor = input.id;
        label.textContent = option;

        input.addEventListener('change', onChange);
        switcher.append(input, label);
    });

    return switcher;
}
