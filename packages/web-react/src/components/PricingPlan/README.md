# PricingPlan

The PricingPlan component provides a flexible and structured way to display pricing information and feature comparisons. It's ideal for subscription plans, service tiers, or product packages.

PricingPlan is a composition of several subcomponents:

- [PricingPlan](#pricingPlan) – The main container
  - [PricingPlanHeader](#pricingplanHeader) – Contains plan title, price, call-to-action, and other optional elements
  - [PricingPlanBody](#pricingplanBody) – Contains the feature list
  - [PricingPlanFooter](#pricingplanFooter) – Optional additional information at the bottom

## PricingPlan

This is the main container of the composition.

```jsx
import { PricingPlan } from '@alma-oss/spirit-web-react';

<PricingPlan>{/* PricingPlan content go here */}</PricingPlan>;
```

### Highlighted Pricing Plan

Add `isHighlighted` prop to highlight the PricingPlan.

```jsx
<PricingPlan isHighlighted>{/* PricingPlan content go here */}</PricingPlan>
```

### Comparable Features

Add `hasComparableFeatures` prop and wrap all plans into the `Matrix` layout when displaying multiple plans side by side to ensure proper alignment of features across plans:

```jsx
import { PricingPlan, Matrix } from '@alma-oss/spirit-web-react';

<Matrix>
  <PricingPlan hasComparableFeatures>{/* PricingPlan content go here */}</PricingPlan>
  <PricingPlan hasComparableFeatures>{/* PricingPlan content go here */}</PricingPlan>
</Matrix>;
```

👉 Head over to the [Matrix][matrix-documentation] documentation to discover how to change the number of columns and other recommendations.

### API

| Name                    | Type          | Default   | Required | Description                                      |
| ----------------------- | ------------- | --------- | -------- | ------------------------------------------------ |
| `children`              | `ReactNode`   | -         | ✓        | Content of the PricingPlan                       |
| `elementType`           | `ElementType` | `article` | ✕        | Type of element                                  |
| `hasComparableFeatures` | `bool`        | `false`   | ✕        | If true, the PricingPlan has comparable features |
| `isHighlighted`         | `bool`        | `false`   | ✕        | If true, the PricingPlan is highlighted          |
| `rows`                  | `number`      | -         | ✕        | Number of grid rows in the plan layout           |

The components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## PricingPlanHeader

The header contains the plan's title, subtitle, price, and a call-to-action button. All these elements are optional.
On the top of it, the header can also include an optional badge and note.

```jsx
import { PricingPlanHeader } from '@alma-oss/spirit-web-react';

<PricingPlanHeader
  action={
    <ButtonLink href="#" size="large">
      Call to Action
    </ButtonLink>
  }
  badge="Recommended"
  title="Plan Title"
  subtitle="Supporting text"
  price="Price Amount"
  note="Additional information"
/>;
```

### Accessibility

#### Badge and Title Connection

For better accessibility, when a badge is present, it should be connected to the heading using `aria-labelledby`, similar to how the action button links to the title. This ensures screen reader users receive this information immediately when navigating by headings, so blind users don't skip important information like "Recommended" when moving through the page structure.

To connect the badge and title, you need to:

1. Provide IDs for both the badge and title elements
2. Add `aria-labelledby` to the title element referencing both IDs

```jsx
<PricingPlanHeader
  badge={<span id="plan-badge">Recommended</span>}
  title={
    <span id="plan-title" aria-labelledby="plan-badge plan-title">
      Plan 2
    </span>
  }
  subtitle="Supporting text"
  price="59 EUR"
/>
```

The heading will have `aria-labelledby="plan-badge plan-title"`, so screen readers will announce "Recommended Plan 2" when navigating by headings.

#### Action Button and Title Connection

For better accessibility, it is recommended to link the action button to the plan title using `aria-labelledby`. This provides screen reader users with context about which plan the action applies to.

```jsx
<PricingPlanHeader
  action={
    <ButtonLink href="#" size="large" id="plan-action" aria-labelledby="plan-action plan-title">
      Subscribe
    </ButtonLink>
  }
  title={<span id="plan-title">Premium Plan</span>}
  subtitle="No additional fee"
  price="100 €"
/>
```

When using a string for the `title`, wrap it in a `span` element with an `id` attribute. For more complex title content (ReactNode), ensure the root element has an `id` attribute that can be referenced by the action's `aria-labelledby`.

### API

| Name          | Type          | Default  | Required | Description                              |
| ------------- | ------------- | -------- | -------- | ---------------------------------------- |
| `action`      | `ReactNode`   | -        | ✕        | Call to action button \*                 |
| `badge`       | `ReactNode`   | -        | ✕        | Optional badge to highlight the plan \*  |
| `elementType` | `ElementType` | `header` | ✕        | Type of element                          |
| `note`        | `string`      | -        | ✕        | Optional note for additional information |
| `price`       | `string`      | -        | ✕        | Price amount of the plan                 |
| `subtitle`    | `string`      | -        | ✕        | Subtitle for the plan                    |
| `title`       | `ReactNode`   | -        | ✕        | Title of the plan \*                     |

(\*) For accessibility, provide IDs on these elements:

- `action`: Provide an ID on the action element and reference it along with the title's ID in the action's `aria-labelledby` (see [Action Button and Title Connection](#action-button-and-title-connection)).
- `badge`: Provide an ID on the badge element and reference it in the title's `aria-labelledby` (see [Badge and Title Connection](#badge-and-title-connection)).
- `title`: Provide an ID on the title element.
  - When using a `badge`, reference the badge ID in the title's `aria-labelledby` (see [Badge and Title Connection](#badge-and-title-connection)).
  - When using an `action`, ensure the title ID is referenced in the action's `aria-labelledby` (see [Action Button and Title Connection](#action-button-and-title-connection)).

The components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## PricingPlanBody

The body contains the feature list. Each feature consists of a title and a description.

```jsx
import { PricingPlanBody } from '@alma-oss/spirit-web-react';

<PricingPlanBody
  id="tier-1"
  description="Optional introductory text"
  features={[
    {
      title: 'Feature name',
      description: 'Feature description',
    },
  ]}
/>;
```

You can also set the `tooltipContent` or `modalContent` on the feature to provide additional information when the feature title is clicked.

```jsx
import { PricingPlanBody } from '@alma-oss/spirit-web-react';

<PricingPlanBody
  id="tier-1"
  description="Optional introductory text"
  features={[
    {
      title: 'Feature name',
      description: 'Feature description',
      tooltipContent: 'Additional information in Tooltip about the feature',
    },
  ]}
/>

<PricingPlanBody
  id="tier-1"
  description="Optional introductory text"
  features={[
    {
      title: 'Feature name',
      description: 'Feature description',
      modalContent: 'Additional information in Modal about the feature',
    },
  ]}
/>;
```

👉 Please note that combination of ScrollView and Tooltips may cause troubles with cropped tooltips and unwanted scrollbars.

ℹ️ Tooltip is for shorts tips, not for long paragraphs (it is not called Toolparagraph 😉), so if you need to use long content
use Modal instead.

### API

| Name          | Type                                                                                                                             | Default | Required | Description                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description` | `string`                                                                                                                         | -       | ✕        | Optional introductory text                                                                                                                                           |
| `elementType` | `ElementType`                                                                                                                    | `div`   | ✕        | Type of element                                                                                                                                                      |
| `features`    | `{ title: string; description: string \| ReactNode, tooltipContent?: string \| ReactNode, modalContent?: string \| ReactNode}[]` | `[]`    | ✕        | List of features, each with a title and description. Optionally, you can set `tooltipContent` or `modalContent` to show additional information in a Tooltip or Modal |
| `id`          | `string`                                                                                                                         | -       | ✓        | Unique identifier for the PricingPlanBody element \*                                                                                                                 |

(\*) The `id` prop is used to generate a unique ID for each feature title, tooltip or modal.

## PricingPlanFooter

The footer is optional and can contain additional information or disclaimers.

```jsx
import { PricingPlanFooter } from '@alma-oss/spirit-web-react';

<PricingPlanFooter>{/* Additional information or disclaimers */}</PricingPlanFooter>;
```

### API

| Name          | Type          | Default  | Required | Description                      |
| ------------- | ------------- | -------- | -------- | -------------------------------- |
| `children`    | `ReactNode`   | -        | ✓        | Content of the PricingPlanFooter |
| `elementType` | `ElementType` | `footer` | ✕        | Type of element                  |

## Full Example

```jsx
import { PricingPlan, PricingPlanHeader, PricingPlanBody, PricingPlanFooter } from '@alma-oss/spirit-web-react';

<PricingPlan isHighlighted>
  <PricingPlanHeader
    action={
      <ButtonLink href="#" size="large" id="plan-action" aria-labelledby="plan-action plan-title">
        Call to Action
      </ButtonLink>
    }
    badge="Recommended"
    title={<span id="plan-title">Plan</span>}
    subtitle="Supporting text"
    price="Price Amount"
    note="Additional information"
  />
  <PricingPlanBody
    id="tier-1"
    description="Brand new features"
    features={[
      {
        title: 'Compatibility',
        description: 'Compatible across multiple platforms',
      },
    ]}
  />
  <PricingPlanFooter>Footer content</PricingPlanFooter>
</PricingPlan>;
```

## Customization

There is a default number of 100 grid rows in the PricingPlan layout (see
[Implementation Notes](#implementation-notes) to learn why). To change the
number of grid rows, use the `rows` prop.

```jsx
<PricingPlan rows={50}>{/* PricingPlan content go here */}</PricingPlan>
```

## Implementation Notes

For more information about the implementation, see the [PricingPlan][pricing-plan-web-documentation] web documentation.

[matrix-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Matrix/README.md
[pricing-plan-web-documentation]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/PricingPlan/README.md#implementation-notes
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
