export function NotFound(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'not-found';
    section.innerHTML = `
    <h1>Page not found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/" data-link>Back to home</a>
  `;
    return section;
}
