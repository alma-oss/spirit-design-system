---
title: Card
---

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

A **Card** is a container component used to group **related content and actions** into a clear, scannable unit. Cards help present information in a visually distinct block, often with an image, title, supporting text, and optional actions. They provide a consistent way to display structured data such as products, articles, or profiles.

---

### **When to Use**

- To group **related information** into a unit that’s easy to scan.

- For **collections of similar content** (e.g., product grids, article lists, team member profiles).

- To display **media + metadata + action** in a balanced layout (e.g., image, title, description, button).

- To create **modular layouts** where cards can be repeated in a grid or list.

---

### **When Not to Use**

- For **simple framing or background styling** around one element (e.g., a single icon or image) – use [**Box**](/components/box) instead.

- For **single pieces of content** that don’t need a distinct boundary – use plain text, lists, or sections instead.

- For **complex layouts with multiple unrelated actions** – use a **page section** or **panel**.

- As a **replacement for Navigation** – if the card is meant purely for navigation, consider a **Link list** or **Navigation component** instead.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep cards **simple and consistent** across a set – align elements (image, title, text, actions).

- Provide a **clear hierarchy**: title, supporting text, optional media, actions.

- Make the **entire card clickable** only if it represents a single destination (otherwise, keep actions explicit).

- Don’t overload cards with too much information – they should be quick to scan.

- Use **consistent image ratios** in card groups to avoid irregular layouts.

- Maintain enough spacing between cards to keep the grid clean and avoid visual clutter.
