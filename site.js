/* =============================================================================
   PRAJNA 2.0 — site.js
   Shared chrome (header/footer/mobile nav) + interactions:
   header scroll state, scroll-reveal, count-up, live agent console,
   orbital platform core.
   ========================================================================== */
(function () {
  "use strict";

  var MARK = "assets/prajna-mark.svg";
  var LOGO = "assets/prajna-logo-light.svg";

  var NAV = [
    { label: "Platform", href: "index.html#platform", key: "platform" },
    { label: "Solutions", href: "solutions.html", key: "solutions" },
    { label: "Blog", href: "blog.html", key: "blog" },
    { label: "Careers", href: "careers.html", key: "careers" },
    { label: "Contact", href: "contact.html", key: "contact" }
  ];

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  var page = document.body.getAttribute("data-page") || "home";

  /* ---------- HEADER ---------- */
  function buildHeader() {
    var navLinks = NAV.map(function (n) {
      var active = n.key === page ? " active" : "";
      return '<a href="' + n.href + '" class="' + active.trim() + '">' + n.label + "</a>";
    }).join("");

    var hdr = el(
      '<header class="hdr">' +
        '<div class="wrap">' +
          '<a class="brand" href="index.html" aria-label="Prajna home">' +
            '<img src="' + LOGO + '" alt="Prajna" /><span class="wm">prajna</span>' +
          "</a>" +
          '<nav class="nav">' + navLinks + "</nav>" +
          '<div class="hdr-cta">' +
            '<a class="btn btn-ghost btn-sm" href="contact.html">Book a demo</a>' +
            '<a class="btn btn-accent btn-sm" href="contact.html">Contact sales' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
            "</a>" +
            '<button class="menu-btn" aria-label="Menu"><img src="assets/icons/menu.svg" alt=""/></button>' +
          "</div>" +
        "</div>" +
      "</header>"
    );

    var mobileLinks = NAV.map(function (n) {
      return '<a href="' + n.href + '">' + n.label + "</a>";
    }).join("");
    var mnav = el(
      '<div class="mobile-nav">' +
        '<button class="close" aria-label="Close"><img src="assets/icons/close.svg" alt=""/></button>' +
        mobileLinks +
        '<a class="btn btn-accent" href="contact.html" style="margin-top:24px">Contact sales</a>' +
      "</div>"
    );

    document.body.insertBefore(hdr, document.body.firstChild);
    document.body.appendChild(mnav);

    var menuBtn = hdr.querySelector(".menu-btn");
    menuBtn.addEventListener("click", function () { mnav.classList.add("open"); });
    mnav.querySelector(".close").addEventListener("click", function () { mnav.classList.remove("open"); });
    mnav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { mnav.classList.remove("open"); });
    });

    function onScroll() {
      if (window.scrollY > 24) hdr.classList.add("scrolled");
      else hdr.classList.remove("scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- FOOTER ---------- */
  function buildFooter() {
    var ftr = el(
      '<footer class="ftr">' +
        '<div class="wrap">' +
          '<div class="ftr-grid">' +
            '<div class="ftr-brand">' +
              '<a class="brand" href="index.html"><img src="' + LOGO + '" alt="Prajna"/><span class="wm">prajna</span></a>' +
              '<p class="ftr-tag">Wisdom that amplifies your business.</p>' +
              '<a class="ftr-phone" href="tel:+16509774136">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
                "+1 650-977-4136</a>" +
            "</div>" +
            '<div class="ftr-col"><h5>Platform</h5>' +
              '<a href="index.html#platform">Agent OS</a>' +
              '<a href="solutions.html">Solutions</a>' +
              '<a href="index.html#proof">Proof &amp; ROI</a>' +
              '<a href="index.html#delivery">Delivery model</a></div>' +
            '<div class="ftr-col"><h5>Company</h5>' +
              '<a href="blog.html">Blog</a>' +
              '<a href="careers.html">Careers</a>' +
              '<a href="contact.html">Contact</a>' +
              '<a href="https://www.linkedin.com/company/prajnaai" target="_blank" rel="noopener">LinkedIn</a></div>' +
            '<div class="ftr-col"><h5>Trust</h5>' +
              '<a href="contact.html">SOC 2 Type I &amp; II</a>' +
              '<a href="index.html#platform">Responsible AI</a>' +
              '<a href="contact.html">Security</a>' +
              '<a href="privacy.html">Privacy</a></div>' +
          "</div>" +
          '<div class="ftr-bottom">' +
            '<span class="ftr-copy">© 2026 Prajna.ai, Inc. — Chicago, IL. All rights reserved.</span>' +
            '<div class="ftr-badges">' +
              '<img src="assets/nvidia-inception.png" alt="NVIDIA Inception"/>' +
              '<img src="assets/google-startups.png" alt="Google for Startups"/>' +
              '<img src="assets/soc2-type2.svg" alt="SOC 2 Type II"/>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</footer>"
    );
    var slot = document.getElementById("site-footer");
    if (slot) slot.replaceWith(ftr);
    else document.body.appendChild(ftr);
  }

  /* ---------- SCROLL REVEAL (robust — no IntersectionObserver dependency) ---------- */
  function initReveal() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-rise]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // base style is already visible
    }
    nodes.forEach(function (n) { n.classList.add("pre"); });

    function lock(n) { n.classList.add("shown"); }
    function reveal(n) {
      if (!n.classList.contains("pre")) return;
      var d = parseFloat(n.getAttribute("data-delay") || "0");
      setTimeout(function () {
        n.classList.remove("pre");
        n.classList.add("in");
        n.addEventListener("animationend", function () { lock(n); }, { once: true });
      }, d);
    }
    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      nodes = nodes.filter(function (n) {
        if (!n.classList.contains("pre")) return false;
        var r = n.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) { reveal(n); return false; }
        return true;
      });
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    // failsafe: force a static visible state on everything — never leave content
    // hidden even if the animation engine is throttled (offscreen/background iframe)
    setTimeout(function () {
      document.querySelectorAll("[data-rise]").forEach(function (n) {
        n.classList.remove("pre");
        lock(n);
      });
    }, 1600);
  }

  /* ---------- COUNT UP ---------- */
  function animateCount(node) {
    var target = parseFloat(node.getAttribute("data-count"));
    var dec = parseInt(node.getAttribute("data-dec") || "0", 10);
    var dur = 1400;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      node.textContent = dec ? val.toFixed(dec) : Math.round(val).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else node.textContent = dec ? target.toFixed(dec) : target.toLocaleString();
    }
    requestAnimationFrame(step);
  }
  function initCounters() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(animateCount); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---------- LIVE AGENT CONSOLE — rolling lifecycle pipeline ---------- */
  // phase: 0 Prospect · 1 Borrower · 2 Funded · 3 Next product
  var PHASES = ["Prospect", "Borrower", "Funded", "Next product"];
  var CONSOLE_ROWS = [
    { ic: "agent-user.svg", h: "Prospecting Agent", phase: 0, work: "sourcing net-new leads", done: "147 prospects scored", v: "live" },
    { ic: "message.svg", h: "Marketing Agent", phase: 0, work: "nurturing · personalized outreach", done: "1.2k touches sent", v: "48%" },
    { ic: "arrow.svg", h: "Sales Agent", phase: 0, work: "qualifying & booking", done: "appointment booked", v: "32%" },
    { ic: "briefcase.svg", h: "Lending Assistant", phase: 1, work: "structuring loan options", done: "3 scenarios ready", v: "97.6%" },
    { ic: "cog.svg", h: "Processing Agent", phase: 1, work: "validating W-2 + assets", done: "12 docs reconciled", v: "8.2s" },
    { ic: "node.svg", h: "Title Insurance Extraction Agent", phase: 1, work: "extracting title package fields", done: "38 fields · 99.2%", v: "99.2%" },
    { ic: "system.svg", h: "Insurance Approval Agent", phase: 2, work: "clearing to close · approval", done: "approved · 0 exceptions", v: "live" },
    { ic: "message.svg", h: "Servicing Agent", phase: 2, work: "answering borrower · ES", done: "resolved · CSAT 4.9", v: "4.9" },
    { ic: "briefcase.svg", h: "Outlook Intelligence Agent", phase: 2, work: "triaging inbox · routing", done: "inbox cleared", v: "2.4k/hr" },
    { ic: "flash.svg", h: "Cross-Sell Agent", phase: 3, work: "matching HELOC offer", done: "2 offers surfaced", v: "+2×" }
  ];
  function initConsole() {
    var host = document.getElementById("live-console");
    if (!host) return;

    var phasesHtml = PHASES.map(function (p, i) {
      return '<div class="cphase" data-p="' + i + '"><span class="cdot"></span><span class="clabel">' + p + "</span></div>";
    }).join("");
    var rowsHtml = CONSOLE_ROWS.map(function (r, i) {
      return (
        '<div class="console-row" data-i="' + i + '">' +
          '<div class="console-ic"><img src="assets/icons/' + r.ic + '" alt=""/></div>' +
          '<div class="meta"><h5>' + r.h + '</h5>' +
            '<p class="st"><span class="dotwork"></span><span class="sttext">' + r.work + '</span></p></div>' +
          '<span class="val">' + r.v + "</span>" +
        "</div>"
      );
    }).join("");
    host.innerHTML =
      '<div class="console-bar">' +
        '<span class="dot" style="background:#FF782E"></span>' +
        '<span class="dot" style="background:#FFC772"></span>' +
        '<span class="dot" style="background:#3A3327"></span>' +
        '<span class="title">prajna · agent os</span>' +
        '<span class="pill"><span class="dotlive"></span>10 agents live</span>' +
      "</div>" +
      '<div class="console-phases">' + phasesHtml + "</div>" +
      '<div class="console-view"><div class="console-list">' + rowsHtml + "</div></div>" +
      '<div class="barwrap"><div class="bar"></div></div>' +
      '<div class="console-foot"><span>orchestrating · 1 compliant core</span><span class="thru">2,481 tasks / hr</span></div>';

    var rows = host.querySelectorAll(".console-row");
    var phases = host.querySelectorAll(".cphase");
    var list = host.querySelector(".console-list");
    var view = host.querySelector(".console-view");
    var bar = host.querySelector(".bar");

    // size the rolling viewport to show ~4 rows
    var VISIBLE = 4;
    var stride = rows.length > 1 ? (rows[1].offsetTop - rows[0].offsetTop) : 75;
    if (!stride) stride = 75;
    view.style.height = (stride * VISIBLE) + "px";
    var maxScroll = Math.max(0, rows.length - VISIBLE);

    var lit = -1;
    function tick() {
      if (lit >= 0) {
        var prev = rows[lit];
        prev.classList.remove("lit");
        var pst = prev.querySelector(".sttext");
        pst.textContent = CONSOLE_ROWS[lit].done;
        pst.classList.add("work");
      }
      lit = (lit + 1) % rows.length;
      var cur = rows[lit];
      cur.classList.add("lit");
      var cst = cur.querySelector(".sttext");
      cst.textContent = CONSOLE_ROWS[lit].work;
      cst.classList.remove("work");

      // roll the list so the active row sits ~2nd in view
      var target = Math.min(Math.max(lit - 1, 0), maxScroll);
      if (lit === 0) {
        // seamless wrap back to top
        list.style.transition = "none";
        list.style.transform = "translateY(0px)";
        void list.offsetWidth;
        list.style.transition = "";
      } else {
        list.style.transform = "translateY(" + (-target * stride) + "px)";
      }

      // advance the phase rail
      var ph = CONSOLE_ROWS[lit].phase;
      phases.forEach(function (p, j) { p.classList.toggle("on", j === ph); });

      bar.style.width = (18 + ((lit + 1) / rows.length) * 76).toFixed(0) + "%";
    }
    tick();
    setInterval(tick, 1900);
  }

  /* ---------- ORBITAL PLATFORM CORE ---------- */
  var PILLARS = [
    { ic: "agent-user.svg", title: "Agentic OS", tag: "17 agent roles",
      blurb: "A coordinated workforce of specialized agents for every role across the financial enterprise — orchestrated by one compliant core.",
      nodes: ["Compliance", "Underwriting", "Servicing", "Lending", "Sales", "Marketing", "Support"] },
    { ic: "arrow.svg", title: "Pre-Built Actions", tag: "domain templates",
      blurb: "Battle-tested, domain-specific templates that translate your playbook into running, governed workflows in days.",
      nodes: ["Data lookup", "Workflows", "Approvals", "Enterprise fns", "Actions"] },
    { ic: "system.svg", title: "Responsible AI", tag: "governed & explainable",
      blurb: "A full stack for ethical, governed and explainable AI — every decision is confidence-scored and field-traceable for review.",
      nodes: ["Explainability", "Governance", "Human-in-loop", "Audit trail", "Data & EDA"] },
    { ic: "cog.svg", title: "Customization", tag: "your model, your way",
      blurb: "Bring your foundation model, standardize on a leading one, or fine-tune a model purpose-built for your domain.",
      nodes: ["Fine-tuned", "No-code", "OpenAI", "Anthropic", "Autonomous"] },
    { ic: "briefcase.svg", title: "Business-Centric", tag: "every channel",
      blurb: "Integrate into your real processes and tools — across web, chat, IVR, email and API — with ROI measured end to end.",
      nodes: ["Web · chat", "IVR · voice", "Email", "API", "ROI metering"] },
    { ic: "node.svg", title: "Data Ecosystem", tag: "feedback loops",
      blurb: "Integrated collection, feedback loops and proprietary dataset management — your models compound with every deployment.",
      nodes: ["Validation", "Collection", "Analysis", "Quality", "Audits"] }
  ];
  function renderOrbit(stage, p) {
    var n = p.nodes.length;
    var pts = p.nodes.map(function (label, i) {
      var ang = (-90 + i * (360 / n)) * (Math.PI / 180);
      return { label: label, x: 50 + 38 * Math.cos(ang), y: 50 + 35 * Math.sin(ang), d: i };
    });
    var lines = pts.map(function (pt) {
      return '<line x1="50" y1="50" x2="' + pt.x.toFixed(1) + '" y2="' + pt.y.toFixed(1) +
        '" stroke="rgba(255,120,46,0.26)" stroke-width="0.22"/>';
    }).join("");
    var nodes = pts.map(function (pt) {
      return '<div class="onode" style="left:' + pt.x.toFixed(1) + "%;top:" + pt.y.toFixed(1) +
        "%;animation-delay:" + (0.12 + pt.d * 0.07).toFixed(2) + 's">' +
        '<span class="nd"></span>' + pt.label + "</div>";
    }).join("");
    stage.innerHTML =
      '<div class="core-stage-head"><h3>' + p.title + "</h3><p>" + p.blurb + "</p></div>" +
      '<div class="orbit">' +
        '<svg class="orbit-links" viewBox="0 0 100 100" preserveAspectRatio="none">' + lines + "</svg>" +
        '<div class="orbit-spark"><span class="ring r1"></span><span class="ring r2"></span>' +
          '<img src="' + MARK + '" alt=""/></div>' +
        nodes +
      "</div>" +
      '<div class="core-stage-foot"><span class="dotlive"></span>live in production · ' + p.tag + "</div>";
  }
  function initCore() {
    var wrap = document.getElementById("platform-core");
    if (!wrap) return;
    var rail = document.createElement("div");
    rail.className = "core-rail";
    var stage = document.createElement("div");
    stage.className = "core-stage";
    rail.innerHTML = PILLARS.map(function (p, i) {
      return (
        '<button class="core-tab' + (i === 0 ? " active" : "") + '" data-i="' + i + '">' +
          '<span class="ti"><img src="assets/icons/' + p.ic + '" alt=""/></span>' +
          '<span class="tt"><h4>' + p.title + "</h4><span>" + p.tag + "</span></span>" +
        "</button>"
      );
    }).join("");
    wrap.appendChild(rail);
    wrap.appendChild(stage);
    renderOrbit(stage, PILLARS[0]);

    var active = 0, touched = false, hovering = false;
    var tabs = rail.querySelectorAll(".core-tab");
    function setActive(i) {
      active = i;
      tabs.forEach(function (t, j) { t.classList.toggle("active", j === i); });
      renderOrbit(stage, PILLARS[i]);
    }
    tabs.forEach(function (t) {
      t.addEventListener("click", function () { touched = true; setActive(parseInt(t.getAttribute("data-i"), 10)); });
    });
    wrap.addEventListener("mouseenter", function () { hovering = true; });
    wrap.addEventListener("mouseleave", function () { hovering = false; });
    setInterval(function () {
      if (touched || hovering) return;
      setActive((active + 1) % PILLARS.length);
    }, 3800);
  }

  /* ---------- INIT ---------- */
  function init() {
    buildHeader();
    buildFooter();
    initReveal();
    initCounters();
    initConsole();
    initCore();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
