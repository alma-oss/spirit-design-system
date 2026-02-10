# Card Components

Spirit Card components for displaying content in structured, contained blocks. Cards can be static or interactive (clickable).

> **This documentation is the primary reference.** Use the API tables and examples below. Only use Context7 MCP for components not documented here.

## Quick Reference: Recognizing Links in Figma

**CRITICAL: How to identify if a Card should be clickable:**

1. **Check for link color tokens** on CardTitle text:
   - `themed/link/primary/state-default`
   - `themed/link/primary/state-hover`
   - `themed/link/secondary/...`
   - Any token containing `link` in the path

2. **Check for link typography styles** in Figma text properties

3. **Check for hover states** on the Card frame in Figma

If any of these are present, the Card title is meant to be a link - use `CardLink` inside `CardTitle`.

---

## CardLink

Makes a Card interactive by providing a clickable title link that stretches to cover the entire Card.

### When to Use

- When Figma shows link color tokens on Card title (e.g., `themed/link/primary/state-default`)
- When the Card should be clickable to navigate somewhere
- When you need to make the entire Card clickable via a title link

### When NOT to Use

- For static Cards that don't navigate anywhere
- When the Card has multiple separate links/actions (use regular Links or Buttons instead)
- For Cards with only button actions, not title links

### API Reference

| Prop          | Type        | Default | Required | Description                                   |
| ------------- | ----------- | ------- | -------- | --------------------------------------------- |
| `href`        | string      | -       | **YES**  | URL or path the link navigates to             |
| `elementType` | ElementType | `"a"`   | No       | HTML element to render (use for Next.js Link) |
| `isExternal`  | boolean     | `false` | No       | Open link in new tab                          |
| `target`      | string      | -       | No       | Link target attribute                         |
| `children`    | ReactNode   | -       | **YES**  | Link text (typically the card title text)     |

### Common Mistakes

1. **Using Heading with textColor instead of CardLink when Figma shows link styling**

   ```jsx
   // WRONG - Figma shows themed/link/primary/state-default color on title
   <Card>
     <CardMedia>
       <img src="..." alt="" />
     </CardMedia>
     <CardBody>
       <CardTitle isHeading>
         <Heading elementType="div" size="medium" textColor="accent-01-basic">
           Card Title
         </Heading>
       </CardTitle>
       <CardDescription>Description text</CardDescription>
     </CardBody>
   </Card>

   // CORRECT - use CardLink when Figma shows link color tokens
   <Card>
     <CardMedia>
       <img src="..." alt="" />
     </CardMedia>
     <CardBody>
       <CardTitle isHeading>
         <CardLink href="#">Card Title</CardLink>
       </CardTitle>
       <CardDescription>Description text</CardDescription>
     </CardBody>
   </Card>
   ```

2. **Forgetting isHeading on CardTitle when using CardLink**

   ```jsx
   // WRONG - CardTitle without isHeading when it should be a heading
   <CardTitle>
     <CardLink href="#">Card Title</CardLink>
   </CardTitle>

   // CORRECT - add isHeading for semantic heading structure
   <CardTitle isHeading>
     <CardLink href="#">Card Title</CardLink>
   </CardTitle>
   ```

3. **Using regular Link instead of CardLink inside Card**

   ```jsx
   // WRONG - Link doesn't provide Card-level click target
   <Card>
     <CardBody>
       <CardTitle isHeading>
         <Link href="#">Card Title</Link>
       </CardTitle>
     </CardBody>
   </Card>

   // CORRECT - CardLink makes entire Card clickable
   <Card>
     <CardBody>
       <CardTitle isHeading>
         <CardLink href="#">Card Title</CardLink>
       </CardTitle>
     </CardBody>
   </Card>
   ```

### Figma Mapping

| Figma Property                            | Spirit Implementation                                  |
| ----------------------------------------- | ------------------------------------------------------ |
| Title has `themed/link/primary/...` color | Use `CardLink` inside `CardTitle`                      |
| Title has link typography style           | Use `CardLink` inside `CardTitle`                      |
| Card has hover state                      | Use `CardLink` (handles hover automatically)           |
| Title has accent color, NOT link color    | Use `Heading` with `textColor` (Card is NOT clickable) |

### Examples

