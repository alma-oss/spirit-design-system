# Layout Components

Spirit layout components for structuring page content. These components do not exist in Figma - you must choose the correct one based on analyzing the Figma autolayout properties.

> **This documentation is the primary reference.** Use the API tables and examples below. Only use Context7 MCP for components not documented here.

## Quick Reference: Alignment Value Mapping

When converting Figma CSS values to Spirit props:

| CSS Value       | Spirit alignmentX | Spirit alignmentY |
| --------------- | ----------------- | ----------------- |
| `flex-start`    | `left`            | `top`             |
| `center`        | `center`          | `center`          |
| `flex-end`      | `right`           | `bottom`          |
| `stretch`       | `stretch`         | `stretch`         |
| `space-between` | `space-between`   | -                 |
| `baseline`      | -                 | `baseline`        |

## Quick Reference: Space Tokens

Always use full token names:

| Token                       | Typical Use                            |
| --------------------------- | -------------------------------------- |
| `space-100` - `space-300`   | Tight spacing (icons, inline elements) |
| `space-400` - `space-600`   | Small spacing (within components)      |
| `space-700` - `space-900`   | Medium spacing (between components)    |
| `space-1000` - `space-1200` | Large spacing (section padding)        |
| `space-1300` - `space-1600` | Extra large spacing (page sections)    |

Responsive format: `{ mobile: "space-400", tablet: "space-800", desktop: "space-1200" }`

---

## Flex

Single-axis alignment and distribution utility for arranging elements horizontally or vertically.

### When to Use

- For horizontal or vertical stacking with precise alignment control
- When you need responsive direction changes (horizontal on desktop, vertical on mobile)
- For distributing space between items (e.g., pushing elements to opposite ends)
- For inline groupings (buttons, icons with labels)

### When NOT to Use

