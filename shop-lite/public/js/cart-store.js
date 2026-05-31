(function () {
  const STORAGE_KEY = 'shop-lite-cart-v1';

  function loadCart() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return { items: [] };
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
      return parsed;
    } catch (_e) {
      return { items: [] };
    }
  }

  function saveCart(cart) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function getCart() {
    return loadCart();
  }

  function setQty(productId, qty) {
    const cart = loadCart();
    const index = cart.items.findIndex(function (item) { return item.productId === productId; });
    if (qty <= 0) {
      if (index >= 0) cart.items.splice(index, 1);
      saveCart(cart);
      return;
    }
    if (index >= 0) {
      cart.items[index].qty = qty;
    }
    saveCart(cart);
  }

  function addItem(product, qty) {
    const addQty = Number(qty || 1);
    if (addQty <= 0) return;
    const cart = loadCart();
    const existing = cart.items.find(function (item) { return item.productId === product.id; });
    if (existing) {
      existing.qty += addQty;
    } else {
      cart.items.push({
        productId: product.id,
        title: product.title,
        currency: product.currency || 'EUR',
        unitPriceCents: Number(product.priceCents || 0),
        qty: addQty
      });
    }
    saveCart(cart);
  }

  function removeItem(productId) {
    setQty(productId, 0);
  }

  function clearCart() {
    saveCart({ items: [] });
  }

  function getItemCount() {
    const cart = loadCart();
    return cart.items.reduce(function (sum, item) {
      return sum + Number(item.qty || 0);
    }, 0);
  }

  function getSubtotalCents() {
    const cart = loadCart();
    return cart.items.reduce(function (sum, item) {
      return sum + Number(item.unitPriceCents || 0) * Number(item.qty || 0);
    }, 0);
  }

  window.ShopCartStore = {
    getCart: getCart,
    setQty: setQty,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
    getItemCount: getItemCount,
    getSubtotalCents: getSubtotalCents
  };
})();
