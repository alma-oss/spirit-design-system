# Listbox vs Grid for Selectable Options

Date: 2026-08-13

Status: accepted

## Context

Spirit keeps growing widgets that let a user pick from a set of options — a dropdown of choices, a filter, a
tag input, a combobox — and so far each one has settled its option-list semantics on its own. There is no
shared rule to reach for when a new widget is designed, or when an existing one gains richer option content,
so similar-looking lists do not necessarily expose the same roles to assistive technology. The question
surfaced concretely with the Picker, whose popover exposes no option-list role at all today. Implementing
these roles in the Combobox first is what taught us which pattern applies when, and bringing the same
correctness to the Picker is what made the rule worth writing down. Changing an option-list role after the
fact is not free: it touches markup in both `spirit-web` and `spirit-web-react`, the keyboard handling that
the role obliges, and the tests and snapshots that assert both. Settling the rule once — and settling it on
a property that is already visible in the design — keeps that cost from recurring per component.

The deciding factor is **what a single option contains**, not what surrounds the list. In particular, a
widget does **not** need an associated text input for `listbox` or `grid` to apply:

> In a combobox, the input isn't what gives the listbox/grid its meaning — it adds a second, optional
> mechanism on top: **virtual focus**. `aria-activedescendant` on the input lets DOM focus stay in the text
> field while the "active" option is announced. The listbox/grid would be a perfectly valid widget without
> the input; the input just changes where real focus lives.
>
> Without an input, you use the other focus mechanism the [APG][apg] (ARIA Authoring Practices Guide)
> defines for the exact same widgets: **real focus via roving `tabindex`**. Focus physically enters the
> container and lands on an option. This is precisely what the standalone
> [APG Listbox examples][apg-listbox] do — self-contained listboxes with no combobox and no input, driven
> by roving `tabindex`.

So the presence or absence of an input decides the _focus mechanism_ (virtual vs real); the option's
_contents_ decide the _role_.

**Container vs. list — do not confuse the two layers.** In Spirit the options are wrapped by the Dropdown
popover, which is always `role="dialog"`, present no matter which option-list role you pick. What differs is
what points at it: a Picker's trigger references the dialog (`aria-haspopup="dialog"`, `aria-controls` → the
dialog), whereas a combobox's text input references the inner list (`aria-haspopup="listbox"` / `"grid"`,
`aria-controls` → the `listbox` / `grid`), leaving the dialog wrapper present but unreferenced. `dialog` is a
container role, never an option-list role — so the `popover` node in each diagram below is that dialog.

This record decides one thing: which ARIA pattern an option list exposes, and what adopting that pattern
obliges. It does not specify focus management — that follows from the keyboard contract each role carries —
nor any component's behaviour, which stays in component documentation.

### Decision Drivers

- **Semantic accuracy for assistive technology** — the announced role has to match what the option actually
  is, including after its content changes.
- **Not over-constraining option content** — the role must not forbid content the design legitimately needs,
  nor impose scaffolding the content does not have.
- **Cost of the APG keyboard contract** — `listbox` and `grid` come with keyboard behaviour the browser does
  not provide; adopting them is a commitment to implement it.
- **Native form-submission needs** — some option lists have to submit as part of a form without extra
  machinery.

## Decision

In the context of option lists in Spirit widgets, facing the need to expose selectable options to assistive
technology, we decided that the role of the option list is determined by what a single option contains — and
against assigning roles per component or standardising on one role for all of them — to keep each widget's
semantics accurate without over-constraining its content, accepting that a component's role may change when
its option contents change, and that `listbox` and `grid` each oblige us to implement the full APG keyboard
contract.

### Considered Alternatives

- **A fixed role per component.** Pin every component to one role for good — a Picker is always a `listbox`,
  a tag area is always a `grid`. Rejected because it binds semantics to a component's name rather than to
  what it renders: as soon as an option gains a remove button, the fixed role misdescribes the widget, and
  assistive technology has no way to recover from that.
- **Standardise on `grid` everywhere.** Use the single role that accommodates the widest range of option
  content, so every option list behaves identically. Rejected as over-constraining in the other direction:
  it forces row and cell scaffolding plus a two-dimensional keyboard contract onto plain label lists that
  need neither, and announces a tabular structure where the design has none.
- **Always `listbox`, working around interactive content.** Keep one familiar role and reach for workarounds
  — labelling compositions, nested tab stops — wherever an option needs a button. Rejected because such
  workarounds either hide those controls from assistive technology or break the role's own keyboard contract.

