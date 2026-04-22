"use strict";
// ================================================================
// NepalGadgetsPasal — Complete Script (Clean Single File)
// ================================================================

const PRODUCTS = [
  { id:1,  name:"iPhone 15 Pro",         brand:"Apple",    cat:"smartphones",  price:189900, old:219900, disc:14, rating:4.9, rev:892,  icon:"fa-mobile-alt",     img:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=320&h=320&fit=crop&auto=format&q=75", desc:"Titanium design, A17 Pro chip, 48MP camera, up to 29hr video playback. Available in Natural, Black, White and Blue Titanium.", specs:[["Display","6.1\" Super Retina XDR"],["Chip","A17 Pro Bionic"],["Camera","48MP + 12MP + 12MP"],["Battery","Up to 23 hr"],["Storage","128GB / 256GB / 512GB"],["OS","iOS 17"]] },
  { id:2,  name:"Samsung Galaxy S24",    brand:"Samsung",  cat:"smartphones",  price:109900, old:129900, disc:15, rating:4.7, rev:643,  icon:"fa-mobile-alt",     img:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=320&h=320&fit=crop&auto=format&q=75", desc:"Galaxy AI features, 50MP camera with 30x Space Zoom, Snapdragon 8 Gen 3. The smartest Galaxy ever.", specs:[["Display","6.2\" Dynamic AMOLED 2X"],["Chip","Snapdragon 8 Gen 3"],["Camera","50MP + 10MP + 12MP"],["Battery","4000 mAh"],["Storage","128GB / 256GB"],["OS","Android 14"]] },
  { id:3,  name:"MacBook Air M3",        brand:"Apple",    cat:"laptops",      price:169900, old:189900, disc:11, rating:4.9, rev:412,  icon:"fa-laptop",         img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=320&h=320&fit=crop&auto=format&q=75", desc:"11.5mm thin, 1.24kg, M3 chip, up to 18 hours battery. The world's best consumer laptop.", specs:[["Chip","Apple M3"],["Display","13.6\" Liquid Retina"],["RAM","8GB / 16GB / 24GB"],["Storage","256GB – 2TB SSD"],["Battery","Up to 18 hr"],["Weight","1.24 kg"]] },
  { id:4,  name:"Dell XPS 15",           brand:"Dell",     cat:"laptops",      price:229900, old:259900, disc:12, rating:4.6, rev:287,  icon:"fa-laptop",         img:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=320&h=320&fit=crop&auto=format&q=75", desc:"15.6\" OLED display, Intel Core i7, NVIDIA RTX 4060. The ultimate Windows laptop for creators.", specs:[["Processor","Intel Core i7-13700H"],["Display","15.6\" OLED 3.5K"],["RAM","16GB DDR5"],["Storage","512GB NVMe SSD"],["GPU","NVIDIA RTX 4060"],["Battery","86Whr"]] },
  { id:5,  name:"Sony WH-1000XM5",       brand:"Sony",     cat:"earbuds",      price:44900,  old:54900,  disc:18, rating:4.8, rev:1204, icon:"fa-headphones-alt", img:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=320&h=320&fit=crop&auto=format&q=75", desc:"Industry-leading noise cancellation, 30hr battery, V1 chip for crystal clear calls. Headphones perfected.", specs:[["Driver","30mm Dome"],["ANC","Industry Best"],["Battery","30 hr ANC on"],["Charging","USB-C Quick Charge"],["Bluetooth","5.2"],["Weight","250g"]] },
  { id:6,  name:"Apple Watch Series 9",  brand:"Apple",    cat:"smartwatches", price:59900,  old:69900,  disc:14, rating:4.8, rev:723,  icon:"fa-clock",          img:"https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=320&h=320&fit=crop&auto=format&q=75", desc:"S9 chip, brighter always-on display, double tap gesture, ECG and blood oxygen sensors.", specs:[["Chip","Apple S9 SiP"],["Display","Always-On LTPO OLED"],["Battery","Up to 18 hr"],["Water","50m"],["Health","ECG, Blood O2"],["Bluetooth","5.3"]] },
  { id:7,  name:"JBL Charge 5",          brand:"JBL",      cat:"speakers",     price:19900,  old:24900,  disc:20, rating:4.7, rev:956,  icon:"fa-volume-up",      img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=320&h=320&fit=crop&auto=format&q=75", desc:"40W Pro Sound, 20hr playtime, IP67 waterproof, built-in powerbank. Sound anywhere, anytime.", specs:[["Output","40W"],["Battery","20 hr"],["Waterproof","IP67"],["Bluetooth","5.1"],["PartyBoost","Yes"],["Weight","960g"]] },
  { id:8,  name:"Logitech G502 X",       brand:"Logitech", cat:"gaming",       price:12900,  old:15900,  disc:19, rating:4.6, rev:574,  icon:"fa-gamepad",        img:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=320&h=320&fit=crop&auto=format&q=75", desc:"LIGHTFORCE hybrid switches, HERO 25K sensor, 13 programmable buttons. Engineered for champions.", specs:[["Sensor","HERO 25K"],["DPI","100-25,600"],["Switches","LIGHTFORCE"],["Buttons","13 Prog."],["Weight","89g"],["Interface","USB"]] },
  { id:9,  name:"OnePlus 12",            brand:"OnePlus",  cat:"smartphones",  price:89900,  old:99900,  disc:10, rating:4.6, rev:398,  icon:"fa-mobile-alt",     img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=320&h=320&fit=crop&auto=format&q=75", desc:"Snapdragon 8 Gen 3, Hasselblad cameras, 100W SUPERVOOC, 5400mAh battery. Never compromise on performance.", specs:[["Display","6.82\" AMOLED"],["Chip","Snapdragon 8 Gen 3"],["Camera","50MP Hasselblad"],["Battery","5400mAh / 100W"],["Storage","256 / 512GB"],["OS","OxygenOS 14"]] },
  { id:10, name:"GoPro Hero 12",         brand:"GoPro",    cat:"cameras",      price:54900,  old:64900,  disc:15, rating:4.7, rev:329,  icon:"fa-camera",         img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=320&h=320&fit=crop&auto=format&q=75", desc:"5.3K60 video, 27MP photos, HyperSmooth 6.0, waterproof to 10m. Capture every adventure.", specs:[["Video","5.3K60 / 4K120"],["Photo","27MP"],["Stabilization","HyperSmooth 6.0"],["Waterproof","10m"],["Battery","1720mAh"],["Weight","154g"]] },
  { id:11, name:"Samsung Galaxy Watch 6",brand:"Samsung",  cat:"smartwatches", price:39900,  old:49900,  disc:20, rating:4.5, rev:412,  icon:"fa-clock",          img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=320&h=320&fit=crop&auto=format&q=75", desc:"Advanced sleep analysis, BIA body composition, sapphire crystal glass, 40hr battery life.", specs:[["Display","1.3\" Super AMOLED"],["Processor","Exynos W930"],["Battery","40 hr"],["Water","5ATM + IP68"],["Health","BIA, ECG, SpO2"],["OS","Wear OS 4"]] },
  { id:12, name:"JBL Tune Buds",         brand:"JBL",      cat:"earbuds",      price:8900,   old:11900,  disc:25, rating:4.4, rev:863,  icon:"fa-headphones-alt", img:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=320&h=320&fit=crop&auto=format&q=75", desc:"48hr total battery, Active Noise Cancelling, 4 mics, JBL Pure Bass Sound at an incredible price.", specs:[["Battery (Bud)","10hr ANC"],["Battery (Total)","48hr"],["ANC","Yes"],["Driver","10mm"],["Bluetooth","5.3"],["Water","IPX4"]] }
];

// State
let cart     = JSON.parse(localStorage.getItem("ngp_cart")||"[]");
let wishlist = JSON.parse(localStorage.getItem("ngp_wish")||"[]");

// Helpers
const Rs      = n => "Rs. "+n.toLocaleString("en-IN");
const saveCart= () => localStorage.setItem("ngp_cart",JSON.stringify(cart));
const saveWish= () => localStorage.setItem("ngp_wish",JSON.stringify(wishlist));

function toast(msg, icon="fa-check-circle") {
  const t = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  t.querySelector("i").className = "fa "+icon;
  t.classList.add("show");
  clearTimeout(t._t);
  t._t = setTimeout(()=>t.classList.remove("show"), 3000);
}

function updateBadges() {
  const ct = cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById("cart-count").textContent  = ct;
  document.getElementById("wish-count").textContent  = wishlist.length;
  const mc=document.getElementById("mb-cart"); if(mc) mc.textContent=ct;
  const mw=document.getElementById("mb-wish"); if(mw) mw.textContent=wishlist.length;
}

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({behavior:"smooth",block:"start"});
}

