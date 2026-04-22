---
title: Avatar
sourceUrl: https://spirit.supernova-docs.io/latest/components/avatar/overview-iFcZOnrs
sourcePath: /latest/components/avatar/overview-iFcZOnrs
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:11.802Z
---

- [Overview](/latest/components/avatar/overview-iFcZOnrs)
- [Design](/latest/components/avatar/design-WQbFkadT)
- [Figma](/latest/components/avatar/figma-FzNpA9Fi-FzNpA9Fi)
- [HTML](/latest/components/avatar/html-5NyvYlCK)
- [React](/latest/components/avatar/react-SteMkvAV)
- [Accessibility](/latest/components/avatar/accessibility-qkOGZM7K-qkOGZM7K)

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

An **Avatar** represents a **user or entity** visually, typically using a profile picture, icon, or initials. It helps identify people, organisations, or accounts in interfaces like headers, lists, or comments.

---

### **When to Use**

- To represent a **user profile** in navigation bars, cards, or lists.

- As part of a **comment, message, or activity feed** to show who is involved.

- To display an **entity icon** (organisation, group, team) when an image isn’t available.

- When quick visual identification **improves scanning**.

---

### **When Not to Use**

- For **decorative images** with no semantic meaning – use **image** or **Icon** instead.

- As a replacement for **user’s full name** – always pair **Avatar** with a text label in most contexts.

- For complex representations (e.g., badges, roles, or statuses) – consider combining **Avatar** with [**Tag**](/latest/components/tag/overview-nOURQFhz), [**Tooltip**](/latest/components/tooltip/overview-zhGH30af), or some form of status indicator.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Always provide a **fallback**:

- **Image** if available.

- **Initials** if no image.

- **Generic icon** if neither is available.

- Ensure **consistent sizing** across the product – don’t mix too many sizes in one context.

- Use **circle or square shapes** consistently as defined in Spirit.

- Place Avatars **next to the associated name or content** for clarity.

- Avoid using Avatars as the **only identifying element** – always provide accompanying text for accessibility and clarity.

On this page

- [Design Usage](#section-design-usage-d9)
- [When to Use](#section-when-to-use-99)
- [When Not to Use](#section-when-not-to-use-53)
- [Best Practices](#section-best-practices-10)
