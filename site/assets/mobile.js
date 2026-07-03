/* Mobile navigation — sticky top bar + off-canvas drawer (≤820px).
   Loaded synchronously in <head> so html.has-mnav is set before first paint
   (no layout flash); the DOM work waits for the parsed document. Injects a
   top bar (brand + labeled Menu button), a backdrop, and a close button, and
   slides the shared sidebar in as a drawer. Desktop is untouched: the styles
   this enables are scoped to html.has-mnav inside the narrow-viewport media
   query, and without JS the stylesheet falls back to the stacked sidebar. */
(function () {
  document.documentElement.classList.add('has-mnav');

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    var sidebar = document.getElementById('site-nav');
    if (!sidebar) return;

    var bar = document.createElement('header');
    bar.className = 'mnav-bar';
    bar.innerHTML =
      '<a class="mnav-brand" href="index.html">brain-stem</a>' +
      '<button type="button" class="mnav-toggle" aria-controls="site-nav" aria-expanded="false">' +
      '<span class="mnav-icon" aria-hidden="true"></span>Menu</button>';

    var backdrop = document.createElement('div');
    backdrop.className = 'mnav-backdrop';

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'mnav-close';
    close.setAttribute('aria-label', 'Close navigation');
    close.innerHTML = '×';

    document.body.insertBefore(bar, document.body.firstChild);
    document.body.appendChild(backdrop);
    sidebar.appendChild(close);   /* after nav.js has filled the sidebar */

    var toggle = bar.querySelector('.mnav-toggle');

    function setOpen(open) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      (open ? close : toggle).focus();
    }

    toggle.addEventListener('click', function () { setOpen(true); });
    close.addEventListener('click', function () { setOpen(false); });
    backdrop.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) setOpen(false);
    });
    /* tapping a nav link closes the drawer (covers same-page anchor links) */
    sidebar.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
