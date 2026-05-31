# Leads Desk

МинимальныЙ inbound CRM (лиды): интерфейс на **простом HTML, CSS и JavaScript** без 
сборщиков, фреймворков и npm. Статические файлы отдаёт **nginx**, REST-ответы имитирует **WireMock**; подъём окружения — **Docker Compose**.

---

## Стек

| Слой | Технологии и роль |
|------|-------------------|
| **UI** | HTML5 (семантика: `header`, `section`, форма, таблица, `dl` на карточке), CSS3 (переменные в `:root`, Grid, Flexbox, медиазапросы), vanilla ES5-совместимый JS без модулей (`fetch`, `DOMContentLoaded`, `URLSearchParams`). |
| **Стили и скрипты** | Один файл стилей [`public/css/styles.css`](public/css/styles.css); общие хелперы [`public/js/common.js`](public/js/common.js), логика главной [`public/js/index.js`](public/js/index.js), карточки лида [`public/js/lead.js`](public/js/lead.js). |
| **Edge** | **nginx** (образ `nginx:alpine`): `root` → `public/`, единая точка входа на порту 8080. |
| **Прокси API** | `location /api/` → upstream **WireMock** (`wiremock/wiremock:3.x`): браузер бьёт в тот же origin, CORS для демо не нужен. |
| **Моки** | JSON-маппинги в [`wiremock/mappings/`](wiremock/mappings/), том `./wiremock` → `/home/wiremock` в контейнере. |
| **Оркестрация** | [`docker-compose.yml`](docker-compose.yml): сервисы `nginx` и `wiremock`, сеть `leads-desk-net`, смонтированные конфиг и статика. |

---

## Реализация

**Поток трафика.** Запросы к `http://localhost:8080/` обрабатывает nginx: пути без префикса `/api/` отдаются как файлы из `public/` (`index.html`, `lead.html`, `css/*`, `js/*`). Запросы к `/api/...` проксируются на WireMock с сохранением URI (`proxy_pass` на хост `wiremock`), чтобы пути в маппингах совпадали с тем, что вызывает фронт.

**Главная (`index.html`).** Форма с `novalidate` и проверкой через `form.reportValidity()` в JS; отправка `POST /api/leads` с `Content-Type: application/json`. Ответы успеха и ошибки выводятся в блок с `role="status"` и `aria-live="polite"`. Список лидов: `GET /api/leads?status=NEW`, строки таблицы собираются в DOM из JSON.

**Карточка (`lead.html`).** Параметр `?id=` читается из URL; `GET /api/leads/{id}` заполняет пары `dt`/`dd` в `.detail-grid`. Кнопка «Mark as contacted» шлёт `PATCH` с телом `{"status":"CONTACTED"}`.

**Стили.** Тёмная тема через CSS variables; сетка формы — `display: grid` и два столбца от breakpoint `560px`; карточка лида — grid с двумя колонками от `480px`. Кнопки — `inline-flex` и модификаторы `.btn-primary` / `.btn-secondary`.

**WireMock.** Отдельные стабы для списка, двух демо-лидов, `POST` 201, условного `POST` 422 (подстрока `reject-me@` в теле), catch-all `GET` → 404, `PATCH` для `lead-101` и `lead-102`. У стабов заданы **числовые приоритеты**: более узкие правила выше общего `GET` с шаблоном пути, иначе детали перехватываются ответом 404.

---

## Ограничения демо

- Ответы WireMock **статические**: после успешного `POST` список из `GET` **не меняется** (в ответе 201 приходит id `lead-created-demo`; отдельный `GET` по этому id даст 404). Это осознанный trade-off без хранилища состояния в моке.
- **422**: в JSON-теле `POST` в поле email должна встречаться подстрока **`reject-me@`** — отдельный стаб с более высоким приоритетом, чем успешный `POST`.

---

## Запуск

**Требования:** Docker с поддержкой Compose v2.

```bash
cd leads-desk
docker compose up
```

В браузере: **http://localhost:8080/**

- Статика: `/`, `/lead.html`, `/css/*`, `/js/*`
- API через тот же хост: `/api/leads`, `/api/leads/{id}`

Остановка: `Ctrl+C` или `docker compose down` в каталоге проекта.

---

## Контракт API (мок)

| Метод | Путь | Поведение |
|--------|------|------------|
| GET | `/api/leads?status=NEW` | Фиксированный список из двух лидов |
| POST | `/api/leads` | `201` + тело с `id`; если в теле есть `reject-me@` в email → `422` + `errors` |
| GET | `/api/leads/lead-101`, `/api/leads/lead-102` | `200`, деталь |
| GET | `/api/leads/{другой id}` | `404` |
| PATCH | `/api/leads/lead-101`, `/api/leads/lead-102` | `200`, статус `CONTACTED` |


