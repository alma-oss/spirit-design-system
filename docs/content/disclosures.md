# Disclosure Pattern

Disclosures are moments that open up on a page and reveal additional information related to the source it is triggered from.

## Overview

Disclosures support a wide range of different use cases in product interfaces and are commonly used to reveal more information or details about an element or content on a page.
Unlike tooltips, the content expanded by a disclosure may contain interactive elements.

At its core, a disclosure is comprised of two parts—a trigger that the user interacts with by clicking or using their keyboard and the panel that opens and discloses the content.

## When to Use

- Use when disclosing additional content about part of a UI.
- Use when there is a need to include interactive elements in a popover.
- Use to show settings, filtering, or sorting menus that affect sections of a page, for example in data tables, or an entire page.
- Use when displaying content within types of dropdowns, for example profile menus, combo buttons, and menu buttons.

## When Not to Use

- Don’t use to present critical information or request required input needed to complete a workflow.
  Use the modal component instead.
- Don’t use when the user hasn’t explicitly triggered the popover to open on click.

## Best Practices

### Keep Disclosures at a Reasonable Size

A disclosure should not take up a considerable amount of the size of the screen.
Disclosures are meant to be smaller moments that can open on top of different areas of a page.
They should not seem like a disruption to the users workflow and should not act as a screen takeover.
Keep all content in a disclosure concise and only include information that is necessary.

### Disclosures Should Be User Initiated

Disclosures should always be triggered to open or close by the user.
Disclosures should never open automatically because this could be potentially intrusive to the user’s workflow.

### One Disclosure Should Open at a Time

If there are multiple instances on a page where a disclosure is present, only one should open at a time to avoid screen clutter and to help the user stay focused on the information being disclosed.

### Avoid Nesting Disclosures

Do not nest one disclosure within another disclosure.
Nesting disclosures creates a stacking effect and could confuse the user of where they should be focusing their attention and which disclosure they should be interacting with.
Using submenus in a context menu that fly out to the sides is an acceptable way to disclose additional information in a disclosure.

### Do Not Hide Critical Information Within a Disclosure

Do not hide important information inside of a disclosure that the user may need in order to complete a task or workflow.
Keep critical information at a higher level so the user has better visibility.

## Behaviors

### Opening and Closing a Disclosure

To open a disclosure to reveal its content, click the trigger button it is related to.
If using a keyboard, press `Enter` or `Space`.

To close a disclosure, either click on the trigger button again, click anywhere outside of the open disclosure container or click on the close x icon if it is present within the disclosure.
If using a keyboard, press `Esc` or `Tab` to tab out of the disclosure.

### Dismissible Action

Depending on the type of content in a disclosure, it can be useful to display a close `x` icon.
Be mindful when and where you place a close icon in a disclosure.
The close icon should always be in the top right corner of the popover and should not interfere or overlap with inline interactive elements.

## Common Use Cases

Disclosures are used for a wide variety of use cases.
The following variants are a few examples of common disclosures that you may come across frequently in product interfaces.

| Example      | Use cases                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Combo button | Combo buttons are used to contain multiple related actions that come with a default, primary action. Additional actions live in the menu. |
| Collapse     | Collapse components are used to hide and reveal content within a container, allowing users to expand or collapse sections as needed.      |
| Context menu | Context menus provide a list of actions or options related to a specific element or area within the interface.                            |

## Related

### Disclosure Hooks

Web-React implementation of the disclosure pattern used in the components.

- [`useDisclosureState`][web-react-use-disclosure-state]: Manages the open/close state of a disclosure component.
- [`useDisclosureAria`][web-react-use-disclosure-aria]: Provides ARIA attributes for accessibility.

### Disclosure Components

- [`Collapse`][web-react-collapse]: A component that allows content to be expanded or collapsed within a container.

## Resources

- [ARIA Disclosure Pattern][aria-patterns-disclosure]
- [Implementing Disclosure UI][disclosure-ui]
- [Carbon Design System Disclosures Pattern][disclosures-pattern]

[aria-patterns-disclosure]: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
[disclosure-ui]: https://fedmentor.dev/posts/disclosure-ui/
[disclosures-pattern]: https://carbondesignsystem.com/patterns/disclosures-pattern/
[web-react-use-disclosure-state]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/useDisclosureState.ts
[web-react-use-disclosure-aria]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/useDisclosureAria.ts
[web-react-collapse]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Collapse.tsx
