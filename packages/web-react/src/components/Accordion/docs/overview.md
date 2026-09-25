---
title: Accordion
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

The **Accordion** component organizes content into **collapsible sections**. It allows users to expand one or more panels to reveal additional details, while keeping the interface compact and scannable. Accordions work well for **structured, related content** where not all information needs to be visible at once.

---

### **When to Use**

- When presenting **long lists of related content** (e.g., FAQs, policies, product specs).

- When you want to let users **progressively disclose** information without overwhelming them.

- In forms or settings where **sections** can be **grouped** and **expanded/collapsed** as needed.

- When **vertical space is limited** and you want to **avoid displaying all details at once**.

---

### **When Not to Use**

- For **critical information** that users must see to complete a task – keep that visible.

- For **navigation between views** – use [**Tabs**](/components/tabs) or [**Segmented Control**](/components/segmented-control) instead.

- For showing **one-off hints or contextual help** – use [**Tooltip**](/components/tooltip), [**Alert**](/components/alert), or inline text.

- Avoid using an **Accordion** for **step-by-step tasks** – use a **Progress Indicator** pattern instead.

- For very **short lists** (1–2 items) – consider showing the content inline instead of hiding it.

- For **content** that users need **to compare side by side** – an **Accordion** can hide important context.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Ensure each **accordion header** has a **clear, descriptive label**.

- Keep **content** **short and scannable**; avoid nesting accordions inside accordions.

- Decide whether multiple **sections** can be **open at once**, or **only one** (single-expand). Be consistent across the product.

- **Order sections logically** (e.g., most frequently used first).
