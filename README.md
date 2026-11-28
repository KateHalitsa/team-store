# Evergreen Christmas Store

Небольшой онлайн-магазин рождественских подарков: каталог с поиском, фильтрами и сортировкой, корзина с промокодом. Учебный командный проект (RS School).

**Демо:** [Evergreen Christmas Store](https://evergreen-christmas-store.netlify.app)


## Возможности

- Страницы: About Us, Shop, Cart и 404 (роутер на History API, без перезагрузки)
- Каталог с карточками, пагинацией («показать ещё») и статусом наличия
- Поиск, фильтр по категории и цене, сортировка, сброс фильтров
- Корзина: изменение количества, удаление, итоговая сумма, сохранение в `localStorage`
- Промокод `SALE10` (скидка 10%)
- Адаптивная вёрстка, sticky header и бургер-меню
- Header и Footer

## Технологии

TypeScript, Vite, Vitest, ESLint, Prettier, Husky, lint-staged.

Деплой: Netlify (для SPA-роутинга настроен редирект на `index.html`, см. `netlify.toml`).

## Запуск

Требуется Node.js 24.x и npm 11.x.

Установка зависимостей:

```bash
npm ci
```

Запуск локального сервера:

```bash
npm run dev
```

## Проверки и сборка

```bash
npm test                # тесты (Vitest)
npm run lint            # проверка ESLint
npm run lint:fix        # ESLint с автоисправлением
npm run format:check    # проверка форматирования Prettier
npm run format          # форматирование Prettier
npm run build           # проверка типов (tsc) и сборка Vite
```

Предпросмотр production-сборки (сначала нужна сборка):

```bash
npm run build
npm run preview
```

## Структура проекта

```text
src/
├── main.ts                  # точка входа: Header, роутер
├── components/
│   ├── AddCards/            # подгрузка карточек порциями и тесты
│   ├── CategorySwitcher/    # переключатель категорий
│   ├── Footer/              # подвал сайта
│   ├── Header/              # шапка, навигация, бургер-меню, счётчик корзины
│   ├── PriceFilter/         # фильтр по цене
│   ├── ProductCard/         # карточка товара
│   ├── SortSelect/          # выбор сортировки
│   ├── SwitcherSelect/      # выбор категории для узких экранов
│   └── Toast/               # всплывающее уведомление
├── data/                    # products.json и тесты данных
├── features/
│   ├── cart/                # логика корзины, cartStore (localStorage), тесты
│   └── queries/             # поиск, фильтры и сортировка, тесты
├── pages/                   # AboutUs, Shop, Cart, NotFound
├── router/                  # роутер на History API и тесты
├── styles/                  # переменные и глобальные стили
├── types/                   # общие типы данных
└── utils/                   # вспомогательные функции (dom.ts)

public/
├── gifts/                   # изображения товаров
├── icons/                   # иконки
└── images/                  # фоновые изображения и баннеры

.github/
└── workflows/
    └── ci.yml               # GitHub Actions CI

netlify.toml                 # настройки деплоя
```

## Качество кода

- **ESLint** и **Prettier** проверяют стиль и форматирование.
- **Husky** запускает проверки в git-хуках: `pre-commit` запускает lint-staged, `pre-push` запускает тесты.
- **lint-staged** применяет ESLint (`--fix`) и Prettier к изменённым `.js`/`.ts` файлам.
- **GitHub Actions** (`.github/workflows/ci.yml`) на каждый Pull Request и push в `main` выполняет установку, сборку и тесты.

## Команда

| Участник | GitHub | Вклад |
| --- | --- | --- |
| **Katerina Halitsa** | [KateHalitsa](https://github.com/KateHalitsa) | • Настройка проекта (Vite, TypeScript, ESLint, Prettier, Vitest, Husky)<br>• Деплой на Netlify<br>• Страница Shop: каталог, карточки товаров, пагинация<br>• Поиск, фильтры по категории и цене, сортировка, сброс фильтров<br>• Адаптивная вёрстка |
| **Alena Danilchenko** | [anelka777](https://github.com/anelka777) | • Структура проекта, глобальные стили и страницы-заглушки<br>• Роутер на History API (кнопки Back/Forward, тесты)<br>• Header с бургер-меню<br>• Страница Cart: количество, удаление, итоговая сумма, промокод, `localStorage`<br>• Страницы: NotFound и About Us<br>• Footer<br>• README<br>• Адаптивная вёрстка |

## Организация работы

Задачи ведём на доске Jira, работаем в ветках `тип/логин/описание` (например, `feat/anelka777/cart-promo-code`), изменения вносим через Pull Request с ревью напарника.