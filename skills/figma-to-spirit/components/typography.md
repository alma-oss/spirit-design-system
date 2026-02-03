# Typography Components

Spirit typography components for consistent text rendering. These components do not exist as Figma components - you must identify them from Figma text styles and layer properties.

> **This documentation is the primary reference.** Use the API tables and examples below. Only use Context7 MCP for components not documented here.

## Quick Reference: Text Colors

| Figma Color           | Spirit textColor                                               |
| --------------------- | -------------------------------------------------------------- |
| Primary/main text     | `primary`                                                      |
| Secondary/muted text  | `secondary`                                                    |
| Tertiary/subtle text  | `tertiary`                                                     |
| Inverted (on dark bg) | `inverted`                                                     |
| Disabled text         | `disabled`                                                     |
| Accent colors         | `accent-01-basic`, `accent-01-subtle`, `accent-02-basic`, etc. |
| Emotion colors        | `success`, `warning`, `danger`, `informative`                  |

### CRITICAL: Accent Color Token Format

**Always use the FULL token name for accent colors.** Short forms like `accent-01` or `accent-02` will cause TypeScript errors.

```jsx
// WRONG - short form causes TypeScript lint error
<Heading elementType="div" size="xlarge" textColor="accent-02">
  300K+
</Heading>

// CORRECT - use full token name
<Heading elementType="div" size="xlarge" textColor="accent-02-basic" marginBottom="space-0">
  300K+
</Heading>
```

**Valid accent color tokens:**

- `accent-01-basic`, `accent-01-subtle`
- `accent-02-basic`, `accent-02-subtle`
- (and so on for other accent colors)

## Quick Reference: Size Tokens

| Size     | Typical Use                      |
| -------- | -------------------------------- |
| `xsmall` | Captions, labels, fine print     |
| `small`  | Secondary text, metadata         |
| `medium` | Body text (default)              |
| `large`  | Lead paragraphs, emphasized text |
| `xlarge` | Large headings, hero text        |

---

## Heading

Utility component for rendering consistent typographic hierarchy and semantic headings.

### When to Use

- For page titles, section titles, card titles
- When you need semantic heading structure (h1-h6)
- For any text that uses heading typography styles in Figma

### When NOT to Use

