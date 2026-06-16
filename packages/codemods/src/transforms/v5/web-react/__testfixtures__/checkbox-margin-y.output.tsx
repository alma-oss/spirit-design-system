// @ts-nocheck
import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Checkbox, Stack, TextField } from '@alma-oss/spirit-web-react';

const props = {};

export const MyComponent = () => (
  <>
    <Checkbox id="checkbox-default" label="Label" marginY="space-500" />
    <Checkbox id="checkbox-item" label="Label" isItem />
    <Checkbox id="checkbox-spread-before" label="Label" marginY="space-500" {...props} />
    <Checkbox id="checkbox-spread-after" marginY="space-500" {...props} label="Label" />
    <Checkbox id="checkbox-margin-y" label="Label" marginY="space-700" />
    <Checkbox id="checkbox-margin-top" label="Label" marginTop="space-500" />
    <Stack hasSpacing>
      <Checkbox id="checkbox-in-stack" label="Label" />
      <div>
        <Checkbox id="checkbox-nested-in-stack" label="Label" />
      </div>
    </Stack>
    <Stack hasSpacing={false}>
      <Checkbox id="checkbox-in-stack-without-spacing" label="Label" marginY="space-500" />
    </Stack>
    <TextField id="textfield" label="Label" />
  </>
);
