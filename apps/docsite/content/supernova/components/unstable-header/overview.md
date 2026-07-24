---
title: UNSTABLE_Header
sourceUrl: https://spirit.supernova-docs.io/latest/components/unstable-header/overview-nOU7iqvO
sourcePath: /latest/components/unstable-header/overview-nOU7iqvO
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:35.738Z
---

- [Overview](/latest/components/unstable-header/overview-nOU7iqvO)
- [Design](/latest/components/unstable-header/design-noJ6GZd2-noJ6GZd2)
- [Figma](/latest/components/unstable-header/figma-pXldwkGC-pXldwkGC)
- [HTML](/latest/components/unstable-header/html-Ge28rbfg)
- [React](/latest/components/unstable-header/react-BAPcSBj4-BAPcSBj4)
- [Accessibility](/latest/components/unstable-header/accessibility-GHZ35N0F-GHZ35N0F)

#### Component checklist

Is documented

Figma Link

[Open in Figma](https://www.figma.com/file/w9Ca4hvkuYLshsrHu1bYwT?node-id=23259:7513)

Figma

Up to date

Status

The component has a health status indicated

Unstable

HTML

Up to date

React

Up to date

Documentation link

[Open page](/latest/components/unstable-header/overview-nOU7iqvO)

### **Design Usage**

The **Header** serves as a **top-level layout container** that anchors the product or site identity.  
It typically includes at least the **Header Logo** (representing the brand) and may also include **Navigation** for primary links or actions.

The component ensures **consistent alignment, spacing, and responsiveness** across different viewports. It’s designed to remain visually stable and accessible, whether it’s used in a minimal configuration (logo only) or a full configuration with navigation and control.

⚠️ **Note:** The Header component is currently **unstable** and may include breaking changes before reaching the stable release.

---

### **When to Use**

- As the **main header bar** at the top of the page or application.

- To display the **product or company logo**, optionally accompanied by navigation or user controls.

- When you need consistent **structure, alignment, and spacing** for top-level layout elements.

---

### **When Not to Use**

- For **section headers or content titles** – use [**Heading**](/latest/components/heading/overview-IGzEZcgZ).

- For **standalone navigation components** – use [**Navigation**](/latest/components/navigation/overview-J6GGfZ2s) directly.

- For **footers or secondary bars** – use **Footer,** **Section** or custom layout utilities (e.g., [**Flex**](/latest/components/flex/overview-696puvxK), [**Grid**](/latest/design/global-tokens/grid/overview-G7tz28hA)).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Always include a **Header Logo** subcomponent – it defines brand identity.

- Keep navigation content **concise**; limit to primary links and actions.

- Maintain **consistent spacing and alignment** across breakpoints.

- Use **responsive behavior** – hide or collapse navigation for smaller screens.

- Avoid overloading the header with too many controls; prioritize clarity.

---

## **Header Logo**

The **Header Logo** subcomponent displays the product or company logo in the header. It ensures consistent sizing, alignment, and spacing relative to other header elements. It supports both **light and dark modes**, automatically displaying the correct logo version based on the current theme (depending on how ProductLogo or HeaderLogo variant is implemented).

### Best Practices

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Always provide an **accessible name or alt text** (e.g., "CompanyName logo").

- Keep the logo sharp and legible; use **SVG** or optimized raster formats.

- Do not manually scale or distort the logo; use predefined sizing tokens.

- If the logo serves as a link to the homepage, wrap it in a **Link** component with a clear aria-label.

---

## **Using Navigation inside Header**

The **Navigation** component can be used optionally within the Header to present primary site or app navigation.

It typically appears to the right of the logo (in LTR layouts) and can contain links, dropdown menus, or other navigation items.

When including Navigation:

- Maintain a clear **visual hierarchy** – the logo remains the dominant left-aligned element.

- Use **responsive handling** for smaller screens (e.g., collapsing into a menu or drawer).

- Keep **link count manageable** to avoid visual clutter.

- Ensure the **Header height remains consistent** regardless of navigation content.

- Make sure navigation items are keyboard-accessible and have visible focus indicators.

---

Example layout:

- Left: **Header Logo**

- Right: **Navigation** (links or menu)

- Optional: additional elements like search or user avatar.

On this page

- [Design Usage](#section-design-usage-45)
- [When to Use](#section-when-to-use-8f)
- [When Not to Use](#section-when-not-to-use-43)
- [Best Practices](#section-best-practices-55)
- [Header Logo](#section-header-logo-53)
- [Best Practices](#section-best-practices-a7)
- [Using Navigation inside Header](#section-using-navigation-inside-header-0c)
