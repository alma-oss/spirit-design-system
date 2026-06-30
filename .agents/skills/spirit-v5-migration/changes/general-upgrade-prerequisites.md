# General Upgrade Prerequisites

## When It Applies

Every Spirit v5 migration. Run before component-level recipes.

## Detection

```bash
rg "engines.*node|@alma-oss/spirit" package.json
rg "@alma-oss/spirit-web-react/.*/" <path> -g "*.{ts,tsx}"  # deep imports
rg "formFieldMode" <path> -g "*.{ts,tsx,js,jsx}"
```

## Steps

The agent performs these steps in the target codebase:

1. **Node.js ≥ 22** — upgrade `.nvmrc`, `engines.node`, and CI matrix.
2. **Bump packages** — `@alma-oss/spirit-web-react`, `@alma-oss/spirit-web`, `@alma-oss/spirit-design-tokens` to v5.
3. **Fix removed exports** — TypeScript will fail on imports removed in v5. Resolve compile errors before component-level recipes; dedicated recipes cover stabilized components (e.g. [fileupload-stabilization](fileupload-stabilization.md), [header-stabilization](header-stabilization.md)).
4. **Verify deep imports** — internal paths like `Field/` utilities may have moved; confirm they still exist.
5. **Remove `formFieldMode` usage** — the internal form-field mode API and its vertical-spacing behavior were
   removed; compose spacing explicitly using the current form components/layout APIs.

## Codemod

None for this step.

## Report Guidance

- Status: `completed` when packages upgraded and compile errors from removed exports resolved.
- Confidence: `high` for package bumps; `medium` for deep-import fixes the agent applied.
