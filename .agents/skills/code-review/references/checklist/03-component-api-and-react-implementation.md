# 3. Component API and React Implementation (`packages/web-react/src`)

- **Composition over props** (important) — Content areas are slots or composition (pass a
  `ContextualHelp`, not `contextualHelpText`); new APIs are controlled by default with logic in a hook.
- **Context props precedence** (important) — Local prop → context prop → default, merged in one place
  with `useContextProps` and a component namespace. Only values children consume go into context.
- **Style-prop conventions** (important) — Components use `useStyleProps`; style hooks return
  `{ classProps, styleProps, props }`. Consumers' `UNSAFE_className` and `UNSAFE_style` are merged,
  not overwritten.
- **Honest prop types** (important) — Props the component ignores are not exposed (`Omit` them);
  `??` is used where `""` or `0` are valid; no unnecessary type assertions.
- **Translations** (important) — User-facing strings (including `aria-label` text) come from
  `packages/web-react/src/translations/defaults.ts`, not literals.
- **Conditional props** (minor) — Optional props are spread conditionally
  (`{...(error && { validationState: 'danger' })}`) rather than passed as `undefined` from a ternary.
- **Robustness** (blocking → question) — Non-happy paths are handled: `null` from DOM lookups, missing
  provider values, empty or scalar inputs, API errors. Blocking when the diff shows wrong output;
  otherwise ask.
- **Exports** (important) — A new public component is exported from its `index.ts` and registered in
  `packages/web-react/package.json` exports where siblings are.
