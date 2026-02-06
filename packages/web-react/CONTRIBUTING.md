# Contributing

> Guide for Spirit Web React contributors.

## Guidelines

### Writing a Component

Do not forget to export and register new component in all necessary places.

- `scripts/entryPoints.js`
- `src/components/index.ts`

### File Hierarchy

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

## Code Style

### Naming Types

**The Pattern:**

1. `<Component>StyleProps` → visual props + extends StyleProps base
2. `<Component>StateProps` → state initialization (optional)
3. `<Component>State` → runtime state shape (optional)
4. `<Component>Props` → complete internal props (StyleProps + State + behavior + ChildrenProps)
5. `Spirit<Component>Props<E>` → **PUBLIC API** - polymorphic wrapper with element type

**For Hooks:**

- Style: `<Component>StyleProps` → `<Component>Style`
- State: `<Component>StateProps` → `<Component>State`
- Aria: `<Component>AriaProps` → `<Component>Aria`

**Key Principles:**

- **Spirit prefix = Public API** - always use `Spirit<Component>Props<E>` in exports and documentation
- **No Spirit prefix = Internal** - `<Component>Props` is for internal type composition
- **StyleProps extends StyleProps base** - all components get spacing, display, theme props

#### Visual Hierarchy

```txt
┌─────────────────────────────────────────────────────────────┐
│ Spirit<Component>Props<E>                                   │  ← PUBLIC API (polymorphic)
│ = PolymorphicComponentProps<E, <Component>Props>            │
└────────────────────────┬────────────────────────────────────┘
                         │ wraps
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ <Component>Props                                            │  ← Internal (complete props)
│ extends:                                                    │
│   - <Component>StyleProps                                   │
│   - <Component>State (optional)                             │
│   - ChildrenProps                                           │
│   - Event handlers & behavior props                         │
└────────────┬──────────────────────┬─────────────────────────┘
             │                      │
             ▼                      ▼
┌──────────────────────┐  ┌──────────────────────┐
│ <Component>StyleProps│  │ <Component>State     │ (optional)
│ extends StyleProps   │  │ - state values       │
│ - visual props       │  │ - state updaters     │
└──────────────────────┘  └──────────┬───────────┘
                                     │
                                     ▼
                          ┌──────────────────────┐
                          │ <Component>StateProps│ (optional)
                          │ - init props         │
                          └──────────────────────┘
```

#### Component Type Hierarchy

##### 1. `<Component>StyleProps` (Required)

Props that directly affect the component's visual appearance and styling.

**Contains:**

- Visual styling props (color, size, backgroundColor, etc.)
- Layout props specific to the component
- **Includes**: `StyleProps` base (spacing, display, theme, UNSAFE\_\*)
- **Does NOT include**: ChildrenProps, state management, event handlers, behavior flags

**Example:**

```typescript
interface ButtonStyleProps<C = void, S = void> extends StyleProps {
  color?: ButtonColor<C>;
  size?: ButtonSize<S>;
  isSymmetrical?: SingleOrResponsive<boolean>;
}
```

##### 2. `<Component>StateProps` (Optional)

Props related to component state management, typically used for uncontrolled components.

**Contains:**

- Initial state props (defaultOpen, defaultValue, etc.)
- State control flags (stayOpen, allowMultiple, etc.)
- **Does NOT include**: current state values or state setters

**Example:**

```typescript
interface AccordionStateProps {
  defaultOpen?: AccordionOpenStateType;
  stayOpen?: boolean;
}
```

##### 3. `<Component>State` (Optional)

The actual state shape returned by state hooks, including both values and setters.

**Contains:**

- Current state values
- State update functions

**Example:**

```typescript
interface AccordionState {
  open: AccordionOpenStateType;
  toggle: (id: string) => void;
}
```

##### 4. `<Component>Props` (Required)

The complete set of component-specific props, combining all the above. This is the internal base props type.

**Contains:**

- `<Component>StyleProps` (includes StyleProps base)
- `<Component>State` (if stateful component)
- `ChildrenProps` (if needed)
- Event handlers (onClick, onChange, etc.)
- Behavior props (isDisabled, isLoading, etc.)
- Any other component-specific props

**Example:**

```typescript
interface ButtonProps<C = void, S = void> extends ButtonStyleProps<C, S>, ChildrenProps, ClickEvents {
  isDisabled?: boolean;
  isLoading?: boolean;
  isBlock?: boolean;
  type?: ButtonType;
}
```

##### 5. `Spirit<Component>Props<E>` (Required - PUBLIC API)

The final polymorphic type that adds element type props and ref handling. **This is the primary public-facing API** for all Spirit components.

**Contains:**

- All props from `<Component>Props`
- Element-specific props based on `E` (ElementType generic)
- `elementType` prop for polymorphism
- Ref handling (via PolymorphicComponentProps)

**Example:**

```typescript
export type SpiritButtonProps<E extends ElementType = 'button', C = void, S = void> = PolymorphicComponentProps<
  E,
  ButtonProps<C, S>
>;
```

**For non-polymorphic components:**

```typescript
export interface SpiritDrawerProps extends DrawerProps {}
// or simply export DrawerProps directly if not polymorphic
```

##### 6. `<Component>Props<E>` (Optional - Convenience Alias)

An optional shorter alias to the Spirit-prefixed type for convenience.

**Example:**

```typescript
// Optional: for convenience, can alias to the Spirit version
export type ButtonProps<E extends ElementType = 'button', C = void, S = void> = SpiritButtonProps<E, C, S>;
```

#### Hook Type Naming

##### Style Hooks: `use<Component>StyleProps`

**Input type:** `<Component>StyleProps`

- Contains only the props needed to compute styles
- Often a subset of component props

**Output type:** `<Component>Style` (mostly inferred)

- Contains computed classNames, inline styles, etc.
- Typically returns `{ classProps: ... }` or `{ classProps: ..., styleProps: ... }`

**Example:**

```typescript
interface ButtonStyleProps {
  color?: ButtonColor;
  size?: ButtonSize;
  isBlock?: boolean;
}

interface ButtonStyle {
  classProps: string;
}

export const useButtonStyleProps = (props: ButtonStyleProps): ButtonStyle => {
  // ...
};
```

##### State Hooks: `use<Component>State`

**Input type:** `<Component>StateProps`

- Props for initializing state (defaultValue, etc.)

**Output type:** `<Component>State` (mostly inferred)

- Current state values and updater functions

**Example:**

```typescript
interface AccordionStateProps {
  defaultOpen?: AccordionOpenStateType;
  stayOpen?: boolean;
}

interface AccordionState {
  open: AccordionOpenStateType;
  toggle: (id: string) => void;
}

export const useAccordionState = (props: AccordionStateProps): AccordionState => {
  // ...
};
```

##### Aria Hooks: `use<Component>Aria`

**Input type:** `<Component>AriaProps`

- Props needed to compute ARIA attributes

**Output type:** `<Component>Aria` (mostly inferred)

- Computed ARIA attributes

**Example:**

```typescript
interface UseButtonAriaProps {
  isDisabled?: boolean;
  isPressed?: boolean;
}

interface ButtonAria {
  'aria-disabled'?: boolean;
  'aria-pressed'?: boolean;
  role: string;
}

export const useButtonAria = (props: UseButtonAriaProps): ButtonAria => {
  // ...
};
```

## Testing

- `% cd <your-local-path>/spirit-design-system/packages/web-react`
- `% yarn test` for test package (lint, format, unit testing, types)
- `% yarn test:unit` for unit tests

## Development with Storybook

- `% yarn storybook` starts development server with Storybook
