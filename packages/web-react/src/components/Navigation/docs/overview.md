---
title: Navigation
---

#### Component checklist

Is documented

Figma Link

[Open in Figma](https://www.figma.com/file/w9Ca4hvkuYLshsrHu1bYwT?node-id=23259:6497)

Figma

Up to date

Status

The component has a health status indicated

Stable

HTML

Up to date

React

Up to date

Documentation link

[Open page](/components/navigation)

### **Design Usage**

**Navigation** provides the primary means for moving between **pages, sections, or views** in an application or website. Unlike Tabs, which switch content within the same page context, Navigation is used for **site- or app-level structure**, ensuring users can find and move between different areas of the product.

---

### **When to Use**

- To give users access to **top-level sections** (e.g., Home, Products, Pricing, About).

- For **site-wide menus** (headers, sidebars, footers).

- For **multi-page applications**, where each section is its own destination.

- When users need to explore **different content domains**, not just views of the same data.

---

### **When Not to Use**

- To switch between **related panels within one page** – use [**Tabs**](/components/tabs).

- For **binary or small mutually exclusive choices** (e.g., “List / Grid”) – use [**Segmented Control**](/components/segmented-control).

- To **progressively disclose detail** within a page – use [**Accordion**](/components/accordion) or [**Collapse**](/components/collapse).

- To present **contextual actions** – use [**Button**](/components/button)**,** [**Action Group**](/components/action-group)**, or** [**Split Button**](/components/split-button).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep navigation **clear and consistent** across the product.

- Place navigation in **predictable locations** (top header, left sidebar).

- Use **descriptive labels** – avoid jargon or internal terms.

- Indicate the **current location** with a clear active state.

- Keep the number of primary items manageable (ideally under 7); group secondary items into menus or drawers.

- Consider responsive patterns – e.g., collapsing into a **hamburger menu** or **bottom nav bar** on small screens.

- Provide a clear hierarchy – use sub-navigation, breadcrumbs, or menus for deeper levels.
