/* ============================================================================
 * app.js — renders siteContent (from content.js) into the page.
 * You normally never need to touch this file; edit content.js instead.
 * ========================================================================== */

(function () {
  "use strict";

  /* --- tiny inline formatter: **bold** *italic* `code` [text](url) --------- */
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function formatInline(str) {
    let s = escapeHtml(str);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
    return s;
  }

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  /* --- render one "block" inside an advice body ---------------------------- */
  function renderBlock(block) {
    if (typeof block === "string") {
      return el("p", null, formatInline(block));
    }
    if (block && Array.isArray(block.list)) {
      const ul = el("ul");
      block.list.forEach((item) =>
        ul.appendChild(el("li", null, formatInline(item)))
      );
      return ul;
    }
    if (block && Array.isArray(block.ordered)) {
      const ol = el("ol");
      block.ordered.forEach((item) =>
        ol.appendChild(el("li", null, formatInline(item)))
      );
      return ol;
    }
    return document.createComment("unknown block");
  }

  /* --- render one piece of advice ----------------------------------------- */
  function renderAdvice(advice) {
    const wrap = el("article", "advice reveal");
    wrap.appendChild(el("h3", "advice__title", formatInline(advice.title)));
    const body = el("div", "advice__body");
    (advice.body || []).forEach((block) => body.appendChild(renderBlock(block)));
    wrap.appendChild(body);
    return wrap;
  }

  /* --- render one section ------------------------------------------------- */
  function renderSection(section, index) {
    const sec = el("section", "section");
    sec.id = section.id;

    const header = el("div", "section__header reveal");
    header.appendChild(el("h2", "section__title", formatInline(section.title)));
    if (section.intro) {
      header.appendChild(el("p", "section__intro", formatInline(section.intro)));
    }
    sec.appendChild(header);

    (section.advice || []).forEach((a) => sec.appendChild(renderAdvice(a)));
    return sec;
  }

  /* --- build the table of contents ---------------------------------------- */
  function renderToc(sections) {
    const toc = document.getElementById("toc");
    toc.appendChild(el("p", "toc__label", "Contents"));
    const list = el("ul", "toc__list");
    sections.forEach((section) => {
      const li = el("li");
      const a = el("a", "toc__link", formatInline(section.title));
      a.href = "#" + section.id;
      a.dataset.target = section.id;
      li.appendChild(a);
      list.appendChild(li);
    });
    toc.appendChild(list);
  }

  /* --- scroll-spy: highlight the active section in the TOC ---------------- */
  function initScrollSpy() {
    const links = Array.from(document.querySelectorAll(".toc__link"));
    if (!links.length) return;
    const byId = new Map(links.map((l) => [l.dataset.target, l]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove("is-active"));
            const active = byId.get(entry.target.id);
            if (active) active.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    document.querySelectorAll(".section").forEach((s) => observer.observe(s));
  }

  /* --- fade-in on scroll -------------------------------------------------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    items.forEach((i) => observer.observe(i));
  }

  /* --- boot --------------------------------------------------------------- */
  function init() {
    const c = window.siteContent;
    if (!c) {
      document.getElementById("hero-title").textContent =
        "content.js failed to load";
      return;
    }

    document.title = c.title;
    document.getElementById("hero-title").textContent = c.title;
    document.getElementById("hero-subtitle").textContent = c.subtitle || "";
    document.getElementById("hero-author").textContent = c.author
      ? "By " + c.author
      : "";

    const sectionsRoot = document.getElementById("sections");
    (c.sections || []).forEach((section, i) =>
      sectionsRoot.appendChild(renderSection(section, i))
    );

    renderToc(c.sections || []);

    const year = new Date().getFullYear();
    document.getElementById("footer-text").textContent =
      (c.author ? c.author + " · " : "") + year;

    initScrollSpy();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
