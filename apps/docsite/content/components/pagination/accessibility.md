---
title: Pagination
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics and Roles**

- Use a &lt;nav aria-label="Pagination"> container for the control.

- Group numbers in a list (&lt;ul>&lt;li>).

- Render page links as **anchor elements** (&lt;a>) or buttons if they trigger in-place updates.

- Mark the current page item with aria-current="page"; ensure it is **not a navigable link** (or is inert).

### **Keyboard**

- All interactive items must be reachable via **Tab**; **Enter/Space** activates.

- If you provide a compact “jump to page” input, label it and ensure it’s operable by keyboard and announced properly.

### **Announcements and Labels**

- Include informative text for assistive tech (e.g., aria-label="Go to page 4", aria-label="Next page").

- If ranges are truncated with an ellipsis, treat the ellipsis as **decorative** (non-interactive) or, if interactive, label it (e.g., “More pages”).

### **Focus Management**

- On page change, keep focus behavior predictable: typically **move focus to the new “current page”** link or **back to the list heading** if content refreshes significantly.

### **Contrast and Targets**

- Meet **WCAG AA** contrast for numbers, labels, and focus outlines in all states (default, hover, focus, disabled).

- Ensure comfortable touch targets (~**44 × 44 px** minimum).

### **Live Updates**

- If the list content updates **without a full page load**, announce changes (e.g., via a polite **live region**) so screen reader users know results have changed.
