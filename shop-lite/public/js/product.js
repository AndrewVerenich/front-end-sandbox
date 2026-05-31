(function () {
  const $ = window.ShopCommon.$;

  function renderProduct(product) {
    $('product-title').textContent = product.title;
    $('product-meta').textContent = product.category + ' · ' + window.ShopCommon.formatMoney(product.priceCents, product.currency);
    $('product-description').textContent = product.description;
    $('product-stock').textContent = 'In stock: ' + product.stock;
    $('add-to-cart').disabled = false;
    $('add-to-cart').setAttribute('data-product-id', product.id);
  }

  async function init() {
    const messageEl = $('product-message');
    const productId = window.ShopCommon.getQueryParam('id');
    if (!productId) {
      window.ShopCommon.showMessage(messageEl, 'error', 'Product id is missing in URL.');
      return;
    }

    try {
      const product = await window.ShopCommon.apiFetch('/api/products/' + encodeURIComponent(productId));
      renderProduct(product);
      $('add-to-cart').addEventListener('click', function () {
        let qty = Number($('quantity').value || 1);
        if (qty < 1) qty = 1;
        window.ShopCartStore.addItem(product, qty);
        window.ShopCommon.initHeaderBadge();
        window.ShopCommon.showMessage(messageEl, 'success', 'Added to cart.');
      });
    } catch (error) {
      window.ShopCommon.showMessage(messageEl, 'error', 'Unable to load product: ' + error.message);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.ShopCommon.initHeaderBadge();
    init();
  });
})();
