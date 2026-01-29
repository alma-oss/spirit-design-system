# Content Truncating Guidelines

This guide provides best practices and implementation patterns for handling content truncation in the Spirit Design System components.

## Overview

**Important:** The Spirit Design System is not responsible for the content provided to components. It is the responsibility of the implementing application to:

1. Provide appropriate content length
2. Handle translations and localization
3. Apply truncation when needed using the provided tools

This guide helps you understand when and how to apply text truncation for different scenarios.

## Truncation Solutions

Spirit Design System provides two main approaches for truncating content:

### 1. React Truncate Component

For React applications, use the `<Truncate>` component which provides programmatic text truncation.

```jsx
import { Truncate } from '@lmc-eu/spirit-web-react';

<Truncate mode="lines" limit={1}>
  Long text content that needs to be truncated
</Truncate>;
```

**Available modes:**

- `lines` (default) - Truncates to a specific number of lines using CSS `-webkit-line-clamp`
- `words` - Truncates to a specific number of words (requires plain text)
- `characters` - Truncates to a specific number of characters (requires plain text)

**Note:** The `words` and `characters` modes do not support HTML or React element children.

**Documentation:** See [Truncate component README][docs-truncate] for full API details.

### 2. CSS Helper Classes

For CSS implementations, use the utility classes:

#### Single-Line Truncation

```html
<span class="text-truncate" style="max-width: 200px;"> Long text that will be truncated </span>
<div class="Container Container--xsmall">
  <span class="text-truncate"> Long text that will be truncated </span>
</div>
```

**Note:** Element must be wrapped inside a container or to be itself with a defined width or `max-width`

#### Multi-Line Truncation

```html
<div class="text-truncate-multiline" style="--text-truncate-lines: 3;">
  Longer content that will be truncated after three lines
</div>
```

**Customization:**

- Use CSS variable `--text-truncate-lines` to control the number of lines
- Default: 3 lines if variable not specified

**Documentation:** See [text helper documentation][demo-text-helpers] for examples.

## When to Use Truncation

### Scenarios Requiring Truncation

1. **Fixed-width containers** - When content must fit within a specific space
2. **Responsive layouts** - When content length varies across screen sizes
3. **User-generated content** - When content length is unpredictable
4. **Translated content** - When translations may be longer than source text
5. **Dynamic data** - When displaying data from APIs or databases

### Scenarios to Avoid Truncation

1. **Critical information** - Important content that users must read in full
2. **Short, controlled content** - When content length is predictable and short
3. **Actions and CTAs** - Button labels and call-to-action text
4. **Error messages** - Messages that require full context
5. **Accessibility labels** - ARIA labels and screen reader text

## Component-Specific Guidelines

### SegmentedControl

**Guideline:** Text labels in SegmentedControl should not truncate under normal circumstances. If truncation is necessary, the content is likely too long for this component.

**Best Practices:**

- Keep labels short and concise (1-2 words ideal)
- Prefer icons with short labels or icons only for longer content
- If truncation is unavoidable, use single-line truncation

**React implementation:**

```jsx
<SegmentedControl label="Choose option">
  <SegmentedControlItem value="option1">
    <Truncate mode="lines" limit={1}>
      Very Long Label That Might Overflow
    </Truncate>
  </SegmentedControlItem>
</SegmentedControl>
```

**CSS implementation:**

```html
<label class="SegmentedControl__item">
  <input type="radio" name="option" value="option1" />
  <span class="SegmentedControl__label">
    <span class="text-truncate">Very Long Label That Might Overflow</span>
  </span>
</label>
```

**Solution if truncating:** If your labels are truncating, consider:

1. Shortening the label text
2. Using abbreviations
3. Switching to a different component (e.g., Select, Radio buttons)
4. Using icons with tooltips

**Documentation:** See [SegmentedControl README][docs-segmented-control] for full details.

### Breadcrumbs

**Guideline:** Breadcrumb titles may need truncation when dealing with user-generated content or long page titles.

**Best Practices:**

- Truncate individual breadcrumb items, not the entire breadcrumb trail
- Maintain the full path structure even with truncation
- Consider using tooltips to show full titles on hover

**React implementation:**

```jsx
<Breadcrumbs>
  <BreadcrumbsItem href="/">Home</BreadcrumbsItem>
  <BreadcrumbsItem href="/category">
    <span className="text-truncate" style={{ maxWidth: '150px' }}>
      Very Long Category Name
    </span>
  </BreadcrumbsItem>
</Breadcrumbs>
```

