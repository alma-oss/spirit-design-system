---
title: Field Group
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Native Semantics**

- Wrap related controls in &lt;fieldset>; provide a &lt;legend> that names the group.

- Each Checkbox/Radio must still have an **individual** &lt;label>.

### **Helper and Validation Association**

- Prefer to associate **group-level helper and error text** to **each input** with aria-describedby (e.g., all options reference the same helper/error IDs) so screen readers announce it during focus.

- Alternatively, some ATs will read a description placed on the &lt;fieldset>; if your implementation supports it, you can also add aria-describedby to the &lt;fieldset> itself.

### **Keyboard Interaction**

- **Tab** moves into the group; focus lands on the first focusable option.

- **Radios**: Arrow keys move between options; **Space/Enter** selects.

- **Checkboxes**: **Space** toggles the focused option; each option is independently focusable.

### **Validation and Required**

- Indicate required status in the **legend**; for errors, supply **clear text** (not color-only).

- Expose errors via aria-describedby on the affected controls; optionally use a polite **live region** or role="alert" to announce new errors.

### **Contrast and Hit Targets**

- Ensure labels, focus outlines, and any error icons meet **WCAG AA**; keep comfortable targets, especially on touch devices.

### **Reading Order**

- Keep a logical DOM order: legend → helper → options → validation.
