import { createEl } from '../../utils/dom';

export function PriceFilter(onChange: () => void) {
    const priceFilter = createEl('div', { className: 'price-filter' });
    const priceInputs = createEl('div', { className: 'price-inputs' });

    const labelFrom = createEl('label');
    labelFrom.textContent = 'from';
    const labelTo = createEl('label');
    labelTo.textContent = 'to';

    const inputFrom = createEl('input');
    inputFrom.id = 'minPriceInput';
    inputFrom.type = 'number';
    inputFrom.value = '10';
    inputFrom.min = '0';
    inputFrom.max = '1000';
    inputFrom.step = '10';
    labelFrom.append(inputFrom);

    const inputTo = createEl('input');
    inputTo.id = 'maxPriceInput';
    inputTo.type = 'number';
    inputTo.value = '150';
    inputTo.min = '0';
    inputTo.max = '1000';
    inputTo.step = '10';
    labelTo.append(inputTo);

    priceInputs.append(labelFrom, labelTo);
    const priceSiders = createEl('div', { className: 'price-sliders' });

    const minRange = createEl('input');
    minRange.id = 'minRange';
    minRange.type = 'range';
    minRange.value = '10';
    minRange.min = '0';
    minRange.max = '200';
    minRange.step = '10';

    const maxRange = createEl('input');
    maxRange.id = 'maxRange';
    maxRange.type = 'range';
    maxRange.value = '150';
    maxRange.min = '0';
    maxRange.max = '200';
    maxRange.step = '10';

    const sliderTrack = createEl('div', { className: 'slider-track' });
    const rangeTrack = createEl('div', { className: 'range-track' });

    priceSiders.append(sliderTrack, rangeTrack, minRange, maxRange);
    priceFilter.append(priceInputs, priceSiders);

    const minGap = 10;

    function updateTrack() {
        const min = Number(minRange.min);
        const max = Number(minRange.max);

        const minVal = Number(minRange.value);
        const maxVal = Number(maxRange.value);

        const left = ((minVal - min) / (max - min)) * 100;
        const right = ((maxVal - min) / (max - min)) * 100;

        rangeTrack.style.left = `${left}%`;
        rangeTrack.style.width = `${right - left}%`;
    }

    function syncFromRange(event: Event) {
        const active = event.currentTarget as HTMLInputElement;

        let minVal = Number(minRange.value);
        let maxVal = Number(maxRange.value);

        if (maxVal - minVal < minGap) {
            if (active === minRange) {
                minVal = maxVal - minGap;
                minRange.value = `${minVal}`;
            } else {
                maxVal = minVal + minGap;
                maxRange.value = `${maxVal}`;
            }
        }

        inputFrom.value = `${minVal}`;
        inputTo.value = `${maxVal}`;

        updateTrack();
        onChange();
    }

    function syncFromInput(event: Event) {
        const active = event.currentTarget as HTMLInputElement;

        let minVal = Number(inputFrom.value);
        let maxVal = Number(inputTo.value);

        const min = Number(minRange.min);
        const max = Number(maxRange.max);

        minVal = Math.max(min, Math.min(minVal, max));
        maxVal = Math.max(min, Math.min(maxVal, max));

        if (maxVal - minVal < minGap) {
            if (active === inputFrom) {
                minVal = maxVal - minGap;
            } else {
                maxVal = minVal + minGap;
            }
        }

        minVal = Math.max(min, minVal);
        maxVal = Math.min(max, maxVal);

        inputFrom.value = `${minVal}`;
        inputTo.value = `${maxVal}`;

        minRange.value = `${minVal}`;
        maxRange.value = `${maxVal}`;

        updateTrack();
    }

    minRange.addEventListener('input', syncFromRange);
    maxRange.addEventListener('input', syncFromRange);

    inputFrom.addEventListener('input', syncFromInput);
    inputTo.addEventListener('input', syncFromInput);
    return {
        element: priceFilter,
        updateTrack: () => updateTrack(),
        getMinPrice: () => Number(inputFrom.value),
        getMaxPrice: () => Number(inputTo.value),
        reset: () => {
            inputFrom.value = '10';
            inputTo.value = '150';
            minRange.value = '10';
            maxRange.value = '150';
            updateTrack();
        },
    };
}