**CSS implementation:**

```html
<nav aria-label="Breadcrumb">
  <ol class="Breadcrumbs">
    <li><a href="/">Home</a></li>
    <li>
      <a href="/category">
        <span class="text-truncate" style="max-width: 150px;"> Very Long Category Name </span>
      </a>
    </li>
  </ol>
</nav>
```

**Documentation:** See Breadcrumbs README for "Dealing with Long Titles" section:

- [React Breadcrumbs][docs-react-breadcrumbs]
- [CSS Breadcrumbs][docs-web-breadcrumbs]

### Toast Messages

**Guideline:** Toast messages should be concise. Use multi-line truncation as a fallback for exceptionally long content.

**Implementation:**

- Toast automatically uses `text-truncate-multiline` for message content
- Keep messages short and actionable
- For detailed information, link to a full page or modal

### FileUploader Attachments

**Guideline:** File names should truncate with ellipsis to prevent layout breaking.

**Implementation:**

- File names automatically use `text-truncate` class
- Full file name should be available in title attribute or tooltip
- Maintain file extension visibility when possible

### Other Components

For components not listed here, follow these general rules:

1. **Labels and headings** - Avoid truncation unless absolutely necessary
2. **Body text** - Use multi-line truncation for long content
3. **Lists and tables** - Apply truncation per cell/item
4. **Cards** - Truncate descriptions and content, not titles
5. **Navigation** - Keep navigation labels short, avoid truncation

## Handling Multiple Languages

When implementing truncation in multilingual applications:

### Character Count Variations

Different languages have different average word lengths:

- **German** - Often longer words than English (~30-35% longer)
- **Czech/Slovak** - Longer words with declensions (~20-30% longer)
- **Asian languages** - May be more compact but require careful line breaking
- **Arabic/Hebrew** - Right-to-left text requires RTL-aware truncation

### Best Practices for Translations

1. **Design with buffer space** - Allow 30-40% more space than English content
2. **Test with longest translations** - Always test with German and Czech
3. **Use flexible truncation limits** - Prefer `lines` mode over `characters`/`words`
4. **Provide full content on interaction** - Use tooltips, modals, or expandable sections
5. **Work with translators** - Provide context and character limits

### Example: Language-Aware Truncation

```jsx
// ❌ Bad: Fixed character limit
<Truncate mode="characters" limit={50}>
  {translatedText}
</Truncate>

// ✅ Good: Flexible line limit
<Truncate mode="lines" limit={2}>
  {translatedText}
</Truncate>
```

## String Length Scenarios

### Scenario 1: Short, Predictable Content

**Example:** Button labels, badges, status indicators

**Solution:** No truncation needed. Keep content concise by design.

```jsx
<Button>Submit</Button>
<Badge color="success">Active</Badge>
```

### Scenario 2: Medium, Variable Content

**Example:** Card titles, list items, navigation labels

**Solution:** Use single-line truncation with max-width constraint.

```jsx
<Truncate mode="lines" limit={1}>
  {title}
</Truncate>
```

### Scenario 3: Long, User-Generated Content

**Example:** Comments, descriptions, article excerpts

**Solution:** Use multi-line truncation with "Read more" functionality.

```jsx
<Truncate mode="lines" limit={3}>
  {userContent}
</Truncate>
<Button>Read more</Button>
```

### Scenario 4: Dynamic Data From APIs

**Example:** Product names, search results, user profiles

**Solution:** Apply truncation with consistent limits across items.

```jsx
{
  products.map((product) => (
    <Card key={product.id}>
      <Truncate mode="lines" limit={2}>
        {product.name}
      </Truncate>
    </Card>
  ));
}
```

### Scenario 5: File Names and Paths

**Example:** Document lists, file uploads, downloads

**Solution:** Truncate in the middle, preserving extension.

```jsx
// Using CSS class
<span className="text-truncate" title={fileName}>
  {fileName}
</span>;

// Or custom JavaScript for middle truncation
const truncateMiddle = (str, maxLength) => {
  if (str.length <= maxLength) return str;
  const extension = str.split('.').pop();
  const nameLength = maxLength - extension.length - 4; // 4 for "…" and "."
  return `${str.substring(0, nameLength)}…${extension}`;
};
```

## Accessibility Considerations

When implementing truncation, ensure accessibility:

