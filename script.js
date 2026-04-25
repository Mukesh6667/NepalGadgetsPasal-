"use strict";
// ================================================================
// NepalGadgetsPasal — Main Script (Firebase Real-time + Navbar Fix)
// ================================================================

// ---- FIREBASE CONFIG ----
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxKqAf-1Kq_sVJdJ15Bq3Q8Pea77UNMII",
  authDomain: "nepal-gadgets-pasal.firebaseapp.com",
  projectId: "nepal-gadgets-pasal",
  storageBucket: "nepal-gadgets-pasal.firebasestorage.app",
  messagingSenderId: "68275069628",
  appId: "1:68275069628:web:a504908ad3b9d45869e6b9",
  measurementId: "G-70D5WMPM1P"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ================================================================
// PRODUCTS DATA (local — loaded from Firebase if available)
// ================================================================
const DEFAULT_PRODUCTS = [
  { id:1,  name:"iPhone 15 Pro",          brand:"Apple",    cat:"smartphones",  price:189900, old:219900, disc:14, rating:4.9, rev:892,  icon:"fa-mobile-alt",     img:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=320&h=320&fit=crop&auto=format&q=75", desc:"Titanium design, A17 Pro chip, 48MP camera, up to 29hr video playback.", specs:[["Display","6.1\" Super Retina XDR"],["Chip","A17 Pro Bionic"],["Camera","48MP+12MP+12MP"],["Battery","Up to 23hr"],["Storage","128/256/512GB"],["OS","iOS 17"]] },
  { id:2,  name:"Samsung Galaxy S24",     brand:"Samsung",  cat:"smartphones",  price:109900, old:129900, disc:15, rating:4.7, rev:643,  icon:"fa-mobile-alt",     img:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=320&h=320&fit=crop&auto=format&q=75", desc:"Galaxy AI, 50MP camera, Snapdragon 8 Gen 3.", specs:[["Display","6.2\" AMOLED 2X"],["Chip","Snapdragon 8 Gen 3"],["Camera","50MP+10MP+12MP"],["Battery","4000mAh"],["Storage","128/256GB"],["OS","Android 14"]] },
  { id:3,  name:"MacBook Air M3",         brand:"Apple",    cat:"laptops",      price:169900, old:189900, disc:11, rating:4.9, rev:412,  icon:"fa-laptop",         img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=320&h=320&fit=crop&auto=format&q=75", desc:"M3 chip, 18hr battery, 11.5mm thin, 1.24kg.", specs:[["Chip","Apple M3"],["Display","13.6\" Retina"],["RAM","8/16/24GB"],["Storage","256GB-2TB"],["Battery","18hr"],["Weight","1.24kg"]] },
  { id:4,  name:"Dell XPS 15",            brand:"Dell",     cat:"laptops",      price:229900, old:259900, disc:12, rating:4.6, rev:287,  icon:"fa-laptop",         img:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=320&h=320&fit=crop&auto=format&q=75", desc:"OLED display, Intel Core i7, NVIDIA RTX 4060.", specs:[["Processor","Intel i7-13700H"],["Display","15.6\" OLED 3.5K"],["RAM","16GB DDR5"],["Storage","512GB SSD"],["GPU","RTX 4060"],["Battery","86Whr"]] },
  { id:5,  name:"Sony WH-1000XM5",        brand:"Sony",     cat:"earbuds",      price:44900,  old:54900,  disc:18, rating:4.8, rev:1204, icon:"fa-headphones-alt", img:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=320&h=320&fit=crop&auto=format&q=75", desc:"Industry-leading ANC, 30hr battery, V1 chip.", specs:[["Driver","30mm Dome"],["ANC","Industry Best"],["Battery","30hr"],["Charging","USB-C Quick"],["BT","5.2"],["Weight","250g"]] },
  { id:6,  name:"Apple Watch Series 9",   brand:"Apple",    cat:"smartwatches", price:59900,  old:69900,  disc:14, rating:4.8, rev:723,  icon:"fa-clock",          img:"https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=320&h=320&fit=crop&auto=format&q=75", desc:"S9 chip, always-on display, double tap, ECG.", specs:[["Chip","Apple S9"],["Display","Always-On OLED"],["Battery","18hr"],["Water","50m"],["Health","ECG,SpO2"],["BT","5.3"]] },
  { id:7,  name:"JBL Charge 5",           brand:"JBL",      cat:"speakers",     price:19900,  old:24900,  disc:20, rating:4.7, rev:956,  icon:"fa-volume-up",      img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=320&h=320&fit=crop&auto=format&q=75", desc:"40W Pro Sound, IP67, 20hr battery, powerbank.", specs:[["Output","40W"],["Battery","20hr"],["Water","IP67"],["BT","5.1"],["PartyBoost","Yes"],["Weight","960g"]] },
  { id:8,  name:"Logitech G502 X",        brand:"Logitech", cat:"gaming",       price:12900,  old:15900,  disc:19, rating:4.6, rev:574,  icon:"fa-gamepad",        img:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=320&h=320&fit=crop&auto=format&q=75", desc:"HERO 25K sensor, LIGHTFORCE switches, 13 buttons.", specs:[["Sensor","HERO 25K"],["DPI","100-25600"],["Switches","LIGHTFORCE"],["Buttons","13"],["Weight","89g"],["Interface","USB"]] },
  { id:9,  name:"OnePlus 12",             brand:"OnePlus",  cat:"smartphones",  price:89900,  old:99900,  disc:10, rating:4.6, rev:398,  icon:"fa-mobile-alt",     img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=320&h=320&fit=crop&auto=format&q=75", desc:"Snapdragon 8 Gen 3, Hasselblad, 100W charging.", specs:[["Display","6.82\" AMOLED"],["Chip","SD 8 Gen 3"],["Camera","50MP Hasselblad"],["Battery","5400mAh/100W"],["Storage","256/512GB"],["OS","OxygenOS 14"]] },
  { id:10, name:"GoPro Hero 12",          brand:"GoPro",    cat:"cameras",      price:54900,  old:64900,  disc:15, rating:4.7, rev:329,  icon:"fa-camera",         img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=320&h=320&fit=crop&auto=format&q=75", desc:"5.3K video, HyperSmooth 6.0, waterproof 10m.", specs:[["Video","5.3K60/4K120"],["Photo","27MP"],["Stabilize","HyperSmooth 6.0"],["Water","10m"],["Battery","1720mAh"],["Weight","154g"]] },
  { id:11, name:"Samsung Galaxy Watch 6", brand:"Samsung",  cat:"smartwatches", price:39900,  old:49900,  disc:20, rating:4.5, rev:412,  icon:"fa-clock",          img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=320&h=320&fit=crop&auto=format&q=75", desc:"BIA, ECG, sapphire glass, 40hr battery.", specs:[["Display","1.3\" AMOLED"],["Chip","Exynos W930"],["Battery","40hr"],["Water","5ATM+IP68"],["Health","BIA,ECG,SpO2"],["OS","Wear OS 4"]] },
  { id:12, name:"JBL Tune Buds",          brand:"JBL",      cat:"earbuds",      price:8900,   old:11900,  disc:25, rating:4.4, rev:863,  icon:"fa-headphones-alt", img:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=320&h=320&fit=crop&auto=format&q=75", desc:"48hr total battery, ANC, JBL Pure Bass Sound.", specs:[["Bud Battery","10hr"],["Total Battery","48hr"],["ANC","Yes"],["Driver","10mm"],["BT","5.3"],["Water","IPX4"]] }
];

