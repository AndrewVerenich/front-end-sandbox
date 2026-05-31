(function () {
  function $(id) {
    return document.getElementById(id);
  }

  function formatMoney(cents, currency) {
    const amount = Number(cents || 0) / 100;
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency || 'EUR'
    }).format(amount);
  }

  async function parseJsonResponse(res) {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (_e) {
      return { _raw: text };
    }
  }

  async function apiFetch(url, options) {
    const res = await fetch(url, options || {});
    const data = await parseJsonResponse(res);
    if (!res.ok) {
      const err = new Error((data && (data.message || data.error)) || 'Request failed');
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  function showMessage(el, type, text) {
    if (!el) return;
    el.className = 'message visible ' + type;
    el.textContent = text;
  }

  function hideMessage(el) {
    if (!el) return;
    el.className = 'message';
    el.textContent = '';
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function initHeaderBadge() {
    const badge = $('cart-badge');
    if (!badge || !window.ShopCartStore) return;
    badge.textContent = String(window.ShopCartStore.getItemCount());
  }

  window.ShopCommon = {
    $: $,
    formatMoney: formatMoney,
    apiFetch: apiFetch,
    showMessage: showMessage,
    hideMessage: hideMessage,
    getQueryParam: getQueryParam,
    initHeaderBadge: initHeaderBadge
  };
})();
