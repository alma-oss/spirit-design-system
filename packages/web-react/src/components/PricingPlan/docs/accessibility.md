---
title: Pricing Plan
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Structure**

- Group plans in a semantic **list** (&lt;ul> or &lt;dl>) or a **grid** with proper headings (&lt;h3> for plan names).

- Each bullet should be a concise statement.

### **Labels**

- Price must include the **unit** in text (e.g., “€29 per month”), not only visually.

- Badges like “Most popular” should be **text** (not only an icon); consider a visually hidden note explaining why it’s recommended.

### **Toggle (Billing Period)**

- Expose as a semantic control (e.g., **Segmented Control** or **Radio group**).

- Update **all prices** and **aria-live** a short message (polite) like “Prices updated: yearly billing”.

### **Buttons**

- One **primary button** per plan with explicit text (“Choose Pro”).

- If a plan is not selectable (e.g., requires sales), use a clear **link** (“Contact sales”) and avoid disabled CTAs without guidance.

### **Color and Contrast**

- Ensure all text (including price, footnotes, and feature icons) meets **WCAG AA**.

### **Focus Order**

- Logical order: plan heading → price → description → features → CTA → footnote.

- Keep focus within a plan’s card predictable on keyboard navigation.
