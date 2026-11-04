---
title: Box
---

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

A **Box** is a lightweight container component used to apply **visual framing, background, or spacing** to content. Unlike **Card**, Box does not imply structured content or actions – it’s simply a way to visually separate or highlight an element or block of content (e.g., wrapping an icon, image, or short text).

Not sure which one to use? See [**Box, Tile, or Card**](/design/decision-trees/box-tile-or-card).

---

### **When to Use**

- To provide a **background or border** behind a single element (icon, image, badge).

- To highlight **small pieces of information** without adding extra actions.

- For a **custom surface** (e.g., a color scheme, an accent or emotion color, a gradient, or a dashed border).

---

### **When Not to Use**

- To group **content and actions** into a meaningful unit – use [**Card**](/components/card).

- For a region on the **standard surface** with free content (e.g., a settings panel) – use [**Tile**](/components/unstable-tile).

- For **inline labels or states** – use **[Tag](/components/tag)** or [**Pill**](/components/pill).

- As a **primary interactive element** – use [**Button**](/components/button) or another action component.

- For navigation or structured grouping of information – use [**Navigation**](/components/navigation)**,** [**Tabs**](/components/tabs)**,** [**Accordion**](/components/accordion)**, or list** depending on the context.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep Box usage **minimal and purposeful** – don’t over-decorate content.

- Ensure the **content inside remains the focus**, not the Box itself.

- Maintain **consistent spacing and sizing** when using multiple Boxes in a layout.

- Use **color and border tokens** aligned with Spirit’s design language for backgrounds and outlines.

- Combine with semantic HTML inside – Box is purely visual, not semantic.
