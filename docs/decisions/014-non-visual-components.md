# Non-Visual React Components

Date: 2026-09-03

Status: proposed

## Context

`spirit-web-react` components render markup. That has been true implicitly, not by decision, and the question
of whether it should always be true came up while scoping the React counterpart of the Picker's
[`listbox` presentation][picker-listbox-web] — the vanilla implementation shipped first, and React has no
path to `role="option"` today because `UNSTABLE_PickerItem` renders only `Checkbox` / `Radio`.

The proposal came out of the review of the first React implementation ([pull request
2874][pr-picker-listbox], closed unmerged), which built a Picker-local listbox container and drew the
feedback that the pattern should be abstracted rather than reimplemented per component. That feedback is
sound — `UNSTABLE_Combobox` already ships an option-list layer, so the Picker is the second component to need
one. Where it needs deciding is the form: the proposal was to introduce `Listbox` and `GridList` components
that render **no markup at all** and only publish context — the option-list role, the selection mode — which
descendant components read through the [context props mechanism][context-props]. The appeal is real: it reads
like Adobe's React Spectrum, and it promises to carry the [decision 013][decision-listbox-grid] rule as
composition rather than as a prop.

Two facts reframe the question.

**First, Spirit already has non-visual components.** `NoSsr` renders its children or nothing;
`ContextPropsProvider` and `UniversalProvider` render only providers. So "we have no concept for this" is not
quite right — what is missing is a rule for _when_ rendering nothing is appropriate, which is what this
record supplies. What those three have in common is that none of them claims to _be_ anything in the
accessibility tree: they gate, they cascade, they do not describe.

**Second, React Spectrum does not do what the proposal describes.** In react-aria-components, `ListBox`
renders the container — `useListBox` returns the props for a real element that carries `role="listbox"`, and
`useOption` returns the props for the option elements inside it. What is context-only in Spectrum is
_state_: `ListStateContext` and `ListBoxContext` let a parent `Select` or `ComboBox` hand its list state to a
`ListBox` that renders somewhere below. Spirit already has that layer, twice —
`PickerPopoverContext` and `ComboboxPopoverContext` do exactly this job. Spectrum's genuinely
markup-free pieces are its collection-pass item declarations, and Spirit already has an equivalent in
`getCollectionNode` ([collection pattern][collection-pattern]).

So the comparison is not "Spirit's prop-based approach versus Spectrum's component-based approach". Spirit
has already adopted Spectrum's architecture — [Collection][collection-pattern] for item identity,
[Selection][selection-pattern] for selected keys. The open question is narrower: which layer owns an
ARIA widget's role, and may that owner render nothing?

### Decision Drivers

- **A role needs a host.** `role="listbox"` has to sit on an element. Whoever owns the role has to own an
  element, or hand the obligation to someone who does.
- **Content models are structural.** Decision 013 requires that a `listbox` contain only options — an
  empty-state message or an Apply button must be a _sibling_ of it. A rule about what is inside something
  can only be enforced by something that has an inside.
- **Focus management needs a ref.** Both mechanisms in decision 013 need the container element: roving
  `tabindex` needs a keydown host, and `aria-activedescendant` needs it for scroll-into-view and focus
  capture — `UNSTABLE_Combobox` holds a `listboxRef` for precisely this.
- **JSX should read as the DOM reads.** A component's name is a claim about what it is; nesting is a claim
  about containment.
- **Parity with `spirit-web`.** The React output has to match the vanilla markup, which the shared visual
  snapshots compare directly.
- **One mechanism per job.** Spirit already distributes an option-list role by prop plus context in
  `UNSTABLE_Combobox` (`optionsRole`); a second, different mechanism for the same job is a cost paid by
  every reader.

## Decision

In the context of React components in `spirit-web-react`, facing the question of whether a component may
render no markup, we decided that **a non-visual component is legitimate only when it makes no claim in the
accessibility tree** — that is, when it gates rendering, cascades context, or supplies behaviour — and
**against non-visual components that name an ARIA widget**, so that every ARIA role in Spirit has a
DOM element that owns it, accepting that composition sometimes has to be expressed as a prop rather than as
a wrapper.

Concretely:

- **ARIA identity lives on rendered elements.** A component named after an ARIA widget (`Listbox`,
  `GridList`, `Menu`, `Tree`) renders that widget's container element, with its role, its accessible name,
  its `id`, and its ref. It may compose other components for layout — the vanilla listbox is a
  `Stack Stack--spacing`, and the React counterpart should be too — but the role is its own.
- **Which role applies is a prop on the widget, not a wrapper component.** Decision 013 derives the role
  from what a single option contains, which the widget knows and the consumer chooses.
  `UNSTABLE_Combobox`'s `optionsRole` is the established shape; Picker follows it rather than inventing a
  second spelling.
- **Distribution of the resulting contract is context**, using the mechanisms already documented in
  `ContextProps.ts`: a dedicated group context for a value shared by a fixed set of related components, so a
  component outside this package can join the group by reading it.
