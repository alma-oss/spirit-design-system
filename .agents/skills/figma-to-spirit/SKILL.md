---
name: figma-to-spirit
description: Convert Figma designs to React code using Spirit Web components. Use when working with Figma designs, implementing UI from Figma files, converting Figma autolayouts to code, or when the user mentions Figma, Spirit components, or design-to-code conversion.
---

# Figma to Spirit Component Conversion

## Component Documentation

For detailed API references, examples, and common mistakes:

- **[Layout Components](components/layout.md)** - Flex, Grid, Stack, Box, Section, Container
- **[Typography Components](components/typography.md)** - Heading, Text
- **[Card Components](components/cards.md)** - Card, CardLink, CardTitle, CardDescription

## Core Principles

1. **ALWAYS use Spirit Web React components** - Never create custom components or use raw HTML/CSS when a Spirit component exists
2. **NEVER use inline CSS** - Use component props and styling props instead. Only use `UNSAFE_style` or `UNSAFE_className` as a last resort
3. **Use this skill's documentation as the primary reference**:
   - Check [Layout Components](components/layout.md) for Flex, Grid, Stack, Box, Section, Container
   - Check [Typography Components](components/typography.md) for Heading, Text
   - These docs contain API references, common mistakes, and correct prop values
4. **Read props from Figma CodeConnect EXACTLY**:
   - Call `get_code_connect_map` to get CodeConnect snippets from Figma
   - Use all props from CodeConnect exactly as shown - never override or change them
   - If CodeConnect shows `Card`, use `Card` (not `Flex` or `Box`)
