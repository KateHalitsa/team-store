import { createEl } from '../../utils/dom';

export function PriceFilter(
    onChange: () => void,
    bounds: { min: number; max: number } = {
        min: 0,
        max: 100,
    }
) {
    const { min: MIN, max: MAX } = bounds;
    const minGap = 1;

    const priceFilter = createEl('div', { className: 'price-filter' });
    const priceInputs = createEl('div', { className: 'price-inputs' });

    const labelFrom = createEl('label');
    labelFrom.textContent = 'from';
    const labelTo = createEl('label');
    labelTo.textContent = 'to';

    const inputFrom = createEl('input');
    inputFrom.id = 'minPriceInput';
    inputFrom.type = 'number';
    inputFrom.min = `${MIN}`;
    inputFrom.max = `${MAX}`;
    inputFrom.step = '1';
    inputFrom.value = `${MIN}`;
    labelFrom.append(inputFrom);

    const inputTo = createEl('input');
    inputTo.id = 'maxPriceInput';
    inputTo.type = 'number';
    inputTo.min = `${MIN}`;
    inputTo.max = `${MAX}`;
    inputTo.step = '1';
    inputTo.value = `${MAX}`;
    labelTo.append(inputTo);

    priceInputs.append(labelFrom, labelTo);
    const priceSliders = createEl('div', { className: 'price-sliders' });

    const minRange = createEl('input');
    minRange.id = 'minRange';
    minRange.type = 'range';
    minRange.min = `${MIN}`;
    minRange.max = `${MAX}`;
    minRange.step = '1';
    minRange.value = `${MIN}`;

    const maxRange = createEl('input');
    maxRange.id = 'maxRange';
    maxRange.type = 'range';
    maxRange.min = `${MIN}`;
    maxRange.max = `${MAX}`;
    maxRange.step = '1';
    maxRange.value = `${MAX}`;

    const sliderTrack = createEl('div', { className: 'slider-track' });
    const rangeTrack = createEl('div', { className: 'range-track' });

    priceSliders.append(sliderTrack, rangeTrack, minRange, maxRange);
    priceFilter.append(priceInputs, priceSliders);

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
        onChange();
    }

    function previewFromInput() {
        if (inputFrom.value === '' || inputTo.value === '') return;

        const min = Number(minRange.min);
        const max = Number(minRange.max);
        const minVal = Number(inputFrom.value);
        const maxVal = Number(inputTo.value);

        if (minVal < min || maxVal > max || maxVal - minVal < minGap) return;

        minRange.value = `${minVal}`;
        maxRange.value = `${maxVal}`;
        updateTrack();
        onChange();
    }

    minRange.addEventListener('input', syncFromRange);
    maxRange.addEventListener('input', syncFromRange);

    inputFrom.addEventListener('input', previewFromInput);
    inputTo.addEventListener('input', previewFromInput);

    inputFrom.addEventListener('change', syncFromInput);
    inputTo.addEventListener('change', syncFromInput);

    return {
        element: priceFilter,
        updateTrack: () => updateTrack(),
        getMinPrice: () => Number(inputFrom.value),
        getMaxPrice: () => Number(inputTo.value),
        reset: () => {
            inputFrom.value = `${MIN}`;
            inputTo.value = `${MAX}`;
            minRange.value = `${MIN}`;
            maxRange.value = `${MAX}`;
            updateTrack();
        },
    };
}