// State
let PRODUCTS = [...DEFAULT_PRODUCTS];
let cart     = JSON.parse(localStorage.getItem("ngp_cart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("ngp_wish") || "[]");

// ================================================================
// UTILS
// ================================================================
const Rs       = n => "Rs. " + Number(n).toLocaleString("en-IN");
const saveCart = () => localStorage.setItem("ngp_cart", JSON.stringify(cart));
const saveWish = () => localStorage.setItem("ngp_wish", JSON.stringify(wishlist));

function toast(msg, icon = "fa-check-circle", color = "#10b981") {
  const t = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  const i = document.getElementById("toast-icon");
  i.className = "fa " + icon;
  i.style.color = color;
  t.classList.add("show");
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove("show"), 3200);
}

function updateBadges() {
  const ct = cart.reduce((s, i) => s + i.qty, 0);
  ["cart-count","mb-cart"].forEach(id => { const el=document.getElementById(id); if(el) el.textContent=ct; });
  ["wish-count","mb-wish"].forEach(id => { const el=document.getElementById(id); if(el) el.textContent=wishlist.length; });
}

function genId() {
  return "NGP-" + Math.random().toString(36).toUpperCase().slice(2, 10);
}

function starsHtml(r) {
  let h = "";
  for (let i = 1; i <= 5; i++) {
    if (r >= i) h += `<i class="fas fa-star"></i>`;
    else if (r >= i - 0.5) h += `<i class="fas fa-star-half-alt"></i>`;
    else h += `<i class="far fa-star"></i>`;
  }
  return h + `<span class="rcount">(${r})</span>`;
}

// ================================================================
// SMOOTH SCROLL — NAVBAR FIX
// ================================================================
function smoothScroll(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const navH = document.getElementById("navbar")?.offsetHeight || 68;
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({ top, behavior: "smooth" });
}

function initNavScroll() {
  // All anchor links with #
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href").replace("#", "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        smoothScroll(id);
        // Close mobile menu
        document.getElementById("nav-links")?.classList.remove("open");
        document.getElementById("hamburger")?.classList.remove("open");
      }
    });
  });

  // Mobile bottom nav buttons
  document.querySelectorAll(".mnav-btn[data-target]").forEach(btn => {
    btn.addEventListener("click", () => smoothScroll(btn.dataset.target));
  });

  // Category cards → scroll to shop + filter
  document.querySelectorAll(".cat-card").forEach(card => {
    card.addEventListener("click", () => {
      const f = card.dataset.filter;
      smoothScroll("shop");
      setTimeout(() => {
        document.querySelectorAll(".ftab").forEach(b => b.classList.toggle("active", b.dataset.filter === f));
        renderProducts(f);
      }, 500);
    });
  });

  // Footer category links
  document.querySelectorAll(".cat-link").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const f = a.dataset.filter;
      smoothScroll("shop");
      setTimeout(() => {
        document.querySelectorAll(".ftab").forEach(b => b.classList.toggle("active", b.dataset.filter === f));
        renderProducts(f);
      }, 500);
    });
  });
}

