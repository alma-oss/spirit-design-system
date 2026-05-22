# Disclosure

Disclosures are moments that open up on a page and reveal additional information related to the source it is triggered from.

## Features

A disclosure is a collapsible section of content.
It is composed of a trigger button and a panel that contains the content.
`useDisclosureAria` can be used to implement these in an accessible way.

- Support for mouse, touch, and keyboard interactions to open and close the disclosure
- Support for disabled disclosures
- Follows the disclosure ARIA pattern, semantically linking the trigger button and panel
- Uses [hidden="until-found"][hidden-until-found] in supported browsers, enabling find-in-page search support and improved search engine visibility for collapsed content

## Anatomy

A disclosure consists of a trigger button and a panel.
Clicking on or pressing `Enter` or `Space` while the trigger button is focused toggles the visibility of the panel.

`useDisclosureAria` returns props to spread onto the trigger button and panel.

State is managed by the `useDisclosureState` hook.
The state object should be passed as an option to `useDisclosureAria`.

## useDisclosureAria

Provides the behavior and accessibility implementation for a disclosure pattern.

### API

```js
useDisclosureAria(
  props: DisclosureAriaProps,
  state: DisclosureState,
): DisclosureAria
```

## useDisclosureState

Manages state for a disclosure pattern. Tracks whether the disclosure is expanded, and provides methods to toggle this state.

### API

```js
useDisclosureState(props: DisclosureProps): DisclosureState
```

## Example

```jsx
const Disclosure = (props) => {
  let state = useDisclosureState(props);
  let panelRef = (useRef < HTMLDivElement) | (null > null);
  let triggerRef = (useRef < HTMLButtonElement) | (null > null);
  let { triggerProps, panelProps } = useDisclosureAria(props, state);

  return (
    <div className="disclosure">
      <h3>
        <button className="trigger" ref={triggerRef} {...triggerProps}>
          {props.title}
        </button>
      </h3>
      <div className="panel" ref={panelRef} {...panelProps}>
        <p>{props.children}</p>
      </div>
    </div>
  );
};

<Disclosure title="Summary">Details.</Disclosure>;
```

[hidden-until-found]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden#the_hidden_until_found_state
