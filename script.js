/* ================================================================
   NepalGadgetsPasal - Main JavaScript
   Features: Cart, Wishlist, Search, Filter, Modals, Countdown,
             Dark Mode, Checkout, Notifications, LocalStorage
================================================================ */

"use strict";

// ----------------------------------------------------------------
// PRODUCT DATA  (image: CDN URLs — work on GitHub Pages too)
// ----------------------------------------------------------------
const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "smartphones",
    price: 189900,
    oldPrice: 219900,
    discount: 14,
    rating: 4.9,
    reviews: 892,
    icon: "fa-mobile-alt",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&auto=format",
    description: "Experience the next level of iPhone with titanium design, the A17 Pro chip, a 48MP main camera system, and up to 29-hour video playback. Available in Natural, Black, White, and Blue Titanium.",
    specs: [
      ["Display", "6.1\" Super Retina XDR"],
      ["Chip", "A17 Pro Bionic"],
      ["Camera", "48MP + 12MP + 12MP"],
      ["Battery", "Up to 23 hr"],
      ["Storage", "128GB / 256GB / 512GB"],
      ["OS", "iOS 17"]
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "smartphones",
    price: 109900,
    oldPrice: 129900,
    discount: 15,
    rating: 4.7,
    reviews: 643,
    icon: "fa-mobile-alt",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&auto=format",
    description: "Galaxy AI is here. The Galaxy S24 brings Galaxy AI features, a compact design, and a new 50MP camera with 30x Space Zoom. Powered by Snapdragon 8 Gen 3.",
    specs: [
      ["Display", "6.2\" Dynamic AMOLED 2X"],
      ["Chip", "Snapdragon 8 Gen 3"],
      ["Camera", "50MP + 10MP + 12MP"],
      ["Battery", "4000 mAh"],
      ["Storage", "128GB / 256GB"],
      ["OS", "Android 14"]
    ]
  },
  {
    id: 3,
    name: "MacBook Air M3",
    brand: "Apple",
    category: "laptops",
    price: 169900,
    oldPrice: 189900,
    discount: 11,
    rating: 4.9,
    reviews: 412,
    icon: "fa-laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&auto=format",
    description: "Lean. Mean. M3 machine. The new MacBook Air is strikingly thin at just 11.5mm and 1.24kg, powered by the blazing-fast M3 chip with up to 18 hours of battery life.",
    specs: [
      ["Chip", "Apple M3"],
      ["Display", "13.6\" Liquid Retina"],
      ["RAM", "8GB / 16GB / 24GB"],
      ["Storage", "256GB – 2TB SSD"],
      ["Battery", "Up to 18 hr"],
      ["Weight", "1.24 kg"]
    ]
  },
  {
    id: 4,
    name: "Dell XPS 15",
    brand: "Dell",
    category: "laptops",
    price: 229900,
    oldPrice: 259900,
    discount: 12,
    rating: 4.6,
    reviews: 287,
    icon: "fa-laptop",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop&auto=format",
    description: "The Dell XPS 15 sets the standard for premium Windows laptops with its stunning OLED display, Intel Core i7 processor, and NVIDIA GeForce RTX graphics. Perfect for creators and professionals.",
    specs: [
      ["Processor", "Intel Core i7-13700H"],
      ["Display", "15.6\" OLED 3.5K"],
      ["RAM", "16GB DDR5"],
      ["Storage", "512GB NVMe SSD"],
      ["GPU", "NVIDIA RTX 4060"],
      ["Battery", "86Whr"]
    ]
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "earbuds",
    price: 44900,
    oldPrice: 54900,
    discount: 18,
    rating: 4.8,
    reviews: 1204,
    icon: "fa-headphones-alt",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop&auto=format",
    description: "Industry-leading noise cancellation with two processors controlling 8 microphones. 30-hour battery life with quick charging. Crystal clear hands-free calling with the V1 chip.",
    specs: [
      ["Driver", "30mm, Dome Type"],
      ["ANC", "Industry Leading"],
      ["Battery", "30 hr (ANC on)"],
      ["Charging", "USB-C, 3hr Quick Charge"],
      ["Connectivity", "Bluetooth 5.2"],
      ["Weight", "250g"]
    ]
  },
  {
    id: 6,
    name: "Apple Watch Series 9",
    brand: "Apple",
    category: "smartwatches",
    price: 59900,
    oldPrice: 69900,
    discount: 14,
    rating: 4.8,
    reviews: 723,
    icon: "fa-clock",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop&auto=format",
    description: "Smarter. Brighter. Mightier. The Apple Watch Series 9 features the new S9 chip, a brighter always-on display, double tap gesture, and advanced health sensors.",
    specs: [
      ["Chip", "Apple S9 SiP"],
      ["Display", "Always-On Retina LTPO OLED"],
      ["Battery", "Up to 18 hr"],
      ["Water Resistance", "50m"],
      ["Health", "ECG, Blood Oxygen"],
      ["Connectivity", "Wi-Fi 4, Bluetooth 5.3"]
    ]
  },
  {
    id: 7,
    name: "JBL Charge 5",
    brand: "JBL",
    category: "speakers",
    price: 19900,
    oldPrice: 24900,
    discount: 20,
    rating: 4.7,
    reviews: 956,
    icon: "fa-volume-up",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&auto=format",
    description: "Big sound wherever you go. The JBL Charge 5 features Pro Sound with a separate tweeter, 20-hour playtime, IP67 waterproof and dustproof, and built-in powerbank to charge your devices.",
    specs: [
      ["Output", "40W"],
      ["Battery", "20 hr playtime"],
      ["Waterproof", "IP67"],
      ["Connectivity", "Bluetooth 5.1"],
      ["PartyBoost", "Yes"],
      ["Weight", "960g"]
    ]
  },
  {
    id: 8,
    name: "Logitech G502 X",
    brand: "Logitech",
    category: "gaming",
    price: 12900,
    oldPrice: 15900,
    discount: 19,
    rating: 4.6,
    reviews: 574,
    icon: "fa-gamepad",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&auto=format",
    description: "The G502 X redefines what a gaming mouse can be with the new LIGHTFORCE hybrid optical-mechanical switches, ultra-precise HERO 25K sensor, and customizable weight system.",
    specs: [
      ["Sensor", "HERO 25K"],
      ["DPI", "100 – 25,600"],
      ["Switches", "LIGHTFORCE Hybrid"],
      ["Buttons", "13 Programmable"],
      ["Weight", "89g"],
      ["Interface", "USB"]
    ]
  },
  {
    id: 9,
    name: "OnePlus 12",
    brand: "OnePlus",
    category: "smartphones",
    price: 89900,
    oldPrice: 99900,
    discount: 10,
    rating: 4.6,
    reviews: 398,
    icon: "fa-mobile-alt",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format",
    description: "Powered by Snapdragon 8 Gen 3, Hasselblad-tuned cameras, 100W SUPERVOOC fast charging, and a 5400mAh battery. Never compromise on performance.",
    specs: [
      ["Display", "6.82\" ProXDR AMOLED"],
      ["Chip", "Snapdragon 8 Gen 3"],
      ["Camera", "50MP Hasselblad Main"],
      ["Battery", "5400mAh / 100W"],
      ["Storage", "256GB / 512GB"],
      ["OS", "OxygenOS 14"]
    ]
  },
  {
    id: 10,
    name: "GoPro Hero 12",
    brand: "GoPro",
    category: "cameras",
    price: 54900,
    oldPrice: 64900,
    discount: 15,
    rating: 4.7,
    reviews: 329,
    icon: "fa-camera",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop&auto=format",
    description: "Capture life's adventures in stunning 5.3K video and 27MP photos. With HyperSmooth 6.0 stabilization, waterproof to 10m, and 70-minute endurance recording.",
    specs: [
      ["Video", "5.3K60 / 4K120"],
      ["Photo", "27MP"],
      ["Stabilization", "HyperSmooth 6.0"],
      ["Waterproof", "10m"],
      ["Battery", "1720mAh"],
      ["Weight", "154g"]
    ]
  },
  {
    id: 11,
    name: "Samsung Galaxy Watch 6",
    brand: "Samsung",
    category: "smartwatches",
    price: 39900,
    oldPrice: 49900,
    discount: 20,
    rating: 4.5,
    reviews: 412,
    icon: "fa-clock",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format",
    description: "Track your health with advanced sleep analysis, body composition sensor, and continuous heart monitoring. Sapphire Crystal glass and 40-hour battery life.",
    specs: [
      ["Display", "1.3\" Super AMOLED"],
      ["Processor", "Exynos W930"],
      ["Battery", "40 hr"],
      ["Water Resistance", "5ATM + IP68"],
      ["Health", "BIA, ECG, SpO2"],
      ["OS", "Wear OS 4"]
    ]
  },
  {
    id: 12,
    name: "JBL Tune Buds",
    brand: "JBL",
    category: "earbuds",
    price: 8900,
    oldPrice: 11900,
    discount: 25,
    rating: 4.4,
    reviews: 863,
    icon: "fa-headphones-alt",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&auto=format",
    description: "48-hour total battery life, 4 microphones for clear calls, Active Noise Cancelling, and JBL Pure Bass Sound — all at an unbelievably accessible price.",
    specs: [
      ["Battery (Bud)", "10 hr ANC"],
      ["Battery (Case)", "38 hr total"],
      ["ANC", "Yes"],
      ["Driver", "10mm"],
      ["Connectivity", "Bluetooth 5.3"],
      ["Water Resistance", "IPX4"]
    ]
  }
];

