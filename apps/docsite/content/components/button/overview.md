---
title: Button
---

#### Component Status

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

### Design Usage

A Button is a fundamental design system component that enables users to perform actions or trigger events with a single click or tap.  
Buttons are typically styled to stand out, with clear labels indicating their function, such as "Submit," "Cancel," or "Learn More." They enhance user interaction by providing a simple and intuitive way to execute commands, navigate interfaces, or submit forms.

- A layout should contain a single prominent button that makes it clear that other buttons have less importance in the visual [hierarchy](/design/visual-hierarchy).

- Text buttons use text labels, which describe the action that will occur if a user taps a button. If a text label is not used, an icon should be present to signify what the button does.

- When using multiple buttons, ensure the available state of one button doesn’t look like the disabled state of another.

- The component [Button Link](/components/button-link) is relevant only for developers. For designing user experience, always use the Button component.

---

### **Button Color Variants**

- **Primary** – The main call-to-action on a page or section. Use once per view to emphasize the most important action.

- **Secondary** – A supporting action that complements, but doesn’t compete with, the primary action.

- **Tertiary** – A lower-priority action that should be visually available but not emphasized.

- **Plain** – Minimal style for subtle triggers (e.g., ellipsis “…”, inline actions).

- **Success** – Indicates a positive or confirming action (e.g., “Save”, “Apply”).

- **Informative** – Highlights neutral or informational actions (e.g., “Learn more”, “Details”).

- **Warning** – Used for cautious actions that might have side effects or need attention (e.g., “Proceed with care”).

- **Danger** – Reserved for destructive or irreversible actions (e.g., “Delete”, “Remove”).

---

### **When to Use**

- **Triggering an action**  
  Use for submitting a form, saving data, starting a process, or confirming a choice.

- **Primary calls to action**  
  Best for the most important action on a page or within a section (e.g., “Save,” “Continue,” “Checkout”).

- **Secondary or supporting actions**  
  Buttons can also be styled for less prominent actions that complement the primary action (e.g., “Cancel,” “Back”).

- **In combinations**  
  Works well in [Action Groups](/components/action-group), dialogs, toolbars, and forms where users need to clearly understand available next steps.

---

### **When Not to Use**

- **Navigation**  
  Don’t use buttons for page or app navigation – use [Navigation](/components/navigation) instead.

- **Taking the user to another page**  
  When the desired action is to take the user to a new page or web, use the [Link](/components/link) component.

- **Long or complex labels**  
  If the action requires a detailed explanation, use a different pattern (e.g., a [Card](/components/card), [Dropdown](/components/dropdown), or [Tooltip](/components/tooltip) for context).

- **Multiple competing primary actions**  
  Limit to one Primary button per view or container to avoid confusing users about what’s most important.

- **Toggle states**  
  If the interaction is about switching between states (e.g., bold/italic in a text editor), use a [Toggle](/components/toggle) or [Segmented Control](/components/segmented-control) instead.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep labels **clear and action-oriented** (use verbs: _Save_, _Send_, _Upload_).

- Place primary buttons where the user’s attention naturally flows (commonly bottom-right in forms and dialogs).

- Maintain **consistent sizing, padding, and alignment** across the interface.

- Pair buttons with clear **feedback** (e.g., [Spinner](/components/spinner), success message, or error state) when actions take time.

- Use visual hierarchy (Primary, Secondary, Tertiary) to communicate importance.
