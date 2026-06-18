// @ts-nocheck
import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Stack, TextField, Toggle } from '@alma-oss/spirit-web-react';

const props = {};

export const MyComponent = () => (
  <>
    <Toggle id="toggle-default" label="Label" />
    <Toggle id="toggle-spread-before" label="Label" {...props} />
    <Toggle id="toggle-spread-after" {...props} label="Label" />
    <Toggle id="toggle-margin-y" label="Label" marginY="space-700" />
    <Toggle id="toggle-margin-top" label="Label" marginTop="space-500" />
    <Stack hasSpacing>
      <Toggle id="toggle-in-stack" label="Label" />
      <div>
        <Toggle id="toggle-nested-in-stack" label="Label" />
      </div>
    </Stack>
    <Stack hasSpacing={false}>
      <Toggle id="toggle-in-stack-without-spacing" label="Label" />
    </Stack>
    <TextField id="textfield" label="Label" />
  </>
);