function genOrderId() {
  return "NGP-"+Math.random().toString(36).toUpperCase().slice(2,10);
}

function starsHtml(r) {
  let h="";
  for(let i=1;i<=5;i++){
    if(r>=i) h+=`<i class="fas fa-star"></i>`;
    else if(r>=i-0.5) h+=`<i class="fas fa-star-half-alt"></i>`;
    else h+=`<i class="far fa-star"></i>`;
  }
  return h+`<span>(${r})</span>`;
}

// ---- RENDER PRODUCTS ----
function renderProducts(filter="all") {
  const grid = document.getElementById("products-grid");
  if (!grid) return;
  const list = filter==="all" ? PRODUCTS : PRODUCTS.filter(p=>p.cat===filter);
  if (!list.length) {
    grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted)"><i class="fa fa-box-open" style="font-size:44px;opacity:0.2;display:block;margin-bottom:14px"></i>No products in this category yet.</div>`;
    return;
  }
  grid.innerHTML = list.map((p,i)=>{
    const iw=wishlist.includes(p.id);
    return `<div class="pcard" style="animation:fadein 0.4s ease ${i*0.04}s both">
      <div class="pimg">
        <span class="disc-badge">-${p.disc}%</span>
        <button class="wish-btn ${iw?"on":""}" onclick="toggleWish(${p.id},this)">
          <i class="${iw?"fas":"far"} fa-heart"></i>
        </button>
        <img src="${p.img}" alt="${p.name}" loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
        <i class="fas ${p.icon} fallback-icon"></i>
        <button class="qview-btn" onclick="openModal(${p.id})"><i class='fa fa-eye'></i> Quick View</button>
      </div>
      <div class="pinfo">
        <div class="pbrand">${p.brand}</div>
        <div class="pname" onclick="openModal(${p.id})">${p.name}</div>
        <div class="pstars">${starsHtml(p.rating)}</div>
        <div class="pprices"><span class="pprice">${Rs(p.price)}</span><span class="pold">${Rs(p.old)}</span></div>
        <button class="btn-primary" onclick="addToCart(${p.id})"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
      </div>
    </div>`;
  }).join("");
}

