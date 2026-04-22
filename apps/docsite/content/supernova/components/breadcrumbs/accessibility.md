---
title: Breadcrumbs
sourceUrl: https://spirit.supernova-docs.io/latest/components/breadcrumbs/accessibility-eCqiX64d-eCqiX64d
sourcePath: /latest/components/breadcrumbs/accessibility-eCqiX64d-eCqiX64d
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:12.830Z
---

- [Overview](/latest/components/breadcrumbs/overview-pSrdblPT)
- [Design](/latest/components/breadcrumbs/design-F5EECudN)
- [Figma](/latest/components/breadcrumbs/figma-RW575Xpl-RW575Xpl)
- [HTML](/latest/components/breadcrumbs/html-j6RVbeEw)
- [React](/latest/components/breadcrumbs/react-ok0u0eLy)
- [Accessibility](/latest/components/breadcrumbs/accessibility-eCqiX64d-eCqiX64d)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Landmark Roles**

- Wrap breadcrumbs in a <nav> element with aria-label="Breadcrumb".

### **List Structure**

- Mark up breadcrumbs as an ordered list <ol> with list items <li>.

### **Links**

- Each ancestor item should be a semantic link <a>; the current page should be plain text or marked with aria-current="page".

### **Keyboard Support**

- Standard link navigation via **Tab** and **Enter/Space**.

### **Announcements**

- Screen readers should announce breadcrumb navigation as a landmark, then read out the list.

### **Contrast and Spacing**

- Ensure separators and text meet WCAG AA contrast and are not too small to tap.

### **Truncation or Overflow**

- If breadcrumbs collapse on smaller screens, ensure that hidden items remain accessible via an alternative such as a menu, ellipsis (“…”) or button.

On this page

- [Accessibility](#section-accessibility-89)
- [Landmark Roles](#section-landmark-roles-22)
- [List Structure](#section-list-structure-8b)
- [Links](#section-links-0e)
- [Keyboard Support](#section-keyboard-support-3b)
- [Announcements](#section-announcements-0c)
- [Contrast and Spacing](#section-contrast-and-spacing-82)
- [Truncation or Overflow](#section-truncation-or-overflow-4d)
