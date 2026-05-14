# Leads Desk

Минимальный **inbound lead intake**: статический UI (HTML/CSS/vanilla JS), **nginx** как reverse proxy и **WireMock** как контрактное API для локального демо без реального бэкенда.

Каждый компонент можно заменить на прод-аналог: статика на CDN или bucket, nginx/Ingress перед сервисом, WireMock — на Spring Boot / Kotlin-сервис с теми же путями и JSON.

---

## Описание

Сценарий для портфолио **backend-heavy fullstack**: браузер обращается к одному origin (`http://localhost:8080`), nginx отдаёт статические страницы и проксирует префикс `/api/` на WireMock. Так устраняются типичные проблемы CORS на этапе обучения и демонстрируется тот же паттерн, что и за API-gateway в проде.

**Страницы**

- Главная: форма создания лида (JSON `POST /api/leads`), таблица входящих (`GET /api/leads?status=NEW`).
- Карточка: `lead.html?id=…` — `GET /api/leads/{id}`, кнопка «Взять в работу» — `PATCH /api/leads/{id}` с телом `{"status":"CONTACTED"}`.

**Ограничения демо (честно)**

- Ответы WireMock **статические**: после успешного `POST` список из `GET` **не меняется** (новый id в ответе 201 — `lead-created-demo`, деталь по нему вернёт 404). Это осознанный trade-off без state store; в README зафиксировано для ревьюеров.
- Для демонстрации **422** в теле запроса должен встречаться подстрока **`reject-me@`** в поле email (отдельный стаб WireMock с более «жёстким» приоритетом, чем успешный `POST`).
- У стабов **разные приоритеты**: catch-all `GET` для 404 не должен перехватывать `GET /api/leads/lead-101|102` — в репозитории это решено числовыми приоритетами в JSON-маппингах.

---

## Ключевые возможности

- ✅ Чистый **HTML5** / **CSS3** (без фреймворков), чуть **JavaScript** (`fetch`, разбор JSON, DOM).
- ✅ **Форма** с клиентской валидацией и серверной ошибкой **422** от мока.
- ✅ **Таблица лидов** и переход в **карточку** по ссылке.
- ✅ **PATCH** для смены статуса на демо-карточках `lead-101` / `lead-102`.
- ✅ **nginx** раздаёт `/`, проксирует `/api/` → WireMock, один порт наружу.
- ✅ **Docker Compose**: `nginx:alpine` + `wiremock/wiremock:3.x`.
- ✅ Маппинги WireMock в репозитории (`wiremock/mappings/`), воспроизводимый контракт API.

---

## Стек

| Слой        | Технологии                                      |
|------------|--------------------------------------------------|
| UI         | HTML5, CSS3, vanilla JavaScript (`fetch`)      |
| Edge       | nginx (Alpine), reverse proxy                  |
| API (mock) | WireMock 3.x (JSON mappings)                   |
| Контейнеры | Docker Compose                                 |

---

## Запуск

**Требования:** Docker с поддержкой Compose v2.

```bash
cd leads-desk
docker compose up
```

Откройте в браузере: **http://localhost:8080/**

- Статика: `/`, `/lead.html`, `/css/*`, `/js/*`
- API (через тот же хост): `/api/leads`, `/api/leads/{id}`

Остановка: `Ctrl+C` или `docker compose down` в каталоге проекта.

---

## Контракт API (кратко)

| Метод | Путь | Поведение мока |
|--------|------|----------------|
| GET | `/api/leads?status=NEW` | Фиксированный список из двух лидов |
| POST | `/api/leads` | `201` + тело с `id`; если email содержит `reject-me@` → `422` + `errors` |
| GET | `/api/leads/lead-101`, `/api/leads/lead-102` | `200`, деталь |
| GET | `/api/leads/{другой id}` | `404` |
| PATCH | `/api/leads/lead-101`, `/api/leads/lead-102` | `200`, статус `CONTACTED` |

---

## Структура каталога

```
leads-desk/
  docker-compose.yml
  nginx/default.conf
  public/           # document root nginx
  wiremock/mappings/
  README.md
```

---

## Зачем это в портфолио

Показывает понимание **границы фронт/бэк**: контракт REST JSON, коды ответов, разделение статики и API за reverse proxy, воспроизводимый локальный стенд. Для senior backend-инженера, расширяющего fullstack-компетенции, это читаемый минимальный шаг перед React и реальным сервисом.
