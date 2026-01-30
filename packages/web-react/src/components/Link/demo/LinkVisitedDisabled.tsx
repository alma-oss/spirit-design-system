import React from 'react';
import Link from '../Link';

const LinkVisitedDisabled = () => (
  <>
    <Link href="#" color="primary" hasVisitedStyleAllowed isDisabled>
      Primary Link
    </Link>

    <Link href="#" color="secondary" hasVisitedStyleAllowed isDisabled>
      Secondary Link
    </Link>

    <Link href="#" color="tertiary" hasVisitedStyleAllowed isDisabled>
      Tertiary Link
    </Link>

    <Link href="#" color="inherit" hasVisitedStyleAllowed isDisabled>
      Inherit Link
    </Link>
  </>
);

export default LinkVisitedDisabled;