### Applying the Rule

The rule yields four cases:

```txt
Is the popover one uniform list of comparable options?
├── No  → no list role — controls keep their own roles
└── Yes → Are the options native form controls (checkbox, radio)?
    ├── Yes → role="group" (fieldset + legend) — native submission and keyboard for free
    └── No  → Does an option contain interactive elements (button, link)?
        ├── Yes → role="grid" (row / gridcell)
        └── No  → role="listbox" (option)
```

**Listbox** — plain, selectable labels with **no interactive descendants**; the canonical "choose from a
list" pattern:

```txt
popover                                       role="dialog"
└── list                                      role="listbox" · aria-multiselectable (multiple)
    ├── option                                role="option"  · aria-selected
    ├── option                                role="option"  · aria-selected
    └── …
```

**Grid** — rows that contain **interactive elements** (a remove button, secondary actions) that `listbox`
cannot hold; also gives a single-tab-stop roving-focus contract:

```txt
popover                                       role="dialog"
└── grid                                      role="grid"    · aria-multiselectable (multiple)
    └── row                                   role="row"     · aria-selected
        ├── cell                              role="gridcell" (option label)
        └── cell                              role="gridcell"
            └── button                        (interactive, e.g. remove)
```

**Plain group** — **native form controls** (checkboxes, radios), especially where native form submission or
richer per-option content is needed:

```txt
popover                                       role="dialog"
├── fieldset                                  role="group"
│   ├── legend                                (group name; may be visually hidden)
│   ├── input[type="checkbox"]                (native control, × N)
│   └── input[type="checkbox"]
└── button[type="button"]                     (e.g. Apply)
```

**None** — the popover is **not a uniform list** (headings, sliders, inputs, an Apply button); no list
pattern fits the content as a whole:

```txt
popover                                       role="dialog"
├── heading
├── slider / text field                       (native controls keep their own roles)
└── button                                    (e.g. Apply)
```

Cross-cutting rules:

- **Selection** is `aria-selected` for `listbox`, native `checked` for a plain group, and per-row/cell for
  `grid`.
- **Focus** is roving `tabindex` when focus enters the widget (a button-triggered popover, a standalone
  listbox) or `aria-activedescendant` when a text input retains focus (a combobox). Either mechanism works
  with both `listbox` and `grid`.
- An **empty option list** still has to satisfy the role's content model: because `listbox` owns only
  `option` / `group` children, an empty-state message is not an `option` and cannot live inside the listbox —
  render it as a sibling and keep the referenced container in place so `aria-controls` stays valid.
- The APG is explicit that `listbox` "does not provide an accessible way to present a list of interactive
  elements, such as links, buttons, or checkboxes" — that case is exactly what `grid` (or a plain group of
  native controls) is for. See [APG Listbox][apg-listbox] and [APG Grid][apg-grid].

## Consequences

**The keyboard contract is not optional.** `listbox` and `grid` announce a widget whose keyboard behaviour
the browser does not implement. A list carrying one of these roles that does not honour its contract is worse
than the native controls it replaced: assistive technology promises the user navigation they cannot perform.
Adopting either role is a commitment to implement it — a prerequisite for shipping, not a follow-up.

- **Listbox** — the contract is Up/Down, Home/End, type-ahead and Space/Enter to select, with roving
  `tabindex` or `aria-activedescendant`. It carries no native form value, so where native form submission is
  required, use a plain group or mirror selection into hidden inputs. A `role="listbox"` owns only `option` /
  `group` children — no `<legend>`, no group-level helper or validation text, and any button must sit outside
  the listbox.
- **Grid** — the contract is roving `tabindex` with arrow navigation across both rows and cells.
- **Plain group** keeps native semantics, form submission, and keyboard handling for free, but offers no
  single-tab-stop navigation model.
- **None** (free-form content) keeps whatever roles its own controls have and relies on the wrapping
  container (for example the `dialog`) for focus management — initial focus, focus return, close — since no
  list widget provides it.

The current per-component assignments live in component documentation rather than in this record, so they can
change as components change without amending it.

### Follow-Ups

- Each component README documents the option-list role(s) it supports and links back to this record.
- Revisit this record if the APG guidance for `listbox` or `grid` changes.

[apg]: https://www.w3.org/WAI/ARIA/apg/
[apg-grid]: https://www.w3.org/WAI/ARIA/apg/patterns/grid/
[apg-listbox]: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
