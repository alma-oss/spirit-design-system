---
title: Tabs
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

The **Tabs** component organizes content into **multiple sections** that share the same context.

Each tab corresponds to a panel; switching tabs replaces the visible content while keeping the user in the same view.

Tabs are ideal when users need to **navigate between related content areas** without leaving the page.

---

### **When to Use**

- To switch between **multiple related content areas** (e.g., product details, reviews, specifications).

- When there are **2–7 sections** that are equally important.

- When all content belongs to the same overall context (e.g., different data views, sections of a form).

- When users may need to compare or switch between sections quickly.

---

### **When Not to Use**

- For **one-off disclosure of details** – use [**Collapse**](/components/collapse) (single block) or [**Accordion**](/components/accordion) (multiple blocks).

- For content that is too large to fit into the viewport – use **Scroll View**.

- For **binary view switching** (e.g., “List / Grid”) – use [**Segmented Control**](/components/segmented-control).

- For **navigation between pages or app-level sections** – use [**Navigation**](/components/navigation) instead of Tabs.  
  To avoid usability issues (a dark pattern), different components should be consistently used for switching content and navigating between pages or sections to prevent confusion for users.

- For **step-by-step processes** – use **progress indicator**.

- If you have a **very large number of categories** (10+) – consider a different navigation pattern (sidebar, filter, or search).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Label tabs **clearly and concisely** – one or two words when possible.

- Keep the number of tabs manageable (ideally **2–7**).

- Show which tab is active with a **strong visual indication** (highlight, underline).

- Keep tabs in a **consistent order**; avoid rearranging dynamically.

- Ensure tab panels are **logically related** – don’t mix unrelated content just for space saving.

- Consider responsive behavior – tabs may need to collapse into a **select menu** or scrollable strip on smaller screens.