// ================================================================
// NAVBAR SCROLL BEHAVIOR
// ================================================================
function initNavbar() {
  const nav  = document.getElementById("navbar");
  const hbg  = document.getElementById("hamburger");
  const nls  = document.getElementById("nav-links");

  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 20);
    document.getElementById("scroll-top")?.classList.toggle("on", window.scrollY > 400);
    // Active link highlight
    ["home","shop","categories","deals","about","contact"].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      document.querySelectorAll(`.nl[href="#${id}"]`).forEach(a =>
        a.classList.toggle("active", rect.top <= 90 && rect.bottom > 90)
      );
    });
  });

  hbg?.addEventListener("click", () => {
    hbg.classList.toggle("open");
    nls?.classList.toggle("open");
  });

  // Close menu on outside click
  document.addEventListener("click", e => {
    if (!nav?.contains(e.target)) {
      hbg?.classList.remove("open");
      nls?.classList.remove("open");
    }
  });
}

// ================================================================
// PRODUCTS
// ================================================================
function renderProducts(filter = "all") {
  const grid = document.getElementById("products-grid");
  if (!grid) return;
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted)">
      <i class="fa fa-box-open" style="font-size:40px;opacity:0.15;display:block;margin-bottom:12px"></i>
      No products in this category.</div>`;
    return;
  }
  grid.innerHTML = list.map((p, i) => {
    const iw = wishlist.includes(p.id);
    return `<div class="pcard" style="animation:cardin 0.4s ease ${i * 0.04}s both">
      <div class="pimg" data-id="${p.id}">
        <span class="disc-badge">-${p.disc}%</span>
        <button class="wish-btn ${iw ? "on" : ""}" data-wish="${p.id}" title="Wishlist">
          <i class="${iw ? "fas" : "far"} fa-heart"></i>
        </button>
        <img src="${p.img}" alt="${p.name}" loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
        <i class="fas ${p.icon} fallback-icon"></i>
        <button class="qview-btn" data-modal="${p.id}">
          <i class="fa fa-eye"></i> Quick View
        </button>
      </div>
      <div class="pinfo">
        <div class="pbrand">${p.brand}</div>
        <div class="pname" data-modal="${p.id}">${p.name}</div>
        <div class="pstars">${starsHtml(p.rating)}</div>
        <div class="pprices">
          <span class="pprice">${Rs(p.price)}</span>
          <span class="pold">${Rs(p.old)}</span>
        </div>
        <button class="btn-primary" data-addcart="${p.id}">
          <i class="fa fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>`;
  }).join("");

  // Single event delegation on grid — handles all clicks reliably
  grid.onclick = (e) => {
    // Add to cart
    const cartBtn = e.target.closest("[data-addcart]");
    if (cartBtn) { addToCart(Number(cartBtn.dataset.addcart)); return; }

    // Wishlist
    const wishBtn = e.target.closest("[data-wish]");
    if (wishBtn) { toggleWish(Number(wishBtn.dataset.wish), wishBtn); return; }

    // Quick view or product name click
    const modalBtn = e.target.closest("[data-modal]");
    if (modalBtn) { openModal(Number(modalBtn.dataset.modal)); return; }
  };
}

