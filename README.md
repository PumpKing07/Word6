# FIBO Pasta Bar — каталог с пагинацией

Каталог пиццы по макету [Figma](https://www.figma.com/design/9LDq1M9Am2G7uhanrYwCXS/Untitled?node-id=0-1)
на **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + Drizzle ORM (SQLite) + shadcn/ui + Lucide**.

## Стек

| Часть            | Технология                                         |
| ---------------- | -------------------------------------------------- |
| Framework        | Next.js 16 (App Router, RSC, Turbopack)            |
| Язык             | TypeScript                                         |
| Стили            | Tailwind CSS 4 (CSS variables, @theme)             |
| UI-компоненты    | shadcn/ui-шаблоны (Button, Badge, Pagination)      |
| Иконки           | `lucide-react`                                     |
| База данных      | SQLite (`better-sqlite3`) + Drizzle ORM            |
| Seed-скрипт      | `tsx src/db/seed.ts`                               |

## Запуск

```bash
npm install
npm run db:push   # создаёт sqlite.db и таблицу products
npm run db:seed   # заполняет БД 32 пиццами
npm run dev       # http://localhost:3000
```

Готовая сборка:

```bash
npm run build
npm start
```

## Структура проекта

```
src/
├── app/
│   ├── layout.tsx       — корневой layout (шапка + футер)
│   ├── page.tsx         — каталог с пагинацией
│   └── globals.css      — токены цветов и Tailwind
├── components/
│   ├── site-header.tsx       — шапка FIBO + навигация
│   ├── site-footer.tsx       — футер с контактами и соцсетями
│   ├── fibo-logo.tsx         — SVG-лого
│   ├── hero-banners.tsx      — 4 промо-баннера сверху
│   ├── novelties-strip.tsx   — полоса новинок
│   ├── product-card.tsx      — карточка пиццы
│   ├── catalog-pagination.tsx — пагинация с окном в 5 кнопок
│   ├── promo-section.tsx     — блок «Наши акции»
│   ├── delivery-info.tsx     — «Оплата и доставка» + карта
│   └── ui/                   — Button, Badge, Pagination (shadcn-style)
├── db/
│   ├── schema.ts        — drizzle-схема products
│   ├── index.ts         — подключение к SQLite
│   ├── queries.ts       — getProducts(page, pageSize) + getNewProducts
│   └── seed.ts          — 32 пиццы
├── lib/
│   └── utils.ts         — cn, formatPrice, formatWeight
public/images/           — SVG-изображения товаров и баннеров
scripts/
└── generate-images.mjs  — генерация SVG пицц для БД
```

## Пагинация

- `PAGE_SIZE = 6` → 32 товара / 6 = **6 страниц** (требование «минимум 5» выполнено).
- Функция [`getProducts(page, pageSize)`](src/db/queries.ts) принимает номер страницы и
  размер страницы со значением по умолчанию, использует `limit` + `offset`, а общее
  число товаров достаёт через `select count(*)` с защитой `totalResult[0]?.count ?? 0`.
- Страница берёт `page` из `searchParams`, приводит к числу и защищается от нуля/отриц.
- Компонент [`CatalogPagination`](src/components/catalog-pagination.tsx) рассчитывает
  окно из 5 видимых кнопок вокруг текущей страницы:
  - на странице 1 → `1 2 3 4 5`
  - на странице 4 → `2 3 4 5 6`
  - на странице 6 (последней) → `2 3 4 5 6`
- Кнопки «Назад/Вперёд» дизейблятся на границах. Активная подсвечена жёлтым.

## Компоненты

Интерфейс разбит на независимые компоненты (RSC, без client-only кода кроме мелких
кнопок). Переиспользуются `Button`, `Badge`, `Pagination` из `components/ui`.
Все интерактивные элементы (ссылки, кнопки, карточки, соцсети) имеют hover-эффекты
(`transition-all`, `hover:-translate-y`, `scale`, подчёркивания и т. п.).

## Товары

- Таблица `products`: `id, name, category, description, price, weight, image,
  is_new, is_hit, is_spicy, created_at`.
- В БД хранятся только **имена файлов** картинок — сами SVG лежат в `public/images/`.
- Картинки генерируются скриптом `scripts/generate-images.mjs` (32 уникальные SVG-пиццы
  + промо-баннеры и карта доставки) — согласно подсказке задания.

## Ответы для защиты (шпаргалка)

1. **Почему App Router?** Server Components позволяют запрашивать БД прямо в компоненте
   без API-слоя, а `searchParams` приходит как проп — пагинация становится SSR.
2. **Как работает пагинация?** Страница читает `?page=`, вычисляет `offset = (page-1)*size`,
   Drizzle делает `SELECT … LIMIT :size OFFSET :offset` и отдельным запросом `COUNT(*)`.
3. **Что такое `?.` и `?? 0`?** Опциональная цепочка + nullish-coalescing: защита от
   `undefined/null` при обращении к первому элементу массива.
4. **Почему SVG а не JPG?** По заданию «имена картинок хранятся в БД, файлы в `public/`».
   SVG — легковесны, масштабируются, без внешней сети.
5. **Почему shadcn-стиль?** Компоненты копируются в `components/ui`, полностью
   контролируются проектом, стилизуются через `class-variance-authority`.
6. **Что делает `cn`?** Склеивает классы Tailwind через `clsx` + `tailwind-merge`
   (резолвит конфликты типа `p-2 p-4`).
7. **Как добавить новый товар?** Дописать объект в `src/db/seed.ts` и сохранить SVG в
   `public/images/`, затем `npm run db:seed`.
