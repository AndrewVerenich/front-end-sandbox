# Front-end Sandbox

Витрина **fullstack-навыков**: небольшие законченные демо с явным стеком, контрактом API и воспроизводимым локальным запуском через Docker.


---

## Проекты

### 1. [leads-desk](leads-desk/README.md) — HTML + CSS, минимальный JS

**Домен:** inbound CRM — приём лидов, inbox, карточка лида.

**Акцент:** разметка и стили. JavaScript только там, где без него не обойтись — отправка формы, загрузка списка, переход на карточку.

| Навык | Что в проекте |
|-------|---------------|
| HTML5 | Семантика (`header`, `section`, форма, таблица, `dl`), a11y (`aria-live`, labels) |
| CSS3 | CSS variables, Grid, Flexbox, медиазапросы, тёмная тема |
| JS (минимум) | `fetch`, `DOMContentLoaded`, сборка строк таблицы, обработка 201/422 |
| Infra | nginx reverse proxy, WireMock stubs, Docker Compose |

**Запуск:** `cd leads-desk && docker compose up` → http://localhost:8080/

---

### 2. [shop-lite](shop-lite/README.md) — HTML/CSS + vanilla JS

**Домен:** e-commerce — каталог, корзина, checkout, подтверждение заказа.

**Акцент:** клиентская логика. Тот же infra-паттерн, но JS уже несёт основную нагрузку — состояние, фильтры, flow из нескольких страниц.

| Навык | Что в проекте |
|-------|---------------|
| HTML/CSS | Те же принципы разметки + отдельный визуальный стиль (не копия leads-desk) |
| Client state | `cart-store.js` — корзина в `sessionStorage`, пересчёт subtotal в cents |
| JS modules (IIFE) | Изоляция через IIFE, публичный API через `window.ShopCartStore` / `window.ShopCommon` |
| DOM & events | Фильтрация/сортировка каталога, qty controls, form validation, error handling |
| API flow | `GET` каталог → `POST` заказ → `GET` confirmation |
| Infra | nginx + WireMock + Docker Compose (порт 8081) |

**Запуск:** `cd shop-lite && docker compose up` → http://localhost:8081/

---

### 3. [book-slot](book-slot/README.md) — React + TypeScript + Tailwind

**Домен:** запись к специалисту — услуга → мастер → слот → подтверждение.

**Акцент:** React-проект в портфолио. Тот же паттерн nginx + WireMock + Compose, но UI на React с роутингом, хуками и формами.

| Навык | Что в проекте |
|-------|---------------|
| React | components, `useState`, `useEffect`, custom `useFetch` |
| TypeScript | typed DTO, props |
| Routing | react-router-dom — multi-step flow |
| Forms | client validation + server `422` / `409` errors |
| Tailwind | layout, responsive slot grid |
| Infra | multi-stage Docker build, nginx SPA fallback, WireMock (порт 8082) |

**Запуск:** `cd book-slot && docker compose up --build` → http://localhost:8082/

---
