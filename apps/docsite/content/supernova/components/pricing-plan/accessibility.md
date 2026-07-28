---
title: Pricing Plan
sourceUrl: https://spirit.supernova-docs.io/latest/components/pricing-plan/accessibility-ltYyOKgN-ltYyOKgN
sourcePath: /latest/components/pricing-plan/accessibility-ltYyOKgN-ltYyOKgN
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:25.389Z
---

- [Overview](/latest/components/pricing-plan/overview-PKE6hibE)
- [Design](/latest/components/pricing-plan/design-W86rn9AG)
- [Figma](/latest/components/pricing-plan/figma-0qmazwRJ-0qmazwRJ)
- [HTML](/latest/components/pricing-plan/html-43yubE7P)
- [React](/latest/components/pricing-plan/react-t473exn5)
- [Accessibility](/latest/components/pricing-plan/accessibility-ltYyOKgN-ltYyOKgN)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Structure**

- Group plans in a semantic **list** (<ul> or <dl>) or a **grid** with proper headings (<h3> for plan names).

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

On this page

- [Accessibility](#section-accessibility-f3)
- [Structure](#section-structure-92)
- [Labels](#section-labels-32)
- [Toggle (Billing Period)](#section-toggle-billing-period-44)
- [Buttons](#section-buttons-1c)
- [Color and Contrast](#section-color-and-contrast-7d)
- [Focus Order](#section-focus-order-f8)