### 1. Provide Full Content

Always make the full content available through:

- `title` attribute for simple text
- Tooltips for formatted content
- Expandable sections or modals
- "Read more" links

```html
<span class="text-truncate" title="Full content here"> Truncated content… </span>
```

### 2. ARIA Labels

For screen readers, provide complete context:

```jsx
<Truncate mode="lines" limit={1} aria-label={fullText}>
  {fullText}
</Truncate>
```

### 3. Focus States

Ensure truncated elements are still navigable and readable when focused:

```css
.text-truncate:focus,
.text-truncate:hover {
  /* Consider showing full content or tooltip */
}
```

### 4. Avoid Truncating Critical Information

Never truncate:

- Error messages
- Form validation feedback
- Required instructions
- Accessibility labels (aria-label, alt text)

## Testing Truncation

### Test Cases

1. **Minimum content** - Test with very short content
2. **Maximum content** - Test with very long content
3. **Edge cases** - Test with content exactly at the limit
4. **No content** - Test with empty strings
5. **Special characters** - Test with emoji, symbols, RTL text
6. **Multiple languages** - Test with German, Czech, Asian languages

### Visual Testing

Check these scenarios:

- Different viewport sizes (mobile, tablet, desktop)
- Different zoom levels (100%, 150%, 200%)
- Different font sizes (user preferences)
- Different locales and languages

### Accessibility Testing

- Screen reader announcement of full content
- Keyboard navigation to truncated elements
- Focus visibility on truncated items
- Title/tooltip availability

## Common Pitfalls

### 1. Truncating Without Max-Width

```html
<!-- ❌ Bad: No width constraint -->
<span class="text-truncate"> This won’t truncate without a width! </span>

<!-- ✅ Good: Width constraint defined -->
<span class="text-truncate" style="max-width: 200px;"> This will truncate properly </span>
```

### 2. Using Wrong Truncation Mode

```jsx
// ❌ Bad: Using characters mode with HTML
<Truncate mode="characters" limit={50}>
  <strong>Bold text</strong> won’t work
</Truncate>

// ✅ Good: Using lines mode with HTML
<Truncate mode="lines" limit={1}>
  <strong>Bold text</strong> works fine
</Truncate>
```

### 3. Inconsistent Truncation Limits

```jsx
// ❌ Bad: Inconsistent limits in a list
<Truncate mode="lines" limit={2}>{item1}</Truncate>
<Truncate mode="lines" limit={3}>{item2}</Truncate>

// ✅ Good: Consistent limits
<Truncate mode="lines" limit={2}>{item1}</Truncate>
<Truncate mode="lines" limit={2}>{item2}</Truncate>
```

### 4. No Fallback for Full Content

```jsx
// ❌ Bad: No way to see full content
<Truncate mode="lines" limit={2}>
  {longContent}
</Truncate>

// ✅ Good: Provide way to see full content
<div>
  <Truncate mode="lines" limit={2}>
    {longContent}
  </Truncate>
  <Button onClick={() => setExpanded(true)}>
    Read more
  </Button>
</div>
```

## Summary

Key takeaways for content truncation in Spirit Design System:

1. **Responsibility** - The design system provides tools; applications are responsible for content
2. **Choose the right tool** - React component for programmatic control, CSS classes for simple cases
3. **Component guidelines** - Follow specific guidelines for each component (especially SegmentedControl)
4. **Translations matter** - Design for longer translations and test thoroughly
5. **Accessibility first** - Always provide access to full content
6. **Test comprehensively** - Test with various content lengths and languages

## Related Documentation

- [Truncate Component (React)][docs-truncate]
- [Text Helpers (CSS)][demo-text-helpers]
- [SegmentedControl Component][docs-segmented-control]
- [Breadcrumbs Component][docs-react-breadcrumbs]
- [Accessibility Guidelines][contributing-a11y-testing]

## Need Help?

If you have questions about truncation in a specific component or scenario:

1. Check the component’s README for specific guidance
2. Review this guide for general best practices
3. Reach out to the Spirit Design System team

[contributing-a11y-testing]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/accessibility-testing.md
[demo-text-helpers]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/helpers/text/index.html
[docs-react-breadcrumbs]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Breadcrumbs/README.md
[docs-segmented-control]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/SegmentedControl/README.md
[docs-truncate]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web-react/src/components/Truncate/README.md
[docs-web-breadcrumbs]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Breadcrumbs/README.md
