# UNSTABLE_Picker

## When It Applies

Apps using `UNSTABLE_Picker`, `UNSTABLE_UncontrolledPicker`, or related subcomponents. The component remains
**UNSTABLE** in v5 — there is no stabilization codemod like `FileUpload`.

## Detection

```bash
rg "UNSTABLE_Picker|UNSTABLE_UncontrolledPicker|UNSTABLE_PickerGroup|UNSTABLE_PickerItem|UNSTABLE_PickerTag" <path> -g "*.{tsx,ts}"
```

## Codemod

Partial — only shared breaking changes apply:

- **`isFluid` removed** — handled by [forms-is-fluid-removal](forms-is-fluid-removal.md) (`UNSTABLE_Picker` and
  `UNSTABLE_UncontrolledPicker` are in the target set).
- Use `-s <wrapper-package>` when imports go through a design-system wrapper.

## Safe Automated Edits

Component names stay `UNSTABLE_*` in v5. Subcomponents (`UNSTABLE_PickerGroup`, `UNSTABLE_PickerItem`,
`UNSTABLE_PickerTag`) keep the same names.

## Agent Edits

1. **Wrapper re-exports** — When the app imports Picker from a wrapper package, verify the wrapper still exports all
   subcomponents used downstream after v5 upgrade.
2. **`isFluid` removal** — Apply layout wrappers where `isFluid` controlled width; see
   [forms-is-fluid-removal](forms-is-fluid-removal.md).
3. **Checkbox/Radio inside PickerItem** — Verify the v5 item composition and spacing after the choice-control
   markup change; do not add the non-item row padding manually.
4. **Custom `renderTags`** — Re-verify keyboard behaviour after upgrade if using custom tag rendering.

## Report Guidance

- Status: `partial` when `isFluid` and wrapper exports are handled but filter UI needs visual/a11y QA.
- Confidence: `medium` — UNSTABLE API surface is unchanged but surrounding form/layout recipes may apply.
