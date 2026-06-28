# brain-stem-docs

Published documentation for [brain-stem](https://github.com/peter-tiktinsky/brain-stem).

Live site: **https://peter-tiktinsky.github.io/brain-stem-docs/**

## Layout

- `site/` — the published static site (HTML + `assets/`). This is the only directory served to GitHub Pages.
- `.github/workflows/pages.yml` — static publish to GitHub Pages on every push to `main` (no build step).

The site is hand-authored static HTML — no build step. Before publishing, the site is run through a
provenance leak check; that detector is kept out of this public repo because it embeds confidential
token literals (it lives with the maintainer's authoring tooling, not here).
