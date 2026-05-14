(function () {
  const form = $("lead-form");
  const tbody = $("leads-tbody");
  const table = $("leads-table");
  const listStatus = $("list-status");
  const submitBtn = $("submit-btn");
  const formMessage = $("form-message");

  async function loadLeads() {
    listStatus.textContent = "Loading…";
    listStatus.className = "loading";
    table.hidden = true;
    tbody.innerHTML = "";

    try {
      const res = await fetch("/api/leads?status=NEW", { headers: { Accept: "application/json" } });
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        listStatus.textContent = "Could not load list: " + res.status;
        listStatus.className = "loading";
        return;
      }
      const leads = data && Array.isArray(data.leads) ? data.leads : [];
      listStatus.textContent = "";
      listStatus.className = "";

      if (leads.length === 0) {
        tbody.innerHTML =
          '<tr class="empty-row"><td colspan="5">No leads in NEW status (the mock returns demo data when non-empty).</td></tr>';
      } else {
        for (const lead of leads) {
          const tr = document.createElement("tr");
          tr.innerHTML =
            "<td>" +
            escapeHtml(lead.fullName || "—") +
            "</td>" +
            "<td>" +
            escapeHtml(lead.email || "—") +
            "</td>" +
            "<td>" +
            escapeHtml(lead.source || "—") +
            "</td>" +
            "<td><span class=\"status-pill\">" +
            escapeHtml(lead.status || "NEW") +
            "</span></td>" +
            '<td><a href="/lead.html?id=' +
            encodeURIComponent(lead.id) +
            '">Open</a></td>';
          tbody.appendChild(tr);
        }
      }
      table.hidden = false;
    } catch (e) {
      listStatus.textContent = "Network error while loading the list.";
      listStatus.className = "loading";
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    hideMessage(formMessage);

    const payload = {
      fullName: $("fullName").value.trim(),
      email: $("email").value.trim(),
      phone: $("phone").value.trim(),
      source: $("source").value,
      note: $("note").value.trim(),
    };

    if (!form.reportValidity()) return;

    submitBtn.disabled = true;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await parseJsonResponse(res);

      if (res.status === 201) {
        const id = data && data.id ? data.id : "";
        showMessage(
          formMessage,
          "success",
          "Lead accepted. id: " + id + ", status: " + (data && data.status ? data.status : "NEW")
        );
        form.reset();
        await loadLeads();
        return;
      }

      if (res.status === 422 && data && data.errors) {
        showMessage(formMessage, "error", "422: " + (formatFieldErrors(data.errors) || JSON.stringify(data.errors)));
        return;
      }

      showMessage(formMessage, "error", "Response " + res.status + (data ? ": " + JSON.stringify(data) : ""));
    } catch (err) {
      showMessage(formMessage, "error", "Network error while submitting the form.");
    } finally {
      submitBtn.disabled = false;
    }
  });

  document.addEventListener("DOMContentLoaded", loadLeads);
})();
