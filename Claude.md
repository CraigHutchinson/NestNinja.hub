# Instructions for AI Assistants — NestNinja.hub

This is the **community camera feed discovery site** for NestNinja, built with Jekyll and hosted on GitHub Pages at [hub.nestninja.uk](https://hub.nestninja.uk).

---

## Critical: Repository Self-Containment

**This repository must be fully self-contained.**

- Do **not** reference the parent management repository (`NestNinja` / the monorepo root) in any source file, link, or documentation.
- Do **not** use relative paths to sibling repositories (e.g. `../NestNinja.uk/`, `../NestNinja.pro/`, `../NestNinja.open/`).
- Do **not** reference local filesystem paths (e.g. `D:\Craig\GitHub\NestNinja`).
- Cross-site links to `nestninja.uk` are correct and expected. Use the `{{ site.uk_url }}` Liquid variable (not a hardcoded URL) so local dev overrides work — see Local Development below.

---

## Repository Purpose

**Audience:** Bird watchers browsing live NestNinja camera feeds  
**Stack:** Jekyll 4.x, GitHub Pages, Minima theme (remote, `master` branch)  
**Live URL:** [hub.nestninja.uk](https://hub.nestninja.uk)  
**Status:** Currently a pre-launch placeholder with demo data. Architecture decisions (ADRs) to precede implementation.

---

## Site Principles

- **Privacy first** — camera feeds are only listed with the owner's explicit opt-in
- **Client-side only** — no server-side compute; data comes from a real-time database (Firebase or equivalent)
- **No account required** — guests browse freely
- **UK-centric** — UK English throughout; UK bird species and locations in demo data

---

## Cross-Site Links

All links to the main NestNinja website must use `{{ site.uk_url }}` — **never** hardcode `https://nestninja.uk` in page content. This allows local dev to resolve to `localhost:4000`.

Example:
```html
<!-- Correct -->
<a href="{{ site.uk_url }}">Get a NestNinja →</a>

<!-- Wrong — breaks local dev -->
<a href="https://nestninja.uk">Get a NestNinja →</a>
```

---

## Local Development

### Running This Site Only

```bash
cd NestNinja.hub
bundle install
bundle exec jekyll serve --livereload --livereload-port 35730 --port 4001 \
  --config _config.yml,_config.local.yml
# Open http://localhost:4001
```

### Running Alongside NestNinja.uk

To make cross-site links work locally, run both Jekyll servers simultaneously:

```bash
# Terminal 1 — NestNinja.uk repo (separate checkout)
bundle exec jekyll serve --livereload --livereload-port 35729 --port 4000 \
  --config _config.yml,_config.local.yml

# Terminal 2 — this repo
bundle exec jekyll serve --livereload --livereload-port 35730 --port 4001 \
  --config _config.yml,_config.local.yml
```

| Site          | Local URL                   |
|---------------|-----------------------------|
| NestNinja.uk  | <http://localhost:4000>     |
| NestNinja.hub | <http://localhost:4001>     |

The `_config.local.yml` override sets:
- `url: "http://localhost:4001"` (this site)
- `uk_url: "http://localhost:4000"` (sibling site)

---

## File Structure

```
_config.yml          # Production config (url, uk_url, plugins)
_config.local.yml    # Local dev overrides — NOT for production
_layouts/            # Page templates (home.html, feed.html)
_includes/           # Reusable partials
assets/
  css/style.scss     # Hub-specific styles (teal brand colour)
  js/
    birds-db.js      # Static bird species data
    feeds-db.js      # Static demo feed data
    hub-search.js    # Search/autocomplete logic
    hub-feeds.js     # Feed grid rendering
    hub-feed-page.js # Individual feed page logic
feeds/index.html     # Single feed page — slug resolved from ?slug= URL param
index.md             # Homepage (search + CTA)
search.html          # Full search results page
about.md             # About Hub
```

### JavaScript Notes
All JS is vanilla ES6+ with no build step. The `birds-db.js` and `feeds-db.js` files are static JSON-like modules that will eventually be replaced with live Firebase reads. Do not introduce npm/Node dependencies or a build pipeline without first defining an ADR.

### Diagrams
Mermaid only — no binary diagram files (PNG/SVG), consistent with project-wide ADR-007.

---

## What Belongs Here vs Other Repos

| Content | Here? |
|---|---|
| Camera feed discovery / browsing UI | ✅ |
| Demo feed data (birds-db, feeds-db) | ✅ |
| Firebase integration (future) | ✅ (after ADR) |
| Marketing copy about NestNinja products | ❌ → nestninja.uk |
| Firmware source code | ❌ → NestNinja.open / NestNinja.pro |
| Premium feature implementation | ❌ → NestNinja.pro (private) |

---

## Status & Roadmap

Hub is **pre-launch**. The current site is a static placeholder with demo data. Before implementing a live feed database, the following must be defined via Architecture Decision Records (ADRs):

- Data model and database choice (Firebase preferred starting point)
- Authentication and privacy model
- Domain / subdomain strategy
- Embed / stream URL approach

Do not begin live implementation without ADRs in place.

---

## Version

**Last Updated:** 2026-02-19  
**Applies to:** NestNinja.hub repository only  
**For:** Claude, GitHub Copilot, and other AI coding assistants