- For multi-column grid layouts - use [Grid](#grid)
- For vertical lists with dividers - use [Stack](#stack)
- For semantic grouping of actions (buttons, links) - use ActionGroup

### API Reference

| Prop          | Type                                                                                  | Default        | Description                                                    |
| ------------- | ------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------- |
| `direction`   | `"horizontal"` \| `"vertical"` \| Responsive                                          | `"horizontal"` | Direction of items. **DO NOT use `row`/`column` - deprecated** |
| `alignmentX`  | `"left"` \| `"center"` \| `"right"` \| `"stretch"` \| `"space-between"` \| Responsive | `"stretch"`    | Horizontal alignment                                           |
| `alignmentY`  | `"top"` \| `"center"` \| `"bottom"` \| `"stretch"` \| `"baseline"` \| Responsive      | `"stretch"`    | Vertical alignment                                             |
| `spacing`     | SpaceToken \| Responsive                                                              | -              | Spacing between items in both directions                       |
| `spacingX`    | SpaceToken \| Responsive                                                              | -              | Horizontal spacing between items                               |
| `spacingY`    | SpaceToken \| Responsive                                                              | -              | Vertical spacing between items                                 |
| `isWrapping`  | boolean \| Responsive                                                                 | `false`        | Whether items wrap to next line                                |
| `elementType` | ElementType                                                                           | `"div"`        | HTML element to render                                         |

### Common Mistakes

1. **Using deprecated direction values**

   ```jsx
   // WRONG - deprecated
   <Flex direction="row" />
   <Flex direction="column" />

   // CORRECT
   <Flex direction="horizontal" />
   <Flex direction="vertical" />
   ```

#### Not Setting AlignmentX Correctly Based on Figma Children Width

Check if Figma children have `w-full` (full width) before choosing alignment:

```jsx
// WRONG - no alignmentX, children stretch unexpectedly
<Flex direction="vertical" spacing="space-800">
  <Button>Click me</Button>
</Flex>

// CORRECT - children do NOT have w-full, use left
<Flex direction="vertical" spacing="space-800" alignmentX="left">
  <Button>Click me</Button>
</Flex>

// CORRECT - children HAVE w-full in Figma, use stretch
<Flex direction="vertical" spacing="space-800" alignmentX="stretch">
  <Box backgroundColor="primary">Full width box</Box>
</Flex>
```

#### Using AlignmentX="left" When Figma Children Have W-Full

When Figma shows children with `w-full` or `shrink-0 w-full`, parent must use `alignmentX="stretch"`:

```jsx
// WRONG - alignmentX="left" prevents children from filling width
<Flex direction="vertical" spacing="space-1000" alignmentX="left">
  <Box UNSAFE_style={{ maxWidth: "800px" }}>...</Box>  {/* Won't stretch */}
  <Grid cols={4}>...</Grid>  {/* Won't fill width */}
</Flex>

// CORRECT - alignmentX="stretch" lets children fill width
<Flex direction="vertical" spacing="space-1000" alignmentX="stretch">
  <Box UNSAFE_style={{ maxWidth: "800px" }}>...</Box>  {/* Stretches to 800px */}
  <Grid cols={4}>...</Grid>  {/* Fills container */}
</Flex>
```

4. **Using CSS values instead of Spirit values**

   ```jsx
   // WRONG
   <Flex alignmentX="flex-start" alignmentY="flex-end" />

   // CORRECT
   <Flex alignmentX="left" alignmentY="bottom" />
   ```

5. **Using numeric spacing instead of tokens**

   ```jsx
   // WRONG
   <Flex spacing={800} />
   <Flex spacing="800" />

   // CORRECT
   <Flex spacing="space-800" />
   ```

#### Missing Padding When Figma Shows It on the Layer

Always check Figma for padding values (`pr`, `pl`, `pt`, `pb`, `px`, `py`). When a Flex needs padding, use `Flex elementType={Box}`:

```jsx
// WRONG - Figma shows pr-[var(--global/spacing/space-1000,32px)] but no padding applied
<Flex direction="vertical" spacing="space-800" alignmentX="left">
  <Heading elementType="h2" marginBottom="space-0">Title</Heading>
</Flex>

// CORRECT - use Flex elementType={Box} to add padding
<Flex
  elementType={Box}
  direction="vertical"
  spacing="space-800"
  paddingRight="space-1000"
  alignmentX="left"
>
  <Heading elementType="h2" marginBottom="space-0">Title</Heading>
</Flex>
```

### Figma Mapping

For **vertical** Flex (`direction="vertical"`):

- Figma `align-items` (horizontal axis) → `alignmentX`
- Figma `justify-content` (vertical axis) → `alignmentY`
- Figma "fill" width on children → use `alignmentX="stretch"` on parent

For **horizontal** Flex (`direction="horizontal"`):

- Figma `justify-content` (horizontal axis) → `alignmentX`
- Figma `align-items` (vertical axis) → `alignmentY`
- Figma "fill" height on children → use `alignmentY="stretch"` on parent

### Examples

```jsx
// Horizontal layout with items centered vertically
<Flex direction="horizontal" alignmentY="center" spacing="space-600">
  <Icon name="info" />
  <Text>Label text</Text>
</Flex>

// Vertical layout with left alignment
<Flex direction="vertical" alignmentX="left" spacing="space-800">
  <Heading elementType="h2" marginBottom="space-0">Title</Heading>
  <Text marginBottom="space-0">Description text</Text>
</Flex>

// Responsive direction
<Flex
  direction={{ mobile: "vertical", tablet: "horizontal" }}
  spacing={{ mobile: "space-600", tablet: "space-800" }}
  alignmentX={{ mobile: "stretch", tablet: "left" }}
>
  {/* Items */}
</Flex>

// Space between items (push to opposite ends)
<Flex direction="horizontal" alignmentX="space-between" alignmentY="center">
  <Logo />
  <Navigation />
</Flex>
```

---

## Grid

Responsive multi-column layout utility for arranging content into structured columns.

### When to Use

- For repeatable units (product cards, image galleries, stat cards, dashboards)
- When you need multi-column layouts with consistent spacing
- For responsive layouts that adapt column count across breakpoints

### When NOT to Use

- For single-row or inline alignment - use [Flex](#flex)
- For simple vertical spacing - use [Stack](#stack)
- For semantic grouping of actions - use ActionGroup

### API Reference

| Prop          | Type                                                             | Default     | Description                   |
| ------------- | ---------------------------------------------------------------- | ----------- | ----------------------------- |
| `cols`        | `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `12` \| Responsive     | -           | Number of columns             |
| `alignmentX`  | `"left"` \| `"center"` \| `"right"` \| `"stretch"` \| Responsive | `"stretch"` | Horizontal alignment of items |
| `alignmentY`  | `"top"` \| `"center"` \| `"bottom"` \| `"stretch"` \| Responsive | `"stretch"` | Vertical alignment of items   |
| `spacing`     | SpaceToken \| Responsive                                         | -           | Spacing between items         |
| `spacingX`    | SpaceToken \| Responsive                                         | -           | Horizontal spacing            |
| `spacingY`    | SpaceToken \| Responsive                                         | -           | Vertical spacing              |
| `elementType` | ElementType                                                      | `"div"`     | HTML element to render        |

### GridItem API

Use `GridItem` for custom column/row spanning:

| Prop          | Type                               | Default | Description            |
| ------------- | ---------------------------------- | ------- | ---------------------- |
| `columnStart` | number \| `"span N"` \| Responsive | -       | Column start position  |
| `columnEnd`   | number \| `"span N"` \| Responsive | -       | Column end position    |
| `rowStart`    | number \| `"span N"` \| Responsive | -       | Row start position     |
| `rowEnd`      | number \| `"span N"` \| Responsive | -       | Row end position       |
| `elementType` | ElementType                        | `"div"` | HTML element to render |

### Common Mistakes

1. **Nesting Flex rows inside Grid**

   ```jsx
   // WRONG - Grid handles rows automatically
   <Grid cols={2}>
     <Flex direction="horizontal">
       <Card>Item 1</Card>
       <Card>Item 2</Card>
     </Flex>
     <Flex direction="horizontal">
       <Card>Item 3</Card>
       <Card>Item 4</Card>
     </Flex>
   </Grid>

   // CORRECT - just add items, Grid wraps them
   <Grid cols={2} spacing="space-800">
     <Card>Item 1</Card>
     <Card>Item 2</Card>
     <Card>Item 3</Card>
     <Card>Item 4</Card>
   </Grid>
   ```

2. **Not setting alignmentX="stretch" for fill-width items**

   ```jsx
   // WRONG - items may not fill grid cells
   <Grid cols={3}>
     <Box backgroundColor="primary">Box 1</Box>
     <Box backgroundColor="primary">Box 2</Box>
     <Box backgroundColor="primary">Box 3</Box>
   </Grid>

   // CORRECT - items fill their grid cells
   <Grid cols={3} alignmentX="stretch" spacing="space-800">
     <Box backgroundColor="primary">Box 1</Box>
     <Box backgroundColor="primary">Box 2</Box>
     <Box backgroundColor="primary">Box 3</Box>
   </Grid>
   ```

3. **Using Grid for max-width centered content**

   ```jsx
   // WRONG - Grid doesn't control container width
   <Grid cols={1} alignmentX="center">
     <Box>Centered content</Box>
   </Grid>

   // CORRECT - use Section with containerProps
   <Section containerProps={{ size: "medium" }}>
     <Box>Centered content with max-width</Box>
   </Section>
   ```

### Examples

```jsx
// Basic 3-column grid
<Grid cols={3} spacing="space-800" alignmentX="stretch" alignmentY="top">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Grid>

// Responsive grid - 1 col mobile, 2 tablet, 4 desktop
<Grid
  cols={{ mobile: 1, tablet: 2, desktop: 4 }}
  spacing={{ mobile: "space-600", tablet: "space-800" }}
  alignmentX="stretch"
>
  {cards.map(card => <Card key={card.id} />)}
</Grid>

// Custom grid with spanning items
<Grid cols={12} spacing="space-800">
  <GridItem columnStart="span 8">
    <Box>Main content (8 cols)</Box>
  </GridItem>
  <GridItem columnStart="span 4">
    <Box>Sidebar (4 cols)</Box>
  </GridItem>
</Grid>
```

---

## Stack

Vertical flow utility with consistent spacing and optional dividers.

### When to Use

- For vertical lists with dividers between items
- For form fields in a vertical layout
- When you need simple vertical spacing without alignment control

### When NOT to Use

- For horizontal layouts - use [Flex](#flex)
- For multi-column layouts - use [Grid](#grid)
- When you need alignment control - use [Flex](#flex) with `direction="vertical"`

### API Reference

| Prop                      | Type                     | Default | Description                      |
| ------------------------- | ------------------------ | ------- | -------------------------------- |
| `spacing`                 | SpaceToken \| Responsive | -       | Custom spacing between items     |
| `hasSpacing`              | boolean                  | `false` | Apply default spacing            |
| `hasIntermediateDividers` | boolean                  | `false` | Render dividers between items    |
| `hasStartDivider`         | boolean                  | `false` | Render divider before first item |
| `hasEndDivider`           | boolean                  | `false` | Render divider after last item   |
| `elementType`             | ElementType              | `"div"` | HTML element to render           |

### StackItem API

**Required when using dividers.** Wrap each item in `StackItem`.

| Prop          | Type        | Default | Description            |
| ------------- | ----------- | ------- | ---------------------- |
| `elementType` | ElementType | `"div"` | HTML element to render |

### Examples

```jsx
// Simple stack with spacing
<Stack spacing="space-800">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</Stack>

// Stack with dividers (requires StackItem)
<Stack hasIntermediateDividers>
  <StackItem>
    <Text>Item 1</Text>
  </StackItem>
  <StackItem>
    <Text>Item 2</Text>
  </StackItem>
  <StackItem>
    <Text>Item 3</Text>
  </StackItem>
</Stack>

// Form fields stack
<Stack spacing="space-600">
  <TextField label="Name" />
  <TextField label="Email" />
  <TextArea label="Message" />
</Stack>
```

---

## Box

Neutral container for visual styling (background, border, padding) without layout capabilities.

### When to Use

- To apply background color, border, or padding to content
- For visual separation or highlighting of content blocks
- When you need styling but no layout control

### When NOT to Use

- When you need spacing between child items - use layout components
- When you need alignment control - use [Flex](#flex) or [Grid](#grid)
- For semantic grouping - use semantic HTML elements

### API Reference

| Prop                 | Type                                  | Default   | Description                                                                                                           |
| -------------------- | ------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| `backgroundColor`    | ColorToken \| Responsive              | -         | Background color (`primary`, `secondary`, `tertiary`, `accent-01-subtle`, `accent-02-subtle`, `neutral-subtle`, etc.) |
| `backgroundGradient` | GradientToken                         | -         | Background gradient                                                                                                   |
| `borderColor`        | ColorToken                            | -         | Border color (`basic`, `focus`, accent colors, etc.)                                                                  |
| `borderWidth`        | `"100"` \| `"200"`                    | -         | Border width (100 = 1px, 200 = 2px)                                                                                   |
| `borderRadius`       | RadiusToken \| Responsive             | -         | Border radius (`100`, `200`, `300`, `400`, `500`, `full`)                                                             |
| `borderStyle`        | `"solid"` \| `"dashed"` \| `"dotted"` | `"solid"` | Border style                                                                                                          |
| `padding`            | SpaceToken \| Responsive              | -         | Padding on all sides                                                                                                  |
| `paddingX`           | SpaceToken \| Responsive              | -         | Horizontal padding                                                                                                    |
| `paddingY`           | SpaceToken \| Responsive              | -         | Vertical padding                                                                                                      |
| `paddingTop`         | SpaceToken \| Responsive              | -         | Top padding                                                                                                           |
| `paddingRight`       | SpaceToken \| Responsive              | -         | Right padding                                                                                                         |
| `paddingBottom`      | SpaceToken \| Responsive              | -         | Bottom padding                                                                                                        |
| `paddingLeft`        | SpaceToken \| Responsive              | -         | Left padding                                                                                                          |
| `textColor`          | ColorToken                            | -         | Text color for all content inside                                                                                     |
| `elementType`        | ElementType                           | `"div"`   | HTML element or component to render                                                                                   |

### Common Mistakes

1. **Using UNSAFE_style for width**

   ```jsx
   // WRONG
   <Box UNSAFE_style={{ width: "100%" }}>Content</Box>

   // CORRECT - set alignmentX="stretch" on parent Flex/Grid
   <Flex alignmentX="stretch">
     <Box backgroundColor="primary">Content</Box>
   </Flex>
   ```

2. **Not using elementType={Flex} when layout is needed**

   ```jsx
   // WRONG - no spacing control
   <Box backgroundColor="primary" padding="space-800">
     <Heading>Title</Heading>
     <Text>Description</Text>
   </Box>

   // CORRECT - combined styling + layout
   <Box
     elementType={Flex}
     backgroundColor="primary"
     padding="space-800"
     direction="vertical"
     spacing="space-600"
     alignmentX="left"
   >
     <Heading elementType="h2" marginBottom="space-0">Title</Heading>
     <Text marginBottom="space-0">Description</Text>
   </Box>
   ```

3. **Guessing color tokens**

   ```jsx
   // WRONG - always read exact token from Figma
   <Box backgroundColor="accent-subtle" />

   // CORRECT - use exact token from Figma layer properties
   <Box backgroundColor="accent-01-subtle" />
   // or
   <Box backgroundColor="accent-02-subtle" />
   ```

#### Missing Padding From Figma Layer

Always check Figma for padding values (pr, pl, pt, pb, px, py):

```jsx
// WRONG - Figma shows pr-[var(--global/spacing/space-1000,32px)] but padding is missing
<Flex direction="horizontal" spacing="space-800">
  <Flex direction="vertical" alignmentX="left">  {/* Missing paddingRight! */}
    <Heading elementType="h2" marginBottom="space-0">Title</Heading>
    <Text marginBottom="space-0">Description</Text>
  </Flex>
  <Box>Other content</Box>
</Flex>

// CORRECT - apply padding using Flex elementType={Box} pattern
<Flex direction="horizontal" spacing="space-800">
  <Flex
    elementType={Box}
    direction="vertical"
    paddingRight="space-1000"
    alignmentX="left"
  >
    <Heading elementType="h2" marginBottom="space-0">Title</Heading>
    <Text marginBottom="space-0">Description</Text>
  </Flex>
  <Box>Other content</Box>
</Flex>
```

### Box + Flex Pattern

When Figma shows an autolayout with both styling (background, border, padding) AND layout needs (spacing, alignment):

```jsx
<Box
  elementType={Flex}
  backgroundColor="accent-02-subtle"
  padding="space-900"
  borderRadius="300"
  direction="vertical"
  spacing="space-800"
  alignmentX="center"
>
  <Heading elementType="h2" marginBottom="space-0">
    Title
  </Heading>
  <Text marginBottom="space-0">Description</Text>
  <Button>Action</Button>
</Box>
```

### Flex + Box Pattern (Reverse)

When you need to add padding to a Flex component:

```jsx
<Flex elementType={Box} direction="vertical" spacing="space-800" padding="space-900" alignmentX="left">
  {/* Content */}
</Flex>
```

### CRITICAL: Extracting Padding From Figma

**Always check Figma layers for padding values.** Padding appears in Figma as:

- `pr-[var(--global/spacing/space-1000,32px)]` → `paddingRight="space-1000"`
- `pl-[var(--global/spacing/space-800,24px)]` → `paddingLeft="space-800"`
- `pt-[var(--global/spacing/space-600,16px)]` → `paddingTop="space-600"`
- `pb-[var(--global/spacing/space-600,16px)]` → `paddingBottom="space-600"`
- `px-[var(--global/spacing/space-800,24px)]` → `paddingX="space-800"`
- `py-[var(--global/spacing/space-600,16px)]` → `paddingY="space-600"`

#### When Figma Shows Padding on an Autolayout (Flex) Container

Use `Flex elementType={Box}` to combine layout with padding:

```jsx
// Figma shows: autolayout with pr-[var(--global/spacing/space-1000,32px)]
<Flex elementType={Box} direction="vertical" spacing="space-800" paddingRight="space-1000" alignmentX="left">
  <Heading elementType="h2" marginBottom="space-0">
    Title
  </Heading>
  <Text marginBottom="space-0">Description</Text>
</Flex>
```

---

## Section

Semantic content block for main page sections with optional background styling.

### When to Use

- To divide pages into distinct horizontal sections
- When sections need different background colors
- For consistent vertical padding between page areas
- Figma layer named "Design Block" or similar

### When NOT to Use

- For small content groupings - use [Box](#box) or Card
- For inline separation - use Divider
- For overlays - use Modal, Drawer, or Dropdown

### API Reference

| Prop              | Type                                                             | Default     | Description                              |
| ----------------- | ---------------------------------------------------------------- | ----------- | ---------------------------------------- |
| `size`            | `"xsmall"` \| `"small"` \| `"medium"` \| `"large"` \| `"xlarge"` | -           | Preset vertical padding                  |
| `backgroundColor` | ColorToken                                                       | -           | Section background color                 |
| `paddingY`        | SpaceToken \| Responsive                                         | -           | Custom vertical padding (overrides size) |
| `paddingTop`      | SpaceToken \| Responsive                                         | -           | Custom top padding                       |
| `paddingBottom`   | SpaceToken \| Responsive                                         | -           | Custom bottom padding                    |
| `hasContainer`    | boolean                                                          | `true`      | Whether to render inner Container        |
| `containerProps`  | ContainerProps                                                   | -           | Props for inner Container                |
| `textAlignment`   | `"left"` \| `"center"` \| `"right"` \| Responsive                | -           | Text alignment                           |
| `elementType`     | ElementType                                                      | `"section"` | HTML element to render                   |

### Size Padding Values

| Size     | Mobile paddingY | Tablet/Desktop paddingY |
| -------- | --------------- | ----------------------- |
| `xsmall` | `space-900`     | `space-1000`            |
| `small`  | `space-1000`    | `space-1100`            |
| `medium` | `space-1100`    | `space-1300`            |
| `large`  | `space-1200`    | `space-1400`            |
| `xlarge` | `space-1400`    | `space-1600`            |

### Common Mistakes

1. **Nesting Container inside Section**

   ```jsx
   // WRONG - Section already includes Container
   <Section>
     <Container>
       <Content />
     </Container>
   </Section>

   // CORRECT
   <Section>
     <Content />
   </Section>
   ```

2. **Not using containerProps for Container sizing**

   ```jsx
   // WRONG
   <Section>
     <Container size="medium">
       <Content />
     </Container>
   </Section>

   // CORRECT
   <Section containerProps={{ size: "medium" }}>
     <Content />
   </Section>
   ```

### Examples

```jsx
// Basic section with background
<Section backgroundColor="secondary" size="large">
  <Heading elementType="h2">Section Title</Heading>
  <Text>Section content</Text>
</Section>

// Section with constrained content width
<Section
  size="xlarge"
  containerProps={{ size: "medium" }}
  textAlignment="center"
>
  <Heading elementType="h1">Hero Title</Heading>
  <Text>Centered content with max-width</Text>
</Section>

// Section without Container (full-width content)
<Section hasContainer={false} backgroundColor="primary">
  <FullWidthComponent />
</Section>
```

---

## Container

Responsive content wrapper that centers content and constrains width.

### When to Use

- **Usually via Section's `containerProps`** - rarely used directly
- When you need an independent container without Section semantics
- For constraining content width in custom layouts

### When NOT to Use

- Inside Section - use `containerProps` instead
- For semantic grouping - use [Section](#section)
- For visual styling - use [Box](#box)

### API Reference

| Prop            | Type                                              | Default    | Description                               |
| --------------- | ------------------------------------------------- | ---------- | ----------------------------------------- |
| `size`          | ContainerSizesType                                | `"xlarge"` | Max-width constraint (smaller = narrower) |
| `isFluid`       | boolean                                           | `false`    | Full-width container                      |
| `textAlignment` | `"left"` \| `"center"` \| `"right"` \| Responsive | -          | Text alignment                            |

### Examples

```jsx
// Usually accessed via Section
<Section containerProps={{ size: "large" }}>
  {/* Content constrained to "large" width */}
</Section>

// Direct usage (rare)
<Container size="medium">
  <Content />
</Container>
```

---

## Layout Decision Tree

```text
Is it a main page section with background?
├── YES → Use Section
│   └── Need to constrain width? → Use containerProps={{ size: "..." }}
│
└── NO → What's the layout pattern?
    │
    ├── Uniform repeatable items (cards, stats)?
    │   └── Use Grid with cols prop
    │
    ├── Single row or column of items?
    │   └── Use Flex
    │       ├── Horizontal → direction="horizontal"
    │       └── Vertical → direction="vertical"
    │
    ├── Vertical list with dividers?
    │   └── Use Stack with hasIntermediateDividers
    │
    └── Just need styling (background, border, padding)?
        └── Use Box
            └── Also need layout? → Use Box elementType={Flex}
```

---

## Handling Max-Width Constraints

When Figma shows a `max-width` on a layer, choose the approach based on what the layer contains:

### Option 1: Section ContainerProps (Preferred for Page Sections)

Use when the max-width applies to a main content area inside a Section:

```jsx
<Section size="xlarge" containerProps={{ size: 'medium' }}>
  {/* Content constrained to medium width, centered */}
</Section>
```

### Option 2: UNSAFE_style MaxWidth (Last Resort for Specific Content Blocks)

Use `UNSAFE_style={{ maxWidth: "Xpx" }}` **only when**:

1. The max-width is on a specific content block, NOT the main container
2. The max-width value doesn't match any Container size preset
3. The content block should NOT be centered (unlike Container behavior)

**CRITICAL**: Apply UNSAFE_style to the INNERMOST wrapper that contains only the content needing the constraint:

```jsx
// WRONG - maxWidth on outer wrapper affects stats grid too
<Flex
  direction="vertical"
  spacing="space-1000"
  UNSAFE_style={{ maxWidth: "800px" }}  // ❌ Affects everything inside
>
  <HeadingContent />
  <StatsGrid />  {/* This shouldn't have max-width! */}
</Flex>

// CORRECT - maxWidth only on heading content wrapper
<Flex direction="vertical" spacing="space-1000" alignmentX="left">
  <Box UNSAFE_style={{ maxWidth: "800px" }}>  {/* ✓ Only affects heading */}
    <Flex direction="vertical" spacing="space-700" alignmentX="left">
      <Tag />
      <Heading />
      <Text />
      <ActionGroup />
    </Flex>
  </Box>
  <StatsGrid />  {/* Full width, no constraint */}
</Flex>
```

### Figma Max-Width Analysis

When you see `max-width` in Figma:

1. **Identify WHAT has the max-width** - Is it the whole section content or just one part?
2. **Check if it matches Container sizes** - If yes, use `containerProps`
3. **Check if it should center content** - Container centers, UNSAFE_style doesn't
4. **Apply to the correct wrapper** - Only the content that needs the constraint