// ----------------------------------------------------------------
// STATE
// ----------------------------------------------------------------
let cart = JSON.parse(localStorage.getItem("ngp_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("ngp_wishlist")) || [];
let currentProductId = null;

// ----------------------------------------------------------------
// UTILITY FUNCTIONS
// ----------------------------------------------------------------
const formatPrice = (n) => "Rs. " + n.toLocaleString("en-IN");

const saveCart = () => localStorage.setItem("ngp_cart", JSON.stringify(cart));
const saveWishlist = () => localStorage.setItem("ngp_wishlist", JSON.stringify(wishlist));

function showToast(msg, icon = "fa-check-circle") {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-msg");
  const toastIcon = toast.querySelector("i");
  toastMsg.textContent = msg;
  toastIcon.className = "fa " + icon;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function updateBadges() {
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cart-count").textContent = totalItems;
  document.getElementById("wishlist-count").textContent = wishlist.length;
}

// ----------------------------------------------------------------
// RENDER PRODUCTS
// ----------------------------------------------------------------
function renderProducts(filter = "all") {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";

  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding: 60px; color: var(--text-muted);">
      <i class="fa fa-box-open" style="font-size:48px; opacity:0.3; display:block; margin-bottom:16px;"></i>
      No products found in this category.
    </div>`;
    return;
  }

  filtered.forEach((p, idx) => {
    const inWishlist = wishlist.includes(p.id);
    const stars = renderStars(p.rating);

    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.category = p.category;
    card.style.animationDelay = (idx * 0.05) + "s";

    card.innerHTML = `
      <div class="product-img-wrap zoomable">
        <div class="discount-badge">-${p.discount}%</div>
        <button class="wishlist-heart ${inWishlist ? "active" : ""}" onclick="toggleWishlist(${p.id}, this)" title="Add to Wishlist">
          <i class="${inWishlist ? "fas" : "far"} fa-heart"></i>
        </button>
        <img src="${p.image}" alt="${p.name}" loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <i class="prod-icon fas ${p.icon}" style="display:none;"></i>
        <button class="quick-view-btn" onclick="openProductModal(${p.id})"><i class='fa fa-eye'></i> Quick View</button>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name" onclick="openProductModal(${p.id})">${p.name}</div>
        <div class="product-stars">
          ${stars}
          <span>(${p.reviews})</span>
        </div>
        <div class="product-prices">
          <span class="product-price">${formatPrice(p.price)}</span>
          <span class="product-old-price">${formatPrice(p.oldPrice)}</span>
        </div>
        <button class="btn btn-primary" onclick="addToCart(${p.id})">
          <i class="fa fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderStars(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) html += `<i class="fas fa-star"></i>`;
    else if (rating >= i - 0.5) html += `<i class="fas fa-star-half-alt"></i>`;
    else html += `<i class="far fa-star"></i>`;
  }
  html += `<span>${rating}</span>`;
  return html;
}

// ----------------------------------------------------------------
// FILTER TABS
// ----------------------------------------------------------------
document.querySelectorAll(".filter-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderProducts(tab.dataset.filter);
  });
});

// Category cards → filter products
document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const filter = card.dataset.filter;
    // Scroll to shop
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
    // Activate tab
    setTimeout(() => {
      document.querySelectorAll(".filter-tab").forEach(t => {
        t.classList.toggle("active", t.dataset.filter === filter);
      });
      renderProducts(filter);
    }, 400);
  });
});

