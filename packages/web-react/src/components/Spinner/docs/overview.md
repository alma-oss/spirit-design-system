---
title: Spinner
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

A **Spinner** is an animated indicator used to show that **content or a process is loading**, when the duration or structure of the loading state is **unknown**. Unlike **Skeleton**, which shows a preview layout, Spinner conveys that the system is busy without implying a specific structure.

---

### **When to Use**

- When loading **duration is unknown or variable** (e.g., waiting for server response).

- For **short processes** (a few seconds), where Skeletons would be unnecessary.

- To indicate **background tasks** or **inline loading states** (e.g., button in loading state, inline content refresh).

- When showing global/system-level activity (centered on screen or in a modal).

---

### **When Not to Use**

- When you know the **layout of the content being loaded** – use [**Skeleton**](/components/skeleton).

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
