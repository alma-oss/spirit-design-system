---
title: Container
sourceUrl: https://spirit.supernova-docs.io/latest/components/container/overview-J02hefXB
sourcePath: /latest/components/container/overview-J02hefXB
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:14.875Z
---

- [Overview](/latest/components/container/overview-J02hefXB)
- [HTML](/latest/components/container/html-NRwdMXgn)
- [React](/latest/components/container/react-f9wmqaQd)
- [Accessibility](/latest/components/container/accessibility-15LQtB5u-15LQtB5u)

#### Component Status

Figma

Not available

Status

Stable

HTML

Up to date

React

Up to date

### **Design Usage**

A **Container** is a structural utility that provides **consistent width, alignment, and padding** for page content. It is typically placed **inside a Section** to ensure content is aligned with the grid and adapts fluidly across different devices and viewports.

---

### **When to Use**

- To wrap page content inside a **Section** for consistent alignment and semantic grouping.

- For **responsive layouts** where content should adapt to screen size while maintaining readable line lengths.

- To ensure **consistent horizontal padding** across the site.

- To constrain content width in **large screens** while still keeping it fluid.

---

### **When Not to Use**

- For **semantic grouping of content** – use [**Section**](/latest/components/section/overview-nCm5yBME) instead.

- For **complex multi-column layouts** – use [**Grid**](/latest/design/global-tokens/grid/overview-G7tz28hA) or [**Matrix**](/latest/components/matrix/overview-uXzlhaFX).

- For **small inline groupings** – use [**Box**](/latest/components/box/overview-qy7lFEkG)**,** [**Card**](/latest/components/card/overview-9kNBP7gC)**, or** [**Stack**](/latest/components/stack/overview-RCo1HEot).

- For overlays or layered components – use [**Modal**](/latest/components/modal/overview-1gk69bB0)**,** [**Drawer**](/latest/components/drawer/overview-DsjvffCu)**, or** [**Dropdown**](/latest/components/dropdown/overview-vNMWvfx5).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Always use Container **inside a Section**, not as a standalone structural block.

- Apply consistent **horizontal padding** across all Containers for visual rhythm.

- Avoid nesting multiple Containers unnecessarily.

- Use Containers to **limit line length** for readability (especially text-heavy content).

- Ensure Containers **scale fluidly** across breakpoints while maintaining alignment.

On this page

- [Design Usage](#section-design-usage-af)
- [When to Use](#section-when-to-use-85)
- [When Not to Use](#section-when-not-to-use-b2)
- [Best Practices](#section-best-practices-af)
