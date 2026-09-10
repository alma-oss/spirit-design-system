---
title: Toggle
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics and Role**

- Expose the control as a **switch** to assistive tech (e.g., a native checkbox with role="switch") and keep state in checked **/** aria-checked in sync with visuals.

### **Name and Description**

- Provide a **visible label** or aria-label (for icon-only contexts). Use aria-describedby for helper text explaining impact.

### **Keyboard**

- Must be focusable via **Tab** and toggle via **Space** (and **Enter** where applicable). Show a clear **focus indicator**.

### **State Changes**

- Announce changes immediately. If saving asynchronously, communicate progress and result (e.g., “Saving…”, then success/failure).

### **Contrast and Cues**

- Meet **WCAG AA** contrast for handle/track/label in **default/hover/active/disabled**. Do **not** rely on color alone to differentiate On vs. Off—pair with position, label, or icon.

### **Disabled and Loading**

- Disabled toggles should be visually distinct and not focusable; loading should temporarily block further toggles while keeping the label perceivable.
