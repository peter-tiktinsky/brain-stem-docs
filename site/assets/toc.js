/* On-page table of contents — the right-hand rail on wide desktop viewports.
   Every page carries the same three scripts; this one reads the page's own
   headings and builds the rail, so no page markup changes when a heading is
   added, renamed or moved. Only top-level section headings are listed — the
   <h2>s that are direct children of <main class="content">. Sub-headings are
   deliberately left out so the rail stays a short map of the page, and the
   direct-child test excludes headings that live inside cards and diagrams.
   Headings already carrying an id keep it, so existing links stay valid; the
   rest are given a slug of their text. The rail is hidden below 1360px by the
   stylesheet — the mobile drawer in mobile.js owns navigation there. */
(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function slug(text) {
    return text.toLowerCase()
      .replace(/[‘’“”]/g, '')
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'section';
  }

  ready(function () {
    var main = document.querySelector('main.content');
    var layout = document.querySelector('.layout');
    if (!main || !layout) return;

    /* Every top-level section heading, wherever the page wraps it — some pages
       group each section in its own <section> or closing <div>. Headings that
       belong to a component rather than to the page spine are excluded. */
    var heads = [].slice.call(main.querySelectorAll('h2')).filter(function (h) {
      return !h.closest('.card, table, details, aside, nav, figure, .sysmap, .callout, .toc');
    });
    if (heads.length < 2) return;      /* nothing worth a rail */

    var taken = {};
    document.querySelectorAll('[id]').forEach(function (el) { taken[el.id] = true; });

    var items = [];
    heads.forEach(function (h) {
      /* The rail carries the section's name only. A heading may also show an
         ordinal and a descriptive tail on the page; both are dropped here. */
      var clone = h.cloneNode(true);
      [].forEach.call(clone.querySelectorAll('.section-number, .section-desc'), function (n) {
        n.parentNode.removeChild(n);
      });
      var label = (clone.textContent || '').trim().replace(/^\d+[.\s]*/, '').replace(/\s*[—–-]\s*$/, '');
      if (!label) return;
      /* anchor on the heading, or on the section wrapping it when that is what
         the page's own in-page links already point at */
      var target = h;
      if (!h.id) {
        var sec = h.parentElement;
        if (sec && sec.id && sec.firstElementChild === h) target = sec;
      }
      if (!target.id) {
        var base = slug(label), id = base, n = 2;
        while (taken[id]) { id = base + '-' + n++; }
        target.id = id;
      }
      taken[target.id] = true;
      items.push({ id: target.id, label: label, el: h });
    });
    if (items.length < 2) return;

    var html = '<p class="onpage-h">On this page</p><nav class="onpage-list">';
    items.forEach(function (it) {
      html += '<a href="#' + it.id + '">'
        + it.label.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</a>';
    });
    html += '</nav>';

    var rail = document.createElement('aside');
    rail.className = 'onpage';
    rail.id = 'page-toc';
    rail.setAttribute('aria-label', 'On this page');
    rail.innerHTML = html;
    layout.appendChild(rail);

    /* --- active-section marking --- */
    var links = rail.querySelectorAll('.onpage-list a');
    var current = -1;
    function mark() {
      var y = window.scrollY + 120, found = 0;
      for (var i = 0; i < items.length; i++) {
        if (items[i].el.getBoundingClientRect().top + window.scrollY - y <= 0) found = i;
        else break;
      }
      /* the last section is marked once the page bottom is reached, so the rail
         never leaves a short trailing section unhighlighted */
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        found = items.length - 1;
      }
      if (found === current) return;
      if (current >= 0) links[current].classList.remove('on');
      links[found].classList.add('on');
      current = found;
      var link = links[found];
      var box = rail.getBoundingClientRect(), lb = link.getBoundingClientRect();
      if (lb.top < box.top + 8 || lb.bottom > box.bottom - 8) {
        rail.scrollTop += lb.top - box.top - box.height / 2;
      }
    }

    var queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; mark(); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    mark();
  });
})();