// ----------------------------------------------------------------
// CART FUNCTIONS
// ----------------------------------------------------------------
function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart();
  updateBadges();
  renderCart();
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateBadges();
  renderCart();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateBadges();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const footer = document.getElementById("cart-footer");
  const emptyEl = document.getElementById("cart-empty");
  const totalEl = document.getElementById("cart-total");

  if (cart.length === 0) {
    container.innerHTML = "";
    container.appendChild(document.getElementById("cart-empty"));
    emptyEl.style.display = "flex";
    footer.style.display = "none";
    return;
  }

  emptyEl.style.display = "none";
  let total = 0;

  // Build items
  const existingEmpty = document.getElementById("cart-empty");
  container.innerHTML = "";
  container.appendChild(existingEmpty);

  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;
    total += product.price * item.qty;

    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <div class="cart-item-icon"><i class="fas ${product.icon}"></i></div>
      <div class="cart-item-info">
        <h4>${product.name}</h4>
        <div class="item-price">${formatPrice(product.price)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty(${product.id}, -1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${product.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${product.id})" title="Remove"><i class="fa fa-trash"></i></button>
        </div>
      </div>
    `;
    container.appendChild(el);
  });

  totalEl.textContent = formatPrice(total);
  footer.style.display = "block";
}

// Open/close cart
document.getElementById("cart-btn").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", closeCart);
document.getElementById("cart-overlay").addEventListener("click", closeCart);

function openCart() {
  document.getElementById("cart-sidebar").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cart-sidebar").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ----------------------------------------------------------------
// WISHLIST FUNCTIONS
// ----------------------------------------------------------------
function toggleWishlist(productId, btnEl) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    if (btnEl) {
      btnEl.classList.remove("active");
      btnEl.innerHTML = `<i class="far fa-heart"></i>`;
    }
    showToast(`${product.name} removed from wishlist`, "fa-heart-broken");
  } else {
    wishlist.push(productId);
    if (btnEl) {
      btnEl.classList.add("active");
      btnEl.innerHTML = `<i class="fas fa-heart"></i>`;
    }
    showToast(`${product.name} added to wishlist!`, "fa-heart");
  }
  saveWishlist();
  updateBadges();
}

function openWishlistModal() {
  const container = document.getElementById("wishlist-items-container");
  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--text-muted);">
      <i class="fa fa-heart" style="font-size:48px; opacity:0.2; display:block; margin-bottom:16px;"></i>
      <p>Your wishlist is empty.</p>
    </div>`;
  } else {
    wishlist.forEach(id => {
      const p = PRODUCTS.find(prod => prod.id === id);
      if (!p) return;
      const el = document.createElement("div");
      el.className = "cart-item";
      el.style.marginBottom = "12px";
      el.innerHTML = `
        <div class="cart-item-icon"><i class="fas ${p.icon}"></i></div>
        <div class="cart-item-info">
          <h4>${p.name}</h4>
          <div class="item-price">${formatPrice(p.price)}</div>
          <div class="cart-item-controls" style="margin-top:8px;">
            <button class="btn btn-primary" style="padding:6px 14px; font-size:13px;" onclick="addToCart(${p.id}); closeWishlistModal();">
              <i class="fa fa-cart-plus"></i> Add to Cart
            </button>
            <button class="remove-btn" onclick="toggleWishlist(${p.id}); document.querySelectorAll('.wishlist-heart').forEach(b => { if(b.closest('[data-id=\\'${p.id}\\']')) {} }); openWishlistModal();" title="Remove">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      `;
      container.appendChild(el);
    });
  }

  document.getElementById("wishlist-modal").classList.add("open");
  document.getElementById("wishlist-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeWishlistModal() {
  document.getElementById("wishlist-modal").classList.remove("open");
  document.getElementById("wishlist-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("wishlist-btn").addEventListener("click", openWishlistModal);
document.getElementById("wishlist-close").addEventListener("click", closeWishlistModal);
document.getElementById("wishlist-overlay").addEventListener("click", closeWishlistModal);

// ----------------------------------------------------------------
// PRODUCT DETAIL MODAL
// ----------------------------------------------------------------
function openProductModal(productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;
  currentProductId = productId;

  const inner = document.getElementById("modal-inner");
  const inWishlist = wishlist.includes(p.id);

  const specsHTML = p.specs.map(s =>
    `<div class="spec-row"><span>${s[0]}</span><span>${s[1]}</span></div>`
  ).join("");

  inner.innerHTML = `
    <div class="modal-product-grid">
      <div class="modal-img-wrap" style="padding:0; overflow:hidden; background:var(--bg3);">
        <img src="${p.image}" alt="${p.name}"
          style="width:100%; height:100%; object-fit:contain; padding:16px;"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <i class="fas ${p.icon}" style="display:none; font-size:100px; color:var(--accent-light); opacity:0.4; width:100%; height:100%; align-items:center; justify-content:center;"></i>
      </div>
      <div class="modal-details">
        <div class="modal-brand">${p.brand}</div>
        <h2 class="modal-name">${p.name}</h2>
        <div class="product-stars" style="margin-bottom:16px;">${renderStars(p.rating)} <span style="margin-left:4px; color:var(--text-muted); font-size:13px;">(${p.reviews} reviews)</span></div>
        <p class="modal-desc">${p.description}</p>
        <div class="modal-specs">
          <h4>Specifications</h4>
          ${specsHTML}
        </div>
        <div class="modal-prices">
          <span class="modal-price">${formatPrice(p.price)}</span>
          <span class="modal-old">${formatPrice(p.oldPrice)}</span>
          <span class="modal-discount">-${p.discount}%</span>
        </div>
        <div class="qty-selector">
          <label>Quantity:</label>
          <div class="qty-control">
            <button onclick="changeModalQty(-1)">−</button>
            <input type="number" id="modal-qty" value="1" min="1" max="99" />
            <button onclick="changeModalQty(1)">+</button>
          </div>
        </div>
        <div class="modal-btns">
          <button class="btn btn-primary" onclick="addToCartFromModal(${p.id})">
            <i class="fa fa-shopping-cart"></i> Add to Cart
          </button>
          <button class="btn btn-glass" onclick="buyNow(${p.id})">
            <i class="fa fa-bolt"></i> Buy Now
          </button>
          <button class="btn ${inWishlist ? "btn-danger" : "btn-outline"}" id="modal-wishlist-btn" onclick="toggleWishlistModal(${p.id})">
            <i class="${inWishlist ? "fas" : "far"} fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("product-modal").classList.add("open");
  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  document.getElementById("product-modal").classList.remove("open");
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function changeModalQty(delta) {
  const input = document.getElementById("modal-qty");
  if (!input) return;
  input.value = Math.max(1, parseInt(input.value || 1) + delta);
}

function addToCartFromModal(productId) {
  const qty = parseInt(document.getElementById("modal-qty")?.value || 1);
  addToCart(productId, qty);
  closeProductModal();
}

function buyNow(productId) {
  const qty = parseInt(document.getElementById("modal-qty")?.value || 1);
  addToCart(productId, qty);
  closeProductModal();
  openCheckout();
}

function toggleWishlistModal(productId) {
  const btn = document.getElementById("modal-wishlist-btn");
  toggleWishlist(productId, null);
  const inWishlist = wishlist.includes(productId);
  if (btn) {
    btn.className = `btn ${inWishlist ? "btn-danger" : "btn-outline"}`;
    btn.innerHTML = `<i class="${inWishlist ? "fas" : "far"} fa-heart"></i>`;
  }
}

document.getElementById("modal-close").addEventListener("click", closeProductModal);
document.getElementById("modal-overlay").addEventListener("click", closeProductModal);

// ----------------------------------------------------------------
// CHECKOUT
// ----------------------------------------------------------------
function openCheckout() {
  if (cart.length === 0) {
    showToast("Your cart is empty!", "fa-exclamation-circle");
    return;
  }

  // Render summary
  const summaryEl = document.getElementById("checkout-summary");
  const totalEl = document.getElementById("checkout-total-display");
  let total = 0;
  summaryEl.innerHTML = "";

  cart.forEach(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if (!p) return;
    const sub = p.price * item.qty;
    total += sub;
    const el = document.createElement("div");
    el.className = "checkout-summary-item";
    el.innerHTML = `
      <span>${p.name} × ${item.qty}</span>
      <span>${formatPrice(sub)}</span>
    `;
    summaryEl.appendChild(el);
  });

  totalEl.textContent = formatPrice(total);
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

document.getElementById("checkout-close").addEventListener("click", closeCheckout);
document.getElementById("checkout-overlay").addEventListener("click", closeCheckout);

// Payment method toggle
document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener("change", () => {
    const esewaDiv = document.getElementById("esewa-details");
    esewaDiv.style.display = radio.value === "esewa" ? "block" : "none";
  });
});

function handleCheckout(e) {
  e.preventDefault();
  const name = document.getElementById("co-name").value.trim();
  const phone = document.getElementById("co-phone").value.trim();
  const address = document.getElementById("co-address").value.trim();
  const city = document.getElementById("co-city").value.trim();
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "cod";

  if (!name || !phone || !address || !city) {
    showToast("Please fill all required fields!", "fa-exclamation-circle");
    return;
  }

  // eSewa validation
  if (paymentMethod === "esewa") {
    const txn = document.getElementById("transaction-id").value.trim();
    if (!txn) {
      showToast("Please enter Transaction ID for eSewa!", "fa-exclamation-circle");
      return;
    }
  }

  // Success
  closeCheckout();
  cart = [];
  saveCart();
  updateBadges();
  renderCart();

  // Show success message
  setTimeout(() => {
    showToast("🎉 Order placed successfully! We'll contact you soon.", "fa-check-circle");
  }, 300);
}

// ----------------------------------------------------------------
// FLASH SALE COUNTDOWN TIMER
// ----------------------------------------------------------------
function startCountdown() {
  // Set sale end to midnight today + some hours
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 0); // midnight tonight

  // If already past midnight use next day
  if (now >= end) {
    end.setDate(end.getDate() + 1);
  }

  function update() {
    const diff = end - new Date();
    if (diff <= 0) {
      // Reset timer to next midnight
      end.setDate(end.getDate() + 1);
      return;
    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById("hours").textContent = String(h).padStart(2, "0");
    document.getElementById("minutes").textContent = String(m).padStart(2, "0");
    document.getElementById("seconds").textContent = String(s).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// ----------------------------------------------------------------
// SEARCH FUNCTIONALITY
// ----------------------------------------------------------------
function setupSearch(inputId, resultsId) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  if (!input) return;

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      if (results) results.classList.remove("open");
      return;
    }

    const matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );

    if (!results) {
      // Mobile search: scroll to filtered products
      const tab = document.querySelector(`.filter-tab[data-filter="all"]`);
      if (tab) tab.click();
      const grid = document.getElementById("products-grid");
      if (grid) {
        grid.querySelectorAll(".product-card").forEach(card => {
          const title = card.querySelector(".product-name")?.textContent.toLowerCase() || "";
          const brand = card.querySelector(".product-brand")?.textContent.toLowerCase() || "";
          card.style.display = (title.includes(query) || brand.includes(query)) ? "" : "none";
        });
      }
      return;
    }

    if (matches.length === 0) {
      results.innerHTML = `<div class="search-result-item" style="justify-content:center; color:var(--text-muted);">No results found</div>`;
    } else {
      results.innerHTML = matches.slice(0, 6).map(p => `
        <div class="search-result-item" onclick="openProductModal(${p.id}); document.getElementById('${inputId}').value=''; document.getElementById('${resultsId}').classList.remove('open');">
          <div class="sri-icon"><i class="fas ${p.icon}"></i></div>
          <div class="search-result-info">
            <p>${p.name}</p>
            <span>${formatPrice(p.price)}</span>
          </div>
        </div>
      `).join("");
    }

    results.classList.add("open");
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      results.classList.remove("open");
      input.value = "";
    }
  });

  document.addEventListener("click", e => {
    if (!input.contains(e.target) && results && !results.contains(e.target)) {
      results.classList.remove("open");
    }
  });
}

setupSearch("search-input", "search-results");
setupSearch("mobile-search-input", null);

// Search button click
document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("search-input");
  const query = input.value.trim();
  if (!query) {
    input.focus();
    return;
  }
  // Show results already shown by input event
});

// ----------------------------------------------------------------
// DARK MODE TOGGLE
// ----------------------------------------------------------------
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const htmlEl = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem("ngp_theme") || "dark";
htmlEl.setAttribute("data-theme", savedTheme);
themeIcon.className = savedTheme === "light" ? "fa fa-moon" : "fa fa-sun";

themeToggle.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", next);
  localStorage.setItem("ngp_theme", next);
  themeIcon.className = next === "light" ? "fa fa-moon" : "fa fa-sun";
  showToast(next === "light" ? "Light mode on" : "Dark mode on", "fa-adjust");
});

// ----------------------------------------------------------------
// NAVBAR SCROLL BEHAVIOR
// ----------------------------------------------------------------
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle("scrolled", scrollY > 20);

  // Active nav link
  const sections = ["home", "shop", "categories", "deals", "about", "contact"];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle("active", rect.top <= 100 && rect.bottom > 100);
    }
  });

  lastScroll = scrollY;
});

// ----------------------------------------------------------------
// HAMBURGER MENU
// ----------------------------------------------------------------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close on link click
navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ----------------------------------------------------------------
// SCROLL TO TOP
// ----------------------------------------------------------------
const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ----------------------------------------------------------------
// LOGIN MODAL
// ----------------------------------------------------------------
document.getElementById("login-btn").addEventListener("click", () => {
  document.getElementById("login-modal").classList.add("open");
  document.getElementById("login-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
});

function closeLogin() {
  document.getElementById("login-modal").classList.remove("open");
  document.getElementById("login-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("login-close").addEventListener("click", closeLogin);
document.getElementById("login-overlay").addEventListener("click", closeLogin);

// ----------------------------------------------------------------
// CONTACT FORM
// ----------------------------------------------------------------
function handleContactSubmit(e) {
  e.preventDefault();
  showToast("Message sent! We'll get back to you soon.", "fa-paper-plane");
  e.target.reset();
}

// ----------------------------------------------------------------
// SMOOTH SCROLLING FOR NAV LINKS
// ----------------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ----------------------------------------------------------------
// ANIMATION ON SCROLL (Intersection Observer)
// ----------------------------------------------------------------
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const targets = document.querySelectorAll(".category-card, .about-feat, .mini-stat, .contact-item");
  targets.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });
}

// ----------------------------------------------------------------
// KEYBOARD ACCESSIBILITY
// ----------------------------------------------------------------
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeProductModal();
    closeCart();
    closeWishlistModal();
    closeCheckout();
    closeLogin();
  }
});

// ----------------------------------------------------------------
// INIT
// ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  updateBadges();
  startCountdown();
  setupScrollAnimations();

  // Restore wishlist heart state in cards after render
  wishlist.forEach(id => {
    document.querySelectorAll(`.wishlist-heart`).forEach(btn => {
      const card = btn.closest(".product-card");
      if (!card) return;
      const nameEl = card.querySelector(".product-name");
      if (!nameEl) return;
      const onclick = btn.getAttribute("onclick") || "";
      if (onclick.includes(`(${id},`)) {
        btn.classList.add("active");
        btn.innerHTML = `<i class="fas fa-heart"></i>`;
      }
    });
  });

  console.log("%c🛍️ NepalGadgetsPasal Loaded!", "color:#2563eb; font-size:18px; font-weight:bold;");
  console.log("%cBuilt with ❤️ in Nepal", "color:#10b981; font-size:14px;");
});
/* ================================================================
   NepalGadgetsPasal — EXTENDED SCRIPT (append to end of script.js)
   Includes: Loading Screen, Promo Banner, Marquee, Trust Badges,
             Testimonials, Newsletter, Cookie Consent, Page Progress,
             Mobile Bottom Nav, Recently Viewed, Feature Banners,
             Skeleton Loader, Quick View, Order ID Generator,
             WhatsApp Order, Misc Enhancements
================================================================ */

// ================================================================
// LOADING SCREEN
// ================================================================
(function initLoadingScreen() {
  // Inject loading screen HTML before body content
  const loader = document.createElement("div");
  loader.id = "loading-screen";
  loader.innerHTML = `
    <div class="loader-logo">
      <i class="fa fa-bolt"></i>
      <span>NepalGadgetsPasal</span>
    </div>
    <div class="loader-bar">
      <div class="loader-bar-fill"></div>
    </div>
    <p class="loader-text">Loading your gadgets...</p>
  `;
  document.body.prepend(loader);

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
      setTimeout(() => loader.remove(), 600);
    }, 1200);
  });
})();

// ================================================================
// PAGE READ PROGRESS BAR
// ================================================================
(function initPageProgress() {
  const bar = document.createElement("div");
  bar.className = "page-progress";
  document.body.prepend(bar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  });
})();

// ================================================================
// PROMO ANNOUNCEMENT BANNER
// ================================================================
(function initPromoBanner() {
  if (sessionStorage.getItem("ngp_promo_closed")) return;

  const banner = document.createElement("div");
  banner.className = "promo-banner";
  banner.id = "promo-banner";
  banner.innerHTML = `
    <i class="fa fa-gift"></i>
    <span>🎉 FREE Delivery on orders above Rs.&nbsp;5,000! Use code <strong>NEPALGADGETS</strong> at checkout.</span>
    <a href="#deals">Shop Now →</a>
    <button class="promo-close-btn" id="promo-close" title="Close">✕</button>
  `;

  // Insert after body start
  document.body.insertBefore(banner, document.body.firstChild);

  // Adjust navbar top
  const nav = document.getElementById("navbar");
  if (nav) {
    nav.style.top = banner.offsetHeight + "px";
    // Also push hero padding
    const hero = document.getElementById("home");
    if (hero) hero.style.paddingTop = `calc(var(--nav-h) + ${banner.offsetHeight}px)`;
  }

  document.getElementById("promo-close").addEventListener("click", () => {
    banner.style.display = "none";
    sessionStorage.setItem("ngp_promo_closed", "1");
    if (nav) nav.style.top = "0px";
  });
})();

// ================================================================
// SCROLLING MARQUEE TICKER
// ================================================================
(function initMarquee() {
  const items = [
    { icon: "fa-truck", text: "Free Delivery above Rs. 5,000" },
    { icon: "fa-shield-alt", text: "100% Genuine Products" },
    { icon: "fa-undo", text: "7-Day Easy Returns" },
    { icon: "fa-bolt", text: "Same-Day Dispatch Available" },
    { icon: "fa-headset", text: "24/7 Customer Support" },
    { icon: "fa-tag", text: "Best Price Guarantee" },
    { icon: "fa-star", text: "4.9★ Rated by 10,000+ Customers" },
    { icon: "fa-lock", text: "Secure eSewa & Khalti Payments" },
  ];

  // Duplicate for seamless loop
  const allItems = [...items, ...items];
  const html = allItems.map(i => `
    <span class="marquee-item">
      <i class="fa ${i.icon}"></i> ${i.text}
      <span class="dot"></span>
    </span>
  `).join("");

  const strip = document.createElement("div");
  strip.className = "marquee-strip";
  strip.innerHTML = `<div class="marquee-track">${html}</div>`;

  // Insert after categories section
  const categories = document.getElementById("categories");
  if (categories) categories.insertAdjacentElement("afterend", strip);
})();

// ================================================================
// TRUST BADGES SECTION
// ================================================================
(function initTrustStrip() {
  const badges = [
    { icon: "fa-truck-fast", title: "Fast Delivery", desc: "Kathmandu: Same day" },
    { icon: "fa-shield-halved", title: "100% Genuine", desc: "Official warranty" },
    { icon: "fa-rotate-left", title: "Easy Returns", desc: "7-day hassle free" },
    { icon: "fa-lock", title: "Secure Payment", desc: "eSewa, Khalti, COD" },
    { icon: "fa-headset", title: "24/7 Support", desc: "WhatsApp & Email" },
  ];

  const strip = document.createElement("section");
  strip.className = "trust-strip";
  strip.innerHTML = `
    <div class="container">
      <div class="trust-grid">
        ${badges.map(b => `
          <div class="trust-item">
            <div class="trust-icon"><i class="fa ${b.icon}"></i></div>
            <div class="trust-text">
              <h4>${b.title}</h4>
              <p>${b.desc}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  const flash = document.getElementById("deals");
  if (flash) flash.insertAdjacentElement("afterend", strip);
})();

// ================================================================
// TESTIMONIALS SECTION
// ================================================================
(function initTestimonials() {
  const reviews = [
    {
      stars: 5,
      text: "Ordered iPhone 15 Pro and it arrived next day, sealed box with full warranty card. Price was also 3000 cheaper than physical stores. Highly recommend!",
      name: "Rohan Shrestha",
      location: "Kathmandu",
    },
    {
      stars: 5,
      text: "MacBook Air M3 ekdam ramro aaayo. Packaging was excellent. Customer support helped me with the eSewa payment process. Will definitely order again.",
      name: "Priya Adhikari",
      location: "Lalitpur",
    },
    {
      stars: 4,
      text: "Sony headphones sound quality is amazing! Delivery to Pokhara took 2 days only. Fast shipping and genuine product. Very satisfied.",
      name: "Aakash Thapa",
      location: "Pokhara",
    },
    {
      stars: 5,
      text: "Best gadget shop in Nepal online. Got Samsung Galaxy Watch 6 at the best price. Box sealed, all accessories included. Mukesh bhai is very helpful!",
      name: "Sunita Rai",
      location: "Biratnagar",
    },
    {
      stars: 5,
      text: "JBL speaker sound is just incredible. COD option made it easy to order. Package arrived well-padded. Will buy again from here.",
      name: "Bikash Karki",
      location: "Chitwan",
    },
    {
      stars: 4,
      text: "Gaming mouse was exactly as described. The delivery was quick and the price beats every other Nepali online store. Great experience overall.",
      name: "Dibya Bajracharya",
      location: "Bhaktapur",
    },
  ];

  const section = document.createElement("section");
  section.className = "testimonials section";
  section.id = "testimonials";
  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-label">Real Reviews</span>
        <h2 class="section-title">What Our <span class="accent">Customers Say</span></h2>
        <p>Trusted by thousands of happy customers across Nepal</p>
      </div>
      <div class="testimonials-grid">
        ${reviews.map(r => `
          <div class="testimonial-card">
            <div class="testimonial-stars">
              ${"<i class='fas fa-star'></i>".repeat(r.stars)}
              ${"<i class='far fa-star'></i>".repeat(5 - r.stars)}
            </div>
            <p class="testimonial-text">"${r.text}"</p>
            <div class="testimonial-author">
              <div class="author-avatar"><i class="fa fa-user"></i></div>
              <div class="author-info">
                <h4>${r.name}</h4>
                <p><i class="fa fa-map-marker-alt" style="color:var(--accent-light); font-size:11px;"></i> ${r.location}</p>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  const contact = document.getElementById("contact");
  if (contact) contact.insertAdjacentElement("beforebegin", section);
})();

// ================================================================
// NEWSLETTER SECTION
// ================================================================
(function initNewsletter() {
  const section = document.createElement("section");
  section.className = "newsletter";
  section.id = "newsletter";
  section.innerHTML = `
    <div class="container">
      <div class="newsletter-inner">
        <div class="newsletter-icon"><i class="fa fa-envelope"></i></div>
        <h2>Stay in the <span class="gradient-text">Loop</span></h2>
        <p>Subscribe to get exclusive deals, new arrivals, and tech tips delivered straight to your inbox.</p>
        <form class="newsletter-form" onsubmit="handleNewsletter(event)">
          <input type="email" id="newsletter-email" placeholder="Enter your email address" required />
          <button type="submit" class="btn btn-primary">
            <i class="fa fa-paper-plane"></i> Subscribe
          </button>
        </form>
        <p class="newsletter-note"><i class="fa fa-lock"></i> No spam. Unsubscribe anytime. We respect your privacy.</p>
      </div>
    </div>
  `;

  const footer = document.querySelector(".footer");
  if (footer) footer.insertAdjacentElement("beforebegin", section);
})();

function handleNewsletter(e) {
  e.preventDefault();
  const emailInput = document.getElementById("newsletter-email");
  if (!emailInput || !emailInput.value) return;

  // Save to localStorage
  const subs = JSON.parse(localStorage.getItem("ngp_newsletter") || "[]");
  if (!subs.includes(emailInput.value)) {
    subs.push(emailInput.value);
    localStorage.setItem("ngp_newsletter", JSON.stringify(subs));
  }

  showToast("You're subscribed! 🎉 Welcome to NepalGadgetsPasal family.", "fa-envelope");
  emailInput.value = "";
}

// ================================================================
// COOKIE CONSENT BANNER
// ================================================================
(function initCookieBanner() {
  if (localStorage.getItem("ngp_cookie_accepted")) return;

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.id = "cookie-banner";
  banner.innerHTML = `
    <i class="fa fa-cookie-bite"></i>
    <div class="cookie-text">
      <p>We use cookies to improve your experience. By continuing, you agree to our <a href="#">Privacy Policy</a>.</p>
    </div>
    <div class="cookie-actions">
      <button class="btn btn-outline" onclick="rejectCookies()" style="padding:8px 16px;font-size:13px;">Decline</button>
      <button class="btn btn-primary" onclick="acceptCookies()" style="padding:8px 16px;font-size:13px;">Accept All</button>
    </div>
  `;
  document.body.appendChild(banner);

  setTimeout(() => banner.classList.add("show"), 2000);
})();

function acceptCookies() {
  localStorage.setItem("ngp_cookie_accepted", "true");
  const b = document.getElementById("cookie-banner");
  if (b) { b.classList.remove("show"); setTimeout(() => b.remove(), 400); }
  showToast("Cookies accepted. Thank you!", "fa-check-circle");
}

function rejectCookies() {
  sessionStorage.setItem("ngp_cookie_rejected", "true");
  const b = document.getElementById("cookie-banner");
  if (b) { b.classList.remove("show"); setTimeout(() => b.remove(), 400); }
}

// ================================================================
// MOBILE BOTTOM NAVIGATION
// ================================================================
(function initMobileBottomNav() {
  const nav = document.createElement("nav");
  nav.className = "mobile-bottom-nav";
  nav.id = "mobile-bottom-nav";
  nav.innerHTML = `
    <div class="mobile-nav-grid">
      <button class="mobile-nav-item active" onclick="scrollToSection('home', this)">
        <i class="fa fa-home"></i>
        <span>Home</span>
      </button>
      <button class="mobile-nav-item" onclick="scrollToSection('categories', this)">
        <i class="fa fa-th-large"></i>
        <span>Categories</span>
      </button>
      <button class="mobile-nav-item" onclick="scrollToSection('shop', this)">
        <i class="fa fa-shopping-bag"></i>
        <span>Shop</span>
      </button>
      <button class="mobile-nav-item" onclick="openWishlistModal(); setMobileNavActive(this)">
        <i class="fa fa-heart"></i>
        <span>Wishlist</span>
        <span class="mobile-nav-badge" id="mob-wishlist-badge">0</span>
      </button>
      <button class="mobile-nav-item" onclick="openCart(); setMobileNavActive(this)">
        <i class="fa fa-shopping-cart"></i>
        <span>Cart</span>
        <span class="mobile-nav-badge" id="mob-cart-badge">0</span>
      </button>
    </div>
  `;
  document.body.appendChild(nav);
})();

function scrollToSection(id, btn) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
  setMobileNavActive(btn);
}

function setMobileNavActive(btn) {
  document.querySelectorAll(".mobile-nav-item").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

// Sync mobile badges with main badges
const _origUpdateBadges = updateBadges;
// Override updateBadges to also update mobile badges
window.updateBadges = function () {
  _origUpdateBadges();
  const totalCart = cart.reduce((s, i) => s + i.qty, 0);
  const mobCart = document.getElementById("mob-cart-badge");
  const mobWish = document.getElementById("mob-wishlist-badge");
  if (mobCart) mobCart.textContent = totalCart;
  if (mobWish) mobWish.textContent = wishlist.length;
};

// ================================================================
// SKELETON LOADERS (shown during initial render)
// ================================================================
function showSkeletons(count = 8) {
  const grid = document.getElementById("products-grid");
  if (!grid) return;
  grid.innerHTML = Array(count).fill(0).map(() => `
    <div class="skeleton">
      <div class="skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton-line short"></div>
        <div class="skeleton-line med"></div>
        <div class="skeleton-line full"></div>
        <div class="skeleton-line short"></div>
        <div class="skeleton-btn"></div>
      </div>
    </div>
  `).join("");
}

// ================================================================
// QUICK VIEW BUTTON ON PRODUCT CARDS
// ================================================================
function addQuickViewButtons() {
  document.querySelectorAll(".product-img-wrap").forEach(wrap => {
    if (wrap.querySelector(".quick-view-btn")) return;
    const card = wrap.closest(".product-card");
    if (!card) return;
    const nameEl = card.querySelector(".product-name");
    if (!nameEl) return;
    const onclick = nameEl.getAttribute("onclick") || "";
    const match = onclick.match(/openProductModal\((\d+)\)/);
    if (!match) return;
    const id = match[1];

    const btn = document.createElement("button");
    btn.className = "quick-view-btn";
    btn.innerHTML = `<i class="fa fa-eye"></i> Quick View`;
    btn.onclick = (e) => { e.stopPropagation(); openProductModal(parseInt(id)); };

    wrap.classList.add("zoomable");
    wrap.appendChild(btn);
  });
}

// ================================================================
// RECENTLY VIEWED TRACKER & SECTION
// ================================================================
const MAX_RECENT = 6;

function trackRecentlyViewed(productId) {
  let recent = JSON.parse(localStorage.getItem("ngp_recent") || "[]");
  recent = recent.filter(id => id !== productId);
  recent.unshift(productId);
  recent = recent.slice(0, MAX_RECENT);
  localStorage.setItem("ngp_recent", JSON.stringify(recent));
}

function renderRecentlyViewed() {
  const recent = JSON.parse(localStorage.getItem("ngp_recent") || "[]");
  if (recent.length < 2) return; // Only show if 2+ viewed

  const section = document.getElementById("recently-viewed-section");
  if (!section) {
    const newSection = document.createElement("section");
    newSection.className = "recently-viewed";
    newSection.id = "recently-viewed-section";
    newSection.innerHTML = `
      <div class="container">
        <div class="section-header" style="margin-bottom:24px;">
          <span class="section-label">Your History</span>
          <h2 class="section-title">Recently <span class="accent">Viewed</span></h2>
        </div>
        <div class="snap-slider" id="recent-slider"></div>
      </div>
    `;
    const footer = document.querySelector(".footer");
    if (footer) footer.insertAdjacentElement("beforebegin", newSection);
  }

  const slider = document.getElementById("recent-slider");
  if (!slider) return;
  slider.innerHTML = "";

  recent.forEach(id => {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return;
    const inWishlist = wishlist.includes(p.id);
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrap zoomable">
        <div class="discount-badge">-${p.discount}%</div>
        <button class="wishlist-heart ${inWishlist ? "active" : ""}" onclick="toggleWishlist(${p.id}, this)">
          <i class="${inWishlist ? "fas" : "far"} fa-heart"></i>
        </button>
        <i class="prod-icon fas ${p.icon}"></i>
        <button class="quick-view-btn" onclick="openProductModal(${p.id})"><i class='fa fa-eye'></i> Quick View</button>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name" onclick="openProductModal(${p.id})">${p.name}</div>
        <div class="product-prices">
          <span class="product-price">${formatPrice(p.price)}</span>
          <span class="product-old-price">${formatPrice(p.oldPrice)}</span>
        </div>
        <button class="btn btn-primary" onclick="addToCart(${p.id})">
          <i class="fa fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    `;
    slider.appendChild(card);
  });
}

// Patch openProductModal to track recent
const _origOpenModal = openProductModal;
window.openProductModal = function (id) {
  trackRecentlyViewed(id);
  renderRecentlyViewed();
  _origOpenModal(id);
};

// ================================================================
// FEATURED BANNER CARDS (inside shop section)
// ================================================================
(function initFeatureBanners() {
  const bannerWrap = document.createElement("div");
  bannerWrap.className = "container";
  bannerWrap.innerHTML = `
    <div class="feature-banners">
      <div class="feature-banner" onclick="document.querySelector('[data-filter=laptops]').click(); document.getElementById('shop').scrollIntoView({behavior:'smooth'})">
        <div class="banner-icon"><i class="fa fa-laptop"></i></div>
        <div class="banner-content">
          <h3>Work From Anywhere</h3>
          <p>Top laptops for remote work & college</p>
          <span class="btn btn-outline" style="padding:8px 18px; font-size:13px;">Shop Laptops →</span>
        </div>
      </div>
      <div class="feature-banner" onclick="document.querySelector('[data-filter=gaming]').click(); document.getElementById('shop').scrollIntoView({behavior:'smooth'})">
        <div class="banner-icon"><i class="fa fa-gamepad"></i></div>
        <div class="banner-content">
          <h3>Level Up Your Game</h3>
          <p>Pro gaming gear at unbeatable prices</p>
          <span class="btn btn-outline" style="padding:8px 18px; font-size:13px;">Shop Gaming →</span>
        </div>
      </div>
    </div>
  `;

  const shopSection = document.getElementById("shop");
  if (shopSection) {
    const container = shopSection.querySelector(".container");
    if (container) container.insertAdjacentElement("beforebegin", bannerWrap);
  }
})();

// ================================================================
// GENERATE ORDER ID
// ================================================================
function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "NGP-";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

// ================================================================
// ENHANCED CHECKOUT — ORDER SUCCESS OVERLAY
// ================================================================
// Patch handleCheckout to show order success screen
const _origHandleCheckout = handleCheckout;
window.handleCheckout = function (e) {
  e.preventDefault();
  const name = document.getElementById("co-name")?.value.trim();
  const phone = document.getElementById("co-phone")?.value.trim();
  const address = document.getElementById("co-address")?.value.trim();
  const city = document.getElementById("co-city")?.value.trim();
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "cod";

  if (!name || !phone || !address || !city) {
    showToast("Please fill all required fields!", "fa-exclamation-circle");
    return;
  }
  if (paymentMethod === "esewa") {
    const txn = document.getElementById("transaction-id")?.value.trim();
    if (!txn) {
      showToast("Please enter eSewa Transaction ID!", "fa-exclamation-circle");
      return;
    }
  }

  const orderId = generateOrderId();

  // Replace checkout content with success message
  const checkoutInner = document.querySelector(".checkout-inner");
  if (checkoutInner) {
    checkoutInner.innerHTML = `
      <div class="order-success">
        <div class="success-icon"><i class="fa fa-check"></i></div>
        <h2>Order Placed! 🎉</h2>
        <p>Thank you, <strong>${name}</strong>! Your order has been received.</p>
        <p>We will contact you on <strong>${phone}</strong> to confirm delivery.</p>
        <div class="order-id">Order ID: ${orderId}</div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:24px;">
          Expected delivery to <strong>${city}</strong> within 1-3 business days.
        </p>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <a href="https://wa.me/9779763332837?text=${encodeURIComponent(`Hello! I just placed order ${orderId}. Name: ${name}, Phone: ${phone}, Address: ${address}, ${city}. Payment: ${paymentMethod.toUpperCase()}.`)}"
             target="_blank" class="btn btn-primary">
            <i class="fab fa-whatsapp"></i> Confirm on WhatsApp
          </a>
          <button class="btn btn-outline" onclick="closeCheckout(); resetCheckoutForm()">
            <i class="fa fa-times"></i> Close
          </button>
        </div>
      </div>
    `;
  }

  // Clear cart
  cart = [];
  saveCart();
  updateBadges();
  renderCart();
};

function resetCheckoutForm() {
  const checkoutInner = document.querySelector(".checkout-inner");
  if (!checkoutInner) return;
  // Reload the page to reset form, or reload checkout
  location.reload();
}

// ================================================================
// WHATSAPP QUICK ORDER (floating button message)
// ================================================================
function buildWhatsAppOrderMessage() {
  if (cart.length === 0) return "";
  let msg = "Hello NepalGadgetsPasal! 🛍️ I'd like to order:\n\n";
  let total = 0;
  cart.forEach(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if (!p) return;
    const sub = p.price * item.qty;
    total += sub;
    msg += `• ${p.name} × ${item.qty} = Rs. ${sub.toLocaleString("en-IN")}\n`;
  });
  msg += `\n*Total: Rs. ${total.toLocaleString("en-IN")}*\n\nPlease confirm availability and delivery details. Thank you!`;
  return msg;
}

// Update WhatsApp floating button dynamically
function updateWhatsAppBtn() {
  const waBtn = document.querySelector(".float-whatsapp");
  if (!waBtn) return;
  if (cart.length > 0) {
    const msg = buildWhatsAppOrderMessage();
    waBtn.href = `https://wa.me/9779763332837?text=${encodeURIComponent(msg)}`;
    waBtn.querySelector(".float-tooltip").textContent = "Order via WhatsApp!";
  } else {
    waBtn.href = "https://wa.me/9779763332837";
    waBtn.querySelector(".float-tooltip").textContent = "Chat with us!";
  }
}

// ================================================================
// PRODUCT CARD ZOOMABLE CLASS INJECTION
// ================================================================
function addZoomableToCards() {
  document.querySelectorAll(".product-img-wrap").forEach(wrap => {
    if (!wrap.classList.contains("zoomable")) wrap.classList.add("zoomable");
  });
}

// ================================================================
// LAZY LOAD IMAGES (for future real images)
// ================================================================
function initLazyLoad() {
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        }
      });
    });
    document.querySelectorAll("img[data-src]").forEach(img => obs.observe(img));
  }
}

