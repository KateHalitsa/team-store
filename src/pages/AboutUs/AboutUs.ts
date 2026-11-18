export function AboutUs(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'about';
    section.innerHTML = '<h1>About Us</h1>';
    return section;
}
