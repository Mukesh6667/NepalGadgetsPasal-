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