// ================================================================
// SECTION SCROLL SPY (update mobile bottom nav)
// ================================================================
(function initScrollSpy() {
  const sections = ["home", "shop", "categories", "deals", "about", "contact"];

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        // Update mobile bottom nav active item
        document.querySelectorAll(".mobile-nav-item").forEach((btn, i) => {
          // Home=0, Categories=1, Shop=2, Wishlist=3, Cart=4
          if (id === "home" && i === 0) btn.classList.add("active");
          else if (id === "categories" && i === 1) btn.classList.add("active");
          else if ((id === "shop" || id === "deals") && i === 2) btn.classList.add("active");
          else if (i < 3) btn.classList.remove("active");
        });
      }
    });
  });
})();

// ================================================================
// SHARE PRODUCT (Web Share API)
// ================================================================
function shareProduct(productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;

  if (navigator.share) {
    navigator.share({
      title: `${p.name} – NepalGadgetsPasal`,
      text: `Check out ${p.name} for only ${formatPrice(p.price)} on NepalGadgetsPasal!`,
      url: window.location.href,
    }).catch(() => {});
  } else {
    // Fallback: copy link
    navigator.clipboard?.writeText(window.location.href);
    showToast("Link copied to clipboard!", "fa-link");
  }
}

// ================================================================
// KEYBOARD SHORTCUT: Ctrl+K = Open search
// ================================================================
document.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    const input = document.getElementById("search-input");
    if (input) {
      input.focus();
      input.select();
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
});

// ================================================================
// ENHANCED INIT — Run all new features after DOM ready
// ================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Small delay to let main DOMContentLoaded run first
  setTimeout(() => {
    // Show skeletons briefly then render
    showSkeletons(8);
    setTimeout(() => {
      renderProducts();
      addQuickViewButtons();
      addZoomableToCards();
      initLazyLoad();
      renderRecentlyViewed();
      updateWhatsAppBtn();
      updateBadges(); // sync mobile badges
    }, 600);
  }, 50);

  // Patch addToCart to update WA button
  const _origAddToCart = addToCart;
  window.addToCart = function (id, qty = 1) {
    _origAddToCart(id, qty);
    updateWhatsAppBtn();
    updateBadges();
  };

  // Patch removeFromCart
  const _origRemove = removeFromCart;
  window.removeFromCart = function (id) {
    _origRemove(id);
    updateWhatsAppBtn();
    updateBadges();
  };
});
