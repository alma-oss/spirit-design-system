---
title: Spinner
sourceUrl: https://spirit.supernova-docs.io/latest/components/spinner/accessibility-ipHRXm3F-ipHRXm3F
sourcePath: /latest/components/spinner/accessibility-ipHRXm3F-ipHRXm3F
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:30.005Z
---

- [Overview](/latest/components/spinner/overview-Q9kGTzdA)
- [Design](/latest/components/spinner/design-ekXLahqn)
- [Figma](/latest/components/spinner/figma-TLTeM9fC-TLTeM9fC)
- [HTML](/latest/components/spinner/html-dBmny8a9)
- [React](/latest/components/spinner/react-w7EmhF7Y)
- [Accessibility](/latest/components/spinner/accessibility-ipHRXm3F-ipHRXm3F)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Mark loading regions with aria-busy="true" so assistive tech knows content is not ready.

- If Spinner is standalone, give it a descriptive label via role="status" and aria-label="Loading" or associate visible text.

### **Announcements**

- For global or critical waits, announce with a **live region** (e.g., “Loading, please wait”).

- Update the region once loading completes.

### **Keyboard**

- Spinner must **not be focusable** itself.

- Ensure users can’t interact with incomplete content while Spinner is active.

### **Contrast and Motion**

- Spinner must remain visible against its background (WCAG AA).

- Respect prefers-reduced-motion: provide a static alternative (e.g., a pulsing dot or text “Loading…”) for motion-sensitive users.

### **Context**

- Never show Spinner without context. Users should know **what is loading** and when it will complete.

On this page

- [Accessibility](#section-accessibility-ff)
- [Semantics](#section-semantics-8b)
- [Announcements](#section-announcements-d3)
- [Keyboard](#section-keyboard-d4)
- [Contrast and Motion](#section-contrast-and-motion-2f)
- [Context](#section-context-da)
