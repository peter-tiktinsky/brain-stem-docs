/* Shared sidebar nav — one source of truth for every page.
   Each page carries <aside class="sidebar" id="site-nav"></aside>; this fills it
   and marks the current page active. Add/rename pages here only.
   The first link in each group is that section's intro page (used by nav-foot.js). */
(function () {
  const groups = [
    { title: 'Getting started', links: [
      ['getting-started.html', 'Getting started'],
      ['installation.html', 'Install &amp; upgrade guide'],
      ['onboarding.html', 'Onboarding'],
      ['uninstalling.html', 'Uninstalling'],
      ['packaging-runtime.html', 'Packaging &amp; runtime'],
    ]},
    { title: 'Orientation', band: 'Documentation', start: true, links: [
      ['index.html', 'Introduction'],
      ['vault-explorer.html', 'Explore your brain'],
      ['value-add.html', 'Why brain-stem'],
      ['research-rationale.html', 'The research rationale'],
    ]},
    { title: 'Context &amp; memory', band: 'Documentation', sub: 'Architecture &amp; capabilities', links: [
      ['context-and-memory.html', 'Context &amp; memory'],
      ['context-library.html', 'Dual context layers'],
      ['memory-model.html', 'The memory model'],
      ['session-loading.html', 'What loads each session'],
      ['context-memory-rationale.html', 'Why: context &amp; memory'],
    ]},
    { title: 'Project management', band: 'Documentation', sub: 'Architecture &amp; capabilities', links: [
      ['project-management.html', 'Project management'],
      ['work-surface.html', 'Project organization'],
      ['plans.html', 'Plans'],
      ['orchestration.html', 'Orchestration &amp; scheduling'],
      ['project-binder.html', 'The project binder'],
      ['project-management-rationale.html', 'Why: project management'],
    ]},
    { title: 'Write-time governance', band: 'Documentation', sub: 'Architecture &amp; capabilities', links: [
      ['write-time-governance.html', 'Write-time governance'],
      ['governance-engine.html', 'The governance engine'],
      ['single-document.html', 'The single document'],
      ['across-documents.html', 'Across documents &amp; folders'],
      ['governance-rationale.html', 'Why: write-time governance'],
    ]},
    { title: 'Session management', band: 'Documentation', sub: 'Architecture &amp; capabilities', links: [
      ['sessions.html', 'Session management'],
      ['checkpoints.html', 'Checkpoints'],
      ['multi-session.html', 'Multi-session coordination'],
      ['session-close.html', 'Session close'],
      ['decision-quality.html', 'The decision-quality protocol'],
      ['session-management-rationale.html', 'Why: session management'],
    ]},
    { title: 'Automated capture', band: 'Documentation', sub: 'Architecture &amp; capabilities', links: [
      ['automated-capture.html', 'Automated capture'],
      ['vault-writers.html', 'The vault-writer system'],
      ['automated-capture-rationale.html', 'Why: automated capture'],
    ]},
    { title: 'System personalization', band: 'Documentation', sub: 'Architecture &amp; capabilities', links: [
      ['system-personalization.html', 'System personalization'],
      ['governance-personalization.html', 'Governance personalization'],
      ['work-folder-guidebook.html', 'The work-folder guidebook'],
      ['personalization-rationale.html', 'Why: system personalization'],
    ]},
    { title: 'Reference', band: 'Reference', links: [
      ['commands.html', 'Commands'],
      ['glossary.html', 'Glossary'],
      ['faq.html', 'FAQ'],
    ]},
  ];
  window.BS_GROUPS = groups;
  const here = (location.pathname.split('/').pop() || 'index.html');
  let html = '<a class="brand" href="index.html">'
    + '<span class="mark">brain-stem</span></a>'
    + '<a class="brand-repo" href="https://github.com/peter-tiktinsky/brain-stem" target="_blank" rel="noopener">GitHub repo ↗</a>';
  let lastBand = null, lastSub = null;
  for (const g of groups) {
    if (g.band && g.band !== lastBand) { html += '<p class="nav-band">' + g.band + '</p>'; }
    lastBand = g.band || null;
    if (g.sub && g.sub !== lastSub) { html += '<p class="nav-subband">' + g.sub + '</p>'; }
    lastSub = g.sub || null;
    html += '<nav class="nav-group' + (g.start ? ' nav-start' : '') + '">';
    // a band whose label equals the section title doubles as the header (Reference)
    if (g.band !== g.title) {
      html += '<h4>' + g.title + (g.start ? '<span class="nav-tag">start here</span>' : '') + '</h4>';
    }
    for (const [href, label] of g.links) {
      html += '<a href="' + href + '"' + (href === here ? ' class="active"' : '') + '>' + label + '</a>';
    }
    html += '</nav>';
  }
  const el = document.getElementById('site-nav');
  if (el) el.innerHTML = html;
})();