```jsx
// Basic Card with link (Figma shows link color on title)
<Card>
  <CardMedia>
    <img src="https://picsum.photos/seed/card1/400/300" alt="" />
  </CardMedia>
  <CardBody>
    <CardTitle isHeading>
      <CardLink href="/products/item-1">Product Name</CardLink>
    </CardTitle>
    <CardDescription>
      Brief description of the product or content.
    </CardDescription>
  </CardBody>
</Card>

// Card with external link
<Card>
  <CardBody>
    <CardTitle isHeading>
      <CardLink href="https://example.com" isExternal>
        External Resource
      </CardLink>
    </CardTitle>
    <CardDescription>
      Opens in a new tab.
    </CardDescription>
  </CardBody>
</Card>

// Card with Next.js Link (for app router navigation)
import NextLink from 'next/link';

<Card>
  <CardBody>
    <CardTitle isHeading>
      <CardLink elementType={NextLink} href="/dashboard">
        Go to Dashboard
      </CardLink>
    </CardTitle>
  </CardBody>
</Card>
```

---

## CardTitle

Container for Card title content. Can render as a heading or plain container.

### API Reference

| Prop           | Type         | Default | Description                                |
| -------------- | ------------ | ------- | ------------------------------------------ |
| `isHeading`    | boolean      | `false` | Render as heading element                  |
| `headingProps` | HeadingProps | -       | Props passed to internal Heading component |
| `children`     | ReactNode    | -       | Title content (text or CardLink)           |

### Examples

```jsx
// Static Card title (no link)
<CardTitle isHeading headingProps={{ size: 'large' }}>
  Static Card Title
</CardTitle>

// Clickable Card title with CardLink
<CardTitle isHeading>
  <CardLink href="/page">Clickable Card Title</CardLink>
</CardTitle>

// Card title without heading semantics
<CardTitle>
  <CardLink href="/page">Linked Title (not a heading)</CardLink>
</CardTitle>
```

---

## CardDescription

Container for Card description/body text.

### Examples

```jsx
<CardDescription>This is the card description text that provides additional context.</CardDescription>
```

---

## Card Patterns

### Pattern 1: Static Card (No Link)

When Figma shows a Card WITHOUT link styling on the title:

```jsx
<Card>
  <CardMedia>
    <img src="https://picsum.photos/seed/static/400/300" alt="" />
  </CardMedia>
  <CardBody>
    <CardTitle isHeading headingProps={{ size: 'medium' }}>
      Static Card Title
    </CardTitle>
    <CardDescription>This card is not clickable - no link in Figma.</CardDescription>
  </CardBody>
</Card>
```

### Pattern 2: Clickable Card (With Link)

When Figma shows a Card WITH link color tokens on the title (`themed/link/...`):

```jsx
<Card>
  <CardMedia>
    <img src="https://picsum.photos/seed/clickable/400/300" alt="" />
  </CardMedia>
  <CardBody>
    <CardTitle isHeading>
      <CardLink href="/destination">Clickable Card Title</CardLink>
    </CardTitle>
    <CardDescription>Clicking anywhere on this card navigates to the destination.</CardDescription>
  </CardBody>
</Card>
```

### Pattern 3: Card with Actions

When Figma shows a Card with button actions (not title link):

```jsx
<Card>
  <CardBody>
    <CardTitle isHeading>Card with Actions</CardTitle>
    <CardDescription>This card has explicit button actions.</CardDescription>
  </CardBody>
  <CardFooter>
    <Button>Primary Action</Button>
    <Button variant="secondary">Secondary</Button>
  </CardFooter>
</Card>
```

---

## CardArtwork

Container for Card visual content (images, icons, IconBox) in the artwork slot.

### When to Use

- When Figma shows a Card with an image or icon in the media/artwork area
- For horizontal Cards with IconBox decorations
- When Card has a visual element separate from body content

### API Reference

| Prop         | Type      | Default | Description                                                    |
| ------------ | --------- | ------- | -------------------------------------------------------------- |
| `alignmentX` | string    | -       | Horizontal alignment (**only works on vertical Card layouts**) |
| `children`   | ReactNode | -       | Visual content (img, IconBox, etc.)                            |

**CRITICAL**: `alignmentX` prop only works when Card `direction="vertical"` (default). It does NOT work for horizontal Card layouts.

### Common Mistakes