// Filter tabs
function initFilterTabs() {
  document.querySelectorAll(".ftab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".ftab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.filter);
    });
  });
}

// ================================================================
// FIREBASE — PRODUCTS (real-time + auto-restore)
// ================================================================
async function loadProductsFromFirebase() {
  try {
    // Real-time listener
    onSnapshot(collection(db, "products"), async snap => {
      if (snap.size >= 10) {
        // Firebase has enough products — use them
        PRODUCTS = snap.docs.map(d => ({ fbId: d.id, ...d.data() }));
      } else if (snap.size > 0 && snap.size < 10) {
        // Firebase has some but not all — restore missing ones
        const fbProds = snap.docs.map(d => ({ fbId: d.id, ...d.data() }));
        const fbIds = fbProds.map(p => p.id);
        const missing = DEFAULT_PRODUCTS.filter(p => !fbIds.includes(p.id));
        // Add missing products to Firebase silently
        for (const p of missing) {
          try { await addDoc(collection(db, "products"), p); } catch(e) {}
        }
        // Use local defaults while Firebase updates
        PRODUCTS = [...DEFAULT_PRODUCTS];
      } else {
        // Firebase empty — use defaults and seed
        PRODUCTS = [...DEFAULT_PRODUCTS];
        for (const p of DEFAULT_PRODUCTS) {
          try { await addDoc(collection(db, "products"), p); } catch(e) {}
        }
      }
      const activeFilter = document.querySelector(".ftab.active")?.dataset.filter || "all";
      renderProducts(activeFilter);
    });
  } catch (e) {
    console.log("Firebase unavailable, using local products");
    PRODUCTS = [...DEFAULT_PRODUCTS];
    renderProducts();
  }
}

// ================================================================
// CART
// ================================================================
function addToCart(id, qty = 1) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const ex = cart.find(x => x.id === id);
  if (ex) ex.qty += qty;
  else cart.push({ id, qty });
  saveCart(); updateBadges(); renderCart(); updateWABtn();
  toast(`${p.name} added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart(); updateBadges(); renderCart(); updateWABtn();
}

function updateQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(); updateBadges(); renderCart(); updateWABtn();
}

function renderCart() {
  const wrap   = document.getElementById("cart-items-wrap");
  const empty  = document.getElementById("empty-cart");
  const footer = document.getElementById("cart-footer");
  const totEl  = document.getElementById("cart-total-amt");
  if (!wrap) return;
  wrap.querySelectorAll(".cart-item").forEach(el => el.remove());
  if (!cart.length) {
    empty.style.display = "flex";
    footer.style.display = "none";
    return;
  }
  empty.style.display = "none";
  let total = 0;
  cart.forEach(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return;
    total += p.price * item.qty;
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <div class="ci-img">
        <img src="${p.img}" alt="${p.name}"
          onerror="this.parentElement.innerHTML='<i class=\\'fas ${p.icon}\\'></i>'"/>
      </div>
      <div class="ci-info">
        <h4>${p.name}</h4>
        <div class="ci-price">${Rs(p.price)}</div>
        <div class="ci-ctrl">
          <button class="qbtn" data-id="${p.id}" data-d="-1">−</button>
          <span class="qdisplay">${item.qty}</span>
          <button class="qbtn" data-id="${p.id}" data-d="1">+</button>
          <button class="ci-del" data-id="${p.id}"><i class="fa fa-trash"></i></button>
        </div>
      </div>`;
    wrap.appendChild(el);
  });
  wrap.querySelectorAll(".qbtn").forEach(b =>
    b.addEventListener("click", () => updateQty(Number(b.dataset.id), Number(b.dataset.d))));
  wrap.querySelectorAll(".ci-del").forEach(b =>
    b.addEventListener("click", () => removeFromCart(Number(b.dataset.id))));
  totEl.textContent = Rs(total);
  footer.style.display = "block";
}

