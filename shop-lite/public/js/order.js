(function () {
  const $ = window.ShopCommon.$;

  function renderOrder(order) {
    $('order-id').textContent = order.id;
    $('order-status').textContent = order.status;
    $('order-customer').textContent = order.customer.fullName + ' (' + order.customer.email + ')';
    $('order-total').textContent = window.ShopCommon.formatMoney(order.totalCents, order.currency);

    const items = $('order-items');
    items.innerHTML = '';
    order.items.forEach(function (item) {
      const li = document.createElement('li');
      li.textContent = item.title + ' x' + item.qty + ' - ' + window.ShopCommon.formatMoney(item.lineTotalCents, order.currency);
      items.appendChild(li);
    });
  }

  async function init() {
    const messageEl = $('order-message');
    const id = window.ShopCommon.getQueryParam('id');
    if (!id) {
      window.ShopCommon.showMessage(messageEl, 'error', 'Order id is missing in URL.');
      return;
    }

    try {
      const order = await window.ShopCommon.apiFetch('/api/orders/' + encodeURIComponent(id));
      renderOrder(order);
    } catch (error) {
      window.ShopCommon.showMessage(messageEl, 'error', 'Order load failed: ' + error.message);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.ShopCommon.initHeaderBadge();
    init();
  });
})();
