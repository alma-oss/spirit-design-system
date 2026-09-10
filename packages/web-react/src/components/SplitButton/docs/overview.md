---
title: Split Button
---

#### Component Status

Figma

Up to date

Status

Stable

React

Up to date

### **Design Usage**

The **Split Button** combines a **primary action button** with an attached dropdown of **secondary actions**. It gives users quick access to the most common action while still allowing them to choose alternatives when needed.

The left side (main button) triggers the default action immediately. The right side (chevron/dropdown trigger) opens a menu with related but less frequently used actions.

---

### **When to Use**

- When there’s a **single primary action** that should be easy to trigger directly, but users may occasionally need to choose a different related action.

- For actions that share a common context but differ in detail (e.g., “Save” vs. “Save As…”).

- When you want to keep the UI compact and avoid showing multiple similar buttons side by side.

- In toolbars or action-heavy areas where space efficiency is important.

---

### **When Not to Use**

- If there’s only **one action** – use a [**Button**](/components/button). A Split Button would add unnecessary complexity.

- If you have **multiple equally important actions** (not a clear primary vs secondary) – use [**Segmented Control**](/components/segmented-control) to show them side by side.

- If you need to present **navigation destinations** (e.g., links to different views) – use [**Tabs**](/components/tabs) or [**Navigation**](/components/navigation), not Split Button.

- If the actions are **not closely related** (e.g., “Download PDF” + “Delete item”), don’t group them into one Split Button – use separate buttons or an [**Action Group**](/components/action-group).

- If the secondary actions are too many or too complex – use a [**Dropdown Menu**](/components/dropdown) instead, with a single regular button for the primary action if needed.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Ensure the **primary action** is the most common and safe choice – users should not regret a misclick.

- Keep the number of secondary actions **small and closely related** (2–4 max).

- Label the primary action clearly (e.g., “Save”), and ensure the dropdown items are equally descriptive (e.g., “Save As Draft”, “Save & Close”).

- Use consistent **iconography** (e.g., chevron or caret) to indicate the dropdown part.

- Ensure both parts of the Split Button (primary + dropdown) have clear hit areas and spacing.

- In responsive layouts, consider whether the Split Button should collapse into a **single menu button** on smaller screens.
