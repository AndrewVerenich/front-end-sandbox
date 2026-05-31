# Front-end Sandbox

**Портфолио фронтенд-проектов**: небольшие законченные демо с явным стеком, окружением и README по 
каждому подпроекту. Фокус — осмысленные границы задачи, читаемая архитектура и воспроизводимый локальный запуск.

Цель репозитория: накопить витрину навыков по front-end для fullstack engineer.

---

## 📂 Проекты

### 1. [leads-desk](leads-desk/README.md)

Минимальный **inbound lead desk** (домен «лиды»): форма, таблица входящих, карточка лида, немного `fetch` для JSON.
Статика за **nginx**, контрактное API на **WireMock**, подъём окружения **Docker Compose**. Демонстрирует same-origin 
доступ к `/api` через reverse proxy.

**Стек:** HTML5, CSS3, JavaScript, nginx, WireMock, Docker Compose.

**Запуск:**
```bash
cd leads-desk
docker compose up
# http://localhost:8080/

```
---

### 2. [shop-lite](shop-lite/README.md)

Минимальный **e-commerce flow**: каталог товаров, карточка товара, корзина, checkout и экран подтверждения заказа.
Фронтенд полностью на **vanilla JS** (без npm и сборщиков), состояние корзины хранится в `sessionStorage`.
Статика отдается через **nginx**, API-контракт эмулируется через **WireMock**, запуск — через **Docker Compose**.

**Стек:** HTML5, CSS3, JavaScript, nginx, WireMock, Docker Compose.

**Запуск:**
```bash
cd shop-lite
docker compose up
# http://localhost:8081/
```
---

