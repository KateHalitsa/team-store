type ElementOptions = {
    className?: string;
    text?: string;
};

export function createEl<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    { className, text }: ElementOptions = {}
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}