5. **NEVER substitute icon names**:
   - Use the EXACT `iconName` value from Figma/CodeConnect (even if it's `"placeholder"`)
   - Do NOT choose "semantically appropriate" icons - that is the designer's decision, not yours
   - Placeholder icons are intentional - they indicate the final icon hasn't been decided yet
   - Wrong: Seeing `iconName="placeholder"` and changing it to `"shield-dualtone"` or `"folder"`
   - Correct: Using `iconName="placeholder"` exactly as shown
6. **NEVER guess prop values from screenshots** - ALL prop values (background colors, spacing, sizes, text colors, alignment, etc.) MUST come from Figma layer data (`get_design_context`, CodeConnect, layer properties). Screenshots are only useful for understanding the overall structure and layout, NOT for determining specific prop values. When Figma design data is unavailable (e.g., the Figma desktop app is not open), you MUST:
   - **Inform the user** which values you could not confirm from Figma data
   - **List your assumptions** explicitly (e.g., "I assumed `size="xlarge"` and no background color, but could not verify from Figma layer data")
   - **Do NOT silently guess** - every unconfirmed value must be flagged
   - Common traps: Figma canvas has a gray background (not part of the design), screenshot colors are unreliable, spacing/sizes cannot be accurately read from pixels
7. **Use https://picsum.photos/ for all image placeholders** - Format: `https://picsum.photos/seed/{identifier}/{width}/{height}`
8. **DO NOT set props to default values** - Only set props when they differ from component defaults (check API Reference tables in component docs)
9. **Context7 MCP is a LAST RESORT** - Only use for components not documented in this skill:
   - Call `resolve-library-id` with `@alma-oss/spirit-design-system`
   - Call `query-docs` with `/alma-oss/spirit-design-system` and the component name
10. **ASK when uncertain** - If you encounter a layout, pattern, or problem you don't know how to implement with Spirit components:

- **DO NOT guess or improvise** - Stop and ask the user for guidance
- Describe what you're trying to achieve and what's unclear
- Ask if there's a specific Spirit component or pattern to use
- Wait for the user's response before proceeding
- This prevents incorrect implementations and teaches you new patterns for future use

---

## Workflow

### Step 1: Analyze Figma Structure

**CRITICAL: Match Figma layer hierarchy exactly.** Each Figma autolayout layer should have a corresponding Spirit layout component.

**IMPORTANT: All values below MUST be extracted from Figma layer data** (via `get_design_context`, CodeConnect, or layer properties) - NOT guessed from screenshots. Screenshots only help understand the overall structure. If Figma data is unavailable, inform the user about which values are assumptions.

**Extract from Figma:**

- **Figma text style → Spirit component** - **Heading\*** text style ⇒ Heading component; **Body\*** text style ⇒ Text component. Never use Heading for Body styles (e.g. Body/Medium/Semibold).
- **Container layers** - If Figma has two or more Container layers (e.g. "Container Medium", "Container XLarge"), use Section `hasContainer={false}` and render that many `Container` components with `size` from each layer name. See [Layout Components](components/layout.md#critical-multiple-container-layers-in-figma). When Section has a **single** container: if the layer is **"Container XLarge"**, omit `containerProps` (xlarge is the default); otherwise set `containerProps.size` from the layer name (e.g. "Container Medium" → `containerProps={{ size: "medium" }}`).
- **Component names** - If Figma shows "Card Media NEW", "Button", etc., use the corresponding Spirit component
- **Layer names for props** - "Section XLarge" → `size="xlarge"`, "Button Large" → `size="large"`
- **Icon names** - Use EXACTLY as shown in CodeConnect (see Core Principle #5)
- **Spacing values** - Read `gap` from autolayout properties: `gap-[var(--global/spacing/space-1400,64px)]` → `spacing="space-1400"`
- **Color tokens** - Read exact tokens from layer properties: `accent-01-subtle`, `accent-02-subtle`, etc.
- **All wrapper layers** - Each Figma layer with autolayout MUST have a corresponding Spirit component
- **Alignment** - Check `align-items` and `justify-content` properties
- **Fill width/height** - Figma uses `align-self: stretch` for "fill" dimensions
- **Max-width constraints** - Check which specific layer has max-width, apply only to that layer
- **Padding values** - Check for `pr`, `pl`, `pt`, `pb`, `px`, `py` on layers; apply using Box padding props
- **Link colors** - Check for `themed/link/...` tokens; these indicate clickable elements (use CardLink for Card titles)

**Layout guides (grid columns)**: Figma's Layout guides (e.g. "content limited to 7 grid columns") are **not** exposed via the Figma API (get_design_context, get_metadata, get_screenshot). If the user mentions grid/column constraints from Layout guides, implement them using Spirit's Grid (e.g. `Grid cols={12}` with `GridItem columnStart="span 7"` for 7 columns). If the total column count or gutter is unclear, ask the user to confirm or share the value.

**Layer Structure Matching Example:**

```text
Figma Layers:                          Spirit Components:
├── Section XLarge                     <Section size="xlarge">
│   └── Container XLarge                 (included in Section)
│       └── Content (gap: 32px)          <Flex spacing="space-1000">
│           ├── Heading (max-w: 800px)     <Box UNSAFE_style={{ maxWidth }}>
│           │   ├── Tag                        <Flex spacing="space-700">
│           │   └── Composition                  <Tag />
│           │       ├── Title                    <Flex spacing="space-900">
│           │       ├── Description                <Heading />
│           │       └── ActionGroup                <Text />
│           │                                      <ActionGroup />
│           └── Column (4 items)             </Flex></Box>
│               ├── number                   <Grid cols={4}>
│               ├── number                     <StatCard />
│               ├── number                     ...
│               └── number                   </Grid>
```

### Step 2: Choose Container Type

| Figma Pattern                       | Spirit Component                           |
| ----------------------------------- | ------------------------------------------ |
| "Design Block" or main page section | `Section`                                  |
| Need to constrain content width     | `Section containerProps={{ size: "..." }}` |
| Full-width section content          | `Section hasContainer={false}`             |

**Important**: Section includes Container by default - don't nest another Container inside.

### Step 3: Choose Layout Pattern

| Figma Pattern                           | Spirit Component                           | Notes                                           |
| --------------------------------------- | ------------------------------------------ | ----------------------------------------------- |
| Uniform repeatable items (cards, stats) | `Grid`                                     | Set `cols` prop, Grid handles row wrapping      |
| Max-width centered content              | `Section containerProps={{ size: "..." }}` | NOT Grid                                        |
| Single row or column                    | `Flex`                                     | `direction="horizontal"` or `"vertical"`        |
| Columns with different structures       | Multiple `Flex` columns                    | Horizontal Flex wrapping vertical Flex children |
| Vertical list with dividers             | `Stack`                                    | Use `hasIntermediateDividers`                   |
| Only styling (background, border)       | `Box`                                      | No layout capabilities                          |
| Styling + layout combined               | `Box elementType={Flex}`                   | Combines styling and layout                     |

**IMPORTANT**: Check [Layout Components](components/layout.md) for API reference, prop values, and common mistakes before implementing.

### Step 4: Set Alignment Props

#### Check Figma Children for W-Full Before Setting Alignment

When analyzing Figma, check if children have `w-full` (full width) or `shrink-0 w-full`:

- **If children have `w-full`** → Parent should use `alignmentX="stretch"` so children fill the container width
- **If children do NOT have `w-full`** → Parent should use `alignmentX="left"` to prevent unwanted width expansion
- **Children with both `w-full` AND `max-width`** → Parent uses `alignmentX="stretch"`, child stretches UP TO its max-width constraint

```jsx
// WRONG - alignmentX="left" prevents children from filling width even when Figma shows w-full
<Flex direction="vertical" spacing="space-1000" alignmentX="left">
  <Box UNSAFE_style={{ maxWidth: "800px" }}>...</Box>  {/* Won't stretch to 800px */}
  <Grid cols={4}>...</Grid>  {/* Won't fill container width */}
</Flex>

// CORRECT - alignmentX="stretch" lets children fill width (respecting their max-width if set)
<Flex direction="vertical" spacing="space-1000" alignmentX="stretch">
  <Box UNSAFE_style={{ maxWidth: "800px" }}>...</Box>  {/* Stretches up to 800px */}
  <Grid cols={4}>...</Grid>  {/* Fills container width */}
</Flex>
```

#### Value Mapping (CSS → Spirit)

| CSS Value    | alignmentX | alignmentY |
| ------------ | ---------- | ---------- |
| `flex-start` | `left`     | `top`      |
| `center`     | `center`   | `center`   |
| `flex-end`   | `right`    | `bottom`   |
| `stretch`    | `stretch`  | `stretch`  |

**Direction-based mapping:**

- **Vertical Flex**: `align-items` → `alignmentX`, `justify-content` → `alignmentY`
- **Horizontal Flex**: `justify-content` → `alignmentX`, `align-items` → `alignmentY`

**Important**: Always set `alignmentX` explicitly on vertical Flex. Choose `stretch` when Figma children have `w-full`, otherwise use `left`.

### Step 5: Set Typography

| Figma Text Style | Spirit Component | Key Props                                    |
| ---------------- | ---------------- | -------------------------------------------- |
| Heading styles   | `Heading`        | `elementType` (REQUIRED), `size`, `emphasis` |
| Body text        | `Text`           | `elementType`, `size`, `emphasis`            |

**Accessibility rules:**

- Use `h1-h6` only for actual semantic headings
- For styled text that isn't a heading (stats, labels): `elementType="div"` or `"span"`
- Maintain heading hierarchy (h1 → h2 → h3, don't skip levels)
- Add `marginBottom="space-0"` to typography elements that have siblings AFTER them in Flex/Grid/Stack (last-child elements don't need it)

#### Use Full Accent Color Token Names

Heading and Text accept accent colors, but you must use the **full token name** (not short form).

```jsx
// WRONG - short form "accent-02" causes TypeScript lint error
<Heading elementType="div" size="xlarge" textColor="accent-02">300K+</Heading>

// CORRECT - use full token name "accent-02-basic"
<Heading elementType="div" size="xlarge" textColor="accent-02-basic" marginBottom="space-0">300K+</Heading>
```

Valid accent tokens: `accent-01-basic`, `accent-01-subtle`, `accent-02-basic`, `accent-02-subtle`, etc.

**IMPORTANT**: Check [Typography Components](components/typography.md) for API reference, prop values, and common mistakes before implementing.

### Step 6: Responsive Design

When only one breakpoint is provided in Figma:

1. **Identify the breakpoint** - Check Figma frame width (mobile < 768px, tablet 768-1024px, desktop > 1024px)
2. **Add responsive props** for other breakpoints:

```jsx
// Grid: reduce columns on smaller screens
<Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} />

// Flex: change direction on mobile
<Flex direction={{ mobile: 'vertical', tablet: 'horizontal' }} />

// Spacing: reduce on smaller screens
<Flex spacing={{ mobile: 'space-400', tablet: 'space-800', desktop: 'space-1200' }} />
```

3. **Design must match exactly** on the provided breakpoint

### Step 7: Crosscheck Design

**Before finalizing, re-fetch Figma data and verify:**

1. **CodeConnect snippets match code exactly** - Every prop from CodeConnect is present
2. **Component names match** - Spirit components used match Figma component names
3. **Icon names match EXACTLY** - If CodeConnect shows `iconName="placeholder"`, code must use `"placeholder"` (NOT a substituted icon)
4. **Spacing values match** - Read from Figma autolayout properties
5. **Color tokens match** - Exact tokens from Figma layer properties
6. **Layer structure matches** - All wrapper layers represented
7. **Alignment matches** - Explicit alignment props matching Figma

### Step 8: Visual Comparison in Browser

After implementing, visually compare the result against the Figma design using the browser.

If you have access to browser automation tools (e.g. a browser MCP server, Playwright, Puppeteer, or similar), use them to open the running dev server and compare visually with the Figma screenshot. If no browser tools are available, skip this step.

**Procedure:**

1. **Ensure the dev server is running** - Check the terminal for a running dev server (e.g. `yarn dev`, `npm run dev`). Note the local URL (usually `http://localhost:3000`).

2. **Get the Figma screenshot** - Call `get_screenshot` for the Figma node to have it fresh for comparison.

3. **Open the page in the browser** - Navigate to the local dev server URL. Wait for the page to load, then capture the current page state (screenshot or snapshot).

4. **Compare visually** - Look at both the Figma screenshot and the browser output. Check for:
   - **Layout structure** - Does the overall arrangement match? (spacing, alignment, nesting)
   - **Typography** - Are font sizes, weights, and colors correct?
   - **Spacing** - Are gaps between elements consistent with the design?
   - **Component rendering** - Do buttons, tags, cards, etc. look correct?
   - **Alignment** - Is content left/center/right aligned as in the design?
   - **Width constraints** - Does the content respect max-width values from Figma?
   - **Colors** - Do backgrounds, text colors, and borders match?

5. **Fix discrepancies** - If anything doesn't match:
   - Identify the specific component or prop causing the mismatch
   - Update the code to fix it
   - Reload the page in the browser and re-check

6. **Responsive check (optional)** - If the Figma design specifies a particular viewport width, resize the browser viewport to match before comparing. For other breakpoints, verify responsive behavior looks reasonable.

**Important notes:**

- The browser comparison is a best-effort visual check, not pixel-perfect validation
- Focus on structural correctness: layout, spacing, alignment, colors, and component usage
- Minor rendering differences between Figma and browser are expected (font rendering, anti-aliasing, etc.)
- If no browser tools are available or the dev server is not running, skip this step and note it in your response

### Step 9: Check Linters

**After implementation is complete, run the linter on all edited files to catch errors.**

1. **Run `ReadLints`** on every file you created or modified during the implementation
2. **Fix any new linter errors** you introduced (TypeScript errors, invalid prop values, missing imports, etc.)
3. **Ignore pre-existing linter errors** - only fix errors caused by your changes
4. **Common linter issues to watch for:**
   - Invalid prop values (e.g., short-form accent colors like `"accent-02"` instead of `"accent-02-basic"`)
   - Missing or incorrect imports from `@alma-oss/spirit-web-react`
   - TypeScript type mismatches on component props
   - Unused imports or variables

---

## Quick Reference

### Space Tokens

| Token Range                 | Typical Use                   |
| --------------------------- | ----------------------------- |
| `space-100` - `space-300`   | Tight spacing (icons, inline) |
| `space-400` - `space-600`   | Small (within components)     |
| `space-700` - `space-900`   | Medium (between components)   |
| `space-1000` - `space-1200` | Large (section padding)       |
| `space-1300` - `space-1600` | Extra large (page sections)   |

### Color Token Examples

| Type       | Examples                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------ |
| Background | `primary`, `secondary`, `tertiary`, `accent-01-subtle`, `accent-02-subtle`, `neutral-subtle`     |
| Text       | `primary`, `secondary`, `tertiary`, `inverted`, `disabled`, `accent-01-basic`, `accent-02-basic` |
| Border     | `basic`, `focus`, accent colors                                                                  |

**Note**: Always use full token names for accent colors (`accent-02-basic`, not `accent-02`). See [Typography Components](components/typography.md).

### Link Color Tokens (CRITICAL for Card Detection)

When Figma shows these color tokens on text, it indicates the element should be a **link**:

| Figma Token                         | Meaning                                           |
| ----------------------------------- | ------------------------------------------------- |
| `themed/link/primary/state-default` | Primary link color - use CardLink for Card titles |
| `themed/link/primary/state-hover`   | Link hover state - CardLink handles automatically |
| `themed/link/secondary/...`         | Secondary link - use CardLink or Link component   |

If CardTitle has a link color token, use `CardLink` inside `CardTitle`, NOT Heading with textColor.

See [Card Components](components/cards.md) for full documentation.

---

## Implementation Checklist

Before finalizing code:

**Figma Data Extraction:**

- \[ \] CodeConnect snippets used exactly as provided
- \[ \] Component names verified (Figma → Spirit mapping)
- \[ \] **Icon names used EXACTLY as shown** (if `iconName="placeholder"`, use `"placeholder"` - NEVER substitute)
- \[ \] Layer names checked for size/color/variant props
- \[ \] Spacing values read from Figma autolayout properties
- \[ \] Color tokens read exactly from Figma layer properties

**Layout:**

- \[ \] **Figma Container layers**: Two or more Container layers ⇒ Section `hasContainer={false}` and that many `Container` components with `size` from layer names (e.g. "Container Medium" → `size="medium"`).
- \[ \] Layout components have explicit alignment props
- \[ \] Vertical Flex has `alignmentX` set explicitly
- \[ \] Grid has both `alignmentX` and `alignmentY` set
- \[ \] Figma "fill" width uses parent `alignmentX="stretch"`
- \[ \] All Figma wrapper layers represented in code (match hierarchy)
- \[ \] Uniform items use Grid, different structures use Flex columns
- \[ \] Max-width constraints applied to correct innermost wrapper only

**Typography:**

- \[ \] **Figma text style respected**: Heading\* style ⇒ Heading component; Body\* style ⇒ Text component (never Heading for Body/Medium/Semibold etc.)
- \[ \] Heading `elementType` set appropriately (h1-h6 for headings, div/span for styled text)
- \[ \] Heading hierarchy maintained (no skipped levels)
- \[ \] `marginBottom="space-0"` added to typography with siblings after them (not needed on last-child elements)
- \[ \] Accent text colors use full token names (`accent-02-basic`, NOT `accent-02`)

**Styling:**

- \[ \] No inline CSS (except `UNSAFE_style` as last resort)
- \[ \] `UNSAFE_style maxWidth` only on innermost wrapper containing constrained content
- \[ \] Box + Flex pattern used when both styling and layout needed
- \[ \] ALL prop values confirmed from Figma layer data (NEVER guessed from screenshots)
- \[ \] If Figma data was unavailable, assumptions are listed and flagged to the user
- \[ \] Box colors/borders match Figma exactly
- \[ \] Padding values (`pr`, `pl`, `pt`, `pb`, `px`, `py`) from Figma applied using Box props or `Flex elementType={Box}`

**Cards & Links:**

- \[ \] CardTitle with `themed/link/...` color tokens uses `CardLink` (not Heading with textColor)
- \[ \] CardLink used inside CardTitle for clickable cards
- \[ \] `isHeading` set on CardTitle when appropriate
- \[ \] Horizontal Card with IconBox in CardArtwork uses Flex wrapper for vertical centering (see [Card Components](components/cards.md#cardartwork))

**Responsive:**

- \[ \] Responsive props added for other breakpoints
- \[ \] Design matches exactly on provided breakpoint

**Images:**

- \[ \] Placeholders use picsum.photos format

**Visual Comparison:**

- \[ \] Opened the implementation in the browser (if browser tools are available)
- \[ \] Compared browser rendering against Figma screenshot
- \[ \] Fixed any visual discrepancies found

**Linters:**

- \[ \] Ran linter on all created/modified files
- \[ \] Fixed any new linter errors introduced by the implementation
- \[ \] No TypeScript errors on Spirit component props

**Uncertainty:**

- \[ \] Asked user for guidance on any layouts/patterns you weren't sure how to implement (don't guess!)

---

## Common Mistakes

### 1. Substituting Icon Names

**CRITICAL: Never substitute icon names with your own choices.**

```jsx
// WRONG - Developer substituted "semantically appropriate" icons
<Icon name="shield-dualtone" />  // Was "placeholder" in Figma
<Icon name="folder" />           // Was "placeholder" in Figma
<Icon name="reload" />           // Was "placeholder" in Figma

// CORRECT - Use EXACTLY what Figma/CodeConnect specifies
<Icon name="placeholder" />      // Matches Figma exactly
<Icon name="placeholder" />      // Matches Figma exactly
<Icon name="placeholder" />      // Matches Figma exactly
```

**Why this is wrong:**

- Placeholder icons indicate the designer hasn't finalized the icon choice yet
- Choosing icons is a design decision, not a developer decision
- Your "semantically appropriate" choice may conflict with the design system's icon usage patterns
- This violates the core principle: "Use all props from CodeConnect exactly as shown"

The rule: If CodeConnect shows `iconName="placeholder"`, your code MUST use `iconName="placeholder"`. Period.

### 2. Guessing Prop Values From Figma Screenshots

Never derive prop values from how a Figma screenshot looks. Screenshots are for understanding structure only.

All prop values must come from Figma layer data (`get_design_context`, CodeConnect, layer properties). When that data is unavailable, inform the user about your assumptions instead of silently guessing.

**Common traps:**

- **Background colors**: The Figma canvas is gray - sections with no background look gray in screenshots. This does NOT mean the section has `backgroundColor="secondary"`.
- **Spacing values**: You cannot accurately determine spacing tokens from pixel distances in a screenshot.
- **Text colors**: Screenshot rendering may not accurately represent color tokens.
- **Sizes**: Component sizes (e.g., Section `size`, Tag `size`) cannot be reliably read from screenshots.

```jsx
// WRONG - Guessed backgroundColor from screenshot appearance
<Section backgroundColor="secondary" size="xlarge">
  <Heading elementType="h1">Title</Heading>
</Section>

// CORRECT - Only set props confirmed from Figma layer data
<Section size="xlarge">
  <Heading elementType="h1">Title</Heading>
</Section>
```

**When Figma data is unavailable, tell the user:**

> "I could not retrieve Figma layer data (the Figma desktop app may not be open). The following values are assumptions I made from the screenshot and may be incorrect:
>
> - Section `size="xlarge"` (could not verify exact padding)
> - No `backgroundColor` set (screenshot background may be canvas, not design)
> - Tag `size="small"` (guessed from visual size)
>
> Please verify these against the Figma file."

**The rule:** Every prop value must be confirmed from Figma data. If it can't be, flag it to the user as an assumption.
