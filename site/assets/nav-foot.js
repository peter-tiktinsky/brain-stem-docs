/* Footer quick-links — one chip per top-level section, linking to that section's
   intro page (the first link in each nav group). Marks the current section.
   Each page carries <div id="site-foot-nav"></div>; this fills it.
   Depends on window.BS_GROUPS (set by nav.js), so load nav.js first. */
(function () {
  const groups = window.BS_GROUPS || [];
  const here = (location.pathname.split('/').pop() || 'index.html');
  let activeTitle = null;
  for (const g of groups) {
    if (g.links.some(function (l) { return l[0] === here; })) { activeTitle = g.title; break; }
  }
  let html = '<div class="section-jump"><p class="sj-label">Jump to a section</p><div class="sj-row">';
  for (const g of groups) {
    const intro = g.links[0][0];
    const cls = (g.title === activeTitle) ? ' class="here"' : '';
    html += '<a href="' + intro + '"' + cls + '>' + g.title + '</a>';
  }
  html += '</div></div>';
  const el = document.getElementById('site-foot-nav');
  if (el) el.innerHTML = html;
})();
