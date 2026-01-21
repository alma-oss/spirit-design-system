# ActionGroup

This component uses the `Flex` component internally.
For more customisation options, refer to the props in the [Flex documentation][web-react-flex-documentation].

ActionGroup component is a container component that is used to position action components in a predefined layout.

- For desktop and tablet views, actions are positioned in a horizontal direction.
- For mobile view, actions are positioned in a vertical layout and are stretched to the full width of the container.

```jsx
<ActionGroup>
  <!-- Actions components go here -->
</ActionGroup>
```

## Default Props

ActionGroup comes with predefined default props designed to simplify its use.
These defaults can be customised as needed to suit your requirements.

| Name       | Type                                                                 | Value                                            |
| ---------- | -------------------------------------------------------------------- | ------------------------------------------------ |
| alignmentX | \[[AlignmentXExtended dictionary][alignment-dictionary] \| `object`] | `{{ mobile: 'stretch', tablet: 'left' }}`        |
| direction  | \[[DirectionExtended dictionary][direction-dictionary] \| `object`]  | `{{ mobile: 'vertical', tablet: 'horizontal' }}` |

## Reversed Alignment

👉 When reversing the button direction, align them to the right to maintain optimal UX practices.

### Reversed Example

```jsx
<ActionGroup
  direction={{ mobile: 'vertical', tablet: 'horizontal-reversed' }} // changed to 'horizontal-reversed'
  alignmentX={{ mobile: 'stretch', tablet: 'right' }} // changed to 'right'
>
  <ButtonLink href="#" color="primary">
    Primary Action
  </ButtonLink>
  <ButtonLink href="#" color="secondary">
    Secondary Action
  </ButtonLink>
</ActionGroup>
```

## Full Example

```jsx
<ActionGroup>
  <ButtonLink href="#" color="primary">
    Primary Action
  </ButtonLink>
  <ButtonLink href="#" color="secondary">
    Secondary Action
  </ButtonLink>
</ActionGroup>
```

[alignment-dictionary]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#alignment
[direction-dictionary]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#direction
[web-react-flex-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Flex/README.md
