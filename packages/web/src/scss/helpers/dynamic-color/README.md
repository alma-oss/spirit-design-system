# Dynamic Colors

Dynamic color helpers allow you to create dynamic borders and backgrounds derived from the background color of the parent element.

## Requirements

In order to use dynamic color helpers, you need to set a few things up on the parent element.

First, set the **background color** and a corresponding **text color** of the **parent element**.
You can use any pair of available background and text colors.
For example, a combination of basic informative background with subtle text color:

```html
<div class="bg-emotion-informative-basic text-emotion-informative-subtle">
  <!-- Dynamic color helpers will be applied inside this element. -->
</div>
```

Second, add one or more `dynamic-color-*` classes to the element inside, for example:

```html
<div class="bg-emotion-informative-basic text-emotion-informative-subtle">
  <button type="button" class="button-unstyled dynamic-color-background-interactive">Click me</button>
</div>
```

ℹ️ Along with a background color, always set a corresponding text color so the content is readable.

## Border

Use `dynamic-color-border` class on elements with borders:

```html
<div class="bg-emotion-informative-basic text-emotion-informative-subtle">
  <button type="button" class="button-unstyled border-100 border-solid dynamic-color-border">Click me</button>
</div>
```

⚠️ **The `dynamic-color-border` class only changes the border color.** It must be used with a combination of border-width and border-style classes to achieve any effect.

## Interactive Background

Use `dynamic-color-background-interactive` class on interactive elements like buttons or links:

```html
<div class="bg-emotion-informative-basic text-emotion-informative-subtle">
  <button type="button" class="button-unstyled dynamic-color-background-interactive">Click me</button>
</div>
```

ℹ️ Specifically for buttons, we recommend using a combination of `dynamic-color-background-interactive` and `button-unstyled`
class, possibly with some additional styling:

```html
<div class="bg-emotion-informative-basic text-emotion-informative-subtle">
  <button type="button" class="button-unstyled dynamic-color-background-interactive rounded-200 px-700 py-500">
    Click me
  </button>
</div>
```

## Selected Background

Use `dynamic-color-background-selected` class on selected elements:

```html
<div class="bg-emotion-informative-basic text-emotion-informative-subtle">
  <a href="#" aria-current="page" class="dynamic-color-background-selected">Selected item</a>
  <a href="#">Not selected</a>
</div>
```

ℹ️ To prevent style changes on hover, we recommend using a combination of `dynamic-color-background-selected` and `link-not-underlined` class,
possibly with some additional styling:

```html
<div class="bg-emotion-informative-basic text-emotion-informative-subtle">
  <a
    href="#"
    aria-current="page"
    class="dynamic-color-background-selected link-not-underlined text-emotion-informative-subtle rounded-200 px-700 py-500"
  >
    Selected link
  </a>
</div>
```

ℹ️ Always add a `text-*` utility class directly to the link element. Default link styles override colors inherited from the parent (even from the parent with a text color utility), so explicit text color must be set on the element itself to keep the text readable.
