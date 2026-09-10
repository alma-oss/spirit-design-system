---
title: UNSTABLE_Picker
---

#### Component Status

Figma

Up to date

Status

Unstable

HTML

Up to date

React

Up to date

## Design Usage

Picker is used to select and manage a list of items within a single input-like component.  
It combines multiple patterns:

- input-like field

- dropdown with selection controls (for example checkbox, radio button, slider)

- list of selected items displayed as interactive Tags

Picker allows users to:

- search or browse available options

- select one or multiple values

- review and modify their selection directly

Selected items are displayed as interactive Tags, which allow users to remove them without reopening the dropdown.

---

## When to use

Use Picker when:

- users need to pick multiple values from a predefined list

- selected values should be clearly visible, and selection should be editable (option to add/remove values)

- filtering within options is required

- selections need to be compactly represented in the UI (for example filters, categories, attributes)

Typical use cases:

- search filters (for example job type, location, category)

- picking multiple attributes or tags

---

## When not to use

Do not use Picker when:

- Only a single value is required (use [Select](/components/select) or [Radio](/components/radio) instead)

- The number of options is very small (use [Checkbox](/components/checkbox) or [Radio](/components/radio) group)

- The selection does not need to be visible after choosing

- Complex interactions or workflows are required beyond simple selection

---

## Behavior

- Picker allows picking one or multiple values, depending on the configuration

- Available options are displayed in a dropdown

- Options can be represented using:

- checkboxes (multi-select)

- radio buttons (single select)

- other controls (for example sliders for numeric values)

- Selected values are displayed as interactive Tags inside the input area

- Users can remove selected items directly via Tag close button

- The dropdown reflects the current selection state

---

## Structure

Picker is composed of:

- Input area

- displays picked values as Tags

- allows user interaction (focus, typing if applicable)

- Tags

- represent picked values

- allow removal of individual items

- Dropdown

- contains pickable options

- reflects current selection state

---

## UX Rules

- Picked values must always be visible

- Users must be able to remove items without reopening the dropdown

- The dropdown must clearly indicate selected items

- Interaction must be consistent between the dropdown and the displayed Tags

- Large selections should remain readable and manageable

- Avoid overloading Picker with too many options without search or filtering
