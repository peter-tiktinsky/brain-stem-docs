/* Shared sidebar nav — one source of truth for every page.
   Each page carries <aside class="sidebar" id="site-nav"></aside>; this fills it
   and marks the current page active. Add/rename pages here only.
   The first link in each group is that section's intro page (used by nav-foot.js).
   Groups flagged core:true share a red left rail (.nav-core) marking the core
   documentation set; the "Architecture and Capabilities" band sits above it. */
(function () {
  const groups = [
    { title: 'Orientation', band: 'Orientation', links: [
      ['index.html', 'Introduction'],
      ['vault-explorer.html', 'Explore Your Brain'],
      ['value-add.html', 'Why Brain Stem'],
      ['research-rationale.html', 'The Research Rationale'],
    ]},
    { title: 'Getting started', band: 'Getting started', links: [
      ['getting-started.html', 'Quickstart'],
      ['onboarding.html', 'Onboarding'],
      ['installation.html', 'Install &amp; Upgrade Guide'],
      ['uninstalling.html', 'Uninstalling'],
      ['packaging-runtime.html', 'Packaging &amp; Runtime'],
    ]},
    { title: 'Context &amp; memory', band: 'Architecture and Capabilities', core: true, links: [
      ['context-and-memory.html', 'Context &amp; Memory'],
      ['context-library.html', 'Dual Context Layers'],
      ['memory-model.html', 'The Memory Model'],
      ['session-loading.html', 'What Loads Each Session'],
      ['context-memory-rationale.html', 'Why: Context &amp; Memory'],
    ]},
    { title: 'Project management', band: 'Architecture and Capabilities', core: true, links: [
      ['project-management.html', 'Project Management'],
      ['work-surface.html', 'Project Organization'],
      ['plans.html', 'Plans'],
      ['orchestration.html', 'Orchestration &amp; Scheduling'],
      ['project-binder.html', 'The Project Binder'],
      ['project-management-rationale.html', 'Why: Project Management'],
    ]},
    { title: 'Write-time governance', band: 'Architecture and Capabilities', core: true, links: [
      ['write-time-governance.html', 'Write-Time Governance'],
      ['governance-engine.html', 'The Governance Engine'],
      ['single-document.html', 'The Single Document'],
      ['across-documents.html', 'Across Documents &amp; Folders'],
      ['governance-rationale.html', 'Why: Write-Time Governance'],
    ]},
    { title: 'Session management', band: 'Architecture and Capabilities', core: true, links: [
      ['sessions.html', 'Session Management'],
      ['checkpoints.html', 'Checkpoints'],
      ['multi-session.html', 'Multi-Session Coordination'],
      ['session-close.html', 'Session Close'],
      ['decision-quality.html', 'The Decision-Quality Protocol'],
      ['session-management-rationale.html', 'Why: Session Management'],
    ]},
    { title: 'Automated capture', band: 'Architecture and Capabilities', core: true, links: [
      ['automated-capture.html', 'Automated Capture'],
      ['vault-writers.html', 'The Vault-Writer System'],
      ['automated-capture-rationale.html', 'Why: Automated Capture'],
    ]},
    { title: 'System personalization', band: 'Architecture and Capabilities', core: true, links: [
      ['system-personalization.html', 'System Personalization'],
      ['governance-personalization.html', 'Governance Personalization'],
      ['work-folder-guidebook.html', 'The Work-Folder Guidebook'],
      ['knowledge-graph.html', 'Knowledge-Graph Extendability'],
      ['personalization-rationale.html', 'Why: System Personalization'],
    ]},
    { title: 'Reference', band: 'Reference', links: [
      ['commands.html', 'Commands'],
      ['glossary.html', 'Glossary'],
      ['faq.html', 'FAQ'],
      ['troubleshooting.html', 'Troubleshooting'],
      ['configuration.html', 'Configuration'],
      ['https://github.com/peter-tiktinsky/brain-stem/blob/main/CHANGELOG.md', 'Release Notes ↗'],
    ]},
  ];
  window.BS_GROUPS = groups;
  const here = (location.pathname.split('/').pop() || 'index.html');
  let html = '<a class="brand" href="index.html">'
    + '<span class="mark">Brain Stem</span></a>'
    + '<a class="brand-repo" href="https://github.com/peter-tiktinsky/brain-stem" target="_blank" rel="noopener">GitHub repo ↗</a>';
  let lastBand = null, inCore = false;
  for (const g of groups) {
    if (inCore && !g.core) { html += '</div>'; inCore = false; }
    if (g.band && g.band !== lastBand) { html += '<p class="nav-band">' + g.band + '</p>'; }
    lastBand = g.band || null;
    if (g.core && !inCore) { html += '<div class="nav-core">'; inCore = true; }
    html += '<nav class="nav-group">';
    // a band whose label equals the section title doubles as the header (Getting started, Reference)
    if (g.band !== g.title) {
      html += '<h4>' + g.title + '</h4>';
    }
    for (const [href, label] of g.links) {
      html += '<a href="' + href + '"' + (href === here ? ' class="active"' : '') + '>' + label + '</a>';
    }
    html += '</nav>';
  }
  if (inCore) { html += '</div>'; }
  const el = document.getElementById('site-nav');
  if (el) el.innerHTML = html;
})();
