---
title: Matrix
sourceUrl: https://spirit.supernova-docs.io/latest/components/matrix/design-Z9CFEvq7-Z9CFEvq7
sourcePath: /latest/components/matrix/design-Z9CFEvq7-Z9CFEvq7
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:21.951Z
---

- [Overview](/latest/components/matrix/overview-uXzlhaFX)
- [Design](/latest/components/matrix/design-Z9CFEvq7-Z9CFEvq7)
- [React](/latest/components/matrix/react-WCuM7L5Y)
- [HTML](/latest/components/matrix/html-TFHkqROT)
- [Accessibility](/latest/components/matrix/accessibility-n5CwNQwZ-n5CwNQwZ)

### **Matrix vs Grid vs Flex vs Stack**

| Component | Use when                                                                                                                | Strengths                                                               | Don’t use when                                                                                              |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Grid      | You need a multi-column, responsive layout (e.g., product listing, gallery).                                            | Flexible, supports different column counts at breakpoints.              | If you only need single-axis alignment – use Flex. If items must be uniform across rows – use Matrix.       |
| Flex      | You want to arrange items along a single axis (row or column).                                                          | Precise control over alignment, spacing, and distribution.              | If you need multiple columns or uniform rows – use Grid or Matrix. For simple vertical spacing – use Stack. |
| Stack     | You need to arrange items in a vertical sequence with consistent spacing (e.g., form fields).                           | Lightweight, enforces consistent rhythm without custom margins.         | If horizontal alignment is required – use Flex. For multi-column layouts – use Grid or Matrix.              |
| Matrix    | You want a uniform grid pattern where items in the same row align horizontally (e.g., product cards with equal height). | Ensures visual balance and consistency; equal item heights across rows. | If content varies in size and doesn’t need strict alignment – use Grid. For simpler stacking – use Stack.   |

On this page

- [Matrix vs Grid vs Flex vs Stack](#section-matrix-vs-grid-vs-flex-vs-stack-bc)
