(function () {
  const $ = window.ShopCommon.$;
  let messageEl = null;

  function applyFilters(items) {
    const category = $('filter-category').value;
    const maxPrice = Number($('filter-max-price').value || 0);
    const sortBy = $('sort-by').value;

    const filtered = items.filter(function (item) {
      const categoryOk = category ? item.category === category : true;
      const priceOk = maxPrice > 0 ? Number(item.priceCents) <= maxPrice * 100 : true;
      return categoryOk && priceOk;
    });

    filtered.sort(function (a, b) {
      if (sortBy === 'price-asc') return a.priceCents - b.priceCents;
      if (sortBy === 'price-desc') return b.priceCents - a.priceCents;
      return a.title.localeCompare(b.title);
    });

    return filtered;
  }

  function renderProducts(items) {
    const grid = $('products-grid');
    const status = $('products-status');
    grid.innerHTML = '';

    if (!items.length) {
      status.textContent = 'No products matched your filters.';
      return;
    }

    status.textContent = 'Found ' + items.length + ' products.';
    const fragment = document.createDocumentFragment();

    items.forEach(function (item) {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = '' +
        '<div><h3>' + item.title + '</h3><p class="product-meta">' + item.category + ' · ' + window.ShopCommon.formatMoney(item.priceCents, item.currency) + '</p></div>' +
        '<p class="muted">' + item.shortDescription + '</p>' +
        '<div class="product-actions">' +
        '  <a class="btn btn-secondary" href="/product.html?id=' + encodeURIComponent(item.id) + '">Details</a>' +
        '  <button class="btn btn-primary" data-add-id="' + item.id + '">Add to cart</button>' +
        '</div>';
      fragment.appendChild(card);
    });

    grid.appendChild(fragment);
  }

  function wireEvents(allProducts) {
    ['filter-category', 'filter-max-price', 'sort-by'].forEach(function (id) {
      $(id).addEventListener('change', function () {
        renderProducts(applyFilters(allProducts));
      });
    });

    $('products-grid').addEventListener('click', function (event) {
      const target = event.target;
      const id = target && target.getAttribute('data-add-id');
      if (!id) return;
      const product = allProducts.find(function (item) { return item.id === id; });
      if (!product) return;
      window.ShopCartStore.addItem(product, 1);
      window.ShopCommon.initHeaderBadge();
      window.ShopCommon.showMessage(messageEl, 'success', 'Added "' + product.title + '" to cart.');
    });
  }

  async function init() {
    messageEl = $('catalog-message');
    try {
      const data = await window.ShopCommon.apiFetch('/api/products?status=ACTIVE');
      const products = Array.isArray(data && data.items) ? data.items : [];
      renderProducts(products);
      wireEvents(products);
    } catch (error) {
      window.ShopCommon.showMessage(messageEl, 'error', 'Failed to load products: ' + error.message);
      $('products-status').textContent = 'Could not load catalog.';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.ShopCommon.initHeaderBadge();
    init();
  });
})();