// ---- FILTER TABS ----
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".ftab").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".ftab").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.filter);
    });
  });
  document.querySelectorAll(".cat-card").forEach(card=>{
    card.addEventListener("click",()=>{
      const f=card.dataset.filter;
      document.getElementById("shop").scrollIntoView({behavior:"smooth"});
      setTimeout(()=>{
        document.querySelectorAll(".ftab").forEach(b=>b.classList.toggle("active",b.dataset.filter===f));
        renderProducts(f);
      },450);
    });
  });
});

// ---- CART ----
function addToCart(id,qty=1) {
  const p=PRODUCTS.find(x=>x.id===id); if(!p) return;
  const ex=cart.find(x=>x.id===id);
  if(ex) ex.qty+=qty; else cart.push({id,qty});
  saveCart(); updateBadges(); renderCart(); updateWABtn();
  toast(`${p.name} added to cart!`);
}

function removeFromCart(id) {
  cart=cart.filter(x=>x.id!==id);
  saveCart(); updateBadges(); renderCart(); updateWABtn();
}

function updateQty(id,delta) {
  const item=cart.find(x=>x.id===id); if(!item) return;
  item.qty=Math.max(1,item.qty+delta);
  saveCart(); updateBadges(); renderCart(); updateWABtn();
}

function renderCart() {
  const wrap=document.getElementById("cart-items-wrap");
  const empty=document.getElementById("empty-cart");
  const footer=document.getElementById("cart-footer");
  const totEl=document.getElementById("cart-total-amt");
  if(!wrap) return;
  wrap.querySelectorAll(".cart-item").forEach(el=>el.remove());
  if(!cart.length){
    empty.style.display="flex"; footer.style.display="none"; return;
  }
  empty.style.display="none";
  let total=0;
  cart.forEach(item=>{
    const p=PRODUCTS.find(x=>x.id===item.id); if(!p) return;
    total+=p.price*item.qty;
    const el=document.createElement("div");
    el.className="cart-item";
    el.innerHTML=`<div class="ci-img"><img src="${p.img}" alt="${p.name}" onerror="this.parentElement.innerHTML='<i class=\\'fas ${p.icon}\\'></i>'"/></div>
      <div class="ci-info">
        <h4>${p.name}</h4>
        <div class="ci-price">${Rs(p.price)}</div>
        <div class="ci-ctrl">
          <button class="qbtn" onclick="updateQty(${p.id},-1)">−</button>
          <span class="qdisplay">${item.qty}</span>
          <button class="qbtn" onclick="updateQty(${p.id},1)">+</button>
          <button class="ci-del" onclick="removeFromCart(${p.id})"><i class="fa fa-trash"></i></button>
        </div>
      </div>`;
    wrap.appendChild(el);
  });
  totEl.textContent=Rs(total);
  footer.style.display="block";
}

