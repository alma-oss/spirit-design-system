# PricingPlan

The PricingPlan component provides a flexible and structured way to display
pricing information and feature comparisons. It's ideal for subscription plans,
service tiers, or product packages.

PricingPlan is a composition of several subcomponents:

- [PricingPlan](#pricingplan) – The main container
  - [PricingPlanHeader](#pricingplanheader) – Contains plan title, price, call-to-action, and other optional elements
  - [PricingPlanBody](#pricingplanbody) – Contains the feature list
  - [PricingPlanFooter](#pricingplanfooter) – Optional additional information at the bottom

## PricingPlan

This is the main container of the composition.

```html
<article class="PricingPlan">
  <div class="PricingPlan__layout">
    <!-- PricingPlanHeader -->
    <!-- PricingPlanBody -->
    <!-- PricingPlanFooter -->
  </div>
</article>
```

ℹ️ By default, PricingPlan uses the `<article>` element at the root level.
You can change it to any HTML element, just make sure the whole PricingPlan
composition produces valid and semantic HTML output.

ℹ️ There is an additional `<div>` with the `.PricingPlan__layout` class that
establishes named grid lines to place PricingPlan content on. The additional
element is necessary since in the most common scenario of PricingPlan usage, the
grid lines of the `.PricingPlan` element are overridden by the [Matrix][matrix]
component to [subgrid][mdn-subgrid], so any grid line names would be lost.

### Highlighted PricingPlan

Add the `PricingPlan--highlighted` class to emphasize a specific plan:

```html
<article class="PricingPlan PricingPlan--highlighted">
  <!-- Content as above -->
</article>
```

### Comparable Features

Add the `PricingPlan--comparableFeatures` class and wrap all plans into the
[Matrix][matrix] layout when displaying multiple plans side by side to ensure
proper alignment of features across plans:

```html
<div class="Matrix">
  <article class="PricingPlan PricingPlan--comparableFeatures"><!-- … --></article>
  <article class="PricingPlan PricingPlan--comparableFeatures"><!-- … --></article>
  <article class="PricingPlan PricingPlan--comparableFeatures"><!-- … --></article>
</div>
```

👉 Head over to the [Matrix][matrix] documentation to discover how to change the
number of columns and other recommendations.

## Customization

There is a default number of 100 grid rows in the PricingPlan layout (see
[Implementation Notes](#implementation-notes) to learn why). To change the
number of grid rows, use the `--spirit-pricing-plan-rows` CSS variable.

```html
<article class="PricingPlan" style="--spirit-pricing-plan-rows: 50;">
  <!-- Content as above -->
</article>
```

## PricingPlanHeader

The header contains the plan's title, subtitle, price, and a call-to-action
button. All these elements are optional. On the top of it, the header can also
include an optional badge and note.

```html
<header class="PricingPlanHeader">
  <!-- Optional badge -->
  <div class="PricingPlanHeader__badge">Recommended</div>

  <div class="PricingPlanHeader__content">
    <h3 class="PricingPlanHeader__title" id="plan-title">Plan Title</h3>
    <div class="PricingPlanHeader__subtitle">Supporting text</div>
    <div class="PricingPlanHeader__price">Price Amount</div>
    <div class="PricingPlanHeader__action">
      <a
        href="#"
        class="Button Button--primary Button--large"
        id="plan-action"
        aria-labelledby="plan-action plan-title"
      >
        Call to Action
      </a>
    </div>
    <div class="PricingPlanHeader__note">Additional information</div>
  </div>
</header>
```

## PricingPlanBody

The body contains the feature list. Each feature consists of a title and a
description.

```html
<div class="PricingPlanBody">
  <!-- Optional introductory text -->
  <div>Everything in previous plan plus:</div>

  <!-- Feature list -->
  <ul class="PricingPlanBody__featureList">
    <li class="PricingPlanBody__featureItem">
      <div class="PricingPlanBody__featureTitle">
        <svg width="16" height="16" aria-hidden="true">
          <use xlink:href="/assets/icons/svg/sprite.svg#check-plain" />
        </svg>
        <div class="PricingPlanBody__featureTitleText">Feature name</div>
      </div>
      <div class="PricingPlanBody__featureDescription">Feature description</div>
    </li>
    <!-- Additional features -->
  </ul>
</div>
```

ℹ️ The feature list uses the `<ul>` HTML tag. For styling purposes, feature
title and description groups are wrapped into a `<div>`.

## PricingPlanFooter

The footer is optional and can contain additional information or disclaimers.

```html
<footer class="PricingPlanFooter">Footer content</footer>
```

## Full Composition

```html
<article class="PricingPlan">
  <div class="PricingPlan__layout">
    <header class="PricingPlanHeader">
      <div class="PricingPlanHeader__content">
        <h3 class="PricingPlanHeader__title" id="plan-title">Plan Title</h3>
        <div class="PricingPlanHeader__subtitle">Supporting text</div>
        <div class="PricingPlanHeader__price">Price Amount</div>
        <div class="PricingPlanHeader__action">
          <a
            href="#"
            class="Button Button--primary Button--large"
            id="plan-action"
            aria-labelledby="plan-action plan-title"
          >
            Call to Action
          </a>
        </div>
        <div class="PricingPlanHeader__note">Additional information</div>
      </div>
    </header>
    <div class="PricingPlanBody">
      <div>Optional description</div>
      <ul class="PricingPlanBody__featureList">
        <li class="PricingPlanBody__featureItem">
          <div class="PricingPlanBody__featureTitle">
            <svg width="16" height="16" aria-hidden="true">
              <use xlink:href="/assets/icons/svg/sprite.svg#check-plain" />
            </svg>
            <div class="PricingPlanBody__featureTitleText">Feature name</div>
          </div>
          <div class="PricingPlanBody__featureDescription">Feature description</div>
        </li>
        <!-- Additional features follow the same pattern -->
      </ul>
    </div>
    <footer class="PricingPlanFooter">Footer content</footer>
  </div>
</article>
```

### Accessibility

For better accessibility, it is recommended to link the action button to the plan title using `aria-labelledby`.
This provides screen reader users with context about which plan the action applies to.

```html
<article class="PricingPlan">
  <div class="PricingPlan__layout">
    <header class="PricingPlanHeader">
      <div class="PricingPlanHeader__content">
        <h3 class="PricingPlanHeader__title" id="plan-title">Plan Title</h3>
        <div class="PricingPlanHeader__subtitle">…</div>
        <div class="PricingPlanHeader__price">…</div>
        <div class="PricingPlanHeader__action">
          <a
            href="#"
            class="Button Button--primary Button--large"
            id="plan-action"
            aria-labelledby="plan-action plan-title"
          >
            Call to Action
          </a>
        </div>
        …
      </div>
    </header>
    …
  </div>
</article>
```

## Implementation Notes

The PricingPlan component uses [CSS Grid][mdn-grid] with [subgrid][mdn-subgrid]
layout to achieve vertical alignment of elements across multiple pricing plans.
This ensures that headers, feature lists, and footers
[line up perfectly](#comparable-pricingplans) when displayed side by side in the
[Matrix][matrix] layout.

The subgrid feature requires an explicit number of grid rows. However, we wanted
to make the PricingPlan component robust enough so developers don't have to know
the number of content rows in advance. As a compromise, there is a default of
100 grid rows that may or may not be used by your content. The number of rows is
[configurable](#customization).

The explicit number of grid rows is also why we don't use `row-gap` for vertical
spacing because `row-gap` is applied even for empty grid rows. Instead, to
prevent the empty rows from expanding the component vertically, we use `margin`
to separate individual content rows.

[matrix]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Matrix/README.md
[mdn-grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
[mdn-subgrid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid
