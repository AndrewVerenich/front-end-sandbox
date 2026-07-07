# Book Slot

Запись к специалисту (барбершоп) на **React + TypeScript + Tailwind**.
API-ответы через WireMock, сборка и раздача SPA через nginx, запуск через Docker Compose.

## Стек

| Слой        | Технологии и роль                                                        |
|-------------|--------------------------------------------------------------------------|
| UI          | React 19 + TypeScript + Tailwind CSS + react-router-dom.                 |
| Сборка      | Vite — dev-сервер и production-бандл в `dist/`.                          |
| Edge        | nginx (`nginx:alpine`) отдаёт SPA и проксирует `/api/` в WireMock.     |
| Mock API    | WireMock (`wiremock/wiremock:3.9.2`) со статическими JSON-мэппингами.    |
| Оркестрация | Docker Compose: multi-stage build приложения + WireMock, порт **8082**.  |

## Реализация

- `/` — список услуг (`GET /api/services`).
- `/services/:serviceId` — специалисты по услуге (`GET /api/services/{id}/specialists`).
- `/specialists/:specialistId` — выбор даты и слота, форма гостя (`GET /api/specialists/{id}`, `GET /api/specialists/{id}/slots?date=`).
- `/appointments/:id` — подтверждение брони (`GET /api/appointments/{id}`).
- Хук [`src/useFetch.ts`](src/useFetch.ts) — загрузка данных; [`src/api.ts`](src/api.ts) — `POST /api/appointments` с разбором `422` / `409`.
- Компоненты [`SlotPicker.tsx`](src/SlotPicker.tsx) и [`BookingForm.tsx`](src/BookingForm.tsx) — выбор слота и валидация формы.

## Ограничения демо

- WireMock-ответы **статические**: `POST /api/appointments` всегда возвращает `appt-9001`, список слотов после брони **не меняется**.
- Ошибка **`422`** триггерится, если email содержит `invalid@` — в ответе приходит `errors` по полям.
- Ошибка **`409`** триггерится, если email содержит `slot-taken@` — слот «занят».
- Часть слотов в сетке заранее помечена как недоступная (`available: false`).

## Запуск

```bash
cd book-slot
docker compose up --build
```

Откройте: `http://localhost:8082/`

Остановка:

```bash
docker compose down
```

### Локальная разработка (опционально)

Терминал 1 — только WireMock:

```bash
docker compose up wiremock
```

Терминал 2 — Vite (проксирует `/api` на порт 8080):

```bash
npm install
npm run dev
```

## Тесты

```bash
npm test
```

Vitest + React Testing Library: `SlotPicker`, `BookingForm`.

## Контракт API (мок)

| Метод | Путь | Поведение |
|-------|------|-----------|
| GET | `/api/services` | Фиксированный список услуг |
| GET | `/api/services/{id}/specialists` | Специалисты для услуги (`svc-101`, `svc-102`, `svc-103`) |
| GET | `/api/specialists/spec-201`, `spec-202`, `spec-203` | Карточка специалиста |
| GET | `/api/specialists/{id}/slots?date=YYYY-MM-DD` | Слоты на день (время + `available`) |
| POST | `/api/appointments` | `201` + `id=appt-9001`; при `invalid@` в email → `422`; при `slot-taken@` → `409` |
| GET | `/api/appointments/appt-9001` | Подтверждение брони |
