---
title: Spinner
sourceUrl: https://spirit.supernova-docs.io/latest/components/spinner/overview-Q9kGTzdA
sourcePath: /latest/components/spinner/overview-Q9kGTzdA
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:29.322Z
---

- [Overview](/latest/components/spinner/overview-Q9kGTzdA)
- [Design](/latest/components/spinner/design-ekXLahqn)
- [Figma](/latest/components/spinner/figma-TLTeM9fC-TLTeM9fC)
- [HTML](/latest/components/spinner/html-dBmny8a9)
- [React](/latest/components/spinner/react-w7EmhF7Y)
- [Accessibility](/latest/components/spinner/accessibility-ipHRXm3F-ipHRXm3F)

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

A **Spinner** is an animated indicator used to show that **content or a process is loading**, when the duration or structure of the loading state is **unknown**. Unlike **Skeleton**, which shows a preview layout, Spinner conveys that the system is busy without implying a specific structure.

---

### **When to Use**

- When loading **duration is unknown or variable** (e.g., waiting for server response).

- For **short processes** (a few seconds), where Skeletons would be unnecessary.

- To indicate **background tasks** or **inline loading states** (e.g., button in loading state, inline content refresh).

- When showing global/system-level activity (centered on screen or in a modal).

---

### **When Not to Use**

- When you know the **layout of the content being loaded** – use [**Skeleton**](/latest/components/skeleton/overview-1OlTge6X).

- For **long-running tasks** where progress can be measured – use **progress indicator** or progress bar.

- To replace actual feedback – Spinners should always be accompanied by context (what is loading).

- For decorative or continuous animation – only use Spinner to convey system activity.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use Spinners **sparingly** – they can cause frustration if shown too often or for long periods.

- Place them **close to the element or area being updated** (e.g., inside a button, inline with list).

- For global waits, center a Spinner in the viewport or modal, with optional text (“Loading…”).

- Pair with **textual feedback** where possible (e.g., “Loading data”, “Processing request”).

- Avoid indefinite spinning for long tasks – switch to a **progress indicator** if possible.

- Use **size variants** appropriate to context (small for inline, larger for global).

On this page

- [Design Usage](#section-design-usage-bb)
- [When to Use](#section-when-to-use-de)
- [When Not to Use](#section-when-not-to-use-7d)
- [Best Practices](#section-best-practices-66)
