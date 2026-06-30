# Form Components `isFluid` Removal

## When It Applies

Apps using `isFluid` on form components.

## Detection

```bash
rg "isFluid" <path> -g "*.{tsx,jsx}"
```

## Affected Components

The codemod covers `TextField`, `TextArea`, `Select`, `Slider`, `Toggle`, `FieldGroup`, `UNSTABLE_Picker`, and
`UNSTABLE_UncontrolledPicker`. Remove `isFluid` from stable `FileUpload` manually.

Form components are fluid by default. Use `Grid`, `Stack`, or `Container` for width control.

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/forms-isFluid-prop-removal
```

Does not touch non-form components (`Container`, `PartnerLogo`, `SegmentedControl`).

### PartnerLogo Edge Case

The codemod **intentionally skips** `PartnerLogo`. Unlike form fields, `PartnerLogo` **still supports `isFluid` in v5** — it is a layout prop for fluid logo sizing, not a removed form API. Do not remove `isFluid` from `PartnerLogo` during this migration. If a leftover `isFluid` search flags `PartnerLogo`, mark it `not-applicable` for this recipe and verify against the [PartnerLogo README][partnerlogo-readme] only when v5 API docs differ.

## Safe Automated Edits

```diff
- <TextField id="name" label="Name" isFluid />
+ <TextField id="name" label="Name" />
```

## Agent Edits

The agent applies layout wrappers when `isFluid` was controlling width.

If `isFluid` achieved a specific layout, add parent `Grid`, `Stack`, or `Container` in the target codebase.

## Report Guidance

- Status: `completed` when all `isFluid` props removed from form components.
- Confidence: `high`.

[partnerlogo-readme]: ../../../../packages/web-react/src/components/PartnerLogo/README.md
