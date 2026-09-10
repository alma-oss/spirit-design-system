---
title: Alert
---

### **Alert vs Toast vs Modal**

| Component | Use when                                                                                                      | Strengths                                                                      | Don’t use when                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Alert     | To show inline, contextual feedback tied to a section or element (e.g., form errors, success confirmation).   | Always visible, persistent until resolved, directly related to nearby content. | If the message must grab global attention or float above content – use Toast. If the message requires blocking action – use Modal. |
| Toast     | To show global, temporary notifications that appear above page content (e.g., “Settings saved successfully”). | Highly noticeable, auto-dismisses, consistent placement across app.            | If the message is context-specific – use Alert. If it needs user decision or persistence – use Modal.                              |
| Modal     | To present blocking information or decisions that require user action before proceeding.                      | Focused, forces user attention, supports detailed info or forms.               | For lightweight status or feedback → use Alert/Toast. For subtle hints or inline guidance – use Tooltip.                           |
