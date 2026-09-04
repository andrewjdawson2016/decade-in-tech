/* ============================================================================
 * app.js — renders siteContent (from content.js) into the page.
 * You normally never need to touch this file; edit content.js instead.
 * ========================================================================== */

(function () {
  "use strict";

  /* --- LinkedIn glyph (inline SVG so there's no extra network request) ----- */
  var LINKEDIN_SVG =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" ' +
    'aria-hidden="true" focusable="false">' +
    '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>' +
    "</svg>";

  /* --- typographic quotes: straight ' and " become curly ------------------- */
  function smarten(str) {
    return str
      .replace(/(^|[\s(\[{—-])"/g, "$1“") // opening double
      .replace(/"/g, "”") // closing double
      .replace(/(^|[\s(\[{—-])'/g, "$1‘") // opening single
      .replace(/'/g, "’"); // apostrophes + closing single
  }

  /* Smarten quotes everywhere except inside `code` spans. */
  function smartenOutsideCode(str) {
    return str
      .split(/(`[^`]+`)/)
      .map((part, i) => (i % 2 ? part : smarten(part)))
      .join("");
  }

  /* --- tiny inline formatter: **bold** *italic* `code` [text](url) --------- */
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function formatInline(str) {
    let s = escapeHtml(smartenOutsideCode(str));
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
    header.appendChild(
      el("span", "section__number", String(index + 1).padStart(2, "0"))
    );
    header.appendChild(el("h2", "section__title", formatInline(section.title)));
    sec.appendChild(header);

    // A pencil sketch just under the title is the section's visual break. Drop a
    // file at images/<section.id>.png and it's stitched in automatically;
    // sections without one simply omit it.
    const brk = el("div", "section__break reveal");
    const img = document.createElement("img");
    img.className = "section__photo";
    img.loading = "lazy";
    img.alt = section.title;
    img.src = "images/" + section.id + ".png";
    img.addEventListener("error", function () {
      brk.remove();
    });
    brk.appendChild(img);
    sec.appendChild(brk);

    if (section.intro) {
      sec.appendChild(
        el("p", "section__intro reveal", formatInline(section.intro))
      );
    }

    (section.advice || []).forEach((a) => sec.appendChild(renderAdvice(a)));
    return sec;
  }

  /* --- build the table of contents ---------------------------------------- */
  function renderToc(sections) {
    const toc = document.getElementById("toc");
    toc.appendChild(el("p", "toc__label", "Contents"));
    const list = el("ul", "toc__list");
    sections.forEach((section, i) => {
      const li = el("li");
      const a = el("a", "toc__link");
      a.href = "#" + section.id;
      a.dataset.target = section.id;
      a.appendChild(
        el("span", "toc__num", String(i + 1).padStart(2, "0"))
      );
      a.appendChild(el("span", "toc__text", formatInline(section.title)));
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
    document.getElementById("hero-title").textContent = smarten(c.title);
    document.getElementById("hero-subtitle").textContent = smarten(
      c.subtitle || ""
    );

    // Employer disclaimer, shown just under the subtitle.
    const heroDisclaimer = document.getElementById("hero-disclaimer");
    if (c.disclaimer) {
      heroDisclaimer.textContent = smarten(c.disclaimer);
    } else {
      heroDisclaimer.remove();
    }

    // Byline: the author name and LinkedIn icon act as a single link that
    // shares one hover/click target.
    const bylineRoot = document.getElementById("hero-byline");
    if (c.author) {
      const linked = Boolean(c.linkedin);
      const byline = el(linked ? "a" : "span", "byline");
      if (linked) {
        byline.href = c.linkedin;
        byline.target = "_blank";
        byline.rel = "noopener";
        byline.setAttribute("aria-label", c.author + " on LinkedIn");
      }
      byline.appendChild(el("span", "byline__name", c.author));
      if (linked) {
        byline.appendChild(el("span", "byline__icon", LINKEDIN_SVG));
      }
      bylineRoot.appendChild(byline);
      if (c.date) {
        bylineRoot.appendChild(el("span", "byline__date", c.date));
      }
    } else {
      bylineRoot.remove();
    }

    // Collapsible disclosure panels (About me, Is this written by AI?, …).
    const disclosuresRoot = document.getElementById("disclosures");
    (c.disclosures || []).forEach((d) => {
      const details = el("details", "disclosure");
      const summary = el(
        "summary",
        "disclosure__summary",
        formatInline(d.summary || "")
      );
      details.appendChild(summary);
      const body = el("div", "disclosure__body");
      (d.body || []).forEach((block) => body.appendChild(renderBlock(block)));
      details.appendChild(body);
      disclosuresRoot.appendChild(details);
    });

    const sectionsRoot = document.getElementById("sections");
    (c.sections || []).forEach((section, i) =>
      sectionsRoot.appendChild(renderSection(section, i))
    );

    renderToc(c.sections || []);

    // Footer: an end mark plus a short colophon closes the essay.
    const footer = document.getElementById("footer");
    footer.classList.add("reveal");
    footer.appendChild(el("p", "footer__mark", "· · ·"));
    const colophon = [c.author, c.date].filter(Boolean).join(" · ");
    if (colophon) {
      footer.appendChild(el("p", "footer__note", escapeHtml(colophon)));
    }

    initScrollSpy();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
