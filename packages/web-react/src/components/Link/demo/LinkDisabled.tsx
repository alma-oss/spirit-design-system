import React from 'react';
import Link from '../Link';

const LinkDisabled = () => (
  <>
    <Link href="#" color="primary" isDisabled>
      Primary Disabled Link
    </Link>

    <Link href="#" color="secondary" isDisabled>
      Secondary Disabled Link
    </Link>

    <Link href="#" color="tertiary" isDisabled>
      Tertiary Disabled Link
    </Link>

    <Link href="#" color="inherit" isDisabled>
      Inherit Disabled Link
    </Link>

    <Link elementType="button" isDisabled>
      Link as button
    </Link>
  </>
);

export default LinkDisabled;
