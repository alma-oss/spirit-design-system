import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { ControlButton } from '@alma-oss/spirit-web-react';

export const MyComponent = (props) => (
  <>
    <ControlButton aria-label="Close" size="large">Close</ControlButton>
    <ControlButton size="xsmall" aria-label="Close">Close</ControlButton>
    <ControlButton size="medium" aria-label="Close">Close</ControlButton>
    <ControlButton size="large" aria-label="Close">Close</ControlButton>
    <ControlButton size="xlarge" aria-label="Close">Close</ControlButton>
    <ControlButton size="xlarge" aria-label="Close">Close</ControlButton>
    <ControlButton size={{ mobile: 'medium', tablet: 'xlarge' }} aria-label="Close">Close</ControlButton>
    <ControlButton {...props} aria-label="Close">Close</ControlButton>
  </>
);
