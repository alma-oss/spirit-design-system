import React from 'react';
import { Box } from '../../Box';
import Link from '../Link';

const LinkStretched = () => (
  <Box borderWidth="100" padding="space-800" UNSAFE_style={{ position: 'relative' }}>
    The{' '}
    <Link href="#" isStretched>
      stretched link
    </Link>{' '}
    makes this whole box clickable.
  </Box>
);

export default LinkStretched;
