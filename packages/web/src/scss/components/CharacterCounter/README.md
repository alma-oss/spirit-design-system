# CharacterCounter

CharacterCounter displays the visible character count for textarea-like fields, for example `0/200`.

## Basic Usage

```html
<div class="CharacterCounter" aria-hidden="true">0/200</div>
```

Use `aria-hidden="true"` on the visible counter and provide a separate screen-reader message (for example by using an element with `accessibility-hidden` and connecting it through `aria-describedby` on the field).

## Validation States

Use validation modifiers to align the counter state with field validation:

- `CharacterCounter--success`
- `CharacterCounter--warning`
- `CharacterCounter--danger`

```html
<div class="CharacterCounter CharacterCounter--success" aria-hidden="true">130/200</div>
<div class="CharacterCounter CharacterCounter--warning" aria-hidden="true">190/200</div>
<div class="CharacterCounter CharacterCounter--danger" aria-hidden="true">201/200</div>
```

## Disabled State

Use `CharacterCounter--disabled` when the related field is disabled:

```html
<div class="CharacterCounter CharacterCounter--disabled" aria-hidden="true">8/200</div>
```

## Usage with TextArea

CharacterCounter is typically used next to helper and validation text below [TextArea][readme-text-area].

### With Helper Text and Threshold

```html
<div class="InputContainer InputContainer--medium">
  <textarea
    id="text-area-counter-min-max"
    name="counterMinMax"
    placeholder="Placeholder"
    aria-describedby="text-area-counter-min-max-helper-text text-area-counter-min-max-message"
  ></textarea>
</div>

<div class="Flex Flex--horizontal Flex--noWrap Flex--alignmentXSpaceBetween Flex--alignmentYTop">
  <div>
    <div id="text-area-counter-min-max-helper-text" class="HelperText">Write between 100 and 200 characters</div>
  </div>
  <div class="CharacterCounter" aria-hidden="true">0/200</div>
</div>

<div id="text-area-counter-min-max-message" class="accessibility-hidden">You can enter up to 200 characters</div>
```

### Disabled TextArea

```html
<div class="InputContainer InputContainer--medium InputContainer--disabled">
  <textarea
    id="text-area-counter-disabled"
    name="counterDisabled"
    placeholder="Placeholder"
    disabled
    aria-describedby="text-area-counter-disabled-message"
  >
Disabled</textarea
  >
</div>

<div class="Flex Flex--horizontal Flex--noWrap Flex--alignmentXSpaceBetween Flex--alignmentYTop">
  <div class="CharacterCounter CharacterCounter--disabled" aria-hidden="true">8/200</div>
</div>

<div id="text-area-counter-disabled-message" class="accessibility-hidden">192 characters remaining</div>
```

### Validation with Counter Over Limit

```html
<div class="InputContainer InputContainer--medium InputContainer--danger">
  <textarea
    id="text-area-counter-validation"
    name="counterValidation"
    placeholder="Placeholder"
    aria-describedby="text-area-counter-validation-validation-text text-area-counter-validation-helper-text text-area-counter-validation-message"
  >
Lorem ipsum dolor sit amet, consectetur adipiscing elit.</textarea
  >
</div>

<div class="Flex Flex--horizontal Flex--noWrap Flex--alignmentXSpaceBetween Flex--alignmentYTop">
  <div>
    <div id="text-area-counter-validation-validation-text" class="ValidationText ValidationText--danger">
      You have entered too many characters
    </div>
    <div id="text-area-counter-validation-helper-text" class="HelperText">
      Our support will get back to you within 24 hours
    </div>
  </div>
  <div class="CharacterCounter CharacterCounter--danger" aria-hidden="true">201/200</div>
</div>

<div id="text-area-counter-validation-message" class="accessibility-hidden">1 character over limit</div>
```

[readme-text-area]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextArea/README.md
