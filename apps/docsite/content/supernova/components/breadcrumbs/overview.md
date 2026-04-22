---
title: Breadcrumbs
sourceUrl: https://spirit.supernova-docs.io/latest/components/breadcrumbs/overview-pSrdblPT
sourcePath: /latest/components/breadcrumbs/overview-pSrdblPT
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:12.471Z
---

- [Overview](/latest/components/breadcrumbs/overview-pSrdblPT)
- [Design](/latest/components/breadcrumbs/design-F5EECudN)
- [Figma](/latest/components/breadcrumbs/figma-RW575Xpl-RW575Xpl)
- [HTML](/latest/components/breadcrumbs/html-j6RVbeEw)
- [React](/latest/components/breadcrumbs/react-ok0u0eLy)
- [Accessibility](/latest/components/breadcrumbs/accessibility-eCqiX64d-eCqiX64d)

#### Component Status

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

### **Design Usage**

**Breadcrumbs** provide a **secondary navigation pattern** that shows the user’s **current location within a hierarchy** and allows them to navigate back to higher levels. They are especially useful in multi-level structures, such as websites with categories and subcategories, or apps with nested sections.

---

### **When to Use**

- To show users **where they are** in a hierarchical structure.

- When users may need to **navigate back** to parent sections (e.g., Home → Products → Laptops → Gaming).

- For content-heavy or complex sites (e.g., e-commerce, documentation, dashboards).

- When clarity of **hierarchy** is critical to orientation.

---

### **When Not to Use**

- On **flat structures** or one-level apps/websites where hierarchy doesn’t exist.

- For **primary navigation** (use [**Navigation**](/latest/components/navigation/overview-J6GGfZ2s) instead).

- To switch between **peer content sections** within the same page (use [**Tabs**](/latest/components/tabs/overview-c7gB7K6t)).

- For **progressive disclosure of content** (use [**Accordion**](/latest/components/accordion/overview-TtEldb73) or [**Collapse**](/latest/components/collapse/overview-V3uSQpZM)).

- As a replacement for **Back button** — breadcrumbs complement, but don’t replace, browser/app navigation.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Always start with **“Home”** or the root level.

- Use clear, short labels for each level (avoid truncation when possible).

- Separate items with a familiar visual divider (›, /, →).

- Make all but the last item **interactive**; the current page should be indicated but not linked.

- Keep breadcrumb trails **concise** — don’t show the full path if it’s very deep; truncate intelligently.

- Place breadcrumbs **at the top of the page**, usually above the page title.

- Ensure breadcrumbs complement, but don’t replace, other navigation.

- Keep breadcrumbs styled and positioned consistently across all pages

On this page

- [Design Usage](#section-design-usage-71)
- [When to Use](#section-when-to-use-d3)
- [When Not to Use](#section-when-not-to-use-6e)
- [Best Practices](#section-best-practices-e1)