function openCart()  { document.getElementById("cart-sidebar").classList.add("open"); document.getElementById("cart-overlay").classList.add("open"); document.body.style.overflow = "hidden"; }
function closeCart() { document.getElementById("cart-sidebar").classList.remove("open"); document.getElementById("cart-overlay").classList.remove("open"); document.body.style.overflow = ""; }

// ================================================================
// WISHLIST
// ================================================================
function toggleWish(id, btn) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(x => x !== id);
    if (btn) { btn.classList.remove("on"); btn.innerHTML = `<i class="far fa-heart"></i>`; }
    toast(`${p.name} removed from wishlist`, "fa-heart-broken", "#ef4444");
  } else {
    wishlist.push(id);
    if (btn) { btn.classList.add("on"); btn.innerHTML = `<i class="fas fa-heart"></i>`; }
    toast(`${p.name} added to wishlist!`, "fa-heart", "#ef4444");
  }
  saveWish(); updateBadges();
}

function openWishlist() {
  const body = document.getElementById("wish-body");
  if (!body) return;
  if (!wishlist.length) {
    body.innerHTML = `<div style="text-align:center;padding:44px;color:var(--muted)"><i class="fa fa-heart" style="font-size:42px;opacity:0.13;display:block;margin-bottom:12px"></i><p>Your wishlist is empty.</p></div>`;
  } else {
    body.innerHTML = wishlist.map(id => {
      const p = PRODUCTS.find(x => x.id === id);
      if (!p) return "";
      return `<div class="cart-item">
        <div class="ci-img"><img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'"/></div>
        <div class="ci-info">
          <h4>${p.name}</h4>
          <div class="ci-price">${Rs(p.price)}</div>
          <div class="ci-ctrl" style="margin-top:6px">
            <button class="btn-primary" style="padding:5px 11px;font-size:12px" data-wid="${p.id}">
              <i class="fa fa-cart-plus"></i> Add to Cart
            </button>
            <button class="ci-del" data-wdel="${p.id}"><i class="fa fa-trash"></i></button>
          </div>
        </div>
      </div>`;
    }).join("");
    body.querySelectorAll("[data-wid]").forEach(b =>
      b.addEventListener("click", () => { addToCart(Number(b.dataset.wid)); closeWishlist(); }));
    body.querySelectorAll("[data-wdel]").forEach(b =>
      b.addEventListener("click", () => { toggleWish(Number(b.dataset.wdel), null); openWishlist(); }));
  }
  document.getElementById("wish-modal").classList.add("open");
  document.getElementById("wish-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeWishlist() {
  document.getElementById("wish-modal").classList.remove("open");
  document.getElementById("wish-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ================================================================
// PRODUCT MODAL
// ================================================================
function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const iw = wishlist.includes(id);
  document.getElementById("modal-body").innerHTML = `
    <div class="modal-grid">
      <div class="modal-img">
        <img src="${p.img}" alt="${p.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
        <i class="fas ${p.icon} mfallback"></i>
      </div>
      <div>
        <div class="mbrand">${p.brand}</div>
        <div class="mname">${p.name}</div>
        <div class="pstars" style="margin-bottom:12px">${starsHtml(p.rating)}</div>
        <p class="mdesc">${p.desc}</p>
        <div class="mspecs">
          <h4>Specifications</h4>
          ${p.specs.map(s => `<div class="spec-row"><span>${s[0]}</span><span>${s[1]}</span></div>`).join("")}
        </div>
        <div class="mprices">
          <span class="mprice">${Rs(p.price)}</span>
          <span class="mold">${Rs(p.old)}</span>
          <span class="mdisc">-${p.disc}%</span>
        </div>
        <div class="qty-row">
          <label>Quantity:</label>
          <div class="qty-ctrl">
            <button id="qminus">−</button>
            <input type="number" id="modal-qty" value="1" min="1" max="99"/>
            <button id="qplus">+</button>
          </div>
        </div>
        <div class="mbtns">
          <button class="btn-primary" id="m-add-cart"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
          <button class="btn-glass" id="m-buy-now"><i class="fa fa-bolt"></i> Buy Now</button>
          <button class="btn-outline" id="m-wish" style="${iw ? "color:var(--danger);border-color:var(--danger)" : ""}">
            <i class="${iw ? "fas" : "far"} fa-heart"></i>
          </button>
        </div>
      </div>
    </div>`;
  const qtyEl = () => Math.max(1, parseInt(document.getElementById("modal-qty")?.value || 1));
  document.getElementById("qminus").addEventListener("click", () => { const i=document.getElementById("modal-qty"); if(i) i.value=Math.max(1,parseInt(i.value)-1); });
  document.getElementById("qplus").addEventListener("click",  () => { const i=document.getElementById("modal-qty"); if(i) i.value=parseInt(i.value)+1; });
  document.getElementById("m-add-cart").addEventListener("click", () => { addToCart(id, qtyEl()); closeModal(); });
  document.getElementById("m-buy-now").addEventListener("click", () => { addToCart(id, qtyEl()); closeModal(); setTimeout(openCheckout, 300); });
  document.getElementById("m-wish").addEventListener("click", function() {
    toggleWish(id, null);
    const iw2 = wishlist.includes(id);
    this.style.color = iw2 ? "var(--danger)" : "";
    this.style.borderColor = iw2 ? "var(--danger)" : "";
    this.innerHTML = `<i class="${iw2 ? "fas" : "far"} fa-heart"></i>`;
  });
  document.getElementById("product-modal").classList.add("open");
  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.getElementById("product-modal").classList.remove("open");
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ================================================================
// CHECKOUT + FIREBASE ORDER SAVE
// ================================================================
function openCheckout() {
  if (!cart.length) { toast("Your cart is empty!", "fa-exclamation-circle", "#f59e0b"); return; }
  const sumEl = document.getElementById("co-summary");
  const totEl = document.getElementById("co-total-amt");
  if (!sumEl) return;
  let total = 0;
  sumEl.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return "";
    const sub = p.price * item.qty; total += sub;
    return `<div class="co-summary-item"><span>${p.name} × ${item.qty}</span><span>${Rs(sub)}</span></div>`;
  }).join("");
  totEl.textContent = Rs(total);
  closeCart();
  document.getElementById("checkout-modal").classList.add("open");
  document.getElementById("checkout-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCheckout() {
  document.getElementById("checkout-modal").classList.remove("open");
  document.getElementById("checkout-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

async function placeOrder(e) {
  e.preventDefault();
  const name    = document.getElementById("co-name")?.value.trim();
  const phone   = document.getElementById("co-phone")?.value.trim();
  const address = document.getElementById("co-address")?.value.trim();
  const city    = document.getElementById("co-city")?.value.trim();
  const notes   = document.getElementById("co-notes")?.value.trim();
  const pay     = document.querySelector('input[name="pay"]:checked')?.value || "cod";
  if (!name || !phone || !address || !city) {
    toast("Please fill all required fields!", "fa-exclamation-circle", "#ef4444"); return;
  }
  if (pay === "esewa" && !document.getElementById("txn-id")?.value.trim()) {
    toast("Please enter eSewa Transaction ID!", "fa-exclamation-circle", "#ef4444"); return;
  }
  const oid = genId();
  let total = 0;
  const items = cart.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    const sub = (p?.price || 0) * item.qty; total += sub;
    return { name: p?.name || "", qty: item.qty, price: p?.price || 0 };
  });

  // Save to Firebase
  const orderData = {
    id: oid, name, phone, address, city, notes,
    items, total, payment: pay,
    status: "pending",
    date: serverTimestamp(),
    createdAt: new Date().toISOString()
  };
  try {
    await addDoc(collection(db, "orders"), orderData);
    toast("Order saved to database!", "fa-database");
  } catch (err) {
    console.warn("Firebase order save failed:", err);
  }

  // Build WhatsApp message
  let waMsg = `Hello NepalGadgetsPasal! 🛍️\n\n*Order ID:* ${oid}\n*Name:* ${name}\n*Phone:* ${phone}\n*Address:* ${address}, ${city}\n*Payment:* ${pay.toUpperCase()}\n\n*Items:*\n`;
  items.forEach(i => { waMsg += `• ${i.name} × ${i.qty} = ${Rs(i.price * i.qty)}\n`; });
  waMsg += `\n*Total: ${Rs(total)}*`;
  if (notes) waMsg += `\n*Notes:* ${notes}`;

  document.getElementById("checkout-body").innerHTML = `
    <div class="order-success">
      <div class="success-anim"><i class="fa fa-check"></i></div>
      <h2 style="font-size:24px;font-weight:800;margin-bottom:10px">Order Placed! 🎉</h2>
      <p style="color:var(--muted)">Thank you, <strong>${name}</strong>! Your order has been received.</p>
      <p style="color:var(--muted);margin-top:5px">We will contact you on <strong>${phone}</strong> to confirm.</p>
      <div class="order-id-box">${oid}</div>
      <p style="font-size:12px;color:var(--muted);margin-bottom:20px">Estimated delivery to <strong>${city}</strong>: 1–3 business days</p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <a href="https://wa.me/9779763332837?text=${encodeURIComponent(waMsg)}" target="_blank" class="btn-primary">
          <i class="fab fa-whatsapp"></i> Confirm on WhatsApp
        </a>
        <button class="btn-outline" onclick="closeCheckout();location.reload()">
          <i class="fa fa-times"></i> Close
        </button>
      </div>
    </div>`;
  cart = []; saveCart(); updateBadges(); renderCart();
}

function toggleEsewa(val) {
  const box = document.getElementById("esewa-box");
  if (box) box.style.display = val === "esewa" ? "block" : "none";
}

// ================================================================
// CONTACT FORM — FIREBASE SAVE
// ================================================================
async function submitContact(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll("input, textarea");
  const data = {
    name: inputs[0]?.value.trim(),
    phone: inputs[1]?.value.trim(),
    email: inputs[2]?.value.trim(),
    message: inputs[3]?.value.trim(),
    date: serverTimestamp(),
    read: false
  };
  try {
    await addDoc(collection(db, "messages"), data);
    toast("Message sent! We'll reply soon 😊", "fa-paper-plane");
    form.reset();
  } catch (err) {
    toast("Message sent!", "fa-paper-plane");
    form.reset();
  }
}

// ================================================================
// SEARCH
// ================================================================
function initSearch() {
  const input = document.getElementById("search-input");
  const drop  = document.getElementById("search-drop");
  if (!input || !drop) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { drop.classList.remove("open"); return; }
    const matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.cat.includes(q)
    ).slice(0, 6);
    drop.innerHTML = !matches.length
      ? `<div class="sdr" style="justify-content:center;color:var(--muted)">No results found</div>`
      : matches.map(p => `
          <div class="sdr" data-sid="${p.id}">
            <div class="sdr-icon"><i class="fas ${p.icon}"></i></div>
            <div><p>${p.name}</p><span>${Rs(p.price)}</span></div>
          </div>`).join("");
    drop.querySelectorAll(".sdr[data-sid]").forEach(el =>
      el.addEventListener("click", () => { openModal(Number(el.dataset.sid)); closeSearch(); }));
    drop.classList.add("open");
  });
  input.addEventListener("keydown", e => { if (e.key === "Escape") closeSearch(); });
  document.addEventListener("click", e => {
    if (!input.contains(e.target) && !drop.contains(e.target)) closeSearch();
  });
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); input.focus(); input.select(); }
  });
}
function closeSearch() {
  const i = document.getElementById("search-input");
  const d = document.getElementById("search-drop");
  if (d) d.classList.remove("open");
  if (i) i.value = "";
}

