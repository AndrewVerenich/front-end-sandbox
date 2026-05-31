# Shop Lite

Каталог и корзина на чистом HTML/CSS/JavaScript,
API-ответы через WireMock, раздача статики и прокси через nginx, запуск через Docker Compose.

## Стек

| Слой        | Технологии и роль                                                        |
|-------------|--------------------------------------------------------------------------|
| UI          | HTML5 + CSS3 + vanilla JS (без npm, без сборщиков, без фреймворков).     |
| Edge        | nginx (`nginx:alpine`) отдаёт `public/` и проксирует `/api/` в WireMock. |
| Mock API    | WireMock (`wiremock/wiremock:3.9.2`) со статическими JSON-мэппингами.    |
| Оркестрация | Docker Compose с двумя сервисами и внутренней сетью.                     |

## Реализация

- `index.html`: каталог товаров, клиентские фильтры и сортировка, добавление в корзину.
- `product.html`: детальная карточка товара по `?id=`.
- `cart.html`: управление количеством, удаление позиций, пересчёт subtotal.
- `checkout.html`: форма оформления и `POST /api/orders`.
- `order.html`: подтверждение заказа через `GET /api/orders/{id}`.
- Хранилище корзины: `sessionStorage` (`public/js/cart-store.js`).

## Ограничения демо

- WireMock-ответы статические: `POST /api/orders` возвращает `order-5001`, но не сохраняет произвольные новые заказы.
- Ошибка `422` намеренно триггерится, если email в checkout содержит `out-of-stock@`.
- Детальные `GET` доступны только для предопределённых id (`prod-101`, `prod-102`, `order-5001`).

## Запуск

```bash
cd shop-lite
docker compose up
```

Откройте: `http://localhost:8081/`

Остановка:

```bash
docker compose down
```

## Контракт API (мок)

| Метод | Путь                                               | Поведение                                                     |
|-------|----------------------------------------------------|---------------------------------------------------------------|
| GET   | `/api/products?status=ACTIVE`                      | Возвращает фиксированный список товаров                       |
| GET   | `/api/products/prod-101`, `/api/products/prod-102` | Возвращает детали товара                                      |
| GET   | `/api/products/{другой id}`                        | `404`                                                         |
| POST  | `/api/orders`                                      | `201` + `id=order-5001`, при `out-of-stock@` в email -> `422` |
| GET   | `/api/orders/order-5001`                           | Возвращает демо-заказ                                         |
| GET   | `/api/orders/{другой id}`                          | `404`                                                         |
| PATCH | `/api/orders/order-5001`                           | Возвращает статус `CONFIRMED`                                 |

