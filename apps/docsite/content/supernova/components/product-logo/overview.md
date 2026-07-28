---
title: Product Logo
sourceUrl: https://spirit.supernova-docs.io/latest/components/product-logo/overview-bkZdqTca
sourcePath: /latest/components/product-logo/overview-bkZdqTca
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:25.410Z
---

- [Overview](/latest/components/product-logo/overview-bkZdqTca)
- [Design](/latest/components/product-logo/design-5MCz8mOC)
- [HTML](/latest/components/product-logo/html-o92DZKsc)
- [React](/latest/components/product-logo/react-5syB8D4s)
- [Accessibility](/latest/components/product-logo/accessibility-sD0lNrPO-sD0lNrPO)

#### Component Status

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

### Design Usage

**ProductLogo** ensures that the company or product logo is always displayed **with correct proportions, alignment, and contrast**, regardless of its placement — such as in the **Header**, **Footer**, or **login screens**.

It provides built-in support for **light and dark mode variants**, automatically showing the correct version based on the current theme or background.

The component helps maintain **brand consistency** across all Spirit-based applications.

---

### **When to Use**

- To display the **company or product logo** in a header, footer, navigation, or sign-in screen.

- When the logo needs to **adapt to different color themes** (light/dark).

- To ensure **consistent logo sizing and alignment** throughout the interface.

- To embed a **static brand image** that should not be replaced or stretched by user content.

---

### **When Not to Use**

- For **displaying third-party logos,** a [**PartnerLogo**](/latest/components/partner-logo/overview-8KYpEm6d) component should be used in such cases.

- For **focal content images** (e.g., product photos, banners) – use **image** or **media** components.

- As an interactive element – wrap in a [**Link**](/latest/components/link/overview-w4DlWKKF) (e.g., to homepage) when navigation is needed.

---

### **Best Practices**

- Use **official brand assets** with proper safe margins; never crop or distort logos.

- Always provide **both light and dark mode versions** to ensure legibility in all themes.

- Use **transparent backgrounds** (SVG preferred) for best rendering on varied surfaces.

- Maintain a **consistent visual size** across different UI regions (headers, footers).

- Avoid using logos for decorative purposes – they represent brand identity.

- Wrap **ProductLogo** in a **Link** only if the logo should serve as navigation (e.g., link to homepage).

---

### Notes

- For Alma Career products, all logos will be displayed from a single source to make sure they are unified and can be easily updated as needed.

- With the introduction of Dark Mode, this component will be responsible for displaying a proper color variant of the logo on the light and dark backgrounds.

On this page

- [Design Usage](#section-design-usage-8f)
- [When to Use](#section-when-to-use-cc)
- [When Not to Use](#section-when-not-to-use-13)
- [Best Practices](#section-best-practices-85)
- [Notes](#section-notes-1a)
