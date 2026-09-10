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

---

### **When to Use**

- To provide a **background or border** behind a single element (icon, image, badge).

- To visually **separate content blocks** in layouts without the semantic weight of a Card.

- To highlight **small pieces of information** without adding extra actions.

- To give elements a **consistent surface** in mixed content (e.g., a set of icons framed evenly).

---

### **When Not to Use**

- To group **content and actions** into a meaningful unit – use [**Card**](/components/card).

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
