# Evergreen Christmas Store

Небольшой онлайн-магазин рождественских подарков: каталог с поиском, фильтрами и сортировкой, корзина с промокодом. Учебный командный проект (RS School).

**Демо:** <https://evergreen-christmas-store.netlify.app>

## Возможности

- Страницы: About Us, Shop, Cart (роутер на History API, без перезагрузки)
- Каталог с карточками, пагинацией («показать ещё») и статусом наличия
- Поиск, фильтр по категории и цене, сортировка, сброс фильтров
- Корзина: изменение количества, удаление, итоговая сумма, сохранение в `localStorage`
- Промокод `SALE10` (скидка 10%)
- Адаптивная вёрстка, sticky header и бургер-меню

## Технологии

TypeScript, Vite, Vitest, ESLint, Prettier, Husky. Деплой: Netlify.

## Запуск

```bash
npm ci
npm run dev
npm test
npm run build
npm run lint
```

## Структура проекта

```text
src/
├── main.ts                  # точка входа: Header, роутер
├── components/
│   ├── AddCards/            # подгрузка карточек порциями («More») и тесты
│   ├── CategorySwitcher/    # переключатель категорий
│   ├── Header/              # шапка, навигация, бургер-меню, счётчик корзины
│   ├── PriceFilter/         # фильтр по цене
│   ├── ProductCard/         # карточка товара
│   ├── SortSelect/          # выбор сортировки
│   ├── SwitcherSelect/      # выпадающий список категорий для узких экранов
│   └── Toast/               # всплывающее уведомление
├── data/                    # products.json и тесты данных
├── features/
│   ├── cart/                # логика корзины, cartStore (localStorage), тесты
│   └── queries/             # поиск, фильтры и сортировка (getFiltered), тесты
├── pages/                   # AboutUs, Shop, Cart, NotFound
├── router/                  # роутер на History API и тесты
├── styles/                  # переменные и глобальные стили
├── types/                   # типы и список категорий (Gift, Category)
└── utils/                   # createEl (dom.ts)
public/
├── gifts/                   # изображения товаров
└── icons/                   # иконки
netlify.toml                 # настройки деплоя
```

## Качество кода

- **ESLint** и **Prettier** проверяют стиль и форматирование.
- **Husky** запускает проверки локально: перед коммитом (`pre-commit`) и перед пушем (`pre-push`).
- **GitHub Actions** (`.github/workflows/ci.yml`) запускает проверки на каждый Pull Request.

## Команда

| Участник | GitHub | Вклад |
| --- | --- | --- |
| **Katerina Halitsa** | [KateHalitsa](https://github.com/KateHalitsa) | • Настройка проекта (Vite, TypeScript, ESLint, Prettier, Vitest, Husky)<br>• Деплой на Netlify<br>• Страница Shop: каталог, карточки товаров, пагинация<br>• Поиск, фильтры по категории и цене, сортировка, сброс фильтров<br>• Адаптивная вёрстка |
| **Alena Danilchenko** | [anelka777](https://github.com/anelka777) | • Структура проекта, глобальные стили и страницы-заглушки<br>• Роутер на History API (кнопки Back/Forward, тесты)<br>• Header с бургер-меню<br>• Страница Cart: количество, удаление, итоговая сумма, промокод, `localStorage`<br>• Страницы: NotFound и About Us<br>• README<br>• Адаптивная вёрстка |

## Организация работы

Задачи ведём на доске Jira, работаем в ветках `тип/логин/описание`, изменения вносим через Pull Request с ревью напарника.