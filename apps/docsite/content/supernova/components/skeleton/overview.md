---
title: Skeleton
sourceUrl: https://spirit.supernova-docs.io/latest/components/skeleton/overview-1OlTge6X
sourcePath: /latest/components/skeleton/overview-1OlTge6X
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:28.005Z
---

- [Overview](/latest/components/skeleton/overview-1OlTge6X)
- [Design](/latest/components/skeleton/design-DIGbfyF2)
- [Figma](/latest/components/skeleton/figma-KarPbvrY-KarPbvrY)
- [HTML](/latest/components/skeleton/html-sTQcaRDT)
- [React](/latest/components/skeleton/react-ksjkDfjI)
- [Accessibility](/latest/components/skeleton/accessibility-x0P9i2gc-x0P9i2gc)

#### Component Status

Figma

Up to date

Status

Stable

React

Up to date

### **Design Usage**

A **Skeleton** is a placeholder that simulates the **layout of content while it’s loading**. Instead of showing empty space or a spinner, Skeleton provides visual shapes (blocks, lines, circles) that mimic the eventual content, helping users understand what’s coming and reducing perceived wait time.

- Basic Skeleton elements can be used to recreate any page block that is supposed to be replaced with a skeleton before the actual content is loaded.

- Shape can be used as a placeholder for Icons, Images or buttons – it can replicate basically any circular or rectangular element.

---

### **When to Use**

- To indicate **loading state** for text, images, or cards where content structure is known.

- For **lists, cards, or media** where showing placeholders helps orient users.

- When you want to **reduce layout shifts** by reserving space during loading.

- As part of a **progressive loading strategy** (Skeleton first, then content).

---

### **When Not to Use**

- For **unknown or unpredictable layouts** – use a [**Spinner**](/latest/components/spinner/overview-Q9kGTzdA) instead.

- When loading will be **very short (<1s)** – skeletons may flash unnecessarily.

- To indicate a **blocking action or process** (e.g., submitting a form).

- As a replacement for content – Skeleton must always be swapped with actual data.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Match Skeleton shapes to the **structure of the real content** (lines for text, rectangles for images).

- Use **neutral background colors** – avoid drawing too much attention.

- Animate subtly (e.g., shimmer) to indicate loading, but keep motion minimal.

- Keep Skeletons **lightweight** – don’t overcomplicate with too many placeholder details.

- Ensure Skeleton disappears as soon as real content is available; don’t overlap both.

- In lists, use a **consistent number of skeleton items** to avoid sudden jumps.

On this page

- [Design Usage](#section-design-usage-bd)
- [When to Use](#section-when-to-use-0a)
- [When Not to Use](#section-when-not-to-use-d7)
- [Best Practices](#section-best-practices-fd)
