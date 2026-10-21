// =====================================================================
//  单页应用：hash 路由 + 数据驱动 + 动效
// =====================================================================

const TYPE_MAP = { research: "research", projects: "projects", services: "services" };
const TYPE_NAME = { research: "研究方向", projects: "项目", services: "服务" };

function esc(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 注入 SVG 渐变定义（卡片图标 stroke 用）
function injectDefs() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.style.position = "absolute";
  svg.innerHTML =
    '<defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#06B6D4"/><stop offset="1" stop-color="#A855F7"/></linearGradient></defs>';
  document.body.appendChild(svg);
}

function iconHTML(icon) {
  return icon ? `<div class="icon"><svg viewBox="0 0 24 24">${icon}</svg></div>` : "";
}

function tagsHTML(tags) {
  if (!tags || !tags.length) return "";
  return tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("");
}

function renderBrand() {
  document.querySelectorAll(".brand-mark").forEach((m) => (m.textContent = SITE_DATA.site.title.charAt(0)));
  document.querySelectorAll(".brand-name .n").forEach((n) => (n.textContent = SITE_DATA.site.title));
  document.querySelectorAll(".brand-name .s").forEach((s) => (s.textContent = SITE_DATA.site.sub));
}

function renderNav(active) {
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.classList.toggle("active", a.dataset.nav === active);
  });
}

function renderFooter() {
  const p = SITE_DATA.profile;
  document.querySelectorAll("#year").forEach((el) => (el.textContent = new Date().getFullYear()));
  document.querySelectorAll("#foot-email").forEach((a) => {
    a.href = "mailto:" + p.email;
    a.textContent = p.email;
  });
  document.querySelectorAll("#foot-github").forEach((a) => (a.href = p.github));
}

// =====================================================================
//  About 视图
// =====================================================================
function renderAbout() {
  const p = SITE_DATA.profile;

  document.getElementById("hero-eyebrow").textContent = p.eyebrow;
  document.getElementById("hero-h1").innerHTML =
    `你好，我是 <span class="grad">${esc(p.name)}</span>。<br>专注深度学习算法的<span class="grad">${esc(p.role)}</span>。`;
  document.getElementById("hero-lede").innerHTML = p.lede;
  document.getElementById("cta-row").innerHTML =
    `<span class="contact-chip"><span class="k">EMAIL</span>${esc(p.email)}</span>
     <span class="contact-chip"><span class="k">TEL</span>${esc(p.phone)}</span>
     <a class="btn" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub ↗</a>`;

  document.getElementById("bio").innerHTML = p.bio
    .map((b) => `<p><strong>${esc(b.title)}</strong> ${b.text}</p>`)
    .join("");

  document.getElementById("meta-strip").innerHTML = p.meta
    .map((m) => `<div class="meta-cell"><div class="k">${esc(m.k)}</div><div class="v">${esc(m.v)}</div></div>`)
    .join("");

  document.getElementById("timeline").innerHTML = p.education
    .map((e, i, arr) => {
      const line = i < arr.length - 1 ? '<div class="tl-line"></div>' : "";
      return `<div class="tl-time">${esc(e.time)}</div>
        <div class="tl-axis"><div class="tl-dot"></div>${line}</div>
        <div class="tl-body"><div class="t">${esc(e.title)}</div><div class="d">${esc(e.desc)}</div></div>`;
    })
    .join("");

  document.getElementById("tech").innerHTML = p.tech
    .map((t) => `<span class="tag${t.v ? " v" : ""}${t.f ? " f" : ""}">${esc(t.name)}</span>`)
    .join("");

  // 统计条（数字滚动）
  const stats = [
    { n: SITE_DATA.projects.length, label: "PROJECTS", href: "#/projects" },
    { n: SITE_DATA.research.length, label: "RESEARCH", href: "#/research" },
    { n: SITE_DATA.services.length, label: "SERVICES", href: "#/services" },
  ];
  document.getElementById("stats-row").innerHTML = stats
    .map((s) => `<a class="stat-card" href="${s.href}">
      <div class="num" data-count="${s.n}">0</div>
      <div class="label">${s.label}</div>
    </a>`)
    .join("");
  animateCount();
}

// =====================================================================
//  列表视图
// =====================================================================
function renderListPage(type) {
  const list = SITE_DATA[type] || [];
  const grid = document.getElementById("grid-" + type);

  grid.innerHTML = list
    .map((item, i) => {
      let card;
      if (type === "projects") {
        const cover = item.cover
          ? `<img src="${esc(item.cover)}" alt="${esc(item.title)}">`
          : `cover image placeholder · 待补充`;
        const link = item.links && item.links.length
          ? `<a class="link" href="${esc(item.links[0].url)}" target="_blank" rel="noopener">${esc(item.links[0].label)} ↗</a>`
          : "";
        card = `<div class="card clickable" data-type="${type}" data-id="${esc(item.id)}">
          <div class="proj-head"><h3>${esc(item.title)}</h3><span class="year">${esc(item.year)}</span></div>
          <p>${item.desc}</p>
          <div class="proj-cover">${cover}</div>
          <div class="foot"><span class="tags" style="margin-top:0">${tagsHTML(item.tags)}</span>${link}</div>
        </div>`;
      } else if (type === "services") {
        const link = `<button class="link-btn" data-action="contact">${esc(item.linkLabel)}</button>`;
        card = `<div class="card clickable" data-type="${type}" data-id="${esc(item.id)}">
          ${iconHTML(item.icon)}
          <h3>${esc(item.title)}</h3>
          <p>${item.desc}</p>
          <div class="foot"><span class="price">${esc(item.price)}</span>${link}</div>
        </div>`;
      } else {
        card = `<div class="card clickable" data-type="${type}" data-id="${esc(item.id)}">
          ${iconHTML(item.icon)}
          <div class="sub">${esc(item.sub)}</div>
          <h3>${esc(item.title)}</h3>
          <p>${item.desc}</p>
          <div class="foot"><span class="tags" style="margin-top:0">${tagsHTML(item.tags)}</span></div>
        </div>`;
      }
      return `<div class="reveal" style="animation-delay:${i * 0.08}s">${card}</div>`;
    })
    .join("");
}