// ================================================================
// COUNTDOWN
// ================================================================
function startCountdown() {
  function upd() {
    const now = new Date(), end = new Date(now);
    end.setHours(23, 59, 59, 0);
    if (now >= end) end.setDate(end.getDate() + 1);
    const diff = end - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const eh = document.getElementById("chours");
    const em = document.getElementById("cmins");
    const es = document.getElementById("csecs");
    if (eh) eh.textContent = String(h).padStart(2, "0");
    if (em) em.textContent = String(m).padStart(2, "0");
    if (es) es.textContent = String(s).padStart(2, "0");
  }
  upd(); setInterval(upd, 1000);
}

// ================================================================
// DARK MODE
// ================================================================
function initTheme() {
  const btn  = document.getElementById("theme-btn");
  const icon = document.getElementById("theme-icon");
  const html = document.documentElement;
  const saved = localStorage.getItem("ngp_theme") || "dark";
  html.setAttribute("data-theme", saved);
  if (icon) icon.className = saved === "light" ? "fa fa-moon" : "fa fa-sun";
  btn?.addEventListener("click", () => {
    const cur  = html.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("ngp_theme", next);
    if (icon) icon.className = next === "light" ? "fa fa-moon" : "fa fa-sun";
    toast(next === "light" ? "Light mode on ☀️" : "Dark mode on 🌙", "fa-adjust");
  });
}

