# ARIA Components

Date: 2026-11-10

Status: accepted

Related: [014](014-listbox-vs-grid-for-selectable-options.md)

## Context

The review of the first React Picker [`listbox` presentation][picker-listbox-web]
([pull request 2874][pr-picker-listbox], closed unmerged) asked for shared `Listbox` and `GridList` components instead
of a Picker-local container. One proposed shape rendered no markup and only published context to descendants. That
raises two questions: may a React component render no markup, and which layer owns an ARIA widget's role?

`spirit-web-react` already has three kinds of components:

- **Visual** components own a CSS block: `Navigation`, `Stack`, `Item`.
- **ARIA components** have no CSS, but render an ARIA widget's host element and own its behaviour.
  [`Toolbar`][toolbar] renders `role="toolbar"`, owns the keyboard contract, and configures the `Navigation` inside it
  through [context props][context-props]. Its [hooks][toolbar-hooks] let consumers build their own container.
- **Markup-free** components render no element: `NoSsr` gates, `ContextPropsProvider` and `UniversalProvider` cascade.

This mirrors Adobe's split between React Aria (accessibility without styles) and React Spectrum (the visual side). A
full component composes visual presentation, state, and ARIA behaviour; Spirit's hooks already carry the last two.

`UNSTABLE_Combobox` already ships a private option-list layer: the `optionsRole` prop, a popover context, and options
that read their role from it. The Picker is the second consumer; a Menu pattern is in progress.

React Aria's [`ListBox`][react-aria-listbox] and [`GridList`][react-aria-gridlist] render the element that carries the
role, with the props from [`useListBox`][react-aria-use-listbox]. Only list state travels through context, as Spirit's
popover contexts already do.

### Decision Drivers

- **A role needs a host element.**
- **A content model needs a boundary:** [decision 014][decision-listbox-grid] allows only options inside a listbox.
- **Focus management needs a reference** to the container.
- **JSX reads as the DOM reads.**
- **Markup parity with `spirit-web`**, whose listbox is a single `Stack` element carrying the role.

## Decision

We decided that **the component that owns an ARIA widget's behaviour renders the widget's host element**, and that a
component may render no markup only when it makes no claim in the accessibility tree.

## Considered Alternatives

- **Markup-free `Listbox` and `GridList`.** Rejected: they fail every driver. The consumer adds the role by hand, and
  an Apply button among the options reads as valid JSX.
- **Adopt `react-aria` directly.** Out of scope: a dependency decision for its own record.
- **Option-list semantics per component.** Rejected: it puts the [decision 014][decision-listbox-grid] rule in places
  that drift apart.
- **Markup-free widgets case by case.** Rejected: a missing host never shows in snapshots, only to screen readers.

## Consequences

- **The owner never relies on the consumer to add the role.** It owns the role, accessible name, `id`, reference, and
  keyboard contract, and exposes them as state, container, and item hooks.
- **A role cannot ship without its behaviour**, since one component owns both and their tests.
- **Visual components stay widget-agnostic**, changed only through context props they already accept.
- **An ARIA component adds at most one element:** `Toolbar` adds a `div`, `Listbox` renders through `Stack` and adds
  none.
- **React-only ARIA components are acceptable**, because parity concerns rendered markup, not the component inventory.

For option lists:

- **`Listbox` and `GridList` are adopted** as ARIA components; [decision 014][decision-listbox-grid] picks which.
- **The parent widget's `optionsRole` selects the ARIA component**, and the parent provides the focus mechanism: roving
  `tabindex` in the Picker, `aria-activedescendant` in `UNSTABLE_Combobox`.
- **`Dropdown` stays the `dialog` container** and can host either ARIA component. Overriding its role to `menu` is a
  role without an owner until a menu ARIA component exists.

[context-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/context/ContextProps.ts
[decision-listbox-grid]: 014-listbox-vs-grid-for-selectable-options.md
[picker-listbox-web]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/UNSTABLE_Picker/README.md#listbox-presentation
[pr-picker-listbox]: https://github.com/alma-oss/spirit-design-system/pull/2874
[react-aria-gridlist]: https://react-aria.adobe.com/GridList
[react-aria-listbox]: https://react-aria.adobe.com/ListBox
[react-aria-use-listbox]: https://react-aria.adobe.com/ListBox/useListBox
[toolbar]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Toolbar/README.md
[toolbar-hooks]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/toolbar/README.md
