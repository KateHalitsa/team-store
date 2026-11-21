export function showToast(message: string): void {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;

    document.body.append(toast);

    requestAnimationFrame(() => {
        toast.classList.add('toast--visible');
    });

    setTimeout(() => {
        toast.classList.remove('toast--visible');

        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
