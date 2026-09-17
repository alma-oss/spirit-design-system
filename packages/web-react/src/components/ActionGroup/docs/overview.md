---
title: Action Group
---

#### Component Status

Figma

Not available

Status

Stable

HTML

\-

React

Up to date

### Design Usage

Action Group is a layout utility for grouping two or more action buttons. It ensures consistent alignment and responsive behavior — buttons stack vertically on smaller screens and align horizontally on larger screens by default.

---

### **When to Use**

- When you need to present **two or three related actions** together (e.g., “Save” and “Cancel”).

- When actions should adapt layout based on breakpoints (vertical on mobile, horizontal on tablet/desktop).

- When buttons need clear alignment (left, right, stretch).

---

### **When Not to Use**

- When you have only a **single button** – **Action Group** adds unnecessary complexity.

- When grouping **non-action elements** such as inputs or content.

- When you need **complex or irregular layouts** – use [**Flex**](/components/flex) or [**Grid**](/design/global-tokens/grid) instead.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Limit to **two or three buttons** to maintain clarity and avoid overwhelming users.

- Respect default behavior (vertical on mobile, horizontal on larger screens); override only if necessary.

- For reversed ordering (e.g., placing “Cancel” before “Save”), use direction and alignmentX props to control order and alignment.

- Keep button labels short and action-oriented.

- Ensure one button is visually primary – avoid multiple competing primary actions in the same group.