// ================================================================
// WA BUTTON
// ================================================================
function updateWABtn() {
  const btn = document.getElementById("wa-float");
  if (!btn) return;
  if (cart.length) {
    let msg = "Hello NepalGadgetsPasal! 🛍️\n\nI'd like to order:\n\n";
    let total = 0;
    cart.forEach(i => {
      const p = PRODUCTS.find(x => x.id === i.id);
      if (!p) return;
      const s = p.price * i.qty; total += s;
      msg += `• ${p.name} × ${i.qty} = ${Rs(s)}\n`;
    });
    msg += `\n*Total: ${Rs(total)}*\n\nPlease confirm!`;
    btn.href = `https://wa.me/9779763332837?text=${encodeURIComponent(msg)}`;
    btn.querySelector(".wa-tip").textContent = "Order via WhatsApp!";
  } else {
    btn.href = "https://wa.me/9779763332837";
    btn.querySelector(".wa-tip").textContent = "Chat with us!";
  }
}

// ================================================================
// LOADER
// ================================================================
function hideLoader() {
  document.getElementById("loader")?.classList.add("gone");
}
window.addEventListener("load", () => setTimeout(hideLoader, 700));
setTimeout(hideLoader, 3000);

// ================================================================
// SCROLL ANIMATIONS
// ================================================================
function initAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".cat-card,.trust-item,.tcard,.afeat,.astat,.citem").forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity 0.45s ease ${i * 0.04}s, transform 0.45s ease ${i * 0.04}s`;
    obs.observe(el);
  });
}

// ================================================================
// EVENT BINDINGS
// ================================================================
function bindEvents() {
  // Cart
  document.getElementById("cart-btn")?.addEventListener("click", openCart);
  document.getElementById("cart-close")?.addEventListener("click", closeCart);
  document.getElementById("cart-overlay")?.addEventListener("click", closeCart);
  document.getElementById("start-shopping-btn")?.addEventListener("click", () => { closeCart(); smoothScroll("shop"); });
  document.getElementById("checkout-btn")?.addEventListener("click", openCheckout);

  // Wishlist
  document.getElementById("wish-btn")?.addEventListener("click", openWishlist);
  document.getElementById("wish-close")?.addEventListener("click", closeWishlist);
  document.getElementById("wish-overlay")?.addEventListener("click", closeWishlist);

  // Modal
  document.getElementById("modal-close")?.addEventListener("click", closeModal);
  document.getElementById("modal-overlay")?.addEventListener("click", closeModal);

  // Checkout
  document.getElementById("checkout-close")?.addEventListener("click", closeCheckout);
  document.getElementById("checkout-overlay")?.addEventListener("click", closeCheckout);
  document.getElementById("co-form")?.addEventListener("submit", placeOrder);
  document.querySelectorAll('input[name="pay"]').forEach(r =>
    r.addEventListener("change", () => toggleEsewa(r.value)));

  // Login
  document.getElementById("login-btn")?.addEventListener("click", () => {
    document.getElementById("login-modal").classList.add("open");
    document.getElementById("login-overlay").classList.add("open");
    document.body.style.overflow = "hidden";
  });
  document.getElementById("login-close")?.addEventListener("click", closeLogin);
  document.getElementById("login-overlay")?.addEventListener("click", closeLogin);
  document.getElementById("login-form")?.addEventListener("submit", e => {
    e.preventDefault(); toast("Login coming soon!", "fa-info-circle", "#3b82f6"); closeLogin();
  });

  // Contact form
  document.getElementById("contact-form")?.addEventListener("submit", submitContact);

  // Promo banner close
  document.getElementById("promo-close")?.addEventListener("click", () => {
    document.getElementById("promo-banner").style.display = "none";
  });

  // Mobile bottom nav
  document.getElementById("mnav-wish")?.addEventListener("click", openWishlist);
  document.getElementById("mnav-cart")?.addEventListener("click", openCart);

  // Scroll top
  document.getElementById("scroll-top")?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }));

  // Keyboard ESC
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeModal(); closeCart(); closeWishlist();
      closeCheckout(); closeLogin(); closeSearch();
    }
  });
}

function closeLogin() {
  document.getElementById("login-modal").classList.remove("open");
  document.getElementById("login-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ================================================================
// INIT
// ================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initNavScroll();
  initFilterTabs();
  initSearch();
  initAnimations();
  startCountdown();
  bindEvents();
  renderCart();
  updateBadges();
  updateWABtn();
  loadProductsFromFirebase();
});
// CSS animation keyframe
document.head.insertAdjacentHTML("beforeend",
  "<style>@keyframes cardin{from{opacity:0;transform:scale(0.95) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}</style>");