// =====================================================================
//  详情视图 #/detail/research/research-1
// =====================================================================
function renderDetailPage(type, id) {
  const item = SITE_DATA[type]?.find((x) => x.id === id);
  const root = document.getElementById("detail-root");

  if (!item) {
    root.innerHTML = `<p class="page-intro">未找到内容，链接可能已失效。<br><a class="back" href="#/about">← 返回首页</a></p>`;
    return;
  }

  document.title = item.title + " · " + SITE_DATA.site.title;

  const cover = item.cover
    ? `<img src="${esc(item.cover)}" alt="${esc(item.title)}">`
    : `cover image placeholder · 待补充`;
  const year = item.year || "";
  const gallery = item.images && item.images.length
    ? `<div class="gallery">${item.images.map((img) => `<figure><img src="${esc(img)}" alt="" loading="lazy"></figure>`).join("")}</div>`
    : "";
  const links = item.links && item.links.length
    ? `<div class="detail-links">${item.links.map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>`
    : "";

  root.innerHTML = `
    <a class="back" href="#/${type}">← 返回${TYPE_NAME[type]}</a>
    <article class="detail reveal">
      <div class="detail-cover">${cover}</div>
      <div class="detail-meta">
        <span class="year">${esc(year)}</span>
        <span class="tags" style="margin-top:0">${tagsHTML(item.tags)}</span>
      </div>
      <h1>${esc(item.title)}</h1>
      <div class="summary">${item.desc || ""}</div>
      <div class="detail-content">${(item.content || []).map((p) => `<p>${p}</p>`).join("")}</div>
      ${gallery}
      ${links}
    </article>`;
}

// =====================================================================
//  动效
// =====================================================================

// 漂浮光斑背景
function initBackground() {
  const wrap = document.createElement("div");
  wrap.className = "bg-blobs";
  wrap.innerHTML = `<div class="blob blob-1"></div><div class="blob blob-2"></div><div class="blob blob-3"></div>`;
  document.body.prepend(wrap);
}

// 鼠标跟随柔光
function initCursorGlow() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);
  let x = window.innerWidth / 2, y = window.innerHeight / 3, tx = x, ty = y;
  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  (function loop() {
    x += (tx - x) * 0.1;
    y += (ty - y) * 0.1;
    glow.style.transform = `translate(${x - 210}px, ${y - 210}px)`;
    requestAnimationFrame(loop);
  })();
}

// 卡片 3D 倾斜（事件委托，兼容动态渲染）
function initTilt() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
  });
  document.addEventListener("pointerout", (e) => {
    const card = e.target.closest(".card");
    if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
  });
}

// 数字滚动
function animateCount() {
  document.querySelectorAll(".stat-card .num[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const dur = 1000;
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  });
}

// =====================================================================
//  联系弹窗
// =====================================================================
function openContactModal() {
  document.getElementById("contact-modal").classList.add("open");
}
function closeContactModal() {
  document.getElementById("contact-modal").classList.remove("open");
}

// =====================================================================
//  路由
// =====================================================================
const inited = {};

function show(view, param) {
  if (view === "detail") {
    renderDetailPage(param.type, param.id);
  } else if (!inited[view]) {
    if (view === "about") renderAbout();
    else renderListPage(view);
    inited[view] = true;
  }

  document.querySelectorAll(".view").forEach((v) => {
    v.classList.toggle("active", v.id === "view-" + view);
  });
  renderNav(view === "detail" ? param.type : view);
  window.scrollTo(0, 0);
}

function route() {
  const h = location.hash.replace(/^#\//, "") || "about";
  const parts = h.split("/");
  if (parts[0] === "detail" && parts.length >= 3) {
    show("detail", { type: TYPE_MAP[parts[1]] || parts[1], id: parts[2] });
  } else {
    show(TYPE_MAP[parts[0]] ? parts[0] : "about");
  }
}

// =====================================================================
//  启动
// =====================================================================
document.addEventListener("DOMContentLoaded", () => {
  injectDefs();
  renderBrand();
  renderFooter();
  initBackground();
  initCursorGlow();
  initTilt();

  const p = SITE_DATA.profile;
  document.getElementById("modal-email").textContent = p.email;
  document.getElementById("modal-tel").textContent = p.phone;
  document.getElementById("copy-email").dataset.copy = p.email;
  document.getElementById("copy-tel").dataset.copy = p.phone;
  document.getElementById("modal-close").addEventListener("click", closeContactModal);
  document.getElementById("contact-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeContactModal();
  });

  const toggle = document.getElementById("navToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.getElementById("navLinks").classList.toggle("open");
    });
  }

  // 全局点击：联系弹窗 / 复制 / 卡片进详情
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-action='contact']")) { openContactModal(); return; }
    const copyBtn = e.target.closest(".copy-btn");
    if (copyBtn) {
      const text = copyBtn.dataset.copy;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          const old = copyBtn.textContent;
          copyBtn.textContent = "已复制";
          setTimeout(() => (copyBtn.textContent = old), 1500);
        });
      }
      return;
    }
    if (e.target.closest("a")) return;
    const card = e.target.closest("[data-type][data-id]");
    if (card) location.hash = `/detail/${card.dataset.type}/${card.dataset.id}`;
  });

  window.addEventListener("hashchange", route);
  route();
});
