# Component Selection

Do not memorize full APIs here. Confirm exports, props, and defaults from current source:

- Barrel: `packages/web-react/src/components/index.ts`
- Component folder: `packages/web-react/src/components/<Name>/` (implementation, types, README, `figma/`)
- Categories (docsite, not an export list): `apps/docsite/src/domains/components/constants/componentCategories.ts`
- Deprecations: `packages/web-react/DEPRECATIONS.md`

Prefer a Spirit component when it owns the needed semantics, behavior, or styling. Before building a
recognisable pattern out of Box, Flex, and borders, search `packages/web-react/src/components` for a
composite that already covers it. Pricing tables, scrollable areas, and divider lists map to
`PricingPlan` + `Matrix`, `ScrollView`, and `Stack` — not stacked bordered boxes. The Figma layer
name is the strongest hint. Reproducing a component’s visuals by hand also loses its behaviour
(for example the dotted underline on a PricingPlan feature exists only when that feature opens a
Tooltip or Modal).

Use native HTML when no Spirit component is responsible (plain paragraphs inside Card, list items,
decorative wrappers).

## Routing

| Figma signal                             | Spirit starting point                                 | Notes                                                                                                                  |
| ---------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Section / page block                     | `Section`                                             | Includes `Container` by default                                                                                        |
| Named Container layer                    | `Container` or `Section containerProps`               | Multiple distinct widths → extra `Container`s; see [layout](layout.md)                                                 |
| Autolayout row/column                    | `Flex`                                                | Uniform repeating items → `Grid`; vertical list with dividers → `Stack`                                                |
| Surface, padding, border, semantic color | `Box`                                                 | Prefer `colorScheme`; `Box` has no layout. Settings panels → `Box`, not `Card isBoxed`                                 |
| Heading text styles                      | `Heading`                                             | `elementType` required                                                                                                 |
| Display text styles                      | `UNSTABLE_DisplayHeading`                             | `elementType` required; no `fontWeight`. Not `Heading`                                                                 |
| Body text styles                         | `Text`                                                |                                                                                                                        |
| Caption text styles                      | `CaptionText`                                         | Do not map Caption to `Text size="small"`                                                                              |
| Standalone Action typography             | `ActionText`                                          | Button, ButtonLink, and Link already own their label typography                                                        |
| Link text style or `themed/link/...`     | `Link` or `CardLink`                                  | See [typography](typography.md) and [cards](cards.md)                                                                  |
| Button / ButtonLink                      | `Button` / `ButtonLink`                               | Color is `color`, not `variant`. Full-width via parent `alignmentX="stretch"`. Opens a popover → [Dropdown](#dropdown) |
| Button cluster                           | `ActionGroup`                                         | Defaults: vertical+stretch on mobile, horizontal+left from tablet. Submit/cancel: [forms](forms.md)                    |
| Close / dismiss control                  | `CloseButton`                                         | Replaces old per-overlay close buttons                                                                                 |
| Icon glyph                               | `Icon`                                                | Prop is `name`. Requires `IconsProvider`                                                                               |
| Icon in a shaped container               | `IconBox`                                             | Prop is `iconName`, not `name`                                                                                         |
| Card family                              | `Card` + subcomponents                                | Only when artwork/title/footer/link composition applies; else `Box`. See [cards](cards.md)                             |
| Form control                             | Matching field (`TextField`, `Select`, `Checkbox`, …) | Compose Label, HelperText, ValidationText from current field docs. Form shell: [forms](forms.md)                       |
| File upload                              | `File` + `FileUpload`                                 | Not the removed `FileUploader`                                                                                         |
| Header / Navigation / Footer             | Stabilized `Header`, `Navigation`, `Footer`           | Not `UNSTABLE_Header`                                                                                                  |
| Overlay                                  | `Dialog`, `Modal`, `Drawer`, `Tooltip`, `Dropdown`    | Follow that family’s focus and composition README. Dropdown trigger mapping: [Dropdown](#dropdown)                     |
| Dropdown / popover menu                  | `Dropdown`                                            | Figma trigger is often a detached Button or ControlButton. See [Dropdown](#dropdown)                                   |
| Collapse / accordion disclosure          | `Collapse` / `UncontrolledCollapse`                   | `id` required; controlled `Collapse` needs `isOpen`; use `isDisposable`, not `hideOnCollapse`                          |
| Responsive show/hide                     | `Hidden` or `hideOn` / `hideFrom` style props         |                                                                                                                        |
| Screen-reader-only label                 | `VisuallyHidden`                                      |                                                                                                                        |
| Clamped copy                             | `Truncate`                                            | Common inside Card body                                                                                                |
| Nested stacks that must align            | `Matrix`                                              |                                                                                                                        |
| Pricing table / plan comparison          | `PricingPlan` + `Matrix`                              | Not a stack of bordered Boxes. Feature underlines come from Tooltip/Modal, not `textDecoration`                        |
| Overflow region                          | `ScrollView`                                          | Horizontal carousels: wrap Grid/Matrix; do not give children fixed pixel widths                                        |

Experimental public names start with `UNSTABLE_` (`UNSTABLE_DisplayHeading`, `UNSTABLE_Combobox`,
`UNSTABLE_Picker`, `UNSTABLE_SplitTag`, `UNSTABLE_Table`). Use them when Figma or Code Connect maps
to them (Display/\* → `UNSTABLE_DisplayHeading`), or when the user asks. Do not silently substitute
a stable sibling.

## Dropdown

In Figma the trigger is usually a `Button` or `ControlButton` and is **not** nested under the
Dropdown instance. In code it is `DropdownTrigger` with `elementType` set to that visual host.

- Do not emit a standalone `Button` or `ControlButton` when the control opens a popover.
- Compose `Dropdown` (or `UncontrolledDropdown`) + `DropdownTrigger` + `DropdownPopover`.
- Default `DropdownTrigger` `elementType` is native `button`. Pass `elementType={Button}`,
  `elementType={ControlButton}`, or another button-like host (`Tag`, `NavigationAvatar`) to match
  the design.
- Confirm against `packages/web-react/src/components/Dropdown/figma/Dropdown.figma.tsx` and the
  Dropdown README.

## Icons

- `Icon` → `name`
- `IconBox` → `iconName` (IconBox README examples that use `name` are stale; types require `iconName`)
- Keep `placeholder` and other Figma identifiers exactly
- Exception: if sibling controls are identified by Figma layers, component properties, annotations,
  or provided design context as **distinct** actions (for example previous and next), do not collapse
  them to duplicate placeholders. Use the confirmed glyph for each action. If the glyphs cannot be
  confirmed, keep the placeholders and flag the ambiguity.
- Decorative icons: Icon defaults to `ariaHidden={true}`. Informative icons need an accessible name (`title` or surrounding text)

## When Nothing Maps

If Figma uses a custom frame with no Spirit equivalent, compose layout + typography from this skill.
Do not invent a new component. If the pattern looks like a missing DS component, ask whether to
compose primitives or wait for a design-system component.
