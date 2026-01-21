# Experimental Code

The team will occasionally author code or accept contributions, that are
considered experimental or unstable. The goal for this code is to ship it as
unstable for sponsor products to leverage. During this time, the team can get
feedback around on what is working and what does not work so that changes can be
made before an official release.

Experimental code is made available in the following ways:

- Components and exports prefixed with `UNSTABLE_`
- Feature flags

In all cases, experimental code should be treated as unstable and can change
between releases of minor or patch versions for the package that it is being imported from.

- The API is not fixed and is likely to change
- The API is not bound by semantic versioning
- The component, export, feature, etc. may change, be renamed, or removed in the
  future without warning

## Components and Exports Prefixed with `UNSTABLE_`

For experimental or unstable exports, we use the `UNSTABLE_` prefix. For
example:

```js
// An unstable method
function UNSTABLE_layout() {
  // ...
}

// An unstable variable
const UNSTABLE_meta = {
  // ...
};

// An unstable component's hook will retain its name, specifically for things like
// the rules of hooks plugin which depend on the correct casing of the name
function useExampleHook(props) {
  // ...
}

// When we export the component we will export it with the `UNSTABLE_`
// prefix. (Similar to React.unstable_Suspense, React.unstable_Profiler)
// however we will use it in all caps format
export { default as UNSTABLE_ExampleComponent } from './components/UNSTABLE_ExampleComponent';
```

For teams using these features, they will need to import the functionality by
using the `UNSTABLE_` prefix. For example:

```jsx
import { UNSTABLE_ExampleComponent as ExampleComponent } from '@alma-oss/spirit-web-react';
```

### Documenting Components and Exports Prefixed with `UNSTABLE_`

Each unstable component will be documented in the same way as stable components, e. g.
it will have a README file that documents its functionality.
The README file will also point to this document with the statement that the component is unstable.

Within the _EXPERIMENTAL_ section of the Spirit Design System Storybook, there are
individual entries for each unstable export. These contain stories and embedded readme documentation
outlining the functionality of these components and exports.

## Feature Flags

Some Spirit packages ship with available feature flags. These feature flags
enable new behavior and styling, allowing you to opt-in to new breaking changes
while remaining on the current major version. When a new feature flag is
introduced it is marked `false` or "off" by default to ensure backward
compatibility. A feature flag may be configured in JavaScript, SASS, or both.

All the currently available feature flags, as well as how to enable them, is
documented in each package's main README file in the section `Feature Flags`.

### Feature Flag Naming Convention

All feature flags follow a prefix naming convention that indicates status.

#### Flags Prefixed with `enable-*`

- Contain new features that we'd like consuming projects to test
- Are generally stable and unlikely to change but may change based on user
  feedback
- May require some manual migration or code changes within your project
- Are documented in the package's main README file
- Need user feedback to ensure we've met all concerns relating to this feature
- Are used for introducing visual changes that are considered breaking

If you use these flags, make sure to check our release notes where we'll outline
any changes to them across our releases.

#### Flags Prefixed with `enable-v#-*`

As the usage of an existing flag increases or we determine a feature to be of high
importance, we'll "commit" it to a future major release and rename it to use the
`enable-v#-*` prefix. At this point, the API or functionality behind this flag is
now fixed and won't change. We intend to ship this flag as "on by default" in
the major version indicated in the name. e.g. `enable-v3-some-feature`

All breaking changes will be shipped as `enable-v#-*` flags within the current
releases. This enables projects to opt-in to breaking changes earlier
and at their own pace avoiding one huge changeset when upgrading to the next
major release. In theory, if all `enable-v#-*` flags are enabled within your
project before the major release, no changes should need to be made when updating
to the next major version except for removing the feature flag setters to clean up your codebase.

For a flag to be committed to a release and renamed to `enable-v#-*` it must:

- Be tested with early adopters
- Be fully covered in tests (Unit, Visual)
- Be documented in Storybook
- Be documented on https://spirit.design
- Have an automated migration script (codemod) available, where possible

### Documenting Feature Flags

In the main documentation, there is a [`feature-flags.md`][docs-feature-flags] file that documents all
available feature flags and how to configure them.

Within the experimental section of the Spirit Design System Storybook, there is a
"Feature Flags" folder. This contains stories and written documentation from the above paragraph.
Folders and stories within this section in the Storybook show components with all feature flags turned on.

All the currently available feature flags, as well as how to enable them, are documented in the main documentation.

Individual feature flags that are available for some components only will be also documented in
the component's README file.

## Expanding Existing APIs

New experimental functionality might sometimes be added with the need for an
`UNSTABLE_` export or a feature flag. Oftentimes, this ends up being a new prop
on a component.
The documentation associated with this prop (TypeScript types, Storybook controls, etc.) will state that it's experimental.

## Moving to Stable

Over time it becomes apparent an experimental API has stabilized and suits the
needs of most users. If it isn't a breaking change, and there hasn't been much
movement, it can be moved from "experimental" status to "stable".

To initiate a move to stable, a new issue can be opened to request the team to evaluate
if it can be moved (most of the time the team will initiate this move).
The issue should contain the following criteria that need to
be met to move a component from experimental to stable:

<!-- Because of the GitHub syntax for the checkboxes -->
<!--lint disable no-undefined-references-->

- [ ] All components are exported through main package export file and should not be `UNSTABLE_`
      prefixed
- [ ] The component should be well documented according to the documentation
      guidelines
  - [ ] The component should have a component demo
- [ ] For each component exported (web-react):
  - [ ] The component is written as a function declaration or uses `forwardRef`
  - [ ] Component has `types` defined
    - [ ] Each prop type has a comment (used in Storybook)
  - [ ] Default props are listed as default args in the function definition (not
        in defaultProps)
    - [ ] Note: default props should be stable, in other words, props like
          `onClick = () => {}` can cause re-renders since the function identity
          is not stable
  - [ ] Component has a story in `<ComponentName>.stories.ts`
    - [ ] The story has an MDX overview that embeds the main component's README file
    - [ ] MDX document covers at least common component states and provides a prop
          table
    - [ ] Stories cover at least common component states
    - [ ] Stories generate a `Playground` for controls
      - [ ] Controls with no meaningful change to the component visuals should
            be hidden from the controls panel, eg. `className`
      - [ ] Props of type `node` with no proper controls available for
            configuration should be hidden from the controls panel, eg.
            `children`
    - [ ] Stories should mirror the intended usage of the component
  - [ ] The component has unit/integration/snapshot tests written using the project's unit testing library for testing the component API
  - [ ] The component has visual tests written using the project's End-to-End testing library for testing the component design
  <!--lint enable no-undefined-references-->

[docs-feature-flags]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/feature-flags.md
