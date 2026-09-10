---
title: Container
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

A **Container** is a structural utility that provides **consistent width, alignment, and padding** for page content. It is typically placed **inside a Section** to ensure content is aligned with the grid and adapts fluidly across different devices and viewports.

---

### **When to Use**

- To wrap page content inside a **Section** for consistent alignment and semantic grouping.

- For **responsive layouts** where content should adapt to screen size while maintaining readable line lengths.

- To ensure **consistent horizontal padding** across the site.

- To constrain content width in **large screens** while still keeping it fluid.

---

### **When Not to Use**

- For **semantic grouping of content** – use [**Section**](/components/section) instead.

- For **complex multi-column layouts** – use [**Grid**](/design/global-tokens/grid) or [**Matrix**](/components/matrix).

- For **small inline groupings** – use [**Box**](/components/box)**,** [**Card**](/components/card)**, or** [**Stack**](/components/stack).

- For overlays or layered components – use [**Modal**](/components/modal)**,** [**Drawer**](/components/drawer)**, or** [**Dropdown**](/components/dropdown).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Always use Container **inside a Section**, not as a standalone structural block.

- Apply consistent **horizontal padding** across all Containers for visual rhythm.

- Avoid nesting multiple Containers unnecessarily.

- Use Containers to **limit line length** for readability (especially text-heavy content).

- Ensure Containers **scale fluidly** across breakpoints while maintaining alignment.