function openCart(){
  document.getElementById("cart-sidebar").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
  document.body.style.overflow="hidden";
}
function closeCart(){
  document.getElementById("cart-sidebar").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
  document.body.style.overflow="";
}

// ---- WISHLIST ----
function toggleWish(id,btn) {
  const p=PRODUCTS.find(x=>x.id===id); if(!p) return;
  if(wishlist.includes(id)){
    wishlist=wishlist.filter(x=>x!==id);
    if(btn){btn.classList.remove("on");btn.innerHTML=`<i class="far fa-heart"></i>`;}
    toast(`${p.name} removed from wishlist`,"fa-heart-broken");
  } else {
    wishlist.push(id);
    if(btn){btn.classList.add("on");btn.innerHTML=`<i class="fas fa-heart"></i>`;}
    toast(`${p.name} added to wishlist!`,"fa-heart");
  }
  saveWish(); updateBadges();
}

function openWishlist(){
  const body=document.getElementById("wish-body"); if(!body) return;
  if(!wishlist.length){
    body.innerHTML=`<div style="text-align:center;padding:48px;color:var(--muted)"><i class="fa fa-heart" style="font-size:44px;opacity:0.15;display:block;margin-bottom:14px"></i><p>Your wishlist is empty.</p></div>`;
  } else {
    body.innerHTML=wishlist.map(id=>{
      const p=PRODUCTS.find(x=>x.id===id); if(!p) return "";
      return `<div class="cart-item">
        <div class="ci-img"><img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'"/></div>
        <div class="ci-info">
          <h4>${p.name}</h4>
          <div class="ci-price">${Rs(p.price)}</div>
          <div class="ci-ctrl" style="margin-top:6px">
            <button class="btn-primary" style="padding:5px 12px;font-size:12px" onclick="addToCart(${p.id});closeWishlist()"><i class="fa fa-cart-plus"></i> Add to Cart</button>
            <button class="ci-del" onclick="toggleWish(${p.id});openWishlist()"><i class="fa fa-trash"></i></button>
          </div>
        </div>
      </div>`;
    }).join("");
  }
  document.getElementById("wish-modal").classList.add("open");
  document.getElementById("wish-overlay").classList.add("open");
  document.body.style.overflow="hidden";
}
function closeWishlist(){
  document.getElementById("wish-modal").classList.remove("open");
  document.getElementById("wish-overlay").classList.remove("open");
  document.body.style.overflow="";
}

