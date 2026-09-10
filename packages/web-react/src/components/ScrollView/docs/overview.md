---
title: Scroll View
---

#### Component Status

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

### Design Usage

**ScrollView** provides a simple way to make content scrollable within a defined area. It can handle both **horizontal and vertical overflow** and optionally hide native scrollbars to maintain a clean appearance. Overflow decorators (visual gradients or shadows) can be shown at the edges to indicate more content is available off-screen.  
Use ScrollView to create **scrollable regions** without breaking layout flow or introducing inconsistent overflow behavior across browsers.

---

### **When to Use**

- When content exceeds the available space and should be **scrollable inside a limited container**.

- To provide **horizontal scrolling** for wide content (e.g., data tables, tag lists, card carousels).

- To provide **vertical scrolling** for long sections within a fixed layout (e.g., side panels, drawers).

- To subtly **indicate hidden overflow** using built-in decorators.

---

### **When Not to Use**

- For **full-page scrolling** – rely on the browser’s native page scroll.

- When truncation or pagination would be a better experience (e.g., long lists).

- When scrolling could hide important actions or inputs – prefer showing all critical elements.

- For **infinite or dynamic content loading** – use a more robust list or virtual scroll solution.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use **horizontal ScrollView** sparingly; it’s less discoverable on desktop.

- Always provide **visual overflow indicators** (decorators) when scrollbars are hidden.

- Keep **scroll direction consistent** – don’t combine vertical and horizontal scrolling in one container unless necessary.

- Ensure **keyboard and touch scrolling** both work (no scroll-blocking wrappers).

- When hiding scrollbars, maintain **scroll accessibility** for keyboard users (e.g., arrow keys, tab order).

- Maintain **padding at the end** of scrollable content so it doesn’t appear cut off.

- For content with focusable elements (buttons, inputs), ensure focus moves correctly inside the scroll region.
