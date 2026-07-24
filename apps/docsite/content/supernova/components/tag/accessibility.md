---
title: Tag
sourceUrl: https://spirit.supernova-docs.io/latest/components/tag/accessibility-qlfz32TJ-qlfz32TJ
sourcePath: /latest/components/tag/accessibility-qlfz32TJ-qlfz32TJ
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:32.339Z
---

- [Overview](/latest/components/tag/overview-nOURQFhz)
- [Design](/latest/components/tag/design-GuoCVdbT)
- [Figma](/latest/components/tag/figma-wnRyt75n-wnRyt75n)
- [HTML](/latest/components/tag/html-WgYsHSeE)
- [React](/latest/components/tag/react-qwmMGIzi)
- [Accessibility](/latest/components/tag/accessibility-qlfz32TJ-qlfz32TJ)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Static tags can be simple <span> elements with proper text.

- Interactive tags (clickable/removable) should be <button>s or <a>s, depending on function.

### **Removable Tags**

- Provide a clear remove button inside the tag with aria-label="Remove \[tag name\]".

- Announce removal to screen readers (e.g., via a polite live region).

### **Keyboard Support**

- Interactive tags must be reachable via **Tab**.

- **Enter/Space** activates a clickable tag.

- **Delete/Backspace** may remove a tag if focus is on the remove button.

### **Color and Contrast**

- Ensure tag text and background meet **WCAG AA** contrast.

- Do not rely on color alone – if tags are status-indicating, pair with text.

### **Size and Spacing**

- Tags must remain comfortably tappable if interactive (~44 × 44 px touch target for remove buttons).

### **Focus**

- Provide clear focus styles for interactive tags, including the remove icon.

On this page

- [Accessibility](#section-accessibility-69)
- [Semantics](#section-semantics-cc)
- [Removable Tags](#section-removable-tags-fd)
- [Keyboard Support](#section-keyboard-support-2d)
- [Color and Contrast](#section-color-and-contrast-09)
- [Size and Spacing](#section-size-and-spacing-64)
- [Focus](#section-focus-a5)
