---
name: spirit:html
description: >-
  HTML/markup review knowledge for the Spirit Design System web package — semantic elements, document
  structure, correct element-for-purpose, and form markup. Loaded by the web reviewer;
  standalone-invokable when reviewing only markup. Use when reviewing or building Spirit HTML.
---

# HTML (Spirit Web)

Markup review knowledge for `packages/web` (and the HTML structure React renders). The ARIA,
keyboard, and assistive-technology depth lives in `spirit:accessibility`; this skill covers correct
semantic markup, which is the foundation a11y builds on. Report only what linters cannot catch (see
the code-review methodology).

## Use the Right Element

- **`button` for actions, `a[href]` for navigation.** A clickable `div`/`span` is a finding — it
  loses keyboard operability and semantics for free with the native element.
- Use native form controls (`input`, `select`, `textarea`, `label`) rather than re-implementing them.
- Lists are `ul`/`ol`/`li`; tabular data is a `table` with `th`/`scope`, not a grid of divs.

## Document & Landmark Structure

- One logical `h1` per page/region; heading levels do not skip (no `h2` → `h4`).
- Landmark elements (`header`, `nav`, `main`, `footer`, `aside`, `section`) over generic `div`s where
  a landmark applies.
- Order DOM in reading order; do not rely on CSS to reorder meaningful content.

## Forms

- Every control has an associated `<label>` (wrapping or `for`/`id`); placeholders are not labels.
- Group related fields with `fieldset`/`legend`.
- Use appropriate `type`, `name`, and `autocomplete` attributes.
- (Programmatic error association and announcements: see `spirit:accessibility`.)

## Attributes & Hygiene

- `id` values are unique within the document.
- Boolean attributes (`disabled`, `required`, `readonly`) are used as booleans, not string values.
- Images have meaningful `alt`, or empty `alt` when decorative (see `spirit:accessibility`).
