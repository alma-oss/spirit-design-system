---
title: Footer
sourceUrl: https://spirit.supernova-docs.io/latest/components/footer/overview-T6I75fDO
sourcePath: /latest/components/footer/overview-T6I75fDO
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:18.957Z
---

- [Overview](/latest/components/footer/overview-T6I75fDO)
- [Design](/latest/components/footer/design-M4NDAOSP)
- [HTML](/latest/components/footer/html-24T7XDKf)
- [React](/latest/components/footer/react-oFjDz9MJ)
- [Accessibility](/latest/components/footer/accessibility-oQxYQkiO-oQxYQkiO)

#### Component Status

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

### **Design Usage**

The **Footer** component provides the structural building blocks needed to create consistent, responsive page footers across Spirit-based applications.

It supports arrangements of **branding (ProductLogo)**, **footer navigation**, **legal information**, and optional **social links** or other secondary content.

Footers mark the end of the page and help users access **supporting links**, **company information**, and **legal pages** without overwhelming the primary layout.

---

## When to Use

- At the **bottom of a page** or application as the final structural section.

- To display **company branding** via ProductLogo.

- To offer **secondary navigation** such as:

- Support pages

- Company info

- Legal/policy links

- Product-related links

- To show **copyright notices**, **legal disclaimers**, or **footer-level information**.

- When you need a **consistent, responsive footer layout** across pages and products.

---

## When Not to Use

- For top-level navigation or brand identity – use **Header**.

- For inline or contextual information – use smaller components like **Text**, **Link**, or **List**.

- For local section footers inside content blocks – use layout utilities (**Flex**, **Grid**, **Stack**, etc.) to build them instead of using the full Footer component.

---

## Best Practices

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Maintain a clear structure:  
  **ProductLogo → Navigation groups → Legal text → Optional social links**

- Keep the footer concise and scannable – fewer, well-organised links perform better than dense lists of links.

- Use consistent spacing between content groups.

- On smaller screens, allow footer elements to **stack vertically** in a clear order.

- When social links are used, place them in a separate group with clear icon labelling.

- Ensure the footer’s background and text colours have sufficient contrast in both light and dark modes.

---

# **Footer Logo**

The **Footer Logo** subcomponent is used to display the product or company logo inside the footer area.  
It ensures proper spacing, scaling, and alignment relative to navigation and legal content.

### Best practices

- Use the **appropriate logo version** for the footer background; ensure correct contrast.

- Maintain a comfortable margin around the logo to avoid visual crowding.

- If the logo acts as a link (e.g., back to homepage), ensure it has a proper aria-label.

- Prefer **SVG** for crisp rendering at all sizes and device resolutions.

---

# **Using Navigation inside the Footer**

The Footer can optionally include one or more **Navigation** components to present grouped footer links such as:

- Support

- Product

- About

- Legal

- Social links

Navigation inside the footer should be treated as **secondary** (or tertiary) navigation — not as the primary site navigation.

### Best Practices for Footer Navigation

- Group related links under clear headings (e.g., “Product”, “Company”, “Legal”).

- Keep groups balanced in length to maintain visual harmony.

- On smaller screens, allow navigation groups to **stack** vertically.

- Ensure all links remain keyboard-accessible with visible focus states.

- Avoid deep navigation paths – footer links should be simple and direct.

### Note

- Spirit Footer is highly customizable because it is essentially only a composition of other existing components like Grid, Flex, and Product Logo.

On this page

- [Design Usage](#section-design-usage-59)
- [When to Use](#section-when-to-use-f6)
- [When Not to Use](#section-when-not-to-use-33)
- [Best Practices](#section-best-practices-a3)
- [Footer Logo](#section-footer-logo-ca)
- [Best practices](#section-best-practices-ba)
- [Using Navigation inside the Footer](#section-using-navigation-inside-the-footer-ba)
- [Best Practices for Footer Navigation](#section-best-practices-for-footer-navigation-9c)
- [Note](#section-note-3f)
