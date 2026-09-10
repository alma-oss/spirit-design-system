---
title: Pill
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Labels**

- The text inside the Pill serves as its accessible name.

- If the Pill shows only a number, make sure the surrounding context provides meaning (e.g., “Messages 12” rather than just “12”).

### **Announcements**

- If Pills are used for counts, ensure screen readers can associate the number with its label (use &lt;span> with aria-labelledby if necessary).

### **Contrast**

- Ensure text and background meet **WCAG AA** contrast requirements.

### **Size**

- Text should remain legible at smaller sizes.

- Ensure the pill’s shape does not clip or truncate content.
