import { createEl } from '../../utils/dom';
const options = ['all', 'ornaments', 'accessories', 'toys', 'food'];

export function CategorySwitcher(onChange: () => void): HTMLElement {
    const switcher = createEl('div', { className: 'switcher' });

    options.forEach((option, i) => {
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