// ---- PRODUCT MODAL ----
function openModal(id) {
  const p=PRODUCTS.find(x=>x.id===id); if(!p) return;
  const iw=wishlist.includes(id);
  document.getElementById("modal-body").innerHTML=`
    <div class="modal-grid">
      <div class="modal-img">
        <img src="${p.img}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
        <i class="fas ${p.icon} mfallback"></i>
      </div>
      <div>
        <div class="mbrand">${p.brand}</div>
        <div class="mname">${p.name}</div>
        <div class="pstars" style="margin-bottom:12px">${starsHtml(p.rating)}</div>
        <p class="mdesc">${p.desc}</p>
        <div class="mspecs"><h4>Specifications</h4>${p.specs.map(s=>`<div class="spec-row"><span>${s[0]}</span><span>${s[1]}</span></div>`).join("")}</div>
        <div class="mprices">
          <span class="mprice">${Rs(p.price)}</span>
          <span class="mold">${Rs(p.old)}</span>
          <span class="mdisc">-${p.disc}%</span>
        </div>
        <div class="qty-row">
          <label>Quantity:</label>
          <div class="qty-ctrl">
            <button onclick="chQty(-1)">−</button>
            <input type="number" id="modal-qty" value="1" min="1" max="99"/>
            <button onclick="chQty(1)">+</button>
          </div>
        </div>
        <div class="mbtns">
          <button class="btn-primary" onclick="addToCartModal(${p.id})"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
          <button class="btn-glass" onclick="buyNow(${p.id})"><i class="fa fa-bolt"></i> Buy Now</button>
          <button class="btn-outline" id="mwbtn" onclick="toggleWish(${p.id},null);refreshMWish(${p.id})" style="${iw?"color:var(--danger);border-color:var(--danger)":""}"><i class="${iw?"fas":"far"} fa-heart"></i></button>
        </div>
      </div>
    </div>`;
  document.getElementById("product-modal").classList.add("open");
  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow="hidden";
}
function refreshMWish(id){
  const btn=document.getElementById("mwbtn"); if(!btn) return;
  const iw=wishlist.includes(id);
  btn.style.color=iw?"var(--danger)":"";
  btn.style.borderColor=iw?"var(--danger)":"";
  btn.innerHTML=`<i class="${iw?"fas":"far"} fa-heart"></i>`;
}
function chQty(d){const i=document.getElementById("modal-qty");if(i)i.value=Math.max(1,parseInt(i.value||1)+d);}
function addToCartModal(id){const q=parseInt(document.getElementById("modal-qty")?.value||1);addToCart(id,q);closeModal();}
function buyNow(id){const q=parseInt(document.getElementById("modal-qty")?.value||1);addToCart(id,q);closeModal();setTimeout(openCheckout,300);}
function closeModal(){
  document.getElementById("product-modal").classList.remove("open");
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow="";
}

// ---- CHECKOUT ----
function openCheckout(){
  if(!cart.length){toast("Your cart is empty!","fa-exclamation-circle");return;}
  const sumEl=document.getElementById("co-summary");
  const totEl=document.getElementById("co-total-amt");
  if(!sumEl) return;
  let total=0;
  sumEl.innerHTML=cart.map(item=>{
    const p=PRODUCTS.find(x=>x.id===item.id); if(!p) return "";
    const sub=p.price*item.qty; total+=sub;
    return `<div class="co-summary-item"><span>${p.name} × ${item.qty}</span><span>${Rs(sub)}</span></div>`;
  }).join("");
  totEl.textContent=Rs(total);
  closeCart();
  document.getElementById("checkout-modal").classList.add("open");
  document.getElementById("checkout-overlay").classList.add("open");
  document.body.style.overflow="hidden";
}
function closeCheckout(){
  document.getElementById("checkout-modal").classList.remove("open");
  document.getElementById("checkout-overlay").classList.remove("open");
  document.body.style.overflow="";
}
function toggleEsewa(val){
  const box=document.getElementById("esewa-box");
  if(box) box.style.display=val==="esewa"?"block":"none";
}
function placeOrder(e){
  e.preventDefault();
  const name=document.getElementById("co-name")?.value.trim();
  const phone=document.getElementById("co-phone")?.value.trim();
  const address=document.getElementById("co-address")?.value.trim();
  const city=document.getElementById("co-city")?.value.trim();
  const pay=document.querySelector('input[name="pay"]:checked')?.value||"cod";
  if(!name||!phone||!address||!city){toast("Please fill all required fields!","fa-exclamation-circle");return;}
  if(pay==="esewa"&&!document.getElementById("txn-id")?.value.trim()){
    toast("Please enter eSewa Transaction ID!","fa-exclamation-circle");return;
  }
  const oid=genOrderId();
  let total=cart.reduce((s,i)=>{const p=PRODUCTS.find(x=>x.id===i.id);return s+(p?p.price*i.qty:0);},0);
  let waMsg=`Hello NepalGadgetsPasal! 🛍\n\n*Order ID:* ${oid}\n*Name:* ${name}\n*Phone:* ${phone}\n*Address:* ${address}, ${city}\n*Payment:* ${pay.toUpperCase()}\n\n*Items:*\n`;
  cart.forEach(i=>{const p=PRODUCTS.find(x=>x.id===i.id);if(p)waMsg+=`• ${p.name} × ${i.qty} = ${Rs(p.price*i.qty)}\n`;});
  waMsg+=`\n*Total: ${Rs(total)}*`;
  document.getElementById("checkout-body").innerHTML=`
    <div class="order-success">
      <div class="success-anim"><i class="fa fa-check"></i></div>
      <h2 style="font-size:26px;font-weight:800;margin-bottom:10px">Order Placed! 🎉</h2>
      <p style="color:var(--muted)">Thank you, <strong>${name}</strong>! Your order has been received.</p>
      <p style="color:var(--muted);margin-top:6px">We'll contact you on <strong>${phone}</strong> to confirm.</p>
      <div class="order-id-box">${oid}</div>
      <p style="font-size:13px;color:var(--muted);margin-bottom:22px">Estimated delivery to <strong>${city}</strong>: 1–3 business days</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <a href="https://wa.me/9779763332837?text=${encodeURIComponent(waMsg)}" target="_blank" class="btn-primary"><i class="fab fa-whatsapp"></i> Confirm on WhatsApp</a>
        <button class="btn-outline" onclick="closeCheckout();location.reload()"><i class="fa fa-times"></i> Close</button>
      </div>
    </div>`;
  cart=[]; saveCart(); updateBadges(); renderCart();
}

