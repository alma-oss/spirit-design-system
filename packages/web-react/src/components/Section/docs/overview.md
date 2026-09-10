---
title: Section
---

#### Component checklist

Figma

Not available

Status

Stable

HTML

Up to date

React

Up to date

### **Design Usage**

The **Section** component is a foundational building block in page design. Each Section can have its own background color or styling, helping users visually distinguish parts of a page while maintaining semantic clarity in the markup.

---

### **When to Use**

- To divide content into **clearly defined horizontal sections** on a page.

- To maintain **consistent top and bottom padding** between sections.

- When different **backgrounds or surface styles** are needed to create contrast between page areas.

- To group content that has a **single thematic purpose**.

---

### **When Not to Use**

- For **generic alignment or horizontal spacing only** – use [**Container**](/components/container) or layout utilities.

- For **small content groupings inside a section** – use [**Card**](/components/card)**,** [**Box**](/components/box)**, or** [**Stack**](/components/stack).

- To separate content inline – use [**Divider**](/components/divider) instead.

- For global overlays or layered elements – use [**Modal**](/components/modal)**,** [**Drawer**](/components/drawer)**, or** [**Dropdown**](/components/dropdown).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Each Section should represent a **distinct conceptual block** (e.g., features, testimonials).

- Avoid placing too much unrelated content in one Section – keep them focused.

- Use **consistent vertical spacing** between Sections for rhythm and readability.

- Apply **background colors sparingly** – too many can feel noisy.

- Pair Section with **Container** to align and pad content consistently across devices.

- Use semantic &lt;section> element in markup to reinforce accessibility.
