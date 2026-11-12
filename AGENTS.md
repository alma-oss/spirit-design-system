# Spirit Design System

Open-source design system by Alma Career: a Yarn and Nx monorepo with React components,
vanilla SCSS and JS, design tokens, icons, and tooling.

## Repository Map

| Path                                          | Contents                                                            |
| --------------------------------------------- | ------------------------------------------------------------------- |
| `packages/web-react`                          | React components (`@alma-oss/spirit-web-react`)                     |
| `packages/web`                                | The same components in vanilla SCSS and JS (`@alma-oss/spirit-web`) |
| `packages/design-tokens`                      | Design tokens for SCSS, JS, and TS                                  |
| `packages/icons`                              | SVG and React icons                                                 |
| `packages/codemods`                           | Migration transforms between major versions                         |
| `apps/docsite`, `apps/storybook`, `apps/demo` | Documentation site, Storybook, demo app                             |
| `configs/`                                    | Shared ESLint, Stylelint, Prettier, Jest, and TypeScript configs    |
| `docs/decisions/`                             | Architecture decision records                                       |

Folders with their own rules have a nested `AGENTS.md`:
[`apps/docsite`][docsite-agents], [`apps/storybook`][storybook-agents], [`packages/codemods`][codemods-agents],
[`packages/design-tokens`][design-tokens-agents], [`packages/icons`][icons-agents], [`packages/web`][web-agents],
and [`packages/web-react`][web-react-agents].

## Setup

- Use the Node version in `.nvmrc`. Use Yarn only, never `npm` or `pnpm`.
- Install with `make install`, then build the packages with `make build` before starting an app.
- Never run `yarn add`. Add a dependency through Yarn Catalogs:
  1. Add the version under `catalogs:` in `.yarnrc.yml`.
  2. Reference it in `package.json` as `"<package>": "catalog:<catalog-name>"`.
  3. Run `yarn install`.
- Before changing a dependency's API or config, read its version-matched docs or changelog in `node_modules`,
  for example `node_modules/next/dist/docs/index.md`.

## Commands

```bash
yarn workspace @alma-oss/spirit-web-react test                  # lint, types, and unit tests of one package
yarn workspace @alma-oss/spirit-web-react test:unit <file-path> # unit tests matching a path pattern
yarn workspace @alma-oss/spirit-web test
make format-fix                                                 # Prettier
yarn lint:docs                                                  # after editing any Markdown file
make test-e2e                                                   # visual tests in Docker, start Docker first
make test-e2e-update                                            # update snapshots after an intended visual change
make test                                                       # whole repository, run before opening a PR
```

Run the checks for every package you touched before you finish.
End-to-end testing details are in the [E2E Testing guide][e2e-testing].

## Code Conventions

- Write TypeScript only. Formatting and naming come from the config files listed in [Code Style][agents-code-style].
- A component change lands in both `web` and `web-react`, with identical demos, previews, and README examples.
- A new or changed prop also needs a Storybook story, unit tests, and a demo.
- Experimental API uses the `UNSTABLE_` prefix or a feature flag.
  See [Experimental Code][experimental-code] and [Feature Flags][feature-flags].
- Styles use design tokens, never hard-coded values.
  JS media queries use `breakpoints` from `@alma-oss/spirit-design-tokens`.
- Do not pass a prop whose value equals the component default.
- Before changing an established pattern, check `docs/decisions/` for its decision record.

## Building UI with Spirit

Any agent that builds UI from Spirit uses only Spirit components and design tokens:
no inline styles, no `UNSAFE_*` props, and no ad-hoc CSS classes.

## Git and Pull Requests

- Commit or push only when the user asks.
- Before the first commit, ask for the Jira issue ID (`DS-1234`) if the user has not given it.
- Name a branch `type/DS-XXXX-short-description`.
- Write a commit header as `type(scope): description #DS-XXXX`: lowercase, imperative, at most 100 characters,
  component names in backticks. Valid scopes are in `.commitlintrc.mjs`.
- Add no AI attribution to commits or PRs: no `Co-authored-by` trailer and no "Generated with" footer.
- Fill in `.github/PULL_REQUEST_TEMPLATE.md` and link the full Jira issue URL.
- Full rules are in [Git Workflow][agents-git-workflow].

## Boundaries

- Never publish packages, run `make version` or `make publish`, force-push `main`,
  edit generated `CHANGELOG.md` files, or read or write `.env*` files.
- Ask first before a breaking change to a stable API, a new dependency, or removing a public export.
- Never edit Figma files. Read designs only, and put evidence in Jira or the pull request.

## Skills

Use a skill from [`.agents/skills/`][skills] instead of improvising a procedure it covers:

- `spirit:stabilize-component`: promote `UNSTABLE_X` to `X`.
- `spirit:component-deprecation`: deprecate a component or a prop.
- `spirit:breaking-change-checklist`: migration guide and codemod for a breaking change.
- `spirit:figma-to-code`: implement a Figma design in React.
- `spirit:accessibility`: WCAG 2.2 audit of a component.
- `spirit:atomic-commits` and `spirit:create-pr`: commits and pull requests.

[agents-code-style]: .agents/instructions/code-style.md
[agents-git-workflow]: .agents/instructions/git-workflow.md
[codemods-agents]: packages/codemods/AGENTS.md
[design-tokens-agents]: packages/design-tokens/AGENTS.md
[docsite-agents]: apps/docsite/AGENTS.md
[e2e-testing]: docs/contribution/e2e-testing.md
[experimental-code]: docs/contribution/experimental-code.md
[feature-flags]: docs/contribution/feature-flags.md
[icons-agents]: packages/icons/AGENTS.md
[skills]: .agents/skills/README.md
[storybook-agents]: apps/storybook/AGENTS.md
[web-agents]: packages/web/AGENTS.md
[web-react-agents]: packages/web-react/AGENTS.md