// ---- SEARCH ----
document.addEventListener("DOMContentLoaded",()=>{
  const input=document.getElementById("search-input");
  const drop=document.getElementById("search-drop");
  if(!input||!drop) return;
  input.addEventListener("input",()=>{
    const q=input.value.trim().toLowerCase();
    if(!q){drop.classList.remove("open");return;}
    const m=PRODUCTS.filter(p=>p.name.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q)||p.cat.includes(q)).slice(0,6);
    drop.innerHTML=!m.length
      ?`<div class="sdr" style="justify-content:center;color:var(--muted)">No results</div>`
      :m.map(p=>`<div class="sdr" onclick="openModal(${p.id});closeSearch()"><div class="sdr-icon"><i class="fas ${p.icon}"></i></div><div class="sdr-info"><p>${p.name}</p><span>${Rs(p.price)}</span></div></div>`).join("");
    drop.classList.add("open");
  });
  input.addEventListener("keydown",e=>{if(e.key==="Escape")closeSearch();});
  document.addEventListener("click",e=>{if(!input.contains(e.target)&&!drop.contains(e.target))closeSearch();});
  document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key==="k"){e.preventDefault();input.focus();input.select();}});
});
function closeSearch(){
  const i=document.getElementById("search-input");
  const d=document.getElementById("search-drop");
  if(d)d.classList.remove("open");
  if(i)i.value="";
}

// ---- COUNTDOWN ----
function startCountdown(){
  function upd(){
    const now=new Date(),end=new Date(now);
    end.setHours(23,59,59,0);
    if(now>=end)end.setDate(end.getDate()+1);
    const diff=end-now;
    const h=Math.floor(diff/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
    const eh=document.getElementById("chours"),em=document.getElementById("cmins"),es=document.getElementById("csecs");
    if(eh)eh.textContent=String(h).padStart(2,"0");
    if(em)em.textContent=String(m).padStart(2,"0");
    if(es)es.textContent=String(s).padStart(2,"0");
  }
  upd(); setInterval(upd,1000);
}

// ---- DARK MODE ----
function initTheme(){
  const btn=document.getElementById("theme-btn");
  const icon=document.getElementById("theme-icon");
  const html=document.documentElement;
  const saved=localStorage.getItem("ngp_theme")||"dark";
  html.setAttribute("data-theme",saved);
  icon.className=saved==="light"?"fa fa-moon":"fa fa-sun";
  btn?.addEventListener("click",()=>{
    const cur=html.getAttribute("data-theme"),next=cur==="dark"?"light":"dark";
    html.setAttribute("data-theme",next);
    localStorage.setItem("ngp_theme",next);
    icon.className=next==="light"?"fa fa-moon":"fa fa-sun";
    toast(next==="light"?"Light mode on ☀️":"Dark mode on 🌙","fa-adjust");
  });
}

// ---- NAVBAR ----
function initNavbar(){
  const nav=document.getElementById("navbar");
  const hbg=document.getElementById("hamburger");
  const links=document.getElementById("nav-links");
  window.addEventListener("scroll",()=>{
    nav.classList.toggle("scrolled",window.scrollY>20);
    document.getElementById("scroll-top")?.classList.toggle("on",window.scrollY>400);
    ["home","shop","categories","deals","about","contact"].forEach(id=>{
      const el=document.getElementById(id); if(!el) return;
      const r=el.getBoundingClientRect();
      document.querySelectorAll(`.nl[href="#${id}"]`).forEach(a=>a.classList.toggle("active",r.top<=90&&r.bottom>90));
    });
  });
  hbg?.addEventListener("click",()=>{hbg.classList.toggle("open");links.classList.toggle("open");});
  links?.querySelectorAll(".nl").forEach(a=>a.addEventListener("click",()=>{hbg.classList.remove("open");links.classList.remove("open");}));
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click",e=>{
      const t=document.querySelector(a.getAttribute("href"));
      if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:"smooth"});}
    });
  });
}

