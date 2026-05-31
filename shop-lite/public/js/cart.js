(function () {
  const $ = window.ShopCommon.$;

  function renderCart() {
    const tbody = $('cart-tbody');
    const empty = $('cart-empty');
    const checkout = $('go-checkout');
    const cart = window.ShopCartStore.getCart();
    tbody.innerHTML = '';

    if (!cart.items.length) {
      empty.hidden = false;
      checkout.disabled = true;
      $('subtotal').textContent = window.ShopCommon.formatMoney(0, 'EUR');
      return;
    }

    empty.hidden = true;
    checkout.disabled = false;

    cart.items.forEach(function (item) {
      const row = document.createElement('tr');
      row.innerHTML = '' +
        '<td>' + item.title + '</td>' +
        '<td>' + window.ShopCommon.formatMoney(item.unitPriceCents, item.currency) + '</td>' +
        '<td>' +
        '  <div class="qty-controls">' +
        '    <button data-action="decrease" data-id="' + item.productId + '">-</button>' +
        '    <span>' + item.qty + '</span>' +
        '    <button data-action="increase" data-id="' + item.productId + '">+</button>' +
        '  </div>' +
        '</td>' +
        '<td>' + window.ShopCommon.formatMoney(item.unitPriceCents * item.qty, item.currency) + '</td>' +
        '<td><button class="btn btn-danger" data-action="remove" data-id="' + item.productId + '">Remove</button></td>';
      tbody.appendChild(row);
    });

    $('subtotal').textContent = window.ShopCommon.formatMoney(window.ShopCartStore.getSubtotalCents(), 'EUR');
  }

  function updateQty(productId, delta) {
    const cart = window.ShopCartStore.getCart();
    const item = cart.items.find(function (it) { return it.productId === productId; });
    if (!item) return;
    window.ShopCartStore.setQty(productId, item.qty + delta);
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.ShopCommon.initHeaderBadge();
    renderCart();

    $('cart-tbody').addEventListener('click', function (event) {
      const target = event.target;
      const action = target.getAttribute('data-action');
      const id = target.getAttribute('data-id');
      if (!action || !id) return;

      if (action === 'increase') updateQty(id, 1);
      if (action === 'decrease') updateQty(id, -1);
      if (action === 'remove') window.ShopCartStore.removeItem(id);

      window.ShopCommon.initHeaderBadge();
      renderCart();
    });

    $('clear-cart').addEventListener('click', function () {
      window.ShopCartStore.clearCart();
      window.ShopCommon.initHeaderBadge();
      renderCart();
    });
  });
})();
