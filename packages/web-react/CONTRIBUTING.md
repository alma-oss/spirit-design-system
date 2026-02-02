# Contributing

> Guide for Spirit Web React contributors.

## Adding New Component

Do not forget to export and register new component in all necessary places.

- `scripts/entryPoints.js`
- `src/components/index.ts`

## File Structure

This is an example of a typical file structure of a component:

```text
├── src
    └── components
        ├── index.ts — components root
        └── <ComponentName>
            ├── <ComponentName>.tsx — React component
            ├── index.ts — component's entry point
            ├── README.md — documentation of the component
            ├── use<ComponentName>.ts — main component's hook
            ├── use<ComponentName>AriaProps.ts — Aria component's hook
            ├── use<ComponentName>StyleProps.ts — styles and classes component's hook
            ├── <ComponentName>.stories.tsx — component's story
            └── __tests__
                ├── <ComponentName>.test.ts — component's test
                ├── use<ComponentName>.test.ts — component's hook test
                ├── use<ComponentName>AriaProps.test.ts — component's hook test
                └── use<ComponentName>StyleProps.test.ts — component's hook test
```

## Development with Storybook

- `% yarn storybook` starts development server with Storybook

## Testing

- `% cd <your-local-path>/spirit-design-system/packages/web-react`
- `% yarn test` for test package (lint, format, unit testing, types)
- `% yarn test:unit` for unit tests

## Translations

Centralised default labels for Spirit components. Labels are provided via the `useI18n` hook.

### Structure

- **`src/translations/defaults.ts`** – Nested object `defaultLabels` with all default strings. Keys use dot notation (e.g. `common.close`, `textField.password.show`).
- The **`useI18n`** hook lives in `src/hooks/useI18n.ts` and returns a `t` function that reads from these defaults.

### Usage

Use the hook in any client component:

```tsx
const { t } = useI18n();

t('common.close'); // 'Close'
t('pagination.next'); // 'Next'
t('unknown.key'); // 'unknown.key' (returns key when not found)
```

#### Params (placeholders)

The `t` function accepts an optional second argument `params`: an object whose keys match placeholders in the translation. Each occurrence of `{key}` in the resolved string is replaced by `String(params[key])`.

Example: if a translation were `"Page {current} of {total}"`, you would call:

```tsx
t('pagination.pageOf', { current: 1, total: 10 }); // "Page 1 of 10"
```

Current default labels do not use placeholders; this is for future keys or when overriding translations with interpolation.

### Adding New Keys

1. Add the key to `defaultLabels` in `src/translations/defaults.ts` following the nested structure (e.g. `pagination.goToPage`, `textField.password.show`).
2. Use the key in components via `t('your.namespace.key')`.
