# Header Stabilization

## When It Applies

Apps using `UNSTABLE_Header`, `UNSTABLE_HeaderLogo`, or the previous `Header` with subcomponents.

## Detection

```bash
rg "UNSTABLE_Header|UNSTABLE_HeaderLogo|HeaderNav|HeaderDialog|HeaderMobileActions|useUnstableHeaderStyleProps" <path>
# Local naming aliases (wrapper monorepos)
rg "UNSTABLE_SpiritHeader|SpiritHeader|Header as " <path> -g "*.{tsx,ts}"
```

## Codemod (UNSTABLE Rename Only)

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/header-unstable-to-stable
```

Renames `UNSTABLE_Header` → `Header`, `UNSTABLE_HeaderLogo` → `HeaderLogo`, and related types/hooks.

Pass `-s <wrapper-package>` when imports go through a design-system wrapper.

## Safe Automated Edits

```diff
- import { UNSTABLE_Header, UNSTABLE_HeaderLogo } from '@alma-oss/spirit-web-react';
+ import { Header, HeaderLogo } from '@alma-oss/spirit-web-react';
```

## Agent Edits

The agent recomposes old `Header` usage in the target codebase — no codemod exists for the previous compound API.

Removed subcomponents: `HeaderNav`, `HeaderDialog`, `HeaderMobileActions`, etc. Rebuild with current `Header`,
`Navigation`, and `Drawer`. Read the existing layout and preserve behavior (logo, nav items, mobile drawer) as
closely as the new API allows.

See [Header README](../../../../packages/web-react/src/components/Header/README.md) for composition examples.

### Local Naming Collisions

When the app already exports a component named `Header`, do **not** rename Spirit imports to bare `Header`. Import
under an alias and keep the local name unchanged:

```tsx
import { Header as SpiritHeader, HeaderLogo as SpiritHeaderLogo } from '@org/design-system';

export { Header } from './Header'; // local wrapper unchanged
```

Migrate `UNSTABLE_SpiritHeader` / `UNSTABLE_SpiritHeaderLogo` aliases to `SpiritHeader` / `SpiritHeaderLogo`
(import aliases above). The `header-unstable-to-stable` codemod does not match these custom names — apply manually.

## Report Guidance

- Status: `completed` when UNSTABLE rename and any old Header recomposition are done and the app builds.
- Status: `partial` when recomposition is applied but layout/mobile behaviour needs visual QA.
- Confidence: `high` for codemod; `medium` for old Header migration or alias renames the agent applied.
