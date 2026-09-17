---
title: Segmented Control
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

A Segmented Control is a horizontal group of multiple, equally important buttons (segments) that allow users to switch between a small number of related views, modes, or states.

---

### **When to Use**

- To let users **toggle between categories** of content (e.g., "List / Grid", "Day / Week / Month").

- Users **must pick exactly one option from a short set** of alternatives.

- Users **can pick multiple options.**

- The **interaction needs to be fast**, without requiring confirmation or deep navigation.

- Compared to dropdowns or tabs, segmented controls take less vertical space and can feel lighter.

---

### **When Not to Use**

- **Avoid if there are more than ~3–5 segments** – it becomes cluttered and harder to scan. Consider **[Select](/components/select)**, **[Dropdown](/components/dropdown)** or **[Tabs](/components/tabs)** instead.

- If options **require explanation, icons, or secondary interactions**, a segmented control is too simple.

- If users **need to select multiple options simultaneously**, consider also using **[Checkboxes](/components/checkbox)** instead.

- If the **goal is to group 2–3 action buttons** (like “Save” + “Cancel”), use an **[Action Group](/components/action-group)** instead – segmented controls are for _choice_, not _action execution_.

- Segmented controls are for **lightweight switching**, not for navigating entire app sections.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep labels short (1–2 words) for easy scanning.

- Ensure segments have equal width or balanced spacing to avoid visual bias.
