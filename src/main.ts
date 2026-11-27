import './styles/styles.css';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { initRouter } from './router/router';

const app = document.querySelector<HTMLDivElement>('#app')!;
const main = document.createElement('main');

app.append(Header(), main, Footer());
initRouter(main);