- **Non-visual components stay in their lane.** `NoSsr` (gating), `ContextPropsProvider` /
  `UniversalProvider` (cascading) are the shape of the allowed cases. Name them for what they do, never for
  what the markup they do not render would have been.
- **Extract a shared layer at the second consumer, not the first.** Collection and Selection were both
  factored out of `UNSTABLE_Picker` / `UNSTABLE_Combobox` duplication that already existed. An option-list
  layer earns the same treatment on the same trigger — and that trigger has already fired:
  `UNSTABLE_Combobox` ships the layer today, so the Picker is the second consumer, not the first.

### Considered Alternatives

- **Markup-free `Listbox` / `GridList` publishing context only.** Rejected on four counts, any one of which
  is disqualifying. Nothing renders `role="listbox"`, so the consumer would have to remember to put the role
  on a `Stack` by hand — worse than today's `optionsRole` prop, not better. Decision 013's content model
  becomes inexpressible: with no DOM boundary, "the empty state is a sibling of the listbox, not an option
  inside it" is a rule with nothing to attach to, and a consumer nesting an Apply button among the options
  would produce invalid markup that reads as correct JSX. There is no element for `listboxRef`, so focus
  management has to reach for a ref the component cannot hold. And a `<Listbox>` that is not the listbox
  inverts the reading of the tree — the one thing every other Spirit component gets right.
- **Adopt `react-aria` / `react-stately` directly.** The libraries whose architecture Spirit has already
  borrowed twice. Rejected as out of scope here rather than on merit: it is a dependency decision for its
  own record, and Spirit's ported Collection and Selection layers would have to be retired in the same move.
- **Keep option-list semantics per component.** What we have today: Combobox owns its roles, and the
  Picker's first implementation owned a second, Picker-local copy. Rejected, and no longer available as an
  interim either — the second-consumer trigger has fired, so a second copy would put the decision 013 rule
  in two places that can drift while nothing forces them back together.
- **Allow non-visual components wherever they read well, case by case.** Rejected because the failure mode is
  invisible: a component that renders nothing cannot be caught by a snapshot, and the accessibility tree it
  claims to describe is exactly where a missing element does not show up until a screen reader user finds it.

## Consequences

- **The Picker's `listbox` presentation is a prop plus a shared, rendering option-list component.** Its
  React scope is the `optionsRole` prop Combobox already defines, a `Listbox` that renders the container
  element with its role, name, `id` and ref, `UNSTABLE_PickerItem` rendering `Item` with `role="option"` and
  `aria-selected` when the presentation says so, and a roving-`tabindex` keyboard hook — the mechanism
  decision 013 assigns to a button-triggered popover with no text input. The Picker-local container in the
  first implementation ([pull request 2874][pr-picker-listbox], closed unmerged) is superseded by this.
- **The keyboard contract does not unify across focus mechanisms.** Combobox's `aria-activedescendant`
  implementation and a Picker's roving `tabindex` are different code paths, not one behaviour behind a flag;
  what they can share is the navigation arithmetic already in `hooks/gridKeyboardNavigation.ts`. Expect the
  shared option-list layer to be a context, a role vocabulary, an option component, and _two_ keyboard hooks.
- **`Listbox` / `GridList` are adopted, in their rendering form.** Only the markup-free form is ruled out.
  They render the container and read widget state from the context the parent widget provides, which also
  lets `Dropdown` host an option list without either widget's machinery. Whether `UNSTABLE_Combobox`
  migrates onto them in the same change or in a follow-up is a sequencing question, not a design one.
- **New components have to answer "what element do I render?"** first. Where the honest answer is "none", the
  component has to be a provider, a gate, or a hook — and a hook is usually the better shape, since it does
  not occupy a name in the component namespace.
- **React-only components remain acceptable.** `Listbox` would have no `spirit-web` CSS counterpart, which is
  already true of sixteen components including `VisuallyHidden`, `NoSsr`, and `Dialog`. Parity is about
  rendered markup, not about a one-to-one component inventory.

### Follow-Ups

- Document the option-list pattern under `docs/content/` alongside Collection and Selection as part of the
  Picker work, since the second consumer makes it due. This record is registered in `mkdocs.yml`, where
  decisions 012 and 013 were also still missing from the navigation.
- The React `UNSTABLE_Picker` README does not yet document its option-list roles, which decision 013's
  follow-ups require of every component; the vanilla README does.
- Revisit if Spirit ever adopts `react-aria` directly, which would move role ownership into hooks and make
  this record's element rule a consequence of theirs rather than ours.

[collection-pattern]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/content/collections.md
[context-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/context/ContextProps.ts
[decision-listbox-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/013-listbox-vs-grid-for-selectable-options.md
[pr-picker-listbox]: https://github.com/alma-oss/spirit-design-system/pull/2874
[picker-listbox-web]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/UNSTABLE_Picker/README.md#listbox-presentation
[selection-pattern]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/content/selection.md
