# Stack `StackItem` Dividers

## When It Applies

Apps using `Stack` with `hasIntermediateDividers`, `hasStartDivider`, or `hasEndDivider`.

## Detection

```bash
rg "has(IntermediateDividers|StartDivider|EndDivider)" <path> -g "*.{tsx,jsx}"
```

## Codemod

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/stack-wrap-children-in-stack-item
```

Wraps direct children in `StackItem`. Adds import if missing.

**Skipped:** expression-container children (`{condition && <Item />}`, comments).

## Safe Automated Edits

```diff
- import { Stack } from '@alma-oss/spirit-web-react';
+ import { Stack, StackItem } from '@alma-oss/spirit-web-react';

- <Stack hasIntermediateDividers>
-   <>Item 1</>
-   <>Item 2</>
- </Stack>
+ <Stack hasIntermediateDividers>
+   <StackItem>Item 1</StackItem>
+   <StackItem>Item 2</StackItem>
+ </Stack>
```

When `Stack` has `elementType="ul"` or `elementType="ol"`, `StackItem` defaults to `elementType="li"`.

## Agent Edits

The agent wraps conditional Stack children the codemod skips (`{condition && <Item />}`, mapped lists).

## Report Guidance

- Status: `completed` when all divider Stack children wrapped.
- Status: `partial` if conditional children remain.
- Confidence: `medium`.
