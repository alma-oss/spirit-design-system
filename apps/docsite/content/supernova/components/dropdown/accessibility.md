---
title: Dropdown
sourceUrl: https://spirit.supernova-docs.io/latest/components/dropdown/accessibility-KTpfMs2v-KTpfMs2v
sourcePath: /latest/components/dropdown/accessibility-KTpfMs2v-KTpfMs2v
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:16.635Z
---

- [Overview](/latest/components/dropdown/overview-vNMWvfx5)
- [Design](/latest/components/dropdown/design-4lGD4k4f)
- [Figma](/latest/components/dropdown/figma-zlZBwWvn-zlZBwWvn)
- [HTML](/latest/components/dropdown/html-3V2h0KfE)
- [React](/latest/components/dropdown/react-fC6FLInw)
- [Accessibility](/latest/components/dropdown/accessibility-KTpfMs2v-KTpfMs2v)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Trigger**

- Use a **button** as the trigger with aria-haspopup="true" and aria-expanded="true/false".

- The trigger should clearly describe the purpose (e.g., “More options”).

### **Container**

- Use a <div role="menu"> or <ul role="menu"> depending on content.

- Each item inside should have role="menuitem", menuitemradio, or menuitemcheckbox if interactive.

- If the Dropdown contains non-menu content (like filters or inputs), use semantic roles for those elements instead.

### **Keyboard Support**

- **Tab** moves focus to the trigger.

- **Enter/Space** opens the Dropdown.

- Once open, the **arrow keys** navigate between items.

- **Esc** closes the Dropdown and returns focus to the trigger.

### **Focus Management**

- When opened, focus should move into the Dropdown (to the first item).

- When closed, focus should return to the trigger.

### **Dismissal**

- Dropdown must close when the user clicks outside, presses Esc, or selects an item.

### **Contrast and Touch**

- Ensure items meet **WCAG AA** contrast.

- Maintain comfortable tap areas (~44 × 44 px).

On this page

- [Accessibility](#section-accessibility-cc)
- [Trigger](#section-trigger-9f)
- [Container](#section-container-7b)
- [Keyboard Support](#section-keyboard-support-73)
- [Focus Management](#section-focus-management-ff)
- [Dismissal](#section-dismissal-1b)
- [Contrast and Touch](#section-contrast-and-touch-73)
