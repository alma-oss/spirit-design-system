---
title: Avatar
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow these recommendations.

### **Alt Text or Labelling**

- If the Avatar is only an &lt;img>, use alt="\[user name\]".

- If initials are used, the text itself conveys meaning.

- If only an icon is used, provide an accessible label (aria-label="\[user name\]").

### **Decorative Use**

- If Avatar is purely decorative and text already names the person, use empty alt (alt="") or aria-hidden="true".

### **Keyboard**

- Static Avatars should **not be focusable**.

- If Avatar is interactive (e.g., opens a profile menu), it must be a semantic button/link with a descriptive label.

### **Contrast and Clarity**

- Ensure initials and icons meet **WCAG AA** contrast against the background.

- Maintain clear visibility in both light and dark themes.

### **Groups**

- When showing grouped Avatars, ensure each has an accessible label (e.g., “Anna Novak, Peter Smith, +3 more”).

### **Touch Target**

- Interactive Avatars should follow ~44×44 px sizing for tap areas.