- For body text or paragraphs - use [Text](#text)
- For decorative text that looks like a heading but isn't semantically one - use Heading with `elementType="div"`
- For button or link labels - use Button or Link components

### API Reference

| Prop             | Type                                                                            | Default          | Required | Description                                        |
| ---------------- | ------------------------------------------------------------------------------- | ---------------- | -------- | -------------------------------------------------- |
| `elementType`    | `"h1"` \| `"h2"` \| `"h3"` \| `"h4"` \| `"h5"` \| `"h6"` \| `"div"` \| `"span"` | -                | **YES**  | HTML element to render                             |
| `size`           | `"xsmall"` \| `"small"` \| `"medium"` \| `"large"` \| `"xlarge"`                | `"medium"`       | No       | Visual size of the heading                         |
| `emphasis`       | `"regular"` \| `"semibold"` \| `"bold"`                                         | `"bold"`         | No       | Font weight                                        |
| `textColor`      | ColorToken                                                                      | inherited        | No       | Text color                                         |
| `textAlignment`  | `"left"` \| `"center"` \| `"right"` \| Responsive                               | -                | No       | Text alignment within element                      |
| `isTextBalanced` | boolean                                                                         | `false`          | No       | Enable balanced text wrapping (text-wrap: balance) |
| `textHyphens`    | `"none"` \| `"auto"` \| `"manual"`                                              | -                | No       | Hyphenation strategy                               |
| `textWordBreak`  | `"normal"` \| `"anywhere"` \| `"long-words"`                                    | -                | No       | Word break strategy                                |
| `marginBottom`   | SpaceToken                                                                      | (default margin) | No       | Override default bottom margin                     |

### Common Mistakes

1. **Using h1-h6 for non-heading styled text**

   ```jsx
   // WRONG - Statistics numbers are not actual headings
   <Heading elementType="h2" size="xlarge">1.2M+</Heading>
   <Heading elementType="h3">Active Users</Heading>

   // CORRECT - Use div for styled text that isn't semantically a heading
   <Heading elementType="div" size="xlarge">1.2M+</Heading>
   <Text size="small" textColor="secondary">Active Users</Text>
   ```

2. **Skipping heading levels**

   ```jsx
   // WRONG - h1 directly to h3 breaks accessibility
   <Heading elementType="h1">Page Title</Heading>
   <Heading elementType="h3">Subsection</Heading>

   // CORRECT - maintain hierarchy
   <Heading elementType="h1">Page Title</Heading>
   <Heading elementType="h2">Section</Heading>
   <Heading elementType="h3">Subsection</Heading>
   ```

#### Forgetting MarginBottom="space-0" on Non-Last-Child Elements in Layout Components

**CRITICAL**: Only add `marginBottom="space-0"` to elements that have siblings AFTER them. Last-child elements don't need it since there's nothing after them that would be affected by the margin.

```jsx
// WRONG - default margin on non-last element interferes with Flex spacing
<Flex direction="vertical" spacing="space-800">
  <Heading elementType="h2">Title</Heading>
  <Text>Description</Text>
</Flex>

// ALSO WRONG - adding marginBottom to last-child unnecessarily
<Flex direction="vertical" spacing="space-800" alignmentX="left">
  <Heading elementType="h2" marginBottom="space-0">Title</Heading>
  <Text marginBottom="space-0">Description</Text>  {/* Not needed - last child */}
</Flex>

// CORRECT - only non-last-child gets marginBottom="space-0"
<Flex direction="vertical" spacing="space-800" alignmentX="left">
  <Heading elementType="h2" marginBottom="space-0">Title</Heading>
  <Text>Description</Text>  {/* Last child - no marginBottom needed */}
</Flex>
```

4. **Not setting elementType**

   ```jsx
   // WRONG - elementType is required
   <Heading size="large">Title</Heading>

   // CORRECT
   <Heading elementType="h1" size="large">Title</Heading>
   ```

5. **Confusing visual size with semantic level**

   ```jsx
   // The size prop controls visual appearance
   // The elementType controls semantic meaning

   // A visually small h2 is valid if it's structurally correct
   <Heading elementType="h2" size="small">Sidebar Title</Heading>

   // A visually large div is valid for decorative text
   <Heading elementType="div" size="xlarge">Big Number</Heading>
   ```

6. **Using short-form accent color names**

   ```jsx
   // WRONG - short form "accent-02" causes TypeScript lint errors
   <Heading elementType="div" size="xlarge" textColor="accent-02">
     300K+
   </Heading>

   // CORRECT - use full token name "accent-02-basic"
   <Heading elementType="div" size="xlarge" textColor="accent-02-basic" marginBottom="space-0">
     300K+
   </Heading>
   ```

### Figma Mapping

- **Figma text style "Heading/..."** → Use `Heading` component
- **Figma layer named with heading indicators** → Check if semantically a heading
- **Figma font-weight** → Map to `emphasis` prop:
  - 400 → `"regular"`
  - 600 → `"semibold"`
  - 700+ → `"bold"`
- **Figma text-align** → Map to `textAlignment` prop

### Examples

```jsx
// Page title
<Heading elementType="h1" size="xlarge">
  Welcome to Our Platform
</Heading>

// Section title
<Heading elementType="h2" size="large" marginBottom="space-0">
  Features
</Heading>

// Card title
<Heading elementType="h3" size="medium" marginBottom="space-0">
  Card Title
</Heading>

// Decorative large text (not a semantic heading)
<Heading elementType="div" size="xlarge" textColor="primary">
  99.9%
</Heading>

// Centered heading with secondary color
<Heading
  elementType="h2"
  size="large"
  textAlignment="center"
  textColor="secondary"
  marginBottom="space-0"
>
  Centered Section Title
</Heading>

// Responsive text alignment
<Heading
  elementType="h1"
  size="xlarge"
  textAlignment={{ mobile: "center", tablet: "left" }}
>
  Responsive Title
</Heading>

// Balanced wrapping for better visual appearance
<Heading elementType="h1" size="xlarge" isTextBalanced>
  A Long Heading That Will Wrap Nicely Across Multiple Lines
</Heading>
```

---

## Text

Utility component for rendering consistent typography for body content and inline text.

### When to Use

- For paragraphs, body copy, descriptions
- For inline text elements (spans, labels, captions)
- For any text that uses body typography styles in Figma

### When NOT to Use

- For titles or section headers - use [Heading](#heading)
- For button or link labels - use Button or Link components
- For form labels - use the label prop on form components

### API Reference

| Prop             | Type                                                              | Default          | Required | Description                                       |
| ---------------- | ----------------------------------------------------------------- | ---------------- | -------- | ------------------------------------------------- |
| `elementType`    | `"p"` \| `"span"` \| `"small"` \| `"strong"` \| `"em"` \| `"div"` | `"p"`            | No       | HTML element to render                            |
| `size`           | `"xsmall"` \| `"small"` \| `"medium"` \| `"large"` \| `"xlarge"`  | `"medium"`       | No       | Visual size of the text                           |
| `emphasis`       | `"regular"` \| `"semibold"` \| `"bold"`                           | `"regular"`      | No       | Font weight                                       |
| `textColor`      | ColorToken                                                        | inherited        | No       | Text color                                        |
| `textAlignment`  | `"left"` \| `"center"` \| `"right"` \| Responsive                 | -                | No       | Text alignment within element                     |
| `isTextBalanced` | boolean                                                           | `false`          | No       | Enable improved text wrapping (text-wrap: pretty) |
| `textHyphens`    | `"none"` \| `"auto"` \| `"manual"`                                | -                | No       | Hyphenation strategy                              |
| `textWordBreak`  | `"normal"` \| `"anywhere"` \| `"long-words"`                      | -                | No       | Word break strategy                               |
| `marginBottom`   | SpaceToken                                                        | (default margin) | No       | Override default bottom margin                    |

### Common Mistakes

1. **Forgetting marginBottom="space-0" in layout components**

   ```jsx
   // WRONG - default margin interferes with Flex/Stack spacing
   <Flex direction="vertical" spacing="space-600" alignmentX="left">
     <Text>First paragraph</Text>
     <Text>Second paragraph</Text>
   </Flex>

   // CORRECT - remove default margin
   <Flex direction="vertical" spacing="space-600" alignmentX="left">
     <Text marginBottom="space-0">First paragraph</Text>
     <Text marginBottom="space-0">Second paragraph</Text>
   </Flex>
   ```

2. **Using textAlignment when parent alignment is better**

   ```jsx
   // LESS IDEAL - each Text has textAlignment
   <Flex direction="vertical" alignmentX="left">
     <Text textAlignment="center" marginBottom="space-0">Line 1</Text>
     <Text textAlignment="center" marginBottom="space-0">Line 2</Text>
   </Flex>

   // BETTER - use Section or container textAlignment
   <Section textAlignment="center">
     <Flex direction="vertical" alignmentX="left" spacing="space-600">
       <Text marginBottom="space-0">Line 1</Text>
       <Text marginBottom="space-0">Line 2</Text>
     </Flex>
   </Section>
   ```

3. **Using wrong elementType for semantic meaning**

   ```jsx
   // WRONG - using <p> for inline text
   <Flex direction="horizontal" alignmentY="center">
     <Icon name="info" />
     <Text>Helper text</Text>  {/* <p> creates block-level element */}
   </Flex>

   // CORRECT - use span for inline text
   <Flex direction="horizontal" alignmentY="center" spacing="space-400">
     <Icon name="info" />
     <Text elementType="span">Helper text</Text>
   </Flex>
   ```

### Figma Mapping

- **Figma text style "Body/..."** → Use `Text` component
- **Figma text style "Caption/..."** → Use `Text` with `size="small"` or `size="xsmall"`
- **Figma font-weight** → Map to `emphasis` prop:
  - 400 → `"regular"` (default)
  - 600 → `"semibold"`
  - 700+ → `"bold"`
- **Figma text color** → Map to `textColor` prop:
  - Main text color → `"primary"` or omit (inherited)
  - Muted/gray text → `"secondary"`
  - Very light text → `"tertiary"`

### Examples

```jsx
// Basic paragraph
<Text>
  This is a paragraph of body text.
</Text>

// Secondary text (muted)
<Text textColor="secondary" size="small">
  Last updated 2 hours ago
</Text>

// Inline text element
<Text elementType="span" emphasis="semibold">
  Important note
</Text>

// Caption text
<Text size="xsmall" textColor="tertiary">
  * Terms and conditions apply
</Text>

// Text inside Flex (with margin reset)
<Flex direction="vertical" spacing="space-600" alignmentX="left">
  <Heading elementType="h2" size="large" marginBottom="space-0">
    Section Title
  </Heading>
  <Text marginBottom="space-0">
    Description paragraph that explains the section content.
  </Text>
  <Text textColor="secondary" size="small" marginBottom="space-0">
    Additional details or metadata.
  </Text>
</Flex>

// Responsive text alignment
<Text textAlignment={{ mobile: "center", tablet: "left" }}>
  This text is centered on mobile, left-aligned on tablet+
</Text>

// Balanced wrapping for better readability
<Text isTextBalanced>
  A paragraph of text that will wrap with improved line distribution
  for better visual appearance.
</Text>
```

---

## Typography in Layout Components

### Critical: Default Margins

Both `Heading` and `Text` components render elements (`h1-h6`, `p`) that have **default bottom margins** in Spirit CSS. This interferes with layout component spacing.

**Rule**: When using `Heading` or `Text` inside `Flex`, `Grid`, or `Stack` with a `spacing` prop, always add `marginBottom="space-0"` to remove the default margin.

```jsx
// Pattern: Typography inside layout
<Flex direction="vertical" spacing="space-800" alignmentX="left">
  <Heading elementType="h2" marginBottom="space-0">
    Title
  </Heading>
  <Text marginBottom="space-0">First paragraph</Text>
  <Text marginBottom="space-0">Second paragraph</Text>
</Flex>
```

### Typography Decision Tree

```text
Is the text a title or section header?
├── YES → Is it semantically a heading in the document structure?
│   ├── YES → Use Heading with appropriate h1-h6
│   └── NO → Use Heading with elementType="div" or "span"
│
└── NO → Is it body text or description?
    ├── Block-level (paragraph) → Use Text (default elementType="p")
    └── Inline (within a line) → Use Text with elementType="span"
```

### Common Typography Patterns

```jsx
// Hero section
<Section size="xlarge" textAlignment="center">
  <Flex direction="vertical" spacing="space-800" alignmentX="center">
    <Heading elementType="h1" size="xlarge" marginBottom="space-0">
      Main Headline
    </Heading>
    <Text size="large" textColor="secondary" marginBottom="space-0">
      Subheadline or description text that supports the main headline.
    </Text>
    <Button>Get Started</Button>
  </Flex>
</Section>

// Card with title and description
<Card>
  <CardBody>
    <Heading elementType="h3" size="medium" marginBottom="space-0">
      Card Title
    </Heading>
    <Text textColor="secondary" marginBottom="space-0">
      Card description text explaining the content.
    </Text>
  </CardBody>
</Card>

// Stats display (not semantic headings) - with accent color
<Grid cols={3} spacing="space-800" alignmentX="stretch">
  <Box
    elementType={Flex}
    backgroundColor="accent-02-subtle"
    borderRadius="400"
    padding="space-900"
    direction="vertical"
    spacing="space-500"
    alignmentX="center"
  >
    <Heading elementType="div" size="xlarge" textColor="accent-02-basic" marginBottom="space-0">
      1.2M+
    </Heading>
    <Text size="large" marginBottom="space-0">Active Users</Text>
  </Box>
  {/* Repeat for other stat cards */}
</Grid>
```
