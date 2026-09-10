---
title: Helper Text
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

- HelperText must be programmatically associated with its related form control.

- Assistive technologies should announce it as supplementary information through aria-describedby.

- HelperText should not contain essential information that is unavailable elsewhere when the control is initially encountered.

- Ensure sufficient text contrast, including in the disabled state.
