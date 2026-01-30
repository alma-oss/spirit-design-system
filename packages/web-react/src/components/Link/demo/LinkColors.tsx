import React from 'react';
import Link from '../Link';

const LinkColors = () => (
  <>
    <Link href="#" color="primary">
      Primary Link
    </Link>

    <Link href="#" color="secondary">
      Secondary Link
    </Link>

    <Link href="#" color="tertiary">
      Tertiary Link
    </Link>

    <Link href="#" color="inherit">
      Inherit Link
    </Link>

    <Link elementType="button">Link as button</Link>
  </>
);

export default LinkColors;