#### IconBox Stretches Vertically in Horizontal Card Layouts

When using IconBox inside CardArtwork in a horizontal Card layout, the IconBox stretches to fill the full Card height instead of maintaining its square aspect ratio. This is especially noticeable when the Card has additional content (like CardFooter with buttons) that makes it taller.

```jsx
// WRONG - IconBox stretches vertically to fill CardArtwork height
<Card direction="horizontal" isBoxed>
  <CardArtwork>
    <IconBox color="01" shape="rounded" iconName="placeholder" />
  </CardArtwork>
  <CardBody>
    <CardTitle isHeading>Card Title</CardTitle>
    <CardDescription>Description text here.</CardDescription>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// CORRECT - Wrap IconBox in Flex to align it properly
<Card direction="horizontal" isBoxed>
  <CardArtwork>
    <Flex alignmentY="top">
      <IconBox color="01" shape="rounded" iconName="placeholder" />
    </Flex>
  </CardArtwork>
  <CardBody>
    <CardTitle isHeading>Card Title</CardTitle>
    <CardDescription>Description text here.</CardDescription>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Why this happens:**

- CardArtwork does NOT support `alignmentY` prop for horizontal layouts
- By default, content stretches to fill the CardArtwork container
- In horizontal Cards, this means IconBox stretches to match the Card's full height

**The fix explained:**

- Wrap IconBox in a `Flex` component
- Set `alignmentY="top"` to align the IconBox to the top (most common in Figma designs)
- **IMPORTANT**: Always check the Figma design - use `alignmentY="top"` for top-aligned icons, or `alignmentY="center"` if the design shows centered icons
- This only affects horizontal Card layouts with taller content

2. **Expecting alignmentX to work on horizontal Cards**

   ```jsx
   // WRONG - alignmentX has no effect on horizontal Card
   <Card direction="horizontal">
     <CardArtwork alignmentX="center">
       <IconBox color="01" shape="rounded" iconName="placeholder" />
     </CardArtwork>
     ...
   </Card>

   // The alignmentX prop only works for vertical Card layouts
   <Card direction="vertical">  {/* or no direction prop, since vertical is default */}
     <CardArtwork alignmentX="center">
       <img src="..." alt="" />
     </CardArtwork>
     ...
   </Card>
   ```

### Examples

```jsx
// Horizontal Card with top-aligned IconBox (most common pattern)
<Card direction="horizontal" isBoxed>
  <CardArtwork>
    <Flex alignmentY="top">
      <IconBox color="01" shape="rounded" iconName="placeholder" />
    </Flex>
  </CardArtwork>
  <CardBody>
    <CardTitle isHeading>
      <CardLink href="#">Feature Card</CardLink>
    </CardTitle>
    <CardDescription>
      This horizontal card has a properly aligned IconBox at the top.
    </CardDescription>
  </CardBody>
  <CardFooter>
    <Button>Learn More</Button>
  </CardFooter>
</Card>

// Horizontal Card with centered IconBox (when Figma shows centered alignment)
<Card direction="horizontal" isBoxed>
  <CardArtwork>
    <Flex alignmentY="center">
      <IconBox color="01" shape="rounded" iconName="placeholder" />
    </Flex>
  </CardArtwork>
  <CardBody>
    <CardTitle isHeading>Centered Icon Card</CardTitle>
    <CardDescription>Use alignmentY="center" only if Figma shows centered icon.</CardDescription>
  </CardBody>
</Card>

// Vertical Card with centered artwork (alignmentX works here)
<Card>
  <CardArtwork alignmentX="center">
    <img src="https://picsum.photos/seed/artwork/200/150" alt="" />
  </CardArtwork>
  <CardBody>
    <CardTitle isHeading>Vertical Card</CardTitle>
    <CardDescription>alignmentX works on vertical layouts.</CardDescription>
  </CardBody>
</Card>
```

---

## Link Color Detection Checklist

Before implementing a Card, check:

- \[ \] Does the CardTitle text have `themed/link/...` color token? → Use CardLink
- \[ \] Does the CardTitle text have link typography style? → Use CardLink
- \[ \] Does the Card have hover state in Figma? → Use CardLink
- \[ \] Is the title color an accent color (`accent-01-basic`)? → Static card, use Heading
- \[ \] Are there button actions but no title link? → Static card with CardFooter buttons
