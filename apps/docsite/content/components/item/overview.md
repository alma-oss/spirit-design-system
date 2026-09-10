---
title: Item
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

**Item** represents a **single selectable or actionable entry** within a parent component — such as a **Select**, **Dropdown**, **Menu**, or **List**. It provides a consistent layout for text and optional icon, and can display **selected** and **disabled** states.  
Items maintain consistent spacing, typography, and alignment across all components that use them, ensuring visual and behavioral coherence in Spirit interfaces.

- For single-select options, use the variant called _Single Select_ or _Single Select and Icon._

- The variant _Radio_ is for custom selection (for example, jobs.cz SERP filters).

---

### **When to Use**

- Inside a **Select**, **Dropdown**, or similar component to present a list of choices or actions.

- To provide a **simple, uniform row** with a text label and optional icon.

- When you need **selected** or **disabled** states for options.

- As a building block for **custom menus or contextual lists**.

---

### **When Not to Use**

- For **standalone content blocks** → use **Card**, **Box**, or **List Item** patterns.

- For **form field groupings** (like multiple checkboxes or radios) → use **Field Group** with the corresponding input components.

- For **navigation links** → use **Navigation Item** or **Breadcrumb** instead.

- For **interactive row patterns** with multiple actions or metadata → use **List Item** or a custom layout.

---

### **Best Practices**

- Keep **labels concise and clear** — ideally one line of text.

- Use an **icon** only when it reinforces meaning (e.g., file type, status).

- Apply **selected** state only to one Item per list when multiple selection is not supported.

- Use **disabled** state to indicate unavailable or inactive options.

- Keep visual hierarchy consistent — same icon size, spacing, and typography across all Items in a list.

- Avoid mixing multiple Item types (some with icons, others without) in the same list unless meaningful.

- Never overload an Item — it should stay lightweight and scannable.
