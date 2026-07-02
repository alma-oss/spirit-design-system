// @ts-nocheck
import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Alert, Link } from '@alma-oss/spirit-web-react';

export const MyComponent = () => (
  <>
    {/* Link inside Alert without color prop — should get color="inherit" */}
    <Alert color="success">
      See <Link href="/faq" color="inherit">FAQ</Link> for more info.
    </Alert>

    {/* Link inside Alert that already has color="inherit" — should not change */}
    <Alert color="warning">
      See <Link href="/faq" color="inherit">FAQ</Link> for more info.
    </Alert>

    {/* Link inside Alert that already has a different color — should not change */}
    <Alert color="danger">
      See <Link href="/faq" color="primary">FAQ</Link> for more info.
    </Alert>

    {/* Deeply nested Link inside Alert — should get color="inherit" */}
    <Alert color="informative">
      <div>
        <span>See <Link href="/faq" color="inherit">FAQ</Link> for more info.</span>
      </div>
    </Alert>

    {/* Link outside of Alert — should not change */}
    <Link href="/other">Other link</Link>
  </>
);
