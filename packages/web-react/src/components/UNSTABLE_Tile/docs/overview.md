---
title: UNSTABLE_Tile
---

#### Component Status

Figma

Not available

Status

Unstable

HTML

Up to date

React

Up to date

### **Design Usage**

A **Tile** is the standard surface of a page region: the primary background, the basic border, the same radius as **Card**, and consistent padding. Unlike **Card**, Tile does not structure its content – anything can go inside. Unlike **Box**, its look is already decided, so tiles across a page match each other and boxed Cards.

Not sure which one to use? See [**Box, Tile, or Card**](/design/decision-trees/box-tile-or-card).

---

### **When to Use**

- To frame **free content on the standard surface** (e.g., a settings panel, a form step, a section of an editor).

- To hold **free content** – form fields, rows of data, several headings, or a mix of widgets.

- To give **several regions the same surface** without setting the background, border, radius, and padding by hand.

- To frame a **demo or a widget** in a showcase grid.

---

### **When Not to Use**

- For a **single topic led by a title**, with artwork, media, a logo, or a footer – use [**Card**](/components/card).

- When the **whole region is one link** to one destination – use [**Card**](/components/card) with CardLink.

- For a **custom surface** (e.g., a color scheme, an accent or emotion color, a gradient, or a dashed border) – use [**Box**](/components/box).

- For a **small logo with a short label** – it is content, not a region. Use [**Card**](/components/card) when it is a link, otherwise a plain layout.

- For **spacing or alignment only** – use [**Stack**](/components/stack), [**Flex**](/components/flex), or [**Grid**](/components/grid).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep the **default surface** – recolor the background to secondary or tertiary only when the page needs it. A recolored tile is still a Tile.

- Space the content inside with **Stack or Flex** – Tile does not lay out its children.

- Make a tile a **region named by its heading** only when users would jump to it. Keep the rest plain.

- Tile is **not a Figma component** yet. In a handoff, a frame with the standard surface and free content is a Tile.
