/* Dawn — customer app */
(function () {
  const R = RESTAURANT;
  const C = R.currency;
  const cart = {}; // id -> qty
  let orderType = "delivery";
  let lastOrder = null;

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const fmt = n => n.toLocaleString("en-PK");

  document.getElementById("rName").textContent = R.name;
  document.getElementById("rTag").textContent = R.tagline;

  const ALL = {};
  R.categories.forEach(c => c.items.forEach(i => (ALL[i.id] = i)));

  /* ---------- Menu render ---------- */
  const chips = $("#chips");
  R.categories.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "chip" + (i === 0 ? " active" : "");
    b.textContent = c.name;
    b.dataset.cat = c.id;
    b.type = "button";
    chips.appendChild(b);
  });
  chips.addEventListener("click", e => {
    const b = e.target.closest(".chip");
    if (!b) return;
    $$(".chip").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    const el = document.getElementById("cat-" + b.dataset.cat);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const menuList = $("#menuList");
  R.categories.forEach(c => {
    const h = document.createElement("h2");
    h.className = "cat-title";
    h.id = "cat-" + c.id;
    h.textContent = c.name;
    menuList.appendChild(h);
    c.items.forEach(it => {
      const d = document.createElement("div");
      d.className = "item";
      d.dataset.id = it.id;
      const priceHtml = it.priceMax
        ? C + " " + fmt(it.price) + " – " + fmt(it.priceMax)
        : C + " " + fmt(it.price);
      d.innerHTML =
        '<div class="item-img"><img src="' + it.img + '" alt="" loading="lazy" /></div>' +
        '<div class="item-body"><h3>' + it.name + "</h3><p>" + it.desc + "</p>" +
        (it.tag ? '<span class="item-tag">' + it.tag + "</span>" : "") +
        '</div><div class="item-side"><div class="item-price">' + priceHtml + "</div>" +
        '<button class="add-btn" type="button" aria-label="Add">+</button></div>';
      menuList.appendChild(d);
    });
  });

  menuList.addEventListener("click", e => {
    const row = e.target.closest(".item");
    if (!row) return;
    const id = row.dataset.id;
    if (e.target.closest(".add-btn")) { add(id); return; }
    if (e.target.closest(".qty-inc")) { add(id); return; }
    if (e.target.closest(".qty-dec")) { dec(id); }
  });

  function add(id) { cart[id] = (cart[id] || 0) + 1; sync(); }
  function dec(id) {
    cart[id] = (cart[id] || 0) - 1;
    if (cart[id] <= 0) delete cart[id];
    sync();
  }

  function items() { return Object.keys(cart).map(id => ({ ...ALL[id], qty: cart[id] })); }
  function count() { return Object.values(cart).reduce((a, b) => a + b, 0); }
  function subtotal() { return items().reduce((a, i) => a + i.price * i.qty, 0); }
  function fee() {
    if (orderType === "pickup") return 0;
    return subtotal() >= R.freeDeliveryAbove ? 0 : R.deliveryFee;
  }
  function total() { return subtotal() + fee(); }

  function sync() {
    // item rows
    $$(".item").forEach(row => {
      const id = row.dataset.id;
      const side = row.querySelector(".item-side");
      const price = side.querySelector(".item-price").textContent;
      const q = cart[id];
      const old = side.querySelector(".qty");
      if (old) old.remove();
      const oldAdd = side.querySelector(".add-btn");
      if (q) {
        if (oldAdd) oldAdd.style.display = "none";
        const w = document.createElement("div");
        w.className = "qty";
        w.innerHTML = '<button class="qty-btn qty-dec" type="button">−</button><span>' + q + '</span><button class="qty-btn qty-inc" type="button">+</button>';
        side.appendChild(w);
      } else {
        if (oldAdd) oldAdd.style.display = "";
      }
      void price;
    });
    // badge + bar
    const n = count();
    const badge = $("#cartBadge");
    badge.textContent = n;
    badge.classList.toggle("show", n > 0);
    const bar = $("#cartBar");
    bar.classList.toggle("show", n > 0 && !$("#viewCart").classList.contains("active") && !lastOrder);
    $("#barCount").textContent = n + (n === 1 ? " item" : " items");
    $("#barTotal").textContent = C + " " + fmt(total());
    if ($("#viewCart").classList.contains("active")) renderCart();
  }

  /* ---------- Tabs ---------- */
  function go(tab) {
    lastOrder = null;
    $$(".view").forEach(v => v.classList.remove("active"));
    $("#view" + tab[0].toUpperCase() + tab.slice(1)).classList.add("active");
    $$(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
    if (tab === "cart") renderCart();
    sync();
  }
  $$(".tab").forEach(t => t.addEventListener("click", () => go(t.dataset.tab)));
  $("#cartBar").addEventListener("click", () => go("cart"));

  /* ---------- Cart view ---------- */
  function renderCart() {
    const box = $("#cartContent");
    const list = items();
    if (!list.length && !lastOrder) {
      box.innerHTML = '<div class="empty"><div class="big">🛒</div><p>Cart khali hai.<br>Menu se items add karein.</p></div>';
      return;
    }
    if (lastOrder) { renderSuccess(box, lastOrder); return; }

    let html = '<h2 class="cat-title" style="margin-top:4px">Your Cart</h2>';
    list.forEach(i => {
      html +=
        '<div class="cart-line"><div class="info"><b>' + i.qty + "× " + i.name + "</b><span>" + C + " " + fmt(i.price) + " each</span></div>" +
        '<div class="qty"><button class="qty-btn c-dec" data-id="' + i.id + '" type="button">−</button><span>' + i.qty + '</span><button class="qty-btn c-inc" data-id="' + i.id + '" type="button">+</button></div>' +
        '<div class="line-price">' + C + " " + fmt(i.price * i.qty) + "</div></div>";
    });

    html +=
      '<div class="type-toggle">' +
      '<button class="type-btn' + (orderType === "delivery" ? " active" : "") + '" data-type="delivery" type="button">🛵 Delivery</button>' +
      '<button class="type-btn' + (orderType === "pickup" ? " active" : "") + '" data-type="pickup" type="button">🏪 Pickup</button></div>' +
      '<div class="field" id="fNameWrap"><label>Your Name</label><input id="oName" type="text" placeholder="Ali Khan" autocomplete="name" /></div>' +
      '<div class="field" id="fPhoneWrap"><label>WhatsApp Number</label><input id="oPhone" type="tel" inputmode="tel" placeholder="03XX XXXXXXX" /></div>';

    if (orderType === "delivery") {
      html +=
        '<div class="field" id="fAddrWrap"><label>Delivery Address</label><textarea id="oAddr" placeholder="House / street / area / landmark"></textarea></div>';
    }

    html +=
      '<div class="field"><label>Note (optional)</label><input id="oNote" type="text" placeholder="Kam mirch, extra chutney..." /></div>' +
      '<div class="totals">' +
      '<div class="row"><span>Subtotal</span><span>' + C + " " + fmt(subtotal()) + "</span></div>" +
      '<div class="row"><span>' + (orderType === "pickup" ? "Pickup" : "Delivery" + (fee() === 0 ? " (free over " + C + " " + fmt(R.freeDeliveryAbove) + ")" : "")) + "</span><span>" + (fee() === 0 ? "Free" : C + " " + fmt(fee())) + "</span></div>" +
      '<div class="row grand"><span>Total (COD)</span><span>' + C + " " + fmt(total()) + "</span></div></div>" +
      '<p class="form-err" id="oErr">Please fill name, phone' + (orderType === "delivery" ? " aur address" : "") + ".</p>" +
      '<button class="wa-btn" id="sendBtn" type="button">' +
      '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
      "Order Confirm on WhatsApp</button>" +
      '<p style="font-size:12px;color:var(--dim);text-align:center;margin-top:10px">WhatsApp khulega — sirf <b style="color:#e9edef">Send</b> dabana hai.</p>';

    box.innerHTML = html;

    box.querySelectorAll(".c-inc").forEach(b => b.onclick = () => { cart[b.dataset.id]++; sync(); });
    box.querySelectorAll(".c-dec").forEach(b => b.onclick = () => dec(b.dataset.id));
    box.querySelectorAll(".type-btn").forEach(b => b.onclick = () => { orderType = b.dataset.type; renderCart(); sync(); });
    $("#sendBtn").onclick = sendOrder;
  }

  /* ---------- Order → WhatsApp ---------- */
  function sendOrder() {
    const name = ($("#oName") && $("#oName").value.trim()) || "";
    const phone = ($("#oPhone") && $("#oPhone").value.trim()) || "";
    const addr = ($("#oAddr") && $("#oAddr").value.trim()) || "";
    const note = ($("#oNote") && $("#oNote").value.trim()) || "";
    let ok = true;
    const setErr = (id, bad) => { const w = document.getElementById(id); if (w) w.classList.toggle("err", bad); };
    setErr("fNameWrap", !name); if (!name) ok = false;
    setErr("fPhoneWrap", !phone); if (!phone) ok = false;
    setErr("fAddrWrap", !addr); if (orderType === "delivery" && !addr) ok = false;
    const err = $("#oErr");
    err.classList.toggle("show", !ok);
    if (!ok) return;

    const id = String(Date.now()).slice(-4);
    const o = {
      id, ts: Date.now(),
      items: items().map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      subtotal: subtotal(), fee: fee(), total: total(),
      type: orderType, name, phone, address: addr, note
    };

    const lines = o.items.map(i => i.qty + "x " + i.name + "  (" + C + " " + fmt(i.price * i.qty) + ")").join("\n");
    const msg =
      "*NEW ORDER — " + R.name + "*\n" +
      "Order #" + o.id + "\n" +
      "────────────\n" +
      lines + "\n" +
      "────────────\n" +
      (orderType === "pickup" ? "Type: Pickup\n" : "Type: Delivery\n") +
      "Total: *" + C + " " + fmt(o.total) + "* (COD)\n" +
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      (orderType === "delivery" ? "Address: " + addr + "\n" : "") +
      (note ? "Note: " + note + "\n" : "") +
      "Payment: Cash on Delivery";

    localStorage.setItem("dawn_order", JSON.stringify(o));
    window.open("https://wa.me/" + R.adminPhone + "?text=" + encodeURIComponent(msg), "_blank");

    lastOrder = o;
    renderCart();
    toast("Order WhatsApp pe bhej diya ✓");
  }

  function renderSuccess(box, o) {
    box.innerHTML =
      '<div class="success"><div class="tick">✅</div>' +
      "<h2>Order #" + o.id + " ready!</h2>" +
      "<p>WhatsApp khula hoga — message me sirf <b style=\"color:#e9edef\">Send</b> dabayein. Order admin ke WhatsApp pe pohanch jayega.</p>" +
      '<div class="steps">' +
      '<div class="step"><i>1</i><div><b>Message Send karein</b><span>WhatsApp me neeche green Send button dabayein.</span></div></div>' +
      '<div class="step"><i>2</i><div><b>Admin approve karega</b><span>Admin order check karke rider ko forward karega.</span></div></div>' +
      '<div class="step"><i>3</i><div><b>Rider deliver karega</b><span>Cash on Delivery — paisay rider ko.</span></div></div>' +
      "</div>" +
      '<a class="ghost-link" href="admin.html">Admin side kaisa dikhta hai? Dekhein →</a>' +
      '<br /><button class="ghost-link" id="newOrder" type="button" style="background:none;border:none;border-bottom:1px solid rgba(251,146,60,.4);margin-top:16px">Naya order karein</button>' +
      "</div>";
    const b = document.getElementById("newOrder");
    if (b) b.onclick = () => { for (const k in cart) delete cart[k]; go("menu"); };
  }

  /* ---------- Toast ---------- */
  let tId;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(tId);
    tId = setTimeout(() => t.classList.remove("show"), 2600);
  }

  sync();
})();
