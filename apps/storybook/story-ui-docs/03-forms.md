# Forms

Wrap a form in a native `<form>` element and lay it out with `Stack` or `Grid`. Every control needs a unique `id`
and a `label`. Add `name` for submitted data.

## Shared Field Props

`TextField`, `TextArea`, `Select`, `Checkbox`, `Radio`, `Toggle` and `FieldGroup` share these props:

- `id` (required), `label` (required, `ReactNode`), `isLabelHidden` (visually hidden but still accessible).
- `helperText`, `isRequired` (not on Radio), `isDisabled`.
- `validationState`: `success` | `warning` | `danger`. `validationText`: a message or an array of messages
  (not on Radio, put it on the parent `FieldGroup`). `hasValidationIcon` shows the state icon.
- `size`: `small` | `medium` (default) | `large`.

Text inputs (`TextField`, `TextArea`, `Select`) also take `variant`: `fill` (default) | `outline`. Checkbox, Radio and
Toggle take `inputPosition`: `start` | `end` (responsive allowed). The default is `start` for Checkbox and Radio
and `end` for Toggle.

## TextField

`type`: `text` (default) | `email` | `password` | `tel` | `url` | `number` | `search`. Also `placeholder`,
`autoComplete`, `hasPasswordToggle` (for passwords), `startAddon` / `endAddon` (use `InputAddon`).

```tsx
<TextField id="email" label="E-mail" name="email" type="email" autoComplete="email" isRequired />
<TextField id="password" label="Password" name="password" type="password" hasPasswordToggle isRequired />
<TextField
  id="search"
  label="Search"
  isLabelHidden
  name="q"
  type="search"
  startAddon={
    <InputAddon elementType="label" htmlFor="search">
      <Icon name="search" />
    </InputAddon>
  }
/>
```

## TextArea

Native `rows` and `maxLength` work. Extra: `isAutoResizing`, `autoResizingMaxHeight`, `hasCounter`,
`counterThreshold` (shows `5/500`).

```tsx
<TextArea id="message" label="Message" name="message" rows={5} counterThreshold={500} maxLength={500} />
```

## Select

Options are native `<option>` children.

```tsx
<Select id="topic" label="Topic" name="topic" defaultValue="" isRequired>
  <option value="" disabled>
    Choose a topic
  </option>
  <option value="sales">Sales</option>
  <option value="support">Support</option>
</Select>
```

## Checkbox, Radio, Toggle

Controlled state uses `isChecked` with `onChange`. `Checkbox` and `Toggle` accept `details` for extra content under
the label. `Toggle` has `hasIndicators`.

```tsx
<Checkbox id="terms" label="I agree with the terms" name="terms" isRequired />
<Toggle id="newsletter" label="Send me the newsletter" name="newsletter" />
```

## FieldGroup (Instead of FormGroup)

Spirit has no `FormGroup`. `FieldGroup` renders a `<fieldset>` with one label, helper text and validation for a
group of controls. Its `isRequired` is only visual and `isDisabled` disables the native `<fieldset>`; set both on
the child controls too, so they render their own state. Radios
in a group share one `name`.

```tsx
<FieldGroup id="contact-preference" label="Preferred contact" helperText="We use it only for this request.">
  <Radio id="contact-email" label="E-mail" name="contactPreference" value="email" />
  <Radio id="contact-phone" label="Phone" name="contactPreference" value="phone" />
</FieldGroup>
```

## Buttons and Actions

- `Button`: `color` `primary` (default) | `secondary` | `tertiary` | `plain` | `success` | `informative` |
  `warning` | `danger`; `size` `small` | `medium` (default) | `large`; `type` `button` (default) | `submit` |
  `reset`; `isDisabled`, `isLoading`, `isSymmetrical` (icon-only).
- `ButtonLink`: the same look for navigation, renders an `a` with `href`.
- `ActionGroup`: places actions, stacked full-width on mobile and in a row from tablet up.

```tsx
<ActionGroup>
  <Button type="submit">Send</Button>
  <Button color="secondary" type="reset">Clear</Button>
</ActionGroup>
<Button isSymmetrical color="plain">
  <Icon name="close" />
  <VisuallyHidden>Close</VisuallyHidden>
</Button>
```

## Complete Contact Form

```tsx
import { useState } from 'react';
import {
  ActionGroup,
  Alert,
  Button,
  Checkbox,
  Heading,
  Section,
  Select,
  Stack,
  Text,
  TextArea,
  TextField,
} from '@alma-oss/spirit-web-react';

export const ContactForm = () => {
  const [isSent, setIsSent] = useState(false);

  return (
    <Section elementType="div" size="medium" containerProps={{ size: 'small' }}>
      <Stack spacing="space-800">
        <Stack spacing="space-400">
          <Heading elementType="h1">Contact us</Heading>
          <Text textColor="secondary">We usually reply within two working days.</Text>
        </Stack>
        {isSent && <Alert role="status">Thank you, your message has been sent.</Alert>}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setIsSent(true);
          }}
        >
          <Stack spacing="space-600">
            <TextField id="contact-name" label="Name" name="name" autoComplete="name" isRequired />
            <TextField id="contact-email" label="E-mail" name="email" type="email" autoComplete="email" isRequired />
            <Select id="contact-topic" label="Topic" name="topic">
              <option value="general">General question</option>
              <option value="billing">Billing</option>
            </Select>
            <TextArea
              id="contact-message"
              label="Message"
              name="message"
              rows={6}
              counterThreshold={1000}
              maxLength={1000}
              isRequired
            />
            <Checkbox id="contact-consent" label="I agree to the processing of my data" name="consent" isRequired />
            <ActionGroup>
              <Button type="submit">Send message</Button>
            </ActionGroup>
          </Stack>
        </form>
      </Stack>
    </Section>
  );
};
```

`Alert` defaults to `color="success"`. Use `color="danger"` for errors, `informative` or `warning` otherwise. An Alert
that appears after a user action needs `role="status"`, or `role="alert"` when it requires immediate attention, so
screen readers announce it.
