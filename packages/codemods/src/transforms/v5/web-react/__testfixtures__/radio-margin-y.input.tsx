// @ts-nocheck
import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Radio, Stack, TextField } from '@alma-oss/spirit-web-react';

const props = {};

export const MyComponent = () => (
  <>
    <Radio id="radio-default" label="Label" />
    <Radio id="radio-item" label="Label" isItem />
    <Radio id="radio-spread-before" label="Label" {...props} />
    <Radio id="radio-spread-after" {...props} label="Label" />
    <Radio id="radio-margin-y" label="Label" marginY="space-700" />
    <Radio id="radio-margin-top" label="Label" marginTop="space-500" />
    <Stack hasSpacing>
      <Radio id="radio-in-stack" label="Label" />
      <div>
        <Radio id="radio-nested-in-stack" label="Label" />
      </div>
    </Stack>
    <Stack hasSpacing={false}>
      <Radio id="radio-in-stack-without-spacing" label="Label" />
    </Stack>
    <TextField id="textfield" label="Label" />
  </>
);
