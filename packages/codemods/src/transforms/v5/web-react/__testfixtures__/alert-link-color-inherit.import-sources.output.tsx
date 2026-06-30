import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Alert as SpiritAlert, Link as SpiritLink } from '@org/design-system';
import { Alert, Link } from '@other/design-system';

export const MyComponent = () => (
  <>
    <SpiritAlert color="success">
      See <SpiritLink href="/faq" color="inherit">FAQ</SpiritLink> for more info.
    </SpiritAlert>

    <Alert color="success">
      See <Link href="/faq">FAQ</Link> for more info.
    </Alert>
  </>
);
