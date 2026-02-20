# Accordion

## Usage

### Default (Stay Open)

```tsx
import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from '@alma-oss/spirit-web-react';
import { AccordionOpenStateType } from '@alma-oss/spirit-web-react/types';
```

```typescript
const [openState, setOpenState] = useState<AccordionOpenStateType>(undefined);
```

```tsx
const toggle = (id) => {
  if (Array.isArray(openState)) {
    if (openState.includes(id)) {
      setOpenState(openState.filter((accordionId) => accordionId !== id));
    } else {
      setOpenState([...openState, id]);
    }
  } else if (openState === id) {
    setOpenState(undefined);
  } else {
    setOpenState(id);
  }
};
```

```tsx
<Accordion open={openState} toggle={toggle}>
  <AccordionItem id="accordion-item-example-0">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
  <AccordionItem id="accordion-item-example-1">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
  <AccordionItem id="accordion-item-example-2">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
  <AccordionItem id="accordion-item-example-3">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
  ...
</Accordion>
```

### Default with Opened on Init

```typescript
const [openState, setOpenState] = useState<AccordionOpenStateType>(['accordion-item-example-1']);
```

### Open Only One at a Time

```typescript
const [openState, setOpenState] = useState<AccordionOpenStateType>('');
```

### Uncontrolled Accordion (Stay Open)

```tsx
import { UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionContent } from '@alma-oss/spirit-web-react';
import { AccordionOpenStateType } from '@alma-oss/spirit-web-react/types';
```

```tsx
<UncontrolledAccordion stayOpen>
  <AccordionItem id="accordion-item-example-0">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
  <AccordionItem id="accordion-item-example-1">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
</UncontrolledAccordion>
```

### Uncontrolled Accordion with Default Open Value (Stay Open)

```tsx
<UncontrolledAccordion defaultOpen={['accordion-item-example-1']} stayOpen>
  <AccordionItem id="accordion-item-example-0">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
  <AccordionItem id="accordion-item-example-1">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
</UncontrolledAccordion>
```

### Uncontrolled Accordion with Open Only One at a Time

```tsx
<UncontrolledAccordion>
  <AccordionItem id="accordion-item-example-0">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
  <AccordionItem id="accordion-item-example-1">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
</UncontrolledAccordion>
```

### Uncontrolled Accordion with Open Only One at a Time and Default Open Value

```tsx
<UncontrolledAccordion defaultOpen="accordion-item-example-1">
  <AccordionItem id="accordion-item-example-0">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
  <AccordionItem id="accordion-item-example-1">
    <AccordionHeader>Accordion Header</AccordionHeader>
    <AccordionContent>Accordion Content</AccordionContent>
  </AccordionItem>
</UncontrolledAccordion>
```

### Accordion Wrapper

The `Accordion` component defaults to using a `<section>` element, but you can customize it using the `elementType` prop:

**Default (section):**

```tsx
<Accordion>{/* items */}</Accordion>
```

**For semantic lists, use `ul` or `ol`:**

```tsx
<Accordion elementType="ul">{/* items */}</Accordion>
```

⚠️ **If you don't know the content or already know there will be a nested list**, use `div` with `role="list"` instead. This avoids nested `ul`/`li` structures (e.g., when accordion items use `li` elements and the content inside also contains a `ul` list), which would require CSS resets. The `role="list"` attribute is essential for accessibility: it tells screen readers and other assistive technologies that this is a list structure, preserving the semantic meaning that would otherwise be lost
when using a `div` instead of a semantic `ul` or `ol` element:

```tsx
<Accordion elementType="div" role="list">
  {/* items */}
</Accordion>
```

### AccordionItem

The `AccordionItem` component defaults to using an `<article>` element, but you can customize it using the `elementType` prop:

**Default (article):**

```tsx
<AccordionItem id="item-1">{/* header and content */}</AccordionItem>
```

**For semantic lists, use `li`:**

```tsx
<AccordionItem id="item-1" elementType="li">
  {/* header and content */}
</AccordionItem>
```

⚠️ **When using `div` with `role="list"` for the Accordion wrapper**, use `div` with `role="listitem"` for items:

```tsx
<AccordionItem id="item-1" elementType="div" role="listitem">
  {/* header and content */}
</AccordionItem>
```

### AccordionHeader

The `AccordionHeader` component defaults to using an `<h3>` element, but you can customize it using the `elementType` prop to match your document structure (e.g., `h2`, `h4`, etc.):

```tsx
<AccordionHeader elementType="h2">Accordion Header</AccordionHeader>
```

## Accordion Props

| Name          | Type                      | Default   | Required | Description                                      |
| ------------- | ------------------------- | --------- | -------- | ------------------------------------------------ |
| `children`    | `ReactNode`               | —         | ✓        | Accordion children's nodes                       |
| `elementType` | `ElementType`             | `section` | ✕        | Type of element used as wrapper                  |
| `open`        | \[`string` \| `string[]`] | —         | ✕        | Open item or list of open items \*               |
| `toggle`      | `(id: string) => void`    | —         | ✕        | A generic handler for a single **AccordionItem** |

(\*) Depending on the type of default value, what is set as the default will affect whether one or more will be open at the same time.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Uncontrolled Accordion Props

| Name          | Type                      | Default   | Required | Description                                    |
| ------------- | ------------------------- | --------- | -------- | ---------------------------------------------- |
| `children`    | `ReactNode`               | —         | ✓        | Accordion children's nodes                     |
| `defaultOpen` | \[`string` \| `string[]`] | —         | ✕        | Default open item(s) \*                        |
| `elementType` | `ElementType`             | `section` | ✕        | Type of element used as wrapper                |
| `stayOpen`    | `bool`                    | —         | ✕        | Item stay open when another one is also opened |

(\*) If this attribute is an array, then the `stayOpen` parameter should also be set.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## AccordionItem Props

| Name          | Type          | Default   | Required | Description                     |
| ------------- | ------------- | --------- | -------- | ------------------------------- |
| `children`    | `ReactNode`   | —         | ✓        | Item children node              |
| `elementType` | `ElementType` | `article` | ✕        | Type of element used as wrapper |
| `id`          | `string`      | —         | ✓        | Item id                         |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## AccordionHeader Props

| Name          | Type          | Default | Required | Description                     |
| ------------- | ------------- | ------- | -------- | ------------------------------- |
| `children`    | `ReactNode`   | —       | ✓        | Header children node            |
| `elementType` | `ElementType` | `h3`    | ✕        | Type of element used as wrapper |
| `slot`        | `ReactNode`   | —       | ✕        | Side slot in the header         |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## AccordionContent Props

| Name       | Type        | Default | Required | Description           |
| ---------- | ----------- | ------- | -------- | --------------------- |
| `children` | `ReactNode` | —       | ✓        | Content children node |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
