(function () {
  const params = new URLSearchParams(window.location.search);
  const leadId = params.get("id");

  const loadStatus = $("load-status");
  const panel = $("detail-panel");
  const fields = $("detail-fields");
  const detailStatus = $("detail-status");
  const detailMessage = $("detail-message");
  const refreshBtn = $("refresh-btn");
  const contactBtn = $("contact-btn");

  const EMPTY = "—";

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderLead(lead) {
    fields.innerHTML = "";
    const rows = [
      ["ID", lead.id],
      ["Full name", lead.fullName],
      ["Email", lead.email],
      ["Phone", lead.phone || EMPTY],
      ["Source", lead.source],
      ["Created", formatDate(lead.createdAt)],
      ["Updated", formatDate(lead.updatedAt)],
      ["Note", lead.note || EMPTY],
    ];
    for (const [label, value] of rows) {
      const dt = document.createElement("dt");
      dt.textContent = label;
      const dd = document.createElement("dd");
      dd.innerHTML =
        label === "Email" && value && value !== EMPTY
          ? '<a href="mailto:' + escapeHtml(value) + '">' + escapeHtml(value) + "</a>"
          : escapeHtml(value == null ? EMPTY : String(value));
      fields.appendChild(dt);
      fields.appendChild(dd);
    }

    detailStatus.textContent = lead.status || "NEW";
    detailStatus.className = "status-pill" + (lead.status === "CONTACTED" ? " contacted" : "");
    contactBtn.disabled = lead.status === "CONTACTED";
  }

  async function loadDetail() {
    hideMessage(detailMessage);
    if (!leadId) {
      loadStatus.textContent = "Missing id in the URL. Example: /lead.html?id=lead-101";
      panel.hidden = true;
      return;
    }

    loadStatus.textContent = "Loading…";
    loadStatus.className = "loading";
    panel.hidden = true;

    try {
      const res = await fetch("/api/leads/" + encodeURIComponent(leadId), {
        headers: { Accept: "application/json" },
      });
      const data = await parseJsonResponse(res);

      if (res.status === 404) {
        loadStatus.textContent = "Lead not found (404). Try lead-101 or lead-102 from the demo inbox.";
        return;
      }

      if (!res.ok) {
        loadStatus.textContent = "Load error: " + res.status;
        return;
      }

      loadStatus.textContent = "";
      loadStatus.className = "";
      panel.hidden = false;
      renderLead(data);
    } catch (e) {
      loadStatus.textContent = "Network error while loading the lead.";
    }
  }

  async function patchContacted() {
    hideMessage(detailMessage);
    contactBtn.disabled = true;
    try {
      const res = await fetch("/api/leads/" + encodeURIComponent(leadId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ status: "CONTACTED" }),
      });
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        showMessage(
          detailMessage,
          "error",
          "PATCH failed: " + res.status + (data ? " " + JSON.stringify(data) : "")
        );
        contactBtn.disabled = false;
        return;
      }
      showMessage(detailMessage, "success", "Status updated (mock).");
      renderLead(data);
    } catch (e) {
      showMessage(detailMessage, "error", "Network error during PATCH.");
      contactBtn.disabled = false;
    }
  }

  refreshBtn.addEventListener("click", loadDetail);
  contactBtn.addEventListener("click", patchContacted);

  document.addEventListener("DOMContentLoaded", loadDetail);
})();
