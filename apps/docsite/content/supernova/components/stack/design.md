---
title: Stack
sourceUrl: https://spirit.supernova-docs.io/latest/components/stack/design-16geyRgi
sourcePath: /latest/components/stack/design-16geyRgi
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:30.661Z
---

- [Overview](/latest/components/stack/overview-RCo1HEot)
- [Design](/latest/components/stack/design-16geyRgi)
- [HTML](/latest/components/stack/html-Q4OhL0rC)
- [React](/latest/components/stack/react-uuzEJkd0)
- [Accessibility](/latest/components/stack/accessibility-Uv3oQ7If-Uv3oQ7If)

![Stack](https://studio-assets.supernova.io/design-systems/10180/179fa050-f8ca-4781-81f2-549220847e74.png)

Stack

Stack

| Property                      | Values | Default |
| ----------------------------- | ------ | ------- | ----- |
| Start Divider Boolean         | true   | false   | true  |
| End Divider Boolean           | true   | false   | true  |
| Spacing Variant               | True   | False   | True  |
| Intermediate Dividers Variant | False  | True    | False |

---

## **Stack vs Grid vs Flex vs Matrix**

| Component | Use when                                                                                                                | Strengths                                                               | Don’t use when                                                                                              |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Grid      | You need a multi-column, responsive layout (e.g., product listing, gallery).                                            | Flexible, supports different column counts at breakpoints.              | If you only need single-axis alignment → use Flex. If items must be uniform across rows – use Matrix.       |
| Flex      | You want to arrange items along a single axis (row or column).                                                          | Precise control over alignment, spacing, and distribution.              | If you need multiple columns or uniform rows – use Grid or Matrix. For simple vertical spacing – use Stack. |
| Stack     | You need to arrange items in a vertical sequence with consistent spacing (e.g., form fields).                           | Lightweight, enforces consistent rhythm without custom margins.         | If horizontal alignment is required – use Flex. For multi-column layouts – use Grid or Matrix.              |
| Matrix    | You want a uniform grid pattern where items in the same row align horizontally (e.g., product cards with equal height). | Ensures visual balance and consistency; equal item heights across rows. | If content varies in size and doesn’t need strict alignment – use Grid. For simpler stacking – use Stack.   |

On this page

- [Stack vs Grid vs Flex vs Matrix](#section-stack-vs-grid-vs-flex-vs-matrix-05)
