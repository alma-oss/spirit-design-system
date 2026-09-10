---
title: Header
---

#### Component checklist

Is documented

Figma Link

Figma

Up to date

Status

The component has a health status indicated

Stable

HTML

Up to date

React

Up to date

Documentation link

[Open page](/components/header)

### **Design Usage**

The **Header** serves as a **top-level layout container** that anchors the product or site identity.  
It typically includes at least the **Header Logo** (representing the brand) and may also include **Navigation** for primary links or actions.

The component ensures **consistent alignment, spacing, and responsiveness** across different viewports. It’s designed to remain visually stable and accessible, whether it’s used in a minimal configuration (logo only) or a full configuration with navigation and control.

---

### **When to Use**

- As the **main header bar** at the top of the page or application.

- To display the **product or company logo**, optionally accompanied by navigation or user controls.

- When you need consistent **structure, alignment, and spacing** for top-level layout elements.

---

### **When Not to Use**

- For **section headers or content titles** – use [**Heading**](/components/heading).

- For **standalone navigation components** – use [**Navigation**](/components/navigation) directly.

- For **footers or secondary bars** – use **Footer,** **Section** or custom layout utilities (e.g., [**Flex**](/components/flex), [**Grid**](/design/global-tokens/grid)).

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
