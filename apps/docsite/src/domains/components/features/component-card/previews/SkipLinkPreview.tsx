import { SkipLink } from '@alma-oss/spirit-web-react';
import React from 'react';

const SkipLinkPreview = () => (
  <SkipLink href="#main-content" UNSAFE_style={{ position: 'static', opacity: 1, transform: 'none' }}>
    Skip to main content
  </SkipLink>
);

export default SkipLinkPreview;
