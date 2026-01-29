# Accordion

## Usage

### Default (Stay Open)

```javascript
import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from '@alma-oss/spirit-web-react';
import { AccordionOpenStateType } from '@alma-oss/spirit-web-react/types';
```

```typescript
const [openState, setOpenState] = useState<AccordionOpenStateType>(undefined);
```

```javascript
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

```javascript
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

```javascript
import { UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionContent } from '@alma-oss/spirit-web-react';
import { AccordionOpenStateType } from '@alma-oss/spirit-web-react/types';
```

```javascript
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

```javascript
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

```javascript
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

```javascript
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

| Name          | Type          | Default   | Required | Description                                     |
| ------------- | ------------- | --------- | -------- | ----------------------------------------------- |
| `children`    | `ReactNode`   | —         | ✓        | Item children node                              |
| `elementType` | `ElementType` | `article` | ✕        | Type of element used as wrapper for single item |
| `id`          | `string`      | —         | ✓        | Item id                                         |

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
