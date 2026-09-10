---
title: Breadcrumbs
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Landmark Roles**

- Wrap breadcrumbs in a &lt;nav> element with aria-label="Breadcrumb".

### **List Structure**

- Mark up breadcrumbs as an ordered list &lt;ol> with list items &lt;li>.

### **Links**

- Each ancestor item should be a semantic link &lt;a>; the current page should be plain text or marked with aria-current="page".

### **Keyboard Support**

- Standard link navigation via **Tab** and **Enter/Space**.

### **Announcements**

- Screen readers should announce breadcrumb navigation as a landmark, then read out the list.

### **Contrast and Spacing**

- Ensure separators and text meet WCAG AA contrast and are not too small to tap.

### **Truncation or Overflow**

- If breadcrumbs collapse on smaller screens, ensure that hidden items remain accessible via an alternative such as a menu, ellipsis (“…”) or button.
