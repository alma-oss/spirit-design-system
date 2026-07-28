# Documentation Website

## Migrated Supernova Content

Hardcoded Supernova site pages (excluding component **Web**, **HTML** (web implementation), and **React** tabs, which are sourced from package `README` files) are collected as Markdown in [`content/supernova/`](./content/supernova). Regenerate that tree from the sitemap with:

`yarn supernova:extract` (from the monorepo root; see [scripts/supernova-extract/README.md](../../scripts/supernova-extract/README.md)).
