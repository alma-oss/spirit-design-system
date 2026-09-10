---
title: Spinner
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Mark loading regions with aria-busy="true" so assistive tech knows content is not ready.

- If Spinner is standalone, give it a descriptive label via role="status" and aria-label="Loading" or associate visible text.

### **Announcements**

- For global or critical waits, announce with a **live region** (e.g., “Loading, please wait”).

- Update the region once loading completes.

### **Keyboard**

- Spinner must **not be focusable** itself.

- Ensure users can’t interact with incomplete content while Spinner is active.

### **Contrast and Motion**

- Spinner must remain visible against its background (WCAG AA).

- Respect prefers-reduced-motion: provide a static alternative (e.g., a pulsing dot or text “Loading…”) for motion-sensitive users.

### **Context**

- Never show Spinner without context. Users should know **what is loading** and when it will complete.
