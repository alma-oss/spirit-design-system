import React from 'react';
import { Text } from '../../Text';
import Link from '../Link';

const LinkVisited = () => (
  <>
    <Text>Please click on the link to see the visited state style</Text>

    <Link href="#" color="primary" hasVisitedStyleAllowed>
      Primary Link
    </Link>

    <Link href="#" color="secondary" hasVisitedStyleAllowed>
      Secondary Link
    </Link>

    <Link href="#" color="tertiary" hasVisitedStyleAllowed>
      Tertiary Link
    </Link>

    <Link href="#" color="inherit" hasVisitedStyleAllowed>
      Inherit Link
    </Link>
  </>
);

export default LinkVisited;
