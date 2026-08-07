# Listbox vs Grid for Selectable Options

Date: 2026-07-30

Status: proposed

## Context

Many widgets let a user pick from a set of options — a dropdown of choices, a filter, a tag input, a
combobox. Each one has to decide how the **option list** is exposed to assistive technology. Picking the
wrong role either under-describes the widget (options that never announce as selectable) or over-constrains
it (a role that forbids the content the design needs), so it is worth deciding deliberately.

The deciding factor is **what a single option contains**, not what surrounds the list. In particular, a
widget does **not** need an associated text input for `listbox` or `grid` to apply:

> In a combobox, the input isn't what gives the listbox/grid its meaning — it adds a second, optional
> mechanism on top: **virtual focus**. `aria-activedescendant` on the input lets DOM focus stay in the text
> field while the "active" option is announced. The listbox/grid would be a perfectly valid widget without
> the input; the input just changes where real focus lives.
>
> Without an input, you use the other focus mechanism the APG defines for the exact same widgets: **real
> focus via roving `tabindex`**. Focus physically enters the container and lands on an option. This is
> precisely what the standalone [APG Listbox examples][apg-listbox] do — self-contained listboxes with no
> combobox and no input, driven by roving `tabindex`.

So the presence or absence of an input decides the _focus mechanism_ (virtual vs real); the option's
_contents_ decide the _role_.

## Decision

Choose the role for the **option list** itself. All four choices are equally valid — use the one whose
description fits your options.

**Container vs. list — do not confuse the two layers.** In Spirit the options are wrapped by the Dropdown
popover, which is always `role="dialog"`, present no matter which option-list role you pick. What differs is
what points at it: a Picker's trigger references the dialog (`aria-haspopup="dialog"`, `aria-controls` → the
dialog), whereas a combobox's text input references the inner list (`aria-haspopup="listbox"` / `"grid"`,
`aria-controls` → the `listbox` / `grid`), leaving the dialog wrapper present but unreferenced. `dialog` is a
container role, never an option-list role — so the `popover` node in each diagram below is that dialog.

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
└── fieldset                                  role="group"
    ├── legend                                (group name; may be visually hidden)
    ├── input[type="checkbox"]                (native control, × N)
    └── input[type="checkbox"]
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
- The APG is explicit that `listbox` "does not provide an accessible way to present a list of interactive
  elements, such as links, buttons, or checkboxes" — that case is exactly what `grid` (or a plain group of
  native controls) is for. See [APG Listbox][apg-listbox] and [APG Grid][apg-grid].

## Consequences

- **Listbox** requires implementing the APG keyboard contract — Up/Down, Home/End, type-ahead, Space/Enter
  to select, with roving `tabindex` or `aria-activedescendant` — since the browser provides none of it; do
  not adopt `role="listbox"` without it. It also carries no native form value, so where native form
  submission is required, use a plain group or mirror selection into hidden inputs. A `role="listbox"` owns
  only `option` / `group` children — no `<legend>`, no group-level helper or validation text, and any button
  must sit outside the listbox.
- **Grid** likewise requires its keyboard contract (roving `tabindex`, arrow navigation across rows and
  cells); do not adopt `role="grid"` without it.
- **Plain group** keeps native semantics, form submission, and keyboard handling for free, but offers no
  single-tab-stop navigation model.
- **None** (free-form content) keeps whatever roles its own controls have and relies on the wrapping
  container (for example the `dialog`) for focus management — initial focus, focus return, close — since no
  list widget provides it.

Components choose per option contents, not per component. In Spirit today that means:

- a list of plain selectable labels uses `listbox`
- a selection/tag area with remove buttons uses `grid`
- native checkbox/radio option lists stay a plain group
- free-form popovers apply no list role to their content

Where a Dropdown popover hosts any of these, that popover stays a `role="dialog"` regardless. Each component
documents the option-list role(s) it supports in its README and links back to this record.

[apg-grid]: https://www.w3.org/WAI/ARIA/apg/patterns/grid/
[apg-listbox]: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
