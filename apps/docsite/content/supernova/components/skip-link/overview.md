---
title: Skip Link
sourceUrl: https://spirit.supernova-docs.io/latest/components/skip-link/overview-vYyFR7Sd
sourcePath: /latest/components/skip-link/overview-vYyFR7Sd
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:28.371Z
---

- [Overview](/latest/components/skip-link/overview-vYyFR7Sd)
- [HTML](/latest/components/skip-link/html-WTEQrT6y)
- [React](/latest/components/skip-link/react-S6aqlL9o)
- [Accessibility](/latest/components/skip-link/accessibility-gdhbL9Dg-gdhbL9Dg)

#### Component Status

Figma

Not available

Status

Stable

React

Up to date

### **Design Usage**

The **SkipLink** component is used to **provide a way for users to skip directly to, e.g. the main content** of a page, **improving accessibility for keyboard and screen reader users**.

By default, it is **visually hidden** and becomes visible when focused via keyboard navigation (Tab).

---

### **When to Use**

- To allow **keyboard and screen reader users** to bypass repetitive blocks of content (like a navigation bar, banners, or tables) and reach the main content quickly.

- To comply with [**WCAG 2.0 Guideline 2.4.1 – Bypass Blocks**](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html).

- In applications or websites with **complex layouts** or **long navigation menus**.

---

### **When Not to Use**

- On pages with **very few navigable items**, skipping provides no real benefit.

- If the structure of the page is simple enough that reaching the main content with a few Tab presses is not a burden.

- As a replacement for good **semantic structure** (e.g. headings, landmarks like <main>, <nav>, <footer>). SkipLink should complement, not replace, semantic HTML.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Place the component as the **first interactive element** on the page, before the main navigation or other repeated blocks.

- Use href that points to a **unique landmark** (e.g. id="main-content").

On this page

- [Design Usage](#section-design-usage-e8)
- [When to Use](#section-when-to-use-02)
- [When Not to Use](#section-when-not-to-use-6d)
- [Best Practices](#section-best-practices-a2)
