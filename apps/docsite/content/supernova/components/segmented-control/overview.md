---
title: Segmented Control
sourceUrl: https://spirit.supernova-docs.io/latest/components/segmented-control/overview-nz3Ky39G
sourcePath: /latest/components/segmented-control/overview-nz3Ky39G
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:27.062Z
---

- [Overview](/latest/components/segmented-control/overview-nz3Ky39G)
- [Design](/latest/components/segmented-control/design-tAUoHW3n)
- [Figma](/latest/components/segmented-control/figma-Xmhl7KtD-Xmhl7KtD)
- [HTML](/latest/components/segmented-control/html-bMgACLMi)
- [React](/latest/components/segmented-control/react-kKd84idp)
- [Accessibility](/latest/components/segmented-control/accessibility-Sgmdxybu-Sgmdxybu)

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

- **Avoid if there are more than ~3–5 segments** – it becomes cluttered and harder to scan. Consider **[Select](/latest/components/select/overview-CJTJAcAW)**, **[Dropdown](/latest/components/dropdown/overview-vNMWvfx5)** or **[Tabs](/latest/components/tabs/overview-c7gB7K6t)** instead.

- If options **require explanation, icons, or secondary interactions**, a segmented control is too simple.

- If users **need to select multiple options simultaneously**, consider also using **[Checkboxes](/latest/components/checkbox/overview-rAiP3oPA)** instead.

- If the **goal is to group 2–3 action buttons** (like “Save” + “Cancel”), use an **[Action Group](/latest/components/action-group/overview-Bi5NXFGt)** instead – segmented controls are for _choice_, not _action execution_.

- Segmented controls are for **lightweight switching**, not for navigating entire app sections.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep labels short (1–2 words) for easy scanning.

- Ensure segments have equal width or balanced spacing to avoid visual bias.

On this page

- [Design Usage](#section-design-usage-d4)
- [When to Use](#section-when-to-use-40)
- [When Not to Use](#section-when-not-to-use-7d)
- [Best Practices](#section-best-practices-45)
