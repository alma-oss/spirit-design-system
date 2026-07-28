---
title: Timeline
sourceUrl: https://spirit.supernova-docs.io/latest/components/timeline/accessibility-Ly7dDbjq
sourcePath: /latest/components/timeline/accessibility-Ly7dDbjq
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:33.750Z
---

- [Overview](/latest/components/timeline/overview-QyZZXWW7)
- [Design](/latest/components/timeline/design-KOc1TkIo)
- [Figma](/latest/components/timeline/figma-Gaddsnt2)
- [HTML](/latest/components/timeline/html-hPdRgYGY)
- [React](/latest/components/timeline/react-eCUJifRJ)
- [Accessibility](/latest/components/timeline/accessibility-Ly7dDbjq)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- By default, Timeline renders as an <ol>, providing an ordered list structure for screen readers.

- Use elementType="ul" if the order of events is not important.

- Each TimelineStep is an <li>, ensuring proper list semantics.

### **Markers**

- TimelineMarker content is set to aria-hidden="true" by default, as the parent list already conveys the sequence.

- Use meaningful marker types (numbers, dots, icons) but don’t rely on visuals alone to communicate order or meaning.

### **Headings and Content**

- Use TimelineHeading for clear, navigable section labels. Headings should follow a logical hierarchy (e.g. <h2>, <h3>).

- TimelineContent should contain descriptive text or actions, ensuring that the purpose of each step is clear without relying on visuals.

### **Keyboard Navigation**

- Ensure that all interactive elements inside TimelineContent (e.g. links, buttons) are keyboard-accessible.

- The focus order should follow the natural reading order of the timeline.

### **Color and Contrast**

- Marker colors, connector lines, and text must meet WCAG 2.1 contrast guidelines.

- Don’t use color as the only way of distinguishing between steps (e.g. completed vs. active). Use text, icons, or additional indicators.

### **Screen Reader**

- Screen readers will announce the number of steps and the content of each step in sequence.

On this page

- [Accessibility](#section-accessibility-b0)
- [Semantics](#section-semantics-a2)
- [Markers](#section-markers-29)
- [Headings and Content](#section-headings-and-content-f9)
- [Keyboard Navigation](#section-keyboard-navigation-19)
- [Color and Contrast](#section-color-and-contrast-31)
- [Screen Reader](#section-screen-reader-a2)