// ---- LOGIN ----
document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("login-btn")?.addEventListener("click",()=>{
    document.getElementById("login-modal").classList.add("open");
    document.getElementById("login-overlay").classList.add("open");
    document.body.style.overflow="hidden";
  });
  document.getElementById("cart-btn")?.addEventListener("click",openCart);
  document.getElementById("wish-btn")?.addEventListener("click",openWishlist);
});
function closeLogin(){
  document.getElementById("login-modal").classList.remove("open");
  document.getElementById("login-overlay").classList.remove("open");
  document.body.style.overflow="";
}

// ---- CONTACT FORM ----
function submitContact(e){e.preventDefault();toast("Message sent! We'll reply soon 😊","fa-paper-plane");e.target.reset();}

// ---- WA BUTTON ----
function updateWABtn(){
  const btn=document.getElementById("wa-float"); if(!btn) return;
  if(cart.length){
    let msg="Hello NepalGadgetsPasal! 🛍\n\nI'd like to order:\n\n";
    let total=0;
    cart.forEach(i=>{const p=PRODUCTS.find(x=>x.id===i.id);if(p){const s=p.price*i.qty;total+=s;msg+=`• ${p.name} × ${i.qty} = ${Rs(s)}\n`;}});
    msg+=`\n*Total: ${Rs(total)}*\n\nPlease confirm!`;
    btn.href=`https://wa.me/9779763332837?text=${encodeURIComponent(msg)}`;
    btn.querySelector(".wa-tip").textContent="Order via WhatsApp!";
  } else {
    btn.href="https://wa.me/9779763332837";
    btn.querySelector(".wa-tip").textContent="Chat with us!";
  }
}

// ---- SCROLL ANIMATIONS ----
function initAnimations(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.style.opacity="1";e.target.style.transform="translateY(0)";obs.unobserve(e.target);}
    });
  },{threshold:0.1});
  document.querySelectorAll(".cat-card,.trust-item,.tcard,.afeat,.astat,.citem").forEach((el,i)=>{
    el.style.opacity="0";el.style.transform="translateY(18px)";
    el.style.transition=`opacity 0.5s ease ${i*0.04}s,transform 0.5s ease ${i*0.04}s`;
    obs.observe(el);
  });
}

// ---- LOADER — show briefly then hide ----
(function(){
  // Hide loader after max 2s OR when page is ready — whichever comes first
  function hideLoader(){
    const l=document.getElementById("loader");
    if(l) l.classList.add("gone");
  }
  // If page loads fast
  window.addEventListener("load", function(){ setTimeout(hideLoader, 600); });
  // Fallback — never block user more than 2.5s
  setTimeout(hideLoader, 2500);
})();

// ---- CSS keyframe ----
document.head.insertAdjacentHTML("beforeend","<style>@keyframes fadein{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}</style>");

// ---- KEYBOARD ----
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){closeModal();closeCart();closeWishlist();closeCheckout();closeLogin();closeSearch();}
});

// ---- INIT ----
document.addEventListener("DOMContentLoaded",()=>{
  initTheme();
  initNavbar();
  initAnimations();
  startCountdown();
  renderProducts();
  renderCart();
  updateBadges();
  updateWABtn();
});
