import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { UncontrolledCollapse } from '@alma-oss/spirit-web-react';

export const MyComponent = () => (
  <>
    <UncontrolledCollapse id="collapse-1">collapse</UncontrolledCollapse>
    <UncontrolledCollapse id="collapse-2" hideOnCollapse>
      collapse
    </UncontrolledCollapse>
  </>
);
