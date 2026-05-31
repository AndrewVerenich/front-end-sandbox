(function () {
  const $ = window.ShopCommon.$;

  function renderSummary() {
    const cart = window.ShopCartStore.getCart();
    const list = $('summary-items');
    list.innerHTML = '';

    cart.items.forEach(function (item) {
      const li = document.createElement('li');
      li.textContent = item.title + ' x' + item.qty + ' - ' + window.ShopCommon.formatMoney(item.qty * item.unitPriceCents, item.currency);
      list.appendChild(li);
    });

    $('summary-total').textContent = window.ShopCommon.formatMoney(window.ShopCartStore.getSubtotalCents(), 'EUR');
  }

  function buildPayload() {
    const cart = window.ShopCartStore.getCart();
    return {
      customer: {
        fullName: $('fullName').value.trim(),
        email: $('email').value.trim(),
        address: $('address').value.trim(),
        comment: $('comment').value.trim()
      },
      items: cart.items.map(function (item) {
        return {
          productId: item.productId,
          qty: item.qty,
          unitPriceCents: item.unitPriceCents
        };
      })
    };
  }

  async function submitOrder(event) {
    event.preventDefault();
    const form = $('checkout-form');
    const messageEl = $('checkout-message');
    window.ShopCommon.hideMessage(messageEl);

    if (!form.reportValidity()) return;

    try {
      const payload = buildPayload();
      const data = await window.ShopCommon.apiFetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      window.ShopCartStore.clearCart();
      window.location.href = '/order.html?id=' + encodeURIComponent(data.id);
    } catch (error) {
      const details = error.data && error.data.errors ? JSON.stringify(error.data.errors) : '';
      window.ShopCommon.showMessage(messageEl, 'error', 'Order failed: ' + error.message + (details ? ' ' + details : ''));
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.ShopCommon.initHeaderBadge();
    const cart = window.ShopCartStore.getCart();
    if (!cart.items.length) {
      window.location.href = '/cart.html';
      return;
    }

    renderSummary();
    $('checkout-form').addEventListener('submit', submitOrder);
  });
})();
