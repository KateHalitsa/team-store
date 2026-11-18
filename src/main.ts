import './styles/style.css';
import { initRouter } from './router/router';

const app = document.querySelector<HTMLDivElement>('#app')!;
const main = document.createElement('main');

app.append(main);
initRouter(main);
