---
title: Navigation
sourceUrl: https://spirit.supernova-docs.io/latest/components/navigation/accessibility-5a2Im0e0-5a2Im0e0
sourcePath: /latest/components/navigation/accessibility-5a2Im0e0-5a2Im0e0
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:22.869Z
---

- [Overview](/latest/components/navigation/overview-J6GGfZ2s)
- [Design](/latest/components/navigation/design-3ecLB1Dq-3ecLB1Dq)
- [HTML](/latest/components/navigation/html-dfXpXyOj-dfXpXyOj)
- [React](/latest/components/navigation/react-FcrBxomR-FcrBxomR)
- [Accessibility](/latest/components/navigation/accessibility-5a2Im0e0-5a2Im0e0)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Landmark Roles**

- Wrap main navigation in a container with nav element or role="navigation".

### **Labelling**

- Provide a descriptive label if there are multiple nav sections (e.g., aria-label="Main navigation").

### **Links**

- Navigation items should be semantic <a> elements (or buttons if they trigger in-page drawers).

### **Keyboard Support**

- **Tab** moves between items.

- **Enter/Space** activates the link.

- For dropdown navigation, support **Arrow keys** to move through sub-menus and **Esc** to close.

### **Focus Management**

- Maintain visible focus indicators for all items.

### **Announcements**

- Screen readers should announce the active item (e.g., “Current page”). Use aria-current="page" for the active destination.

### **Contrast and Targets**

- Ensure text and icons meet WCAG AA contrast.

- Navigation items must be large enough for easy tapping (~44×44 px).

### **Mobile Menus**

- When using collapsible menus or drawers, manage focus correctly – trap focus inside the menu when open and return focus to the trigger on close.

On this page

- [Accessibility](#section-accessibility-46)
- [Landmark Roles](#section-landmark-roles-d1)
- [Labelling](#section-labelling-8e)
- [Links](#section-links-b6)
- [Keyboard Support](#section-keyboard-support-68)
- [Focus Management](#section-focus-management-17)
- [Announcements](#section-announcements-17)
- [Contrast and Targets](#section-contrast-and-targets-0f)
- [Mobile Menus](#section-mobile-menus-49)
