---
title: Drawer
sourceUrl: https://spirit.supernova-docs.io/latest/components/drawer/overview-DsjvffCu
sourcePath: /latest/components/drawer/overview-DsjvffCu
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:15.830Z
---

- [Overview](/latest/components/drawer/overview-DsjvffCu)
- [Design](/latest/components/drawer/design-kW1mWVYo-kW1mWVYo)
- [Figma](/latest/components/drawer/figma-BDF1Zdxs-BDF1Zdxs)
- [HTML](/latest/components/drawer/html-Y3NL719K)
- [React](/latest/components/drawer/react-m5mxeG6X-m5mxeG6X)
- [Accessibility](/latest/components/drawer/accessibility-0eIQjr9i-0eIQjr9i)

#### Component checklist

Figma Link

[Open in Figma](https://www.figma.com/file/w9Ca4hvkuYLshsrHu1bYwT?node-id=27293:7890)

Figma

Up to date

Status

The component has a health status indicated

Stable

HTML

Up to date

React

Up to date

### Design Usage

A **Drawer** is a sliding panel that overlays the page from the side (left, right, top, or bottom). It is used to present **secondary content** without disrupting the main context – such as filters, settings, or detail views. Drawers provide more space and persistence than a Dropdown, while remaining lighter than a full Modal.

2.  **Standalone Panel**  
    Use the Drawer as an off-canvas element to display contextual or supplementary content (e.g., filters, settings, forms). It's ideal when you want to keep the user on the current page while showing more details.

3.  **Mobile Navigation**  
    On mobile devices, the Drawer acts as a navigation container, typically accessed via a hamburger icon in the header. This pattern helps save space and keeps the interface clean.

---

### **When to Use**

- To show **secondary content or tools** alongside the main page (e.g., filters, shopping cart, settings).

- When users should **keep context** while interacting with additional content.

- For **details or editing panels** that don’t need to block the whole screen.

- As an alternative to Modal when the interaction is **supplementary, not disruptive**.

---

### **When Not to Use**

- For **inline expansion of content** – use [**Accordion**](/latest/components/accordion/overview-TtEldb73) or [**Collapse**](/latest/components/collapse/overview-V3uSQpZM).

- For **short, lightweight actions** (menus, quick actions) – use [**Dropdown**](/latest/components/dropdown/overview-vNMWvfx5).

- For **task-focused or blocking content** that requires completion before continuing – use [**Modal**](/latest/components/modal/overview-1gk69bB0).

- For **temporary global notifications** – use [**Toast**](/latest/components/toast/overview-fGKpsqnF).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep Drawer content **focused** and **easy to scan** – avoid overloading with complex flows.

- Clearly **separate primary content** (page) from secondary content (drawer).

- Ensure a **visible close button** is always present.

- Use consistent **entry/exit animations** (slide in/out) to make the interaction predictable.

- Place Drawers consistently (e.g., filters from the left, details from the right) to reinforce patterns.

- Avoid nesting drawers or overwhelming the user with too much information.

- Don’t rely solely on Drawer for critical tasks — use Modal if user action must block progress.

On this page

- [Design Usage](#section-design-usage-a0)
- [When to Use](#section-when-to-use-94)
- [When Not to Use](#section-when-not-to-use-f9)
- [Best Practices](#section-best-practices-d0)
