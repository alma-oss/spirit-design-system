# Spirit Design System Overview

Spirit is the design system of Alma Career. Screens are built from React components in
`@alma-oss/spirit-web-react`. Their visual values come from `@alma-oss/spirit-design-tokens`, and you consume tokens
through component props, never directly.

## Import Path

Import only the names you use from one package:

```tsx
import { Button, Heading, Stack, TextField } from '@alma-oss/spirit-web-react';
```

React hooks come from `react`.

## Icons

Render icons with `<Icon name="…" />`. Icons are provided globally in Storybook, so no icon package is imported.
Common names:
`add`, `bullet`, `bullet-outline`, `check-plain`, `chevron-down`, `chevron-left`, `chevron-right`, `chevron-up`,
`close`, `danger`, `download`, `edit`, `file`, `folder-dualtone`, `hamburger`, `help`, `info`, `link`, `lock`,
`more`, `placeholder`, `profile`, `reload`, `search`, `shield-dualtone`, `spinner`, `success`, `upload`,
`visibility-off`, `visibility-on`, `warning`, and brand logos such as `logo-google`, `logo-linkedin`, `logo-facebook`.

```tsx
<Icon name="search" />
<Icon name="success" boxSize={20} color="success" />
```

Icon is decorative by default (`ariaHidden` is `true`). Give meaning with visible text or `VisuallyHidden`.

## Stable Components by Purpose

- **Layout:** `Container`, `Section`, `Stack`, `StackItem`, `Flex`, `Grid`, `GridItem`, `Box`, `Divider`, `ScrollView`,
  `Hidden`, `VisuallyHidden`.
- **Typography:** `Heading`, `Text`, `CaptionText`, `ActionText`, `Link`, `Truncate`.
- **Forms:** `TextField`, `TextArea`, `Select`, `Checkbox`, `Radio`, `Toggle`, `FieldGroup`, `Slider`,
  `SegmentedControl`, `SegmentedControlItem`, `FileUpload`, `InputAddon`, `Label`, `HelperText`, `ValidationText`
  (a character counter comes from the `hasCounter` prop of `TextArea`).
- **Actions:** `Button`, `ButtonLink`, `ActionGroup`, `ControlButton`, `CloseButton`, `SplitButton`.
- **Feedback:** `Alert`, `Toast`, `ToastBar`, `ProgressBar`, `Spinner`, `Skeleton` parts (`SkeletonText`,
  `SkeletonHeading`, `SkeletonShape`), `EmptyState`, `EmptyStateSection`.
- **Navigation:** `Header`, `HeaderLogo`, `Navigation`, `NavigationItem`, `NavigationAction`, `Breadcrumbs`,
  `Pagination`, `Tabs`, `TabList`, `TabItem`, `TabContent`, `TabPane`, `SkipLink`, `Footer`.
- **Overlays:** `Modal`, `ModalDialog`, `ModalHeader`, `ModalBody`, `ModalFooter`, `Drawer`, `DrawerPanel`,
  `Dropdown`, `DropdownTrigger`, `DropdownPopover`, `Tooltip`, `ContextualHelp`.
- **Data display:** `Card` (with `CardBody`, `CardTitle`, `CardEyebrow`, `CardMedia`, `CardArtwork`, `CardLogo`,
  `CardFooter`, `CardLink`), `Tag`, `Pill`, `Avatar`, `IconBox`, `Accordion`, `Collapse`, `Timeline`, `Matrix`,
  `PricingPlan`, `ProductLogo`, `PartnerLogo`.

## Experimental Components

`UNSTABLE_Combobox`, `UNSTABLE_DisplayHeading`, `UNSTABLE_EyebrowText`, `UNSTABLE_Picker`, `UNSTABLE_SplitTag`,
`UNSTABLE_Table` and `UNSTABLE_Tile` exist, but their API may change. Use them only when the prompt asks for
exactly that capability (for example a data table) and no stable component fits.

## Required Props to Remember

- `Heading` needs `elementType` (`h1`–`h6`). TypeScript does not enforce it, but rendering fails without it.
- Every form control (`TextField`, `TextArea`, `Select`, `Checkbox`, `Radio`, `Toggle`, `FieldGroup`) needs `id` and
  `label`.
- `Modal` needs `id`, `isOpen` and `onClose`.
