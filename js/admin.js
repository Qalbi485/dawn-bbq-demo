/* Dawn — admin WhatsApp simulation */
(function () {
  const R = RESTAURANT;
  const C = R.currency;
  const $ = s => document.querySelector(s);
  const fmt = n => n.toLocaleString("en-PK");

  const chat = $("#chat");
  const btn = $("#approveBtn");
  let order = null;
  let approved = false;

  function loadOrder() {
    try {
      const raw = localStorage.getItem("dawn_order");
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return {
      id: "1024",
      items: [
        { name: "Chicken Chargha", qty: 1, price: 2200 },
        { name: "Chicken Malai Boti", qty: 2, price: 700 },
        { name: "Mint Margarita", qty: 2, price: 250 },
      ],
      subtotal: 3600, fee: 0, total: 3600,
      type: "delivery", name: "Ali Khan", phone: "0300 1234567",
      address: "House 12, Street 5, Gulberg III, Lahore", note: "Kam mirch"
    };
  }

  function timeNow() {
    return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }

  function adminMsg(o) {
    const lines = o.items.map(i => i.qty + "x " + i.name + "  (" + C + " " + fmt(i.price * i.qty) + ")").join("\n");
    return (
      "*NEW ORDER — " + R.name + "*\n" +
      "Order #" + o.id + "\n" +
      "────────────\n" +
      lines + "\n" +
      "────────────\n" +
      (o.type === "pickup" ? "Type: Pickup\n" : "Type: Delivery\n") +
      "Total: *" + C + " " + fmt(o.total) + "* (COD)\n" +
      "Name: " + o.name + "\n" +
      "Phone: " + o.phone + "\n" +
      (o.type === "delivery" ? "Address: " + o.address + "\n" : "") +
      (o.note ? "Note: " + o.note + "\n" : "") +
      "Payment: Cash on Delivery"
    );
  }

  function riderMsg(o) {
    const short = o.items.map(i => i.qty + "x " + i.name).join(", ");
    return (
      "*RIDER ORDER — " + R.name + " #" + o.id + "*\n" +
      "Items: " + short + "\n" +
      "Collect: *" + C + " " + fmt(o.total) + "* (COD)\n" +
      "Customer: " + o.name + " — " + o.phone + "\n" +
      (o.type === "delivery" ? "Address: " + o.address : "Type: Pickup") + "\n" +
      "Delivery par cash collect karein."
    );
  }

  function bubble(text, out) {
    const d = document.createElement("div");
    d.className = "bubble" + (out ? " out" : "");
    d.textContent = text;
    const m = document.createElement("span");
    m.className = "meta";
    m.textContent = timeNow();
    d.appendChild(m);
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
    return d;
  }

  function riderWaUrl(o) {
    const msg = riderMsg(o);
    return "https://wa.me/" + R.riderPhone + "?text=" + encodeURIComponent(msg);
  }

  function init() {
    order = loadOrder();
    chat.innerHTML = '<div class="chat-date">Aaj</div>';
    approved = false;
    btn.disabled = false;
    btn.textContent = "✓ Approve — Rider ko bhejein";
    bubble(adminMsg(order), false);
  }

  btn.onclick = function () {
    if (!order) return;
    if (!approved) {
      approved = true;
      bubble("Approved ✓", true);
      setTimeout(() => {
        bubble(riderMsg(order), true);
        btn.innerHTML = "🛵 WhatsApp pe Rider ko bhejein";
        $("#approveNote").textContent =
          "Rider ka message ready hai. Real system: aapke WhatsApp me ye message khud ban jayega — aap sirf Rider ke chat me jaake Send dabayenge. Demo me neeche button dabakar dekh lein.";
        btn.onclick = function () {
          window.open(riderWaUrl(order), "_blank");
        };
      }, 450);
    }
  };

  init();
})();
