---
title: Tabs
sourceUrl: https://spirit.supernova-docs.io/latest/components/tabs/accessibility-yvsVj0Cy-yvsVj0Cy
sourcePath: /latest/components/tabs/accessibility-yvsVj0Cy-yvsVj0Cy
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:31.354Z
---

- [Overview](/latest/components/tabs/overview-c7gB7K6t)
- [Design](/latest/components/tabs/design-7JTbJcBN)
- [Figma](/latest/components/tabs/figma-8izgvLtX-8izgvLtX)
- [HTML](/latest/components/tabs/html-eZtLKUwh)
- [React](/latest/components/tabs/react-xQ02P9iJ)
- [Accessibility](/latest/components/tabs/accessibility-yvsVj0Cy-yvsVj0Cy)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Tablist Structure**

- Use a container with role="tablist".

- Each tab has role="tab", is focusable, and controlled via aria-selected="true/false".

- Each tab must reference its associated panel with aria-controls.

### **Tab Panels**

- Use role="tabpanel".

- Each panel should be labelled by its tab using aria-labelledby.

- Only the active panel should be visible; inactive ones should be hidden with hidden or aria-hidden="true".

### **Keyboard Support**

- **Tab** moves focus into/out of the tab list.

- **Arrow Left/Right** (or Up/Down in vertical orientation) moves between tabs.

- **Enter** or **Space** activates the focused tab and shows its panel.

### **Focus Management**

- Keep focus on the activated tab, not automatically inside the panel.

### **Announcements**

- Screen readers must announce the tab’s label, its selected state, and its position (e.g., “Tab 2 of 4”).

On this page

- [Accessibility](#section-accessibility-ac)
- [Tablist Structure](#section-tablist-structure-39)
- [Tab Panels](#section-tab-panels-69)
- [Keyboard Support](#section-keyboard-support-a4)
- [Focus Management](#section-focus-management-f6)
- [Announcements](#section-announcements-3a)
