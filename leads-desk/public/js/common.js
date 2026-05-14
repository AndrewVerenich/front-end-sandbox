function $(id) {
  return document.getElementById(id);
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

async function parseJsonResponse(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { _raw: text };
  }
}

function formatFieldErrors(errors) {
  if (!errors || typeof errors !== "object") return "";
  return Object.entries(errors)
    .map(([field, msgs]) => {
      const list = Array.isArray(msgs) ? msgs.join(", ") : String(msgs);
      return `${field}: ${list}`;
    })
    .join(" · ");
}

function showMessage(el, type, text) {
  if (!el) return;
  el.className = "message visible " + type;
  el.textContent = text;
}

function hideMessage(el) {
  if (!el) return;
  el.className = "message";
  el.textContent = "";
}
