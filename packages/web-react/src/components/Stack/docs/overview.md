---
title: Stack
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

### **Design Usage**

The **Stack** is a layout utility that arranges items in a **vertical sequence with consistent spacing**. It ensures a clean, structured flow of components without needing to apply custom margins to each item.

---

### **When to Use**

- To arrange elements in a **vertical column** with uniform spacing (e.g., form fields, grouped controls, content blocks).

- When you want to maintain a consistent **spacing rhythm** across components.

- For creating **simple vertical layouts** that don’t require multi-column structures.

---

### **When Not to Use**

- For **multi-column layouts** – use [**Grid**](/design/global-tokens/grid).

- For **horizontal alignment/distribution** of items and responsive transfer between horizontal and vertical layout – use [**Flex**](/components/flex).

- For **semantic grouping of related actions** (e.g., a **Button** set) – use [**Action Group**](/components/action-group).

- As a replacement for semantic HTML containers (&lt;section>, &lt;ul>, etc.) – Stack is purely visual.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Prefer Stack over manually applying margins – it ensures consistency and reduces code duplication.

- Keep Stack usage simple – avoid deeply nested Stacks where one will do.

- Use Stack to create **clean vertical rhythm** in forms, settings pages, or content flows.

- Combine with **Box** or **Card** when grouped content also needs framing or background.

- Ensure spacing tokens are used consistently to align with Spirit’s design system.
